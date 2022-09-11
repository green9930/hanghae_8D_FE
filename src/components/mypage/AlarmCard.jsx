import icons from "assets";
import Button from "components/elements/Button";
import styled from "styled-components";
import { colors, fontSize } from "styles/theme";

const AlarmCard = ({ alarmItem }) => {
  const { alarmId, title, createdAt, type } = alarmItem;
  const { IconX } = icons;

  const handleDelete = () => {
    console.log("DELETE ALARM");
  };

  return (
    <StAlarmCard>
      {type === "content" && (
        <StContent>
          <StTitle>{title}</StTitle>
          <StText>
            에 <StMessage>댓글</StMessage>이 달렸습니다.
          </StText>
          <StSubInfo>
            <StTime>{createdAt}</StTime>
            <Button variant="image" onClickHandler={handleDelete}>
              <IconX />
            </Button>
          </StSubInfo>
        </StContent>
      )}
      {type === "comment" && (
        <StContent>
          <StTitle>{title}</StTitle>
          <StText>
            에 댓글이 <StMessage type={type}>채택</StMessage>되었습니다.
          </StText>
          <StSubInfo>
            <StTime>{createdAt}</StTime>
            <Button variant="image" onClickHandler={handleDelete}>
              <IconX />
            </Button>
          </StSubInfo>
        </StContent>
      )}
    </StAlarmCard>
  );
};

const StAlarmCard = styled.div`
  padding: 10px 0;
`;

const StContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StTitle = styled.span`
  color: ${colors.black};
  font-weight: 700;
  font-size: ${fontSize.small12};
  letter-spacing: -0.03em;
  width: 82px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const StText = styled.span`
  flex-grow: 1;
  color: ${colors.grey1};
  font-size: ${fontSize.small12};
  letter-spacing: -0.03em;
`;

const StSubInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;

  button {
    color: ${colors.grey2};
  }
`;

const StMessage = styled.span`
  font-weight: 700;
  font-size: ${fontSize.small12};
  letter-spacing: -0.03em;
  color: ${({ type }) =>
    type === "comment" ? `${colors.mainP}` : `${colors.grey1}`};
`;

const StTime = styled.span`
  color: ${colors.grey3};
  font-size: ${fontSize.small12};
  letter-spacing: -0.03em;
`;

export default AlarmCard;
