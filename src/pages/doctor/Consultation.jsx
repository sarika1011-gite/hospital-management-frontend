import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaUserMd,
  FaCalendarCheck,
  FaStethoscope,
  FaPrescriptionBottleAlt,
  FaCheckCircle,
  FaArrowLeft,
} from "react-icons/fa";

import {
  getConsultation,
  startConsultation,
  completeConsultation,
} from "../../services/consultationService";

function Consultation() {
  const { appointmentId } = useParams();
  const navigate = useNavigate();

  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ======================================
  // LOAD CONSULTATION
  // ======================================
  const loadConsultation = async () => {
    if (!appointmentId) {
      setLoading(false);
      setError("Appointment ID is missing.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await getConsultation(appointmentId);

      if (data?.success) {
        setAppointment(data.consultation);
      } else {
        setError(data?.message || "Failed to load consultation.");
      }
    } catch (err) {
      console.error("Get consultation error:", err);

      setError(
        err.response?.data?.message ||
          "Failed to load consultation. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConsultation();
  }, [appointmentId]);

  // ======================================
  // START CONSULTATION
  // ======================================
  const handleStart = async () => {
    if (!appointmentId) return;

    try {
      setActionLoading(true);
      setError("");
      setSuccess("");

      const data = await startConsultation(appointmentId);

      if (data?.success) {
        setAppointment(data.appointment);
        setSuccess("Consultation started successfully.");
      } else {
        setError(data?.message || "Failed to start consultation.");
      }
    } catch (err) {
      console.error("Start consultation error:", err);

      setError(err.response?.data?.message || "Failed to start consultation.");
    } finally {
      setActionLoading(false);
    }
  };

  // ======================================
  // COMPLETE CONSULTATION
  // ======================================
  const handleComplete = async () => {
    if (!appointmentId) return;

    try {
      setActionLoading(true);
      setError("");
      setSuccess("");

      const data = await completeConsultation(appointmentId);

      if (data?.success) {
        setAppointment(data.appointment);
        setSuccess("Consultation completed successfully.");
      } else {
        setError(data?.message || "Failed to complete consultation.");
      }
    } catch (err) {
      console.error("Complete consultation error:", err);

      setError(
        err.response?.data?.message || "Failed to complete consultation.",
      );
    } finally {
      setActionLoading(false);
    }
  };

  // ======================================
  // LOADING
  // ======================================
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5FAFB] flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full border-4 border-[#DCEEF2] border-t-[#0F5B78] animate-spin"></div>

          <p className="text-[#526675] font-medium">Loading consultation...</p>
        </div>
      </div>
    );
  }

  // ======================================
  // ERROR / NOT FOUND
  // ======================================
  if (!appointment) {
    return (
      <div className="min-h-screen bg-[#F5FAFB] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-sm border border-[#DCEEF2] p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-red-50 text-red-500 flex items-center justify-center text-2xl mb-5">
            !
          </div>

          <h2 className="text-xl font-bold text-[#123044]">
            Consultation Not Found
          </h2>

          <p className="text-[#526675] mt-2">
            {error || "Unable to load consultation details."}
          </p>

          <button
            onClick={() => navigate(-1)}
            className="mt-6 px-6 py-3 rounded-xl bg-[#0F5B78] text-white font-semibold hover:bg-[#123044] transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const patient = appointment.patient;
  const doctor = appointment.doctor;
  const department = appointment.department;

  const status = appointment.status || "BOOKED";

  const isCompleted = status === "COMPLETED";

  const isInConsultation = status === "IN_CONSULTATION";

  const canStart = ["BOOKED", "CHECKED_IN", "WAITING"].includes(status);

  // ======================================
  // STATUS STYLE
  // ======================================
  const getStatusStyle = () => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-700";

      case "IN_CONSULTATION":
        return "bg-blue-100 text-blue-700";

      case "CANCELLED":
        return "bg-red-100 text-red-700";

      case "CHECKED_IN":
      case "WAITING":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-[#EAF6F8] text-[#0F5B78]";
    }
  };

  // ======================================
  // DATE
  // ======================================
  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#F5FAFB] p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#0F5B78] font-semibold mb-5 hover:text-[#123044]"
          >
            <FaArrowLeft />
            Back
          </button>

          <div className="bg-white rounded-2xl border border-[#DCEEF2] shadow-sm p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-[#4FA3B8] text-sm font-semibold uppercase tracking-wider">
                  Doctor Panel
                </p>

                <h1 className="text-3xl font-bold text-[#123044] mt-1">
                  Consultation
                </h1>

                <p className="text-[#7A929D] mt-2">
                  Appointment ID: {appointment._id}
                </p>
              </div>

              <span
                className={`inline-flex w-fit px-4 py-2 rounded-full text-sm font-semibold ${getStatusStyle()}`}
              >
                {status.replaceAll("_", " ")}
              </span>
            </div>
          </div>
        </div>

        {/* SUCCESS */}
        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 flex items-center gap-3">
            <FaCheckCircle />
            {success}
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4">
            {error}
          </div>
        )}

        {/* DETAILS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* PATIENT */}
          <div className="bg-white rounded-2xl border border-[#DCEEF2] shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#EAF6F8] text-[#0F5B78] flex items-center justify-center">
                <FaUserMd size={22} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#123044]">
                  Patient Details
                </h2>

                <p className="text-sm text-[#7A929D]">Patient information</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs text-[#7A929D] uppercase font-semibold">
                  Name
                </p>

                <p className="text-[#123044] font-semibold mt-1">
                  {patient?.name || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-xs text-[#7A929D] uppercase font-semibold">
                  Email
                </p>

                <p className="text-[#526675] mt-1">{patient?.email || "N/A"}</p>
              </div>

              <div>
                <p className="text-xs text-[#7A929D] uppercase font-semibold">
                  Phone
                </p>

                <p className="text-[#526675] mt-1">{patient?.phone || "N/A"}</p>
              </div>

              <div>
                <p className="text-xs text-[#7A929D] uppercase font-semibold">
                  Gender
                </p>

                <p className="text-[#526675] mt-1">
                  {patient?.gender || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* APPOINTMENT */}
          <div className="bg-white rounded-2xl border border-[#DCEEF2] shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#EAF6F8] text-[#0F5B78] flex items-center justify-center">
                <FaCalendarCheck size={22} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#123044]">
                  Appointment Details
                </h2>

                <p className="text-sm text-[#7A929D]">
                  Appointment information
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs text-[#7A929D] uppercase font-semibold">
                  Doctor
                </p>

                <p className="text-[#123044] font-semibold mt-1">
                  {doctor?.name || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-xs text-[#7A929D] uppercase font-semibold">
                  Department
                </p>

                <p className="text-[#526675] mt-1">
                  {department?.name || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-xs text-[#7A929D] uppercase font-semibold">
                  Date
                </p>

                <p className="text-[#526675] mt-1">
                  {formatDate(appointment.appointmentDate || appointment.date)}
                </p>
              </div>

              <div>
                <p className="text-xs text-[#7A929D] uppercase font-semibold">
                  Time
                </p>

                <p className="text-[#526675] mt-1">
                  {appointment.timeSlot || appointment.time || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CONSULTATION ACTIONS */}
        <div className="bg-white rounded-2xl border border-[#DCEEF2] shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#EAF6F8] text-[#0F5B78] flex items-center justify-center">
              <FaStethoscope size={22} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#123044]">
                Consultation Actions
              </h2>

              <p className="text-sm text-[#7A929D]">
                Manage this patient consultation.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            {/* START */}
            {canStart && (
              <button
                onClick={handleStart}
                disabled={actionLoading}
                className="px-6 py-3 rounded-xl bg-[#0F5B78] text-white font-semibold hover:bg-[#123044] transition disabled:opacity-50"
              >
                {actionLoading ? "Starting..." : "Start Consultation"}
              </button>
            )}

            {/* PRESCRIPTION */}
            {(isInConsultation || isCompleted) && (
              <button
                onClick={() =>
                  navigate(`/doctor/prescriptions/${appointment._id}`)
                }
                className="px-6 py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition flex items-center gap-2"
              >
                <FaPrescriptionBottleAlt />
                {isCompleted ? "View Prescription" : "Give Prescription"}
              </button>
            )}

            {/* COMPLETE */}
            {isInConsultation && (
              <button
                onClick={handleComplete}
                disabled={actionLoading}
                className="px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition disabled:opacity-50 flex items-center gap-2"
              >
                <FaCheckCircle />

                {actionLoading ? "Completing..." : "Complete Consultation"}
              </button>
            )}
          </div>

          {/* COMPLETED MESSAGE */}
          {isCompleted && (
            <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4 text-green-700 flex items-center gap-3">
              <FaCheckCircle />

              <div>
                <p className="font-semibold">
                  Consultation completed successfully.
                </p>

                <p className="text-sm mt-1">
                  You can view or manage the patient's prescription.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Consultation;
