import React from "react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">

      {/* ================= NAVBAR ================= */}
      <nav className="home-navbar">

        <div
          className="home-logo"
          onClick={() => navigate("/")}
        >
          <span className="logo-icon">🛍️</span>
          <span>ShopSphere</span>
        </div>

        <div className="home-nav-links">
          <button onClick={() => navigate("/")}>
            Home
          </button>

          <button onClick={() => navigate("/login")}>
            Login
          </button>

          <button
            className="nav-signup-btn"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </div>

      </nav>


      {/* ================= HERO SECTION ================= */}
      <section className="home-hero">

        <div className="home-hero-content">

          <div className="hero-badge">
            ✨ Everything you need in one place
          </div>

          <h1>
            Shop Smarter.
            <br />
            <span>Live Better.</span>
          </h1>

          <p>
            Discover amazing products, explore great deals,
            and enjoy a simple shopping experience with
            ShopSphere.
          </p>

          <div className="hero-buttons">

            <button
              className="primary-home-btn"
              onClick={() => navigate("/signup")}
            >
              Start Shopping →
            </button>

            <button
              className="secondary-home-btn"
              onClick={() => navigate("/login")}
            >
              Login
            </button>

          </div>

          <div className="hero-features">

            <div>
              <strong>500+</strong>
              <span>Products</span>
            </div>

            <div>
              <strong>4.8★</strong>
              <span>Customer Rating</span>
            </div>

            <div>
              <strong>24/7</strong>
              <span>Support</span>
            </div>

          </div>

        </div>


        {/* HERO SHOPPING CARD */}
        <div className="home-hero-visual">

          <div className="floating-card card-one">
            🛒
            <div>
              <strong>Easy Shopping</strong>
              <span>Simple & fast</span>
            </div>
          </div>

          <div className="shopping-circle">

            <div className="shopping-bag">
              🛍️
            </div>

            <div className="circle-text">
              SHOP
            </div>

          </div>

          <div className="floating-card card-two">
            ❤️
            <div>
              <strong>Your Wishlist</strong>
              <span>Save your favorites</span>
            </div>
          </div>

        </div>

      </section>


      {/* ================= FEATURES ================= */}
      <section className="home-features-section">

        <div className="home-section-title">
          <p>WHY SHOPSPHERE?</p>

          <h2>
            Shopping made simple
          </h2>

          <span>
            Everything you need for a better online shopping experience.
          </span>
        </div>


        <div className="home-feature-grid">

          <div className="home-feature-card">
            <div className="feature-icon">
              🚚
            </div>

            <h3>
              Fast Delivery
            </h3>

            <p>
              Get your favorite products delivered quickly
              and conveniently.
            </p>
          </div>


          <div className="home-feature-card">
            <div className="feature-icon">
              🔒
            </div>

            <h3>
              Secure Shopping
            </h3>

            <p>
              Your shopping experience is designed with
              security and simplicity in mind.
            </p>
          </div>


          <div className="home-feature-card">
            <div className="feature-icon">
              ❤️
            </div>

            <h3>
              Wishlist
            </h3>

            <p>
              Save products you love and easily find them
              whenever you want.
            </p>
          </div>


          <div className="home-feature-card">
            <div className="feature-icon">
              ⭐
            </div>

            <h3>
              Quality Products
            </h3>

            <p>
              Explore a collection of products selected
              for quality and value.
            </p>
          </div>

        </div>

      </section>


      {/* ================= CATEGORIES ================= */}
      <section className="home-category-section">

        <div className="home-section-title">

          <p>EXPLORE</p>

          <h2>
            Shop by Category
          </h2>

        </div>


        <div className="home-category-grid">

          <div
            className="home-category-card electronics"
            onClick={() => navigate("/dashboard")}
          >
            <span>💻</span>
            <h3>Electronics</h3>
            <p>Latest gadgets & technology</p>
          </div>


          <div
            className="home-category-card fashion"
            onClick={() => navigate("/dashboard")}
          >
            <span>👕</span>
            <h3>Fashion</h3>
            <p>Style for every occasion</p>
          </div>


          <div
            className="home-category-card home"
            onClick={() => navigate("/dashboard")}
          >
            <span>🏠</span>
            <h3>Home</h3>
            <p>Make your home beautiful</p>
          </div>


          <div
            className="home-category-card accessories"
            onClick={() => navigate("/dashboard")}
          >
            <span>⌚</span>
            <h3>Accessories</h3>
            <p>Complete your look</p>
          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}
      <section className="home-cta">

        <div>

          <p>
            READY TO START?
          </p>

          <h2>
            Your next favorite product
            is waiting for you.
          </h2>

          <button
            onClick={() => navigate("/signup")}
          >
            Create Your Account →
          </button>

        </div>

      </section>


      {/* ================= FOOTER ================= */}
      <footer className="home-footer">

        <div className="footer-brand">

          <div className="home-logo">
            🛍️ ShopSphere
          </div>

          <p>
            Your simple and smarter shopping destination.
          </p>

        </div>


        <div className="footer-links">

          <h4>Shop</h4>

          <button onClick={() => navigate("/dashboard")}>
            Products
          </button>

          <button onClick={() => navigate("/login")}>
            Login
          </button>

          <button onClick={() => navigate("/signup")}>
            Sign Up
          </button>

        </div>


        <div className="footer-links">

          <h4>Categories</h4>

          <span>Electronics</span>
          <span>Fashion</span>
          <span>Home</span>
          <span>Accessories</span>

        </div>


        <div className="footer-contact">

          <h4>Contact</h4>

          <span>📧 support@shopsphere.com</span>
          <span>📞 +91 98765 43210</span>
          <span>📍 India</span>

        </div>

      </footer>


      <div className="footer-bottom">
        © 2026 ShopSphere. All rights reserved.
      </div>

    </div>
  );
};

export default Homepage;