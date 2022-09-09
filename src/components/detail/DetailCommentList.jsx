import styled from "styled-components";
import DetailComment from "components/detail/DetailComment";
import { useQuery } from "react-query";
import { getComments } from "api/detailApi";
import { createRef, useRef } from "react";

const DetailCommentList = ({ process, articlesId }) => {
  const commentRef = useRef(null);
  const commentRefs = [];
  // const comments = [
  //   {
  //     commentsId: 1,
  //     type: "text",
  //     nickName: "하나둘셋",
  //     userRank: "S",
  //     comment: "5천원이요",
  //     createdAt: "0분 전",
  //     isSelected: false,
  //     isMyComment: false,
  //   },
  //   {
  //     commentsId: 2,
  //     type: "text",
  //     nickName: "댓글닉네임",
  //     userRank: "G",
  //     comment:
  //       "실시간으로 경매에 대한 채팅을 입력할 수 있습니다.설명설명설명설명 설명설명설명설명설명설명설명설명설명설",
  //     createdAt: "1시간 전",
  //     isSelected: false,
  //     isMyComment: true,
  //   },
  //   {
  //     commentsId: 3,
  //     type: "price",
  //     nickName: "테스트아이디",
  //     userRank: "B",
  //     comment: "5,000",
  //     createdAt: "30분 전",
  //     isSelected: false,
  //     isMyComment: false,
  //   },
  //   {
  //     commentsId: 4,
  //     type: "price",
  //     nickName: "사용자닉네임",
  //     userRank: "P",
  //     comment: "50,000",
  //     createdAt: "1시간 전",
  //     isSelected: true,
  //     isMyComment: true,
  //   },
  //   {
  //     commentsId: 5,
  //     type: "price",
  //     nickName: "당근당근",
  //     userRank: "D",
  //     comment: "120,000",
  //     createdAt: "1시간 전",
  //     isSelected: false,
  //     isMyComment: false,
  //   },
  // ];
  const { isLoading, data: comments } = useQuery(
    "checkComments",
    () => getComments(articlesId),
    {
      onSuccess: (data) => {
        console.log("GET COMMENTS", data.data);
        // console.log("GET ISMYARTICLES ", data.data.data.isMyArticles);
        console.log(commentRef.current);
        // srcollToBottom();
        // commentRef.current?.scrollIntoView();
        // commentRefs[comments.data.data.comments];
        commentRef.current?.scrollIntoView({
          behavior: "smooth",
        });
      },
    }
  );

  const srcollToBottom = () => {
    if (commentRef.current)
      commentRef.current.scrollTop = commentRef.current.scrollHeight;
  };

  if (isLoading) return null;

  // comments.data.data.comments.forEach(() => {
  //   commentRefs.push(createRef(null));
  // });

  return (
    <div>
      <StCommentList process={process}>
        {comments?.data.comments.map((comment, index, arr) => {
          // console.log(index === arr.length - 1);
          return (
            <li
              key={comment.commentsId}
              // ref={index === arr.length - 1 ? commentRef : null}
            >
              <DetailComment
                commentVal={comment}
                isMyArticles={comments.data.isMyArticles}
              />
              {index === arr.length - 1 ? (
                <>
                  <StDiv></StDiv>
                  <StDiv ref={commentRef}></StDiv>
                </>
              ) : null}
            </li>
          );
        })}
        {/* <StDiv ref={commentRef}></StDiv> */}
      </StCommentList>
    </div>
  );
};

const StCommentList = styled.ul`
  /* height: 100%; */
  /* min-height: 20vh; */
  /* margin-bottom: 100px; */
  padding: ${({ process }) =>
    process === "process" ? `0 35px 26px 35px` : `0 35px 26px 35px`};
`;

const StDiv = styled.div`
  height: 50px;
`;

export default DetailCommentList;
