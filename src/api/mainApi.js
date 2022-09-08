import { instance } from "./axios";

export const getMainCheck = () => {
  return instance.get("/api/main/list");
};
export const getRandomCards = () => {
  return instance.get("/api/main/randomcards");
};
