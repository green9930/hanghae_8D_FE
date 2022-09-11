import styled from "styled-components";
import DetailComment from "components/detail/DetailComment";
import { useQuery } from "react-query";
import { getComments } from "api/detailApi";
import { createRef, useRef } from "react";

const DetailCommentList = ({ process, articlesId }) => {
  const commentRef = useRef(null);
  const commentRefs = [];

  console.log("GET COMMENTS ARTICLESID", articlesId);

  const { isLoading, data: comments } = useQuery(
    "checkComments",
    () => getComments(articlesId),
    {
      onSuccess: (data) => {
        console.log("GET COMMENTS", data.data);
        // console.log("GET ISMYARTICLES ", data.data.data.isMyArticles);
        // console.log(commentRef.current);
        // srcollToBottom();
        // commentRef.current?.scrollIntoView();
        // commentRefs[comments.data.data.comments];
        // commentRef.current?.scrollIntoView({
        //   behavior: "smooth",
        // });
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
                articlesId={articlesId}
              />
              {/* {index === arr.length - 1 ? (
                <>
                  <StDiv></StDiv>
                  <StDiv ref={commentRef}></StDiv>
                </>
              ) : null} */}
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
    process === "진행중" ? `0 35px 110px 35px` : `0 35px 26px 35px`};
`;

const StDiv = styled.div`
  height: 50px;
`;

export default DetailCommentList;
