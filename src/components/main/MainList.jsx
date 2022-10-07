import Button from "components/elements/Button";
import SelectBox from "components/elements/SelectBox";
import MainListCard from "components/main/MainListCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import { getMainCheck } from "api/mainApi";
import { colors } from "styles/theme";
import icons from "assets";
import { fontSize } from "styles/theme";
import styled from "styled-components";
import { getCookie } from "api/cookies";

const MainList = () => {
  const { IconPlus, GoBack } = icons;
  const navigate = useNavigate();

  const onClickScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  /* --------------------------------- 카테고리 선택 -------------------------------- */
  const [active, setActive] = useState({
    cate: "카테고리 전체",
    pro: "all",
  });

  const { cate, pro } = active;

  let payload = { category: cate, process: pro };

  const datas = [
    { key: 1, value: "전체" },
    { key: 2, value: "디지털/생활가전" },
    { key: 3, value: "의류/잡화" },
    { key: 4, value: "스포츠/레저" },
    { key: 5, value: "가구/인테리어" },
    { key: 6, value: "도서/여행/취미" },
    { key: 7, value: "반려동물/식물" },
    { key: 8, value: "식품" },
    { key: 9, value: "기타" },
  ];

  const handleOnChangeSelectValue = (e) => {
    setActive({ cate: e.target.getAttribute("value"), pro: pro });
    payload = { category: e.target.getAttribute("value"), process: pro };
  };

  const handleActiveStatus = (name) => {
    setActive({ pro: name, cate: cate });
    payload = { category: cate, process: name };
  };
  useEffect(() => {
    remove();
    refetch();
  }, [cate, pro]);

  /* -------------------------------- 데이터 read -------------------------------- */
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const {
    data,
    isFetchingNextPage,
    fetchNextPage,
    remove,
    isLoading,
    refetch,
  } = useInfiniteQuery(
    "mainCheckList",
    ({ pageParam = 0 }) => getMainCheck(payload, pageParam),
    {
      refetchOnWindowFocus: false,
      enabled: false,
      getNextPageParam: (lastPage) => {
        return lastPage.nextPage;
      },
    }
  );

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  /* ------------------------------- goToTop 버튼 ------------------------------- */
  const [scrollPosition, setScrollPosition] = useState(0);

  const updateScroll = () => {
    setScrollPosition(window.pageYOffset);
  };
  useEffect(() => {
    const timer = setInterval(() => {
      window.addEventListener("scroll", updateScroll);
    }, 300); //이벤트가 발생된 후 해당 타이머는 초기화를 시켜주어 이벤트의 중복을 통한 성능 지연을 방지
    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", updateScroll); //clean up
    };
  }, [scrollPosition]);

  if (isLoading) return null;

  return (
    <StMain>
      <StSelectList>
        <SelectBox
          size="small"
          data={datas}
          currentValue={cate}
          handleOnChangeSelectValue={handleOnChangeSelectValue}
        />
        <StMainBtns>
          <StAllBtn active={pro} name="all">
            <Button
              children="전체 보기"
              size="small_round"
              theme="p_outline"
              name="all"
              onClickHandler={() => handleActiveStatus("all")}
            />
          </StAllBtn>
          <StProcessBtn active={pro} name="process">
            <Button
              children="진행중"
              size="small_round"
              theme="p_outline"
              name="process"
              onClickHandler={() => handleActiveStatus("process")}
            />
          </StProcessBtn>
          <StDoneBtn active={pro} name="done">
            <Button
              children="완료"
              size="small_round"
              theme="p_outline"
              name="done"
              onClickHandler={() => handleActiveStatus("done")}
            />
          </StDoneBtn>
        </StMainBtns>
      </StSelectList>
      {data?.pages.map((page, idx) => (
        <div key={idx}>
          {page?.data.data.content.map((d) => {
            return <MainListCard key={d.articlesId} data={d} />;
          })}
        </div>
      ))}
      <StNext ref={ref}>
        {isFetchingNextPage && <div>로딩 중</div>}
        {!isFetchingNextPage && <div>목록의 마지막입니다.</div>}
      </StNext>
      <StDiv>
        <StGoBack onClick={onClickScroll} scrollPosition={scrollPosition}>
          <GoBack />
        </StGoBack>
        <StIcon
          onClick={() =>
            getCookie("accessToken") ? navigate("/form") : navigate("/login")
          }
        >
          <IconPlus />
        </StIcon>
      </StDiv>
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
  gap: 3px;
  justify-content: space-between;
  padding-left: 2%;
  align-items: center;
  background-color: ${colors.grey7};
  @media screen and (max-width: 350px) {
    gap: 5px;
  }
`;

const StMainBtns = styled.div`
  display: flex;
  padding-right: 2%;
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

const StDiv = styled.div`
  display: flex;
  -webkit-box-pack: end;
  justify-content: flex-end;
  width: 100%;
  max-width: inherit;
`;

const StGoBack = styled.div`
  position: fixed;
  bottom: 75px;
  right: 8%;
  border-radius: 100px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 50px;
  height: 50px;
  display: ${({ scrollPosition }) => {
    return scrollPosition > 500 ? true : "none";
  }};
  @media screen and (min-width: 950px) {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    position: fixed;
    bottom: 75px;
  }
`;

const StIcon = styled.div`
  position: fixed;
  bottom: 20px;
  right: 8%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 100px;
  width: 50px;
  height: 50px;
  cursor: pointer;
  @media screen and (min-width: 950px) {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    position: fixed;
    bottom: 20px;
  }
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
