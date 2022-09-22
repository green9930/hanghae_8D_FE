import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
import Button from "components/elements/Button";
import SelectBox from "components/elements/SelectBox";
import MainListCard from "components/main/MainListCard";
import { getMainCheck } from "api/mainApi";
import { getCookie } from "api/cookies";
import { colors } from "styles/theme";
import icons from "assets";
import { fontSize } from "styles/theme";

const MainList = () => {
  const { IconPlus, GoBack } = icons;
  const navigate = useNavigate();

  const onClickHandler = () => {
    getCookie("accessToken") ? navigate("/form") : navigate("/login");
  };
  const onClickScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  /* --------------------------------- 카테고리 선택 -------------------------------- */
  const [active, setActive] = useState("all");
  const [currentValue, setCurrentValue] = useState("카테고리 전체");
  const [currentCategory, setCurrentCategory] = useState("all");

  let payload = { category: currentCategory, process: active };

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

  /* ------------------------------- goToTop 버튼 ------------------------------- */
  const [scrollPosition, setScrollPosition] = useState(0);
  const updateScroll = () => {
    setScrollPosition(window.scrollY);
  };
  console.log(scrollPosition);
  useEffect(() => {
    const timer = setInterval(() => {
      window.addEventListener("scroll", updateScroll);
    }, 3000); //이벤트가 발생된 후 해당 타이머는 초기화를 시켜주어 이벤트의 중복을 통한 성능 지연을 방지
    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", updateScroll); //clean up
    };
  }, [scrollPosition]);

  /* -------------------------------- 데이터 read -------------------------------- */
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const { data, isFetchingNextPage, fetchNextPage, remove, status, refetch } =
    useInfiniteQuery(
      "mainCheckList",
      ({ pageParam = 0 }) => getMainCheck(payload, pageParam),
      {
        refetchOnWindowFocus: false,
        getNextPageParam: (lastPage, allPages) => {
          return lastPage.nextPage;
        },
      }
    );

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  if (status === "loading") return null;

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
        <StNext ref={ref} style={{ border: "1px solid white" }}>
          {isFetchingNextPage && <div>로딩 중</div>}
          {!isFetchingNextPage && <div>목록의 마지막입니다.</div>}
        </StNext>
        <StGoBack
          onClick={onClickScroll}
          style={{ display: scrollPosition < 500 ? "none" : "inline" }}
        >
          <GoBack />
        </StGoBack>
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
  gap: 5px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.grey7};
  @media screen and (max-width: 350px) {
    gap: 5px;
  }
`;

const StMainBtns = styled.div`
  display: flex;
  gap: 4px;
  button {
    font-family: "twayfly", "Noto Sans KR", sans-serif;
  }
  @media screen and (max-width: 350px) {
    gap: 2px;
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

const StGoBack = styled.div`
  position: fixed;
  bottom: 13%;
  right: 8%;
  border-radius: 100px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 50px;
  height: 50px;
  .active {
    display: none;
  }
`;

const StIcon = styled.div`
  position: fixed;
  bottom: 4%;
  right: 8%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 100px;
  width: 50px;
  height: 50px;
`;
const StNext = styled.div`
  display: flex;
  text-align: center;
  div {
    color: ${colors.subP};
    font-size: ${fontSize.regular18};
    width: 100%;
    margin: 36px 0px;
    font-family: "twayfly", "Noto Sans KR", sans-serif;
  }
`;

export default MainList;
