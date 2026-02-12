import api from "../api/api";

export default function ProductCard({ product }) {

  const addToCart = async () => {
    try {
      await api.post("/cart/add", {
        productId: product._id,
        quantity: 1,
      });

      alert("Added to cart 🛒");

    } catch (err) {
      alert("Login required");
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: 10, margin: 10 }}>
      <h3>{product.title}</h3>
      <p>₹ {product.price}</p>
      <button onClick={addToCart}>Add To Cart</button>
    </div>
  );
}
