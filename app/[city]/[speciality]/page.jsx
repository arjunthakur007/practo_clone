"use client";

import React, { useState, useEffect, useCallback } from "react";
import Navbar from "@/app/Components/Navbar";
import Searchbar from "@/app/Components/Searchbar";
import Filterbar from "@/app/Components/Filterbar";
import DoctorCard from "@/app/Components/DoctorCard";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useSearchParams } from "next/navigation";

// Function to capitalize the first letter of each word
const formatText = (text) => {
  if (!text) return "";
  const decodedText = decodeURIComponent(text.replace(/\+/g, " "));
  return decodedText
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const Page = ({ params }) => {
  const { city, speciality } = params;
  const searchParams = useSearchParams();

  const [doctorsList, setDoctorsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDoctors = useCallback(
    async (currentCity, currentSpeciality, currentSearchParams) => {
      setLoading(true);
      setError(null);

      try {
        const queryString = currentSearchParams.toString();
        const apiUrl = `/api/doctors?speciality=${encodeURIComponent(
          currentSpeciality
        )}&city=${encodeURIComponent(currentCity)}${
          queryString ? `&${queryString}` : ""
        }`;

        const response = await axios.get(apiUrl);

        setDoctorsList(response.data.doctors);
      } catch (e) {
        console.error("Failed to fetch doctors:", e);
        setError("Failed to load doctors. Please try again.");
        toast.error("Failed to load doctors. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    []
  );
  useEffect(() => {
    fetchDoctors(city, speciality, searchParams);
  }, [city, speciality, searchParams, fetchDoctors]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      {/* Sticky header */}
      <div className="pb-8 flex flex-col gap-2 sticky top-0 bg-white z-10 ">
        <Navbar />
        <div className="px-8 md:px-24 lg:px-48">
          <Searchbar />
        </div>
        <Filterbar />{" "}
      </div>

      {/* Main content container */}
      <div className="p-4 sm:p-6 lg:p-8 w-full">
        <div className="max-w-[95%] mx-auto flex gap-6 w-full relative">
          {/* Doctor's list */}
          <div className="w-full lg:w-3/4 flex flex-col pr-4">
            {/* Page Header */}
            <h1 className="text-lg md:text-2xl font-semibold text-gray-800 mb-8">
              Showing {doctorsList.length} {formatText(speciality)} in{" "}
              {formatText(city)}
            </h1>

            {/* Loading, Error, or Doctors List */}
            {loading ? (
              <div className="text-center py-10">Loading doctors...</div>
            ) : error ? (
              <div className="text-center py-10 text-red-500">{error}</div>
            ) : doctorsList.length > 0 ? (
              <div className="grid grid-cols-1 ">
                {doctorsList.map((doctor) => (
                  <DoctorCard
                    key={doctor.id}
                    doctor={doctor}
                    formatText={formatText}
                    speciality={speciality}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-8 text-center text-gray-500">
                <p>
                  No doctors found for this specialty in this city with the
                  selected filters.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block lg:w-1/4 bg-white sticky top-54 h-[50%] border p-4">
            <p className="text-gray-500 text-center">Sidebar</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
