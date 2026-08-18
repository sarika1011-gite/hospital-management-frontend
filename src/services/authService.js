import api from "./api";

// ===============================
// LOGIN
// ===============================
export const loginUser = async (loginData) => {
  const response = await api.post("/auth/login", loginData);

  if (response.data.success && response.data.token) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }

  return response.data;
};

// ===============================
// REGISTER
// ===============================
export const registerUser = async (registerData) => {
  const response = await api.post("/auth/register", registerData);

  if (response.data.success && response.data.token) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }

  return response.data;
};

// ===============================
// LOGOUT
// ===============================
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// ===============================
// GET CURRENT USER
// ===============================
export const getCurrentUser = () => {
  const user = localStorage.getItem("user");

  return user ? JSON.parse(user) : null;
};

// ===============================
// GET TOKEN
// ===============================
export const getToken = () => {
  return localStorage.getItem("token");
};

// ===============================
// CHECK LOGIN
// ===============================
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};
