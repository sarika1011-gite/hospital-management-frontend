import { Link } from "react-router-dom";
import { FaHeartbeat, FaHome, FaArrowLeft } from "react-icons/fa";

function NotFound() {
  return (
    <div className="min-h-screen bg-[#EAF6F8] flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        {/* ICON */}
        <div className="w-20 h-20 mx-auto rounded-2xl bg-[#0F5B78] flex items-center justify-center shadow-lg">
          <FaHeartbeat className="text-white text-3xl" />
        </div>

        {/* 404 */}
        <h1 className="text-7xl font-bold text-[#123044] mt-8">404</h1>

        <h2 className="text-2xl font-bold text-[#123044] mt-3">
          Page Not Found
        </h2>

        <p className="text-[#526675] mt-3 leading-6">
          Sorry, the page you are looking for does not exist or may have been
          moved.
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
      </div>
    </div>
  );
}

export default NotFound;
