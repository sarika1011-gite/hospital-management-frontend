import { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBirthdayCake,
  FaVenusMars,
  FaMapMarkerAlt,
  FaTint,
  FaNotesMedical,
  FaSave,
  FaUserCircle,
} from "react-icons/fa";
import axios from "axios";

function Profile() {
  const [patientId, setPatientId] = useState("");

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    mobile: "",
    age: "",
    gender: "",
    address: "",
    bloodGroup: "",
    medicalInformation: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ==========================================
  // GET MY PATIENT PROFILE
  // ==========================================
  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login again.");
        return;
      }

      const response = await axios.get(
        "http://localhost:5000/api/patients/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        const patient = response.data.patient;

        // Save patient MongoDB ID
        setPatientId(patient._id);

        setProfile({
          name: patient.name || "",
          email: patient.email || patient.user?.email || "",
          mobile: patient.mobile || patient.user?.phone || "",
          age: patient.age ?? "",
          gender: patient.gender || "",
          address: patient.address || "",
          bloodGroup: patient.bloodGroup || "",
          medicalInformation: patient.medicalInformation || "",
        });
      }
    } catch (err) {
      console.error("Patient profile error:", err);

      setError(
        err.response?.data?.message || "Unable to load patient profile.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // ==========================================
  // HANDLE INPUT CHANGE
  // ==========================================
  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });

    setError("");
    setSuccess("");
  };

  // ==========================================
  // UPDATE PATIENT PROFILE
  // ==========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!patientId) {
      setError("Patient profile ID not found. Please refresh the page.");
      return;
    }

    if (!profile.name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!profile.mobile.trim()) {
      setError("Please enter your mobile number.");
      return;
    }

    if (!profile.age || Number(profile.age) < 1) {
      setError("Please enter a valid age.");
      return;
    }

    if (!profile.gender) {
      setError("Please select your gender.");
      return;
    }

    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Session expired. Please login again.");
        return;
      }

      const response = await axios.put(
        `http://localhost:5000/api/patients/${patientId}`,
        {
          name: profile.name.trim(),
          mobile: profile.mobile.trim(),
          age: Number(profile.age),
          gender: profile.gender,
          address: profile.address.trim(),
          bloodGroup: profile.bloodGroup || null,
          medicalInformation: profile.medicalInformation.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.data.success) {
        const updatedPatient = response.data.patient;

        setProfile({
          name: updatedPatient.name || "",
          email: updatedPatient.email || updatedPatient.user?.email || "",
          mobile: updatedPatient.mobile || updatedPatient.user?.phone || "",
          age: updatedPatient.age ?? "",
          gender: updatedPatient.gender || "",
          address: updatedPatient.address || "",
          bloodGroup: updatedPatient.bloodGroup || "",
          medicalInformation: updatedPatient.medicalInformation || "",
        });

        setSuccess("Profile updated successfully.");

        // Update stored user information
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
          try {
            const user = JSON.parse(storedUser);

            user.name = updatedPatient.name;

            if (updatedPatient.mobile) {
              user.phone = updatedPatient.mobile;
            }

            localStorage.setItem("user", JSON.stringify(user));
          } catch (storageError) {
            console.error("Local user update error:", storageError);
          }
        }
      }
    } catch (err) {
      console.error("Update patient error:", err);

      setError(err.response?.data?.message || "Failed to update patient.");
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================
  if (loading) {
    return (
      <div className="min-h-screen bg-[#EAF6F8] p-6 lg:p-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-[#DCEEF2] p-12 text-center">
            <FaUserCircle className="mx-auto text-[#0F5B78] text-5xl animate-pulse" />

            <p className="text-[#526675] mt-4">Loading your profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EAF6F8] p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* ==========================================
            HEADER
        ========================================== */}
        <div className="mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#0F5B78] flex items-center justify-center">
              <FaUser className="text-white text-2xl" />
            </div>

            <div>
              <p className="text-[#4FA3B8] font-semibold text-sm uppercase tracking-widest">
                Patient
              </p>

              <h1 className="text-3xl font-bold text-[#123044]">My Profile</h1>
            </div>
          </div>

          <p className="text-[#526675] mt-3">
            View and manage your personal and medical information.
          </p>
        </div>

        {/* ==========================================
            ERROR
        ========================================== */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
            {error}
          </div>
        )}

        {/* ==========================================
            SUCCESS
        ========================================== */}
        {success && (
          <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-medium">
            {success}
          </div>
        )}

        {/* ==========================================
            PROFILE CARD
        ========================================== */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#DCEEF2] overflow-hidden">
          {/* PROFILE TOP */}
          <div className="bg-[#123044] p-6 sm:p-8">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-full bg-[#0F5B78] flex items-center justify-center border-4 border-white/20">
                <FaUser className="text-white text-3xl" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white">
                  {profile.name || "Patient"}
                </h2>

                <p className="text-[#B8CBD3] mt-1">Patient Account</p>

                <p className="text-[#70C5D8] text-sm mt-1">
                  {profile.email || "Email not available"}
                </p>
              </div>
            </div>
          </div>

          {/* ==========================================
              FORM
          ========================================== */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
            {/* ==========================================
                PERSONAL INFORMATION
            ========================================== */}
            <div>
              <h3 className="text-lg font-bold text-[#123044] mb-5">
                Personal Information
              </h3>

              <div className="grid md:grid-cols-2 gap-5">
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
                      value={profile.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-[#DCEEF2] bg-[#F8FCFD] text-[#123044] outline-none focus:border-[#0F5B78] focus:ring-2 focus:ring-[#EAF6F8]"
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
                      value={profile.email}
                      disabled
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-[#DCEEF2] bg-[#EEF4F6] text-[#7A929D] cursor-not-allowed"
                    />
                  </div>

                  <p className="text-xs text-[#7A929D] mt-1">
                    Email cannot be changed.
                  </p>
                </div>

                {/* MOBILE */}
                <div>
                  <label className="block text-sm font-semibold text-[#123044] mb-2">
                    Mobile Number
                  </label>

                  <div className="relative">
                    <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A929D]" />

                    <input
                      type="text"
                      name="mobile"
                      value={profile.mobile}
                      onChange={handleChange}
                      required
                      placeholder="Enter mobile number"
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-[#DCEEF2] bg-[#F8FCFD] text-[#123044] outline-none focus:border-[#0F5B78] focus:ring-2 focus:ring-[#EAF6F8]"
                    />
                  </div>
                </div>

                {/* AGE */}
                <div>
                  <label className="block text-sm font-semibold text-[#123044] mb-2">
                    Age
                  </label>

                  <div className="relative">
                    <FaBirthdayCake className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A929D]" />

                    <input
                      type="number"
                      name="age"
                      value={profile.age}
                      onChange={handleChange}
                      min="1"
                      max="120"
                      required
                      placeholder="Enter age"
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-[#DCEEF2] bg-[#F8FCFD] text-[#123044] outline-none focus:border-[#0F5B78] focus:ring-2 focus:ring-[#EAF6F8]"
                    />
                  </div>
                </div>

                {/* GENDER */}
                <div>
                  <label className="block text-sm font-semibold text-[#123044] mb-2">
                    Gender
                  </label>

                  <div className="relative">
                    <FaVenusMars className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A929D]" />

                    <select
                      name="gender"
                      value={profile.gender}
                      onChange={handleChange}
                      required
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-[#DCEEF2] bg-[#F8FCFD] text-[#123044] outline-none focus:border-[#0F5B78] focus:ring-2 focus:ring-[#EAF6F8]"
                    >
                      <option value="">Select Gender</option>

                      <option value="Male">Male</option>

                      <option value="Female">Female</option>

                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* BLOOD GROUP */}
                <div>
                  <label className="block text-sm font-semibold text-[#123044] mb-2">
                    Blood Group
                  </label>

                  <div className="relative">
                    <FaTint className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A929D]" />

                    <select
                      name="bloodGroup"
                      value={profile.bloodGroup}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-[#DCEEF2] bg-[#F8FCFD] text-[#123044] outline-none focus:border-[#0F5B78] focus:ring-2 focus:ring-[#EAF6F8]"
                    >
                      <option value="">Select Blood Group</option>

                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* ==========================================
                ADDRESS
            ========================================== */}
            <div>
              <h3 className="text-lg font-bold text-[#123044] mb-5">Address</h3>

              <div className="relative">
                <FaMapMarkerAlt className="absolute left-4 top-4 text-[#7A929D]" />

                <textarea
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Enter your address"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-[#DCEEF2] bg-[#F8FCFD] text-[#123044] outline-none focus:border-[#0F5B78] focus:ring-2 focus:ring-[#EAF6F8] resize-none"
                />
              </div>
            </div>

            {/* ==========================================
                MEDICAL INFORMATION
            ========================================== */}
            <div>
              <h3 className="text-lg font-bold text-[#123044] mb-5">
                Medical Information
              </h3>

              <div className="relative">
                <FaNotesMedical className="absolute left-4 top-4 text-[#7A929D]" />

                <textarea
                  name="medicalInformation"
                  value={profile.medicalInformation}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Enter allergies, existing conditions, medications or other medical information..."
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-[#DCEEF2] bg-[#F8FCFD] text-[#123044] outline-none focus:border-[#0F5B78] focus:ring-2 focus:ring-[#EAF6F8] resize-none"
                />
              </div>
            </div>

            {/* ==========================================
                SAVE BUTTON
            ========================================== */}
            <div className="flex justify-end pt-5 border-t border-[#EAF1F3]">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#0F5B78] text-white font-semibold hover:bg-[#123044] transition-all duration-300 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <FaSave />

                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
