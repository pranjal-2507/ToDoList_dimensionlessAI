import React, { useState } from "react";
import "../Styles/Signup.css";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameBlur = () => {
    const usernamePattern = /^(?=.*[a-zA-Z])[a-zA-Z0-9]{3,15}$/;

    if (username && !usernamePattern.test(username)) {
      alert("Username must be 3-15 characters long and contain only letters.");
    }
  };

  const handleSignup = (e) => {
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

    alert("Signup successful!");
    navigate('/')
  };

  return (
    <div className="signup-container">
      <h2 className="signup-heading">Welcome to 📜 DOSIVE</h2>
      <p className="signup-subheading">
        Sign up to manage your tasks efficiently.
      </p>

      <form className="signup-form" onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          className="signup-input"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onBlur={handleUsernameBlur}
        />
        <input
          type="email"
          placeholder="Email"
          className="signup-input"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="signup-input"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>

      <div className="login-link">
        Already have an account?{" "}
        <Link to="/login">
          <span>Log In</span>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
