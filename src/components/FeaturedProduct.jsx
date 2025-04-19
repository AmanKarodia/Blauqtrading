import React from 'react'
import { Eye } from 'lucide-react';
import MEME_COIN from "../assets/MEME_COIN.png"
import { productsfeatured } from "../constants"

function FeaturedProduct() {
  return (
    <div className="relative mt-20 border-b border-neutral-800 min-h-screen">
        <div className="flex justify-center items-center flex-col">
            <span className="rounded-full h-10 px-2 py-1">
                <Eye />
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl mt-4 lg:mt-6 tracking-wide font-bold">
                <span className="text-yellow-300">ToughGoldBull</span> Crypto Advantages
            </h2>
            <p className="mt-10 text-lg text-center text-neutral-300 max-w-4xl font-sans">
            Take charge of your financial future with our reliable and user-friendly platform for purchasing, selling, and safeguarding cryptocurrencies.
            </p>
            <div className="relative py-20">
              <div className="inset-0 flex items-center justify-center">
                  <img src={MEME_COIN} className="max-w-[300px] md:max-w-[500px]"/>
              </div>
              <div className="flex flex-wrap mt-5 lg:mt-10 gap-4 justify-center">
                    {productsfeatured.map((feature, index) => (
                      <div key={index} className="w-full sm:1/2 lg:w-1/3">
                        <div className="flex bg-neutral-900 rounded-xl border border-yellow-300">
                          <div>
                            <h5 className="mt-4 mb-6 text-xl text-center font-bold">{feature.text}</h5>
                            <p className="text-md font-sans p-2 mb-20 text-neutral-500">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                    <div className="lg:flex justify-center items-center mt-10">
                      <a href="#" className="bg-yellow-400 text-white shadow-lg shadow-yellow-200/50 dark:shadow-lg dark:shadow-yellow-200/80 py-2 px-3 rounded-3xl">
                        Purchase Now
                      </a>
                    </div>
                </div>
          </div>
    </div>
  )
}

export default FeaturedProduct
