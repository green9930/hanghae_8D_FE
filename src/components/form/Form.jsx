import SelectBox from "components/elements/SelectBox";
import Input from "components/elements/Input";
import styled from "styled-components";
import Textarea from "components/elements/Textarea";
import Button from "components/elements/Button";
import { useState } from "react";
import icons from "assets";
import { colors } from "styles/theme";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import Modal from "components/layout/Modal";
import ImageAlert from "components/form/ImageAlert";
import ImageNumAlert from "components/form/ImageNumAlert";
import ImageFileAlert from "components/form/ImageFileAlert";
import { postCheck } from "api/formApi";
import handlePrice from "utils/handlePrice";
import { fontSize } from "styles/theme";
import imageCompression from "browser-image-compression";
import LoadingMessage from "components/etc/LoadingMessage";

const Form = () => {
  const [openImageAlert, setOpenImageAlert] = useState(false);
  const [openImageNumberAlert, setOpenImageNumberAlert] = useState(false);
  const [openImageFileAlert, setOpenImageFileAlert] = useState(false);
  const [title, setTitle] = useState("");
  const [currentValue, setCurrentValue] = useState("카테고리를 선택해 주세요.");
  const [currentCategory, setCurrentCategory] = useState("");
  const [price, setPrice] = useState("");
  const [realPrice, setRealPrice] = useState("");
  const [desc, setDesc] = useState("");

  const [files, setFiles] = useState([]);
  const [previewImg, setPreviewImg] = useState([]);

  const VALID_IMAGE_TYPE = ["png", "jpg", "jpeg"];
  /* ---------------------------------- 유효성검사 --------------------------------- */
  const [validTitle, setValidTitle] = useState(true);
  const [validImage, setValidImage] = useState(true);
  const [validCategory, setValidCategory] = useState(true);
  const [validPrice, setValidPrice] = useState(true);
  const [validLengthDesc, setValidLengthDesc] = useState(true);
  const [validDesc, setValidDesc] = useState(true);

  const navigate = useNavigate();
  const { IconPlus, IconX } = icons;

  const checkVali =
    title.trim().length > 0 &&
    desc.trim().length >= 15 &&
    currentValue !== "카테고리를 선택해 주세요." &&
    price.trim().length > 0 &&
    files.length > 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    let target = "";
    if (name === "title") {
      target = value.substr(0, 30);
      setTitle(target);
      target.length >= 0 ? setValidTitle(true) : setValidTitle(false);
    }

    if (name === "price") {
      const { realPrice, previewPrice } = handlePrice(value.replace(" ", ""));
      value.length >= 0 ? setValidPrice(true) : setValidPrice(false);
      setRealPrice(realPrice);
      setPrice(previewPrice);
    }

    if (name === "desc") {
      target = value.substr(0, 400);
      setDesc(target);
      target.length >= 0 ? setValidDesc(true) : setValidDesc(false);
      target.length >= 0 ? setValidLengthDesc(true) : setValidLengthDesc(false);
    }
  };

  /* ------------------------------ 사진 미리보기 & 리사이징 ---------------------------- */
  const handleAddImages = async (e) => {
    if (files.length + e.target.files.length > 5) {
      return setOpenImageNumberAlert(true);
    }
    for (let i = 0; i < e.target.files.length; i++) {
      let file = e.target.files[i];
      console.log(e.target.files[i]);
      if (
        !VALID_IMAGE_TYPE.includes(
          file.name.split(".")[file.name.split(".").length - 1].toLowerCase()
        )
      )
        return setOpenImageFileAlert(true);
      if (file.size > 10000000) return setOpenImageAlert(true);

      const options = {
        maxSizeMB: 10,
        maxWidthOrHeight: 3000,
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(file, options);
        console.log(compressedFile);
        setFiles((files) => [...files, compressedFile]);

        const reader = new FileReader();
        reader.readAsDataURL(compressedFile);
        reader.onload = () => {
          const previewImgUrl = reader.result;
          setPreviewImg((previewImg) => [...previewImg, previewImgUrl]);
        };
      } catch (error) {
        alert("이미지를 불러올 수 없습니다");
      }
    }

    files.length >= 0 ? setValidImage(true) : setValidImage(false);
  };

  const handleDeleteImage = (id) => {
    setPreviewImg(previewImg.filter((_, index) => index !== id));
    setFiles(files.filter((_, index) => index !== id));
  };
  /* ----------------------------- 카테고리 select-box ---------------------------- */
  const data = [
    { key: 1, value: "디지털/생활가전", category: "digital" },
    { key: 2, value: "의류/잡화", category: "clothes" },
    { key: 3, value: "스포츠/레저", category: "sports" },
    { key: 4, value: "가구/인테리어", category: "interior" },
    { key: 5, value: "도서/여행/취미", category: "hobby" },
    { key: 6, value: "반려동물/식물", category: "pet" },
    { key: 7, value: "식품", category: "food" },
    { key: 8, value: "기타", category: "etc" },
  ];

  const handleOnChangeSelectValue = (e) => {
    setCurrentValue(e.target.getAttribute("value"));
    setCurrentCategory(e.target.classList[2]);

    currentValue ? setValidCategory(true) : setValidCategory(false);
  };

  /* -------------------------------- 데이터 Post -------------------------------- */
  const { mutate: addCheck, isLoading } = useMutation(postCheck, {
    onSuccess: () => {
      navigate("/");
    },
    onError: (err) => {
      alert(err.response.data.errorMessage);
    },
  });
  console.log(isLoading);

  const onSubmitHandler = async () => {
    let formData = new FormData();
    const dataSet = {
      title: title,
      category: currentCategory,
      price: realPrice,
      content: desc,
    };
    files.map((file) => formData.append("multipartFile", file));
    formData.append(
      "articlesDto",
      new Blob([JSON.stringify(dataSet)], { type: "application/json" })
    );
    addCheck(formData);
  };

  const clickCheckHandler = () => {
    title.trim().length === 0 ? setValidTitle(false) : setValidTitle(true);
    desc.trim().length > 14
      ? setValidLengthDesc(true)
      : setValidLengthDesc(false);
    desc.trim().length === 0 ? setValidDesc(false) : setValidDesc(true);
    price.trim().length === 0 ? setValidPrice(false) : setValidPrice(true);
    files.length === 0 ? setValidImage(false) : setValidImage(true);
    currentValue === "카테고리를 선택해 주세요."
      ? setValidCategory(false)
      : setValidCategory(true);
  };

  return (
    <StFormContainer>
      <StFirstWrap>
        <StPreview>
          <label htmlFor="input-file">
            <IconPlus />
            <input
              type="file"
              id="input-file"
              accept=".png, .jpg, .jpeg"
              onChange={handleAddImages}
              multiple
            />
          </label>
          <StImageList validImage={validImage}>
            {files.length === 0 ? (
              <p>사진을 등록해 주세요.</p>
            ) : (
              <div>
                {previewImg.map((image, id) => (
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
          {openImageNumberAlert && (
            <Modal handleOpenModal={() => setOpenImageNumberAlert(false)}>
              <ImageNumAlert
                handleOpenModal={() => setOpenImageNumberAlert(false)}
              />
            </Modal>
          )}
          {openImageFileAlert && (
            <Modal handleOpenModal={() => setOpenImageFileAlert(false)}>
              <ImageFileAlert
                handleOpenModal={() => setOpenImageFileAlert(false)}
              />
            </Modal>
          )}
        </StPreview>
        <StSecondWrap>
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
            />
            {price?.trim().length ? <span>원</span> : null}
          </StPriceInput>
        </StSecondWrap>
      </StFirstWrap>
      <StThirdWrap validLengthDesc={validLengthDesc} validDesc={validDesc}>
        <Textarea onChangeHandler={handleChange} value={desc} name="desc" />
        <p>*15글자 이상 입력해 주세요.</p>
        <StButton>
          <Button
            children={"등록하기"}
            theme={checkVali ? "purple" : "disabled"}
            onClickHandler={checkVali ? onSubmitHandler : clickCheckHandler}
            isDisabled={isLoading ? true : false}
          />
        </StButton>
      </StThirdWrap>
    </StFormContainer>
  );
};

const StFormContainer = styled.div`
  position: relative;
  top: 64px;
  height: calc(100vh - 64px);
`;

const StFirstWrap = styled.div`
  height: 241px;
  padding-top: 28px;
  background-color: ${colors.grey7};
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
  position: relative;

  input {
    ::placeholder {
      color: ${({ validPrice }) =>
        validPrice ? `${colors.grey3}` : `${colors.red}`};
    }
    border-color: ${({ validPrice }) =>
      validPrice ? `${colors.grey3}` : `${colors.red}`};
  }

  span {
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    color: ${colors.grey3};
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
  label {
    display: flex;
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
    font-size: ${fontSize.regular16};
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
    font-size: ${fontSize.small12};
    letter-spacing: -3%;
    color: ${({ validLengthDesc }) =>
      validLengthDesc ? `${colors.grey3}` : `${colors.red}`};
    padding-top: 4px;
    text-align: right;
  }
`;

const StButton = styled.div`
  position: absolute;
  left: 0;
  padding: 0 30px;
  width: 100%;
  bottom: 0;
  button {
    border-radius: 50px;
  }
`;

export default Form;
