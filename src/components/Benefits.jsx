import React from 'react';
import tele from "../assets/tele.mp4";
import Market from "../assets/Market.mp4";
import { Moon } from 'lucide-react';
import { BriefcaseBusiness } from 'lucide-react';
import SubscribeForm from './SubscribeForm';

function Benefits() {
  return (
    <div className="relative mt-5 border-b border-neutral-800 min-h-screen">
      <div className="flex justify-center items-center flex-col">
        <div className="flex flex-col md:flex-row w-full h-full gap-8">
          {/* Section 1 */}
          <div className="relative w-full md:w-1/2 h-[500px] md:h-screen">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={Market} />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 flex flex-col items-center mt-20 text-center z-10 text-white px-4">
              <div className="flex mx-6 p-2 bg-neutral-900 text-yellow-300 rounded-full">
                  <Moon size={40} className="mb-2" />
              </div>
              <h1 className="md:text-xl font-bold">
                EXPLORE MARKET TRENDS
              </h1>
              <h2 className="text-lg sm:text-2xl md:text-3xl mt-2">
                Stay ahead with real-time analytics.
              </h2>
            </div>
          </div>
          {/* Section 2 */}
          <div className="relative w-full md:w-1/2 h-[500px] md:h-screen">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={tele} />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 flex flex-col items-center mt-20 text-center z-10 text-white px-4">
              <div className="flex mx-6 p-2 bg-neutral-900 text-yellow-300 rounded-full">
                  <BriefcaseBusiness size={40} className="mb-2" />
              </div>
              <h1 className="md:text-xl font-bold">
                FIELD TRAINING SIMPLIFIED
              </h1>
              <h2 className="text-lg sm:text-2xl md:text-3xl mt-2">
                Real scenarios, real growth.
              </h2>
            </div>
        </div>
        <div className="flex justify-center items-center flex-col">
            <SubscribeForm />
        </div>
      </div>
    </div>
    </div>
  );
}

export default Benefits;
