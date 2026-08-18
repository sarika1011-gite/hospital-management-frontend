import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  FaHeartbeat,
  FaHome,
  FaCalendarCheck,
  FaCalendarAlt,
  FaFilePrescription,
  FaUser,
  FaBars,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";

function PatientLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/patient/dashboard",
      icon: <FaHome />,
    },
    {
      name: "Book Appointment",
      path: "/patient/book-appointment",
      icon: <FaCalendarAlt />,
    },
    {
      name: "My Appointments",
      path: "/patient/my-appointments",
      icon: <FaCalendarCheck />,
    },
    {
      name: "Appointment History",
      path: "/patient/appointment-history",
      icon: <FaCalendarAlt />,
    },
    {
      name: "Prescriptions",
      path: "/patient/prescriptions",
      icon: <FaFilePrescription />,
    },
    {
      name: "Profile",
      path: "/patient/profile",
      icon: <FaUser />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#EAF6F8]">
      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-[#123044] text-white transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* LOGO */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0F5B78] flex items-center justify-center">
              <FaHeartbeat className="text-white text-xl" />
            </div>

            <span className="text-xl font-bold">
              Medi<span className="text-[#70C5D8]">Flow</span>
            </span>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white text-xl"
          >
            <FaTimes />
          </button>
        </div>

        {/* PATIENT INFO */}
        <div className="px-5 py-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#0F5B78] flex items-center justify-center">
              <FaUser />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold truncate">
                {user.name || "Patient"}
              </p>

              <p className="text-xs text-[#B8CBD3]">Patient</p>
            </div>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-180px)]">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  isActive
                    ? "bg-[#0F5B78] text-white shadow-md"
                    : "text-[#B8CBD3] hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>

              <span className="text-sm font-medium">{item.name}</span>
            </NavLink>
          ))}

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#B8CBD3] hover:bg-red-500/20 hover:text-red-300 transition mt-4"
          >
            <FaSignOutAlt className="text-lg" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </nav>
      </aside>

      {/* MAIN AREA */}
      <div className="lg:ml-64 min-h-screen">
        {/* TOPBAR */}
        <header className="h-20 bg-white border-b border-[#DCEEF2] flex items-center justify-between px-5 sm:px-8 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden w-10 h-10 rounded-xl bg-[#EAF6F8] text-[#0F5B78] flex items-center justify-center"
            >
              <FaBars />
            </button>

            <div>
              <h1 className="text-lg font-bold text-[#123044]">
                Patient Portal
              </h1>

              <p className="text-xs text-[#7A929D] hidden sm:block">
                Manage your healthcare easily
              </p>
            </div>
          </div>

          {/* USER */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-[#123044]">
                {user.name || "Patient"}
              </p>

              <p className="text-xs text-[#7A929D]">Patient</p>
            </div>

            <div className="w-10 h-10 rounded-full bg-[#0F5B78] text-white flex items-center justify-center">
              <FaUser />
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default PatientLayout;
