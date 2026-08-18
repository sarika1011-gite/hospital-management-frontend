import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const DepartmentSection = () => {
  const navigate = useNavigate();

  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await api.get("/departments");

        setDepartments(response.data?.departments || []);
      } catch (error) {
        console.error("Departments loading error:", error);
        setDepartments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const handleDepartmentClick = (department) => {
    navigate(`/departments/${department._id}`, {
      state: {
        department,
      },
    });
  };

  return (
    <section id="departments" className="py-20 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-teal-50 text-teal-700 text-sm font-semibold tracking-wide mb-4">
            OUR DEPARTMENTS
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
            Explore Our <span className="text-teal-600">Departments</span>
          </h2>

          <p className="mt-5 max-w-2xl mx-auto text-slate-500 text-lg leading-7">
            Explore our specialized medical departments and discover quality
            healthcare services delivered by experienced professionals.
          </p>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="w-10 h-10 rounded-full border-4 border-slate-200 border-t-teal-600 animate-spin" />
          </div>
        )}

        {/* DEPARTMENTS */}
        {!loading && departments.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map((department) => (
              <div
                key={department._id}
                onClick={() => handleDepartmentClick(department)}
                className="group cursor-pointer"
              >
                <div
                  className="
                    h-full
                    bg-white
                    border border-slate-200
                    rounded-2xl
                    p-6
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-2
                    hover:shadow-xl
                    hover:border-teal-200
                  "
                >
                  {/* ICON */}
                  <div
                    className="
                      w-14 h-14
                      rounded-2xl
                      bg-teal-50
                      flex items-center justify-center
                      mb-6
                      transition-all duration-300
                      group-hover:bg-teal-600
                    "
                  >
                    <span
                      className="
                        text-2xl
                        transition-all duration-300
                        group-hover:scale-110
                      "
                    >
                      🏥
                    </span>
                  </div>

                  {/* NAME */}
                  <h3 className="text-xl font-bold text-slate-800 capitalize mb-3">
                    {department.name}
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="text-sm text-slate-500 leading-6 line-clamp-3">
                    {department.description ||
                      "Specialized healthcare services provided by experienced medical professionals."}
                  </p>

                  {/* EXPLORE */}
                  <div className="mt-6 flex items-center gap-2 text-teal-600 font-semibold text-sm">
                    <span>Explore Department</span>

                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* EMPTY */}
        {!loading && departments.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500">No departments available.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default DepartmentSection;
