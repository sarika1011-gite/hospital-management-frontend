import React, { useEffect, useState } from "react";
import {
  getAppointmentReport,
  getDoctorReport,
  getDepartmentReport,
  getDailyAppointmentReport,
} from "../../services/reportService";

const Reports = () => {
  const [activeTab, setActiveTab] = useState("appointments");

  const [appointmentReport, setAppointmentReport] = useState(null);
  const [doctorReport, setDoctorReport] = useState([]);
  const [departmentReport, setDepartmentReport] = useState([]);
  const [dailyReport, setDailyReport] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    status: "",
  });

  const [dailyDate, setDailyDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  useEffect(() => {
    loadReport(activeTab);
  }, [activeTab]);

  const loadReport = async (tab = activeTab) => {
    try {
      setLoading(true);
      setError("");

      if (tab === "appointments") {
        const data = await getAppointmentReport(filters);

        if (data.success) {
          setAppointmentReport(data);
        } else {
          setError(data.message || "Failed to load appointment report.");
        }
      }

      if (tab === "doctors") {
        const data = await getDoctorReport();

        if (data.success) {
          setDoctorReport(data.report || []);
        } else {
          setError(data.message || "Failed to load doctor report.");
        }
      }

      if (tab === "departments") {
        const data = await getDepartmentReport();

        if (data.success) {
          setDepartmentReport(data.report || []);
        } else {
          setError(data.message || "Failed to load department report.");
        }
      }

      if (tab === "daily") {
        const data = await getDailyAppointmentReport(dailyDate);

        if (data.success) {
          setDailyReport(data);
        } else {
          setError(data.message || "Failed to load daily report.");
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load report.");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilters((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleAppointmentFilter = async (e) => {
    e.preventDefault();
    await loadReport("appointments");
  };

  const clearFilters = async () => {
    const emptyFilters = {
      startDate: "",
      endDate: "",
      status: "",
    };

    setFilters(emptyFilters);

    try {
      setLoading(true);
      setError("");

      const data = await getAppointmentReport(emptyFilters);

      if (data.success) {
        setAppointmentReport(data);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load appointment report.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDailyReport = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const data = await getDailyAppointmentReport(dailyDate);

      if (data.success) {
        setDailyReport(data);
      } else {
        setError(data.message || "Failed to load daily report.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load daily report.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString();
  };

  const statusClass = (status) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-700";
      case "CANCELLED":
        return "bg-red-100 text-red-700";
      case "IN_CONSULTATION":
        return "bg-blue-100 text-blue-700";
      case "CHECKED_IN":
        return "bg-purple-100 text-purple-700";
      case "WAITING":
        return "bg-yellow-100 text-yellow-700";
      case "BOOKED":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Reports</h1>

          <p className="text-gray-500 mt-1">
            View appointment, doctor, department and daily reports.
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm p-2 mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab("appointments")}
            className={`px-5 py-3 rounded-xl font-medium ${
              activeTab === "appointments"
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Appointment Report
          </button>

          <button
            onClick={() => setActiveTab("doctors")}
            className={`px-5 py-3 rounded-xl font-medium ${
              activeTab === "doctors"
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Doctor-wise
          </button>

          <button
            onClick={() => setActiveTab("departments")}
            className={`px-5 py-3 rounded-xl font-medium ${
              activeTab === "departments"
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Department-wise
          </button>

          <button
            onClick={() => setActiveTab("daily")}
            className={`px-5 py-3 rounded-xl font-medium ${
              activeTab === "daily"
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Daily Report
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 text-center">
            <p className="text-gray-600">Loading report...</p>
          </div>
        )}

        {/* =====================================
            APPOINTMENT REPORT
        ====================================== */}
        {activeTab === "appointments" && (
          <>
            <form
              onSubmit={handleAppointmentFilter}
              className="bg-white rounded-2xl shadow-sm p-6 mb-6"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Filters
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Start Date
                  </label>

                  <input
                    type="date"
                    name="startDate"
                    value={filters.startDate}
                    onChange={handleFilterChange}
                    className="w-full border border-gray-300 rounded-lg p-3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    End Date
                  </label>

                  <input
                    type="date"
                    name="endDate"
                    value={filters.endDate}
                    onChange={handleFilterChange}
                    className="w-full border border-gray-300 rounded-lg p-3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Status
                  </label>

                  <select
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                    className="w-full border border-gray-300 rounded-lg p-3"
                  >
                    <option value="">All Status</option>
                    <option value="BOOKED">Booked</option>
                    <option value="CHECKED_IN">Checked In</option>
                    <option value="WAITING">Waiting</option>
                    <option value="IN_CONSULTATION">In Consultation</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </div>

                <div className="flex items-end gap-2">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Apply
                  </button>

                  <button
                    type="button"
                    onClick={clearFilters}
                    className="px-4 py-3 rounded-lg border border-gray-300"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </form>

            {appointmentReport && (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
                  {[
                    ["Total", appointmentReport.report?.total],
                    ["Booked", appointmentReport.report?.booked],
                    ["Checked In", appointmentReport.report?.checkedIn],
                    ["Waiting", appointmentReport.report?.waiting],
                    ["Consultation", appointmentReport.report?.inConsultation],
                    ["Completed", appointmentReport.report?.completed],
                    ["Cancelled", appointmentReport.report?.cancelled],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="bg-white rounded-xl shadow-sm p-4"
                    >
                      <p className="text-xs text-gray-500">{label}</p>

                      <p className="text-2xl font-bold text-gray-800 mt-1">
                        {value || 0}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Appointments
                  </h2>

                  {appointmentReport.appointments?.length === 0 ? (
                    <p className="text-gray-500">No appointments found.</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-3">Patient</th>
                            <th className="text-left p-3">Doctor</th>
                            <th className="text-left p-3">Department</th>
                            <th className="text-left p-3">Date</th>
                            <th className="text-left p-3">Time</th>
                            <th className="text-left p-3">Status</th>
                          </tr>
                        </thead>

                        <tbody>
                          {appointmentReport.appointments.map((appointment) => (
                            <tr
                              key={appointment._id}
                              className="border-b hover:bg-gray-50"
                            >
                              <td className="p-3">
                                {appointment.patient?.name || "N/A"}
                              </td>

                              <td className="p-3">
                                {appointment.doctor?.name || "N/A"}
                              </td>

                              <td className="p-3">
                                {appointment.department?.name || "N/A"}
                              </td>

                              <td className="p-3">
                                {formatDate(appointment.appointmentDate)}
                              </td>

                              <td className="p-3">
                                {appointment.timeSlot || "N/A"}
                              </td>

                              <td className="p-3">
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-semibold ${statusClass(
                                    appointment.status,
                                  )}`}
                                >
                                  {appointment.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </>
            )}
          </>
        )}

        {/* =====================================
            DOCTOR REPORT
        ====================================== */}
        {activeTab === "doctors" && (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Doctor-wise Report
            </h2>

            {doctorReport.length === 0 ? (
              <p className="text-gray-500">No doctor report available.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Doctor</th>
                      <th className="text-left p-3">Department</th>
                      <th className="text-left p-3">Total</th>
                      <th className="text-left p-3">Booked</th>
                      <th className="text-left p-3">Completed</th>
                      <th className="text-left p-3">Cancelled</th>
                    </tr>
                  </thead>

                  <tbody>
                    {doctorReport.map((item) => (
                      <tr
                        key={item.doctorId}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="p-3 font-medium">{item.doctorName}</td>

                        <td className="p-3">{item.department}</td>

                        <td className="p-3">{item.totalAppointments}</td>

                        <td className="p-3">{item.booked}</td>

                        <td className="p-3 text-green-600 font-medium">
                          {item.completed}
                        </td>

                        <td className="p-3 text-red-600 font-medium">
                          {item.cancelled}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* =====================================
            DEPARTMENT REPORT
        ====================================== */}
        {activeTab === "departments" && (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Department-wise Report
            </h2>

            {departmentReport.length === 0 ? (
              <p className="text-gray-500">No department report available.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Department</th>
                      <th className="text-left p-3">Total</th>
                      <th className="text-left p-3">Booked</th>
                      <th className="text-left p-3">Completed</th>
                      <th className="text-left p-3">Cancelled</th>
                    </tr>
                  </thead>

                  <tbody>
                    {departmentReport.map((item) => (
                      <tr
                        key={item.departmentId}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="p-3 font-medium">
                          {item.departmentName}
                        </td>

                        <td className="p-3">{item.totalAppointments}</td>

                        <td className="p-3">{item.booked}</td>

                        <td className="p-3 text-green-600 font-medium">
                          {item.completed}
                        </td>

                        <td className="p-3 text-red-600 font-medium">
                          {item.cancelled}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* =====================================
            DAILY REPORT
        ====================================== */}
        {activeTab === "daily" && (
          <>
            <form
              onSubmit={handleDailyReport}
              className="bg-white rounded-2xl shadow-sm p-6 mb-6"
            >
              <div className="flex flex-col md:flex-row gap-4 md:items-end">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Select Date
                  </label>

                  <input
                    type="date"
                    value={dailyDate}
                    onChange={(e) => setDailyDate(e.target.value)}
                    className="border border-gray-300 rounded-lg p-3"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  Generate Report
                </button>
              </div>
            </form>

            {dailyReport && (
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-5">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Daily Appointment Report
                  </h2>

                  <span className="font-medium text-gray-600">
                    {dailyReport.date}
                  </span>
                </div>

                <div className="bg-blue-50 rounded-xl p-4 mb-6">
                  <p className="text-sm text-blue-600">Total Appointments</p>

                  <p className="text-3xl font-bold text-blue-700">
                    {dailyReport.total || 0}
                  </p>
                </div>

                {dailyReport.appointments?.length === 0 ? (
                  <p className="text-gray-500">
                    No appointments for this date.
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3">Patient</th>
                          <th className="text-left p-3">Doctor</th>
                          <th className="text-left p-3">Department</th>
                          <th className="text-left p-3">Time</th>
                          <th className="text-left p-3">Status</th>
                        </tr>
                      </thead>

                      <tbody>
                        {dailyReport.appointments.map((appointment) => (
                          <tr
                            key={appointment._id}
                            className="border-b hover:bg-gray-50"
                          >
                            <td className="p-3">
                              {appointment.patient?.name || "N/A"}
                            </td>

                            <td className="p-3">
                              {appointment.doctor?.name || "N/A"}
                            </td>

                            <td className="p-3">
                              {appointment.department?.name || "N/A"}
                            </td>

                            <td className="p-3">
                              {appointment.timeSlot || "N/A"}
                            </td>

                            <td className="p-3">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${statusClass(
                                  appointment.status,
                                )}`}
                              >
                                {appointment.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Reports;
