import React from 'react';
import { features, ReasonsToPick } from "../constants";

function WhyUs() {

const stats = [
    { number: "undefined", label: "Partners Affiliated" },
    { number: "Undefined", label: "Jobs Created" },
    { number: "Undefined", label: "Deliveries Completed" },
    { number: "1", label: "Regions Covered" },
];

  return (
    <div className="relative mt-20">
      {/* Heading */}
      <div className="text-start px-6 sm:px-12 md:px-20 lg:px-32">
        <h2 className="text-3xl sm:text-4xl lg:text-4xl mt-10 lg:mt-20 tracking-wide font-bold">
          Why BLAUQTRADING?
        </h2>
      </div>

      {/* Features Grid */}
      <div className="mt-10 lg:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 sm:px-12 md:px-20 lg:px-32">
        {ReasonsToPick.map((feature, index) => (
          <div
            key={index}
            className="w-full bg-[#080704] bg-opacity-15 rounded-xl p-6 flex flex-col items-center text-center"
          >
            {/* Icon */}
            <div className="flex justify-center items-center w-20 h-20 text-yellow-300 rounded-full text-5xl">
              {feature.icon}
            </div>

            {/* Text */}
            <h5 className="mt-6 mb-2 text-xl font-sans">{feature.text}</h5>
            <p className="text-md mt-3 text-neutral-400">{feature.description}</p>
          </div>
        ))}
      </div>
       <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10 text-center">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center">
            <h3 className="text-3xl sm:text-4xl font-bold text-yellow-400">
              {stat.number}
            </h3>
            <p className="text-neutral-400 text-sm mt-2">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WhyUs;