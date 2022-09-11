import { colors } from "styles/theme";

const handleRankColor = (rank) => {
  let rankColor = "";
  switch (rank) {
    case "B":
      rankColor = `${colors.rankBronze}`;
      break;
    case "S":
      rankColor = `${colors.rankSilver}`;
      break;
    case "G":
      rankColor = `${colors.rankGold}`;
      break;
    case "P":
      rankColor = `${colors.rankPlatinum}`;
      break;
    case "D":
      rankColor = `${colors.rankDiamond}`;
      break;
    default:
      rankColor = `${colors.rankBronze}`;
      break;
  }

  return rankColor;
};

export default handleRankColor;
