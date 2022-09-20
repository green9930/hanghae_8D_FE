import styled from "styled-components";
import Button from "components/elements/Button";
import { colors, fontSize } from "styles/theme";
import icons from "assets";

const CommentNumAlert = ({ errorData, handleOpenModal }) => {
  const { IconOops } = icons;

  return (
    <StCommentNumAlert>
      <StMessage>
        <IconOops width="40px" height="40px" fill={`${colors.mainP}`} />
        <StSelectMessage>{errorData.errorMessage}🤓</StSelectMessage>
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
  padding: 10px 45px 0 45px;
`;

const StSelectMessage = styled.span`
  text-align: center;
  font-size: ${fontSize.large22};
`;

export default CommentNumAlert;
