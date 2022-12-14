import { useEffect, useRef } from "react";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import DetailComment from "components/detail/DetailComment";
import { getComments } from "api/detailApi";
import { commentRefState } from "state/atom";
import { colors } from "styles/theme";

const DetailCommentList = ({ process, articlesId, isMyArticles }) => {
  const commentRef = useRef();
  const mountRef = useRef(false);

  const [refState, setRefState] = useRecoilState(commentRefState);

  /* 댓글 GET ------------------------------------------------------------------- */
  const {
    isRefetching,
    isLoading,
    data: comments,
  } = useQuery("checkComments", () => getComments(articlesId), {
    onError: () => {},
  });

  const scrollToBottom = () => {
    // 댓글 작성 시 목록 하단 포커스
    if (commentRef.current)
      commentRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    mountRef.current = false;
    setRefState(false);
  }, []);

  useEffect(() => {
    mountRef.current && refState ? scrollToBottom() : (mountRef.current = true);
  }, [comments]);

  if (isRefetching || isLoading) return null;
  // isRefetching || isLoading : 댓글 로딩 중 이전 게시글이 일시적으로 보이는 문제 방지

  return (
    <StCommentList process={process} isMyArticles={isMyArticles}>
      {comments?.data.comments.map((comment) => (
        <li key={comment.commentsId}>
          <DetailComment
            commentVal={comment}
            isMyArticles={comments.data.isMyArticles}
            articlesId={articlesId}
            process={process}
          />
        </li>
      ))}
      <div ref={mountRef.current && refState ? commentRef : null}></div>
    </StCommentList>
  );
};

const StCommentList = styled.ul`
  padding: ${({ isMyArticles }) =>
    isMyArticles ? "0 35px 16px 35px" : "0 35px 60px 35px"};
  display: flex;
  flex-direction: column;
  background: ${colors.white};
`;

export default DetailCommentList;
