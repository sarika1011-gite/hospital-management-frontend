import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaCalendarCheck,
  FaUserMd,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useState } from "react";

const DoctorLayout = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const doctorName =
    localStorage.getItem("userName") ||
    localStorage.getItem("name") ||
    "Doctor";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userName");
    localStorage.removeItem("name");
    localStorage.removeItem("role");

    navigate("/login");
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/doctor/dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      name: "Appointments",
      path: "/doctor/appointments",
      icon: <FaCalendarCheck />,
    },
    {
      name: "My Profile",
      path: "/doctor/profile",
      icon: <FaUserMd />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-[#0f172a] text-white transform
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 transition-transform duration-300`}
      >
        {/* Logo */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-700">
          <div>
            <h1 className="text-xl font-bold text-cyan-400">MediCare</h1>

            <p className="text-xs text-gray-400">Doctor Panel</p>
          </div>

          <button
            className="lg:hidden text-gray-300"
            onClick={() => setSidebarOpen(false)}
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Doctor Info */}
        <div className="px-5 py-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold text-lg">
              {doctorName.charAt(0).toUpperCase()}
            </div>

            <div className="overflow-hidden">
              <p className="font-semibold truncate">Dr. {doctorName}</p>

              <p className="text-xs text-gray-400">Doctor</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-4 py-6 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg
                transition-all duration-200
                ${
                  isActive
                    ? "bg-cyan-600 text-white shadow-lg"
                    : "text-gray-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>

              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3
            rounded-lg text-red-400 hover:bg-red-500/10
            hover:text-red-300 transition"
          >
            <FaSignOutAlt />

            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* ================= MAIN AREA ================= */}
      <div className="flex-1 min-w-0">
        {/* Topbar */}
        <header className="h-20 bg-white shadow-sm flex items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden text-gray-700"
              onClick={() => setSidebarOpen(true)}
            >
              <FaBars size={22} />
            </button>

            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Doctor Dashboard
              </h2>

              <p className="text-sm text-gray-500">
                Manage your appointments and patients
              </p>
            </div>
          </div>

          {/* Topbar Profile */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="text-right">
              <p className="font-semibold text-gray-800 text-sm">
                Dr. {doctorName}
              </p>

              <p className="text-xs text-gray-500">Doctor</p>
            </div>

            <div className="w-10 h-10 rounded-full bg-cyan-600 text-white flex items-center justify-center font-bold">
              {doctorName.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DoctorLayout;
