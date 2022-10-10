import styled from "styled-components";
import Button from "components/elements/Button";
import { colors, fontSize } from "styles/theme";
import icons from "assets";

const SelectAlert = ({
  isConfirmedSelect,
  nickName,
  handleSelectComment,
  handleOpenModal,
}) => {
  const { MainArrow } = icons;

  return (
    <>
      {isConfirmedSelect ? (
        <StSelectAlert>
          <StMessage>
            <MainArrow width="40px" height="40px" fill={`${colors.mainP}`} />
            <StSelectMessage>
              <SeSelectName>{nickName}</SeSelectName>님을 <br /> 채택하셨습니다.
              🤗
            </StSelectMessage>
          </StMessage>
          <Button onClickHandler={handleOpenModal}>닫기</Button>
        </StSelectAlert>
      ) : (
        <StSelectAlert>
          <StMessage>
            <MainArrow width="40px" height="40px" fill={`${colors.mainP}`} />
            <StConfirmMessage>
              채택하면 취소하거나 게시글을 <br />
              수정 또는 삭제할 수 없습니다. <br />
              <span>채택하시겠습니까?</span>
            </StConfirmMessage>
          </StMessage>
          <StButton>
            <Button onClickHandler={handleSelectComment}>채택하기</Button>
            <Button theme="grey" onClickHandler={handleOpenModal}>
              아니오
            </Button>
          </StButton>
        </StSelectAlert>
      )}
    </>
  );
};

const StSelectAlert = styled.div`
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
  font-size: ${fontSize.large20};
`;

const SeSelectName = styled.span`
  font-size: ${fontSize.large20};
  font-weight: 700;
`;

const StConfirmMessage = styled.span`
  text-align: center;
  line-height: 1.2;
  font-size: ${fontSize.regular16};

  span {
    display: inline-block;
    margin-top: 8px;
    font-size: ${fontSize.regular18};
  }
`;

const StButton = styled.div`
  display: flex;
`;

export default SelectAlert;
