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
