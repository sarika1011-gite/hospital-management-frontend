import api from "./api";

// Get my notifications
export const getMyNotifications = async () => {
  const response = await api.get("/notifications/my");
  return response.data;
};

// Mark single notification as read
export const markNotificationAsRead = async (id) => {
  const response = await api.put(`/notifications/${id}/read`);
  return response.data;
};

// Mark all notifications as read
export const markAllNotificationsAsRead = async () => {
  const response = await api.put("/notifications/read-all");
  return response.data;
};

// Delete notification
export const deleteNotification = async (id) => {
  const response = await api.delete(`/notifications/${id}`);
  return response.data;
};

// Create notification - Admin
export const createNotification = async (data) => {
  const response = await api.post("/notifications", data);
  return response.data;
};
