import api from "./api";

// Search doctors
export const searchDoctors = async (params = {}) => {
  const response = await api.get("/search/doctors", {
    params,
  });

  return response.data;
};

// Search patients
export const searchPatients = async (params = {}) => {
  const response = await api.get("/search/patients", {
    params,
  });

  return response.data;
};

// Search departments
export const searchDepartments = async (params = {}) => {
  const response = await api.get("/search/departments", {
    params,
  });

  return response.data;
};
