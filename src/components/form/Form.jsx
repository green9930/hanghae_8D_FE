import SelectBox from "components/elements/SelectBox";
import Input from "components/elements/Input";
import styled from "styled-components";
import Textarea from "components/elements/Textarea";
import Button from "components/elements/Button";
import { useState } from "react";
import icons from "assets";
import { colors } from "styles/theme";

const Form = () => {
  const { IconPlus } = icons;
  const [showImages, setShowImages] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  console.log(title);
  const onChangePrice = (e) => {
    setPrice(e.target.value);
  };
  const onChangeDesc = (e) => {
    setDesc(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  // 이미지 상대경로 저장
  const handleAddImages = (e) => {
    const imageLists = e.target.files;
    let imageUrlLists = [...showImages];

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    if (imageUrlLists.length > 5) {
      imageUrlLists = imageUrlLists.slice(0, 5);
    }

    setShowImages(imageUrlLists);
  };

  // X버튼 클릭 시 이미지 삭제
  const handleDeleteImage = (id) => {
    setShowImages(showImages.filter((_, index) => index !== id));
  };

  /* ----------------------------- 카테고리 select-box ---------------------------- */

  const data = [
    { key: 1, value: "디지털/생활가전", category: "digital" },
    { key: 2, value: "의류/잡화", category: "clothes" },
    { key: 3, value: "스포츠/레저", category: "sports" },
    { key: 4, value: "가구/인테리어", category: "interior" },
    { key: 5, value: "도서/여행/취미", category: "hobby" },
    { key: 6, value: "반려동물,반려식물", category: "pet" },
    { key: 7, value: "식품", category: "food" },
    { key: 8, value: "기타", category: "etc" },
  ];
  /* ---------------------------------- 사진 미리보기 ------------------------------- */

  return (
    <StFormContainer>
      <form onSubmit={onSubmitHandler}>
        <StFirstWrap>
          <StPreview>
            <label htmlFor="input-file" onChange={handleAddImages}>
              <IconPlus />
              <input type="file" id="input-file" multiple />
            </label>
            <StImageList>
              {showImages.length === 0 ? (
                <div>사진을 등록해 주세요.</div>
              ) : (
                <div>
                  {showImages.map((image, id) => (
                    <StImage key={id}>
                      <StImg src={image} alt={`${image}-${id}`} />
                      <StBtn onClick={() => handleDeleteImage(id)}>X</StBtn>
                    </StImage>
                  ))}
                </div>
              )}
            </StImageList>
          </StPreview>
          <StSecondWrap>
            <Input
              theme="grey"
              placeholder={"제목을 입력해 주세요."}
              onChangeHandler={onChangeTitle}
              value={title}
            />
            <SelectBox data={data} />
            <Input
              theme="grey"
              placeholder={"가격을 입력해 주세요."}
              onChangeHandler={onChangePrice}
              value={price}
            />
          </StSecondWrap>
        </StFirstWrap>
        <StThirdWrap>
          <Textarea onChangeHandler={onChangeDesc} value={desc} />
          <p>*15글자 이상 입력해 주세요.</p>
          <Button children={"등록하기"} />
        </StThirdWrap>
      </form>
    </StFormContainer>
  );
};
const StFormContainer = styled.div`
  /* padding: 0 35px; */
`;
const StFirstWrap = styled.div`
  height: 279px;
  background-color: ${colors.grey7};
`;
const StSecondWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 35px;
`;
const StPreview = styled.div`
  padding: 0 35px;
  display: flex;
  justify-content: left;
  align-items: center;
  input {
    display: none;
  }
`;
const StImageList = styled.div`
  padding-left: 10px;
  div {
    display: flex;
    gap: 4px;
    overflow: scroll;
    font-size: 16px;
    letter-spacing: -0.5px;
    color: ${colors.grey3};
  }
`;
const StImage = styled.div`
  position: relative;
`;
const StImg = styled.img`
  width: 70px;
  height: 70px;
  object-fit: contain;
`;
const StBtn = styled.button`
  position: absolute;
  right: 0;
`;
const StThirdWrap = styled.div`
  padding: 20px 35px 0 35px;
  button {
    border-radius: 50px;
  }
  p {
    font-size: 12px;
    letter-spacing: -3%;
    color: ${colors.grey3};
    padding-top: 4px;
    text-align: right;
  }
`;

export default Form;
