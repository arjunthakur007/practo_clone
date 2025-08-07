import {
  Stethoscope,
  Pill,
  ClipboardList,
  FlaskConical,
  Newspaper,
  Hospital,
  ChevronDown,
} from "lucide-react";

export const navLinksLeft = [
  { name: "Find Doctors", href: "/" },
  { name: "Video Consult", href: "/video-consultancy" },
  { name: "Surgeries", href: "/surgeries" },
];

export const navLinksRight = [
  {
    name: "For Corporates",

    children: [
      { name: "Health & Wellness Plans", href: "/plans" },
      { name: "Group Insurance", href: "/group_insurance" },
    ],
  },
  {
    name: "For providers",
    // Or a default page for providers
    children: [
      { name: "Practo Prime", href: "/practo-prime" },
      { name: "Software for Providers", href: "/software-for-providers" },
      { name: "List your practice for free", href: "/list-your-practices" },
      { name: "ABDM", href: "/abdm" },
    ],
  },
  {
    name: "Security & help",
    // Or a default help page
    children: [
      { name: "Data Security", href: "/data-security" },
      { name: "Help", href: "/help" },
    ],
  },
];

export const heroLinks = [
  { name: "Consult with Doctor", href: "/consult-doctor", icon: Stethoscope },
  { name: "Order Medicines", href: "/order-medicines", icon: Pill },
  {
    name: "View Medical records",
    href: "/medical-records",
    icon: ClipboardList,
  },
  { name: "Book test", href: "/book-test", icon: FlaskConical },
  { name: "Read articles", href: "/articles", icon: Newspaper },
  {
    name: "For healthcare providers",
    href: "/healthcare-providers",
    icon: Hospital,
  },
];

export const cities = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Chennai",
  "Kolkata",
  "Hyderabad",
  "Pune",
  "Ahmedabad",
  "Surat",
];

// specialties
export const specialties = [
  "Dermatologist",
  "Gynecologist",
  "Orthopedist",
  // Add more specialties here as needed
];


//Filter options
export const filterbarOptions = [
  {
    name: "Gender",
    options: ["Male Doctor", "Female Doctor"],
    icon: ChevronDown,
  },
  {
    name: "Patient Stories",
    options: [
      "10+ Patient Stories",
      "60+ Patient Stories",
      "190+ Patient Stories",
    ],
    icon: ChevronDown,
  },
  {
    name: "Experience",
    options: ["5+ Years", "10+ Years", "15+ Years", "20+ Years"],
    icon: ChevronDown,
  },
  {
    name: "All Filters",
    // These are the new nested filters
    children: [
      {
        name: "Fees",
        options: ["₹0-₹500", "Above ₹500", "Above ₹1000", "Above ₹2000"],
      },
      {
        name: "Availability",
        options: [
          "Available in next 4 hours",
          "Available Today",
          "Available Tomorrow",
          "Available in next 7 days",
        ],
      },
      {
        name: "Consult type",
        options: ["Video consult"],
      },
    ],
    icon: ChevronDown,
  },
  {
    name: "Sort by",
    options: [
      "No. of patient stories - High to low",
      "Experience - High to Low",
      "Consultation Fee - High to Low",
      "Consultation Fee - Low to High",
    ],
    icon: ChevronDown,
  },
];
