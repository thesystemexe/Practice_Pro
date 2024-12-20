import React from 'react'
import './CSS/LoginSingUp.css'

const LoginSignUp = () => {
  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Sign Up</h1>
        <div className="loginsingup-fields">
          <input type="text" placeholder="Your name" />
          <input type="email" placeholder="Email address" />
          <input type="password" placeholder="Password" />
        </div>
        <button>Continue</button>
        <p className="loginsingup-login">Already Have an account? <span>Login here</span></p>
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>By Continuing, I agree to the terms and policy</p>
        </div>
      </div>
    </div>
  );
}

export default LoginSignUp