import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaHeartbeat,
  FaChartLine,
  FaCalendarCheck,
  FaUserMd,
  FaUsers,
  FaHospital,
  FaFileAlt,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: FaChartLine,
    },
    {
      name: "Appointments",
      path: "/admin/appointments",
      icon: FaCalendarCheck,
    },
    {
      name: "Doctors",
      path: "/admin/doctors",
      icon: FaUserMd,
    },
    {
      name: "Patients",
      path: "/admin/patients",
      icon: FaUsers,
    },
    {
      name: "Departments",
      path: "/admin/departments",
      icon: FaHospital,
    },
    {
      name: "Reports",
      path: "/admin/reports",
      icon: FaFileAlt,
    },
    {
      name: "Profile",
      path: "/admin/profile",
      icon: FaUser,
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: FaCog,
    },
  ];

  return (
    <div className="h-screen bg-[#F5FAFB] flex overflow-hidden">
      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed lg:relative
          z-40
          top-0 left-0
          h-screen
          w-64
          flex-shrink-0
          bg-[#123044]
          text-white
          flex flex-col
          transform transition-transform duration-300
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* LOGO */}
        <div className="h-20 flex-shrink-0 px-6 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#0F5B78] flex items-center justify-center">
              <FaHeartbeat className="text-xl" />
            </div>

            <div>
              <h1 className="text-xl font-bold">
                Medi<span className="text-[#70C5D8]">Flow</span>
              </h1>

              <p className="text-xs text-[#B8CBD3]">Hospital Management</p>
            </div>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-[#B8CBD3] text-lg"
          >
            <FaTimes />
          </button>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 min-h-0 overflow-y-auto px-4 py-5">
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
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
                  <Icon className="text-lg flex-shrink-0" />

                  <span className="font-medium">{item.name}</span>
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* LOGOUT */}
        <div className="flex-shrink-0 p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#B8CBD3] hover:bg-red-500/20 hover:text-white transition"
          >
            <FaSignOutAlt />

            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* ================= MAIN AREA ================= */}
      <div className="flex-1 min-w-0 h-screen flex flex-col overflow-hidden">
        {/* TOP BAR */}
        <header className="h-20 flex-shrink-0 bg-white border-b border-[#DCEEF2] px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* MOBILE MENU */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-[#123044] text-xl"
            >
              <FaBars />
            </button>

            <div>
              <h2 className="text-xl font-bold text-[#123044]">Admin Panel</h2>

              <p className="text-sm text-[#7A929D]">
                Hospital overview & management
              </p>
            </div>
          </div>

          {/* USER */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-[#123044]">
                {user?.name || "Admin User"}
              </p>

              <p className="text-xs text-[#7A929D]">Administrator</p>
            </div>

            <div className="w-11 h-11 rounded-full bg-[#EAF6F8] flex items-center justify-center">
              <FaUsers className="text-[#0F5B78]" />
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 min-h-0 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
