import { useEffect, useState } from "react";
import {
  FaUserInjured,
  FaSearch,
  FaEdit,
  FaTrash,
  FaTimes,
  FaPlus,
} from "react-icons/fa";

import {
  getPatients,
  getPatientUsers,
  createPatient,
  updatePatient,
  deletePatient,
} from "../../services/patientService";

function Patients() {
  const [patients, setPatients] = useState([]);
  const [patientUsers, setPatientUsers] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [selectedUser, setSelectedUser] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    mobile: "",
    email: "",
    address: "",
    bloodGroup: "",
    medicalInformation: "",
  });

  // ================================
  // FETCH PATIENTS
  // ================================
  const fetchPatients = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getPatients();

      if (data.success) {
        setPatients(data.patients || []);
      } else {
        setError(data.message || "Failed to fetch patients.");
      }
    } catch (err) {
      console.error("Get patients error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load patients. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // ================================
  // FETCH PATIENT USERS
  // ================================
  const fetchPatientUsers = async () => {
    try {
      const data = await getPatientUsers();

      if (data.success) {
        setPatientUsers(data.patients || []);
      }
    } catch (err) {
      console.error("Get patient users error:", err);
    }
  };

  useEffect(() => {
    fetchPatients();
    fetchPatientUsers();
  }, []);

  // ================================
  // SEARCH
  // ================================
  const filteredPatients = patients.filter((patient) => {
    const searchText = search.toLowerCase();

    return (
      patient.name?.toLowerCase().includes(searchText) ||
      patient.email?.toLowerCase().includes(searchText) ||
      patient.mobile?.toLowerCase().includes(searchText) ||
      patient.gender?.toLowerCase().includes(searchText) ||
      patient.bloodGroup?.toLowerCase().includes(searchText)
    );
  });

  // ================================
  // RESET FORM
  // ================================
  const resetForm = () => {
    setFormData({
      name: "",
      age: "",
      gender: "",
      mobile: "",
      email: "",
      address: "",
      bloodGroup: "",
      medicalInformation: "",
    });

    setSelectedUser("");
  };

  // ================================
  // OPEN ADD MODAL
  // ================================
  const handleAdd = () => {
    setEditingPatient(null);
    resetForm();
    setError("");
    setSuccess("");
    setShowModal(true);
  };

  // ================================
  // EDIT
  // ================================
  const handleEdit = (patient) => {
    setEditingPatient(patient);

    setSelectedUser(patient.user?._id || patient.user || "");

    setFormData({
      name: patient.name || "",
      age: patient.age || "",
      gender: patient.gender || "",
      mobile: patient.mobile || "",
      email: patient.email || "",
      address: patient.address || "",
      bloodGroup: patient.bloodGroup || "",
      medicalInformation: patient.medicalInformation || "",
    });

    setError("");
    setSuccess("");
    setShowModal(true);
  };

  // ================================
  // USER SELECTION
  // ================================
  const handleUserChange = (e) => {
    const userId = e.target.value;

    setSelectedUser(userId);

    const selected = patientUsers.find((user) => user._id === userId);

    if (selected) {
      setFormData((prev) => ({
        ...prev,
        name: selected.name || "",
        email: selected.email || "",
        mobile: selected.phone || "",
      }));
    }
  };

  // ================================
  // SUBMIT
  // ================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setSuccess("");

      if (!editingPatient && !selectedUser) {
        setError("Please select a patient user.");
        return;
      }

      if (!formData.name.trim()) {
        setError("Patient name is required.");
        return;
      }

      if (!formData.age) {
        setError("Patient age is required.");
        return;
      }

      if (!formData.gender) {
        setError("Please select gender.");
        return;
      }

      if (!formData.mobile.trim()) {
        setError("Mobile number is required.");
        return;
      }

      if (!formData.email.trim()) {
        setError("Email is required.");
        return;
      }

      let data;

      if (editingPatient) {
        // UPDATE
        data = await updatePatient(editingPatient._id, formData);

        if (!data.success) {
          setError(data.message || "Failed to update patient.");
          return;
        }

        setSuccess("Patient updated successfully.");
      } else {
        // CREATE
        data = await createPatient({
          user: selectedUser,
          ...formData,
          age: Number(formData.age),
        });

        if (!data.success) {
          setError(data.message || "Failed to create patient.");
          return;
        }

        setSuccess("Patient created successfully.");
      }

      setShowModal(false);
      setEditingPatient(null);
      resetForm();

      await fetchPatients();
      await fetchPatientUsers();
    } catch (err) {
      console.error("Patient submit error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to save patient. Please try again.",
      );
    }
  };

  // ================================
  // DELETE
  // ================================
  const handleDelete = async (patient) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${patient.name}"?`,
    );

    if (!confirmed) return;

    try {
      setError("");
      setSuccess("");

      const data = await deletePatient(patient._id);

      if (!data.success) {
        setError(data.message || "Failed to delete patient.");
        return;
      }

      setSuccess("Patient deleted successfully.");

      await fetchPatients();
      await fetchPatientUsers();
    } catch (err) {
      console.error("Delete patient error:", err);

      setError(err.response?.data?.message || "Unable to delete patient.");
    }
  };

  // ================================
  // CLOSE MODAL
  // ================================
  const closeModal = () => {
    setShowModal(false);
    setEditingPatient(null);
    resetForm();
    setError("");
  };

  return (
    <div className="min-h-screen bg-[#F5FAFB] p-6 lg:p-8">
      {/* HEADER */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-[#4FA3B8] text-sm font-semibold uppercase tracking-wider">
            Admin Panel
          </p>

          <h1 className="text-3xl font-bold text-[#123044] mt-1">Patients</h1>

          <p className="text-[#526675] mt-2">Manage registered patients.</p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0F5B78] text-white font-semibold hover:bg-[#123044] transition"
        >
          <FaPlus />
          Add Patient
        </button>
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
            placeholder="Search patients..."
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#DCEEF2] bg-[#F8FCFD] text-[#123044] outline-none focus:border-[#0F5B78]"
          />
        </div>
      </div>

      {/* CONTENT */}
      {loading ? (
        <div className="bg-white rounded-2xl shadow-sm border border-[#DCEEF2] p-10 text-center">
          <p className="text-[#526675]">Loading patients...</p>
        </div>
      ) : filteredPatients.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-[#DCEEF2] p-10 text-center">
          <FaUserInjured className="mx-auto text-4xl text-[#7A929D] mb-4" />

          <h2 className="text-xl font-semibold text-[#123044]">
            No patients found
          </h2>

          <p className="text-[#526675] mt-2">
            {search
              ? "Try changing your search."
              : "No patients are available. Click Add Patient to create one."}
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
                    Contact
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-[#123044]">
                    Age / Gender
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-[#123044]">
                    Blood Group
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-[#123044]">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredPatients.map((patient) => (
                  <tr
                    key={patient._id}
                    className="border-t border-[#E8F2F4] hover:bg-[#F8FCFD]"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-[#EAF6F8] flex items-center justify-center">
                          <FaUserInjured className="text-[#0F5B78]" />
                        </div>

                        <div>
                          <p className="font-semibold text-[#123044]">
                            {patient.name}
                          </p>

                          <p className="text-xs text-[#7A929D] mt-1">
                            {patient.email || "No email"}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-[#526675]">
                      {patient.mobile || "No mobile"}
                    </td>

                    <td className="px-6 py-5 text-[#526675]">
                      {patient.age || "-"} / {patient.gender || "-"}
                    </td>

                    <td className="px-6 py-5">
                      <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-600">
                        {patient.bloodGroup || "N/A"}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(patient)}
                          className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(patient)}
                          className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100"
                          title="Delete"
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

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8F2F4]">
              <div>
                <h2 className="text-xl font-bold text-[#123044]">
                  {editingPatient ? "Edit Patient" : "Add Patient"}
                </h2>

                <p className="text-sm text-[#7A929D] mt-1">
                  {editingPatient
                    ? "Update patient information."
                    : "Create a patient profile."}
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

              {/* USER */}
              {!editingPatient && (
                <div>
                  <label className="block text-sm font-semibold text-[#123044] mb-2">
                    Select Patient User
                  </label>

                  <select
                    value={selectedUser}
                    onChange={handleUserChange}
                    className="w-full px-4 py-3 rounded-xl border border-[#DCEEF2] bg-[#F8FCFD] outline-none focus:border-[#0F5B78]"
                  >
                    <option value="">Select registered patient</option>

                    {patientUsers.map((user) => (
                      <option key={user._id} value={user._id}>
                        {user.name} - {user.email}
                      </option>
                    ))}
                  </select>

                  {patientUsers.length === 0 && (
                    <p className="text-xs text-red-500 mt-2">
                      No PATIENT users available. Register a patient first.
                    </p>
                  )}
                </div>
              )}

              {/* NAME */}
              <div>
                <label className="block text-sm font-semibold text-[#123044] mb-2">
                  Patient Name
                </label>

                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-[#DCEEF2] bg-[#F8FCFD] outline-none focus:border-[#0F5B78]"
                  placeholder="Enter patient name"
                />
              </div>

              {/* AGE + GENDER */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-[#123044] mb-2">
                    Age
                  </label>

                  <input
                    type="number"
                    min="0"
                    max="120"
                    value={formData.age}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        age: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-[#DCEEF2] bg-[#F8FCFD] outline-none focus:border-[#0F5B78]"
                    placeholder="Age"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#123044] mb-2">
                    Gender
                  </label>

                  <select
                    value={formData.gender}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        gender: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-[#DCEEF2] bg-[#F8FCFD] outline-none focus:border-[#0F5B78]"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* MOBILE + EMAIL */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-[#123044] mb-2">
                    Mobile
                  </label>

                  <input
                    type="text"
                    value={formData.mobile}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        mobile: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-[#DCEEF2] bg-[#F8FCFD] outline-none focus:border-[#0F5B78]"
                    placeholder="Mobile number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#123044] mb-2">
                    Email
                  </label>

                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-[#DCEEF2] bg-[#F8FCFD] outline-none focus:border-[#0F5B78]"
                    placeholder="Email address"
                  />
                </div>
              </div>

              {/* BLOOD GROUP */}
              <div>
                <label className="block text-sm font-semibold text-[#123044] mb-2">
                  Blood Group
                </label>

                <select
                  value={formData.bloodGroup}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      bloodGroup: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-[#DCEEF2] bg-[#F8FCFD] outline-none focus:border-[#0F5B78]"
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              {/* ADDRESS */}
              <div>
                <label className="block text-sm font-semibold text-[#123044] mb-2">
                  Address
                </label>

                <textarea
                  rows="2"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-[#DCEEF2] bg-[#F8FCFD] outline-none focus:border-[#0F5B78] resize-none"
                  placeholder="Patient address"
                />
              </div>

              {/* MEDICAL INFO */}
              <div>
                <label className="block text-sm font-semibold text-[#123044] mb-2">
                  Medical Information
                </label>

                <textarea
                  rows="3"
                  value={formData.medicalInformation}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      medicalInformation: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-[#DCEEF2] bg-[#F8FCFD] outline-none focus:border-[#0F5B78] resize-none"
                  placeholder="Medical history / information"
                />
              </div>

              {/* BUTTONS */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-3 rounded-xl border border-[#DCEEF2] text-[#526675] font-semibold hover:bg-[#F5FAFB]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-[#0F5B78] text-white font-semibold hover:bg-[#123044]"
                >
                  {editingPatient ? "Update Patient" : "Add Patient"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Patients;
