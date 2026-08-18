import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaCalendarCheck,
  FaUser,
  FaClock,
  FaStethoscope,
} from "react-icons/fa";
import toast from "react-hot-toast";

const API_URL = "http://localhost:5000/api";

const DoctorAppointments = () => {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const getToken = () => {
    return localStorage.getItem("token") || localStorage.getItem("accessToken");
  };

  const fetchAppointments = async () => {
    try {
      setLoading(true);

      const token = getToken();

      if (!token) {
        toast.error("Please login again");
        navigate("/login");
        return;
      }

      const response = await axios.get(`${API_URL}/appointments/my`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;

      const appointmentList = data?.appointments || data?.data || [];

      setAppointments(Array.isArray(appointmentList) ? appointmentList : []);
    } catch (error) {
      console.error("Doctor appointments error:", error);

      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
      } else if (error.response?.status === 403) {
        toast.error("You are not authorized.");
      } else {
        toast.error(
          error.response?.data?.message || "Failed to load appointments",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (time) => {
    if (!time) return "N/A";

    if (typeof time === "string" && time.includes(":")) {
      return time;
    }

    return new Date(time).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getPatientName = (appointment) => {
    if (appointment.patient?.name) {
      return appointment.patient.name;
    }

    if (appointment.patient?.firstName) {
      return `${appointment.patient.firstName} ${
        appointment.patient.lastName || ""
      }`;
    }

    if (appointment.patientName) {
      return appointment.patientName;
    }

    return "Patient";
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "BOOKED":
        return "bg-blue-100 text-blue-700";

      case "CHECKED_IN":
        return "bg-yellow-100 text-yellow-700";

      case "WAITING":
        return "bg-orange-100 text-orange-700";

      case "IN_CONSULTATION":
        return "bg-purple-100 text-purple-700";

      case "COMPLETED":
        return "bg-green-100 text-green-700";

      case "CANCELLED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const openConsultation = (appointmentId) => {
    navigate(`/doctor/consultation/${appointmentId}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">My Appointments</h1>

        <p className="mt-1 text-sm text-slate-500">
          View and manage your scheduled patient appointments
        </p>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-cyan-600"></div>
        </div>
      ) : appointments.length === 0 ? (
        /* EMPTY */
        <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
          <FaCalendarCheck className="mx-auto mb-4 text-5xl text-slate-300" />

          <h2 className="text-lg font-semibold text-slate-700">
            No appointments found
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            You don't have any appointments yet.
          </p>
        </div>
      ) : (
        /* APPOINTMENT LIST */
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {appointments.map((appointment) => {
            const appointmentId = appointment._id || appointment.id;

            return (
              <div
                key={appointmentId}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                {/* TOP */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-50 text-cyan-600">
                      <FaUser />
                    </div>

                    <div>
                      <h2 className="font-semibold text-slate-800">
                        {getPatientName(appointment)}
                      </h2>

                      <p className="text-sm text-slate-500">Patient</p>
                    </div>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                      appointment.status,
                    )}`}
                  >
                    {appointment.status || "BOOKED"}
                  </span>
                </div>

                {/* DETAILS */}
                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                    <FaCalendarCheck className="text-cyan-600" />

                    <div>
                      <p className="text-xs text-slate-400">Date</p>

                      <p className="text-sm font-medium text-slate-700">
                        {formatDate(
                          appointment.date || appointment.appointmentDate,
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                    <FaClock className="text-cyan-600" />

                    <div>
                      <p className="text-xs text-slate-400">Time</p>

                      <p className="text-sm font-medium text-slate-700">
                        {formatTime(
                          appointment.time || appointment.appointmentTime,
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* REASON */}
                {(appointment.reason ||
                  appointment.symptoms ||
                  appointment.problem) && (
                  <div className="mt-4 rounded-xl bg-slate-50 p-3">
                    <p className="text-xs text-slate-400">Reason</p>

                    <p className="mt-1 text-sm text-slate-700">
                      {appointment.reason ||
                        appointment.symptoms ||
                        appointment.problem}
                    </p>
                  </div>
                )}

                {/* ACTIONS */}
                <div className="mt-5 flex gap-3">
                  <button
                    onClick={() => openConsultation(appointmentId)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-cyan-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700"
                  >
                    <FaStethoscope />
                    Consultation
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DoctorAppointments;
