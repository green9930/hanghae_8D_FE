import { instance } from "api/axios";

export const getMainCheck = async ({ category, process }, pageParam) => {
  const data = await instance.get(
    `/api/main/list?category=${category}&process=${process}&page=${pageParam}&size=10`
  );
  return {
    data,
    nextPage: pageParam + 1,
    currentPage: pageParam,
  };
};

export const getRandomCards = async () =>
  await instance.get("/api/main/randomcards");
