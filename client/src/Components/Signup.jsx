import React from "react";
import "../Styles/Signup.css"; 

const Signup = () => {
  return (
    <div className="signup-container">
      <h2 className="signup-heading">Welcome to 📜 DOSIVE</h2>
      <p className="signup-subheading">Sign up to manage your tasks efficiently.</p>
      
      <form className="signup-form">
        <input type="text" placeholder="Username" className="signup-input" required />
        <input type="email" placeholder="Email" className="signup-input" required />
        <input type="password" placeholder="Password" className="signup-input" required />
        <button type="submit" className="signup-button">Sign Up</button>
      </form>

      <div className="login-link">
        Already have an account? <a href="/login">Log In</a>
      </div>
    </div>
  );
};

export default Signup;
