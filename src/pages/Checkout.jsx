import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Checkout = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  const [formData, setFormData] = useState({
    name: localStorage.getItem("username") || "",
    email: "",
    mobile: "",
    address: "",
    city: "",
    pincode: "",
  });

  // Load cart
  useEffect(() => {
    const savedCart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    setCart(savedCart);

    // If cart is empty, go back to cart
    if (savedCart.length === 0) {
      navigate("/cart");
    }
  }, [navigate]);


  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };


  // Calculate total
  const totalPrice = cart.reduce(
    (total, item) =>
      total +
      Number(item.price) *
        Number(item.quantity || 1),
    0
  );


  // Place Order
  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }


    // Create new order
    const newOrder = {
      id: Date.now(),

      orderId: `ORD-${Date.now()}`,

      items: cart,

      total: totalPrice,

      status: "Order Placed",

      date: new Date().toLocaleDateString(
        "en-IN"
      ),

      customer: {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        address: formData.address,
        city: formData.city,
        pincode: formData.pincode,
      },
    };


    // Get existing orders
    const existingOrders = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );


    // Save new order
    localStorage.setItem(
      "orders",
      JSON.stringify([
        newOrder,
        ...existingOrders,
      ])
    );


    // Clear cart
    localStorage.removeItem("cart");


    // Update Navbar cart count
    window.dispatchEvent(
      new Event("cartUpdated")
    );


    // Show success message
    toast.success("Order placed successfully!");


    // Go to Orders
    setTimeout(() => {
      navigate("/orders");
    }, 800);
  };


  return (
    <>
      <Navbar />

      <div className="checkout-page">

        {/* HEADER */}

        <div className="checkout-header">

          <div>
            <p className="checkout-small">
              SECURE CHECKOUT
            </p>

            <h1>
              Complete Your Order
            </h1>

            <p>
              Enter your delivery details to place
              your order.
            </p>
          </div>

          <button
            className="continue-shopping-btn"
            onClick={() =>
              navigate("/cart")
            }
          >
            ← Back to Cart
          </button>

        </div>


        {/* CHECKOUT CONTENT */}

        <div className="checkout-layout">

          {/* LEFT SIDE */}

          <form
            className="checkout-form"
            onSubmit={handlePlaceOrder}
          >

            <h2>
              Delivery Information
            </h2>

            <p className="form-description">
              Please provide your delivery details.
            </p>


            {/* NAME */}

            <div className="input-group">

              <label>
                Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />

            </div>


            {/* EMAIL */}

            <div className="input-group">

              <label>
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>


            {/* MOBILE */}

            <div className="input-group">

              <label>
                Mobile Number
              </label>

              <input
                type="tel"
                name="mobile"
                placeholder="Enter mobile number"
                value={formData.mobile}
                onChange={handleChange}
                required
              />

            </div>


            {/* ADDRESS */}

            <div className="input-group">

              <label>
                Address
              </label>

              <textarea
                name="address"
                placeholder="Enter your complete address"
                value={formData.address}
                onChange={handleChange}
                rows="4"
                required
              />

            </div>


            {/* CITY + PINCODE */}

            <div className="input-row">

              <div className="input-group">

                <label>
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="input-group">

                <label>
                  Pincode
                </label>

                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            {/* PAYMENT */}

            <div className="payment-box">

              <div className="payment-icon">
                🔒
              </div>

              <div>

                <strong>
                  Secure Payment
                </strong>

                <p>
                  Your payment information is
                  securely processed.
                </p>

              </div>

            </div>


            <button
              type="submit"
              className="place-order-btn"
            >
              Place Order →
            </button>

          </form>


          {/* RIGHT SIDE */}

          <div className="checkout-summary">

            <h2>
              Order Summary
            </h2>


            {/* PRODUCTS */}

            <div className="checkout-items">

              {cart.map((item) => {

                const productName =
                  item.title ||
                  item.name ||
                  "Product";

                return (

                  <div
                    className="checkout-item"
                    key={item.id}
                  >

                    <div className="checkout-item-image">

                      <img
                        src={item.image}
                        alt={productName}
                      />

                    </div>


                    <div className="checkout-item-info">

                      <h4>
                        {productName}
                      </h4>

                      <p>
                        Qty:{" "}
                        {item.quantity || 1}
                      </p>

                    </div>


                    <strong>
                      ₹
                      {(
                        Number(item.price) *
                        Number(item.quantity || 1)
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </strong>

                  </div>

                );
              })}

            </div>


            {/* TOTALS */}

            <div className="checkout-total-row">

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


            <div className="checkout-total-row">

              <span>
                Delivery
              </span>

              <strong className="free">
                FREE
              </strong>

            </div>


            <hr />


            <div className="checkout-grand-total">

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


            <div className="checkout-security">
              🔐 Safe & Secure Checkout
            </div>

          </div>

        </div>

      </div>
    </>
  );
};

export default Checkout;