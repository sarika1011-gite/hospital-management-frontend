import { Link } from "react-router-dom";
import { FaHospital, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E1EEF2]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="h-20 flex items-center justify-between">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#0F5B78] text-white flex items-center justify-center shadow-md">
              <FaHospital size={21} />
            </div>

            <div>
              <h1 className="text-xl font-bold text-[#123044]">
                Medi<span className="text-[#0F5B78]">Flow</span>
              </h1>

              <p className="text-[9px] tracking-[0.2em] text-[#526675] uppercase">
                Smart Healthcare
              </p>
            </div>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-8">
            <a href="#home" className="text-sm font-medium text-[#0F5B78]">
              Home
            </a>

            <a
              href="#about"
              className="text-sm font-medium text-[#526675] hover:text-[#0F5B78] transition"
            >
              About
            </a>

            <a
              href="#departments"
              className="text-sm font-medium text-[#526675] hover:text-[#0F5B78] transition"
            >
              Departments
            </a>

            <a
              href="#doctors"
              className="text-sm font-medium text-[#526675] hover:text-[#0F5B78] transition"
            >
              Doctors
            </a>

            <a
              href="#contact"
              className="text-sm font-medium text-[#526675] hover:text-[#0F5B78] transition"
            >
              Contact
            </a>
          </div>

          {/* DESKTOP BUTTONS */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/login"
              className="px-5 py-2.5 rounded-lg border border-[#0F5B78] text-[#0F5B78] text-sm font-semibold hover:bg-[#EAF6F8] transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-5 py-2.5 rounded-lg bg-[#0F5B78] text-white text-sm font-semibold hover:bg-[#123044] transition shadow-md"
            >
              Book Appointment
            </Link>
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-[#0F5B78] text-xl"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="lg:hidden pb-5 border-t border-[#E1EEF2]">
            <div className="flex flex-col gap-4 pt-5">
              <a
                href="#home"
                onClick={() => setMenuOpen(false)}
                className="font-medium text-[#0F5B78]"
              >
                Home
              </a>

              <a
                href="#about"
                onClick={() => setMenuOpen(false)}
                className="font-medium text-[#526675]"
              >
                About
              </a>

              <a
                href="#departments"
                onClick={() => setMenuOpen(false)}
                className="font-medium text-[#526675]"
              >
                Departments
              </a>

              <a
                href="#doctors"
                onClick={() => setMenuOpen(false)}
                className="font-medium text-[#526675]"
              >
                Doctors
              </a>

              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="font-medium text-[#526675]"
              >
                Contact
              </a>

              <div className="flex gap-3 pt-2">
                <Link
                  to="/login"
                  className="flex-1 text-center px-4 py-3 rounded-lg border border-[#0F5B78] text-[#0F5B78] font-semibold"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="flex-1 text-center px-4 py-3 rounded-lg bg-[#0F5B78] text-white font-semibold"
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
