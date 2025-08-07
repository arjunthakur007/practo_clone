import React from "react";
import Searchbar from "./Searchbar";
import Image from "next/image";
import { heroLinks } from "../assets";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  return (
    <div>
      <main
        className="flex items-center flex-col justify-center text-sm text-gray-800 px-12 pt-8 pb-16 md:pb-32 lg:pb-52 text-center relative border-white border-t-32 "
        style={{
          backgroundImage: "url('/icons/banner.svg')",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="flex flex-col items-center justify-center w-full z-10 ">
          <h1 className="text-2xl md:text-3xl lg:text-[40px] font-semibold px-4 pb-4 md:pb-8 lg:pb-12 text-white drop-shadow-lg">
            Your home for health
          </h1>
          <div className="w-full flex flex-col gap-4 items-center justify-center ">
            <h1 className="text-sm md:text-xl lg:text-2xl md:font-semibold text-white drop-shadow-lg">
              Find and Book
            </h1>
            <Searchbar />
          </div>
          <div className="flex justify-center gap-2 pt-4 text-gray-300 ">
            <h1>Popular Searches:</h1>
            <ul className="flex flex-wrap justify-center gap-2 md:gap-4 ">
              <li className="cursor-pointer hover:underline font-medium text-gray-400/800 hover:text-gray-100">
                Dermatologist
              </li>
              <li className="cursor-pointer hover:underline font-medium text-gray-400/800 hover:text-gray-100">
                Gyne
              </li>
              <li className="cursor-pointer hover:underline font-medium text-gray-400/800 hover:text-gray-100">
                ortho
              </li>
              <li className="cursor-pointer group flex gap-1 items-center justify-center hover:underline font-medium text-gray-400/800 hover:text-gray-100">
                {" "}
                Others{" "}
                <ChevronDown className="w-4 group-hover:scale-125 transition duration-200 " />
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center w-full z-10"></div>
      </main>
      <div className=" w-full bg-blue-900 px-8 py-2 justify-center items-center  ">
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:w-[70%] mx-auto gap-2 sm:gap-4 lg:gap-0">
          {heroLinks.map((link) => (
          <div
            key={link.name}
            className="flex flex-col justify-center items-center gap-1 px-8 py-1 group cursor-pointer border-r border-gray-400/50 "
          >
            <link.icon className="text-gray-50 w-5 group-hover:scale-125 tarnsition ease-in duration-200" />
            <a
              href={link.href}
              className="group-hover:text-gray-50 transition ease-in text-gray-300 whitespace-nowrap text-[8px] sm:text-xs md:text-sm "
            >
              {link.name}
            </a>
          </div>
        ))}
    </div>
      </div>
    </div>
  );
};

export default Hero;
