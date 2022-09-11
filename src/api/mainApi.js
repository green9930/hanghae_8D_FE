import { instance } from "./axios";

export const getMainCheck = (payload) => {
  return instance.get(`/api/main/list?category=${payload.category}&process=${payload.process}&pages=${payload.page}
  &sizes=${payload.size}`);
};
export const getRandomCards = () => {
  return instance.get("/api/main/randomcards");
};
