import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import styled from "styled-components";
import { searchItems } from "api/searchApi";
import { colors } from "styles/theme";
import icons from "assets";
import Button from "components/elements/Button";
import MainListCard from "components/main/MainListCard";
import LoadingMessage from "components/etc/LoadingMessage";

const SearchList = () => {
  const [item, setItem] = useState("");
  const [show, setShow] = useState(true);
  const inputRef = useRef();

  const navigate = useNavigate();
  const { PrevLogo } = icons;
  const MIN_LENGTH = 0;
  const MAX_LENGTH = 20;

  const changeHandler = (e) => {
    if (e.target.value.length > MAX_LENGTH) return;
    setItem(e.target.value);
    setShow(false);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (item.trim().length !== MIN_LENGTH) refetch();
    inputRef.current.focus();
    setShow(true);
  };

  useEffect(() => {
    inputRef.current.focus();
    return () => remove();
  }, []);
  /* -------------------------------- 데이터 Read -------------------------------- */
  const { data, isLoading, refetch, remove } = useQuery(
    "foundLists",
    () => searchItems(item),
    {
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );

  if (isLoading) return <LoadingMessage />;

  return (
    <StSearchList>
      <StFirstContainer>
        <StSearchHeader>
          <Button
            variant="image"
            name="prevLogo"
            onClickHandler={() => navigate(-1)}
          >
            <PrevLogo />
          </Button>
          <StSearchForm onSubmit={onSubmitHandler}>
            <StInput
              onChange={changeHandler}
              theme="search"
              value={item}
              name="item"
              placeholder="무엇을 찾고 계신가요?"
              ref={inputRef}
            />
            <Button
              size="small_box"
              variant="text"
              children="검색"
              type="submit"
            />
          </StSearchForm>
        </StSearchHeader>
      </StFirstContainer>
      <StSecondContainer>
        {data?.data.length === 0 && show && item.trim().length !== 0 ? (
          <StResult>"{item}" 검색 결과가 없어요 🥲</StResult>
        ) : (
          data?.data?.map((data) => (
            <MainListCard key={data.articlesId} data={data} />
          ))
        )}
      </StSecondContainer>
    </StSearchList>
  );
};

const StSearchList = styled.div`
  width: 100%;
  background-color: ${colors.white};
  @media screen and (min-width: 950px) {
    width: 500px;
  }
`;
const StFirstContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  background-color: ${colors.white};
  @media screen and (min-width: 950px) {
    width: 500px;
    left: 50%;
    transform: translate(-50%, 0);
  }
`;
const StSearchHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  justify-content: space-between;
  height: 64px;
  padding: 0 20px;
`;
const StSearchForm = styled.form`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-grow: 1;
  div {
    flex-grow: 1;
  }
`;
const StInput = styled.input`
  height: 40px;
  border: none;
  border-radius: 5px;
  padding: 0 14px;
  background: ${colors.grey5};
  width: 100%;
`;
const StSecondContainer = styled.div`
  position: relative;
  top: 64px;
  min-height: 100vh;
  background: ${colors.white};
`;
const StResult = styled.p`
  text-align: center;
  padding-top: 40px;
`;
export default SearchList;
