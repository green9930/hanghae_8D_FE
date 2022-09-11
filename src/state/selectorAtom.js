import { atom } from "recoil";

export const selectionState = atom({
  key: "selectionState",
  default: {
    category: "all",
    process: "all",
  },
});
