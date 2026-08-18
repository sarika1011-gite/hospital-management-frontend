import React, { useEffect, useState } from "react";
import { getPatientPrescriptions } from "../../services/prescriptionService";

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadPrescriptions();
  }, []);

  const loadPrescriptions = async () => {
    try {
      setLoading(true);
      setError("");

      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        setError("Please login again.");
        return;
      }

      const user = JSON.parse(storedUser);

      const patientId = user?.patient?._id || user?.patientId || user?._id;

      if (!patientId) {
        setError("Patient profile not found.");
        return;
      }

      const data = await getPatientPrescriptions(patientId);

      if (data.success) {
        setPrescriptions(data.prescriptions || []);
      } else {
        setError(data.message || "Failed to load prescriptions.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load prescriptions.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading prescriptions...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">My Prescriptions</h1>

          <p className="text-gray-500 mt-1">
            View your prescriptions and medicines.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6">
            {error}
          </div>
        )}

        {prescriptions.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
            <h2 className="text-lg font-semibold text-gray-700">
              No prescriptions found
            </h2>

            <p className="text-gray-500 mt-2">
              Your prescriptions will appear here after consultation.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {prescriptions.map((prescription) => (
              <div
                key={prescription._id}
                className="bg-white rounded-2xl shadow-sm p-6"
              >
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Prescription
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      {prescription.createdAt
                        ? new Date(prescription.createdAt).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>

                  <div className="text-sm text-gray-600">
                    Doctor:{" "}
                    <span className="font-medium">
                      {prescription.doctor?.name || "N/A"}
                    </span>
                  </div>
                </div>

                {/* Diagnosis */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-2">
                    Diagnosis
                  </h3>

                  <div className="bg-gray-50 rounded-lg p-4 text-gray-700">
                    {prescription.diagnosis || "No diagnosis provided."}
                  </div>
                </div>

                {/* Medicines */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-3">
                    Medicines
                  </h3>

                  {prescription.medicines?.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="text-left p-3 border">Medicine</th>
                            <th className="text-left p-3 border">Dosage</th>
                            <th className="text-left p-3 border">Frequency</th>
                            <th className="text-left p-3 border">Duration</th>
                            <th className="text-left p-3 border">
                              Instructions
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {prescription.medicines.map((medicine, index) => (
                            <tr key={index}>
                              <td className="p-3 border font-medium">
                                {medicine.name || "N/A"}
                              </td>

                              <td className="p-3 border">
                                {medicine.dosage || "N/A"}
                              </td>

                              <td className="p-3 border">
                                {medicine.frequency || "N/A"}
                              </td>

                              <td className="p-3 border">
                                {medicine.duration || "N/A"}
                              </td>

                              <td className="p-3 border">
                                {medicine.instructions || "N/A"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-lg p-4 text-gray-500">
                      No medicines prescribed.
                    </div>
                  )}
                </div>

                {/* General Instructions */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-2">
                    General Instructions
                  </h3>

                  <div className="bg-gray-50 rounded-lg p-4 text-gray-700 whitespace-pre-line">
                    {prescription.generalInstructions ||
                      "No instructions provided."}
                  </div>
                </div>

                {/* Follow Up */}
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">
                    Follow-up Date
                  </h3>

                  <div className="bg-gray-50 rounded-lg p-4 text-gray-700">
                    {prescription.followUpDate
                      ? new Date(prescription.followUpDate).toLocaleDateString()
                      : "No follow-up scheduled."}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Prescriptions;
