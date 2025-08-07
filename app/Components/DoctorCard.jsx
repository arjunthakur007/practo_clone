import React from "react";
import { Star, CircleDollarSign, Briefcase, Users } from "lucide-react";

const DoctorCard = ({ doctor, formatText, speciality }) => {
  return (
    <div className="bg-white overflow-hidden border-neutral-300 border-b-1">
      <div className="flex flex-col md:flex-row gap-4 p-6">
        <div className="flex justify-center md:block">
          <img
            src={doctor.image}
            alt={`Dr. ${doctor.name}`}
            className="w-24 h-24 md:w-40 md:h-40 rounded-full border-4 border-white shadow-md"
          />
        </div>

        <div className="space-y-3 text-sm text-gray-700 text-center md:text-left flex-grow">
          <div className="">
            <h2 className="text-xl font-semibold text-blue-500/70">
              {doctor.name}
            </h2>
            <p className="text-gray-500 text-sm">{formatText(speciality)}</p>
          </div>
          <p className="flex items-center justify-center md:justify-start">
            <Briefcase className="w-4 h-4 text-gray-500 mr-2" />
            Experience:{" "}
            <span className="font-medium ml-1">
              {doctor.experienceYears} Years
            </span>
          </p>

          <p className="flex items-center justify-center md:justify-start">
            <CircleDollarSign className="w-4 h-4 text-gray-500 mr-2" />
            Fee:{" "}
            <span className="font-medium ml-1">₹{doctor.consultationFee}</span>
          </p>

          <p className="font-medium text-gray-800">
            Clinic: {doctor.clinicHospital}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-2 border-t lg:max-w-[40%] border-neutral-300/50">
            <p className="flex items-center">
              <Star className="w-4 h-4 text-yellow-500 mr-2" />
              Rating: <span className="font-medium ml-1">{doctor.rating}</span>
            </p>
            <p className="flex items-center">
              <Users className="w-4 h-4 text-gray-500 mr-2" />
              Patient Stories:{" "}
              <span className="font-medium ml-1">
                {doctor.numPatientStories}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
