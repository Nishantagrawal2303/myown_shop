import { useEffect, useState } from "react";
import api from "../api/api";
import ProductCard from "../components/ProductCard.jsx";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/api/products").then(res => {
      setProducts(res.data);
    });
  }, []);

  return (
    <div className="container">
      <h1>Our Products</h1>
      <div className="products-grid">
        {products.map(p => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
}
