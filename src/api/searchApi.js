import { instance } from "api/axios";

export const searchItems = async (item) =>
  await instance.get(`/search?searchQuery=${item}`);
