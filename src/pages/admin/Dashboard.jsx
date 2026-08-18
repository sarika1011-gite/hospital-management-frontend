import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaUserMd,
  FaCalendarCheck,
  FaHospital,
  FaArrowRight,
} from "react-icons/fa";
import api from "../../services/api";

function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    doctors: 0,
    patients: 0,
    departments: 0,
    appointments: 0,
    today: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/dashboard");

      if (response.data.success) {
        const data = response.data.dashboard;

        setStats({
          users: data.users?.total || 0,
          doctors: data.doctors?.total || 0,
          patients: data.patients?.total || 0,
          departments: data.departments?.total || 0,
          appointments: data.appointments?.total || 0,
          today: data.appointments?.today || 0,
        });
      }
    } catch (err) {
      console.error("Dashboard Error:", err);

      setError(err.response?.data?.message || "Unable to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    {
      title: "Total Users",
      value: stats.users,
      icon: FaUsers,
      link: "/admin/patients",
    },
    {
      title: "Doctors",
      value: stats.doctors,
      icon: FaUserMd,
      link: "/admin/doctors",
    },
    {
      title: "Patients",
      value: stats.patients,
      icon: FaUsers,
      link: "/admin/patients",
    },
    {
      title: "Departments",
      value: stats.departments,
      icon: FaHospital,
      link: "/admin/departments",
    },
    {
      title: "Total Appointments",
      value: stats.appointments,
      icon: FaCalendarCheck,
      link: "/admin/appointments",
    },
    {
      title: "Today's Appointments",
      value: stats.today,
      icon: FaCalendarCheck,
      link: "/admin/appointments",
    },
  ];

  return (
    <div className="w-full bg-[#F5FAFB] p-6 lg:p-8">
      {/* HEADER */}
      <div className="mb-8">
        <p className="text-sm font-semibold text-[#4FA3B8] uppercase tracking-wider">
          Admin Panel
        </p>

        <h1 className="text-4xl font-bold text-[#123044] mt-2">
          Dashboard Overview
        </h1>

        <p className="text-[#526675] mt-2">
          Monitor your hospital operations from one place.
        </p>
      </div>

      {/* ERROR */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 flex items-center justify-between">
          <span>{error}</span>

          <button onClick={loadDashboard} className="font-semibold underline">
            Try Again
          </button>
        </div>
      )}

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <Link
              key={card.title}
              to={card.link}
              className="bg-white rounded-2xl p-6 border border-[#DCEEF2] shadow-sm hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#7A929D] font-medium">
                    {card.title}
                  </p>

                  <h2 className="text-4xl font-bold text-[#123044] mt-3">
                    {loading ? "..." : card.value}
                  </h2>
                </div>

                <div className="w-14 h-14 rounded-xl bg-[#EAF6F8] flex items-center justify-center">
                  <Icon className="text-2xl text-[#0F5B78]" />
                </div>
              </div>

              <div className="flex items-center gap-2 mt-5 text-sm font-semibold text-[#0F5B78]">
                View Details
                <FaArrowRight />
              </div>
            </Link>
          );
        })}
      </div>

      {/* QUICK ACTIONS */}
      <div className="mt-8 bg-white rounded-2xl border border-[#DCEEF2] p-6">
        <h2 className="text-xl font-bold text-[#123044] mb-5">Quick Actions</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/admin/doctors"
            className="p-4 rounded-xl bg-[#F5FAFB] hover:bg-[#EAF6F8] transition font-semibold text-[#123044]"
          >
            Manage Doctors
          </Link>

          <Link
            to="/admin/patients"
            className="p-4 rounded-xl bg-[#F5FAFB] hover:bg-[#EAF6F8] transition font-semibold text-[#123044]"
          >
            Manage Patients
          </Link>

          <Link
            to="/admin/appointments"
            className="p-4 rounded-xl bg-[#F5FAFB] hover:bg-[#EAF6F8] transition font-semibold text-[#123044]"
          >
            View Appointments
          </Link>

          <Link
            to="/admin/departments"
            className="p-4 rounded-xl bg-[#F5FAFB] hover:bg-[#EAF6F8] transition font-semibold text-[#123044]"
          >
            Manage Departments
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
