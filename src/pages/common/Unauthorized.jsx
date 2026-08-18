import { Link } from "react-router-dom";
import { FaHeartbeat, FaShieldAlt, FaHome, FaArrowLeft } from "react-icons/fa";

function Unauthorized() {
  return (
    <div className="min-h-screen bg-[#EAF6F8] flex items-center justify-center px-6">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl border border-[#DCEEF2] p-8 sm:p-10 text-center">
        {/* ICON */}
        <div className="w-20 h-20 mx-auto rounded-2xl bg-[#0F5B78] flex items-center justify-center shadow-lg">
          <FaShieldAlt className="text-white text-3xl" />
        </div>

        {/* TITLE */}
        <p className="text-[#4FA3B8] font-semibold text-sm uppercase tracking-widest mt-7">
          Access Denied
        </p>

        <h1 className="text-4xl font-bold text-[#123044] mt-2">Unauthorized</h1>

        <p className="text-[#526675] mt-4 leading-6">
          You do not have permission to access this page. Please login with an
          account that has the required access.
        </p>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0F5B78] text-white font-semibold hover:bg-[#123044] transition"
          >
            <FaHome />
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-[#DCEEF2] text-[#0F5B78] font-semibold hover:bg-[#EAF6F8] transition"
          >
            <FaArrowLeft />
            Go Back
          </button>
        </div>

        {/* BRAND */}
        <div className="flex items-center justify-center gap-2 mt-10 text-[#123044]">
          <FaHeartbeat className="text-[#0F5B78]" />
          <span className="font-bold">
            Medi<span className="text-[#0F5B78]">Flow</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Unauthorized;
