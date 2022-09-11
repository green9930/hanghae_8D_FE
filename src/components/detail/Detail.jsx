import styled from "styled-components";
import DetailCarousel from "components/detail/DetailCarousel";
import DetailDesc from "components/detail/DetailDesc";
import DetailCommentList from "components/detail/DetailCommentList";
import DetailCommentForm from "components/detail/DetailCommentForm";
import { useQuery } from "react-query";
import { getDetailCheck } from "api/detailApi";
import LoadingMessage from "components/etc/LoadingMessage";

const Detail = ({ page }) => {
  const { isLoading, data } = useQuery(
    "detailCheck",
    () => getDetailCheck(page),
    {
      onSuccess: (data) => {
        console.log("GET DETAIL CHECK", data);
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
      <DetailCarousel
        width="100%"
        height="230px"
        createdAt={createdAt}
        isMyArticles={isMyArticles}
        articlesId={articlesId}
      >
        {images}
      </DetailCarousel>
      <DetailDesc
        nickName={nickName}
        articlesId={articlesId}
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
            <DetailCommentForm
              isMyArticles={isMyArticles}
              articlesId={articlesId}
            />
          </StCommentForm>
        ) : null}
      </StCommment>
    </StDetail>
  );
};

const StDetail = styled.div`
  display: flex;
  flex-direction: column;
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
`;

export default Detail;
