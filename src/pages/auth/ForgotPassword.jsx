import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeartbeat, FaEnvelope, FaArrowLeft } from "react-icons/fa";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email },
      );

      if (response.data.success) {
        setMessage(
          response.data.message ||
            "If an account exists with this email, password reset instructions have been sent.",
        );
      }
    } catch (err) {
      console.error("Forgot password error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to process your request. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EAF6F8] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* LOGO */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-[#0F5B78] flex items-center justify-center shadow-lg">
            <FaHeartbeat className="text-white text-2xl" />
          </div>

          <h1 className="text-3xl font-bold text-[#123044] mt-4">MediFlow</h1>

          <p className="text-[#526675] mt-1">
            Hospital Appointment Management System
          </p>
        </div>

        {/* CARD */}
        <div className="bg-white rounded-2xl shadow-lg border border-[#DCEEF2] p-7">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#EAF6F8] flex items-center justify-center">
              <FaEnvelope className="text-[#0F5B78]" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#123044]">
                Forgot Password?
              </h2>

              <p className="text-sm text-[#7A929D] mt-1">
                Enter your registered email address.
              </p>
            </div>
          </div>

          {/* SUCCESS */}
          {message && (
            <div className="mb-5 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm">
              {message}
            </div>
          )}

          {/* ERROR */}
          {error && (
            <div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* EMAIL */}
            <div>
              <label className="block text-sm font-semibold text-[#123044] mb-2">
                Email Address
              </label>

              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A929D]" />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-[#DCEEF2] bg-[#F8FCFD] text-[#123044] outline-none focus:border-[#0F5B78] focus:ring-2 focus:ring-[#EAF6F8]"
                />
              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[#0F5B78] text-white font-semibold hover:bg-[#123044] transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send Reset Instructions"}
            </button>
          </form>

          {/* BACK TO LOGIN */}
          <div className="text-center mt-6">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0F5B78] hover:text-[#123044]"
            >
              <FaArrowLeft />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
