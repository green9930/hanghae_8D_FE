import styled from "styled-components";
import { useEffect, useState } from "react";
import MainListCard from "./MainListCard";
import icons from "assets";
import { useNavigate } from "react-router-dom";
import { getCookie } from "api/cookies";
import { useInfiniteQuery } from "react-query";
import { getMainCheck } from "api/mainApi";
import { useInView } from "react-intersection-observer";
import LoadingMessage from "components/etc/LoadingMessage";
import SelectBox from "components/elements/SelectBox";
import Button from "components/elements/Button";
import { colors } from "styles/theme";

const MainList = () => {
  const { IconPlus } = icons;
  const navigate = useNavigate();

  const onClickHandler = () => {
    getCookie("accessToken") ? navigate("/form") : navigate("/login");
  };

  const [active, setActive] = useState("all");
  const [currentValue, setCurrentValue] = useState("카테고리 전체");
  const [currentCategory, setCurrentCategory] = useState("all");

  let payload = { category: currentCategory, process: active };

  const handleOnChangeSelectValue = (e) => {
    setCurrentValue(e.target.getAttribute("value"));
    setCurrentCategory(e.target.classList[2]);
    payload = { category: e.target.classList[2], process: active };
    remove();
    refetch();
  };
  const handleActiveStatus = (name) => {
    setActive(name);
    payload = { category: currentCategory, process: name };
    remove();
    refetch();
  };
  /* ----------------------------- 카테고리 select-box ---------------------------- */

  const datas = [
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

  /* -------------------------------- 데이터 read -------------------------------- */
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const { data, isFetchingNextPage, fetchNextPage, remove, status, refetch } =
    useInfiniteQuery(
      "[mainCheckList]",
      ({ pageParam = 0 }) => getMainCheck(payload, pageParam),
      {
        refetchOnWindowFocus: false,
        enabled: inView,
        getNextPageParam: (lastPage, allPages) => {
          return lastPage.nextPage;
        },
      }
    );
  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  if (status === "loading") return <LoadingMessage />;
  console.log(data);

  return (
    <StMain>
      <StSelectList>
        <SelectBox
          size={"small"}
          data={datas}
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

      <StMainContainer>
        {data?.pages.map((page, idx) => (
          <div key={idx}>
            {page?.data.data.content.map((d) => {
              return <MainListCard key={d.articlesId} data={d} />;
            })}
          </div>
        ))}
        <div ref={ref} style={{ border: "1px solid white" }}>
          {isFetchingNextPage && <div>로딩 중</div>}
        </div>
        <StIcon onClick={onClickHandler}>
          <IconPlus />
        </StIcon>
      </StMainContainer>
    </StMain>
  );
};

const StMain = styled.div`
  position: relative;
`;
const StSelectList = styled.div`
  position: sticky;
  top: 64px;
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

const StMainContainer = styled.div``;

const StIcon = styled.div`
  position: fixed;
  bottom: 4%;
  left: 80%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 100px;
  width: 50px;
  height: 50px;
`;

export default MainList;
