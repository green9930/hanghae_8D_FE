import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import imageCompression from "browser-image-compression";
import { isMobile } from "react-device-detect";
import styled from "styled-components";
import Modal from "components/layout/Modal";
import Button from "components/elements/Button";
import Input from "components/elements/Input";
import SelectBox from "components/elements/SelectBox";
import Textarea from "components/elements/Textarea";
import ImageNumAlert from "components/form/ImageNumAlert";
import ImageAlert from "components/form/ImageAlert";
import ImageFileAlert from "components/form/ImageFileAlert";
import LoadingMessage from "components/etc/LoadingMessage";
import { getDetailCheck } from "api/detailApi";
import { patchDetailCheck } from "api/editApi";
import handlePrice from "utils/handlePrice";
import { colors } from "styles/theme";
import { a11yHidden } from "styles/mixin";
import icons from "assets";

const EditForm = () => {
  const [files, setFiles] = useState([]); // 추가된 사진 목록록
  const [deletedFiles, setDeletedFiles] = useState([]); // 삭제된 사진 목록
  const [previewFiles, setPreviewFiles] = useState([]); // 미리보기 사진 목록
  const [editText, setEditText] = useState({
    category: "",
    title: "",
    price: "",
    content: "",
  });
  const [previewPrice, setPreviewPrice] = useState("");
  /* IMAGE ALERT -------------------------------------------------------------- */
  const [openImageAlert, setOpenImageAlert] = useState(false);
  const [openImageNumberAlert, setOpenImageNumberAlert] = useState(false);
  const [openImageFileAlert, setOpenImageFileAlert] = useState(false);
  /* VALIDATION : TITLE, PRICE, CONTENT --------------------------------------- */
  const [isValidTitle, setIsValidTitle] = useState(true);
  const [isValidPrice, setIsValidPrice] = useState(true);
  const [isValidContent, setIsValidContent] = useState(true);

  const navigate = useNavigate();
  const { id } = useParams();
  const { IconPlus, IconX } = icons;
  const queryClient = useQueryClient();

  const MAX_IMG_SIZE = 10000000;
  const MAX_TITLE_LENGTH = 30;
  const MAX_CONTENT_LENGTH = 400;
  const VALID_IMAGE_TYPE = ["png", "jpg", "jpeg"];
  const selectboxData = [
    { key: 1, value: "디지털/생활가전" },
    { key: 2, value: "의류/잡화" },
    { key: 3, value: "스포츠/레저" },
    { key: 4, value: "가구/인테리어" },
    { key: 5, value: "도서/여행/취미" },
    { key: 6, value: "반려동물/식물" },
    { key: 7, value: "식품" },
    { key: 8, value: "기타" },
  ];

  /* 상세 게시글 GET --------------------------------------------------------------- */
  const { isLoading, data, refetch, isSuccess } = useQuery(
    "detailCheckEdit",
    () => getDetailCheck(id),
    {
      onSuccess: ({ data }) => {
        if (!data.isMyArticles) {
          window.alert("수정 권한이 없는 게시글입니다."); // 타인 게시글 수정 페이지 직접 접근 제한
          window.location.replace("/");
        }
        setEditText({
          ...editText,
          category: data.category,
          title: data.title,
          price: data.price.replaceAll(",", ""),
          content: data.content,
        });
        setPreviewFiles([...data.images]);
        setPreviewPrice(data.price);
      },
      enabled: false,
    }
  );

  /* 상세 게시글 PATCH ------------------------------------------------------------- */
  const { mutate: patchMutate, isLoading: patchDetailCheckLoading } =
    useMutation(patchDetailCheck, {
      onSuccess: () => queryClient.invalidateQueries("detailCheck"),
      onError: () => {
        navigate(`/detail/${id}`);
        window.alert("게시글 수정을 실패했습니다.");
      },
    });

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) return <LoadingMessage />;

  if (isSuccess) {
    if (!data.data.isMyArticles) return window.location.replace("/");
    const { createdAt, images } = data?.data;

    /* 이미지 추가 ------------------------------------------------------------------- */
    const handleAddImages = (e) => {
      if (previewFiles.length + [...e.target.files].length > 5)
        return setOpenImageNumberAlert(true);

      [...e.target.files].map(async (item) => {
        if (item.size > MAX_IMG_SIZE) return setOpenImageAlert(true);
        if (
          !VALID_IMAGE_TYPE.includes(
            item.name.split(".")[item.name.split(".").length - 1].toLowerCase()
          )
        )
          return setOpenImageFileAlert(true);

        const options = {
          maxSizeMB: 10,
          maxWidthOrHeight: 3000,
          useWebWorker: true,
        };

        try {
          const compressedFile = await imageCompression(item, options); // 이미지 압축
          setFiles((files) => [...files, compressedFile]);
          const reader = new FileReader();
          reader.readAsDataURL(item);
          reader.onload = () =>
            setPreviewFiles((previewFiles) => [...previewFiles, reader.result]);
        } catch (error) {
          window.alert("이미지를 불러올 수 없습니다.");
        }
      });
    };

    /* 이미지 삭제 ------------------------------------------------------------------- */
    const handleDeleteImage = (image, id) => {
      images.includes(image)
        ? setDeletedFiles([...deletedFiles, image])
        : setFiles(files.filter((file, index) => index !== id));
      setPreviewFiles(previewFiles.filter((file, index) => index !== id));
    };

    /* 카테고리 선택 ------------------------------------------------------------------ */
    const handleChangeSelectbox = (e) =>
      setEditText({ ...editText, category: e.target.innerText });

    /* 제목, 가격, 내용 편집 ------------------------------------------------------------ */
    const handleChange = (e) => {
      const { name, value } = e.target;

      if (name === "price") {
        const { isValid, realPrice, previewPrice } = handlePrice(
          value.replace(" ", "")
        );
        if (value.length === 0) {
          setEditText({ ...editText, price: "" });
          setPreviewPrice("");
        } else {
          if (isValid) {
            setIsValidPrice(true);
            setEditText({ ...editText, price: realPrice });
            setPreviewPrice(previewPrice);
          }
        }
      }

      if (name === "title") {
        setIsValidTitle(true);
        if (value.length > MAX_TITLE_LENGTH) return;
        setEditText((editText) => ({ ...editText, title: value }));
      }

      if (name === "content") {
        setIsValidContent(true);
        if (value.length > MAX_CONTENT_LENGTH) return;
        setEditText((editText) => ({ ...editText, content: value }));
      }
    };

    /* SUBMIT EDIT FORM --------------------------------------------------------- */
    const handleSubmit = (e) => {
      e.preventDefault();

      if (!editText.title.trim().length) setIsValidTitle(false);
      if (!editText.price.trim().length) setIsValidPrice(false);
      if (!editText.content.trim().length) setIsValidContent(false);
      if (!previewFiles.length) setOpenImageNumberAlert(true);

      if (
        editText.title.trim().length &&
        editText.price.trim().length &&
        editText.content.trim().length &&
        previewFiles.length
      ) {
        const textData = {
          ...editText,
          imageList: deletedFiles,
          price: editText.price.replaceAll(",", ""),
        };

        let formData = new FormData();
        files.map((file) => formData.append("multipartFile", file));
        formData.append(
          "articlesDto",
          new Blob([JSON.stringify(textData)], { type: "application/json" })
        );

        const payload = {
          articlesId: id,
          data: formData,
        };
        patchMutate(payload);
        navigate(`/detail/${id}`);
      }
    };

    return (
      <StEditForm onSubmit={handleSubmit}>
        <StImageContainer>
          <StTime>
            <span>{createdAt}</span>
          </StTime>
          <StImage>
            <StBgImage alt="detailcheck" src={images[0]} />
          </StImage>
          <StPreview>
            <label htmlFor="input-file" onChange={handleAddImages}>
              <IconPlus width="40px" height="40px" />
              <input
                className="a11y-hidden"
                type="file"
                id="input-file"
                multiple
                accept="image/*"
              />
            </label>
            <StImages>
              <StImagesList>
                {previewFiles.length === 0 ? (
                  <p>사진을 등록해 주세요.</p>
                ) : (
                  <>
                    {previewFiles.map((image, id) => {
                      return (
                        <StPreviewImage key={image}>
                          <Button
                            variant="image"
                            onClickHandler={() => handleDeleteImage(image, id)}
                          >
                            <IconX stroke={colors.white} />
                          </Button>
                          <img
                            alt="detailcheck preview"
                            src={image}
                            key={image}
                          />
                        </StPreviewImage>
                      );
                    })}
                  </>
                )}
              </StImagesList>
            </StImages>
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
        </StImageContainer>
        <StTextContainer>
          <SelectBox
            data={selectboxData}
            currentValue={editText.category}
            handleOnChangeSelectValue={handleChangeSelectbox}
          />
          <StText isValid={isValidTitle}>
            <Input
              theme="grey"
              placeholder="제목을 입력해 주세요."
              onChangeHandler={handleChange}
              name="title"
              value={editText.title}
            />
          </StText>
          <StPrice isValid={isValidPrice}>
            <Input
              theme="grey"
              placeholder="가격을 입력해 주세요."
              onChangeHandler={handleChange}
              value={previewPrice}
              name="price"
            />
            {previewPrice.trim().length ? <span>원</span> : null}
          </StPrice>
          <StText isValid={isValidContent}>
            <Textarea
              onChangeHandler={handleChange}
              value={editText.content}
              name="content"
            />
            <p>*15글자 이상 입력해 주세요.</p>
          </StText>
        </StTextContainer>
        <StButton>
          <StCancelBtn>
            <Button
              size="large_round"
              theme="grey"
              onClickHandler={() => navigate(`/detail/${id}`)}
            >
              취소
            </Button>
          </StCancelBtn>
          <StSendBtn isMobile={isMobile}>
            <Button
              size="large_round"
              type="submit"
              isDisabled={patchDetailCheckLoading ? true : false}
            >
              전송하기
            </Button>
          </StSendBtn>
        </StButton>
      </StEditForm>
    );
  }
};

