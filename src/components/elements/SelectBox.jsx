import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { colors } from "styles/theme";
import icons from "assets";

const SelectBox = ({ data, size, currentValue, handleOnChangeSelectValue }) => {
  const [showOptions, setShowOptions] = useState(false);
  const modalRef = useRef();

  const { IconArrow } = icons;

  useEffect(() => {
    document.addEventListener("mousedown", clickModalOutside);
    return () => {
      document.removeEventListener("mousedown", clickModalOutside);
    };
  });

  const clickModalOutside = (event) => {
    if (showOptions && !modalRef.current.contains(event.target)) {
      setShowOptions(false);
    }
  };

  return (
    <StSelectBox
      onClick={() => setShowOptions((prev) => !prev)}
      ref={modalRef}
      size={size}
    >
      <StArrow size={size}>
        <IconArrow
          width={size === "small" ? "14px" : "20px"}
          height={size === "small" ? "14px" : "20px"}
        />
      </StArrow>
      <StLabel size={size} currentValue={currentValue}>
        <span>{currentValue}</span>
      </StLabel>
      <StSelectOptions size={size} show={showOptions}>
        {data.map((d) => (
          <StOption
            size={size}
            key={d.key}
            value={d.value}
            className={d.category}
            onClick={handleOnChangeSelectValue}
          >
            {d.value}
          </StOption>
        ))}
      </StSelectOptions>
    </StSelectBox>
  );
};

const StSelectBox = styled.div`
  position: relative;
  width: 100%;
  padding: 12px 35px 12px 15px;
  text-align: center;
  background-color: ${colors.white};
  border: 0.5px solid ${colors.grey3};
  border-radius: 5px;
  height: 40px;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  ${({ size }) => {
    return (
      size === "small" &&
      css`
        height: 24px;
        border-radius: 30px;
        width: 120px;
        border: 1px solid ${colors.grey3};
        padding: 3px 5px;
      `
    );
  }}
`;
const StArrow = styled.div`
  padding-left: 10px;
  ${({ size }) => {
    return (
      size === "small" &&
      css`
        padding-left: 0;
      `
    );
  }}
`;

const StLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  padding-right: 10px;

  span {
    text-align: center;
    font-size: 16px;
    letter-spacing: -0.5px;
    color: ${({ currentValue }) =>
      currentValue === "카테고리를 선택해 주세요."
        ? `${colors.grey3}`
        : `${colors.black}`};
    ${({ size }) => {
      return (
        size === "small" &&
        css`
          color: ${({ currentValue }) =>
            currentValue === "카테고리 전체"
              ? `${colors.grey3}`
              : `${colors.black}`};
          font-size: 12px;
          padding-right: 4px;
          font-family: "twayfly", "Noto Sans KR", sans-serif;
        `
      );
    }};
  }
`;

const StSelectOptions = styled.ul`
  position: absolute;
  list-style: none;
  top: 100%;
  left: 50%;
  transform: translate(-50%, 0%);
  overflow: scroll;
  width: 100%;
  height: 190px;
  max-height: ${({ show }) => (show ? "none" : "0")};
  padding: 0;
  background-color: ${colors.white};
  color: ${colors.grey1};
  border: ${({ show }) => (show ? `0.5px solid ${colors.grey3}` : 0)};
  border-radius: 8px;
  ${({ size }) => {
    return (
      size === "small" &&
      css`
        top: 23px;
        height: 100px;
        width: 120px;
        border: ${({ show }) => (show ? ` 1px solid ${colors.grey3}` : 0)};
      `
    );
  }};
`;

const StOption = styled.li`
  padding: 12px 35px;
  font-size: 16px;
  text-align: center;
  letter-spacing: -0.5px;
  &:hover {
    font-weight: 600;
  }
  ${({ size }) => {
    return (
      size === "small" &&
      css`
        padding: 6px 10px;
        font-size: 12px;
        font-family: "twayfly", "Noto Sans KR", sans-serif;
      `
    );
  }}
`;

export default SelectBox;
