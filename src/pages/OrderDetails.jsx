import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrder();
  }, [id]);

  const loadOrder = async () => {
    try {
      const savedOrders = JSON.parse(
        localStorage.getItem("orders") || "[]"
      );

      const foundOrder = savedOrders.find(
        (item) =>
          String(item.id) === String(id) ||
          String(item.orderId) === String(id)
      );

      if (!foundOrder) {
        setLoading(false);
        return;
      }

      /*
       * Get latest product information.
       * This also fixes old orders that may have
       * missing price or image information.
       */
      try {
        const response = await axios.get(
          "http://localhost:3000/products"
        );

        const products = response.data;

        const updatedItems = (foundOrder.items || []).map(
          (item) => {
            const latestProduct = products.find(
              (product) =>
                String(product.id) === String(item.id)
            );

            if (latestProduct) {
              return {
                ...item,

                title:
                  item.title ||
                  item.name ||
                  latestProduct.title ||
                  latestProduct.name ||
                  "Product",

                name:
                  item.name ||
                  latestProduct.name ||
                  latestProduct.title ||
                  "Product",

                price:
                  Number(item.price) > 0
                    ? Number(item.price)
                    : Number(latestProduct.price) || 0,

                image:
                  item.image ||
                  latestProduct.image ||
                  "",

                category:
                  item.category ||
                  latestProduct.category ||
                  "Product",

                quantity:
                  Number(item.quantity) || 1,
              };
            }

            return {
              ...item,
              quantity:
                Number(item.quantity) || 1,
              price:
                Number(item.price) || 0,
            };
          }
        );

        const updatedTotal = updatedItems.reduce(
          (total, item) =>
            total +
            Number(item.price || 0) *
              Number(item.quantity || 1),
          0
        );

        const updatedOrder = {
          ...foundOrder,
          items: updatedItems,
          total: updatedTotal,
        };

        setOrder(updatedOrder);

        /*
         * Save the corrected order.
         */
        const updatedOrders = savedOrders.map(
          (item) =>
            String(item.id) === String(foundOrder.id)
              ? updatedOrder
              : item
        );

        localStorage.setItem(
          "orders",
          JSON.stringify(updatedOrders)
        );
      } catch (productError) {
        console.log(
          "Could not load products:",
          productError
        );

        setOrder(foundOrder);
      }
    } catch (error) {
      console.error(
        "Failed to load order:",
        error
      );
    }

    setLoading(false);
  };

  /*
   * Loading screen
   */
  if (loading) {
    return (
      <>
        <Navbar />

        <div className="order-details-loading">
          <div className="loading-icon">
            📦
          </div>

          <h2>
            Loading order...
          </h2>

          <p>
            Please wait while we get your order details.
          </p>
        </div>
      </>
    );
  }

  /*
   * Order not found
   */
  if (!order) {
    return (
      <>
        <Navbar />

        <div className="order-not-found">

          <div className="not-found-icon">
            📦
          </div>

          <h2>
            Order Not Found
          </h2>

          <p>
            We couldn't find this order.
          </p>

          <button
            className="back-orders-btn"
            onClick={() =>
              navigate("/orders")
            }
          >
            ← Back to Orders
          </button>

        </div>
      </>
    );
  }

  /*
   * Calculate values
   */

  const items = order.items || [];

  const totalItems = items.reduce(
    (total, item) =>
      total + Number(item.quantity || 1),
    0
  );

  const subtotal = items.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
        Number(item.quantity || 1),
    0
  );

  const delivery = 0;

  const discount = 0;

  const total = subtotal + delivery - discount;

  return (
    <>
      <Navbar />

      <div className="order-details-page">

        {/* PAGE HEADER */}

        <div className="order-details-header">

          <button
            className="back-orders-btn"
            onClick={() =>
              navigate("/orders")
            }
          >
            ← Back to Orders
          </button>

          <div className="order-details-title">

            <p>
              ORDER DETAILS
            </p>

            <h1>
              {order.orderId ||
                `ORD-${order.id}`}
            </h1>

          </div>

        </div>


        {/* ORDER STATUS CARD */}

        <div className="order-status-card">

          <div className="status-icon">
            ✓
          </div>

          <div>

            <h3>
              {order.status ||
                "Order Placed"}
            </h3>

            <p>
              Your order has been successfully placed.
            </p>

          </div>

        </div>


        {/* ORDER INFORMATION */}

        <div className="order-info-grid">

          <div className="order-info-box">

            <span>
              ORDER DATE
            </span>

            <strong>
              {order.date ||
                "Recently"}
            </strong>

          </div>


          <div className="order-info-box">

            <span>
              TOTAL ITEMS
            </span>

            <strong>
              {totalItems}
            </strong>

          </div>


          <div className="order-info-box">

            <span>
              PAYMENT
            </span>

            <strong>
              Cash / Online
            </strong>

          </div>


          <div className="order-info-box">

            <span>
              DELIVERY
            </span>

            <strong className="delivery-free">
              FREE
            </strong>

          </div>

        </div>


        {/* PRODUCTS */}

        <div className="order-details-layout">

          {/* LEFT SIDE */}

          <div className="order-details-products">

            <div className="details-section-title">

              <div>

                <p>
                  YOUR ITEMS
                </p>

                <h2>
                  Ordered Products
                </h2>

              </div>

              <span>
                {totalItems} item
                {totalItems !== 1
                  ? "s"
                  : ""}
              </span>

            </div>


            <div className="details-products-list">

              {items.length === 0 ? (

                <div className="no-order-items">
                  No products found in this order.
                </div>

              ) : (

                items.map((item, index) => {

                  const productName =
                    item.title ||
                    item.name ||
                    "Product";

                  const price =
                    Number(item.price) || 0;

                  const quantity =
                    Number(item.quantity) || 1;

                  const itemTotal =
                    price * quantity;

                  const image =
                    item.image ||
                    "https://placehold.co/150x150?text=Product";

                  return (

                    <div
                      className="details-product"
                      key={
                        item.id ||
                        index
                      }
                    >

                      {/* IMAGE */}

                      <div className="details-product-image">

                        <img
                          src={image}
                          alt={productName}

                          onError={(e) => {
                            e.currentTarget.src =
                              "https://placehold.co/150x150?text=Product";
                          }}
                        />

                      </div>


                      {/* PRODUCT INFORMATION */}

                      <div className="details-product-info">

                        <p className="details-category">
                          {item.category ||
                            "PRODUCT"}
                        </p>

                        <h3>
                          {productName}
                        </h3>

                        <p className="details-price">
                          ₹
                          {price.toLocaleString(
                            "en-IN"
                          )}{" "}
                          × {quantity}
                        </p>

                      </div>


                      {/* TOTAL */}

                      <div className="details-item-total">

                        <span>
                          Item Total
                        </span>

                        <strong>
                          ₹
                          {itemTotal.toLocaleString(
                            "en-IN"
                          )}
                        </strong>

                      </div>

                    </div>

                  );
                })

              )}

            </div>

          </div>


          {/* RIGHT SIDE - SUMMARY */}

          <div className="order-details-summary">

            <h2>
              Order Summary
            </h2>


            <div className="details-summary-row">

              <span>
                Subtotal
              </span>

              <strong>
                ₹
                {subtotal.toLocaleString(
                  "en-IN"
                )}
              </strong>

            </div>


            <div className="details-summary-row">

              <span>
                Delivery
              </span>

              <strong className="free">
                FREE
              </strong>

            </div>


            <div className="details-summary-row">

              <span>
                Discount
              </span>

              <strong>
                ₹0
              </strong>

            </div>


            <hr />


            <div className="details-total-row">

              <span>
                Total
              </span>

              <strong>
                ₹
                {total.toLocaleString(
                  "en-IN"
                )}
              </strong>

            </div>


            <div className="secure-order">
              🔒 Secure Order
            </div>

          </div>

        </div>


        {/* BOTTOM BUTTONS */}

        <div className="order-details-actions">

          <button
            className="continue-shopping-btn"
            onClick={() =>
              navigate("/dashboard")
            }
          >
            Continue Shopping
          </button>

          <button
            className="back-orders-btn"
            onClick={() =>
              navigate("/orders")
            }
          >
            View All Orders
          </button>

        </div>

      </div>
    </>
  );
};

export default OrderDetails;