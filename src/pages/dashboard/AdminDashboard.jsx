import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaUserMd,
  FaCalendarCheck,
  FaHospital,
  FaArrowRight,
  FaClock,
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
  FaStethoscope,
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
    booked: 0,
    completed: 0,
    waiting: 0,
    cancelled: 0,
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
          booked: data.appointments?.booked || 0,
          completed: data.appointments?.completed || 0,
          waiting: data.appointments?.waiting || 0,
          cancelled: data.appointments?.cancelled || 0,
        });
      }
    } catch (err) {
      console.error("Dashboard Error:", err);
      setError(err.response?.data?.message || "Unable to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  const mainCards = [
    {
      title: "Total Users",
      value: stats.users,
      icon: FaUsers,
      link: "/admin/patients",
      text: "Registered users",
    },
    {
      title: "Doctors",
      value: stats.doctors,
      icon: FaUserMd,
      link: "/admin/doctors",
      text: "Active doctors",
    },
    {
      title: "Patients",
      value: stats.patients,
      icon: FaUsers,
      link: "/admin/patients",
      text: "Active patients",
    },
    {
      title: "Departments",
      value: stats.departments,
      icon: FaHospital,
      link: "/admin/departments",
      text: "Hospital departments",
    },
  ];

  const appointmentStats = [
    {
      title: "Total",
      value: stats.appointments,
      icon: FaCalendarCheck,
    },
    {
      title: "Booked",
      value: stats.booked,
      icon: FaClock,
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: FaCheckCircle,
    },
    {
      title: "Waiting",
      value: stats.waiting,
      icon: FaHourglassHalf,
    },
    {
      title: "Cancelled",
      value: stats.cancelled,
      icon: FaTimesCircle,
    },
  ];

  return (
    <div className="bg-[#F5FAFB] min-h-full px-5 py-6 lg:px-7 lg:py-7">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
        <div>
          <p className="text-xs font-bold tracking-[0.18em] text-[#4FA3B8] uppercase">
            Admin Panel
          </p>

          <h1 className="text-3xl lg:text-4xl font-bold text-[#123044] mt-1">
            Dashboard Overview
          </h1>

          <p className="text-[#6B828D] mt-1 text-sm">
            Monitor your hospital operations from one place.
          </p>
        </div>

        <Link
          to="/admin/appointments"
          className="inline-flex items-center justify-center gap-2 bg-[#0F5B78] hover:bg-[#0B4D67] text-white px-5 py-3 rounded-xl text-sm font-semibold shadow-md transition"
        >
          <FaCalendarCheck />
          View Appointments
          <FaArrowRight className="text-xs" />
        </Link>
      </div>

      {/* ================= ERROR ================= */}
      {error && (
        <div className="mb-5 bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 flex items-center justify-between text-sm">
          <span>{error}</span>

          <button
            onClick={loadDashboard}
            className="font-semibold underline ml-4"
          >
            Try Again
          </button>
        </div>
      )}

      {/* ================= MAIN CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5">
        {mainCards.map((card) => {
          const Icon = card.icon;

          return (
            <Link
              key={card.title}
              to={card.link}
              className="group bg-white rounded-2xl border border-[#DCEEF2] p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-[#7A929D]">
                    {card.title}
                  </p>

                  <h2 className="text-3xl font-bold text-[#123044] mt-2">
                    {loading ? "..." : card.value}
                  </h2>

                  <p className="text-xs text-[#8BA0A9] mt-1">{card.text}</p>
                </div>

                <div className="w-12 h-12 rounded-xl bg-[#EAF6F8] flex items-center justify-center group-hover:bg-[#DDF1F5] transition">
                  <Icon className="text-xl text-[#0F5B78]" />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#EEF5F6] flex items-center justify-between">
                <span className="text-xs font-semibold text-[#0F5B78]">
                  View Details
                </span>

                <FaArrowRight className="text-xs text-[#4FA3B8] group-hover:translate-x-1 transition" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* ================= LOWER SECTION ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mt-5">
        {/* APPOINTMENT SUMMARY */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-[#DCEEF2] shadow-sm p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-bold text-[#123044]">
                Appointment Summary
              </h2>

              <p className="text-xs text-[#7A929D] mt-1">
                Current appointment status
              </p>
            </div>

            <div className="w-10 h-10 rounded-xl bg-[#EAF6F8] flex items-center justify-center">
              <FaCalendarCheck className="text-[#0F5B78]" />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {appointmentStats.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="bg-[#F7FBFC] rounded-xl p-4 text-center border border-[#EDF5F6]"
                >
                  <Icon className="mx-auto text-[#0F5B78] mb-2" />

                  <p className="text-xl font-bold text-[#123044]">
                    {loading ? "..." : item.value}
                  </p>

                  <p className="text-xs text-[#7A929D] mt-1">{item.title}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* TODAY */}
        <div className="bg-[#123044] rounded-2xl p-5 shadow-sm text-white relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-[#0F5B78] opacity-40" />
          <div className="absolute -right-12 -bottom-12 w-36 h-36 rounded-full bg-[#70C5D8] opacity-10" />

          <div className="relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-[#9DD8E5] font-semibold">
                  Today
                </p>

                <h2 className="text-xl font-bold mt-1">Today's Appointments</h2>
              </div>

              <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center">
                <FaCalendarCheck />
              </div>
            </div>

            <div className="mt-7">
              <p className="text-5xl font-bold">
                {loading ? "..." : stats.today}
              </p>

              <p className="text-sm text-[#B8CBD3] mt-2">
                appointments scheduled for today
              </p>
            </div>

            <Link
              to="/admin/appointments"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#9DD8E5] hover:text-white transition"
            >
              Manage appointments
              <FaArrowRight className="text-xs" />
            </Link>
          </div>
        </div>
      </div>

      {/* ================= QUICK ACTIONS ================= */}
      <div className="mt-5 bg-white rounded-2xl border border-[#DCEEF2] shadow-sm p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#EAF6F8] flex items-center justify-center">
            <FaStethoscope className="text-[#0F5B78]" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#123044]">Quick Actions</h2>

            <p className="text-xs text-[#7A929D]">
              Manage hospital operations quickly
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Link
            to="/admin/doctors"
            className="group p-4 rounded-xl border border-[#DCEEF2] bg-[#F8FCFD] hover:bg-[#EAF6F8] transition"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-[#123044]">
                Manage Doctors
              </span>
              <FaArrowRight className="text-xs text-[#0F5B78] group-hover:translate-x-1 transition" />
            </div>
          </Link>

          <Link
            to="/admin/patients"
            className="group p-4 rounded-xl border border-[#DCEEF2] bg-[#F8FCFD] hover:bg-[#EAF6F8] transition"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-[#123044]">
                Manage Patients
              </span>
              <FaArrowRight className="text-xs text-[#0F5B78] group-hover:translate-x-1 transition" />
            </div>
          </Link>

          <Link
            to="/admin/appointments"
            className="group p-4 rounded-xl border border-[#DCEEF2] bg-[#F8FCFD] hover:bg-[#EAF6F8] transition"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-[#123044]">
                View Appointments
              </span>
              <FaArrowRight className="text-xs text-[#0F5B78] group-hover:translate-x-1 transition" />
            </div>
          </Link>

          <Link
            to="/admin/departments"
            className="group p-4 rounded-xl border border-[#DCEEF2] bg-[#F8FCFD] hover:bg-[#EAF6F8] transition"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-[#123044]">
                Manage Departments
              </span>
              <FaArrowRight className="text-xs text-[#0F5B78] group-hover:translate-x-1 transition" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
