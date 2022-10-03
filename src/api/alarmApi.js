import { tokenInstance } from "api/axios";

export const getAlertLists = async () =>
  await tokenInstance.get("/api/notifications", {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
    },
  });

export const deleteAlertList = async (payload) =>
  await tokenInstance.delete(`/api/notifications/delete/${payload}`, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
    },
  });
