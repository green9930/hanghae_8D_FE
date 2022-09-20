import { useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import DetailCarousel from "components/detail/DetailCarousel";
import DetailDesc from "components/detail/DetailDesc";
import DetailCommentList from "components/detail/DetailCommentList";
import DetailCommentForm from "components/detail/DetailCommentForm";
import LoadingMessage from "components/etc/LoadingMessage";
import { getDetailCheck } from "api/detailApi";
import { detailCheckState } from "state/atom";

const Detail = ({ page }) => {
  const setDetailCheckState = useSetRecoilState(detailCheckState);

  const { isRefetching, isLoading, data } = useQuery(
    ["detailCheck", () => getDetailCheck(page)],
    () => getDetailCheck(page),
    {
      onSuccess: (data) => {
        setDetailCheckState(data.data);
      },
      onError: (error) => console.log("GET DETAILCHECK FAILED", error),
      staleTime: 5000,
    }
  );

  if (isRefetching || isLoading) return <LoadingMessage />;

  const {
    nickName,
    articlesId,
    title,
    content,
    category,
    price,
    selectedPrice,
    isMyArticles,
    userRank,
    process,
    createdAt,
    images,
  } = data.data;

  return (
    <StDetail isMyArticles={isMyArticles}>
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
        selectedPrice={selectedPrice}
        isMyArticles={isMyArticles}
        userRank={userRank}
        process={process}
        createdAt={createdAt}
      />
      <DetailCommentList
        process={process}
        articlesId={page}
        isMyArticles={isMyArticles}
      />
      {process === "진행중" ? (
        <DetailCommentForm isMyArticles={isMyArticles} articlesId={page} />
      ) : null}
    </StDetail>
  );
};

const StDetail = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 100vh;
  padding-top: 64px;
  padding-bottom: 50px;
`;

export default Detail;
