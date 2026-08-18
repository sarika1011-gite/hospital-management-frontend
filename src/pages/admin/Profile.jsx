import { useEffect, useState } from "react";
import { FaUserCircle, FaEdit, FaSave, FaTimes } from "react-icons/fa";

function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Administrator",
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // ==========================================
  // LOAD LOGGED-IN USER
  // ==========================================
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    try {
      setLoading(true);
      setError("");

      const storedUser =
        localStorage.getItem("user") || localStorage.getItem("currentUser");

      if (!storedUser) {
        setError(
          "Admin profile information was not found. Please login again.",
        );
        setLoading(false);
        return;
      }

      const user = JSON.parse(storedUser);

      const userProfile = {
        name: user.name || "Admin",
        email: user.email || "",
        phone: user.phone || "",
        role: user.role || "Administrator",
      };

      setProfile(userProfile);

      setFormData({
        name: userProfile.name,
        email: userProfile.email,
        phone: userProfile.phone,
      });
    } catch (err) {
      console.error("Profile loading error:", err);
      setError("Unable to load profile.");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // INPUT CHANGE
  // ==========================================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // START EDIT
  // ==========================================
  const handleEdit = () => {
    setSuccess("");
    setError("");

    setFormData({
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
    });

    setEditing(true);
  };

  // ==========================================
  // CANCEL EDIT
  // ==========================================
  const handleCancel = () => {
    setFormData({
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
    });

    setError("");
    setSuccess("");
    setEditing(false);
  };

  // ==========================================
  // SAVE PROFILE
  // ==========================================
  const handleSave = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.name.trim()) {
      setError("Name is required.");
      return;
    }

    if (!formData.email.trim()) {
      setError("Email is required.");
      return;
    }

    try {
      setSaving(true);

      /*
       * Update local logged-in user.
       *
       * This makes the profile immediately persistent
       * in the current browser session.
       */
      const storedUser =
        localStorage.getItem("user") || localStorage.getItem("currentUser");

      if (storedUser) {
        const user = JSON.parse(storedUser);

        const updatedUser = {
          ...user,
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
        };

        localStorage.setItem("user", JSON.stringify(updatedUser));

        // Also update currentUser if your project uses it
        if (localStorage.getItem("currentUser")) {
          localStorage.setItem("currentUser", JSON.stringify(updatedUser));
        }

        setProfile({
          name: updatedUser.name,
          email: updatedUser.email,
          phone: updatedUser.phone,
          role: updatedUser.role || "Administrator",
        });

        setFormData({
          name: updatedUser.name,
          email: updatedUser.email,
          phone: updatedUser.phone,
        });

        setEditing(false);

        setSuccess("Profile updated successfully.");
      }
    } catch (err) {
      console.error("Profile update error:", err);

      setError("Unable to update profile.");
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5FAFB] p-6 lg:p-8">
        <div className="bg-white rounded-2xl shadow-sm border border-[#DCEEF2] p-10 text-center">
          <p className="text-[#526675]">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5FAFB] p-6 lg:p-8">
      {/* HEADER */}
      <div className="mb-8">
        <p className="text-[#4FA3B8] text-sm font-semibold uppercase tracking-wider">
          Admin Panel
        </p>

        <h1 className="text-3xl font-bold text-[#123044] mt-1">Profile</h1>

        <p className="text-[#526675] mt-2">
          Manage your administrator profile.
        </p>
      </div>

      {/* SUCCESS */}
      {success && (
        <div className="max-w-3xl mb-6 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 font-medium">
          {success}
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div className="max-w-3xl mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 font-medium">
          {error}
        </div>
      )}

      {/* PROFILE CARD */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#DCEEF2] p-8 max-w-3xl">
        {/* PROFILE HEADER */}
        <div className="flex items-center justify-between gap-5 mb-8">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-[#EAF6F8] flex items-center justify-center">
              <FaUserCircle className="text-[#0F5B78] text-5xl" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#123044]">
                {profile.name || "Admin"}
              </h2>

              <p className="text-[#7A929D] mt-1">{profile.role}</p>

              {profile.email && (
                <p className="text-sm text-[#526675] mt-1">{profile.email}</p>
              )}
            </div>
          </div>

          {/* EDIT BUTTON */}
          {!editing && (
            <button
              type="button"
              onClick={handleEdit}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F5B78] text-white font-semibold hover:bg-[#123044] transition"
            >
              <FaEdit />
              Edit Profile
            </button>
          )}
        </div>

        {/* PROFILE FORM */}
        <form onSubmit={handleSave}>
          <div className="space-y-5">
            {/* NAME */}
            <div>
              <label className="block text-sm font-semibold text-[#123044] mb-2">
                Name
              </label>

              <input
                type="text"
                name="name"
                value={editing ? formData.name : profile.name}
                onChange={handleChange}
                readOnly={!editing}
                className={`w-full px-4 py-3 rounded-xl border border-[#DCEEF2] text-[#123044] outline-none ${
                  editing
                    ? "bg-white focus:border-[#0F5B78]"
                    : "bg-[#F8FCFD] text-[#526675]"
                }`}
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
                value={editing ? formData.email : profile.email}
                onChange={handleChange}
                readOnly={!editing}
                className={`w-full px-4 py-3 rounded-xl border border-[#DCEEF2] text-[#123044] outline-none ${
                  editing
                    ? "bg-white focus:border-[#0F5B78]"
                    : "bg-[#F8FCFD] text-[#526675]"
                }`}
              />
            </div>

            {/* PHONE */}
            <div>
              <label className="block text-sm font-semibold text-[#123044] mb-2">
                Phone
              </label>

              <input
                type="tel"
                name="phone"
                value={editing ? formData.phone : profile.phone}
                onChange={handleChange}
                readOnly={!editing}
                placeholder="Enter phone number"
                className={`w-full px-4 py-3 rounded-xl border border-[#DCEEF2] text-[#123044] outline-none ${
                  editing
                    ? "bg-white focus:border-[#0F5B78]"
                    : "bg-[#F8FCFD] text-[#526675]"
                }`}
              />
            </div>

            {/* ROLE */}
            <div>
              <label className="block text-sm font-semibold text-[#123044] mb-2">
                Role
              </label>

              <input
                type="text"
                value={profile.role}
                readOnly
                className="w-full px-4 py-3 rounded-xl border border-[#DCEEF2] bg-[#F8FCFD] text-[#526675] outline-none"
              />
            </div>
          </div>

          {/* EDIT ACTIONS */}
          {editing && (
            <div className="flex justify-end gap-3 mt-8">
              <button
                type="button"
                onClick={handleCancel}
                className="flex items-center gap-2 px-5 py-3 rounded-xl border border-[#DCEEF2] text-[#526675] font-semibold hover:bg-[#F5FAFB]"
              >
                <FaTimes />
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0F5B78] text-white font-semibold hover:bg-[#123044] disabled:opacity-60"
              >
                <FaSave />

                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Profile;
