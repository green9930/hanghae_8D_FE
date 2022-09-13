import SelectBox from "components/elements/SelectBox";
import styled from "styled-components";
import Button from "components/elements/Button";
import { useEffect, useState } from "react";
import { colors } from "styles/theme";
import { useRecoilState, useResetRecoilState } from "recoil";
import { selectionState } from "state/atom";
import { useInfiniteQuery, useQueryClient } from "react-query";
import { getMainCheck } from "api/mainApi";

const MainSelectBox = () => {
  const [selection, setSelection] = useRecoilState(selectionState);

  const [active, setActive] = useState("all");
  const [currentValue, setCurrentValue] = useState("카테고리 전체");

  const payload = { category: selection.category, process: selection.process };

  const { refetch } = useInfiniteQuery(
    "[mainCheckList]",
    ({ pageParam = 1 }) => getMainCheck(payload, pageParam),
    {
      refetchOnWindowFocus: false,

      getNextPageParam: (lastPage, allPages) => {
        return lastPage.nextPage;
      },
    }
  );

  const resetList = useResetRecoilState(selectionState);

  const handleOnChangeSelectValue = (e) => {
    setCurrentValue(e.target.getAttribute("value"));
    setSelection({
      process: selection.process,
      category: e.target.classList[2],
    });
  };
  const handleActiveStatus = (name) => {
    setActive(name);
    setSelection({ category: selection.category, process: name });
  };
  useEffect(() => {
    refetch();
    // return resetList;
  }, [refetch, resetList, active, currentValue]);

  /* ----------------------------- 카테고리 select-box ---------------------------- */

  const data = [
    { key: 1, value: "전체", category: "all" },
    { key: 2, value: "디지털/생활가전", category: "digital" },
    { key: 3, value: "의류/잡화", category: "clothes" },
    { key: 4, value: "스포츠/레저", category: "sports" },
    { key: 5, value: "가구/인테리어", category: "interior" },
    { key: 6, value: "도서/여행/취미", category: "hobby" },
    { key: 7, value: "반려동물/식물", category: "pet" },
    { key: 8, value: "식품", category: "food" },
    { key: 9, value: "기타", category: "etc" },
  ];
  return (
    <StSelectList>
      <SelectBox
        size={"small"}
        data={data}
        currentValue={currentValue}
        handleOnChangeSelectValue={handleOnChangeSelectValue}
      />
      <StMainBtns>
        <StAllBtn active={active} name="all">
          <Button
            children={"전체 보기"}
            size={"small_round"}
            theme={"p_outline"}
            name="all"
            onClickHandler={() => handleActiveStatus("all")}
          />
        </StAllBtn>
        <StProcessBtn active={active} name="process">
          <Button
            children={"진행중"}
            size={"small_round"}
            theme={"p_outline"}
            name="process"
            onClickHandler={() => handleActiveStatus("process")}
          />
        </StProcessBtn>
        <StDoneBtn active={active} name="done">
          <Button
            children={"완료"}
            size={"small_round"}
            theme={"p_outline"}
            name="done"
            onClickHandler={() => handleActiveStatus("done")}
          />
        </StDoneBtn>
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
  background-color: ${colors.grey7};
`;

const StMainBtns = styled.div`
  display: flex;
  gap: 4px;
  button {
    font-family: "twayfly", "Noto Sans KR", sans-serif;
  }
`;
const StAllBtn = styled.div`
  button {
    background: ${({ active, name }) => {
      return active === name ? `${colors.mainP}` : `${colors.white}`;
    }};
    color: ${({ active, name }) => {
      return active === name ? `${colors.white}` : `${colors.mainP}`;
    }};
  }
`;

const StProcessBtn = styled.div`
  button {
    background: ${({ active, name }) => {
      return active === name ? `${colors.mainP}` : `${colors.white}`;
    }};
    color: ${({ active, name }) => {
      return active === name ? `${colors.white}` : `${colors.mainP}`;
    }};
  }
`;

const StDoneBtn = styled.div`
  button {
    background: ${({ active, name }) => {
      return active === name ? `${colors.mainP}` : `${colors.white}`;
    }};
    color: ${({ active, name }) => {
      return active === name ? `${colors.white}` : `${colors.mainP}`;
    }};
  }
`;

export default MainSelectBox;
