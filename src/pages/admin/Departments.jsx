import { useEffect, useState } from "react";
import {
  FaBuilding,
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
} from "react-icons/fa";

import {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../../services/departmentService";

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "Active",
  });

  // ==========================================
  // FETCH DEPARTMENTS
  // ==========================================
  const fetchDepartments = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getDepartments();

      if (data.success) {
        setDepartments(data.departments || []);
      } else {
        setError(data.message || "Failed to fetch departments.");
      }
    } catch (err) {
      console.error("Get departments error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load departments. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOAD DEPARTMENTS
  // ==========================================
  useEffect(() => {
    fetchDepartments();
  }, []);

  // ==========================================
  // SEARCH
  // ==========================================
  const filteredDepartments = departments.filter((department) => {
    const searchText = search.toLowerCase();

    return (
      department.name?.toLowerCase().includes(searchText) ||
      department.description?.toLowerCase().includes(searchText) ||
      department.status?.toLowerCase().includes(searchText)
    );
  });

  // ==========================================
  // FORM CHANGE
  // ==========================================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // OPEN ADD MODAL
  // ==========================================
  const handleAdd = () => {
    setEditingDepartment(null);

    setFormData({
      name: "",
      description: "",
      status: "Active",
    });

    setError("");
    setSuccess("");
    setShowModal(true);
  };

  // ==========================================
  // OPEN EDIT MODAL
  // ==========================================
  const handleEdit = (department) => {
    setEditingDepartment(department);

    setFormData({
      name: department.name || "",
      description: department.description || "",
      status: department.status || "Active",
    });

    setError("");
    setSuccess("");
    setShowModal(true);
  };

  // ==========================================
  // CREATE / UPDATE DEPARTMENT
  // ==========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.name.trim()) {
      setError("Department name is required.");
      return;
    }

    try {
      setSaving(true);

      let data;

      // CREATE
      if (!editingDepartment) {
        data = await createDepartment({
          name: formData.name.trim(),
          description: formData.description.trim(),
          status: formData.status,
        });

        if (!data.success) {
          setError(data.message || "Failed to create department.");
          return;
        }

        setSuccess("Department created successfully.");
      }

      // UPDATE
      else {
        data = await updateDepartment(editingDepartment._id, {
          name: formData.name.trim(),
          description: formData.description.trim(),
          status: formData.status,
        });

        if (!data.success) {
          setError(data.message || "Failed to update department.");
          return;
        }

        setSuccess("Department updated successfully.");
      }

      setShowModal(false);
      setEditingDepartment(null);

      setFormData({
        name: "",
        description: "",
        status: "Active",
      });

      await fetchDepartments();
    } catch (err) {
      console.error("Department save error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to save department. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // DELETE DEPARTMENT
  // ==========================================
  const handleDelete = async (department) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${department.name}"?`,
    );

    if (!confirmed) return;

    try {
      setError("");
      setSuccess("");

      const data = await deleteDepartment(department._id);

      if (!data.success) {
        setError(data.message || "Failed to delete department.");
        return;
      }

      setSuccess("Department deleted successfully.");

      await fetchDepartments();
    } catch (err) {
      console.error("Delete department error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to delete department. Please try again.",
      );
    }
  };

  // ==========================================
  // CLOSE MODAL
  // ==========================================
  const closeModal = () => {
    setShowModal(false);
    setEditingDepartment(null);

    setFormData({
      name: "",
      description: "",
      status: "Active",
    });

    setError("");
  };

  // ==========================================
  // UI
  // ==========================================
  return (
    <div className="min-h-screen bg-[#F5FAFB] p-6 lg:p-8">
      {/* ======================================
          HEADER
      ====================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <p className="text-[#4FA3B8] text-sm font-semibold uppercase tracking-wider">
            Admin Panel
          </p>

          <h1 className="text-3xl font-bold text-[#123044] mt-1">
            Departments
          </h1>

          <p className="text-[#526675] mt-2">Manage hospital departments.</p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center justify-center gap-2 bg-[#0F5B78] text-white px-5 py-3 rounded-xl font-semibold hover:bg-[#123044] transition"
        >
          <FaPlus />
          Add Department
        </button>
      </div>

      {/* ======================================
          SUCCESS MESSAGE
      ====================================== */}
      {success && (
        <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 font-medium">
          {success}
        </div>
      )}

      {/* ======================================
          ERROR MESSAGE
      ====================================== */}
      {error && !showModal && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 font-medium">
          {error}
        </div>
      )}

      {/* ======================================
          SEARCH
      ====================================== */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#DCEEF2] p-5 mb-6">
        <div className="relative max-w-md">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A929D]" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search departments..."
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#DCEEF2] bg-[#F8FCFD] text-[#123044] outline-none focus:border-[#0F5B78]"
          />
        </div>
      </div>

      {/* ======================================
          CONTENT
      ====================================== */}
      {loading ? (
        <div className="bg-white rounded-2xl shadow-sm border border-[#DCEEF2] p-10 text-center">
          <p className="text-[#526675]">Loading departments...</p>
        </div>
      ) : filteredDepartments.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-[#DCEEF2] p-10 text-center">
          <FaBuilding className="mx-auto text-4xl text-[#7A929D] mb-4" />

          <h2 className="text-xl font-semibold text-[#123044]">
            No departments found
          </h2>

          <p className="text-[#526675] mt-2">
            {search
              ? "Try changing your search."
              : "No departments are available."}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-[#DCEEF2] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F1F8FA]">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-[#123044]">
                    Department
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-[#123044]">
                    Description
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
                {filteredDepartments.map((department) => (
                  <tr
                    key={department._id}
                    className="border-t border-[#E8F2F4] hover:bg-[#F8FCFD]"
                  >
                    {/* DEPARTMENT */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-[#EAF6F8] flex items-center justify-center">
                          <FaBuilding className="text-[#0F5B78]" />
                        </div>

                        <div>
                          <p className="font-semibold text-[#123044]">
                            {department.name}
                          </p>

                          <p className="text-xs text-[#7A929D] mt-1">
                            Department
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* DESCRIPTION */}
                    <td className="px-6 py-5 text-[#526675]">
                      {department.description || "No description"}
                    </td>

                    {/* STATUS */}
                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          department.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {department.status}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(department)}
                          className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100"
                          title="Edit Department"
                        >
                          <FaEdit />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(department)}
                          className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100"
                          title="Delete Department"
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

      {/* ======================================
          ADD / EDIT MODAL
      ====================================== */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl">
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8F2F4]">
              <div>
                <h2 className="text-xl font-bold text-[#123044]">
                  {editingDepartment ? "Edit Department" : "Add Department"}
                </h2>

                <p className="text-sm text-[#7A929D] mt-1">
                  Manage department information.
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

            {/* MODAL BODY */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* MODAL ERROR */}
              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                  {error}
                </div>
              )}

              {/* NAME */}
              <div>
                <label className="block text-sm font-semibold text-[#123044] mb-2">
                  Department Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter department name"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[#DCEEF2] bg-[#F8FCFD] outline-none focus:border-[#0F5B78]"
                />
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="block text-sm font-semibold text-[#123044] mb-2">
                  Description
                </label>

                <textarea
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter department description"
                  className="w-full px-4 py-3 rounded-xl border border-[#DCEEF2] bg-[#F8FCFD] outline-none focus:border-[#0F5B78] resize-none"
                />
              </div>

              {/* STATUS */}
              <div>
                <label className="block text-sm font-semibold text-[#123044] mb-2">
                  Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-[#DCEEF2] bg-[#F8FCFD] outline-none focus:border-[#0F5B78]"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              {/* BUTTONS */}
              <div className="flex justify-end gap-3 pt-3 border-t border-[#E8F2F4]">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="px-5 py-3 rounded-xl border border-[#DCEEF2] text-[#526675] font-semibold hover:bg-[#F5FAFB] disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-3 rounded-xl bg-[#0F5B78] text-white font-semibold hover:bg-[#123044] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {saving
                    ? "Saving..."
                    : editingDepartment
                      ? "Update Department"
                      : "Create Department"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Departments;
