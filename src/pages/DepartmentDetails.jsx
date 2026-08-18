import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

const DepartmentDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const [department, setDepartment] = useState(
    location.state?.department || null,
  );
  const [loading, setLoading] = useState(!location.state?.department);
  const [error, setError] = useState(false);

  useEffect(() => {
    // If department already came from Home,
    // no need to call API again.
    if (location.state?.department) {
      setDepartment(location.state.department);
      setLoading(false);
      return;
    }

    const fetchDepartment = async () => {
      try {
        setLoading(true);
        setError(false);

        // Fetch all departments and find the clicked ID.
        // This works even after refresh / direct URL opening.
        const response = await api.get("/departments");

        const departments = response.data?.departments || [];

        const foundDepartment = departments.find(
          (item) => String(item._id) === String(id),
        );

        if (!foundDepartment) {
          setError(true);
          setDepartment(null);
        } else {
          setDepartment(foundDepartment);
        }
      } catch (err) {
        console.error("Department details error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartment();
  }, [id, location.state]);

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 mx-auto mb-4 rounded-full border-4 border-slate-200 border-t-teal-600 animate-spin" />

          <p className="text-slate-500">Loading department...</p>
        </div>
      </div>
    );
  }

  // =====================================================
  // NOT FOUND
  // =====================================================

  if (error || !department) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="text-center">
          <div className="text-5xl mb-5">🏥</div>

          <h1 className="text-3xl font-bold text-slate-900 mb-3">
            Department Not Found
          </h1>

          <p className="text-slate-500 mb-7">
            The department you're looking for could not be found.
          </p>

          <button
            onClick={() => navigate("/")}
            className="text-teal-600 font-semibold hover:text-teal-700 transition"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  // =====================================================
  // DEPARTMENT INFORMATION
  // =====================================================

  const name = department.name || "Medical Department";

  const departmentInfo = {
    cardiology: {
      icon: "❤️",
      overview:
        "Our Cardiology department provides specialized care for heart and cardiovascular conditions.",
      services: [
        "Heart health evaluation",
        "Cardiovascular diagnosis",
        "Blood pressure management",
        "Heart disease prevention",
        "Cardiac monitoring",
      ],
    },

    neurology: {
      icon: "🧠",
      overview:
        "Our Neurology department focuses on diagnosis and treatment of disorders affecting the brain, nerves and nervous system.",
      services: [
        "Neurological evaluation",
        "Headache and migraine care",
        "Nerve disorder management",
        "Neurological diagnosis",
        "Nervous system care",
      ],
    },

    dermatology: {
      icon: "✨",
      overview:
        "Our Dermatology department provides professional diagnosis and treatment for skin, hair and nail conditions.",
      services: [
        "Skin condition diagnosis",
        "Acne treatment",
        "Hair and scalp care",
        "Skin allergy care",
        "General dermatological care",
      ],
    },

    ent: {
      icon: "👂",
      overview:
        "Our ENT department provides specialized treatment for conditions affecting the ear, nose and throat.",
      services: [
        "Ear care",
        "Nose and sinus care",
        "Throat treatment",
        "Hearing evaluation",
        "ENT condition diagnosis",
      ],
    },

    pediatrics: {
      icon: "👶",
      overview:
        "Our Pediatrics department provides healthcare services specially designed for infants, children and adolescents.",
      services: [
        "Child health checkups",
        "Growth monitoring",
        "Childhood illness care",
        "General pediatric care",
        "Adolescent healthcare",
      ],
    },

    orthopedics: {
      icon: "🦴",
      overview:
        "Our Orthopedics department focuses on diagnosis and treatment of bones, joints, muscles and movement-related conditions.",
      services: [
        "Bone and joint care",
        "Muscle and ligament care",
        "Fracture management",
        "Joint pain evaluation",
        "Musculoskeletal treatment",
      ],
    },

    "general medicine": {
      icon: "🩺",
      overview:
        "Our General Medicine department provides comprehensive diagnosis and treatment for common and general medical conditions.",
      services: [
        "General health evaluation",
        "Common illness treatment",
        "Fever and infection care",
        "Health monitoring",
        "Preventive healthcare",
      ],
    },

    dentist: {
      icon: "🦷",
      overview:
        "Our Dental department provides professional care for teeth, gums and overall oral health.",
      services: [
        "Dental checkups",
        "Oral health evaluation",
        "Tooth pain management",
        "Gum care",
        "General dental treatments",
      ],
    },
  };

  const key = name.trim().toLowerCase();

  const info = departmentInfo[key] || {
    icon: "🏥",
    overview:
      department.description ||
      "Our department provides specialized healthcare services delivered by experienced medical professionals.",
    services: [
      "Specialized medical consultation",
      "Professional diagnosis",
      "Treatment and care",
      "Health monitoring",
      "Preventive healthcare",
    ],
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate("/")}
            className="mb-10 text-slate-500 hover:text-teal-600 transition flex items-center gap-2"
          >
            ← Back to Home
          </button>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* LEFT */}
            <div>
              <div className="w-20 h-20 rounded-2xl bg-teal-50 flex items-center justify-center text-4xl mb-6">
                {info.icon}
              </div>

              <p className="text-sm font-semibold tracking-widest text-teal-600 uppercase mb-3">
                Medical Department
              </p>

              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 capitalize">
                {name}
              </h1>

              <p className="text-lg text-slate-500 leading-8">
                {info.overview}
              </p>
            </div>

            {/* RIGHT */}
            <div className="rounded-3xl bg-slate-50 border border-slate-100 p-8 md:p-10">
              <div className="flex items-center gap-4 mb-7">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-2xl shadow-sm">
                  🏥
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-800">
                    About This Department
                  </h2>

                  <p className="text-sm text-slate-500">
                    Specialized healthcare services
                  </p>
                </div>
              </div>

              <p className="text-slate-600 leading-7">
                {department.description || info.overview}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold tracking-widest text-teal-600 uppercase mb-3">
              What We Provide
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Department Services
            </h2>

            <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
              Our healthcare team provides professional and patient-focused
              services in this department.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {info.services.map((service, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-teal-200 transition"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 font-bold">
                    ✓
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-800">{service}</h3>

                    <p className="text-sm text-slate-500 mt-2 leading-6">
                      Professional care and guidance from qualified healthcare
                      professionals.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-3xl bg-slate-50 border border-slate-100 p-8 md:p-12 text-center">
            <div className="text-4xl mb-5">🩺</div>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Quality Healthcare, Patient First
            </h2>

            <p className="max-w-2xl mx-auto text-slate-500 leading-7">
              Our experienced healthcare professionals are committed to
              providing compassionate, reliable and high-quality medical care to
              every patient.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DepartmentDetails;
