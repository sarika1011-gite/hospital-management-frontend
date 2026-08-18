import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHeartbeat,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaUser,
  FaUserMd,
  FaShieldAlt,
} from "react-icons/fa";

import { loginUser } from "../../services/authService";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "PATIENT",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await loginUser(formData);

      if (!data.success) {
        setError(data.message || "Login failed.");
        return;
      }

      const actualRole = data.user?.role;

      if (actualRole !== formData.role) {
        setError(
          `This account is registered as ${actualRole}. Please select ${actualRole} to login.`,
        );
        return;
      }

      if (actualRole === "ADMIN") {
        navigate("/admin/dashboard");
      } else if (actualRole === "DOCTOR") {
        navigate("/doctor/dashboard");
      } else if (actualRole === "PATIENT") {
        navigate("/patient/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to connect to server. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EAF6F8] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">
        {/* LEFT SIDE */}
        <div className="hidden lg:flex relative bg-[#123044] p-12 flex-col justify-between overflow-hidden">
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#0F5B78]/50" />
          <div className="absolute -bottom-32 -left-24 w-80 h-80 rounded-full bg-[#0F5B78]/40" />

          <div className="relative z-10 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#0F5B78] flex items-center justify-center">
              <FaHeartbeat className="text-white text-2xl" />
            </div>

            <span className="text-2xl font-bold text-white">
              Medi<span className="text-[#70C5D8]">Flow</span>
            </span>
          </div>

          <div className="relative z-10">
            <p className="text-[#70C5D8] font-semibold tracking-widest text-sm uppercase">
              Welcome Back
            </p>

            <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight mt-4">
              Your Healthcare,
              <br />
              <span className="text-[#70C5D8]">Smarter & Simpler.</span>
            </h1>

            <p className="text-[#B8CBD3] mt-6 leading-7 max-w-md">
              Manage appointments, connect with healthcare professionals, and
              take control of your healthcare journey with MediFlow.
            </p>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 text-sm text-[#B8CBD3]">
              <div className="w-2 h-2 rounded-full bg-[#70C5D8]" />
              Secure healthcare management
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-8 sm:p-12 lg:p-14">
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-11 h-11 rounded-xl bg-[#0F5B78] flex items-center justify-center">
              <FaHeartbeat className="text-white text-xl" />
            </div>

            <span className="text-2xl font-bold text-[#123044]">
              Medi<span className="text-[#0F5B78]">Flow</span>
            </span>
          </div>

          <div className="max-w-md mx-auto">
            <p className="text-[#4FA3B8] font-semibold text-sm tracking-widest uppercase">
              Account Login
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold text-[#123044] mt-2">
              Welcome Back!
            </h2>

            <p className="text-[#526675] mt-3">
              Login to continue to your MediFlow account.
            </p>

            {/* ERROR */}
            {error && (
              <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {/* ACCOUNT TYPE */}
              <div>
                <label className="block text-sm font-semibold text-[#123044] mb-2">
                  Login As
                </label>

                <div className="grid grid-cols-3 gap-3">
                  {/* PATIENT */}
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        role: "PATIENT",
                      })
                    }
                    className={`p-3 rounded-xl border-2 transition-all ${
                      formData.role === "PATIENT"
                        ? "border-[#0F5B78] bg-[#EAF6F8] text-[#0F5B78]"
                        : "border-[#DCEEF2] text-[#526675]"
                    }`}
                  >
                    <FaUser className="mx-auto mb-2" />
                    <span className="text-xs font-semibold">Patient</span>
                  </button>

                  {/* DOCTOR */}
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        role: "DOCTOR",
                      })
                    }
                    className={`p-3 rounded-xl border-2 transition-all ${
                      formData.role === "DOCTOR"
                        ? "border-[#0F5B78] bg-[#EAF6F8] text-[#0F5B78]"
                        : "border-[#DCEEF2] text-[#526675]"
                    }`}
                  >
                    <FaUserMd className="mx-auto mb-2" />
                    <span className="text-xs font-semibold">Doctor</span>
                  </button>

                  {/* ADMIN */}
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        role: "ADMIN",
                      })
                    }
                    className={`p-3 rounded-xl border-2 transition-all ${
                      formData.role === "ADMIN"
                        ? "border-[#0F5B78] bg-[#EAF6F8] text-[#0F5B78]"
                        : "border-[#DCEEF2] text-[#526675]"
                    }`}
                  >
                    <FaShieldAlt className="mx-auto mb-2" />
                    <span className="text-xs font-semibold">Admin</span>
                  </button>
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-sm font-semibold text-[#123044] mb-2">
                  Email Address
                </label>

                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A929D]" />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-[#DCEEF2] bg-[#F8FCFD] text-[#123044] outline-none focus:border-[#0F5B78] focus:ring-2 focus:ring-[#EAF6F8]"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block text-sm font-semibold text-[#123044] mb-2">
                  Password
                </label>

                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A929D]" />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    className="w-full pl-11 pr-12 py-3.5 rounded-xl border border-[#DCEEF2] bg-[#F8FCFD] text-[#123044] outline-none focus:border-[#0F5B78] focus:ring-2 focus:ring-[#EAF6F8]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7A929D] hover:text-[#0F5B78]"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* LOGIN */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 bg-[#0F5B78] text-white py-3.5 rounded-xl font-semibold hover:bg-[#123044] transition-all duration-300 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Logging in..." : "Login"}

                {!loading && <FaArrowRight />}
              </button>
            </form>

            {/* REGISTER */}
            <p className="text-center text-sm text-[#526675] mt-8">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-[#0F5B78] hover:text-[#123044]"
              >
                Create Account
              </Link>
            </p>

            {/* BACK HOME */}
            <div className="text-center mt-5">
              <Link
                to="/"
                className="text-sm text-[#7A929D] hover:text-[#0F5B78]"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
