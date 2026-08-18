import api from "./api";

// ======================================
// APPOINTMENT REPORT
// ======================================
export const getAppointmentReport = async (params = {}) => {
  const response = await api.get("/reports/appointments", {
    params,
  });

  return response.data;
};

// ======================================
// DOCTOR-WISE REPORT
// ======================================
export const getDoctorReport = async () => {
  const response = await api.get("/reports/doctors");

  return response.data;
};

// ======================================
// DEPARTMENT-WISE REPORT
// ======================================
export const getDepartmentReport = async () => {
  const response = await api.get("/reports/departments");

  return response.data;
};

// ======================================
// DAILY APPOINTMENT REPORT
// ======================================
export const getDailyAppointmentReport = async (date) => {
  const response = await api.get("/reports/daily", {
    params: date ? { date } : {},
  });

  return response.data;
};
