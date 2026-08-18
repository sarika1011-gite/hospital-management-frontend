import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCalendarCheck,
  FaUserMd,
  FaClock,
  FaClipboardList,
} from "react-icons/fa";
import api from "../../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError("");

      // IMPORTANT:
      // Doctor appointments endpoint
      const response = await api.get("/appointments/doctor");

      if (response.data.success) {
        setAppointments(response.data.appointments || []);
      } else {
        setError(response.data.message || "Failed to load appointments.");
      }
    } catch (err) {
      console.error("Doctor dashboard error:", err);

      setError(
        err.response?.data?.message || "Unable to load doctor appointments.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-700";

      case "CANCELLED":
        return "bg-red-100 text-red-700";

      case "IN_CONSULTATION":
      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-700";

      case "WAITING":
      case "CHECKED_IN":
        return "bg-yellow-100 text-yellow-700";

      case "BOOKED":
      case "CONFIRMED":
      default:
        return "bg-[#EAF6F8] text-[#0F5B78]";
    }
  };

  const getPatientName = (appointment) => {
    return (
      appointment.patient?.name ||
      appointment.patientName ||
      appointment.user?.name ||
      "Unknown Patient"
    );
  };

  const getDepartmentName = (appointment) => {
    return (
      appointment.department?.name || appointment.departmentName || "General"
    );
  };

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleConsultation = (appointment) => {
    if (!appointment?._id) {
      setError("Appointment ID not found.");
      return;
    }

    navigate(`/doctor/consultation/${appointment._id}`);
  };

  const total = appointments.length;

  const completed = appointments.filter(
    (item) => item.status === "COMPLETED",
  ).length;

  const pending = appointments.filter((item) =>
    ["BOOKED", "CONFIRMED", "CHECKED_IN", "WAITING"].includes(item.status),
  ).length;

  const cancelled = appointments.filter(
    (item) => item.status === "CANCELLED",
  ).length;

  return (
    <div className="min-h-screen bg-[#F5FAFB] p-6 lg:p-8">
      {/* HEADER */}
      <div className="mb-8">
        <p className="text-[#4FA3B8] text-sm font-semibold uppercase tracking-wider">
          Doctor Panel
        </p>

        <h1 className="text-3xl font-bold text-[#123044] mt-1">
          Doctor Dashboard
        </h1>

        <p className="text-[#526675] mt-2">
          Manage your appointments and consultations.
        </p>
      </div>

      {/* ERROR */}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600">
          {error}
        </div>
      )}

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-[#DCEEF2] shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#7A929D] text-sm">Total Appointments</p>

              <h2 className="text-3xl font-bold text-[#123044] mt-2">
                {total}
              </h2>
            </div>

            <div className="w-12 h-12 rounded-xl bg-[#EAF6F8] text-[#0F5B78] flex items-center justify-center">
              <FaCalendarCheck size={21} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#DCEEF2] shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#7A929D] text-sm">Pending</p>

              <h2 className="text-3xl font-bold text-[#123044] mt-2">
                {pending}
              </h2>
            </div>

            <div className="w-12 h-12 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center">
              <FaClock size={21} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#DCEEF2] shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#7A929D] text-sm">Completed</p>

              <h2 className="text-3xl font-bold text-[#123044] mt-2">
                {completed}
              </h2>
            </div>

            <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
              <FaClipboardList size={21} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#DCEEF2] shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#7A929D] text-sm">Cancelled</p>

              <h2 className="text-3xl font-bold text-[#123044] mt-2">
                {cancelled}
              </h2>
            </div>

            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <FaCalendarCheck size={21} />
            </div>
          </div>
        </div>
      </div>

      {/* APPOINTMENTS */}
      <div className="bg-white rounded-2xl border border-[#DCEEF2] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[#E8F2F4]">
          <h2 className="text-xl font-bold text-[#123044]">My Appointments</h2>

          <p className="text-[#7A929D] mt-1">
            Your assigned patient appointments.
          </p>
        </div>

        {loading ? (
          <div className="p-10 text-center">
            <p className="text-[#526675]">Loading appointments...</p>
          </div>
        ) : appointments.length === 0 ? (
          <div className="p-10 text-center">
            <FaCalendarCheck className="mx-auto text-4xl text-[#7A929D] mb-4" />

            <h3 className="text-lg font-semibold text-[#123044]">
              No appointments found
            </h3>

            <p className="text-[#7A929D] mt-2">
              You don't have any appointments yet.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F1F8FA]">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-[#123044]">
                    Patient
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-[#123044]">
                    Department
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-[#123044]">
                    Date
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-[#123044]">
                    Time
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-[#123044]">
                    Status
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-[#123044]">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {appointments.map((appointment) => (
                  <tr
                    key={appointment._id}
                    className="border-t border-[#E8F2F4] hover:bg-[#F8FCFD]"
                  >
                    {/* PATIENT */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#EAF6F8] text-[#0F5B78] flex items-center justify-center">
                          <FaUserMd />
                        </div>

                        <div>
                          <p className="font-semibold text-[#123044]">
                            {getPatientName(appointment)}
                          </p>

                          <p className="text-xs text-[#7A929D]">Patient</p>
                        </div>
                      </div>
                    </td>

                    {/* DEPARTMENT */}
                    <td className="px-6 py-5 text-[#526675]">
                      {getDepartmentName(appointment)}
                    </td>

                    {/* DATE */}
                    <td className="px-6 py-5 text-[#526675]">
                      {formatDate(
                        appointment.appointmentDate || appointment.date,
                      )}
                    </td>

                    {/* TIME */}
                    <td className="px-6 py-5 text-[#526675]">
                      {appointment.timeSlot || appointment.time || "N/A"}
                    </td>

                    {/* STATUS */}
                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                          appointment.status,
                        )}`}
                      >
                        {appointment.status || "BOOKED"}
                      </span>
                    </td>

                    {/* ACTION */}
                    <td className="px-6 py-5">
                      {!["COMPLETED", "CANCELLED"].includes(
                        appointment.status,
                      ) ? (
                        <button
                          onClick={() => handleConsultation(appointment)}
                          className="px-4 py-2 rounded-lg bg-[#0F5B78] text-white text-sm font-semibold hover:bg-[#123044] transition"
                        >
                          Start Consultation
                        </button>
                      ) : (
                        <button
                          onClick={() => handleConsultation(appointment)}
                          className="px-4 py-2 rounded-lg border border-[#DCEEF2] text-[#0F5B78] text-sm font-semibold hover:bg-[#F1F8FA]"
                        >
                          View
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
