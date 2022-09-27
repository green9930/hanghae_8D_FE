import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "components/elements/Button";
import { deleteAlertList } from "api/alarmApi";
import { colors, fontSize } from "styles/theme";
import icons from "assets";

const AlarmCard = ({ alarmItem }) => {
  const { notificationId, title, createdAt, alarmType, articlesId } = alarmItem;
  const { IconX } = icons;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  /* ------------------------------- 데이터 delete ------------------------------- */
  const { mutate: deleteAlert } = useMutation(deleteAlertList, {
    onSuccess: () => queryClient.invalidateQueries("alertLists"),
  });

  const handleDelete = (id) => deleteAlert(id);
  const onClickNavigate = () => navigate(`/detail/${articlesId}`);

  return (
    <StAlarmCard>
      {alarmType === "comment" && (
        <StContent>
          <StTitle onClick={onClickNavigate}>
            {title.length < 10 ? title : title.slice(0, 10) + "⋯"}
          </StTitle>
          <StText>
            에 <StMessage type={alarmType}>댓글</StMessage>이 달렸습니다.
          </StText>
          <StSubInfo>
            <StTime>{createdAt}</StTime>
            <Button
              variant="image"
              onClickHandler={() => handleDelete(notificationId)}
            >
              <IconX stroke={colors.grey2} />
            </Button>
          </StSubInfo>
        </StContent>
      )}
      {alarmType === "selected" && (
        <StContent>
          <StTitle onClick={onClickNavigate}>
            {title.length < 10 ? title : title.slice(0, 10) + "⋯"}
          </StTitle>
          <StText>
            에 댓글이 <StMessage type={alarmType}>채택</StMessage>되었습니다.
          </StText>
          <StSubInfo>
            <StTime>{createdAt}</StTime>
            <Button
              variant="image"
              onClickHandler={() => handleDelete(notificationId)}
            >
              <IconX stroke={colors.grey2} />
            </Button>
          </StSubInfo>
        </StContent>
      )}
    </StAlarmCard>
  );
};

const StAlarmCard = styled.div`
  padding: 10px 0px;
`;

const StContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StTitle = styled.span`
  color: ${colors.black};
  font-size: ${fontSize.small12};
  font-weight: 700;
  letter-spacing: -0.03em;
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
`;

const StMessage = styled.span`
  font-size: ${fontSize.small12};
  font-weight: 700;
  letter-spacing: -0.03em;
  color: ${({ type }) =>
    type === "comment" ? `${colors.grey1}` : `${colors.mainP}`};
`;

const StTime = styled.span`
  color: ${colors.grey3};
  font-size: ${fontSize.small12};
  letter-spacing: -0.03em;
`;

export default AlarmCard;
