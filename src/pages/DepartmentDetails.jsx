import { useParams, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaHeartbeat,
  FaBone,
  FaBrain,
  FaBaby,
  FaEye,
  FaTooth,
} from "react-icons/fa";

const departments = {
  cardiology: {
    name: "Cardiology",
    subtitle: "Heart care and treatment",
    icon: FaHeartbeat,
    description:
      "Our Cardiology department provides comprehensive care for heart and cardiovascular conditions with experienced healthcare professionals and modern medical care.",
    services: [
      "Heart Disease Diagnosis",
      "Blood Pressure Management",
      "ECG & Cardiac Testing",
      "Heart Failure Management",
      "Preventive Cardiac Care",
    ],
  },

  orthopedics: {
    name: "Orthopedics",
    subtitle: "Bone & Joint Care",
    icon: FaBone,
    description:
      "Our Orthopedics department provides expert diagnosis and treatment for bones, joints, muscles and movement-related conditions.",
    services: [
      "Bone & Joint Treatment",
      "Fracture Management",
      "Arthritis Treatment",
      "Sports Injury Care",
      "Physiotherapy Guidance",
    ],
  },

  neurology: {
    name: "Neurology",
    subtitle: "Brain & Nervous System",
    icon: FaBrain,
    description:
      "Our Neurology department focuses on the diagnosis and treatment of disorders affecting the brain, spinal cord and nervous system.",
    services: [
      "Neurological Consultation",
      "Migraine Treatment",
      "Stroke Management",
      "Epilepsy Care",
      "Nervous System Disorders",
    ],
  },

  pediatrics: {
    name: "Pediatrics",
    subtitle: "Child Healthcare",
    icon: FaBaby,
    description:
      "Our Pediatrics department provides complete healthcare services for infants, children and adolescents in a safe and caring environment.",
    services: [
      "Child Health Checkups",
      "Vaccination",
      "Growth Monitoring",
      "Childhood Illness Treatment",
      "Nutrition Guidance",
    ],
  },

  ophthalmology: {
    name: "Ophthalmology",
    subtitle: "Eye Care",
    icon: FaEye,
    description:
      "Our Ophthalmology department provides comprehensive eye care including diagnosis, treatment and preventive eye health services.",
    services: [
      "Eye Examinations",
      "Vision Testing",
      "Cataract Care",
      "Eye Infection Treatment",
      "Preventive Eye Care",
    ],
  },

  dental: {
    name: "Dental",
    subtitle: "Dental Care",
    icon: FaTooth,
    description:
      "Our Dental department offers professional dental care to maintain healthy teeth, gums and overall oral health.",
    services: [
      "Dental Checkups",
      "Teeth Cleaning",
      "Cavity Treatment",
      "Root Canal Treatment",
      "Oral Health Care",
    ],
  },
};

function DepartmentDetails() {
  const { departmentName } = useParams();
  const navigate = useNavigate();

  const department = departments[departmentName?.toLowerCase()];

  if (!department) {
    return (
      <div className="min-h-screen bg-[#F7FAFC] flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#123044] mb-5">
            Department Not Found
          </h1>

          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 rounded-lg bg-[#0F5B78] text-white font-semibold hover:bg-[#123044] transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const Icon = department.icon;

  return (
    <div className="min-h-screen bg-[#F7FAFC]">
      {/* Header */}
      <section className="bg-white border-b border-[#DCEEF2]">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-[#0F5B78] font-semibold hover:text-[#123044] transition mb-8"
          >
            <FaArrowLeft />
            Back to Departments
          </button>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-[#EAF6F8] text-[#0F5B78] flex items-center justify-center">
              <Icon size={40} />
            </div>

            <div>
              <p className="text-[#4FA3B8] font-semibold tracking-widest uppercase text-sm">
                Our Department
              </p>

              <h1 className="text-4xl md:text-5xl font-bold text-[#123044] mt-2">
                {department.name}
              </h1>

              <p className="text-[#526675] text-lg mt-2">
                {department.subtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* About */}
          <div className="bg-white rounded-2xl p-8 border border-[#DCEEF2] shadow-sm">
            <h2 className="text-3xl font-bold text-[#123044]">
              About {department.name}
            </h2>

            <div className="w-16 h-1 bg-[#4FA3B8] mt-4 mb-6 rounded-full" />

            <p className="text-[#526675] leading-8 text-lg">
              {department.description}
            </p>
          </div>

          {/* Services */}
          <div className="bg-white rounded-2xl p-8 border border-[#DCEEF2] shadow-sm">
            <h2 className="text-3xl font-bold text-[#123044]">Our Services</h2>

            <div className="w-16 h-1 bg-[#4FA3B8] mt-4 mb-7 rounded-full" />

            <div className="space-y-4">
              {department.services.map((service, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-xl bg-[#EAF6F8] border border-[#DCEEF2]"
                >
                  <FaCheckCircle
                    className="text-[#0F5B78] flex-shrink-0"
                    size={20}
                  />

                  <span className="text-[#123044] font-medium">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Information */}
        <div className="mt-10 bg-[#EAF6F8] border border-[#DCEEF2] rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-[#123044]">
            Expert Care You Can Trust
          </h2>

          <p className="text-[#526675] mt-3 max-w-2xl mx-auto leading-7">
            Our experienced healthcare professionals are committed to providing
            quality medical care and personalized attention to every patient.
          </p>
        </div>
      </section>
    </div>
  );
}

export default DepartmentDetails;
