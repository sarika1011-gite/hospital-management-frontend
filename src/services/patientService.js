import api from "./api";

// GET ALL PATIENTS
export const getPatients = async () => {
  const response = await api.get("/patients");
  return response.data;
};

// GET PATIENT USERS
export const getPatientUsers = async () => {
  const response = await api.get("/users/patients");
  return response.data;
};

// GET SINGLE PATIENT
export const getPatientById = async (id) => {
  const response = await api.get(`/patients/${id}`);
  return response.data;
};

// CREATE PATIENT
export const createPatient = async (patientData) => {
  const response = await api.post("/patients", patientData);
  return response.data;
};

// UPDATE PATIENT
export const updatePatient = async (id, patientData) => {
  const response = await api.put(`/patients/${id}`, patientData);
  return response.data;
};

// DELETE PATIENT
export const deletePatient = async (id) => {
  const response = await api.delete(`/patients/${id}`);
  return response.data;
};
