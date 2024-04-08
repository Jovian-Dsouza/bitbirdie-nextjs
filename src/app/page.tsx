"use client";

import Image from "next/image";
import React from "react";
import MobileContainer from "@/components/landing/MobileContainer"

const InputWithGradientBorder = () => {
  return (
    <div className="flex w-full md:w-[80%] bg-gradient-to-r from-[#F9D96D] via-[#C93586] to-[#8639A6] text-white font-semibold rounded p-0.5 ">
      <input
        type="email"
        placeholder="Enter Email"
        className="flex w-full bg-[#111215] text-white rounded px-6 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
      />
    </div>
  );
};

function LandingPage() {
  return (
    <main className="h-screen pt-5 sm:pt-10 md:pt-16 lg:pt-20 bg-[#111215] overflow-scroll no-scrollbar">
      <div className="flex flex-col mx-auto min-h-full w-full max-w-6xl  px-5  py-10">
        <section className="flex flex-col-reverse md:flex-row items-center justify-between space-y-5 md:space-y-0 md:space-x-10 mt-10 mb-32">
          <div className="flex flex-col space-y-3 max-w-lg md:max-w-none">
            <div className="text-4xl max-w-lg font-semibold text-white">
              We make crypto portfolio management simple
            </div>
            <div className="text-lg max-w-md text-gray-500">
              Unlock automated portfolio management, personalized transaction
              recommendations, and one-click staking with OKTO AI.
            </div>
            <div className="p-2"></div>
            <div className="flex flex-col md:flex-row w-full md:space-x-2">
              <InputWithGradientBorder />
              <button className="bg-gradient-to-r from-[#F9D96D] via-[#C93586] to-[#8639A6] font-semibold rounded-md px-4 py-2 text-white hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-2 md:mt-0">
                Join Waitlist
              </button>
            </div>
          </div>

          <MobileContainer/>

          {/* <div className="flex-shrink-0 bg-red-400"> */}

          {/* </div> */}

          {/* <div className="flex-shrink-0">
            <Image
              src="/landing/pattern.svg"
              alt=""
              className="w-full h-auto md:w-[40rem] md:h-[25rem]"
              layout="intrinsic"
              width={800}
              height={500}
            />
          </div> */}
        </section>
      </div>
    </main>
  );
}

export default LandingPage;
