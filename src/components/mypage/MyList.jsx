import { useState } from "react";
import styled from "styled-components";
import MyListCard from "components/mypage/MyListCard";
import Button from "components/elements/Button";
import { colors } from "styles/theme";
import { useQuery } from "react-query";
import { getMyChecks } from "api/mypageApi";

const MyList = () => {
  const [active, setActive] = useState("all");

  const { isLoading, data, refetch } = useQuery(
    "mylist",
    () => getMyChecks(active),
    {
      onSuccess: (data) => {
        console.log("GET MY LIST", data);
        console.log(active);
      },
    }
  );

  if (isLoading) return null;

  console.log(data.data);

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
  padding: 15px 35px;
`;

const StMainBtns = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;

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

export default MyList;
