import SelectBox from "components/elements/SelectBox";
import styled from "styled-components";
import Button from "components/elements/Button";
const MainSelectBox = () => {
  /* ----------------------------- 카테고리 select-box ---------------------------- */

  const data = [
    { key: 1, value: "", placeholder: "카테고리 전체" },
    { key: 2, value: "디지털/생활가전" },
    { key: 3, value: "의류/잡화" },
    { key: 4, value: "스포츠/레저" },
    { key: 5, value: "가구/인테리어" },
    { key: 6, value: "도서/여행/취미" },
    { key: 7, value: "반려동물,반려식물" },
    { key: 8, value: "식품" },
    { key: 9, value: "기타" },
  ];
  return (
    <StSelectList>
      <SelectBox
        data={data}
        width={"115px"}
        height={"24px"}
        borderRadius={"30px"}
        fontSize={"14px"}
      />
      <StMainBtns>
        <Button children={"전체 보기"} />
        <Button children={"진행중"} />
        <Button children={"완료"} />
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
`;

const StMainBtns = styled.div`
  display: flex;
  gap: 4px;
`;

export default MainSelectBox;
