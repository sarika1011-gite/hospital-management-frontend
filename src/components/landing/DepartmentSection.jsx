import {
  FaHeartbeat,
  FaBone,
  FaBrain,
  FaBaby,
  FaEye,
  FaTooth,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

const departments = [
  {
    icon: <FaHeartbeat size={32} />,
    title: "Cardiology",
    desc: "Heart care and treatment",
    slug: "cardiology",
  },
  {
    icon: <FaBone size={32} />,
    title: "Orthopedics",
    desc: "Bone & Joint Care",
    slug: "orthopedics",
  },
  {
    icon: <FaBrain size={32} />,
    title: "Neurology",
    desc: "Brain & Nervous System",
    slug: "neurology",
  },
  {
    icon: <FaBaby size={32} />,
    title: "Pediatrics",
    desc: "Child Healthcare",
    slug: "pediatrics",
  },
  {
    icon: <FaEye size={32} />,
    title: "Ophthalmology",
    desc: "Eye Care",
    slug: "ophthalmology",
  },
  {
    icon: <FaTooth size={32} />,
    title: "Dental",
    desc: "Dental Care",
    slug: "dental",
  },
];

function DepartmentSection() {
  const navigate = useNavigate();

  return (
    <section id="departments" className="py-24 bg-[#F7FAFC]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-[#4FA3B8] font-semibold tracking-widest uppercase">
            Our Departments
          </p>

          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-[#123044]">
            Specialized Care For Every Need
          </h2>

          <p className="text-[#526675] mt-5 leading-7">
            Our specialized departments bring together experienced healthcare
            professionals and modern medical care.
          </p>
        </div>

        {/* Department Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 mt-16">
          {departments.map((dept, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 border border-[#DCEEF2] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-[#EAF6F8] text-[#0F5B78] flex items-center justify-center group-hover:bg-[#0F5B78] group-hover:text-white transition-all duration-300">
                {dept.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-semibold text-[#123044] mt-6">
                {dept.title}
              </h3>

              {/* Description */}
              <p className="text-[#526675] mt-3 leading-7">{dept.desc}</p>

              {/* Explore */}
              <button
                type="button"
                onClick={() => navigate(`/departments/${dept.slug}`)}
                className="mt-6 text-[#0F5B78] font-semibold group-hover:text-[#123044] transition"
              >
                Explore Department →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DepartmentSection;
