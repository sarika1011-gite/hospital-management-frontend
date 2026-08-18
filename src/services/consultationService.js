import api from "./api";

// ======================================
// GET CONSULTATION
// ======================================
export const getConsultation = async (appointmentId) => {
  const response = await api.get(`/consultations/${appointmentId}`);

  return response.data;
};

// ======================================
// START CONSULTATION
// Backend: POST
// ======================================
export const startConsultation = async (appointmentId) => {
  const response = await api.post(`/consultations/${appointmentId}/start`);

  return response.data;
};

// ======================================
// COMPLETE CONSULTATION
// Backend: POST
// ======================================
export const completeConsultation = async (appointmentId) => {
  const response = await api.post(`/consultations/${appointmentId}/complete`);

  return response.data;
};
