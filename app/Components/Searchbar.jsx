"use client";

import { MapPin, Search } from "lucide-react";
import React, { useState } from "react";
import { cities, doctors, specialties } from "../assets";
import { useRouter } from "next/navigation";

const Searchbar = () => {
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Add Location");
  const [specialityDropdown, setSpecialityDropdown] = useState(false);
  const [selectedSpeciality, setSelectedSpeciality] = useState("");
  const router = useRouter();

  const handleSearch = (city, specialty) => {
    // Only navigate if both a city and specialty have been selected
    if (city !== "Add Location" && specialty !== "") {
      router.push(`/${city}/${specialty.toLowerCase()}`);
    }
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setIsCityDropdownOpen(false);
    // Check if a specialty is already selected, and if so, perform the search
    if (selectedSpeciality !== "") {
      handleSearch(city, selectedSpeciality);
    }
  };

  const handleSpecialitySelect = (specialty) => {
    setSelectedSpeciality(specialty);
    setSpecialityDropdown(false);
    // Check if a city is already selected, and if so, perform the search
    if (selectedCity !== "Add Location") {
      handleSearch(selectedCity, specialty);
    }
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="flex flex-col md:flex-row w-full max-w-4xl justify-center ">
        {/* Location Dropdown Container */}
        <div className="flex flex-col relative w-full md:w-[40%]">
          <button
            className="flex items-center border border-gray-500/30 h-12 bg-white w-full overflow-hidden"
            onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
          >
            <div className="flex items-center gap-2 pl-4 pr-2 w-full">
              <MapPin className="w-4 stroke-1 text-gray-500" />
              <span className="text-sm text-gray-500 truncate">
                {selectedCity}
              </span>
            </div>
          </button>
          {isCityDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-300 shadow-lg z-10 max-h-60 overflow-y-auto">
              <ul>
                {cities.map((city) => (
                  <li
                    key={city}
                    className="p-3 cursor-pointer hover:bg-gray-100 transition-colors duration-200 text-gray-800 text-sm"
                    onClick={() => handleCitySelect(city)}
                  >
                    {city}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Search Input Container */}
        <div className="flex flex-col relative w-full md:w-[55%]">
          <button
            className="flex items-center border border-gray-500/30 h-12 bg-white overflow-hidden w-full"
            onClick={() => setSpecialityDropdown(!specialityDropdown)}
          >
            <div className="flex items-center gap-2 pl-4 pr-2 w-full">
              <Search className="w-4 stroke-1 text-gray-500" />
              <span className="w-full h-full text-left text-gray-500 placeholder-gray-400 text-sm">
                {selectedSpeciality || "Search doctors, clinic, hospitals etc."}
              </span>
              <div className="flex-shrink-0"></div>
            </div>
          </button>
          {specialityDropdown && (
            <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-300 shadow-lg z-10 max-h-60 overflow-y-auto">
              <ul>
                {specialties.map((speciality) => (
                  <li
                    key={speciality}
                    className="p-3 cursor-pointer hover:bg-gray-100 transition-colors duration-200 text-gray-800 text-sm"
                    onClick={() => handleSpecialitySelect(speciality)}
                  >
                    {speciality}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
