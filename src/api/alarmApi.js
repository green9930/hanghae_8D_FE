import { tokenAlertInstance, tokenInstance } from "./axios";

export const getAlertLists = async () => {
  return await tokenAlertInstance.get("/api/notifications");
};

export const deleteAlertList = async (payload) => {
  return await tokenInstance.delete(`/api/notifications/delete/${payload}`);
};
