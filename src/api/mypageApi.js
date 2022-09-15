import { tokenInstance } from "api/axios";

export const getMyProfile = () => tokenInstance.get(`/api/auth/profile`);

export const getMyChecks = (payload) =>
  tokenInstance.get(`/api/auth/profile/list?process=${payload}`);

export const deleteMyProfile = () => tokenInstance.delete(`/api/auth/profile`);

export const getMyNotification = () =>
  tokenInstance.get(`/api/notifications/count`);
