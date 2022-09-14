import { atom } from "recoil";

export const loginState = atom({
  key: "loginState",
  default: true,
});

export const detailCheckState = atom({
  key: "detailCheckState",
  default: {},
});

export const myListState = atom({
  key: "myListState",
  default: false,
});

export const alarmListState = atom({
  key: "alarmListState",
  default: false,
});

export const myPageTitleState = atom({
  key: "myPageTitleState",
  default: "MY",
});
export const commentScrollState = atom({
  key: "commentScrollState",
  default: false,
});
