import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function login(e) {
    e.preventDefault();

    axios
      .get("https://shopsphere-ecommerce-m9d1.onrender.com/users")
      .then((res) => {
        const users = res.data;

        const result = users.find((user) => {
          return (
            user.email === email &&
            user.password === password
          );
        });

        if (result) {
          toast.success("Login Successful!");

          localStorage.setItem("userID", result.id);
          localStorage.setItem("isLogged", "true");
          localStorage.setItem("username", result.name);

          setTimeout(() => {
            navigate("/dashboard");
          }, 500);
        } else {
          toast.error("Invalid email or password");
        }
      })
      .catch(() => {
        toast.error("Unable to connect to server");
      });
  }

  return (
    <div className="auth-page">

      {/* LEFT BRANDING SECTION */}

      <div className="auth-brand">

        <div className="brand-logo">
          🛍️
        </div>

        <h1>ShopSphere</h1>

        <p>
          Your one-stop destination for
          <br />
          everything you love.
        </p>

        <div className="brand-features">

          <div>
            <span>✓</span>
            Quality Products
          </div>

          <div>
            <span>✓</span>
            Secure Shopping
          </div>

          <div>
            <span>✓</span>
            Fast Delivery
          </div>

        </div>

      </div>


      {/* LOGIN CARD */}

      <div className="auth-section">

        <div className="auth-card">

          <div className="auth-header">

            <div className="mobile-brand">
              🛍️ ShopSphere
            </div>

            <h2>Welcome Back 👋</h2>

            <p>
              Login to continue shopping
            </p>

          </div>


          <form onSubmit={login}>

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


            {/* PASSWORD */}

            <div className="input-group">

              <label>Password</label>

              <div className="input-wrapper">

                <span>🔒</span>

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  required
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />

              </div>

            </div>


            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="auth-btn"
            >
              Login
              <span>→</span>
            </button>

          </form>


          {/* SIGNUP */}

          <div className="auth-footer">

            <p>
              Don't have an account?
              <Link to="/signup">
                Create Account
              </Link>
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;