import { useEffect, useState } from "react";
import {
  FaUserMd,
  FaSearch,
  FaPlus,
  FaTimes,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

import {
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from "../../services/doctorService";

import { getDepartments } from "../../services/departmentService";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    qualification: "",
    experience: "",
    department: "",
    consultationFee: "",
    availableDays: [],
    availableTime: "",
  });

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // ===============================
  // FETCH DOCTORS
  // ===============================
  const fetchDoctors = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getDoctors();

      if (data.success) {
        setDoctors(data.doctors || []);
      } else {
        setError(data.message || "Failed to fetch doctors.");
      }
    } catch (err) {
      console.error("Get doctors error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load doctors. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // FETCH DEPARTMENTS
  // ===============================
  const fetchDepartments = async () => {
    try {
      const data = await getDepartments();

      if (data.success) {
        setDepartments(data.departments || []);
      }
    } catch (err) {
      console.error("Get departments error:", err);
    }
  };

  useEffect(() => {
    fetchDoctors();
    fetchDepartments();
  }, []);

  // ===============================
  // FORM CHANGE
  // ===============================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ===============================
  // DAYS CHANGE
  // ===============================
  const handleDayChange = (day) => {
    setFormData((prev) => {
      const alreadySelected = prev.availableDays.includes(day);

      return {
        ...prev,
        availableDays: alreadySelected
          ? prev.availableDays.filter((item) => item !== day)
          : [...prev.availableDays, day],
      };
    });
  };

  // ===============================
  // RESET FORM
  // ===============================
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      specialization: "",
      qualification: "",
      experience: "",
      department: "",
      consultationFee: "",
      availableDays: [],
      availableTime: "",
    });
  };

  // ===============================
  // OPEN ADD MODAL
  // ===============================
  const openAddModal = () => {
    setEditingDoctor(null);
    setError("");
    setSuccess("");
    resetForm();
    setShowModal(true);
  };

  // ===============================
  // OPEN EDIT MODAL
  // ===============================
  const openEditModal = (doctor) => {
    setEditingDoctor(doctor);

    setFormData({
      name: doctor.name || "",
      email: doctor.email || "",
      phone: doctor.phone || "",
      specialization: doctor.specialization || "",
      qualification: doctor.qualification || "",
      experience: doctor.experience ?? "",
      department: doctor.department?._id || "",
      consultationFee: doctor.consultationFee ?? "",
      availableDays: doctor.availableDays || [],
      availableTime: doctor.availableTime || "",
    });

    setError("");
    setSuccess("");
    setShowModal(true);
  };

  // ===============================
  // CLOSE MODAL
  // ===============================
  const closeModal = () => {
    if (saving) return;

    setShowModal(false);
    setEditingDoctor(null);
    resetForm();
  };

  // ===============================
  // ADD / UPDATE DOCTOR
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setSaving(true);

    try {
      const doctorData = {
        ...formData,
        experience: Number(formData.experience),
        consultationFee: Number(formData.consultationFee),
      };

      let data;

      if (editingDoctor) {
        data = await updateDoctor(editingDoctor._id, doctorData);
      } else {
        data = await createDoctor(doctorData);
      }

      if (!data.success) {
        setError(
          data.message ||
            (editingDoctor
              ? "Failed to update doctor."
              : "Failed to create doctor."),
        );
        return;
      }

      if (editingDoctor) {
        setDoctors((prev) =>
          prev.map((doctor) =>
            doctor._id === editingDoctor._id ? data.doctor : doctor,
          ),
        );

        setSuccess("Doctor updated successfully.");
      } else {
        setDoctors((prev) => [data.doctor, ...prev]);

        setSuccess("Doctor created successfully.");
      }

      setEditingDoctor(null);
      resetForm();
      setShowModal(false);
    } catch (err) {
      console.error(
        editingDoctor ? "Update doctor error:" : "Create doctor error:",
        err,
      );

      setError(
        err.response?.data?.message ||
          (editingDoctor
            ? "Unable to update doctor. Please try again."
            : "Unable to create doctor. Please try again."),
      );
    } finally {
      setSaving(false);
    }
  };

  // ===============================
  // DELETE DOCTOR
  // ===============================
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this doctor?",
    );

    if (!confirmed) return;

    try {
      setError("");
      setSuccess("");

      const data = await deleteDoctor(id);

      if (!data.success) {
        setError(data.message || "Failed to delete doctor.");
        return;
      }

      setDoctors((prev) => prev.filter((doctor) => doctor._id !== id));

      setSuccess("Doctor deleted successfully.");
    } catch (err) {
      console.error("Delete doctor error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to delete doctor. Please try again.",
      );
    }
  };

  // ===============================
  // SEARCH
  // ===============================
  const filteredDoctors = doctors.filter((doctor) => {
    const searchText = search.toLowerCase();

    return (
      doctor.name?.toLowerCase().includes(searchText) ||
      doctor.email?.toLowerCase().includes(searchText) ||
      doctor.specialization?.toLowerCase().includes(searchText) ||
      doctor.department?.name?.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="min-h-screen bg-[#F5FAFB] p-6 lg:p-8">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <p className="text-[#4FA3B8] text-sm font-semibold uppercase tracking-wider">
            Admin Panel
          </p>

          <h1 className="text-3xl font-bold text-[#123044] mt-1">Doctors</h1>

          <p className="text-[#526675] mt-2">
            Manage doctors and their information.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 bg-[#0F5B78] text-white px-5 py-3 rounded-xl font-semibold hover:bg-[#123044] transition"
        >
          <FaPlus />
          Add Doctor
        </button>
      </div>

      {/* SUCCESS */}
      {success && (
        <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700">
          {success}
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600">
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
            placeholder="Search doctors..."
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#DCEEF2] bg-[#F8FCFD] text-[#123044] outline-none focus:border-[#0F5B78]"
          />
        </div>
      </div>

      {/* DOCTORS TABLE */}
      {loading ? (
        <div className="bg-white rounded-2xl shadow-sm border border-[#DCEEF2] p-10 text-center">
          <p className="text-[#526675]">Loading doctors...</p>
        </div>
      ) : filteredDoctors.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-[#DCEEF2] p-10 text-center">
          <FaUserMd className="mx-auto text-4xl text-[#7A929D] mb-4" />

          <h2 className="text-xl font-semibold text-[#123044]">
            No doctors found
          </h2>

          <p className="text-[#526675] mt-2">
            {search
              ? "Try changing your search."
              : "No active doctors are available."}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-[#DCEEF2] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F1F8FA]">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-[#123044]">
                    Doctor
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-[#123044]">
                    Specialization
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-[#123044]">
                    Department
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-[#123044]">
                    Experience
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-[#123044]">
                    Fee
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
                {filteredDoctors.map((doctor) => (
                  <tr
                    key={doctor._id}
                    className="border-t border-[#E8F2F4] hover:bg-[#F8FCFD]"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-[#EAF6F8] flex items-center justify-center">
                          <FaUserMd className="text-[#0F5B78] text-lg" />
                        </div>

                        <div>
                          <p className="font-semibold text-[#123044]">
                            {doctor.name}
                          </p>

                          <p className="text-sm text-[#7A929D]">
                            {doctor.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-[#526675]">
                      {doctor.specialization || "—"}
                    </td>

                    <td className="px-6 py-5 text-[#526675]">
                      {doctor.department?.name || "—"}
                    </td>

                    <td className="px-6 py-5 text-[#526675]">
                      {doctor.experience ?? 0} years
                    </td>

                    <td className="px-6 py-5 text-[#526675]">
                      ₹{doctor.consultationFee ?? 0}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          doctor.isAvailable
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {doctor.isAvailable ? "Available" : "Unavailable"}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        {/* EDIT */}
                        <button
                          type="button"
                          onClick={() => openEditModal(doctor)}
                          className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
                          title="Edit Doctor"
                        >
                          <FaEdit />
                        </button>

                        {/* DELETE */}
                        <button
                          type="button"
                          onClick={() => handleDelete(doctor._id)}
                          className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                          title="Delete Doctor"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ADD / EDIT DOCTOR MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl">
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between p-6 border-b border-[#E8F2F4]">
              <div>
                <h2 className="text-2xl font-bold text-[#123044]">
                  {editingDoctor ? "Edit Doctor" : "Add Doctor"}
                </h2>

                <p className="text-sm text-[#7A929D] mt-1">
                  {editingDoctor
                    ? "Update doctor information below."
                    : "Enter doctor information below."}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="w-10 h-10 rounded-full bg-[#F1F8FA] flex items-center justify-center text-[#526675] hover:bg-[#EAF6F8]"
              >
                <FaTimes />
              </button>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                {/* NAME */}
                <div>
                  <label className="block text-sm font-semibold text-[#123044] mb-2">
                    Doctor Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Dr. John Doe"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[#DCEEF2] bg-[#F8FCFD] outline-none focus:border-[#0F5B78]"
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label className="block text-sm font-semibold text-[#123044] mb-2">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="doctor@example.com"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[#DCEEF2] bg-[#F8FCFD] outline-none focus:border-[#0F5B78]"
                  />
                </div>

                {/* PHONE */}
                <div>
                  <label className="block text-sm font-semibold text-[#123044] mb-2">
                    Phone
                  </label>

                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="9876543210"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[#DCEEF2] bg-[#F8FCFD] outline-none focus:border-[#0F5B78]"
                  />
                </div>

                {/* SPECIALIZATION */}
                <div>
                  <label className="block text-sm font-semibold text-[#123044] mb-2">
                    Specialization
                  </label>

                  <input
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    placeholder="Cardiologist"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[#DCEEF2] bg-[#F8FCFD] outline-none focus:border-[#0F5B78]"
                  />
                </div>

                {/* QUALIFICATION */}
                <div>
                  <label className="block text-sm font-semibold text-[#123044] mb-2">
                    Qualification
                  </label>

                  <input
                    type="text"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    placeholder="MBBS, MD"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[#DCEEF2] bg-[#F8FCFD] outline-none focus:border-[#0F5B78]"
                  />
                </div>

                {/* EXPERIENCE */}
                <div>
                  <label className="block text-sm font-semibold text-[#123044] mb-2">
                    Experience (Years)
                  </label>

                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    min="0"
                    placeholder="5"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[#DCEEF2] bg-[#F8FCFD] outline-none focus:border-[#0F5B78]"
                  />
                </div>

                {/* DEPARTMENT */}
                <div>
                  <label className="block text-sm font-semibold text-[#123044] mb-2">
                    Department
                  </label>

                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[#DCEEF2] bg-[#F8FCFD] outline-none focus:border-[#0F5B78]"
                  >
                    <option value="">Select Department</option>

                    {departments
                      .filter((department) => department.status === "Active")
                      .map((department) => (
                        <option key={department._id} value={department._id}>
                          {department.name}
                        </option>
                      ))}
                  </select>
                </div>

                {/* CONSULTATION FEE */}
                <div>
                  <label className="block text-sm font-semibold text-[#123044] mb-2">
                    Consultation Fee
                  </label>

                  <input
                    type="number"
                    name="consultationFee"
                    value={formData.consultationFee}
                    onChange={handleChange}
                    min="0"
                    placeholder="500"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[#DCEEF2] bg-[#F8FCFD] outline-none focus:border-[#0F5B78]"
                  />
                </div>
              </div>

              {/* AVAILABLE DAYS */}
              <div>
                <label className="block text-sm font-semibold text-[#123044] mb-3">
                  Available Days
                </label>

                <div className="flex flex-wrap gap-2">
                  {days.map((day) => {
                    const selected = formData.availableDays.includes(day);

                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => handleDayChange(day)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${
                          selected
                            ? "bg-[#0F5B78] text-white border-[#0F5B78]"
                            : "bg-white text-[#526675] border-[#DCEEF2] hover:bg-[#F1F8FA]"
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* AVAILABLE TIME */}
              <div>
                <label className="block text-sm font-semibold text-[#123044] mb-2">
                  Available Time
                </label>

                <input
                  type="text"
                  name="availableTime"
                  value={formData.availableTime}
                  onChange={handleChange}
                  placeholder="10:00 AM - 2:00 PM"
                  className="w-full px-4 py-3 rounded-xl border border-[#DCEEF2] bg-[#F8FCFD] outline-none focus:border-[#0F5B78]"
                />
              </div>

              {/* BUTTONS */}
              <div className="flex justify-end gap-3 pt-4 border-t border-[#E8F2F4]">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="px-5 py-3 rounded-xl border border-[#DCEEF2] text-[#526675] font-semibold hover:bg-[#F8FCFD] disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-3 rounded-xl bg-[#0F5B78] text-white font-semibold hover:bg-[#123044] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {saving
                    ? "Saving..."
                    : editingDoctor
                      ? "Update Doctor"
                      : "Add Doctor"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Doctors;
