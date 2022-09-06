import SelectBox from "components/elements/SelectBox";
import styled from "styled-components";
import Button from "components/elements/Button";
import { useState } from "react";
import { colors } from "styles/theme";
const MainSelectBox = () => {
  const [currentValue, setCurrentValue] = useState("카테고리 전체");
  const handleOnChangeSelectValue = (e) => {
    setCurrentValue(e.target.getAttribute("value"));
  };

  const onClickProgress=()=>{

  }
  const onClickDone=()=>{

  }
  console.log(currentValue)
  
  /* ----------------------------- 카테고리 select-box ---------------------------- */

  const data = [
    { key: 1, value: "디지털/생활가전" },
    { key: 2, value: "의류/잡화" },
    { key: 3, value: "스포츠/레저" },
    { key: 4, value: "가구/인테리어" },
    { key: 5, value: "도서/여행/취미" },
    { key: 6, value: "반려동물/식물" },
    { key: 7, value: "식품" },
    { key: 8, value: "기타" },
  ];
  return (
    <StSelectList>
      <SelectBox 
      size={"small"} 
      data={data} 
      currentValue={currentValue} 
      handleOnChangeSelectValue ={handleOnChangeSelectValue}
      />
      <StMainBtns>
        <Button
          children={"전체 보기"}
          size={"small_round"}
          theme={"p_outline"}
        />
        <Button children={"진행중"} size={"small_round"} theme={"p_outline"} onClickHandler={onClickProgress}/>
        <Button children={"완료"} size={"small_round"} theme={"p_outline"} onClickHandler={onClickDone}/>
      </StMainBtns>
    </StSelectList>
  );
};
const StSelectList = styled.div`
  display: flex;
  height: 55px;
  gap: 13px;
  justify-content: center;
  align-items: center;
  background-color:${colors.grey7};
`;

const StMainBtns = styled.div`
  display: flex;
  gap: 4px;
  button{
    font-family: 'twayfly', 'Noto Sans KR', sans-serif
  }
`;

export default MainSelectBox;
