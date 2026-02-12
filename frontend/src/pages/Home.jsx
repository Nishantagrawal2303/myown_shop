import { useEffect, useState } from "react";
import api from "../api/api";
import ProductCard from "../compoents/ProductCard.jsx";


export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products").then(res => setProducts(res.data));
  }, []);

  return (
    <div>
      <h1>Products</h1>
        
        {products.map(p => (
     <ProductCard key={p._id} product={p} />
     ))}
    </div>
  );
}
