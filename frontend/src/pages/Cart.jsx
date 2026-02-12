import { useEffect, useState } from "react";
import api from "../api/api";

export default function Cart() {
  const [cart, setCart] = useState(null);

  const loadCart = async () => {
    const res = await api.get("/cart");
    setCart(res.data);
  };

  const removeItem = async (id) => {
    await api.delete(`/cart/remove/${id}`);
    loadCart();
  };
  const checkout = async () => {
    const res = await api.post("/orders/checkout", {
      paymentMethod: "UPI"
    });

    alert("Order created ✅");
    console.log(res.data);
    loadCart();
  };
  const payNow = async () => {
  const { data } = await api.post("/payment/create-order", {
    amount: total,
  });

  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY,
    amount: data.amount,
    currency: "INR",
    order_id: data.id,
    name: "Nishant Kirana Store",

    handler: async function (response) {
      await api.post("/payment/verify", response);
      alert("Payment Success ✅");
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};



  useEffect(() => {
    loadCart();
  }, []);

  const total =
    cart?.items?.reduce(
      (sum, i) => sum + i.product.price * i.quantity,
      0
    ) || 0;

  if (!cart) return <p>Loading...</p>;

  return (
    <div>
      <h2>My Cart</h2>

      {cart.items.map((item) => (
        <div key={item.product._id}
             style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          <h4>{item.product.title}</h4>
          <p>₹ {item.product.price}</p>
          <p>Qty: {item.quantity}</p>

          <button onClick={() => removeItem(item.product._id)}>
            Remove
          </button>
          
        </div>
      ))}

      <h3>Total: ₹ {total}</h3>
     <button onClick={checkout}>
        Checkout
      </button>
      <button onClick={payNow}>
       Pay with UPI 💳
</button>
    </div>
  );
}
