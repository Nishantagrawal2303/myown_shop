import { useState, useContext } from "react";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Login() {
  const auth = useContext(AuthContext); // safer than destructure

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const submit = async () => {
  try {
    const res = await api.post("/auth/login", {
      email,
      password,
    });

    auth.login(res.data);   // context login
    alert("Login success");

  } catch (err) {
    alert(err.response?.data?.message || "Login failed");
  }
};


  return (
    <div>
      <h2>Login</h2>

      <input
        placeholder="email"
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="password"
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={submit}>Login</button>
    </div>
  );
}
