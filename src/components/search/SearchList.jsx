import Button from "components/elements/Button";
import Input from "components/elements/Input";
import React from "react";
import styled from "styled-components";
import { colors } from "styles/theme";
import icons from "assets";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import test01 from "assets/geuna.png";
import test02 from "assets/memoji.png";
import MainListCard from "components/main/MainListCard";

const SearchList = () => {
  const { PrevLogo } = icons;
  const navigate = useNavigate();
  const [item, setItem] = useState("");
  const onSubmitHandler = () => {};
  const changeHandler = (e) => {
    setItem(e.target.value);
  };

  const datas = [
    {
      articlesId: 1,
      nickName: "홍창형",
      process: "진행중",
      title: "에어팟 중고",
      price: "79,000",
      image: test01,
      userRank: "B",
      commentCount: 5,
    },
    {
      articlesId: 2,
      nickName: "김단비",
      process: "진행 완료",
      selectedPrice: "120,000",
      title: "맥북",
      price: "100,000",
      image: test02,
      userRank: "D",
      commentCount: 5,
    },
  ];

  return (
    <StSearchList>
      <StSearchHeader>
        <Button
          variant="image"
          name="prevLogo"
          onClickHandler={() => navigate(-1)}
        >
          <PrevLogo />
        </Button>
        <StSearchForm onSubmit={onSubmitHandler}>
          <Input
            onChangeHandler={changeHandler}
            theme="search"
            value={item}
            placeholder="무엇을 찾고 계신가요?"
          />
          <Button size="small_box" variant="text" children="검색" />
        </StSearchForm>
      </StSearchHeader>

      {datas?.map((data) => (
        <MainListCard key={data.articlesId} data={data} />
      ))}
    </StSearchList>
  );
};

const StSearchList = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${colors.white};
  @media screen and (min-width: 950px) {
    width: 500px;
  }
`;
const StSearchHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  justify-content: space-between;
  height: 64px;
  padding: 0 20px;
`;
const StSearchForm = styled.form`
  display: flex;
  align-items: center;
  flex-grow: 1;
  gap: 10px;
  div {
    flex-grow: 1;
  }
`;
export default SearchList;
