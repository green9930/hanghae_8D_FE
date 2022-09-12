import { instance } from "./axios";

export const getMainCheck = async ({ category, process, pageParam = 1 }) => {
  const { data } = await instance.get(
    `/api/main/list?category=${category}&process=${process}&page=${pageParam}&size=10`
  );
  // return data;
  // let pages;
  // if (pageParam === 1) {
  //   pages = [{ content: data }];
  //   return { pages, nextPage: pageParam + 1, currentPage: pageParam };
  // }
  return { data, nextPage: pageParam + 1, currentPage: pageParam };
};

export const getRandomCards = () => {
  return instance.get("/api/main/randomcards");
};
