import api from "./api";

// GET ALL APPOINTMENTS - ADMIN
export const getAppointments = async () => {
  const response = await api.get("/appointments");
  return response.data;
};

// GET MY APPOINTMENTS - PATIENT
export const getMyAppointments = async () => {
  const response = await api.get("/appointments/my");
  return response.data;
};

// GET DOCTOR APPOINTMENTS
export const getDoctorAppointments = async () => {
  const response = await api.get("/appointments/doctor");
  return response.data;
};

// CREATE APPOINTMENT - PATIENT
export const createAppointment = async (appointmentData) => {
  const response = await api.post("/appointments", appointmentData);
  return response.data;
};

// UPDATE APPOINTMENT STATUS
export const updateAppointmentStatus = async (id, statusData) => {
  const response = await api.patch(`/appointments/${id}/status`, statusData);

  return response.data;
};