const StEditForm = styled.form`
  position: relative;
  top: 64px;
`;

const StImageContainer = styled.div`
  position: relative;
`;

const StTime = styled.div`
  position: absolute;
  top: 8px;
  right: 18px;
  z-index: 11;
  color: ${colors.grey3};
  font-family: "Roboto", "Noto Sans KR", sans-serif;
  font-size: 12px;
`;

const StImage = styled.div`
  background: ${colors.black};
  width: 100%;
  height: 230px;

  img {
  }
`;
const StBgImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 30%;
`;

const StPreview = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  height: 70px;
  padding-left: 85px;
  bottom: 20px;
  margin-top: -70px;
  position: relative;

  .a11y-hidden {
    ${a11yHidden}
  }

  label {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 35px;
  }
`;

const StImages = styled.div`
  overflow-x: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none;
  }
`;

const StImagesList = styled.div`
  display: flex;
  gap: 4px;

  p {
    color: ${colors.red};
  }
`;

const StPreviewImage = styled.div`
  width: 100%;
  position: relative;

  img {
    width: 70px;
    height: 70px;
    object-fit: cover;
  }

  button {
    background: rgba(0, 0, 0, 0.3);
    position: absolute;
    top: 0;
    right: 0;
    z-index: 11;
  }
`;

