import React from "react";
import logo from "../assets/logo.png"; 

function Header() {
  const handleLogin = () => console.log("Login button clicked");
  const handleSignUp = () => console.log("Sign Up button clicked");

  return (
    <header className="flex justify-between items-center py-5 px-10">
      <div className="flex items-center">
        <img src={logo} alt="HYDRA Logo" className="h-12 w-20 mr-3" />
        <h1 className="text-2xl font-bold">HYDRA</h1>
      </div>
      <div>
        <button
          className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-6 mx-2 rounded-full transition transform hover:scale-110"
          onClick={handleLogin}
        >
          Login
        </button>
        <button
          className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-6 mx-2 rounded-full transition transform hover:scale-110"
          onClick={handleSignUp}
        >
          Sign Up
        </button>
      </div>
    </header>
  );
}

export default Header;
