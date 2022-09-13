import styled from "styled-components";
import { useEffect } from "react";
import MainListCard from "./MainListCard";
import icons from "assets";
import { useNavigate } from "react-router-dom";
import { getCookie } from "api/cookies";
import { useInfiniteQuery } from "react-query";
import { getMainCheck } from "api/mainApi";
import { useRecoilState } from "recoil";
import { selectionState } from "state/atom";
import { useInView } from "react-intersection-observer";
import LoadingMessage from "components/etc/LoadingMessage";

const MainList = () => {
  const { IconPlus } = icons;

  const [selection, setSelection] = useRecoilState(selectionState);

  const navigate = useNavigate();
  const onClickHandler = () => {
    getCookie("accessToken") ? navigate("/form") : navigate("/login");
  };

  const payload = { category: selection.category, process: selection.process };

  /* -------------------------------- 데이터 read -------------------------------- */
  const { ref, inView, entry } = useInView({
    threshold: 0,
  });
  const {
    data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error,
    status,
  } = useInfiniteQuery(
    "[mainCheckList]",
    ({ pageParam = 1 }) => getMainCheck(payload, pageParam),
    {
      refetchOnWindowFocus: false,
      enabled: inView,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.nextPage;
      },
    }
  );
  console.log(inView);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (status === "loading") return <LoadingMessage />;
  console.log(data);

  return (
    <>
      <StMainContainer>
        {data?.pages.map((page, idx) => (
          <div key={idx}>
            {page?.data.data.content.map((d) => {
              return <MainListCard key={d.articlesId} data={d} />;
            })}
          </div>
        ))}
        <div ref={ref}>{isFetchingNextPage && <div>로딩 중</div>}</div>
      </StMainContainer>
      <StIcon onClick={onClickHandler}>
        <IconPlus />
      </StIcon>
    </>
  );
};

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
