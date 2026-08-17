import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Signup = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();


  function signup(e) {

    e.preventDefault();

    const data = {
      name,
      email,
      mobile,
      password
    };


    axios
      .post("https://shopsphere-ecommerce-m9d1.onrender.com/users", data)
      .then(() => {

        toast.success("Account created successfully!");

        setName("");
        setEmail("");
        setMobile("");
        setPassword("");

        setTimeout(() => {
          navigate("/login");
        }, 700);

      })
      .catch(() => {

        toast.error("Failed to create account");

      });
  }


  return (

    <div className="auth-page">

      {/* LEFT BRANDING */}

      <div className="auth-brand">

        <div className="brand-logo">
          🛍️
        </div>

        <h1>ShopSphere</h1>

        <p>
          Discover products.
          <br />
          Shop smarter.
        </p>

        <div className="brand-features">

          <div>
            <span>✓</span>
            Thousands of Products
          </div>

          <div>
            <span>✓</span>
            Secure Payments
          </div>

          <div>
            <span>✓</span>
            Easy Order Tracking
          </div>

        </div>

      </div>


      {/* SIGNUP CARD */}

      <div className="auth-section">

        <div className="auth-card">

          <div className="auth-header">

            <div className="mobile-brand">
              🛍️ ShopSphere
            </div>

            <h2>Create Account ✨</h2>

            <p>
              Join ShopSphere and start shopping
            </p>

          </div>


          <form onSubmit={signup}>

            {/* NAME */}

            <div className="input-group">

              <label>Full Name</label>

              <div className="input-wrapper">

                <span>👤</span>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  required
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                />

              </div>

            </div>


            {/* EMAIL */}

            <div className="input-group">

              <label>Email Address</label>

              <div className="input-wrapper">

                <span>✉️</span>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  required
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                />

              </div>

            </div>


            {/* MOBILE */}

            <div className="input-group">

              <label>Mobile Number</label>

              <div className="input-wrapper">

                <span>📱</span>

                <input
                  type="tel"
                  placeholder="Enter mobile number"
                  value={mobile}
                  required
                  onChange={(e) =>
                    setMobile(e.target.value)
                  }
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div className="input-group">

              <label>Password</label>

              <div className="input-wrapper">

                <span>🔒</span>

                <input
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  required
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />

              </div>

            </div>


            {/* SIGNUP BUTTON */}

            <button
              type="submit"
              className="auth-btn"
            >
              Create Account
              <span>→</span>
            </button>

          </form>


          {/* LOGIN */}

          <div className="auth-footer">

            <p>
              Already have an account?
              <Link to="/login">
                Login
              </Link>
            </p>

          </div>

        </div>

      </div>

    </div>

  );
};

export default Signup;