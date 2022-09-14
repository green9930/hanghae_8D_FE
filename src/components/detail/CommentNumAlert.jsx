import icons from "assets";
import Button from "components/elements/Button";
import styled from "styled-components";
import { colors, fontSize } from "styles/theme";

const CommentNumAlert = ({ message, handleOpenModal }) => {
  const { MainArrow } = icons;

  return (
    <StCommentNumAlert>
      <StMessage>
        <MainArrow width="40px" height="40px" fill={`${colors.mainP}`} />
        <StSelectMessage>{message}</StSelectMessage>
      </StMessage>
      <Button onClickHandler={handleOpenModal}>닫기</Button>
    </StCommentNumAlert>
  );
};

const StCommentNumAlert = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const StMessage = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  padding-top: 10px;
`;

const StSelectMessage = styled.span`
  text-align: center;
  font-size: ${fontSize.large24};

  span {
    font-size: ${fontSize.large24};
    font-weight: 700;
  }
`;

export default CommentNumAlert;
