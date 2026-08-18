import { useEffect, useState } from "react";
import {
  FaHistory,
  FaCalendarAlt,
  FaUserMd,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
} from "react-icons/fa";
import axios from "axios";

function AppointmentHistory() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/appointments/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        const history = (response.data.appointments || []).filter(
          (appointment) =>
            appointment.status === "COMPLETED" ||
            appointment.status === "CANCELLED",
        );

        setAppointments(history);
      }
    } catch (err) {
      console.error("Appointment history error:", err);

      setError(
        err.response?.data?.message || "Unable to fetch appointment history.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getDoctorName = (doctor) => {
    if (!doctor) return "Doctor";

    return doctor.name || "Doctor";
  };

  return (
    <div className="min-h-screen bg-[#EAF6F8] p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#0F5B78] flex items-center justify-center">
              <FaHistory className="text-white text-xl" />
            </div>

            <div>
              <p className="text-[#4FA3B8] font-semibold text-sm uppercase tracking-widest">
                Patient
              </p>

              <h1 className="text-3xl font-bold text-[#123044]">
                Appointment History
              </h1>
            </div>
          </div>

          <p className="text-[#526675] mt-3">
            View your completed and cancelled appointments.
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600">
            {error}
          </div>
        )}

        {/* LOADING */}
        {loading ? (
          <div className="bg-white rounded-2xl shadow-sm border border-[#DCEEF2] p-12 text-center">
            <FaClock className="mx-auto text-[#0F5B78] text-3xl animate-spin" />

            <p className="text-[#526675] mt-4">
              Loading appointment history...
            </p>
          </div>
        ) : appointments.length === 0 ? (
          /* EMPTY */
          <div className="bg-white rounded-2xl shadow-sm border border-[#DCEEF2] p-12 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#EAF6F8] flex items-center justify-center">
              <FaHistory className="text-[#0F5B78] text-2xl" />
            </div>

            <h2 className="text-xl font-bold text-[#123044] mt-5">
              No Appointment History
            </h2>

            <p className="text-[#7A929D] mt-2">
              Your completed or cancelled appointments will appear here.
            </p>
          </div>
        ) : (
          /* HISTORY */
          <div className="space-y-5">
            {appointments.map((appointment) => {
              const isCompleted = appointment.status === "COMPLETED";

              return (
                <div
                  key={appointment._id}
                  className="bg-white rounded-2xl shadow-sm border border-[#DCEEF2] p-6"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                    {/* DOCTOR */}
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-[#EAF6F8] flex items-center justify-center">
                        <FaUserMd className="text-[#0F5B78] text-2xl" />
                      </div>

                      <div>
                        <h2 className="text-lg font-bold text-[#123044]">
                          {getDoctorName(appointment.doctor)}
                        </h2>

                        <p className="text-sm text-[#7A929D] mt-1">
                          {appointment.department?.name || "Medical Department"}
                        </p>
                      </div>
                    </div>

                    {/* STATUS */}
                    <div>
                      {isCompleted ? (
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-700 text-sm font-semibold">
                          <FaCheckCircle />
                          Completed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-600 text-sm font-semibold">
                          <FaTimesCircle />
                          Cancelled
                        </span>
                      )}
                    </div>
                  </div>

                  {/* DETAILS */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-5 border-t border-[#EAF1F3]">
                    <div className="flex items-center gap-3">
                      <FaCalendarAlt className="text-[#0F5B78]" />

                      <div>
                        <p className="text-xs text-[#7A929D]">
                          Appointment Date
                        </p>

                        <p className="text-sm font-semibold text-[#123044] mt-1">
                          {formatDate(appointment.appointmentDate)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <FaClock className="text-[#0F5B78]" />

                      <div>
                        <p className="text-xs text-[#7A929D]">Time Slot</p>

                        <p className="text-sm font-semibold text-[#123044] mt-1">
                          {appointment.timeSlot || "-"}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-[#7A929D]">Reason for Visit</p>

                      <p className="text-sm font-semibold text-[#123044] mt-1">
                        {appointment.reasonForVisit || "-"}
                      </p>
                    </div>
                  </div>

                  {/* CANCELLATION REASON */}
                  {appointment.status === "CANCELLED" &&
                    appointment.cancellationReason && (
                      <div className="mt-5 p-4 rounded-xl bg-red-50 border border-red-100">
                        <p className="text-xs font-semibold text-red-500 uppercase">
                          Cancellation Reason
                        </p>

                        <p className="text-sm text-red-700 mt-1">
                          {appointment.cancellationReason}
                        </p>
                      </div>
                    )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default AppointmentHistory;
