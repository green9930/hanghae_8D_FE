import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
export const loginState = atom({
  key: "loginState",
  default: true,
});

export const detailCheckState = atom({
  key: "detailCheckState",
  default: {},
});

export const nickNameState = atom({
  key: "nickNameState",
  default: false,
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

export const commentRefState = atom({
  key: "commentRefState",
  default: false,
});

export const newAlarmsState = atom({
  key: "newAlarmsState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const newAlarmsLengthState = atom({
  key: "newAlarmsLengthState",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
