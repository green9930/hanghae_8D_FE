import SelectBox from "components/elements/SelectBox";
import Input from "components/elements/Input";
import styled from "styled-components";
import Textarea from "components/elements/Textarea";
import Button from "components/elements/Button";
import { useState } from "react";

const Form = () => {
  const [showImages, setShowImages] = useState([]);

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
    { key: 1, value: "", placeholder: "카테고리를 선택해 주세요!" },
    { key: 2, value: "디지털/생활가전" },
    { key: 3, value: "의류/잡화" },
    { key: 4, value: "스포츠/레저" },
    { key: 5, value: "가구/인테리어" },
    { key: 6, value: "도서/여행/취미" },
    { key: 7, value: "반려동물,반려식물" },
    { key: 8, value: "식품" },
    { key: 9, value: "기타" },
  ];
  /* ---------------------------------- 사진업로드 --------------------------------- */

  return (
    <>
      <StPreview>
        <label htmlFor="input-file" onChange={handleAddImages}>
          <span>사진추가</span>
          <input
            type="file"
            id="input-file"
            multiple
            style={{ display: "none" }}
          />
        </label>
        <StImageList>
          {showImages.map((image, id) => (
            <StImage key={id}>
              <StImg src={image} alt={`${image}-${id}`} />
              <StBtn onClick={() => handleDeleteImage(id)}>X</StBtn>
            </StImage>
          ))}
        </StImageList>
      </StPreview>
      <div>
        <Input placeholder={"제목을 입력해 주세요."} />
        <SelectBox data={data} />
        <Input placeholder={"가격을 입력해 주세요."} />
      </div>
      <Textarea />
      <p>15글자 이상 입력해 주세요.</p>
      <Button children={"등록하기"} />
    </>
  );
};

const StPreview = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
`;
const StImageList = styled.div`
  display: flex;
  gap: 4px;
  overflow: scroll;
  position: relative;
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

export default Form;
