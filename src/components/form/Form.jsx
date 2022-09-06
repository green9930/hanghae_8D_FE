import SelectBox from "components/elements/SelectBox";
import Input from "components/elements/Input";
import styled from "styled-components";
import Textarea from "components/elements/Textarea";
import Button from "components/elements/Button";
import { useState } from "react";
import icons from "assets";
import { colors } from "styles/theme";
import { useNavigate } from "react-router-dom";
import Modal from "components/layout/Modal";
import ImageAlert from "./ImageAlert";

const Form = () => {
  const navigate = useNavigate();

  const [openImageAlert, setOpenImageAlert] = useState(false);

  const { IconPlus, IconArrow, IconX } = icons;
  const [showImages, setShowImages] = useState([]);
  const [title, setTitle] = useState("");
  const [currentValue, setCurrentValue] = useState("카테고리를 선택해 주세요.");
  const [price, setPrice] = useState("");
  const [realPrice, setRealPrice] = useState("");
  const [desc, setDesc] = useState("");

  const [validTitle, setValidTitle] = useState(true);
  const [validImage, setValidImage] = useState(true);
  const [validCategory, setValidCategory] = useState(true);
  const [validPrice, setValidPrice] = useState(true);
  const [validLengthDesc, setValidLengthDesc] = useState(true);
  const [validDesc, setValidDesc] = useState(true);

  const checkVali =
    title.trim().length > 0 &&
    desc.trim().length >= 15 &&
    currentValue !== "카테고리를 선택해 주세요." &&
    price.trim().length > 0 &&
    showImages.length > 0;

  const priceVali = (text) => {
    const regExp = /^[0-9\s+]*$/g;
    return regExp.test(text);
  };

  const handleOnChangeSelectValue = (e) => {
    setCurrentValue(e.target.getAttribute("value"));
    currentValue ? setValidCategory(true) : setValidCategory(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let target = "";
    if (name === "title") {
      target = value.substr(0, 30);
      console.log("타이틀!!!!", target.trim().length);
      setTitle(target);
      target.length > 0 ? setValidTitle(true) : setValidTitle(false);
    }

    if (name === "price") {
      target = value.replaceAll(",", "").substr(0, 8);
      if (priceVali(target)) {
        setRealPrice(target);
        priceVali(target) &&
          setPrice(target.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        console.log("Price", price.trim().length);
        target.length > 0 ? setValidPrice(true) : setValidPrice(false);
      }
    }
    if (name === "desc") {
      target = value.substr(0, 400);
      setDesc(target);
      console.log("desc", desc.trim().length);
      target.length > 0 ? setValidDesc(true) : setValidDesc(false);
      target.length > 15 ? setValidLengthDesc(true) : setValidLengthDesc(false);
    }
  };

  /* ---------------------------------- 사진 미리보기 ------------------------------- */

  // 이미지 상대경로 저장
  let imageLists = {};

  const handleAddImages = (e) => {
    let imageUrlLists = [...showImages];
    imageLists = e.target.files;

    for (let i = 0; i < imageLists.length; i++) {
      console.log(imageLists[i].size);
      //20메가제한
      if (imageLists[i].size > 20000000) {
        setOpenImageAlert(true);
        console.log("알러트!!!", openImageAlert);
        return;
      }

      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    if (imageUrlLists.length > 5) {
      imageUrlLists = imageUrlLists.slice(0, 5);
    }

    setShowImages(imageUrlLists);
    showImages.length > 0 ? setValidImage(true) : setValidImage(false);
    console.log("이미지!", imageLists);
  };

  // X버튼 클릭 시 이미지 삭제
  const handleDeleteImage = (id) => {
    setShowImages(showImages.filter((_, index) => index !== id));
  };
  // console.log(showImages);

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

  const onSubmitHandler = () => {
    console.log("올려!!");
  };

  const clickCheckHandler = () => {
    title.trim().length === 0 ? setValidTitle(false) : setValidTitle(true);
    desc.trim().length > 14
      ? setValidLengthDesc(true)
      : setValidLengthDesc(false);
    desc.trim().length === 0 ? setValidDesc(false) : setValidDesc(true);
    price.trim().length === 0 ? setValidPrice(false) : setValidPrice(true);
    showImages.length === 0 ? setValidImage(false) : setValidImage(true);
    currentValue === "카테고리를 선택해 주세요."
      ? setValidCategory(false)
      : setValidCategory(true);
  };

  return (
    <StFormContainer>
      <StFirstWrap>
        <StIconArrow>
          <IconArrow /> 뒤로
        </StIconArrow>
        <StPreview>
          <label htmlFor="input-file" onChange={handleAddImages}>
            <IconPlus />
            <input type="file" id="input-file" multiple />
          </label>
          <StImageList validImage={validImage}>
            {showImages.length === 0 ? (
              <p>사진을 등록해 주세요 (최대 5장).</p>
            ) : (
              <div>
                {showImages.map((image, id) => (
                  <StImage key={id}>
                    <StImg src={image} alt={`${image}-${id}`} />
                    <StBtn onClick={() => handleDeleteImage(id)}>
                      <IconX stroke={colors.white} />
                    </StBtn>
                  </StImage>
                ))}
              </div>
            )}
          </StImageList>
          {openImageAlert && (
            <Modal handleOpenModal={() => setOpenImageAlert(false)}>
              <ImageAlert handleOpenModal={() => setOpenImageAlert(false)} />
            </Modal>
          )}
        </StPreview>
        <StSecondWrap>
          {/* {console.log(validLengthDesc)} */}
          <StTitleInput validTitle={validTitle}>
            <Input
              theme="grey"
              placeholder={"제목을 입력해 주세요."}
              onChangeHandler={handleChange}
              name="title"
              value={title}
            />
          </StTitleInput>
          <StSelectBox validCategory={validCategory}>
            <SelectBox
              data={data}
              currentValue={currentValue}
              handleOnChangeSelectValue={handleOnChangeSelectValue}
            />
          </StSelectBox>
          <StPriceInput validPrice={validPrice}>
            <Input
              theme="grey"
              placeholder={"가격을 입력해 주세요."}
              onChangeHandler={handleChange}
              value={price}
              name="price"
              // type="number"
            />
          </StPriceInput>
        </StSecondWrap>
      </StFirstWrap>
      <StThirdWrap validLengthDesc={validLengthDesc} validDesc={validDesc}>
        <Textarea onChangeHandler={handleChange} value={desc} name="desc" />
        <p>*15글자 이상 입력해 주세요.</p>
        {/* {console.log(validLengthDesc)} */}
        <StButton>
          {checkVali ? (
            <Button
              children={"등록하기"}
              theme={checkVali ? "purple" : "disabled"}
              onClickHandler={onSubmitHandler}
            />
          ) : (
            <Button
              children={"등록하기"}
              theme={"disabled"}
              onClickHandler={clickCheckHandler}
            />
          )}
        </StButton>
      </StThirdWrap>
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
const StIconArrow = styled.div`
  position: relative;
  padding: 10px 0px 35px 20px;
  svg {
    position: relative;
    top: 4px;
    left: 1;
    transform: rotate(90deg);
  }
`;
const StSecondWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 35px;
`;

const StTitleInput = styled.div`
  input {
    ::placeholder {
      color: ${({ validTitle }) => {
        // console.log("####", validTitle);
        return validTitle ? `${colors.grey3}` : `${colors.red}`;
      }};
    }
    border-color: ${({ validTitle }) =>
      validTitle ? `${colors.grey3}` : `${colors.red}`};
  }
`;

const StSelectBox = styled.div`
  span {
    color: ${({ validCategory }) => (validCategory ? null : `${colors.red}`)};
  }

  div {
    border-color: ${({ validCategory }) =>
      validCategory ? `${colors.grey3}` : `${colors.red}`};
  }
  svg {
    fill: ${({ validCategory }) =>
      validCategory ? `${colors.grey3}` : `${colors.red}`};
  }
`;

const StPriceInput = styled.div`
  input {
    ::placeholder {
      color: ${({ validPrice }) =>
        validPrice ? `${colors.grey3}` : `${colors.red}`};
    }
    border-color: ${({ validPrice }) =>
      validPrice ? `${colors.grey3}` : `${colors.red}`};
  }
`;

const StPreview = styled.div`
  padding: 0 35px 20px;
  display: flex;
  justify-content: left;
  height: 70px;
  align-items: center;
  input {
    display: none;
  }
`;
const StImageList = styled.div`
  padding-left: 10px;
  overflow: scroll;
  div {
    display: flex;
    gap: 4px;
  }
  p {
    font-size: 16px;
    letter-spacing: -0.5px;
    color: ${({ validImage }) =>
      validImage ? `${colors.grey3}` : `${colors.red}`};
  }
`;
const StImage = styled.div`
  position: relative;
`;
const StImg = styled.img`
  width: 70px;
  height: 70px;
  object-fit: cover;
`;
const StBtn = styled.button`
  position: absolute;
  right: 0;
  border: none;
  padding: 0;
  padding-bottom: 0;
  width: 20px;
  height: 20px;
  background-color: ${colors.black};
  opacity: 0.3;
`;
const StThirdWrap = styled.div`
  padding: 20px 35px 0 35px;

  textarea {
    ::placeholder {
      color: ${({ validDesc }) =>
        validDesc ? `${colors.grey3}` : `${colors.red}`};
    }
    border: 0.5px solid
      ${({ validLengthDesc }) =>
        validLengthDesc ? `${colors.grey3}` : `${colors.red}`};
  }
  p {
    font-size: 12px;
    letter-spacing: -3%;
    color: ${({ validLengthDesc }) =>
      validLengthDesc ? `${colors.grey3}` : `${colors.red}`};
    padding-top: 4px;
    text-align: right;
  }
`;
const StButton = styled.div`
  position: absolute;
  bottom: 30px;
  left: 0;
  padding: 0 30px;
  width: 100%;

  button {
    border-radius: 50px;
  }
`;

export default Form;
