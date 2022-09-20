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
import { useEffect, useMemo, useState } from "react";

const Detail = ({ page }) => {
  const setDetailCheckState = useSetRecoilState(detailCheckState);
  const [isScrolled, setIsScrolled] = useState(false);

  const { isRefetching, isLoading, data } = useQuery(
    ["detailCheck", () => getDetailCheck(page)],
    () => getDetailCheck(page),
    {
      onSuccess: (data) => {
        setDetailCheckState(data.data);
      },
      onError: (error) => console.log("ERROR!!", error),
      staleTime: 5000,
    }
  );

  const onScrollHandler = () => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    clientHeight + scrollTop >= scrollHeight && setIsScrolled(true);
    console.log("SCROLLED");
    console.log(scrollHeight, scrollTop, clientHeight);
    console.log(clientHeight + scrollTop >= scrollHeight);
  };

  useEffect(() => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    console.log("SCROLLED");
    console.log(scrollHeight, scrollTop, clientHeight);
  }, []);

  // useEffect(() => {
  //   window.addEventListener("scroll", onScrollHandler);
  //   return () => {
  //     window.removeEventListener("scroll", onScrollHandler);
  //   };
  // }, [isScrolled]);

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
    <StDetail>
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
      <StCommment>
        <StCommentList>
          <DetailCommentList
            process={process}
            articlesId={page}
            isMyArticles={isMyArticles}
          />
        </StCommentList>
        {process === "진행중" ? (
          <DetailCommentForm
            isMyArticles={isMyArticles}
            articlesId={page}
            isScrolled={isScrolled}
          />
        ) : null}
      </StCommment>
    </StDetail>
  );
};

const StDetail = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 64px;
  min-height: 100vh;
  height: 100%;
`;

const StCommment = styled.div`
  position: relative;
`;

const StCommentList = styled.div`
  min-height: 173px;
`;

export default Detail;
