import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  // Fetch product
  useEffect(() => {
    axios
      .get(`https://shopsphere-ecommerce-m9d1.onrender.com/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Unable to load product");
        setLoading(false);
      });
  }, [id]);

  // Add to cart
  const addToCart = () => {
    const existingCart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    const existingProduct = existingCart.find(
      (item) => item.id === product.id
    );

    let updatedCart;

    if (existingProduct) {
      updatedCart = existingCart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + quantity,
            }
          : item
      );
    } else {
      updatedCart = [
        ...existingCart,
        {
          ...product,
          quantity: quantity,
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

    toast.success("Added to cart 🛒");
  };

  // Add to wishlist
  const addToWishlist = () => {
    const existingWishlist = JSON.parse(
      localStorage.getItem("wishlist") || "[]"
    );

    const alreadyExists = existingWishlist.some(
      (item) => item.id === product.id
    );

    if (alreadyExists) {
      toast.info("Already in wishlist ❤️");
      return;
    }

    const updatedWishlist = [
      ...existingWishlist,
      product,
    ];

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updatedWishlist)
    );

    window.dispatchEvent(
      new Event("wishlistUpdated")
    );

    toast.success("Added to wishlist ❤️");
  };

  // Buy now
  const buyNow = () => {
    const existingCart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    const existingProduct = existingCart.find(
      (item) => item.id === product.id
    );

    let updatedCart;

    if (existingProduct) {
      updatedCart = existingCart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + quantity,
            }
          : item
      );
    } else {
      updatedCart = [
        ...existingCart,
        {
          ...product,
          quantity: quantity,
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

    navigate("/cart");
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="product-loading">
          <div className="loading-spinner"></div>
          <p>Loading product...</p>
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />

        <div className="product-not-found">
          <h2>Product not found 😕</h2>

          <button
            onClick={() => navigate("/dashboard")}
          >
            Back to Products
          </button>
        </div>
      </>
    );
  }

  const productName =
    product.title ||
    product.name ||
    "Product";

  const rating = product.rating || 4.5;

  return (
    <>
      <Navbar />

      <main className="product-details-page">

        {/* BACK BUTTON */}

        <button
          className="back-products-btn"
          onClick={() => navigate("/dashboard")}
        >
          ← Back to Products
        </button>


        {/* PRODUCT */}

        <div className="product-details-card">

          {/* IMAGE SECTION */}

          <div className="product-details-image-section">

            <div className="product-details-image">

              <img
                src={product.image}
                alt={productName}
              />

            </div>

            <div className="image-badge">
              ✓ In Stock
            </div>

          </div>


          {/* INFORMATION */}

          <div className="product-details-info">

            <p className="details-category">
              {product.category || "PRODUCT"}
            </p>

            <h1>
              {productName}
            </h1>


            {/* RATING */}

            <div className="details-rating">

              <span className="stars">
                {"★".repeat(Math.round(rating))}
              </span>

              <strong>
                {rating}
              </strong>

              <span>
                (120 reviews)
              </span>

            </div>


            {/* PRICE */}

            <div className="details-price">

              ₹
              {Number(product.price).toLocaleString(
                "en-IN"
              )}

            </div>


            {/* DESCRIPTION */}

            <p className="details-description">
              {product.description ||
                "This premium product is designed to provide excellent quality, comfort and value. Perfect for everyday use."}
            </p>


            <div className="details-divider"></div>


            {/* QUANTITY */}

            <div className="quantity-section">

              <span>
                Quantity
              </span>

              <div className="quantity-selector">

                <button
                  onClick={() =>
                    setQuantity(
                      Math.max(1, quantity - 1)
                    )
                  }
                >
                  −
                </button>

                <span>
                  {quantity}
                </span>

                <button
                  onClick={() =>
                    setQuantity(quantity + 1)
                  }
                >
                  +
                </button>

              </div>

            </div>


            {/* BUTTONS */}

            <div className="product-action-buttons">

              <button
                className="add-cart-btn"
                onClick={addToCart}
              >
                🛒 Add to Cart
              </button>

              <button
                className="wishlist-product-btn"
                onClick={addToWishlist}
              >
                ♡
              </button>

            </div>


            <button
              className="buy-now-btn"
              onClick={buyNow}
            >
              ⚡ Buy Now
            </button>


            {/* BENEFITS */}

            <div className="product-benefits">

              <div>
                <span>🚚</span>

                <div>
                  <strong>
                    Free Delivery
                  </strong>

                  <p>
                    On orders above ₹999
                  </p>
                </div>
              </div>


              <div>
                <span>🔒</span>

                <div>
                  <strong>
                    Secure Payment
                  </strong>

                  <p>
                    100% secure checkout
                  </p>
                </div>
              </div>


              <div>
                <span>↩️</span>

                <div>
                  <strong>
                    Easy Returns
                  </strong>

                  <p>
                    7 day return policy
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </main>
    </>
  );
};

export default ProductDetails;