import React from "react";
import tonlogo from "../assets/tonlogo.png";

function TonWallet() {
  const openTonkeeper = () => {
    window.open("https://play.google.com/store/apps/details?id=com.ton_keeper&pli=1");
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-4 md:px-16 py-12 border-b border-neutral-800 gap-10">
      {/* Left Side - Text Content */}
      <div className="flex-1 text-left">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight">
          <span className="text-blue-300">TonWallet </span>
          download
        </h1>

        <p className="mt-5 text-lg text-neutral-300 max-w-xl font-sans">
          Install the Tonkeeper app and store your very own TGBC. Download below:
        </p>

        <button
          onClick={openTonkeeper}
          className="mt-6 bg-blue-500 hover:bg-blue-600 transition text-white border-2 rounded-full font-sans px-6 py-3 text-sm sm:text-base"
        >
          Download
        </button>
      </div>

      {/* Right Side - Image */}
      <div className="flex-1 flex justify-center">
        <img
          src={tonlogo}
          alt="Tonkeeper Logo"
          className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-contain rounded-xl shadow-lg"
        />
      </div>
    </div>
  );
}

export default TonWallet;