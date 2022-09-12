import styled from "styled-components";
import { useEffect, useState } from "react";
import MainListCard from "./MainListCard";
import icons from "assets";
import { useNavigate } from "react-router-dom";
import { getCookie } from "api/cookies";
import { useInfiniteQuery, useQuery } from "react-query";
import { getMainCheck } from "api/mainApi";
import { useRecoilState } from "recoil";
import { selectionState } from "state/selectorAtom";
import { useInView } from "react-intersection-observer";

const MainList = () => {
  const { IconPlus } = icons;

  const { ref, inView, entry } = useInView({});

  const [selection, setSelection] = useRecoilState(selectionState);

  const navigate = useNavigate();
  const onClickHandler = () => {
    getCookie("accessToken") ? navigate("/form") : navigate("/login");
  };

  const payload = { category: selection.category, process: selection.process };

  /* -------------------------------- 데이터 read -------------------------------- */
  const {
    data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error,
    status,
  } = useInfiniteQuery("mainCheckList", () => getMainCheck(payload), {
    refetchOnWindowFocus: false,
    enabled: inView,
    getNextPagePageParam: (lastPage, allPages) => {
      return lastPage.nextPage;
    },
  });
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (status === "loading") return <div>is Loading.....!</div>;
  console.log(data);
  return (
    <StMainContainer>
      {data?.data.content.map((d) => {
        return <MainListCard key={d.articlesId} data={d} />;
      })}
      ;<div ref={ref}>{isFetchingNextPage && <div>로딩중</div>}</div>
      <StIcon onClick={onClickHandler}>
        <IconPlus />
      </StIcon>
    </StMainContainer>
  );
};

const StMainContainer = styled.div`
  position: relative;
`;

const StIcon = styled.div`
  position: sticky;
  bottom: 4%;
  left: 80%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 100px;
  width: 50px;
  height: 50px;
`;

export default MainList;
