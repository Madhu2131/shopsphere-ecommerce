import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    setCart(savedCart);
  }, []);

  // Update localStorage
  const updateCart = (updatedCart) => {
    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    // Tell Navbar to update cart count
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // Increase quantity
  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: item.quantity + 1
        };
      }

      return item;
    });

    updateCart(updatedCart);
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    const updatedCart = cart
      .map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: item.quantity - 1
          };
        }

        return item;
      })
      .filter((item) => item.quantity > 0);

    updateCart(updatedCart);
  };

  // Remove product
  const removeItem = (id) => {
    const updatedCart = cart.filter(
      (item) => item.id !== id
    );

    updateCart(updatedCart);
  };

  // Calculate total items
  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Calculate total price
  const totalPrice = cart.reduce(
    (total, item) =>
      total +
      Number(item.price) * item.quantity,
    0
  );

  return (
    <div className="cart-page">

      <Navbar />

      <div className="cart-container">

        {/* Header */}

        <div className="cart-header">

          <div>
            <p className="cart-subtitle">
              YOUR SHOPPING CART
            </p>

            <h1>
              Shopping Cart
            </h1>

            <p>
              {totalItems} item
              {totalItems !== 1 ? "s" : ""} in your cart
            </p>
          </div>

          <button
            className="continue-shopping-btn"
            onClick={() => navigate("/dashboard")}
          >
            ← Continue Shopping
          </button>

        </div>


        {/* Empty Cart */}

        {cart.length === 0 && (

          <div className="empty-cart">

            <div className="empty-cart-icon">
              🛒
            </div>

            <h2>
              Your cart is empty
            </h2>

            <p>
              Looks like you haven't added
              anything to your cart yet.
            </p>

            <button
              className="shop-now-btn"
              onClick={() => navigate("/dashboard")}
            >
              Start Shopping →
            </button>

          </div>

        )}


        {/* Cart Content */}

        {cart.length > 0 && (

          <div className="cart-layout">

            {/* LEFT SIDE */}

            <div className="cart-items">

              {cart.map((item) => {

                const productName =
                  item.title ||
                  item.name ||
                  "Product";

                return (

                  <div
                    className="cart-item"
                    key={item.id}
                  >

                    {/* Image */}

                    <div className="cart-item-image">

                      <img
                        src={item.image}
                        alt={productName}
                      />

                    </div>


                    {/* Product Info */}

                    <div className="cart-item-info">

                      <p className="cart-item-category">
                        {item.category ||
                          "Product"}
                      </p>

                      <h3>
                        {productName}
                      </h3>

                      <p className="cart-item-price">
                        ₹
                        {Number(item.price).toLocaleString(
                          "en-IN"
                        )}
                      </p>

                    </div>


                    {/* Quantity */}

                    <div className="quantity-control">

                      <button
                        onClick={() =>
                          decreaseQuantity(item.id)
                        }
                      >
                        −
                      </button>

                      <span>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          increaseQuantity(item.id)
                        }
                      >
                        +
                      </button>

                    </div>


                    {/* Item Total */}

                    <div className="cart-item-total">

                      <strong>
                        ₹
                        {(
                          Number(item.price) *
                          item.quantity
                        ).toLocaleString("en-IN")}
                      </strong>

                    </div>


                    {/* Remove */}

                    <button
                      className="remove-item-btn"
                      onClick={() =>
                        removeItem(item.id)
                      }
                      title="Remove item"
                    >
                      🗑️
                    </button>

                  </div>

                );
              })}

            </div>


            {/* RIGHT SIDE - SUMMARY */}

            <div className="cart-summary">

              <h2>
                Order Summary
              </h2>

              <div className="summary-row">

                <span>
                  Subtotal
                </span>

                <strong>
                  ₹
                  {totalPrice.toLocaleString(
                    "en-IN"
                  )}
                </strong>

              </div>


              <div className="summary-row">

                <span>
                  Delivery
                </span>

                <strong className="free">
                  FREE
                </strong>

              </div>


              <div className="summary-row">

                <span>
                  Discount
                </span>

                <strong>
                  ₹0
                </strong>

              </div>


              <hr />


              <div className="summary-total">

                <span>
                  Total
                </span>

                <strong>
                  ₹
                  {totalPrice.toLocaleString(
                    "en-IN"
                  )}
                </strong>

              </div>


              <button
                className="checkout-btn"
                onClick={() =>
                  navigate("/checkout")
                }
              >
                Proceed to Checkout →
              </button>


              <div className="secure-checkout">

                🔒 Secure Checkout

              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  );
};

export default Cart;