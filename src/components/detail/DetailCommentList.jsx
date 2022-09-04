import styled from "styled-components";
import DetailComment from "components/detail/DetailComment";

const DetailCommentList = ({ process }) => {
  const isMyArticles = true;
  const comments = [
    {
      commentsId: 1,
      type: "text",
      nickName: "하나둘셋",
      userRank: "S",
      comment: "5천원이요",
      createdAt: "0분 전",
      isSelected: false,
      isMyComment: false,
    },
    {
      commentsId: 2,
      type: "text",
      nickName: "댓글닉네임",
      userRank: "G",
      comment:
        "실시간으로 경매에 대한 채팅을 입력할 수 있습니다.설명설명설명설명 설명설명설명설명설명설명설명설명설명설",
      createdAt: "1시간 전",
      isSelected: false,
      isMyComment: true,
    },
    {
      commentsId: 3,
      type: "price",
      nickName: "테스트아이디",
      userRank: "B",
      comment: "5,000",
      createdAt: "30분 전",
      isSelected: false,
      isMyComment: false,
    },
    {
      commentsId: 4,
      type: "price",
      nickName: "사용자닉네임",
      userRank: "P",
      comment: "50,000",
      createdAt: "1시간 전",
      isSelected: true,
      isMyComment: true,
    },
    {
      commentsId: 5,
      type: "price",
      nickName: "당근당근",
      userRank: "D",
      comment: "120,000",
      createdAt: "1시간 전",
      isSelected: false,
      isMyComment: false,
    },
  ];

  return (
    <StCommentList process={process}>
      {comments.map((comment) => (
        <li key={comment.commentsId}>
          <DetailComment commentVal={comment} isMyArticles={isMyArticles} />
        </li>
      ))}
    </StCommentList>
  );
};

const StCommentList = styled.ul`
  height: 100%;
  padding: ${({ process }) =>
    process === "process" ? `0 35px 120px 35px` : `0 35px 26px 35px`}
  };
`;

export default DetailCommentList;
