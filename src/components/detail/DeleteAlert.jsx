import styled from "styled-components";
import Button from "components/elements/Button";
import { colors, fontSize } from "styles/theme";
import icons from "assets";

const DeleteAlert = ({ handleOpenModal }) => {
  const { IconTrash } = icons;

  const handleDelete = () => {
    console.log("DELETE COMMENT");
    handleOpenModal();
  };

  return (
    <StDeleteAlert>
      <StMessage>
        <IconTrash width="40px" height="40px" fill={`${colors.mainP}`} />
        <span>정말 삭제하시겠어요?</span>
      </StMessage>
      <StButton>
        <Button theme="grey" onClickHandler={handleDelete}>
          삭제하기
        </Button>
        <Button onClickHandler={handleOpenModal}>아니오</Button>
      </StButton>
    </StDeleteAlert>
  );
};

const StDeleteAlert = styled.div`
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
  gap: 22px;
  padding-top: 10px;

  span {
    display: inline-block;
    text-align: center;
    font-size: ${fontSize.large24};
  }
`;

const StButton = styled.div`
  display: flex;
`;

export default DeleteAlert;
