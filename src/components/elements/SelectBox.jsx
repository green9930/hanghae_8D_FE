import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import icons from "assets";

const SelectBox = ({ data, size }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [currentValue, setCurrentValue] = useState(
    size === "small" ? "카테고리 전체" : "카테고리를 선택해 주세요."
  );

  const { IconArrow } = icons;

  const handleOnChangeSelectValue = (e) => {
    setCurrentValue(e.target.getAttribute("value"));
  };

  const modalRef = useRef();

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
        {currentValue}
      </StLabel>
      <StSelectOptions size={size} show={showOptions}>
        {data.map((d) => (
          <StOption
            size={size}
            key={d.key}
            value={d.value}
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
  padding: 12px 35px;
  text-align: center;
  background-color: #ffffff;
  align-self: center;
  border: 0.5px solid #999999;
  border-radius: 5px;
  height: 40px;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) => {
    return (
      props.size === "small" &&
      css`
        height: 24px;
        border-radius: 30px;
        width: 115px;
        border: 1px solid #9083f7;
        padding: 3px 5px;
      `
    );
  }}
`;
const StArrow = styled.div`
  position: absolute;
  top: 50%;
  left: 5%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  ${(props) => {
    return (
      props.size === "small" &&
      css`
        left: 10%;
        top: 50%;
      `
    );
  }}
`;
const StLabel = styled.label`
  font-size: 16px;
  letter-spacing: -0.5px;
  text-align: center;
  color: ${(props) =>
    props.currentValue === "카테고리를 선택해 주세요." ? "gray" : "black"};
  ${(props) => {
    return (
      props.size === "small" &&
      css`
        color: ${(props) =>
          props.currentValue === "카테고리 전체" ? "gray" : "black"};
        font-size: 12px;
        padding-left: 11px;
      `
    );
  }};
`;

const StSelectOptions = styled.ul`
  position: absolute;
  list-style: none;
  top: 100%;
  left: 50%;
  transform: translate(-50%, 0%);
  width: 100%;
  overflow: scroll;
  height: 190px;
  max-height: ${(props) => (props.show ? "none" : "0")};
  padding: 0;
  border-radius: 8px;
  background-color: #ffffff;
  color: #333333;
  border: ${(props) => (props.show ? "0.5px solid #999999" : 0)};
  ${(props) => {
    return (
      props.size === "small" &&
      css`
        top: 23px;
        height: 100px;
        width: 115px;
        border: ${(props) => (props.show ? " 1px solid #9083f7" : 0)};
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
  ${(props) => {
    return (
      props.size === "small" &&
      css`
        padding: 6px 10px;
        font-size: 12px;
      `
    );
  }}
`;

export default SelectBox;
