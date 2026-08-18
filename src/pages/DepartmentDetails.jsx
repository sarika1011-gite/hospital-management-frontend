import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaUserMd,
  FaCalendarCheck,
  FaStethoscope,
} from "react-icons/fa";

const departments = {
  "general-medicine": {
    name: "General Medicine",
    description:
      "Comprehensive diagnosis and treatment for common and complex medical conditions.",
    services: [
      "General health checkups",
      "Fever and infections treatment",
      "Diabetes management",
      "Blood pressure management",
      "Preventive healthcare",
    ],
  },

  cardiology: {
    name: "Cardiology",
    description:
      "Specialized care for heart and cardiovascular conditions with experienced specialists.",
    services: [
      "Heart health checkups",
      "ECG and cardiac evaluation",
      "Blood pressure management",
      "Heart disease consultation",
      "Cardiac risk assessment",
    ],
  },

  orthopedics: {
    name: "Orthopedics",
    description:
      "Expert diagnosis and treatment for bones, joints, muscles and orthopedic conditions.",
    services: [
      "Bone and joint consultation",
      "Fracture treatment",
      "Arthritis management",
      "Back and neck pain treatment",
      "Sports injury care",
    ],
  },

  pediatrics: {
    name: "Pediatrics",
    description:
      "Complete healthcare services for infants, children and teenagers.",
    services: [
      "Child health checkups",
      "Vaccination guidance",
      "Growth monitoring",
      "Childhood illness treatment",
      "Nutritional guidance",
    ],
  },

  neurology: {
    name: "Neurology",
    description:
      "Specialized diagnosis and treatment of disorders affecting the brain, nerves and nervous system.",
    services: [
      "Neurological consultation",
      "Headache and migraine care",
      "Seizure evaluation",
      "Nerve disorder treatment",
      "Stroke assessment",
    ],
  },

  ent: {
    name: "ENT",
    description:
      "Specialized care for ear, nose and throat related conditions.",
    services: [
      "Ear infection treatment",
      "Hearing evaluation",
      "Sinus treatment",
      "Throat infection treatment",
      "ENT consultations",
    ],
  },

  dermatology: {
    name: "Dermatology",
    description: "Expert care for skin, hair and nail related conditions.",
    services: [
      "Skin consultations",
      "Acne treatment",
      "Hair and scalp care",
      "Allergy and skin infection treatment",
      "General dermatology",
    ],
  },

  dental: {
    name: "Dental",
    description: "Complete dental care for maintaining healthy teeth and gums.",
    services: [
      "Dental checkups",
      "Teeth cleaning",
      "Cavity treatment",
      "Gum care",
      "Oral health consultation",
    ],
  },

  ophthalmology: {
    name: "Ophthalmology",
    description:
      "Specialized eye care including vision assessment and treatment.",
    services: [
      "Eye checkups",
      "Vision testing",
      "Eye infection treatment",
      "Glaucoma screening",
      "General eye care",
    ],
  },
};

const normalizeDepartment = (value = "") => {
  return decodeURIComponent(value)
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export default function DepartmentDetails() {
  const navigate = useNavigate();
  const { departmentName } = useParams();

  const slug = normalizeDepartment(departmentName);

  const department =
    departments[slug] ||
    departments[slug.replace("-and-", "-")] ||
    Object.values(departments).find(
      (item) => normalizeDepartment(item.name) === slug,
    );

  if (!department) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            Department Not Found
          </h1>

          <p className="text-gray-500 mb-6">
            The requested department could not be found.
          </p>

          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleBookAppointment = () => {
    navigate(
      `/patient/book-appointment?department=${encodeURIComponent(
        department.name,
      )}`,
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-cyan-600 text-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 mb-8 text-white/90 hover:text-white"
          >
            <FaArrowLeft />
            Back
          </button>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {department.name}
          </h1>

          <p className="max-w-3xl text-lg text-white/90">
            {department.description}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <FaUserMd className="text-3xl text-blue-600 mb-4" />
            <h3 className="font-bold text-xl mb-2">Expert Doctors</h3>
            <p className="text-gray-500">
              Experienced specialists providing quality healthcare.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <FaStethoscope className="text-3xl text-blue-600 mb-4" />
            <h3 className="font-bold text-xl mb-2">Specialized Care</h3>
            <p className="text-gray-500">
              Professional diagnosis and treatment for your needs.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <FaCalendarCheck className="text-3xl text-blue-600 mb-4" />
            <h3 className="font-bold text-xl mb-2">Easy Appointment</h3>
            <p className="text-gray-500">
              Book your appointment quickly and conveniently.
            </p>
          </div>
        </div>

        {/* Services */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Services Offered
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {department.services.map((service, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 rounded-xl bg-gray-50"
              >
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                <span className="text-gray-700">{service}</span>
              </div>
            ))}
          </div>

          <button
            onClick={handleBookAppointment}
            className="mt-8 px-7 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
}
