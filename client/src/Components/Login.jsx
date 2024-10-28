
import React from "react";
import "../Styles/Login.css"; 

const Login = () => {
  return (
    <div className="login-container">
      <h2 className="login-heading">Welcome Back to 📜 DOSIVE</h2>
      <p className="login-subheading">Log in to manage your tasks efficiently.</p>
      
      <form className="login-form">
        <input type="email" placeholder="Email" className="login-input" required />
        <input type="password" placeholder="Password" className="login-input" required />
        <button type="submit" className="login-button">Log In</button>
      </form>

      <div className="signup-link">
        Don't have an account? <a href="/signup">Sign Up</a>
      </div>
    </div>
  );
};

export default Login;
