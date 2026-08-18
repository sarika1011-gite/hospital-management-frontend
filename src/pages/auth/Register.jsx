import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaHeartbeat,
  FaUserMd,
  FaBuilding,
} from "react-icons/fa";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "PATIENT",

    // Doctor fields
    department: "",
    specialization: "",
    qualification: "",
    experience: "",
    consultationFee: "",
    availableDays: [],
    availableTime: "",
  });

  const [departments, setDepartments] = useState([]);
  const [loadingDepartments, setLoadingDepartments] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ======================================
  // LOAD DEPARTMENTS
  // ======================================
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setLoadingDepartments(true);

        const response = await axios.get(
          "http://localhost:5000/api/departments",
        );

        if (response.data.success) {
          setDepartments(response.data.departments || []);
        }
      } catch (err) {
        console.error("Department loading error:", err);
      } finally {
        setLoadingDepartments(false);
      }
    };

    fetchDepartments();
  }, []);

  // ======================================
  // HANDLE CHANGE
  // ======================================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  // ======================================
  // ROLE CHANGE
  // ======================================
  const handleRoleChange = (role) => {
    setFormData((prev) => ({
      ...prev,
      role,

      // Reset doctor fields when patient selected
      ...(role === "PATIENT"
        ? {
            department: "",
            specialization: "",
            qualification: "",
            experience: "",
            consultationFee: "",
            availableDays: [],
            availableTime: "",
          }
        : {}),
    }));

    setError("");
  };

  // ======================================
  // AVAILABLE DAYS
  // ======================================
  const handleDayChange = (day) => {
    setFormData((prev) => {
      const alreadySelected = prev.availableDays.includes(day);

      return {
        ...prev,
        availableDays: alreadySelected
          ? prev.availableDays.filter((item) => item !== day)
          : [...prev.availableDays, day],
      };
    });
  };

  // ======================================
  // SUBMIT
  // ======================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      // Doctor department validation
      if (formData.role === "DOCTOR" && !formData.department) {
        setError("Please select a department.");
        setLoading(false);
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData,
      );

      if (response.data.success) {
        window.alert(
          `${
            formData.role === "DOCTOR" ? "Doctor" : "Patient"
          } registration successful! Please login.`,
        );

        navigate("/login");
      }
    } catch (err) {
      console.error("Registration error:", err);

      setError(
        err.response?.data?.message || "Unable to register. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

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
              Join MediFlow
            </p>

            <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight mt-4">
              Your Healthcare,
              <br />
              <span className="text-[#70C5D8]">Smarter & Simpler.</span>
            </h1>

            <p className="text-[#B8CBD3] mt-6 leading-7 max-w-md">
              Create your MediFlow account and manage appointments, doctors and
              your healthcare journey easily.
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
          {/* MOBILE LOGO */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-xl bg-[#0F5B78] flex items-center justify-center">
              <FaHeartbeat className="text-white text-xl" />
            </div>

            <span className="text-2xl font-bold text-[#123044]">
              Medi<span className="text-[#0F5B78]">Flow</span>
            </span>
          </div>

          <div className="max-w-md mx-auto">
            <p className="text-[#4FA3B8] font-semibold text-sm tracking-widest uppercase">
              Create Account
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold text-[#123044] mt-2">
              Get Started!
            </h2>

            <p className="text-[#526675] mt-3">
              Create your account to continue with MediFlow.
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
                  Account Type
                </label>

                <div className="grid grid-cols-2 gap-3">
                  {/* PATIENT */}
                  <button
                    type="button"
                    onClick={() => handleRoleChange("PATIENT")}
                    className={`flex items-center justify-center gap-2 py-3.5 rounded-xl border font-semibold transition-all ${
                      formData.role === "PATIENT"
                        ? "bg-[#0F5B78] text-white border-[#0F5B78] shadow-md"
                        : "bg-[#F8FCFD] text-[#526675] border-[#DCEEF2] hover:border-[#0F5B78]"
                    }`}
                  >
                    <FaUser />
                    Patient
                  </button>

                  {/* DOCTOR */}
                  <button
                    type="button"
                    onClick={() => handleRoleChange("DOCTOR")}
                    className={`flex items-center justify-center gap-2 py-3.5 rounded-xl border font-semibold transition-all ${
                      formData.role === "DOCTOR"
                        ? "bg-[#0F5B78] text-white border-[#0F5B78] shadow-md"
                        : "bg-[#F8FCFD] text-[#526675] border-[#DCEEF2] hover:border-[#0F5B78]"
                    }`}
                  >
                    <FaUserMd />
                    Doctor
                  </button>
                </div>
              </div>

              {/* NAME */}
              <div>
                <label className="block text-sm font-semibold text-[#123044] mb-2">
                  Full Name
                </label>

                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A929D]" />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-[#DCEEF2] bg-[#F8FCFD] text-[#123044] outline-none focus:border-[#0F5B78]"
                  />
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
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-[#DCEEF2] bg-[#F8FCFD] text-[#123044] outline-none focus:border-[#0F5B78]"
                  />
                </div>
              </div>

              {/* PHONE */}
              <div>
                <label className="block text-sm font-semibold text-[#123044] mb-2">
                  Phone Number
                </label>

                <div className="relative">
                  <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A929D]" />

                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    required
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-[#DCEEF2] bg-[#F8FCFD] text-[#123044] outline-none focus:border-[#0F5B78]"
                  />
                </div>
              </div>

              {/* DOCTOR DETAILS */}
              {formData.role === "DOCTOR" && (
                <div className="space-y-5 p-5 rounded-2xl bg-[#F5FAFB] border border-[#DCEEF2]">
                  <div>
                    <h3 className="text-lg font-bold text-[#123044]">
                      Doctor Information
                    </h3>

                    <p className="text-sm text-[#7A929D] mt-1">
                      Select your department and enter professional details.
                    </p>
                  </div>

                  {/* DEPARTMENT */}
                  <div>
                    <label className="block text-sm font-semibold text-[#123044] mb-2">
                      <span className="flex items-center gap-2">
                        <FaBuilding className="text-[#0F5B78]" />
                        Department
                      </span>
                    </label>

                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3.5 rounded-xl border border-[#DCEEF2] bg-white text-[#123044] outline-none focus:border-[#0F5B78]"
                    >
                      <option value="">
                        {loadingDepartments
                          ? "Loading departments..."
                          : "Select Department"}
                      </option>

                      {departments.map((department) => (
                        <option key={department._id} value={department._id}>
                          {department.name}
                        </option>
                      ))}
                    </select>

                    {departments.length === 0 && !loadingDepartments && (
                      <p className="text-xs text-red-500 mt-2">
                        No departments available.
                      </p>
                    )}
                  </div>

                  {/* SPECIALIZATION */}
                  <div>
                    <label className="block text-sm font-semibold text-[#123044] mb-2">
                      Specialization
                    </label>

                    <input
                      type="text"
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleChange}
                      placeholder="e.g. Cardiologist"
                      required
                      className="w-full px-4 py-3.5 rounded-xl border border-[#DCEEF2] bg-white text-[#123044] outline-none focus:border-[#0F5B78]"
                    />
                  </div>

                  {/* QUALIFICATION */}
                  <div>
                    <label className="block text-sm font-semibold text-[#123044] mb-2">
                      Qualification
                    </label>

                    <input
                      type="text"
                      name="qualification"
                      value={formData.qualification}
                      onChange={handleChange}
                      placeholder="e.g. MBBS, MD"
                      required
                      className="w-full px-4 py-3.5 rounded-xl border border-[#DCEEF2] bg-white text-[#123044] outline-none focus:border-[#0F5B78]"
                    />
                  </div>

                  {/* EXPERIENCE + FEE */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#123044] mb-2">
                        Experience
                      </label>

                      <input
                        type="number"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        placeholder="Years"
                        min="0"
                        required
                        className="w-full px-4 py-3.5 rounded-xl border border-[#DCEEF2] bg-white text-[#123044] outline-none focus:border-[#0F5B78]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#123044] mb-2">
                        Consultation Fee
                      </label>

                      <input
                        type="number"
                        name="consultationFee"
                        value={formData.consultationFee}
                        onChange={handleChange}
                        placeholder="₹ Fee"
                        min="0"
                        required
                        className="w-full px-4 py-3.5 rounded-xl border border-[#DCEEF2] bg-white text-[#123044] outline-none focus:border-[#0F5B78]"
                      />
                    </div>
                  </div>

                  {/* AVAILABLE DAYS */}
                  <div>
                    <label className="block text-sm font-semibold text-[#123044] mb-3">
                      Available Days
                    </label>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {days.map((day) => (
                        <label
                          key={day}
                          className="flex items-center gap-2 p-2 rounded-lg bg-white border border-[#DCEEF2] text-sm text-[#526675] cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={formData.availableDays.includes(day)}
                            onChange={() => handleDayChange(day)}
                          />

                          {day}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* AVAILABLE TIME */}
                  <div>
                    <label className="block text-sm font-semibold text-[#123044] mb-2">
                      Available Time
                    </label>

                    <input
                      type="text"
                      name="availableTime"
                      value={formData.availableTime}
                      onChange={handleChange}
                      placeholder="e.g. 10:00 AM - 2:00 PM"
                      className="w-full px-4 py-3.5 rounded-xl border border-[#DCEEF2] bg-white text-[#123044] outline-none focus:border-[#0F5B78]"
                    />
                  </div>
                </div>
              )}

              {/* PASSWORD */}
              <div>
                <label className="block text-sm font-semibold text-[#123044] mb-2">
                  Password
                </label>

                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A929D]" />

                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    required
                    minLength={6}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-[#DCEEF2] bg-[#F8FCFD] text-[#123044] outline-none focus:border-[#0F5B78]"
                  />
                </div>

                <p className="text-xs text-[#7A929D] mt-2">
                  Password must contain at least 6 characters.
                </p>
              </div>

              {/* ROLE INFO */}
              <div className="p-4 rounded-xl bg-[#EAF6F8] border border-[#DCEEF2]">
                <p className="text-sm font-semibold text-[#123044]">
                  Selected Account
                </p>

                <p className="text-sm text-[#526675] mt-1">
                  You are registering as{" "}
                  <span className="font-semibold text-[#0F5B78]">
                    {formData.role === "DOCTOR" ? "Doctor" : "Patient"}
                  </span>
                  .
                </p>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-[#0F5B78] text-white font-semibold hover:bg-[#123044] transition-all duration-300 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading
                  ? "Creating Account..."
                  : `Create ${
                      formData.role === "DOCTOR" ? "Doctor" : "Patient"
                    } Account`}
              </button>
            </form>

            {/* LOGIN */}
            <p className="text-center text-sm text-[#526675] mt-8">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-[#0F5B78] hover:text-[#123044]"
              >
                Login
              </Link>
            </p>

            {/* HOME */}
            <div className="text-center mt-5">
              <Link
                to="/"
                className="text-sm text-[#7A929D] hover:text-[#0F5B78]"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
