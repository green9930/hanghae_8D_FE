import { tokenImageInstance } from "./axios";

export const postCheck = (payload) => {
  return tokenImageInstance.post("/api/auth/form", payload);
};
