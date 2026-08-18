import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // ======================================
  // FETCH PATIENT APPOINTMENTS
  // ======================================
  const fetchAppointments = async () => {
    try {
      setLoading(true);

      const response = await api.get("/appointments/my");

      const data = response.data;

      setAppointments(data?.appointments || []);
    } catch (error) {
      console.error("Patient dashboard appointments error:", error);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // ======================================
  // DATE HELPERS
  // ======================================
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingAppointments = appointments.filter((appointment) => {
    if (!appointment?.appointmentDate) return false;

    const appointmentDate = new Date(appointment.appointmentDate);
    appointmentDate.setHours(0, 0, 0, 0);

    return (
      appointmentDate >= today &&
      appointment.status !== "CANCELLED" &&
      appointment.status !== "COMPLETED"
    );
  });

  const completedAppointments = appointments.filter(
    (appointment) => appointment.status === "COMPLETED",
  );

  const cancelledAppointments = appointments.filter(
    (appointment) => appointment.status === "CANCELLED",
  );

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
  // DOCTOR NAME
  // ======================================
  const getDoctorName = (appointment) => {
    if (appointment?.doctor?.name) {
      return appointment.doctor.name;
    }

    if (appointment?.doctor?.user?.name) {
      return appointment.doctor.user.name;
    }

    return "Doctor";
  };

  // ======================================
  // DEPARTMENT
  // ======================================
  const getDepartmentName = (appointment) => {
    return appointment?.department?.name || "Department";
  };

  return (
    <div className="min-h-screen bg-[#f6f9fc] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* ======================================
            HEADER
        ====================================== */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#123044]">
            Patient Dashboard
          </h1>

          <p className="text-[#526675] mt-2">
            Manage your appointments and healthcare easily.
          </p>
        </div>

        {/* ======================================
            STAT CARDS
        ====================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {/* TOTAL APPOINTMENTS */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <p className="text-sm font-medium text-gray-500">
              Total Appointments
            </p>

            <h2 className="text-3xl font-bold text-[#123044] mt-2">
              {loading ? "..." : appointments.length}
            </h2>

            <p className="text-sm text-gray-400 mt-2">All your appointments</p>
          </div>

          {/* UPCOMING */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <p className="text-sm font-medium text-gray-500">Upcoming</p>

            <h2 className="text-3xl font-bold text-blue-600 mt-2">
              {loading ? "..." : upcomingAppointments.length}
            </h2>

            <p className="text-sm text-gray-400 mt-2">Upcoming appointments</p>
          </div>

          {/* COMPLETED */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <p className="text-sm font-medium text-gray-500">Completed</p>

            <h2 className="text-3xl font-bold text-green-600 mt-2">
              {loading ? "..." : completedAppointments.length}
            </h2>

            <p className="text-sm text-gray-400 mt-2">Completed appointments</p>
          </div>

          {/* CANCELLED */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <p className="text-sm font-medium text-gray-500">Cancelled</p>

            <h2 className="text-3xl font-bold text-red-500 mt-2">
              {loading ? "..." : cancelledAppointments.length}
            </h2>

            <p className="text-sm text-gray-400 mt-2">Cancelled appointments</p>
          </div>
        </div>

        {/* ======================================
            QUICK ACTIONS
        ====================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <Link
            to="/patient/book-appointment"
            className="bg-[#123044] text-white rounded-2xl p-6 hover:shadow-lg transition"
          >
            <h3 className="text-xl font-bold">Book Appointment</h3>

            <p className="text-sm text-gray-200 mt-2">
              Book a new appointment with a doctor.
            </p>
          </Link>

          <Link
            to="/patient/appointments"
            className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition"
          >
            <h3 className="text-xl font-bold text-[#123044]">
              My Appointments
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              View and manage all your appointments.
            </p>
          </Link>

          <Link
            to="/patient/profile"
            className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition"
          >
            <h3 className="text-xl font-bold text-[#123044]">My Profile</h3>

            <p className="text-sm text-gray-500 mt-2">
              View and update your patient profile.
            </p>
          </Link>
        </div>

        {/* ======================================
            UPCOMING APPOINTMENTS
        ====================================== */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-[#123044]">
                Upcoming Appointments
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Your upcoming doctor appointments
              </p>
            </div>

            <Link
              to="/patient/appointments"
              className="text-sm font-semibold text-blue-600 hover:underline"
            >
              View All
            </Link>
          </div>

          {loading ? (
            <div className="py-10 text-center text-gray-500">
              Loading appointments...
            </div>
          ) : upcomingAppointments.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-gray-500">No Upcoming Appointments</p>

              <p className="text-sm text-gray-400 mt-2">
                You don't have any upcoming appointments.
              </p>

              <Link
                to="/patient/book-appointment"
                className="inline-block mt-4 px-5 py-2.5 bg-[#123044] text-white rounded-lg text-sm font-medium"
              >
                Book Appointment
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingAppointments.slice(0, 5).map((appointment) => (
                <div
                  key={appointment._id}
                  className="border border-gray-100 rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                  <div>
                    <h3 className="font-bold text-[#123044]">
                      {getDoctorName(appointment)}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {getDepartmentName(appointment)}
                    </p>
                  </div>

                  <div className="text-sm text-gray-600">
                    <p>
                      <span className="font-medium">Date:</span>{" "}
                      {formatDate(appointment.appointmentDate)}
                    </p>

                    <p className="mt-1">
                      <span className="font-medium">Time:</span>{" "}
                      {appointment.timeSlot || "Not specified"}
                    </p>
                  </div>

                  <span className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold w-fit">
                    {appointment.status || "BOOKED"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
