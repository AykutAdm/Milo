import type { UserNotification } from "../types/notification";
import api from "./api";

export const getNotifications = async (): Promise<UserNotification[]> => {
  const response = await api.get<UserNotification[]>(
    "/notification/userNotifications",
  );
  return response.data;
};

export const deleteNotification = async (id: string) => {
  await api.delete(`/notification/userNotifications/${id}`);
};

export const markNotificationAsRead = async (id: string) => {
  await api.put(`/notification/userNotifications/${id}/read`);
};
