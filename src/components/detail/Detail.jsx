import styled from "styled-components";
import DetailCarousel from "components/detail/DetailCarousel";
import test01 from "assets/test01.jpg";
import test02 from "assets/test02.jpg";
import test03 from "assets/test03.jpg";
import test04 from "assets/test04.jpg";
import test05 from "assets/test05.jpg";
import DetailDesc from "components/detail/DetailDesc";
import DetailCommentList from "components/detail/DetailCommentList";
import DetailCommentForm from "components/detail/DetailCommentForm";
import { useEffect } from "react";
import { tokenInstance } from "api/axios";

const Detail = () => {
  const data1 = {
    nickName: "김단비",
    articlesId: 2,
    title: "에어팟 얼만가요",
    content:
      "실시간으로 경매에 대한 채팅을 입력할 수 있습니다. 설명설명설명설명설명설명설명설명설명설설명설명설명설명설명설명설명설명설명설설명설명설명설명설명설명설명설명설명설설명설명설명설명설명설명설명설명설명설",
    category: "디지털/생활가전",
    price: "100,000",
    isMyArticles: true,
    userRank: "B",
    process: "done",
    createdAt: "0000.00.00 00:00",
    images: [test01, test02, test03, test04, test05],
  };

  const data2 = {
    nickName: "사용자닉네임",
    articlesId: 3,
    title: "맥북 싸게 팝니다. 보고 가세요.",
    content:
      "설명설명설명설명설명설명설명설명설명설명설명설명 일이삼사오육칠팔구 십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구 십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십",
    category: "디지털/생활가전",
    price: "10,000,000",
    isMyArticles: false,
    userRank: "P",
    process: "process",
    createdAt: "0000.00.00 00:00",
    images: [test01, test02, test03, test04, test05],
  };

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
  } = data2;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await tokenInstance.get(`/api/auth/detail/46`);
        console.log("GET DETAIL : SUCCESS", res);
      } catch (error) {
        console.log("GET DETAIL : FAILED", error);
      }
    };
    fetchData();
  }, []);

  return (
    <StDetail>
      <DetailCarousel
        width="100%"
        height="230px"
        createdAt={createdAt}
        isMyArticles={isMyArticles}
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
          <DetailCommentList process={process} />
        </StCommentList>
        {process === "process" ? (
          <StCommentForm>
            <DetailCommentForm articlesId={articlesId} />
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
