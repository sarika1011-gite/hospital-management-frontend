import { useState } from "react";
import { FaCog, FaBell, FaLock, FaUserShield, FaSave } from "react-icons/fa";

function Settings() {
  const [settings, setSettings] = useState({
    notifications: true,
    emailNotifications: true,
    appointmentReminders: true,
    maintenanceMode: false,
  });

  const [success, setSuccess] = useState("");

  const handleChange = (field) => {
    setSettings((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    setSuccess("Settings saved successfully.");

    setTimeout(() => {
      setSuccess("");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#F5FAFB] p-6 lg:p-8">
      {/* HEADER */}
      <div className="mb-8">
        <p className="text-[#4FA3B8] text-sm font-semibold uppercase tracking-wider">
          Admin Panel
        </p>

        <h1 className="text-3xl font-bold text-[#123044] mt-1">Settings</h1>

        <p className="text-[#526675] mt-2">
          Manage your hospital system settings.
        </p>
      </div>

      {/* SUCCESS MESSAGE */}
      {success && (
        <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 font-medium">
          {success}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* GENERAL SETTINGS */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#DCEEF2] overflow-hidden">
          <div className="px-6 py-5 border-b border-[#E8F2F4] flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#EAF6F8] flex items-center justify-center">
              <FaCog className="text-[#0F5B78]" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#123044]">
                General Settings
              </h2>

              <p className="text-sm text-[#7A929D]">
                Configure general system preferences.
              </p>
            </div>
          </div>

          <div className="p-6 space-y-5">
            {/* NOTIFICATIONS */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#F1F8FA] flex items-center justify-center">
                  <FaBell className="text-[#0F5B78]" />
                </div>

                <div>
                  <h3 className="font-semibold text-[#123044]">
                    Notifications
                  </h3>

                  <p className="text-sm text-[#7A929D]">
                    Enable system notifications.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleChange("notifications")}
                className={`relative w-12 h-6 rounded-full transition ${
                  settings.notifications ? "bg-[#0F5B78]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${
                    settings.notifications ? "left-7" : "left-1"
                  }`}
                />
              </button>
            </div>

            {/* EMAIL NOTIFICATIONS */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#F1F8FA] flex items-center justify-center">
                  <FaBell className="text-[#0F5B78]" />
                </div>

                <div>
                  <h3 className="font-semibold text-[#123044]">
                    Email Notifications
                  </h3>

                  <p className="text-sm text-[#7A929D]">
                    Receive important updates by email.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleChange("emailNotifications")}
                className={`relative w-12 h-6 rounded-full transition ${
                  settings.emailNotifications ? "bg-[#0F5B78]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${
                    settings.emailNotifications ? "left-7" : "left-1"
                  }`}
                />
              </button>
            </div>

            {/* APPOINTMENT REMINDERS */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#F1F8FA] flex items-center justify-center">
                  <FaBell className="text-[#0F5B78]" />
                </div>

                <div>
                  <h3 className="font-semibold text-[#123044]">
                    Appointment Reminders
                  </h3>

                  <p className="text-sm text-[#7A929D]">
                    Send reminders for upcoming appointments.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleChange("appointmentReminders")}
                className={`relative w-12 h-6 rounded-full transition ${
                  settings.appointmentReminders ? "bg-[#0F5B78]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${
                    settings.appointmentReminders ? "left-7" : "left-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* SECURITY */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#DCEEF2] overflow-hidden">
          <div className="px-6 py-5 border-b border-[#E8F2F4] flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#EAF6F8] flex items-center justify-center">
              <FaLock className="text-[#0F5B78]" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#123044]">Security</h2>

              <p className="text-sm text-[#7A929D]">
                Manage system security preferences.
              </p>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#F1F8FA] flex items-center justify-center">
                  <FaUserShield className="text-[#0F5B78]" />
                </div>

                <div>
                  <h3 className="font-semibold text-[#123044]">
                    Maintenance Mode
                  </h3>

                  <p className="text-sm text-[#7A929D]">
                    Temporarily restrict access to the system.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleChange("maintenanceMode")}
                className={`relative w-12 h-6 rounded-full transition ${
                  settings.maintenanceMode ? "bg-[#0F5B78]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${
                    settings.maintenanceMode ? "left-7" : "left-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* SAVE BUTTON */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0F5B78] text-white font-semibold hover:bg-[#123044] transition"
          >
            <FaSave />
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}

export default Settings;
