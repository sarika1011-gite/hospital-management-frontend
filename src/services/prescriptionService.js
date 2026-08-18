import api from "./api";

// ======================================
// CREATE / SAVE PRESCRIPTION
// ======================================
export const savePrescription = async (data) => {
  const response = await api.post("/prescriptions", data);
  return response.data;
};

// ======================================
// CREATE PRESCRIPTION
// ======================================
export const createPrescription = async (data) => {
  const response = await api.post("/prescriptions", data);
  return response.data;
};

// ======================================
// GET ALL PRESCRIPTIONS
// ======================================
export const getPrescriptions = async () => {
  const response = await api.get("/prescriptions");
  return response.data;
};

// ======================================
// GET SINGLE PRESCRIPTION
// ======================================
export const getPrescription = async (id) => {
  const response = await api.get(`/prescriptions/${id}`);
  return response.data;
};

// ======================================
// GET MY PRESCRIPTIONS - PATIENT
// ======================================
export const getMyPrescriptions = async () => {
  const response = await api.get("/prescriptions/my");
  return response.data;
};

// ======================================
// GET PATIENT PRESCRIPTIONS
// Alias for existing patient page
// ======================================
export const getPatientPrescriptions = async () => {
  const response = await api.get("/prescriptions/my");
  return response.data;
};

// ======================================
// GET DOCTOR PRESCRIPTIONS
// ======================================
export const getDoctorPrescriptions = async () => {
  const response = await api.get("/prescriptions/doctor");
  return response.data;
};
