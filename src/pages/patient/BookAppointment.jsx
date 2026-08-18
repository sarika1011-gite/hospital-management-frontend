import { useEffect, useState } from "react";
import { FaCalendarCheck, FaUserMd, FaBuilding } from "react-icons/fa";

import { getDoctors } from "../../services/doctorService";
import { getDepartments } from "../../services/departmentService";
import { createAppointment } from "../../services/appointmentService";

function BookAppointment() {
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [formData, setFormData] = useState({
    doctor: "",
    department: "",
    appointmentDate: "",
    timeSlot: "",
    reasonForVisit: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ==========================================
  // LOAD DOCTORS & DEPARTMENTS
  // ==========================================
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError("");

        const [doctorData, departmentData] = await Promise.all([
          getDoctors(),
          getDepartments(),
        ]);

        console.log("DOCTORS:", doctorData);
        console.log("DEPARTMENTS:", departmentData);

        if (doctorData?.success) {
          setDoctors(doctorData.doctors || []);
        }

        if (departmentData?.success) {
          setDepartments(departmentData.departments || []);
        }
      } catch (err) {
        console.error("Load booking data error:", err);
        console.error("LOAD RESPONSE:", err.response?.data);

        setError(
          err.response?.data?.message ||
            "Unable to load doctors and departments.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // ==========================================
  // FORM CHANGE
  // ==========================================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setError("");
    setSuccess("");

    if (name === "department") {
      setFormData((prev) => ({
        ...prev,
        department: value,
        doctor: "",
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // SUBMIT
  // ==========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.department) {
      setError("Please select a department.");
      return;
    }

    if (!formData.doctor) {
      setError("Please select a doctor.");
      return;
    }

    if (!formData.appointmentDate) {
      setError("Please select appointment date.");
      return;
    }

    if (!formData.timeSlot) {
      setError("Please select a time slot.");
      return;
    }

    if (!formData.reasonForVisit.trim()) {
      setError("Please enter reason for visit.");
      return;
    }

    const appointmentPayload = {
      doctor: formData.doctor,
      department: formData.department,
      appointmentDate: formData.appointmentDate,
      timeSlot: formData.timeSlot,
      reasonForVisit: formData.reasonForVisit.trim(),
    };

    console.log("BOOKING PAYLOAD:", appointmentPayload);

    try {
      setSaving(true);

      const data = await createAppointment(appointmentPayload);

      console.log("BOOKING RESPONSE:", data);

      if (!data?.success) {
        setError(data?.message || "Failed to book appointment.");
        return;
      }

      setSuccess(data.message || "Appointment booked successfully.");

      setFormData({
        doctor: "",
        department: "",
        appointmentDate: "",
        timeSlot: "",
        reasonForVisit: "",
      });
    } catch (err) {
      console.error("BOOK APPOINTMENT ERROR:", err);
      console.error("STATUS:", err.response?.status);
      console.error("BACKEND RESPONSE:", err.response?.data);

      setError(
        err.response?.data?.message ||
          "Unable to book appointment. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // FILTER DOCTORS BY SELECTED DEPARTMENT
  // ==========================================
  const filteredDoctors = doctors.filter((doctor) => {
    const doctorDepartmentId =
      doctor.department?._id || doctor.department?.id || doctor.department;

    return (
      String(doctorDepartmentId) === String(formData.department) &&
      doctor.isActive !== false &&
      doctor.isAvailable !== false
    );
  });

  // ==========================================
  // TODAY
  // ==========================================
  const today = new Date().toISOString().split("T")[0];

  // ==========================================
  // UI
  // ==========================================
  return (
    <div className="min-h-screen bg-[#F5FAFB] p-6 lg:p-8">
      {/* HEADER */}
      <div className="mb-8">
        <p className="text-[#4FA3B8] text-sm font-semibold uppercase tracking-wider">
          Patient Panel
        </p>

        <h1 className="text-3xl font-bold text-[#123044] mt-1">
          Book Appointment
        </h1>

        <p className="text-[#526675] mt-2">
          Select a department, doctor and preferred appointment time.
        </p>
      </div>

      {/* SUCCESS */}
      {success && (
        <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 font-medium">
          {success}
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 font-medium">
          {error}
        </div>
      )}

      {/* LOADING */}
      {loading ? (
        <div className="bg-white rounded-2xl shadow-sm border border-[#DCEEF2] p-10 text-center">
          <p className="text-[#526675]">Loading appointment details...</p>
        </div>
      ) : (
        <div className="max-w-4xl bg-white rounded-3xl shadow-sm border border-[#DCEEF2] overflow-hidden">
          {/* CARD HEADER */}
          <div className="bg-[#F1F8FA] p-6 border-b border-[#DCEEF2]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#EAF6F8] flex items-center justify-center">
                <FaCalendarCheck className="text-[#0F5B78] text-xl" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#123044]">
                  Appointment Details
                </h2>

                <p className="text-sm text-[#7A929D] mt-1">
                  Please provide the required information.
                </p>
              </div>
            </div>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* DEPARTMENT */}
              <div>
                <label className="block text-sm font-semibold text-[#123044] mb-2">
                  <span className="flex items-center gap-2">
                    <FaBuilding className="text-[#0F5B78]" />
                    Department
                  </span>
                </label>

                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[#DCEEF2] bg-[#F8FCFD] text-[#123044] outline-none focus:border-[#0F5B78]"
                >
                  <option value="">Select Department</option>

                  {departments.map((department) => (
                    <option key={department._id} value={department._id}>
                      {department.name}
                    </option>
                  ))}
                </select>

                {departments.length === 0 && (
                  <p className="text-sm text-red-500 mt-2">
                    No departments available.
                  </p>
                )}
              </div>

              {/* DOCTOR */}
              <div>
                <label className="block text-sm font-semibold text-[#123044] mb-2">
                  <span className="flex items-center gap-2">
                    <FaUserMd className="text-[#0F5B78]" />
                    Doctor
                  </span>
                </label>

                <select
                  name="doctor"
                  value={formData.doctor}
                  onChange={handleChange}
                  required
                  disabled={!formData.department}
                  className="w-full px-4 py-3 rounded-xl border border-[#DCEEF2] bg-[#F8FCFD] text-[#123044] outline-none focus:border-[#0F5B78] disabled:opacity-60"
                >
                  <option value="">
                    {formData.department
                      ? "Select Doctor"
                      : "Select Department First"}
                  </option>

                  {filteredDoctors.map((doctor) => (
                    <option key={doctor._id} value={doctor._id}>
                      {doctor.name}
                      {doctor.specialization
                        ? ` — ${doctor.specialization}`
                        : ""}
                    </option>
                  ))}
                </select>

                {formData.department && filteredDoctors.length === 0 && (
                  <p className="text-sm text-red-500 mt-2">
                    No available doctors in this department.
                  </p>
                )}
              </div>

              {/* DATE */}
              <div>
                <label className="block text-sm font-semibold text-[#123044] mb-2">
                  Appointment Date
                </label>

                <input
                  type="date"
                  name="appointmentDate"
                  value={formData.appointmentDate}
                  min={today}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[#DCEEF2] bg-[#F8FCFD] text-[#123044] outline-none focus:border-[#0F5B78]"
                />
              </div>

              {/* TIME SLOT */}
              <div>
                <label className="block text-sm font-semibold text-[#123044] mb-2">
                  Time Slot
                </label>

                <select
                  name="timeSlot"
                  value={formData.timeSlot}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[#DCEEF2] bg-[#F8FCFD] text-[#123044] outline-none focus:border-[#0F5B78]"
                >
                  <option value="">Select Time Slot</option>

                  <option value="10:00 AM - 10:30 AM">
                    10:00 AM - 10:30 AM
                  </option>

                  <option value="10:30 AM - 11:00 AM">
                    10:30 AM - 11:00 AM
                  </option>

                  <option value="11:00 AM - 11:30 AM">
                    11:00 AM - 11:30 AM
                  </option>

                  <option value="11:30 AM - 12:00 PM">
                    11:30 AM - 12:00 PM
                  </option>

                  <option value="12:00 PM - 12:30 PM">
                    12:00 PM - 12:30 PM
                  </option>

                  <option value="12:30 PM - 1:00 PM">12:30 PM - 1:00 PM</option>

                  <option value="4:00 PM - 4:30 PM">4:00 PM - 4:30 PM</option>

                  <option value="4:30 PM - 5:00 PM">4:30 PM - 5:00 PM</option>

                  <option value="5:00 PM - 5:30 PM">5:00 PM - 5:30 PM</option>

                  <option value="5:30 PM - 6:00 PM">5:30 PM - 6:00 PM</option>
                </select>
              </div>
            </div>

            {/* REASON */}
            <div>
              <label className="block text-sm font-semibold text-[#123044] mb-2">
                Reason for Visit
              </label>

              <textarea
                name="reasonForVisit"
                value={formData.reasonForVisit}
                onChange={handleChange}
                rows="4"
                maxLength="500"
                required
                placeholder="Briefly describe your reason for visiting the doctor..."
                className="w-full px-4 py-3 rounded-xl border border-[#DCEEF2] bg-[#F8FCFD] text-[#123044] outline-none focus:border-[#0F5B78] resize-none"
              />

              <p className="text-xs text-[#7A929D] mt-1 text-right">
                {formData.reasonForVisit.length}/500
              </p>
            </div>

            {/* BUTTON */}
            <div className="flex justify-end pt-4 border-t border-[#E8F2F4]">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0F5B78] text-white font-semibold hover:bg-[#123044] disabled:opacity-60 disabled:cursor-not-allowed transition"
              >
                <FaCalendarCheck />

                {saving ? "Booking..." : "Book Appointment"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default BookAppointment;
