import fs from "fs/promises";
import path from "path";

// Capitalizing Function
const formatText = (text) => {
  if (!text) return "";
  const decodedText = decodeURIComponent(text.replace(/\+/g, " "));
  return decodedText
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export async function GET(request) {
  try {
    // Path to doctor.json file
    const filePath = path.join(process.cwd(), "app", "data", "doctor.json");

    // Read and parse the doctors data from the JSON file
    const fileContent = await fs.readFile(filePath, "utf8");
    const doctors = JSON.parse(fileContent);

    const { searchParams } = new URL(request.url);

    // query parameters
    const specialityParam = searchParams.get("speciality");
    const cityParam = searchParams.get("city");
    const genderParam = searchParams.get("gender");
    const patientStoriesParam = searchParams.get("patientStories");
    const experienceParam = searchParams.get("experience");
    const feesParam = searchParams.get("fees");
    const availabilityParam = searchParams.get("availability");
    const consultTypeParam = searchParams.get("consultType");
    const sortByParam = searchParams.get("sortBy");

    let filteredDoctors = [...doctors];

    //Speciality
    if (specialityParam) {
      const formattedSpeciality = formatText(specialityParam);
      filteredDoctors = filteredDoctors.filter(
        (doctor) =>
          doctor.speciality &&
          formatText(doctor.speciality) === formattedSpeciality
      );
    } else {
      return new Response(
        JSON.stringify({
          doctors: [],
          message: "Speciality parameter is required.",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // City Filter
    if (cityParam) {
      const formattedCity = formatText(cityParam);
      filteredDoctors = filteredDoctors.filter(
        (doctor) => doctor.city && formatText(doctor.city) === formattedCity
      );
    }

    //  Additional Filters

    // Gender Filter
    if (genderParam) {
      const formattedGender = formatText(genderParam);
      filteredDoctors = filteredDoctors.filter((doctor) => {
        if (formattedGender === "Male Doctor") {
          return doctor.gender === "Male";
        } else if (formattedGender === "Female Doctor") {
          return doctor.gender === "Female";
        }
        return true; // If somehow an invalid gender is passed, don't filter
      });
    }

    // Patient Stories Filter (e.g., "10+ Patient Stories")
    if (patientStoriesParam) {
      const minStories = parseInt(patientStoriesParam.split("+")[0]); // Extract number, e.g., 10
      if (!isNaN(minStories)) {
        filteredDoctors = filteredDoctors.filter(
          (doctor) => doctor.numPatientStories >= minStories
        );
      }
    }

    // Experience Filter (e.g., "5+ Years")
    if (experienceParam) {
      const minExperience = parseInt(experienceParam.split("+")[0]); // Extract number, e.g., 5
      if (!isNaN(minExperience)) {
        filteredDoctors = filteredDoctors.filter(
          (doctor) => doctor.experienceYears >= minExperience
        );
      }
    }

    // Fees Filter (e.g., "₹0-₹500", "Above ₹500")
    if (feesParam) {
      filteredDoctors = filteredDoctors.filter((doctor) => {
        const fee = doctor.consultationFee;
        if (feesParam.includes("₹0-₹500")) {
          return fee >= 0 && fee <= 500;
        } else if (feesParam.includes("Above ₹500")) {
          return fee > 500 && fee <= 1000; // Assuming a range for 'Above ₹500' up to 1000 for simplicity
        } else if (feesParam.includes("Above ₹1000")) {
          return fee > 1000 && fee <= 2000; // Assuming a range for 'Above ₹1000' up to 2000
        } else if (feesParam.includes("Above ₹2000")) {
          return fee > 2000;
        }
        return true; // No filter applied if param is unrecognized
      });
    }

    // Availability Filter (e.g., "Available in next 4 hours", "Available Today")
    // This is a simplified logic as actual availability requires a more complex system (dates, slots)
    if (availabilityParam) {
      filteredDoctors = filteredDoctors.filter((doctor) => {
        if (availabilityParam === "Available in next 4 hours") {
          return doctor.availability <= 4; // doctor.availability represents hours from now
        } else if (availabilityParam === "Available Today") {
          return doctor.availability <= 24; // Assuming availability within 24 hours
        } else if (availabilityParam === "Available Tomorrow") {
          return doctor.availability > 24 && doctor.availability <= 48; // Assuming availability between 24 and 48 hours
        } else if (availabilityParam === "Available in next 7 days") {
          return doctor.availability <= 7 * 24; // Assuming availability within 7 days
        }
        return true;
      });
    }

    // Consult Type Filter (e.g., "Video consult")
    // Assuming 'videoConsult' is a boolean field in doctor object, or implied by availability
    // For now, we'll assume a doctor is available for video consult if their availability is > 0
    if (consultTypeParam === "Video consult") {
      filteredDoctors = filteredDoctors.filter(
        (doctor) => doctor.availability > 0
      ); // Simplified: if they have any availability, they can video consult
    }

    // --- Apply Sorting ---
    if (sortByParam) {
      switch (sortByParam) {
        case "Relevance":
          // No specific sorting for relevance, keep original order or apply default
          break;
        case "Number of patient stories - High to low":
          filteredDoctors.sort(
            (a, b) => b.numPatientStories - a.numPatientStories
          );
          break;
        case "Experience - High to Low":
          filteredDoctors.sort((a, b) => b.experienceYears - a.experienceYears);
          break;
        case "Consultation Fee - High to Low":
          filteredDoctors.sort((a, b) => b.consultationFee - a.consultationFee);
          break;
        case "Consultation Fee - Low to High":
          filteredDoctors.sort((a, b) => a.consultationFee - b.consultationFee);
          break;
        default:
          // No sorting or default sorting
          break;
      }
    }

    // Return the filtered and sorted list of doctors
    return new Response(
      JSON.stringify({
        doctors: filteredDoctors,
        city: formatText(cityParam),
        speciality: formatText(specialityParam),
        // Include other applied filters in response for debugging/feedback if needed
        appliedFilters: {
          gender: genderParam,
          patientStories: patientStoriesParam,
          experience: experienceParam,
          fees: feesParam,
          availability: availabilityParam,
          consultType: consultTypeParam,
          sortBy: sortByParam,
        },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in API route /api/doctors:", error);
    return new Response(
      JSON.stringify({
        message: "An internal server error occurred.",
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
