import React, { useState } from "react";
import "../Styles/Login.css";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const handleLogin = (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!passwordPattern.test(password)) {
      alert(
        "Password must be at least 8 characters long and include a letter, a number, and a special character."
      );
      return;
    }

    alert("Login successful!");
    navigate('/')
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">Welcome Back to 📜 DOSIVE</h2>
      <p className="login-subheading">
        Log in to manage your tasks efficiently.
      </p>

      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          className="login-input"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="login-input"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="login-button">
          Log In
        </button>
      </form>

      <div className="signup-link">
        Don't have an account?{" "}
        <Link to="/signup">
          <span>Sign Up</span>
        </Link>
      </div>
    </div>
  );
};

export default Login;
