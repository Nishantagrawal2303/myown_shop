import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/api";

export default function Admin() {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    stock: 1,
  });

  // ✅ Redirect non-admins to home
  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      navigate("/", { replace: true });
    }
  }, [user, loading, navigate]);

  // Show nothing while auth is loading
  if (loading) return null;
  if (!user || user.role !== "admin") return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/products/create", formData);
      alert("Product added successfully! ✅");
      setFormData({
        title: "",
        price: "",
        category: "",
        description: "",
        stock: 1,
      });
    } catch (error) {
      alert(error.response?.data?.message || "Error adding product");
    }
  };

  return (
    <div className="container">
      <h1>Admin Panel — Add Product</h1>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Price (₹):</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Stock:</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}