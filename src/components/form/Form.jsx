import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import styled from "styled-components";
import imageCompression from "browser-image-compression";
import SelectBox from "components/elements/SelectBox";
import Input from "components/elements/Input";
import Textarea from "components/elements/Textarea";
import Button from "components/elements/Button";
import Modal from "components/layout/Modal";
import ImageAlert from "components/form/ImageAlert";
import ImageNumAlert from "components/form/ImageNumAlert";
import ImageFileAlert from "components/form/ImageFileAlert";
import LoadingMessage from "components/etc/LoadingMessage";
import icons from "assets";
import handlePrice from "utils/handlePrice";
import { colors, fontSize } from "styles/theme";
import { postCheck } from "api/formApi";
import {
  CATEGORY_DATA,
  IMAGE_TYPE,
  MAX_IMG_SIZE,
  MAX_TITLE_LENGTH,
  MAX_CONTENT_LENGTH,
  MAX_IMG_LENGTH,
  MAX_RESIZE,
  MAX_RESIZE_WIDTH_HEIGHT,
  MIN_CONTENT_LENGTH,
  MIN_LENGTH,
} from "components/form/formVali";

const Form = () => {
  const [item, setItem] = useState({
    title: "",
    category: "카테고리를 선택해 주세요.",
    price: "",
    desc: "",
    sendingPrice: "",
  });
  const { title, category, price, desc, sendingPrice } = item;

  const [files, setFiles] = useState([]);
  const [previewImg, setPreviewImg] = useState([]);

  const navigate = useNavigate();
  const { IconPlus, IconX } = icons;

  /* ------------------------------- IMAGE ALERT ------------------------------ */
  const [openImageAlert, setOpenImageAlert] = useState(false);
  const [openImageNumberAlert, setOpenImageNumberAlert] = useState(false);
  const [openImageFileAlert, setOpenImageFileAlert] = useState(false);

  /* ---------------------------------- 유효성검사 --------------------------------- */
  const [validation, setValidation] = useState({
    validTitle: true,
    validImage: true,
    validCategory: true,
    validPrice: true,
    validDesc: true,
  });
  const { validTitle, validImage, validCategory, validPrice, validDesc } =
    validation;

  const checkVali =
    title.trim().length > MIN_LENGTH &&
    desc.trim().length >= MIN_CONTENT_LENGTH &&
    category !== "카테고리를 선택해 주세요." &&
    price.trim().length > MIN_LENGTH &&
    files.length > MIN_LENGTH;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setValidation({ ...validation, validTitle: true });
      if (value.length > MAX_TITLE_LENGTH) return;
      setItem({ ...item, title: value });
    }
    if (name === "price") {
      setValidation({ ...validation, validPrice: true });
      const { realPrice, previewPrice } = handlePrice(value.replace(" ", ""));
      setItem({ ...item, sendingPrice: realPrice, price: previewPrice });
    }
    if (name === "desc") {
      setValidation({ ...validation, validDesc: true });
      if (value.length > MAX_CONTENT_LENGTH) return;
      setItem({ ...item, desc: value });
    }
  };

  /* ------------------------------ 사진 미리보기 & 리사이징 ---------------------------- */
  const handleAddImages = async (e) => {
    if (files.length + e.target.files.length > MAX_IMG_LENGTH)
      return setOpenImageNumberAlert(true);

    [...e.target.files].map(async (file) => {
      if (
        !IMAGE_TYPE.includes(
          file.name.split(".")[file.name.split(".").length - 1].toLowerCase()
        )
      )
        return setOpenImageFileAlert(true);
      if (file.size > MAX_IMG_SIZE) return setOpenImageAlert(true); //10메가

      const options = {
        maxSizeMB: MAX_RESIZE,
        maxWidthOrHeight: MAX_RESIZE_WIDTH_HEIGHT,
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(file, options);
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
    });
    if (files.length >= MIN_LENGTH)
      setValidation({ ...validation, validImage: true });
  };

  const handleDeleteImage = (id) => {
    setPreviewImg(previewImg.filter((_, index) => index !== id));
    setFiles(files.filter((_, index) => index !== id));
  };
  /* ----------------------------- 카테고리 select-box ---------------------------- */
  const handleOnChangeSelectValue = (e) => {
    setItem({ ...item, category: e.target.getAttribute("value") });
    if (category) setValidation({ ...validation, validCategory: true });
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

  if (isLoading) <LoadingMessage />;

  const onSubmitHandler = async () => {
    if (title.trim().length === MIN_LENGTH)
      setValidation((prev) => ({ ...prev, validTitle: false }));

    if (desc.trim().length < MIN_CONTENT_LENGTH)
      setValidation((prev) => ({ ...prev, validDesc: false }));

    if (price.trim().length === MIN_LENGTH)
      setValidation((prev) => ({ ...prev, validPrice: false }));

    if (files.length === MIN_LENGTH)
      setValidation((prev) => ({ ...prev, validImage: false }));

    if (category === "카테고리를 선택해 주세요.")
      setValidation((prev) => ({ ...prev, validCategory: false }));

    if (checkVali) {
      let formData = new FormData();
      const dataSet = {
        title,
        category,
        price: sendingPrice,
        content: desc,
      };
      files.map((file) => formData.append("multipartFile", file));
      formData.append(
        "articlesDto",
        new Blob([JSON.stringify(dataSet)], { type: "application/json" })
      );
      addCheck(formData);
    }
  };

  return (
    <StFormContainer>
      <StFirstWrap>
        <StPreview>
          <label htmlFor="input-file">
            <IconPlus width={"40px"} height={"40px"} />
            <input
              type="file"
              id="input-file"
              accept=".png, .jpg, .jpeg"
              onChange={handleAddImages}
              multiple
            />
          </label>
          <StImageList validImage={validImage}>
            {files.length === MIN_LENGTH ? (
              <p>
                사진을 등록해 주세요.
                <br />
                <span>(최대 5장 png, jpg, jpeg)</span>
              </p>
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
              data={CATEGORY_DATA}
              currentValue={category}
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
      <StThirdWrap validDesc={validDesc}>
        <Textarea onChangeHandler={handleChange} value={desc} name="desc" />
        <p>*15글자 이상 입력해 주세요.</p>
        <StButton>
          <Button
            children={"등록하기"}
            theme={checkVali ? "purple" : "disabled"}
            onClickHandler={onSubmitHandler}
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
  background: ${colors.white};
  width: 100%;
  min-height: calc(100vh - 64px);
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
  svg {
    cursor: pointer;
  }

  input {
    display: none;
  }
  label {
    display: flex;
  }
`;

const StImageList = styled.div`
  margin-left: 10px;
  overflow-x: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none;
  }

  div {
    display: flex;
    gap: 4px;
  }

  p {
    font-size: ${fontSize.regular16};
    letter-spacing: -0.5px;
    color: ${({ validImage }) =>
      validImage ? `${colors.grey3}` : `${colors.red}`};
    span {
      font-size: ${fontSize.regular14};
    }
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
  width: 20px;
  height: 20px;
  background-color: ${colors.black};
  opacity: 0.3;
`;

const StThirdWrap = styled.div`
  padding: 20px 35px 0 35px;
  width: 100%;
  padding-bottom: 100px;
  background: ${colors.white};
  textarea {
    ::placeholder {
      color: ${({ validDesc }) =>
        validDesc ? `${colors.grey3}` : `${colors.red}`};
    }
    border: 0.5px solid
      ${({ validDesc }) => (validDesc ? `${colors.grey3}` : `${colors.red}`)};
  }

  p {
    font-size: ${fontSize.small12};
    letter-spacing: -3%;
    color: ${({ validDesc }) =>
      validDesc ? `${colors.grey3}` : `${colors.red}`};
    padding-top: 4px;
    text-align: right;
  }
`;

const StButton = styled.div`
  position: fixed;
  bottom: 30px;
  width: 100%;
  left: 0;
  padding: 0px 30px;
  @media screen and (min-width: 950px) {
    width: 500px;
    left: 50%;
    transform: translateX(-50%);
  }
  button {
    border-radius: 50px;
  }
`;

export default Form;
