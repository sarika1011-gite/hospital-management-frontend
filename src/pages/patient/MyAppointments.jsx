import React, { useEffect, useState } from "react";
import api from "../../services/api";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);
  const [error, setError] = useState("");

  // ======================================
  // FETCH MY APPOINTMENTS
  // ======================================
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/appointments/my");

      setAppointments(response.data?.appointments || []);
    } catch (err) {
      console.error("Fetch appointments error:", err);

      setError(
        err.response?.data?.message || "Failed to fetch your appointments.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // ======================================
  // CANCEL APPOINTMENT
  // ======================================
  const handleCancelAppointment = async (appointment) => {
    if (!appointment?._id) return;

    const confirmed = window.confirm(
      "Are you sure you want to cancel this appointment?",
    );

    if (!confirmed) return;

    let cancellationReason = window.prompt(
      "Enter cancellation reason (optional):",
    );

    if (cancellationReason === null) {
      return;
    }

    try {
      setCancellingId(appointment._id);

      await api.put(`/appointments/${appointment._id}/status`, {
        status: "CANCELLED",
        cancellationReason: cancellationReason.trim(),
      });

      alert("Appointment cancelled successfully.");

      // Refresh appointments and count immediately
      await fetchAppointments();
    } catch (err) {
      console.error("Cancel appointment error:", err);

      alert(err.response?.data?.message || "Failed to cancel appointment.");
    } finally {
      setCancellingId(null);
    }
  };

  // ======================================
  // STATUS STYLE
  // ======================================
  const getStatusStyle = (status) => {
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

  // ======================================
  // FORMAT DATE
  // ======================================
  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ======================================
  // LOADING
  // ======================================
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-gray-600">Loading appointments...</p>
        </div>
      </div>
    );
  }

  // ======================================
  // PAGE
  // ======================================
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">My Appointments</h1>

          <p className="text-gray-600 mt-2">
            View and manage your appointments
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-5 rounded-lg bg-red-50 border border-red-200 p-4 text-red-700">
            {error}
          </div>
        )}

        {/* APPOINTMENT COUNT */}
        <div className="mb-6 bg-white rounded-xl shadow-sm border p-5">
          <p className="text-sm text-gray-500">Total Appointments</p>

          <p className="text-3xl font-bold text-gray-800 mt-1">
            {appointments.length}
          </p>
        </div>

        {/* NO APPOINTMENTS */}
        {appointments.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border p-10 text-center">
            <h2 className="text-xl font-semibold text-gray-700">
              No Appointments Found
            </h2>

            <p className="text-gray-500 mt-2">
              You have not booked any appointments yet.
            </p>
          </div>
        ) : (
          /* APPOINTMENT LIST */
          <div className="space-y-5">
            {appointments.map((appointment) => {
              const doctor =
                appointment.doctor?.user || appointment.doctor || {};

              const department = appointment.department?.name || "Not Assigned";

              const status = appointment.status || "BOOKED";

              const canCancel =
                status !== "CANCELLED" &&
                status !== "COMPLETED" &&
                status !== "IN_CONSULTATION" &&
                status !== "CHECKED_IN";

              return (
                <div
                  key={appointment._id}
                  className="bg-white rounded-xl shadow-sm border p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
                    {/* LEFT */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <h2 className="text-xl font-bold text-gray-800">
                          Dr.{" "}
                          {doctor.name || appointment.doctor?.name || "Doctor"}
                        </h2>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                            status,
                          )}`}
                        >
                          {status.replaceAll("_", " ")}
                        </span>
                      </div>

                      {/* DETAILS */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Department</p>

                          <p className="font-medium text-gray-800">
                            {department}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500">
                            Appointment Date
                          </p>

                          <p className="font-medium text-gray-800">
                            {formatDate(appointment.appointmentDate)}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500">Time Slot</p>

                          <p className="font-medium text-gray-800">
                            {appointment.timeSlot || "N/A"}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500">
                            Consultation Fee
                          </p>

                          <p className="font-medium text-gray-800">
                            ₹{appointment.doctor?.consultationFee || 0}
                          </p>
                        </div>

                        {appointment.reasonForVisit && (
                          <div className="md:col-span-2">
                            <p className="text-sm text-gray-500">
                              Reason for Visit
                            </p>

                            <p className="font-medium text-gray-800">
                              {appointment.reasonForVisit}
                            </p>
                          </div>
                        )}

                        {appointment.cancellationReason &&
                          status === "CANCELLED" && (
                            <div className="md:col-span-2">
                              <p className="text-sm text-gray-500">
                                Cancellation Reason
                              </p>

                              <p className="font-medium text-red-600">
                                {appointment.cancellationReason}
                              </p>
                            </div>
                          )}
                      </div>
                    </div>

                    {/* RIGHT / ACTION */}
                    <div className="flex md:flex-col gap-3 md:min-w-[150px]">
                      {canCancel && (
                        <button
                          type="button"
                          onClick={() => handleCancelAppointment(appointment)}
                          disabled={cancellingId === appointment._id}
                          className="w-full px-5 py-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                        >
                          {cancellingId === appointment._id
                            ? "Cancelling..."
                            : "Cancel Appointment"}
                        </button>
                      )}

                      {status === "CANCELLED" && (
                        <div className="text-center text-red-600 font-semibold text-sm">
                          Appointment Cancelled
                        </div>
                      )}

                      {status === "COMPLETED" && (
                        <div className="text-center text-green-600 font-semibold text-sm">
                          Appointment Completed
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
