import Button from "components/elements/Button";
import React from "react";
import MainCarousel from "./MainCarousel";
import MainList from "./MainList";
import MainSelectBox from "./MainSelectBox";
import styled from "styled-components";

const Main = () => {
  return (
    <StMainWrap>
      <MainCarousel />
    <StMainContainer>
      <MainSelectBox />
    </StMainContainer>
      <MainList />
    </StMainWrap>
  );
};

const StMainWrap=styled.div`
position:relative;
top:64px;
left:0;
width:100%;
`
const StMainContainer=styled.div`
position:sticky;
top:64px;
left:0;

`

export default Main;
