import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      // Get orders from localStorage
      const savedOrders = JSON.parse(
        localStorage.getItem("orders") || "[]"
      );

      // Get latest products
      const response = await axios.get(
        "https://shopsphere-ecommerce-m9d1.onrender.com/products"
      );

      const productData = response.data;

      setProducts(productData);

      /*
       * Fix old orders:
       * If an order was created before the price/image
       * was correctly stored, get the latest product data.
       */
      const updatedOrders = savedOrders.map((order) => {
        const updatedItems = (order.items || []).map((item) => {
          const latestProduct = productData.find(
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
            quantity: Number(item.quantity) || 1,
            price: Number(item.price) || 0,
          };
        });

        // Recalculate order total
        const calculatedTotal = updatedItems.reduce(
          (total, item) =>
            total +
            Number(item.price || 0) *
              Number(item.quantity || 1),
          0
        );

        return {
          ...order,
          items: updatedItems,
          total: calculatedTotal,
        };
      });

      setOrders(updatedOrders);

      // Save corrected orders back to localStorage
      localStorage.setItem(
        "orders",
        JSON.stringify(updatedOrders)
      );
    } catch (error) {
      console.error("Failed to load orders:", error);

      // Still show orders even if products API fails
      const savedOrders = JSON.parse(
        localStorage.getItem("orders") || "[]"
      );

      setOrders(savedOrders);
    }
  };

  const getProductName = (item) => {
    return (
      item.title ||
      item.name ||
      "Product"
    );
  };

  const getImage = (item) => {
    return (
      item.image ||
      "https://placehold.co/150x150?text=Product"
    );
  };

  const getItemPrice = (item) => {
    return Number(item.price) || 0;
  };

  const getItemQuantity = (item) => {
    return Number(item.quantity) || 1;
  };

  const getOrderTotal = (order) => {
    if (order.items && order.items.length > 0) {
      return order.items.reduce(
        (total, item) =>
          total +
          getItemPrice(item) *
            getItemQuantity(item),
        0
      );
    }

    return Number(order.total) || 0;
  };

  const getFirstItem = (order) => {
    if (
      order.items &&
      order.items.length > 0
    ) {
      return order.items[0];
    }

    return null;
  };

  return (
    <>
      <Navbar />

      <div className="orders-page">

        {/* HEADER */}

        <div className="orders-header">

          <div>
            <p className="section-small">
              YOUR PURCHASES
            </p>

            <h1>
              My Orders
            </h1>

            <p>
              Track and manage your orders
            </p>
          </div>

          <button
            className="continue-shopping-btn"
            onClick={() =>
              navigate("/dashboard")
            }
          >
            ← Continue Shopping
          </button>

        </div>


        {/* EMPTY ORDERS */}

        {orders.length === 0 ? (

          <div className="empty-orders">

            <div className="empty-orders-icon">
              📦
            </div>

            <h2>
              No orders yet
            </h2>

            <p>
              You haven't placed any orders yet.
            </p>

            <button
              className="shop-now-btn"
              onClick={() =>
                navigate("/dashboard")
              }
            >
              Start Shopping →
            </button>

          </div>

        ) : (

          <div className="orders-list">

            {orders.map((order, index) => {

              const firstItem =
                getFirstItem(order);

              const orderTotal =
                getOrderTotal(order);

              const totalQuantity =
                (order.items || []).reduce(
                  (total, item) =>
                    total +
                    getItemQuantity(item),
                  0
                );

              return (

                <div
                  className="order-card"
                  key={
                    order.id ||
                    order.orderId ||
                    index
                  }
                >

                  {/* ORDER HEADER */}

                  <div className="order-card-header">

                    <div>

                      <p className="order-label">
                        ORDER ID
                      </p>

                      <h2>
                        {order.orderId ||
                          `ORD-${order.id}`}
                      </h2>

                      {order.date && (
                        <p className="order-date">
                          Ordered on{" "}
                          {order.date}
                        </p>
                      )}

                    </div>


                    <div className="order-status">
                      ✓{" "}
                      {order.status ||
                        "Order Placed"}
                    </div>

                  </div>


                  {/* PRODUCT */}

                  {firstItem && (

                    <div className="order-product">

                      <div className="order-product-image">

                        <img
                          src={getImage(
                            firstItem
                          )}
                          alt={getProductName(
                            firstItem
                          )}

                          onError={(e) => {
                            e.currentTarget.src =
                              "https://placehold.co/150x150?text=Product";
                          }}
                        />

                      </div>


                      <div className="order-product-info">

                        <p className="order-product-category">
                          {firstItem.category ||
                            "PRODUCT"}
                        </p>

                        <h3>
                          {getProductName(
                            firstItem
                          )}
                        </h3>

                        <p className="order-quantity">
                          Quantity:{" "}
                          {totalQuantity}
                        </p>

                      </div>

                    </div>

                  )}


                  {/* ORDER FOOTER */}

                  <div className="order-card-footer">

                    <div>

                      <p className="total-label">
                        TOTAL AMOUNT
                      </p>

                      <h2>
                        ₹
                        {orderTotal.toLocaleString(
                          "en-IN"
                        )}
                      </h2>

                    </div>


                    <button
                      className="view-order-btn"
                      onClick={() =>
                        navigate(
                          `/orders/${
                            order.id ||
                            order.orderId
                          }`
                        )
                      }
                    >
                      View Details →
                    </button>

                  </div>

                </div>

              );
            })}

          </div>

        )}

      </div>
    </>
  );
};

export default Orders;