import api from "./api";

// Get all departments
export const getDepartments = async () => {
  const response = await api.get("/departments");
  return response.data;
};

// Get single department
export const getDepartmentById = async (id) => {
  const response = await api.get(`/departments/${id}`);
  return response.data;
};

// Create department
export const createDepartment = async (data) => {
  const response = await api.post("/departments", data);
  return response.data;
};

// Update department
export const updateDepartment = async (id, data) => {
  const response = await api.put(`/departments/${id}`, data);
  return response.data;
};

// Delete department
export const deleteDepartment = async (id) => {
  const response = await api.delete(`/departments/${id}`);
  return response.data;
};
