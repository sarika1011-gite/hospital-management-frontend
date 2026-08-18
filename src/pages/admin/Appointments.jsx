import { useEffect, useState } from "react";
import {
  FaCalendarCheck,
  FaSearch,
  FaEdit,
  FaTimes,
  FaBan,
} from "react-icons/fa";

import {
  getAppointments,
  updateAppointmentStatus,
} from "../../services/appointmentService";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [status, setStatus] = useState("");

  // =================================
  // FETCH APPOINTMENTS
  // =================================
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAppointments();

      if (data.success) {
        setAppointments(data.appointments || []);
      } else {
        setError(data.message || "Failed to fetch appointments.");
      }
    } catch (err) {
      console.error("Get appointments error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load appointments. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // =================================
  // SEARCH
  // =================================
  const filteredAppointments = appointments.filter((appointment) => {
    const searchText = search.toLowerCase();

    const patientName =
      appointment.patient?.name ||
      appointment.patientName ||
      appointment.user?.name ||
      "";

    const doctorName = appointment.doctor?.name || appointment.doctorName || "";

    const appointmentStatus = appointment.status || "";

    return (
      patientName.toLowerCase().includes(searchText) ||
      doctorName.toLowerCase().includes(searchText) ||
      appointmentStatus.toLowerCase().includes(searchText)
    );
  });

  // =================================
  // OPEN STATUS MODAL
  // =================================
  const handleEdit = (appointment) => {
    setSelectedAppointment(appointment);
    setStatus(appointment.status || "Booked");

    setError("");
    setSuccess("");
    setShowModal(true);
  };

  // =================================
  // UPDATE STATUS
  // =================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedAppointment) return;

    try {
      setError("");
      setSuccess("");

      const data = await updateAppointmentStatus(selectedAppointment._id, {
        status,
      });

      if (!data.success) {
        setError(data.message || "Failed to update appointment.");
        return;
      }

      setSuccess("Appointment status updated successfully.");

      setShowModal(false);
      setSelectedAppointment(null);
      setStatus("");

      await fetchAppointments();
    } catch (err) {
      console.error("Update appointment error:", err);

      setError(
        err.response?.data?.message || "Unable to update appointment status.",
      );
    }
  };

  // =================================
  // CANCEL APPOINTMENT
  // =================================
  const handleCancelAppointment = async (appointment) => {
    if (!appointment?._id) return;

    if (appointment.status === "Cancelled") {
      return;
    }

    const patientName = getPatientName(appointment);
    const doctorName = getDoctorName(appointment);

    const confirmed = window.confirm(
      `Are you sure you want to cancel this appointment?\n\nPatient: ${patientName}\nDoctor: ${doctorName}`,
    );

    if (!confirmed) return;

    try {
      setError("");
      setSuccess("");

      const data = await updateAppointmentStatus(appointment._id, {
        status: "Cancelled",
      });

      if (!data.success) {
        setError(data.message || "Failed to cancel appointment.");
        return;
      }

      setSuccess("Appointment cancelled successfully.");

      await fetchAppointments();
    } catch (err) {
      console.error("Cancel appointment error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to cancel appointment. Please try again.",
      );
    }
  };

  // =================================
  // CLOSE MODAL
  // =================================
  const closeModal = () => {
    setShowModal(false);
    setSelectedAppointment(null);
    setStatus("");
    setError("");
  };

  // =================================
  // STATUS STYLE
  // =================================
  const getStatusStyle = (appointmentStatus) => {
    switch (appointmentStatus) {
      case "Completed":
        return "bg-green-100 text-green-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      case "Checked In":
        return "bg-blue-100 text-blue-700";

      case "Waiting":
        return "bg-yellow-100 text-yellow-700";

      case "In Consultation":
        return "bg-purple-100 text-purple-700";

      case "Booked":
      default:
        return "bg-[#EAF6F8] text-[#0F5B78]";
    }
  };

  // =================================
  // FORMAT DATE
  // =================================
  const formatDate = (date) => {
    if (!date) return "N/A";

    try {
      return new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "N/A";
    }
  };

  // =================================
  // GET PATIENT NAME
  // =================================
  const getPatientName = (appointment) => {
    return (
      appointment.patient?.name ||
      appointment.patientName ||
      appointment.user?.name ||
      "Unknown Patient"
    );
  };

  // =================================
  // GET DOCTOR NAME
  // =================================
  const getDoctorName = (appointment) => {
    return (
      appointment.doctor?.name || appointment.doctorName || "Unknown Doctor"
    );
  };

  return (
    <div className="min-h-screen bg-[#F5FAFB] p-6 lg:p-8">
      {/* HEADER */}
      <div className="mb-8">
        <p className="text-[#4FA3B8] text-sm font-semibold uppercase tracking-wider">
          Admin Panel
        </p>

        <h1 className="text-3xl font-bold text-[#123044] mt-1">Appointments</h1>

        <p className="text-[#526675] mt-2">Manage hospital appointments.</p>
      </div>

      {/* SUCCESS */}
      {success && (
        <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 font-medium">
          {success}
        </div>
      )}

      {/* ERROR */}
      {error && !showModal && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 font-medium">
          {error}
        </div>
      )}

      {/* SEARCH */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#DCEEF2] p-5 mb-6">
        <div className="relative max-w-md">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A929D]" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search patient, doctor or status..."
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#DCEEF2] bg-[#F8FCFD] text-[#123044] outline-none focus:border-[#0F5B78]"
          />
        </div>
      </div>

      {/* CONTENT */}
      {loading ? (
        <div className="bg-white rounded-2xl shadow-sm border border-[#DCEEF2] p-10 text-center">
          <p className="text-[#526675]">Loading appointments...</p>
        </div>
      ) : filteredAppointments.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-[#DCEEF2] p-10 text-center">
          <FaCalendarCheck className="mx-auto text-4xl text-[#7A929D] mb-4" />

          <h2 className="text-xl font-semibold text-[#123044]">
            No appointments found
          </h2>

          <p className="text-[#526675] mt-2">
            {search
              ? "Try changing your search."
              : "No appointments are available."}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-[#DCEEF2] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F1F8FA]">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-[#123044]">
                    Patient
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-[#123044]">
                    Doctor
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
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredAppointments.map((appointment) => (
                  <tr
                    key={appointment._id}
                    className="border-t border-[#E8F2F4] hover:bg-[#F8FCFD]"
                  >
                    {/* PATIENT */}
                    <td className="px-6 py-5">
                      <p className="font-semibold text-[#123044]">
                        {getPatientName(appointment)}
                      </p>

                      <p className="text-xs text-[#7A929D] mt-1">Patient</p>
                    </td>

                    {/* DOCTOR */}
                    <td className="px-6 py-5 text-[#526675]">
                      {getDoctorName(appointment)}
                    </td>

                    {/* DATE */}
                    <td className="px-6 py-5 text-[#526675]">
                      {formatDate(
                        appointment.date || appointment.appointmentDate,
                      )}
                    </td>

                    {/* TIME */}
                    <td className="px-6 py-5 text-[#526675]">
                      {appointment.time || appointment.appointmentTime || "N/A"}
                    </td>

                    {/* STATUS */}
                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                          appointment.status,
                        )}`}
                      >
                        {appointment.status || "Booked"}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        {/* EDIT STATUS */}
                        <button
                          type="button"
                          onClick={() => handleEdit(appointment)}
                          className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100"
                          title="Update Status"
                        >
                          <FaEdit />
                        </button>

                        {/* CANCEL */}
                        {appointment.status !== "Cancelled" &&
                          appointment.status !== "Completed" && (
                            <button
                              type="button"
                              onClick={() =>
                                handleCancelAppointment(appointment)
                              }
                              className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100"
                              title="Cancel Appointment"
                            >
                              <FaBan />
                            </button>
                          )}

                        {/* ALREADY CANCELLED */}
                        {appointment.status === "Cancelled" && (
                          <span className="text-xs text-red-500 font-medium">
                            Cancelled
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* STATUS MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl">
            {/* HEADER */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8F2F4]">
              <div>
                <h2 className="text-xl font-bold text-[#123044]">
                  Update Appointment
                </h2>

                <p className="text-sm text-[#7A929D] mt-1">
                  Change appointment status.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="w-9 h-9 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200"
              >
                <FaTimes />
              </button>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                  {error}
                </div>
              )}

              {selectedAppointment && (
                <div className="bg-[#F5FAFB] rounded-xl p-4">
                  <p className="text-sm text-[#7A929D]">Patient</p>

                  <p className="font-semibold text-[#123044]">
                    {getPatientName(selectedAppointment)}
                  </p>

                  <p className="text-sm text-[#7A929D] mt-3">Doctor</p>

                  <p className="font-semibold text-[#123044]">
                    {getDoctorName(selectedAppointment)}
                  </p>
                </div>
              )}

              {/* STATUS */}
              <div>
                <label className="block text-sm font-semibold text-[#123044] mb-2">
                  Appointment Status
                </label>

                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#DCEEF2] bg-[#F8FCFD] outline-none focus:border-[#0F5B78]"
                >
                  <option value="Booked">Booked</option>

                  <option value="Checked In">Checked In</option>

                  <option value="Waiting">Waiting</option>

                  <option value="In Consultation">In Consultation</option>

                  <option value="Completed">Completed</option>

                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              {/* BUTTONS */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-3 rounded-xl border border-[#DCEEF2] text-[#526675] font-semibold hover:bg-[#F5FAFB]"
                >
                  Close
                </button>

                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-[#0F5B78] text-white font-semibold hover:bg-[#123044]"
                >
                  Update Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Appointments;
