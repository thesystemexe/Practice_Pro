import React, { useState } from 'react'
import './CSS/LoginSingUp.css'

const LoginSignUp = () => {
  const [state , setState] = useState("Login");
  const [formData , setFormData] = useState({
    username:"",
    password:"",
    email:""
  })

  const changeHandler =(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const login = async()=>{
    console.log("Login function Executed" , formData);
    let responseData;
    await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));
    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.error);
    }


  }

   const singUp = async () => {
    console.log('Singup function is executed', formData);
    let responseData;
    await fetch('http://localhost:4000/signup',{
      method:'POST',
      headers:{
        Accept:"application/form-data",
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formData)
    }).then((response)=>response.json()).then((data)=>responseData=data)
    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace('/');
    }else{
      alert(responseData.error)
    }
   };
  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsingup-fields">
          {state === "SignUp" ? (
            <input type="text" placeholder="Your name"  name='username' value={formData.username} onChange={changeHandler}/>
          ) : (
            <></>
          )}
          <input type="email" placeholder="Email address" name='email' value={formData.email} onChange={changeHandler} />
          <input type="password" placeholder="Password" name='password' value={formData.password} onChange={changeHandler} />
        </div>
        <button className="loginsignup-btn" onClick={()=>{state==='Login'?login():singUp()}}>Continue</button>
        {state === "SignUp" ? (
          <p className="loginsingup-login">
            Already Have an account? <span onClick={()=>setState("Login")}>Login here</span>
          </p>
        ) : (
          <p className="loginsingup-login">
            Create an account? <span onClick={()=>setState("SignUp")}>Click here</span>
          </p>
        )}
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By Continuing, I agree to the terms and policy</p>
        </div>
      </div>
    </div>
  );
}

export default LoginSignUp