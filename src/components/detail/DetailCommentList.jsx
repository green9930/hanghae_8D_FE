import styled from "styled-components";
import DetailComment from "components/detail/DetailComment";

const DetailCommentList = () => {
  const comments = [
    {
      commentsId: 1,
      type: "text",
      nickName: "하나둘셋",
      userRank: "Silver",
      comment: "5천원이요",
      createdAt: "0분 전",
    },
    {
      commentsId: 2,
      type: "text",
      nickName: "댓글닉네임",
      userRank: "Gold",
      comment:
        "실시간으로 경매에 대한 채팅을 입력할 수 있습니다.설명설명설명설명 설명설명설명설명설명설명설명설명설명설",
      createdAt: "1시간 전",
    },
    {
      commentsId: 3,
      type: "price",
      nickName: "둘셋넷",
      userRank: "Bronze",
      comment: "5,000",
      createdAt: "30분 전",
    },
    {
      commentsId: 4,
      type: "price",
      nickName: "둘셋넷",
      userRank: "Bronze",
      comment: "50,000",
      createdAt: "1시간 전",
    },
  ];

  return (
    <StCommentList>
      {comments.map((comment) => (
        <li key={comment.commentsId}>
          <DetailComment commentVal={comment} />
        </li>
      ))}
    </StCommentList>
  );
};

const StCommentList = styled.ul`
  height: 100%;
  padding: 0 35px;
  background: pink;
`;

export default DetailCommentList;
