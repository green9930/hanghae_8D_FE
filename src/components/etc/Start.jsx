import React from "react";
import styled from "styled-components";
import icons from "assets";
import { colors } from "styles/theme";

const Start = () => {
  const { HeaderLogo } = icons;
  return (
    <StStart>
      <HeaderLogo />
      <p>
        얼마에 팔지?
        <br />
        여기서 <span>CHECK</span>하자!
      </p>
      <StCopyright>ⓒ 항해 8기 2조</StCopyright>
    </StStart>
  );
};

const StStart = styled.div`
  position: relative;
  background-color: ${colors.mainP};
  height: 100vh;
  padding-top: 50%;

  svg {
    width: 199px;
    height: 199px;
    display: block;
    margin: auto;
  }

  p {
    font-size: 32px;
    line-height: 39px;
    letter-spacing: -0.5px;
    font-family: "twayfly", "Noto Sans KR", sans-serif;
    color: ${colors.white};
    text-align: center;
    margin-top: 30px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    span {
      color: ${colors.mainO};
      font-size: 32px;
      line-height: 39px;
      letter-spacing: -0.5px;
      font-family: "twayfly", "Noto Sans KR", sans-serif;
    }
  }
`;

const StCopyright = styled.span`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  color: ${colors.grey4};
  font-weight: 400;
`;

export default Start;
