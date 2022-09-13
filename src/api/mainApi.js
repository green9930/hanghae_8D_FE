import { instance } from "./axios";

export const getMainCheck = async ({ category, process }, pageParam) => {
  console.log(pageParam);
  const data = await instance.get(
    `/api/main/list?category=${category}&process=${process}&page=${pageParam}&size=10`
  );
  return {
    data,
    nextPage: pageParam + 1,
    currentPage: pageParam,
  };
};

export const getRandomCards = () => {
  return instance.get("/api/main/randomcards");
};
