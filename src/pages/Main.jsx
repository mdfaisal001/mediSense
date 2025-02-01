import React from "react";
import vrImage from "../assets/robot.jpg"; 

function Main() {
  const handleGetStarted = () => console.log("Get Started button clicked");

  return (
    <main className="flex flex-col md:flex-row items-center justify-between p-10">
      <div className="max-w-lg">
        <h2 className="text-4xl font-bold mb-4">
          Dive Into The Depths Of <span className="text-purple-400">Virtual Reality</span>
        </h2>
        <p className="mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore nisi tincidunt eget.
        </p>
        <div className="flex items-center space-x-4">
          <button
            className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-6 rounded-full transition"
            onClick={handleGetStarted}
          >
            Get Started
          </button>
          <p className="text-2xl">→</p>
        </div>
      </div>
      <div className="mt-8 md:mt-0">
        <img src={vrImage} alt="Person with VR Headset" className="w-80 h-80 rounded-full" />
      </div>
    </main>
  );
}

export default Main;
