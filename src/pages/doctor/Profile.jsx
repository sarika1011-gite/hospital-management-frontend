import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUserMd,
  FaEnvelope,
  FaPhone,
  FaStethoscope,
  FaBuilding,
} from "react-icons/fa";
import { toast } from "react-hot-toast";

const Profile = () => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          "http://localhost:5000/api/doctors/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setDoctor(response.data?.doctor || response.data);
      } catch (error) {
        console.error("Doctor profile error:", error);

        toast.error(
          error.response?.data?.message || "Failed to load doctor profile",
        );
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
      toast.error("Please login again");
    }
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-gray-500">Loading profile...</div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-8 text-center">
        <p className="text-gray-500">Unable to load doctor profile.</p>
      </div>
    );
  }

  const doctorName =
    doctor.name ||
    `${doctor.firstName || ""} ${doctor.lastName || ""}`.trim() ||
    "Doctor";

  const specialization =
    doctor.specialization || doctor.speciality || "Not available";

  const phone =
    doctor.phone || doctor.mobile || doctor.contactNumber || "Not available";

  const department =
    doctor.department?.name ||
    doctor.department?.departmentName ||
    doctor.department ||
    "Not available";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>

        <p className="text-gray-500 mt-1">
          View your doctor profile information
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Top Section */}
        <div className="bg-[#0f172a] px-6 py-8">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-cyan-500 flex items-center justify-center text-white text-3xl">
              <FaUserMd />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">
                Dr. {doctorName}
              </h2>

              <p className="text-cyan-300 mt-1">{specialization}</p>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center">
                <FaEnvelope />
              </div>

              <div>
                <p className="text-sm text-gray-500">Email</p>

                <p className="font-medium text-gray-800 mt-1">
                  {doctor.email || "Not available"}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center">
                <FaPhone />
              </div>

              <div>
                <p className="text-sm text-gray-500">Phone</p>

                <p className="font-medium text-gray-800 mt-1">{phone}</p>
              </div>
            </div>

            {/* Specialization */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center">
                <FaStethoscope />
              </div>

              <div>
                <p className="text-sm text-gray-500">Specialization</p>

                <p className="font-medium text-gray-800 mt-1">
                  {specialization}
                </p>
              </div>
            </div>

            {/* Department */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center">
                <FaBuilding />
              </div>

              <div>
                <p className="text-sm text-gray-500">Department</p>

                <p className="font-medium text-gray-800 mt-1">{department}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
