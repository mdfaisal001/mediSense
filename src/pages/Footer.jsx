import React from "react";

function Footer() {
  const handleVisit = () => console.log("Visit button clicked");
  const handleCall = () => console.log("Call button clicked");
  const handleMessage = () => console.log("Message button clicked");

  return (
    <footer className="flex justify-center p-10 border-t border-gray-700">
      <div className="flex flex-col md:flex-row bg-gray-800 p-5 rounded-lg w-full md:w-4/5 text-center md:text-left">
        <div className="flex-1">
          <h3 className="text-lg font-bold">Pay Us a Visit</h3>
          <p className="cursor-pointer" onClick={handleVisit}>
            Union St, Seattle, WA 98101, United States
          </p>
        </div>
        <div className="border-l border-white mx-4 hidden md:block"></div>
        <div className="flex-1">
          <h3 className="text-lg font-bold">Give Us a Call</h3>
          <p className="cursor-pointer" onClick={handleCall}>
            (110) 111-1010
          </p>
        </div>
        <div className="border-l border-white mx-4 hidden md:block"></div>
        <div className="flex-1">
          <h3 className="text-lg font-bold">Send Us a Message</h3>
          <p className="cursor-pointer" onClick={handleMessage}>
            Contact@HydraVTech.com
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;