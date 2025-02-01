import React from "react";
import vrImage from "../assets/robot.jpg";
import logo from "../assets/logo.png";

const Lander = () => {
  const handleLogin = () => {
    console.log("Login button clicked");
    window.location.href = "/login";
  };

  const handleSignUp = () => {
    console.log("Sign Up button clicked");
    window.location.href = "/signup";
  };

  const handleGetStarted = () => {
    console.log("Get Started button clicked");
    window.location.href = "/login";
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center">
      <header className="w-full flex justify-between items-center p-6 max-w-6xl">
        <div className="flex items-center space-x-3">
          <img src={logo}alt="HYDRA Logo" className="h-12 w-20" />
          <h1 className="text-2xl font-bold">HYDRA</h1>
        </div>
        <div>
          <button onClick={handleLogin} className="bg-purple-700 text-white font-bold px-6 py-3 rounded-full mr-4 hover:scale-105 transition">
            Login
          </button>
          <button onClick={handleSignUp} className="bg-purple-700 text-white font-bold px-6 py-3 rounded-full hover:scale-105 transition">
            Sign Up
          </button>
        </div>
      </header>

      <main className="flex flex-col md:flex-row justify-between items-center w-full max-w-6xl p-6">
        <div className="max-w-lg">
          <h2 className="text-4xl font-bold mb-4"> "Early detection saves lives <span className="text-purple-400"> - Analyze your symptoms instantly."</span></h2>
          <p className="text-gray-300 mb-6"> Our AI-driven symptom analyzer helps you understand potential health conditions quickly and accurately. 
            Just input your symptoms and get real-time insights, empowering you with the right knowledge to take action.</p>
          <div className="flex items-center space-x-4">
            <button onClick={handleGetStarted} className="bg-purple-700 text-white font-bold px-6 py-3 rounded-full hover:scale-105 transition">
              Get Started
            </button>
            <span className="text-3xl">&rarr;</span>
          </div>
        </div>
        <div>
          <img src={vrImage} alt="Person with VR Headset" className="w-96 h-96 rounded-full" />
        </div>
      </main>

      <footer className="w-full flex justify-center py-6 border-t border-gray-700 mt-8">
        <div className="bg-gray-800 p-6 rounded-3xl flex flex-col md:flex-row justify-around items-center w-4/5">
          <div className="text-center md:w-1/3">
            <h3 className="text-lg font-semibold text-sky-500">Pay Us a Visit</h3>
            <p>Union St, Seattle, WA 98101, United States</p>
          </div>
          <div className="hidden md:block w-px bg-white h-16 mx-6"></div>
          <div className="text-center md:w-1/3">
            <h3 className="text-lg font-semibold text-sky-500">Give Us a Call</h3>
            <p>(110) 111-1010</p>
          </div>
          <div className="hidden md:block w-px bg-white h-16 mx-6 text-sky-500"></div>
          <div className="text-center md:w-1/3">
            <h3 className="text-lg font-semibold text-sky-500">Send Us a Message</h3>
            <p>Contact@HydraVTech.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Lander