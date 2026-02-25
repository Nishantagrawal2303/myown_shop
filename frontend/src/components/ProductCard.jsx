import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../api/api";

export default function ProductCard({ product }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Calculate a fake "original" price (10% higher) for the strikethrough effect
  const originalPrice = Math.ceil(product.price * 1.1);

  const addToCart = async () => {
    if (!user) {
      alert("Please login to add to cart");
      navigate("/login");
      return;
    }
    try {
      await api.post("/api/cart/add", {
        productId: product._id,
        quantity: 1,
      });
      alert("Added to cart 🛒");
    } catch (err) {
      alert("Error adding to cart");
    }
  };

  const deleteProduct = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await api.delete(`/api/products/${product._id}`);
      alert("Product deleted ✅");
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting product");
    }
  };

  return (
    <div className="product-card">
      {/* Product Image */}
      <div className="product-card__image-wrapper">
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            className="product-card__image"
          />
        ) : (
          <div className="product-card__image-placeholder">
            🛍️
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="product-card__body">
        {/* Category badge */}
        <span className="product-card__category">
          🏷️ {product.category}
        </span>

        {/* Product Title */}
        <h3 className="product-card__title">{product.title}</h3>

        {/* Description / weight */}
        {product.description && (
          <p className="product-card__desc">{product.description}</p>
        )}

        {/* Stock */}
        <p className="product-card__stock">
          {product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}
        </p>

        {/* Price Row + ADD Button */}
        <div className="product-card__footer">
          <div className="product-card__prices">
            <span className="product-card__price">₹{product.price}</span>
            <span className="product-card__original-price">₹{originalPrice}</span>
          </div>

          <button
            className="product-card__add-btn"
            onClick={addToCart}
            disabled={product.stock === 0}
          >
            ADD
          </button>
        </div>

        {/* Admin Delete Button */}
        {user && user.role === "admin" && (
          <button className="product-card__delete-btn" onClick={deleteProduct}>
            🗑️ Delete
          </button>
        )}
      </div>
    </div>
  );
}
