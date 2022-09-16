import { tokenInstance } from "api/axios";

export const postCheck = (payload) =>
  tokenInstance.post("/api/auth/form", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
      responseType: "blob",
    },
  });
