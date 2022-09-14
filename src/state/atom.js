import { atom } from "recoil";

export const selectionState = atom({
  key: "selectionState",
  default: {
    category: "all",
    process: "all",
  },
});

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
