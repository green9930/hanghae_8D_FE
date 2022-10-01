import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import MyListCard from "components/mypage/MyListCard";
import Button from "components/elements/Button";
import { getMyChecks } from "api/mypageApi";
import { myListState } from "state/atom";
import { colors } from "styles/theme";

const MyList = () => {
  const [active, setActive] = useState("all");
  const setMyListState = useSetRecoilState(myListState);

  /* 내가 쓴 게시글 목록 GET ---------------------------------------------------------- */
  const { data, refetch } = useQuery("mylist", () => getMyChecks(active), {
    onError: () => setMyListState(false),
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, [active]);

  return (
    <StMyList>
      <StMainBtns>
        <StAllBtn active={active} name="all">
          <Button
            size={"small_round"}
            theme={"p_outline"}
            name="all"
            onClickHandler={() => setActive("all")}
          >
            전체 보기
          </Button>
        </StAllBtn>
        <StProcessBtn active={active} name="process">
          <Button
            size={"small_round"}
            theme={"p_outline"}
            name="process"
            onClickHandler={() => setActive("process")}
          >
            진행중
          </Button>
        </StProcessBtn>
        <StDoneBtn active={active} name="done">
          <Button
            size={"small_round"}
            theme={"p_outline"}
            name="done"
            onClickHandler={() => setActive("done")}
          >
            완료
          </Button>
        </StDoneBtn>
      </StMainBtns>
      <ul>
        {data?.data.map((item) => (
          <li key={item.articlesId}>
            <MyListCard item={item} />
          </li>
        ))}
      </ul>
    </StMyList>
  );
};

const StMyList = styled.div`
  background: ${colors.white};

  li {
    background: ${colors.white};
  }
`;

const StMainBtns = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  background: ${colors.grey7};
  padding: 15px 35px;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 72px;
    line-height: 1.15;
    font-family: "twayfly", "Noto Sans KR", sans-serif;
  }
`;

const StAllBtn = styled.div`
  button {
    background: ${({ active, name }) =>
      active === name ? `${colors.mainP}` : `${colors.white}`};
    color: ${({ active, name }) =>
      active === name ? `${colors.white}` : `${colors.mainP}`};
  }
`;

const StProcessBtn = styled.div`
  button {
    background: ${({ active, name }) =>
      active === name ? `${colors.mainP}` : `${colors.white}`};
    color: ${({ active, name }) =>
      active === name ? `${colors.white}` : `${colors.mainP}`};
  }
`;

const StDoneBtn = styled.div`
  button {
    background: ${({ active, name }) =>
      active === name ? `${colors.mainP}` : `${colors.white}`};
    color: ${({ active, name }) =>
      active === name ? `${colors.white}` : `${colors.mainP}`};
  }
`;

export default MyList;
