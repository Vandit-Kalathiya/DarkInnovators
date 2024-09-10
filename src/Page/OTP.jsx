import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Otp = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [savedUser,setSavedUser] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const inputRefs = useRef([]);
  const signUpData= location.state; 

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    if (value.length === 1 && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }

    if (value.length === 0 && index > 0) {
      inputRefs.current[index - 1].focus();
    }

    setOtp(newOtp);
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    console.log(signUpData)
    console.log(otp.join(''))
  
    
    
    axios.post('http://localhost:8080/otp/verify', {
      email: signUpData.email,
      otp: otp.join('')  // Joins the OTP array into a single string without commas
    })
    .then((response) => {
      console.log('OTP verified... :', response.data);
    })
    .catch((error) => {
      console.error('There was an error in verifying otp.!', error.response.data);
    });

    
    
    axios.post('http://localhost:8080/auth/register', signUpData)
    .then((response) => {
      console.log('Sign up successful:', response.data)
      
      const loginData = {
        username: signUpData.email,
        password: signUpData.password
      };
      
      console.log(loginData)
      axios.post('http://localhost:8080/auth/login', loginData)
        .then((response) => {
          localStorage.setItem("authToken",response.data.jwtToken)
          console.log('Sign in successful...');
          navigate("/user/dashboard")
        })
        .catch((error) => {
          console.error('There was an error signing up!', error);
        });
    })
    .catch((error) => {
      console.error('There was an error signing up!', error);
    });


    

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="p-8 bg-gray-800 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Email Verification
        </h2>
        <p className="mb-4 text-center">We have sent a code to your email</p>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center space-x-2 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 border border-gray-700 rounded-lg text-center text-xl bg-gray-900 focus:outline-none"
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
          >
            Verify Account
          </button>
        </form>
        <div className="mt-4 text-center">
          <a href="#" className="text-blue-400 hover:underline">
            Didn't receive code? Resend
          </a>
        </div>
      </div>
    </div>
  );
};

export default Otp;