import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = () => {
  const username =
    localStorage.getItem("username") || "User";

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // =========================
  // FETCH PRODUCTS
  // =========================

  useEffect(() => {
    setLoading(true);

    axios
      .get("https://shopsphere-ecommerce-m9d1.onrender.com/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error("Failed to load products");
      });
  }, []);


  // =========================
  // OPEN PRODUCT DETAILS
  // =========================

  const handleProduct = (id) => {
    navigate(`/productdetails/${id}`);
  };


  // =========================
  // FILTER PRODUCTS
  // =========================

  const filteredProducts = products.filter(
    (product) => {
      const name =
        product.title ||
        product.name ||
        "";

      const matchesSearch = name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" ||
        product.category === category;

      return (
        matchesSearch &&
        matchesCategory
      );
    }
  );


  // =========================
  // SCROLL TO PRODUCTS
  // =========================

  const exploreProducts = () => {
    document
      .getElementById("products")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };


  // =========================
  // CLEAR FILTERS
  // =========================

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
  };


  return (
    <>
      <Navbar />

      <div className="dashboard">

        {/* =====================================
            HERO SECTION
        ====================================== */}

        <section className="hero-section">

          <div className="hero-content">

            <p className="hero-small">
              WELCOME BACK,{" "}
              {username.toUpperCase()} 👋
            </p>

            <h1>
              Discover Products
              <br />
              You'll Love.
            </h1>

            <p className="hero-description">
              Explore our collection of quality
              products at amazing prices.
            </p>

            <button
              className="hero-btn"
              onClick={exploreProducts}
            >
              Explore Products →
            </button>

          </div>


          {/* HERO CARD */}

          <div className="hero-card">

            <div className="hero-icon">
              🛍️
            </div>

            <h2>
              ShopSphere
            </h2>

            <p>
              Everything you need,
              <br />
              all in one place.
            </p>

            <div className="hero-card-stats">

              <div>
                <strong>
                  {products.length}+
                </strong>

                <span>
                  Products
                </span>
              </div>

              <div>
                <strong>
                  4.8 ⭐
                </strong>

                <span>
                  Rating
                </span>
              </div>

            </div>

          </div>

        </section>


        {/* =====================================
            PRODUCTS SECTION
        ====================================== */}

        <section
          className="products-section"
          id="products"
        >

          {/* SECTION HEADING */}

          <div className="section-heading">

            <div>

              <p className="section-small">
                OUR COLLECTION
              </p>

              <h2>
                Featured Products
              </h2>

              <p className="section-description">
                Find something perfect for you.
              </p>

            </div>

            <span>
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1
                ? "product"
                : "products"}
            </span>

          </div>


          {/* =====================================
              SEARCH + FILTER
          ====================================== */}

          <div className="product-controls">

            {/* SEARCH */}

            <div className="search-box">

              <span>
                🔍
              </span>

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

              {search && (
                <button
                  className="clear-search"
                  onClick={() =>
                    setSearch("")
                  }
                >
                  ×
                </button>
              )}

            </div>


            {/* CATEGORIES */}

            <div className="category-buttons">

              {[
                "All",
                "Electronics",
                "Fashion",
                "Home",
                "Accessories",
              ].map((item) => (

                <button
                  key={item}
                  className={
                    category === item
                      ? "category-btn active"
                      : "category-btn"
                  }
                  onClick={() =>
                    setCategory(item)
                  }
                >
                  {item}
                </button>

              ))}

            </div>

          </div>


          {/* =====================================
              ACTIVE FILTER
          ====================================== */}

          {(search ||
            category !== "All") && (

            <div className="active-filter">

              <span>
                Showing results for
                {search && (
                  <strong>
                    {" "}
                    "{search}"
                  </strong>
                )}

                {category !== "All" && (
                  <>
                    {" "}
                    in{" "}
                    <strong>
                      {category}
                    </strong>
                  </>
                )}
              </span>

              <button
                onClick={clearFilters}
              >
                Clear Filters
              </button>

            </div>

          )}


          {/* =====================================
              LOADING
          ====================================== */}

          {loading && (

            <div className="products-loading">

              <div className="loading-spinner">
                ⏳
              </div>

              <h3>
                Loading products...
              </h3>

              <p>
                Please wait while we fetch
                the latest products.
              </p>

            </div>

          )}


          {/* =====================================
              NO PRODUCTS
          ====================================== */}

          {!loading &&
            filteredProducts.length === 0 && (

              <div className="no-products">

                <div className="no-products-icon">
                  🔍
                </div>

                <h3>
                  No products found
                </h3>

                <p>
                  Try another search or
                  category.
                </p>

                <button
                  className="clear-filter-btn"
                  onClick={clearFilters}
                >
                  View All Products
                </button>

              </div>

            )}


          {/* =====================================
              PRODUCT GRID
          ====================================== */}

          {!loading &&
            filteredProducts.length > 0 && (

              <div className="product-grid">

                {filteredProducts.map(
                  (product) => {

                    const productName =
                      product.title ||
                      product.name ||
                      "Product";

                    const price =
                      Number(product.price) ||
                      0;

                    return (

                      <div
                        className="product-card"
                        key={product.id}
                      >

                        {/* PRODUCT IMAGE */}

                        <div className="product-image">

                          <img
                            src={product.image}
                            alt={productName}
                          />

                        </div>


                        {/* PRODUCT INFO */}

                        <div className="product-info">

                          <p className="product-category">
                            {product.category ||
                              "Product"}
                          </p>

                          <h3>
                            {productName}
                          </h3>


                          {/* RATING */}

                          <div className="product-rating">

                            <span>
                              ⭐⭐⭐⭐⭐
                            </span>

                            <span>
                              4.8
                            </span>

                            <small>
                              (120)
                            </small>

                          </div>


                          {/* PRICE + BUTTON */}

                          <div className="product-bottom">

                            <div>

                              <span className="price-label">
                                Price
                              </span>

                              <strong>
                                ₹
                                {price.toLocaleString(
                                  "en-IN"
                                )}
                              </strong>

                            </div>

                            <button
                              className="view-product-btn"
                              onClick={() =>
                                handleProduct(
                                  product.id
                                )
                              }
                            >
                              View →
                            </button>

                          </div>

                        </div>

                      </div>

                    );
                  }
                )}

              </div>

            )}

        </section>

      </div>
    </>
  );
};

export default Dashboard;