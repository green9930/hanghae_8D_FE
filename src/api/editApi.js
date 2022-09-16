import { tokenInstance } from "api/axios";

export const patchDetailCheck = ({ articlesId, data }) =>
  tokenInstance.patch(`/api/auth/detail/${articlesId}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      responseType: "blob",
    },
  });
