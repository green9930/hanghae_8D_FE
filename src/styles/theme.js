export const colors = {
  mainP: "#9083F7",
  subP: "#E3DFFF",
  mainO: "#F9D9C2",
  subO: "#FCEFDF",
  grey1: "#333333",
  grey2: "#666666",
  grey3: "#999999",
  grey4: "#D9D9D9",
  grey5: "#E8E8E8",
  grey6: "#EEEEEE",
  grey7: "#F8F8F8",
  red: "#FF4040",
  rankBronze: "#C0977F",
  rankSilver: "#999999",
  rankGold: "#EFC52F",
  rankPlatinum: "#9747FF",
  rankDiamond: "#1E5DFF",
  black: "#000000",
  white: "#FFFFFF",
};

export const calcRem = (size) => `${size / 14}rem`;

export const fontSize = {
  small10: calcRem(10),
  small12: calcRem(12),
  regular14: calcRem(14),
  regular16: calcRem(16),
  regular18: calcRem(18),
  large20: calcRem(20),
  large22: calcRem(22),
  large24: calcRem(24),
  large28: calcRem(28),
  large32: calcRem(32),
};
