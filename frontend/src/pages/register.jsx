import { useState } from "react";
import api from "../api/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    try {
      const res = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Registered successfully ✅");

      setName("");
      setEmail("");
      setPassword("");

    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <input
        placeholder="name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <input
        placeholder="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={submit}>Register</button>
    </div>
  );
}
