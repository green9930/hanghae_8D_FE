import styled from "styled-components";
import test01 from "assets/test01.jpg";
import test02 from "assets/test02.jpg";
import test03 from "assets/test03.jpg";
import test04 from "assets/test04.jpg";
import test05 from "assets/test05.jpg";
import MyListCard from "./MyListCard";
import Button from "components/elements/Button";
import { useState } from "react";
import { colors } from "styles/theme";

const MyList = () => {
  const [active, setActive] = useState("all");

  const list = [
    {
      articlesId: 1,
      title: "에어팟 중고",
      price: "79,000",
      image: test05,
      process: "done",
      point: "12",
    },
    {
      articlesId: 2,
      title: "소니 블루투스 스피커 길이제한 확인해볼까",
      price: "105,000",
      image: test01,
      process: "process",
      point: "2",
    },
    {
      articlesId: 3,
      title: "모두의 네트워크",
      price: "5,000",
      image: test04,
      process: "done",
      point: "12",
    },
    {
      articlesId: 4,
      title: "디퓨저",
      price: "3,000",
      image: test02,
      process: "process",
      point: "2",
    },
    {
      articlesId: 5,
      title: "노트북 가방",
      price: "12,000",
      image: test03,
      process: "process",
      point: "2",
    },
    {
      articlesId: 6,
      title: "2번 신은 닥터마틴 부츠",
      price: "51,000",
      image: test04,
      process: "done",
      point: "12",
    },
    {
      articlesId: 7,
      title: "페레로 로쉐",
      price: "1,000",
      image: test03,
      process: "process",
      point: "2",
    },
    {
      articlesId: 8,
      title: "삼성 냉장고 (2022년 신형)",
      price: "7,900,000",
      image: test01,
      process: "done",
      point: "12",
    },
    {
      articlesId: 9,
      title: "미니 선풍기",
      price: "8,500",
      image: test02,
      process: "process",
      point: "2",
    },
    {
      articlesId: 10,
      title: "노트북 거치대",
      price: "79,000",
      image: test05,
      process: "process",
      point: "2",
    },
  ];

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
        {list.map((item) => (
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
