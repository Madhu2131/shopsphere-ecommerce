import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedWishlist = JSON.parse(
      localStorage.getItem("wishlist") || "[]"
    );

    setWishlist(savedWishlist);
  }, []);

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter(
      (item) => item.id !== id
    );

    setWishlist(updatedWishlist);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updatedWishlist)
    );

    toast.success("Removed from wishlist");
  };

  const addToCart = (product) => {
    const cart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    const existingProduct = cart.find(
      (item) => item.id === product.id
    );

    let updatedCart;

    if (existingProduct) {
      updatedCart = cart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity:
                Number(item.quantity || 1) + 1,
            }
          : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ];
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(
      new Event("cartUpdated")
    );

    toast.success("Added to cart");
  };

  return (
    <>
      <Navbar />

      <div className="wishlist-page">

        {/* HEADER */}

        <div className="wishlist-header">

          <div>
            <p className="wishlist-small">
              YOUR COLLECTION
            </p>

            <h1>
              My Wishlist ❤️
            </h1>

            <p>
              Save your favorite products for later.
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


        {/* EMPTY WISHLIST */}

        {wishlist.length === 0 ? (

          <div className="empty-wishlist">

            <div className="empty-wishlist-icon">
              ♡
            </div>

            <h2>
              Your wishlist is empty
            </h2>

            <p>
              Save products you love and
              find them here later.
            </p>

            <button
              className="shop-now-btn"
              onClick={() =>
                navigate("/dashboard")
              }
            >
              Discover Products →
            </button>

          </div>

        ) : (

          <div className="wishlist-grid">

            {wishlist.map((product) => {

              const productName =
                product.title ||
                product.name ||
                "Product";

              return (

                <div
                  className="wishlist-card"
                  key={product.id}
                >

                  {/* IMAGE */}

                  <div className="wishlist-image">

                    <img
                      src={product.image}
                      alt={productName}
                    />

                    <button
                      className="wishlist-remove"
                      onClick={() =>
                        removeFromWishlist(
                          product.id
                        )
                      }
                    >
                      ♥
                    </button>

                  </div>


                  {/* INFO */}

                  <div className="wishlist-info">

                    <p>
                      {product.category ||
                        "Product"}
                    </p>

                    <h3>
                      {productName}
                    </h3>

                    <div className="wishlist-bottom">

                      <strong>
                        ₹
                        {Number(
                          product.price
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </strong>

                      <button
                        className="wishlist-cart-btn"
                        onClick={() =>
                          addToCart(product)
                        }
                      >
                        🛒 Add to Cart
                      </button>

                    </div>

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

export default Wishlist;