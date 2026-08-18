import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaPrescriptionBottleAlt,
  FaPlus,
  FaTrash,
  FaSave,
  FaUser,
  FaStethoscope,
  FaCalendarAlt,
} from "react-icons/fa";
import api from "../../services/api";

function DoctorPrescriptions() {
  const { appointmentId } = useParams();
  const navigate = useNavigate();

  const [appointment, setAppointment] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);

  const [diagnosis, setDiagnosis] = useState("");
  const [notes, setNotes] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");

  const [medicines, setMedicines] = useState([
    {
      medicine: "",
      dosage: "",
      frequency: "",
      duration: "",
    },
  ]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ======================================
  // LOAD APPOINTMENT + EXISTING PRESCRIPTIONS
  // ======================================
  useEffect(() => {
    if (!appointmentId) {
      setError("Appointment ID is missing.");
      setLoading(false);
      return;
    }

    loadData();
  }, [appointmentId]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      // GET CONSULTATION / APPOINTMENT
      const appointmentResponse = await api.get(
        `/consultations/${appointmentId}`,
      );

      const consultation =
        appointmentResponse.data?.consultation ||
        appointmentResponse.data?.appointment;

      if (!consultation) {
        throw new Error("Appointment details not found.");
      }

      setAppointment(consultation);

      // GET EXISTING PRESCRIPTION
      try {
        const prescriptionResponse = await api.get(
          `/prescriptions/${appointmentId}`,
        );

        if (prescriptionResponse.data?.prescription) {
          const existing = prescriptionResponse.data.prescription;

          setPrescriptions([existing]);

          setDiagnosis(existing.diagnosis || "");
          setNotes(existing.notes || "");
          setFollowUpDate(
            existing.followUpDate
              ? new Date(existing.followUpDate).toISOString().split("T")[0]
              : "",
          );

          if (
            Array.isArray(existing.medicines) &&
            existing.medicines.length > 0
          ) {
            setMedicines(
              existing.medicines.map((medicine) => ({
                medicine: medicine.medicine || "",
                dosage: medicine.dosage || "",
                frequency: medicine.frequency || "",
                duration: medicine.duration || "",
              })),
            );
          }
        }
      } catch (prescriptionError) {
        // 404 means prescription doesn't exist yet.
        if (prescriptionError.response?.status !== 404) {
          console.error("Existing prescription error:", prescriptionError);
        }

        setPrescriptions([]);
      }
    } catch (err) {
      console.error("Prescription page error:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to load prescription details.",
      );
    } finally {
      setLoading(false);
    }
  };

  // ======================================
  // MEDICINE HANDLERS
  // ======================================
  const updateMedicine = (index, field, value) => {
    setMedicines((prev) =>
      prev.map((medicine, i) =>
        i === index
          ? {
              ...medicine,
              [field]: value,
            }
          : medicine,
      ),
    );
  };

  const addMedicine = () => {
    setMedicines((prev) => [
      ...prev,
      {
        medicine: "",
        dosage: "",
        frequency: "",
        duration: "",
      },
    ]);
  };

  const removeMedicine = (index) => {
    if (medicines.length === 1) {
      return;
    }

    setMedicines((prev) => prev.filter((_, i) => i !== index));
  };

  // ======================================
  // VALIDATION
  // ======================================
  const validateForm = () => {
    if (!appointment) {
      setError("Appointment details are not available.");
      return false;
    }

    if (!diagnosis.trim()) {
      setError("Please enter diagnosis.");
      return false;
    }

    if (!medicines.length) {
      setError("Please add at least one medicine.");
      return false;
    }

    for (let i = 0; i < medicines.length; i++) {
      const medicine = medicines[i];

      if (!medicine.medicine.trim()) {
        setError(`Please enter medicine name for medicine ${i + 1}.`);
        return false;
      }

      if (!medicine.dosage.trim()) {
        setError(`Please enter dosage for medicine ${i + 1}.`);
        return false;
      }

      if (!medicine.frequency.trim()) {
        setError(`Please enter frequency for medicine ${i + 1}.`);
        return false;
      }

      if (!medicine.duration.trim()) {
        setError(`Please enter duration for medicine ${i + 1}.`);
        return false;
      }
    }

    return true;
  };

  // ======================================
  // SAVE PRESCRIPTION
  // ======================================
  const handleSavePrescription = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!validateForm()) {
      return;
    }

    try {
      setSaving(true);

      const patientId = appointment.patient?._id || appointment.patient;

      if (!patientId) {
        setError("Patient information is missing.");
        return;
      }

      // IMPORTANT:
      // Backend Prescription model requires:
      // medicine, dosage, frequency, duration
      const prescriptionData = {
        appointment: appointmentId,
        patient: patientId,
        diagnosis: diagnosis.trim(),

        medicines: medicines.map((item) => ({
          medicine: item.medicine.trim(),
          dosage: item.dosage.trim(),
          frequency: item.frequency.trim(),
          duration: item.duration.trim(),
        })),

        notes: notes.trim(),
        followUpDate: followUpDate || null,
      };

      console.log("PRESCRIPTION PAYLOAD:", prescriptionData);

      const response = await api.post("/prescriptions", prescriptionData);

      if (response.data?.success) {
        setSuccess(
          response.data.message || "Prescription created successfully.",
        );

        if (response.data.prescription) {
          setPrescriptions([response.data.prescription]);
        }
      } else {
        setError(response.data?.message || "Failed to create prescription.");
      }
    } catch (err) {
      console.error("Create prescription error:", err);

      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to create prescription.",
      );
    } finally {
      setSaving(false);
    }
  };

  // ======================================
  // LOADING
  // ======================================
  if (loading) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-[#F5FAFB] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#DCEEF2] border-t-[#0F5B78] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#56717C]">Loading prescription details...</p>
        </div>
      </div>
    );
  }

  // ======================================
  // ERROR
  // ======================================
  if (error && !appointment) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-[#F5FAFB] p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate("/doctor/appointments")}
            className="flex items-center gap-2 text-[#0F5B78] font-medium mb-6 hover:underline"
          >
            <FaArrowLeft />
            Back to Appointments
          </button>

          <div className="bg-white rounded-2xl border border-red-100 p-8 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-red-50 flex items-center justify-center mb-4">
              <FaPrescriptionBottleAlt className="text-red-500 text-2xl" />
            </div>

            <h2 className="text-xl font-bold text-[#123044] mb-2">
              Unable to Load Prescription
            </h2>

            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const patient = appointment?.patient;
  const doctor = appointment?.doctor;
  const department = appointment?.department;

  const hasExistingPrescription = prescriptions.length > 0;

  // ======================================
  // MAIN UI
  // ======================================
  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F5FAFB] p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <button
              onClick={() => navigate("/doctor/appointments")}
              className="flex items-center gap-2 text-[#0F5B78] text-sm font-medium mb-3 hover:underline"
            >
              <FaArrowLeft />
              Back to Appointments
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#EAF6F8] flex items-center justify-center">
                <FaPrescriptionBottleAlt className="text-[#0F5B78] text-xl" />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-[#123044]">
                  Prescription
                </h1>

                <p className="text-sm text-[#7A929D]">
                  Create and manage patient prescription
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ALERTS */}
        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-red-700 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-green-700 text-sm">
            {success}
          </div>
        )}

        {/* PATIENT INFO */}
        <div className="bg-white rounded-2xl border border-[#DCEEF2] p-6 mb-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-[#EAF6F8] flex items-center justify-center">
              <FaUser className="text-[#0F5B78]" />
            </div>

            <div>
              <h2 className="font-bold text-[#123044]">Patient Information</h2>

              <p className="text-xs text-[#7A929D]">Appointment details</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div>
              <p className="text-xs text-[#7A929D] mb-1">Patient Name</p>
              <p className="font-semibold text-[#123044]">
                {patient?.name || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-xs text-[#7A929D] mb-1">Email</p>
              <p className="font-medium text-[#123044] break-all">
                {patient?.email || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-xs text-[#7A929D] mb-1">Doctor</p>
              <p className="font-semibold text-[#123044]">
                {doctor?.name || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-xs text-[#7A929D] mb-1">Department</p>
              <p className="font-medium text-[#123044]">
                {department?.name || "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* EXISTING PRESCRIPTION */}
        {hasExistingPrescription && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-5 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <FaPrescriptionBottleAlt className="text-green-600" />
              </div>

              <div>
                <h3 className="font-bold text-green-800">
                  Prescription Already Created
                </h3>

                <p className="text-sm text-green-700">
                  A prescription already exists for this appointment.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* FORM */}
        {!hasExistingPrescription && (
          <form onSubmit={handleSavePrescription}>
            {/* DIAGNOSIS */}
            <div className="bg-white rounded-2xl border border-[#DCEEF2] p-6 mb-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#EAF6F8] flex items-center justify-center">
                  <FaStethoscope className="text-[#0F5B78]" />
                </div>

                <h2 className="font-bold text-[#123044]">Diagnosis</h2>
              </div>

              <textarea
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                placeholder="Enter patient diagnosis..."
                rows={4}
                className="w-full border border-[#DCEEF2] rounded-xl px-4 py-3 outline-none focus:border-[#0F5B78] focus:ring-2 focus:ring-[#0F5B78]/10 resize-none"
              />
            </div>

            {/* MEDICINES */}
            <div className="bg-white rounded-2xl border border-[#DCEEF2] p-6 mb-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EAF6F8] flex items-center justify-center">
                    <FaPrescriptionBottleAlt className="text-[#0F5B78]" />
                  </div>

                  <div>
                    <h2 className="font-bold text-[#123044]">Medicines</h2>

                    <p className="text-xs text-[#7A929D]">
                      Add medicine, dosage, frequency and duration
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={addMedicine}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F5B78] text-white text-sm font-medium hover:bg-[#0B4A63] transition"
                >
                  <FaPlus />
                  Add Medicine
                </button>
              </div>

              <div className="space-y-5">
                {medicines.map((item, index) => (
                  <div
                    key={index}
                    className="border border-[#DCEEF2] rounded-xl p-5 bg-[#FAFDFE]"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-[#123044]">
                        Medicine {index + 1}
                      </h3>

                      {medicines.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeMedicine(index)}
                          className="text-red-500 hover:text-red-700 p-2"
                          title="Remove medicine"
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {/* MEDICINE */}
                      <div>
                        <label className="block text-sm font-medium text-[#34515D] mb-2">
                          Medicine *
                        </label>

                        <input
                          type="text"
                          value={item.medicine}
                          onChange={(e) =>
                            updateMedicine(index, "medicine", e.target.value)
                          }
                          placeholder="e.g. Paracetamol"
                          className="w-full border border-[#DCEEF2] rounded-xl px-4 py-3 outline-none focus:border-[#0F5B78]"
                        />
                      </div>

                      {/* DOSAGE */}
                      <div>
                        <label className="block text-sm font-medium text-[#34515D] mb-2">
                          Dosage *
                        </label>

                        <input
                          type="text"
                          value={item.dosage}
                          onChange={(e) =>
                            updateMedicine(index, "dosage", e.target.value)
                          }
                          placeholder="e.g. 500mg"
                          className="w-full border border-[#DCEEF2] rounded-xl px-4 py-3 outline-none focus:border-[#0F5B78]"
                        />
                      </div>

                      {/* FREQUENCY */}
                      <div>
                        <label className="block text-sm font-medium text-[#34515D] mb-2">
                          Frequency *
                        </label>

                        <input
                          type="text"
                          value={item.frequency}
                          onChange={(e) =>
                            updateMedicine(index, "frequency", e.target.value)
                          }
                          placeholder="e.g. Twice daily"
                          className="w-full border border-[#DCEEF2] rounded-xl px-4 py-3 outline-none focus:border-[#0F5B78]"
                        />
                      </div>

                      {/* DURATION */}
                      <div>
                        <label className="block text-sm font-medium text-[#34515D] mb-2">
                          Duration *
                        </label>

                        <input
                          type="text"
                          value={item.duration}
                          onChange={(e) =>
                            updateMedicine(index, "duration", e.target.value)
                          }
                          placeholder="e.g. 5 days"
                          className="w-full border border-[#DCEEF2] rounded-xl px-4 py-3 outline-none focus:border-[#0F5B78]"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* NOTES + FOLLOW UP */}
            <div className="bg-white rounded-2xl border border-[#DCEEF2] p-6 mb-6 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#34515D] mb-2">
                    Doctor Notes
                  </label>

                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Enter additional instructions or notes..."
                    rows={5}
                    className="w-full border border-[#DCEEF2] rounded-xl px-4 py-3 outline-none focus:border-[#0F5B78] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#34515D] mb-2">
                    Follow-up Date
                  </label>

                  <div className="relative">
                    <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A929D]" />

                    <input
                      type="date"
                      value={followUpDate}
                      onChange={(e) => setFollowUpDate(e.target.value)}
                      className="w-full border border-[#DCEEF2] rounded-xl pl-11 pr-4 py-3 outline-none focus:border-[#0F5B78]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SAVE */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate("/doctor/appointments")}
                className="px-6 py-3 rounded-xl border border-[#DCEEF2] text-[#34515D] font-medium hover:bg-white transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0F5B78] text-white font-semibold hover:bg-[#0B4A63] transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <FaSave />

                {saving ? "Saving..." : "Save Prescription"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default DoctorPrescriptions;