const StTextContainer = styled.div`
  padding: 20px 35px 100px 35px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StText = styled.div`
  input {
    color: ${colors.black};
    ::placeholder {
      color: ${({ isValid }) =>
        isValid ? `${colors.grey3}` : `${colors.red}`};
    }
    border-color: ${({ isValid }) =>
      isValid ? `${colors.grey3}` : `${colors.red}`};
  }

  span {
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    color: ${colors.grey3};
  }

  textarea {
    border-color: ${({ isValid }) =>
      isValid ? `${colors.grey3}` : `${colors.red}`};
  }

  p {
    color: ${({ isValid }) => (isValid ? `${colors.grey3}` : `${colors.red}`)};
    font-size: 12px;
    text-align: right;
  }
`;

const StPrice = styled.div`
  position: relative;

  input {
    ::placeholder {
      color: ${({ isValid }) =>
        isValid ? `${colors.grey3}` : `${colors.red}`};
    }
    border-color: ${({ isValid }) =>
      isValid ? `${colors.grey3}` : `${colors.red}`};
  }

  span {
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    color: ${colors.grey3};
  }
`;

const StButton = styled.div`
  display: flex;
  position: fixed;
  bottom: 30px;
  padding: 0 35px;
  width: 100%;
  gap: 10px;
`;

const StCancelBtn = styled.div`
  min-width: 100px;
`;

const StSendBtn = styled.div`
  width: ${({ isMobile }) => (isMobile ? "100%" : "320px")};
  @media screen and (max-width: 950px) {
    width: 100%;
  }
`;
export default EditForm;
