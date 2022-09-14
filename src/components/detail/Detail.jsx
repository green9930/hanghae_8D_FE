import styled from "styled-components";
import DetailCarousel from "components/detail/DetailCarousel";
import DetailDesc from "components/detail/DetailDesc";
import DetailCommentList from "components/detail/DetailCommentList";
import DetailCommentForm from "components/detail/DetailCommentForm";
import { useQuery } from "react-query";
import { getDetailCheck } from "api/detailApi";
import LoadingMessage from "components/etc/LoadingMessage";
import { useRecoilState, useSetRecoilState } from "recoil";
import { commentScrollState, detailCheckState } from "state/atom";
import { useRef } from "react";
import { useEffect } from "react";
// import { Suspense } from "react";

const Detail = ({ page }) => {
  const commentRef = useRef();
  const [commentScroll, setCommentScroll] = useRecoilState(commentScrollState);

  const setDetailCheckState = useSetRecoilState(detailCheckState);
  const { isLoading, data } = useQuery(
    "detailCheck",
    () => getDetailCheck(page),
    {
      onSuccess: (data) => {
        console.log("GET DETAIL CHECK", data.data);
        setDetailCheckState(data.data);
      },
      staleTime: 0,
    }
  );

  if (isLoading) return <LoadingMessage />;

  const {
    nickName,
    articlesId,
    title,
    content,
    category,
    price,
    isMyArticles,
    userRank,
    process,
    createdAt,
    images,
  } = data.data;

  return (
    <StDetail>
      {/* // <StDetail ref={commentScroll ? commentRef : null}> */}
      <DetailCarousel
        width="100%"
        height="230px"
        createdAt={createdAt}
        isMyArticles={isMyArticles}
        articlesId={page}
        process={process}
      >
        {images}
      </DetailCarousel>
      <DetailDesc
        nickName={nickName}
        articlesId={page}
        title={title}
        content={content}
        category={category}
        price={price}
        isMyArticles={isMyArticles}
        userRank={userRank}
        process={process}
        createdAt={createdAt}
      />
      <StCommment>
        <StCommentList>
          <DetailCommentList process={process} articlesId={page} />
        </StCommentList>
        {process === "진행중" ? (
          <StCommentForm>
            <DetailCommentForm isMyArticles={isMyArticles} articlesId={page} />
          </StCommentForm>
        ) : null}
      </StCommment>
    </StDetail>
  );
};

const StDetail = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  top: 64px;
  margin-bottom: 174px;
`;

const StCommment = styled.div`
  position: relative;
`;

const StCommentList = styled.div`
  flex-grow: 1;
`;

const StCommentForm = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 110px;
`;

export default Detail;
