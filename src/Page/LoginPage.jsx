import React, { useState } from "react";
import Slider from "react-slick";
import image1 from "../assets/image.png";
import image2 from "../assets/image1.png";
import logo from "../assets/logo_temp.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageTransition from "../Components/PageTransition";
import axios from "axios";
import { FaGithub } from "react-icons/fa";



const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showTransition, setShowTransition] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const loginData = {
      username: email,
      password: password
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

      
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    const signUpData = {
      email: email,
      username: name,
      password: password
    };

    // axios.post('http://localhost:8080/auth/register', signUpData)
    //   .then((response) => {
    //     console.log('Sign up successful...');
    //   })
    //   .catch((error) => {
    //     console.error('There was an error signing up!', error);
    //   });

    axios.post('http://localhost:8080/otp/send', {email:signUpData.email})
      .then((response) => {
        console.log('Otp sent...', response.data);
      })
      .catch((error) => {
        console.error('There was an error signing up!', error);
      });

      navigate('/OTP',{state:signUpData})
  }

  const handleSubmit = (e) => {
    if (isSignUp) {
      handleSignUp(e);
    } else {
      handleLogin(e);
    }
  };

  const handleAuthLogin = (e) => {
    e.preventDefault();

    
    
    axios.post('/oauth2/authorization/google')
      .then((response) => {
        localStorage.setItem("authToken",response.data)
        console.log('Sign in successful...');
      })
      .catch((error) => {
        console.error('There was an error signing up!', error);
      });

      
  }; 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row w-full max-w-4xl">
        <div className="w-full md:w-1/2 p-4 md:p-8 flex items-center justify-center bg-green-500 rounded-t-lg md:rounded-l-lg md:rounded-tr-none">
          <Slider {...settings} className="w-full">
            <div className="text-center text-white">
              <div className="flex justify-center mb-4">
                <img src={logo} alt="logo" className="mx-auto" />
              </div>
              <h2 className="text-2xl md:text-4xl font-bold mb-2">
                Welcome to Hackathon Project
              </h2>
              <p className="text-sm">
                Revolutionizing the way you connect and manage.
              </p>
            </div>
            <div className="text-center text-white">
              <h2 className="text-2xl md:text-4xl font-bold mb-2">
                "Innovation distinguishes between a leader and a follower."
              </h2>
              <p className="text-sm">- Steve Jobs</p>
              <div className="flex justify-center mb-4">
                <img src={logo} alt="logo" className="mx-auto" />
              </div>
            </div>
            <div className="text-center text-white">
              <h2 className="text-2xl md:text-4xl font-bold mb-2">
                Built for Hackathon Excellence
              </h2>
              <p className="text-sm">
                Bringing the best out of your coding skills.
              </p>
              <div className="flex justify-center mb-4">
                <img src={logo} alt="logo" className="mx-auto" />
              </div>
            </div>
          </Slider>
        </div>

        {/* Right side - Log in/Sign Up form */}
        <div className="w-full md:w-1/2 p-4 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-700 mb-4 md:mb-6">
            {isSignUp ? "Sign Up to our website" : "Log In to your account"}
          </h2>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-4 md:mb-6">
            <button className="flex-1 py-2 px-4 border bg-yellow-300 border-gray-300 rounded-md text-gray">
              <img src={image1} alt="Google" className="w-6 h-6 inline mr-2" />{" "}
              Google
            </button>
            <button className="flex-1 py-2 px-4 border bg-green-600 border-gray-300 rounded-md text-gray-200" onClick={handleAuthLogin}>
              <FaGithub className="w-6 h-6 inline mr-2" />{" "}
              Github
            </button>
          </div>
          <div className="flex items-center mb-4">
            <span className="border-t border-gray-300 flex-grow"></span>
            <span className="px-2 text-sm text-gray-500">
              or continue with email
            </span>
            <span className="border-t border-gray-300 flex-grow"></span>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {isSignUp && (
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="peer mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white text-gray-800 placeholder-transparent"
                  placeholder=" "
                />
                <label
                  htmlFor="name"
                  className="absolute left-2 top-0.5 px-1 bg-white text-gray-600 transition-all duration-200 transform -translate-y-4 scale-75 origin-top-left peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-blue-600"
                >
                  Name
                </label>
              </div>
            )}
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="peer mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white text-gray-800 placeholder-transparent"
                placeholder=" "
              />
              <label
                htmlFor="email"
                className="absolute left-2 top-0.5 px-1 bg-white text-gray-600 transition-all duration-200 transform -translate-y-4 scale-75 origin-top-left peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-blue-600"
              >
                Email
              </label>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="peer mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white text-gray-800 placeholder-transparent"
                placeholder=" "
              />
              <label
                htmlFor="password"
                className="absolute left-2 top-0.5 px-1 bg-white text-gray-600 transition-all duration-200 transform -translate-y-4 scale-75 origin-top-left peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-blue-600"
              >
                Password
              </label>
              <div
                className="absolute right-2 top-2 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <FaEyeSlash className="text-gray-500" />
                ) : (
                  <FaEye className="text-gray-500" />
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
            >
              {isSignUp ? "Sign Up" : "Log In"}
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <span
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? "Log In" : "Sign Up"}
              </span>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" />
      {showTransition && <PageTransition />}
    </div>
  );
};

export default LoginPage;


