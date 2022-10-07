import Start from "components/etc/Start";
import styled from "styled-components";
import { colors } from "styles/theme";

const StartPage = () => {
  return (
    <StMobileLayout>
      <Start />
    </StMobileLayout>
  );
};

export default StartPage;

const StMobileLayout = styled.div`
  width: 100%;
  position: relative;
  margin: 0 auto;
  background: ${colors.white};
  @media screen and (min-width: 950px) {
    width: 500px;
  }
`;
