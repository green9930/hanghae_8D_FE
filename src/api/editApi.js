import { tokenImageInstance } from "api/axios";

export const patchDetailCheck = ({ articlesId, data }) =>
  tokenImageInstance.patch(`/api/auth/detail/${articlesId}`, data);
