import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AuthContext } from "./AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username && password) {
      try {
        const response = await fetch(
          "https://ras02-eas-14.azuremicroservices.io/auth/signin",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ dto: { username, password } }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          const { token, refreshToken, expirationDate, uid } = data;
          Cookies.set("jwt", token, { expires: new Date(expirationDate) });
          Cookies.set("refreshToken", refreshToken);
          login(uid); // Передаємо uid у функцію login
          navigate("/");
        } else {
          alert("Invalid username or password");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      alert("Please enter username and password");
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
