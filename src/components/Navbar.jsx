import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [cartCount, setCartCount] = useState(0);

  const username =
    localStorage.getItem("username") || "User";

  // =========================
  // UPDATE CART COUNT
  // =========================

  const updateCartCount = () => {
    const cart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    const count = cart.reduce(
      (total, item) =>
        total + Number(item.quantity || 1),
      0
    );

    setCartCount(count);
  };

  useEffect(() => {
    updateCartCount();

    window.addEventListener(
      "cartUpdated",
      updateCartCount
    );

    return () => {
      window.removeEventListener(
        "cartUpdated",
        updateCartCount
      );
    };
  }, []);


  // =========================
  // LOGOUT
  // =========================

  const logout = () => {
    localStorage.removeItem("userID");
    localStorage.removeItem("isLogged");
    localStorage.removeItem("username");

    toast.success("Logged out successfully");

    setTimeout(() => {
      navigate("/login");
    }, 700);
  };


  return (
    <nav className="main-navbar">

      {/* LOGO */}

      <div
        className="navbar-logo"
        onClick={() => navigate("/dashboard")}
      >
        <span className="logo-icon">
          🛍️
        </span>

        <span>
          ShopSphere
        </span>
      </div>


      {/* NAVIGATION */}

      <div className="navbar-links">

        <button
          className={
            location.pathname === "/dashboard"
              ? "nav-link active"
              : "nav-link"
          }
          onClick={() =>
            navigate("/dashboard")
          }
        >
          Products
        </button>


        <button
          className={
            location.pathname === "/wishlist"
              ? "nav-link active"
              : "nav-link"
          }
          onClick={() =>
            navigate("/wishlist")
          }
        >
          ♡ Wishlist
        </button>


        <button
          className={
            location.pathname === "/orders"
              ? "nav-link active"
              : "nav-link"
          }
          onClick={() =>
            navigate("/orders")
          }
        >
          Orders
        </button>


        {/* CART */}

        <button
          className="cart-nav-btn"
          onClick={() =>
            navigate("/cart")
          }
        >
          🛒 Cart

          {cartCount > 0 && (
            <span className="cart-count">
              {cartCount}
            </span>
          )}

        </button>

      </div>


      {/* USER */}

      <div className="navbar-user">

        <div className="user-avatar">
          {username
            .charAt(0)
            .toUpperCase()}
        </div>

        <span className="user-name">
          Hi, {username}
        </span>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </nav>
  );
};

export default Navbar;