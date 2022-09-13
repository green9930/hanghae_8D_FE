import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailCheck } from "api/detailApi";
import { useMutation, useQuery, useQueryClient } from "react-query";
import LoadingMessage from "components/etc/LoadingMessage";
import { colors } from "styles/theme";
import SelectBox from "components/elements/SelectBox";
import { useState } from "react";
import Input from "components/elements/Input";
import Textarea from "components/elements/Textarea";
import Button from "components/elements/Button";
import { useEffect } from "react";
import icons from "assets";
import { a11yHidden } from "styles/mixin";
import { patchDetailCheck } from "api/editApi";
import Modal from "components/layout/Modal";
import ImageNumAlert from "components/form/ImageNumAlert";
import ImageAlert from "components/form/ImageAlert";
import handlePrice from "utils/handlePrice";

const EditForm = () => {
  const [editText, setEditText] = useState({
    category: "",
    title: "",
    price: "",
    content: "",
  });
  const [previewCategory, setPreviewCategory] = useState("");
  const [deletedFiles, setDeletedFiles] = useState([]);
  const [files, setFiles] = useState([]);
  const [previewFiles, setPreviewFiles] = useState([]);
  const [openImageAlert, setOpenImageAlert] = useState(false);
  const [openImageNumberAlert, setOpenImageNumberAlert] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const { IconPlus, IconX } = icons;

  const queryClient = useQueryClient();

  const { isLoading, data, refetch, isSuccess } = useQuery(
    // const detailcheck = useQuery(
    "detailCheckEdit",
    () => getDetailCheck(id),
    {
      onSuccess: (data) => {
        // console.log("GET DETAIL CHECK EDIT", data.data);
        setEditText({
          ...editText,
          category: data.data.category,
          title: data.data.title,
          price: data.data.price,
          content: data.data.content,
        });
        setPreviewCategory(data.data.category);
        setPreviewFiles([...data.data.images]);
      },
      staleTime: 5000,
      enabled: false,
    }
  );

  const { mutate: patchMutate } = useMutation(patchDetailCheck, {
    onSuccess: (data) => {
      console.log("PATCH DETAILCHECK", data);
      queryClient.invalidateQueries("detailCheck");
    },
  });

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) return <LoadingMessage />;

  if (isSuccess) {
    const {
      nickName,
      articlesId,
      title,
      content,
      category,
      price,
      isMyArticles,
      userRank,
      process,
      createdAt,
      images,
    } = data?.data;

    const selectboxData = [
      { key: 1, value: "디지털/생활가전", category: "digital" },
      { key: 2, value: "의류/잡화", category: "clothes" },
      { key: 3, value: "스포츠/레저", category: "sports" },
      { key: 4, value: "가구/인테리어", category: "interior" },
      { key: 5, value: "도서/여행/취미", category: "hobby" },
      { key: 6, value: "반려동물/식물", category: "pet" },
      { key: 7, value: "식품", category: "food" },
      { key: 8, value: "기타", category: "etc" },
    ];

    const MAX_IMG_SIZE = 20000000;

    const handleAddImages = (e) => {
      if (previewFiles.length + [...e.target.files].length > 5)
        return setOpenImageNumberAlert(true);

      [...e.target.files].map((item) => {
        if (item.size > MAX_IMG_SIZE) return setOpenImageAlert(true);
        const reader = new FileReader();
        reader.readAsDataURL(item);
        reader.onload = () =>
          setPreviewFiles((previewFiles) => [...previewFiles, reader.result]);
      });
      setFiles([...files, ...e.target.files]);
    };

    const handleDeleteImage = (image, id) => {
      images.includes(image)
        ? setDeletedFiles([...deletedFiles, image])
        : setFiles(files.filter((file, index) => index !== id));
      setPreviewFiles(previewFiles.filter((file, index) => index !== id));
    };

    console.log("PREVIEWFILES", previewFiles);
    console.log("FILES", files);
    console.log("DELETEDFILES", deletedFiles);

    const handleChangeSelectbox = (e) => {
      const { category } = selectboxData.find(
        (val) => val.value === e.target.innerText
      );
      setPreviewCategory(e.target.innerText);
      setEditText({ ...editText, category: category });
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      if (name === "price") {
        const { isValid, realPrice, previewPrice } = handlePrice(value);
        if (isValid) {
          // setRealCommentPrice({ ...realCommentPrice, comment: realPrice });
          // setCommentPrice(previewPrice);
        }
      }
      setEditText({ ...editText, [name]: value });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const textData = {
        ...editText,
        imageList: deletedFiles,
        price: "20000",
      };

      let formData = new FormData();
      files.map((file) => formData.append("multipartFile", file));
      formData.append(
        "articlesDto",
        new Blob([JSON.stringify(textData)], { type: "application/json" })
      );

      console.log("TEXTDATA", textData);
      console.log("IMGDATA", files);
      const payload = {
        articlesId: id,
        data: formData,
      };

      patchMutate(payload);
      navigate(`/detail/${id}`);
    };

    // console.log("EDITTEXT", editText);

    return (
      <StEditForm onSubmit={handleSubmit}>
        <StImageContainer>
          <StTime>
            <span>{createdAt}</span>
          </StTime>
          <StImage>
            <img alt="detailcheck" src={images[0]} />
          </StImage>
          <StPreview>
            <label htmlFor="input-file" onChange={handleAddImages}>
              <IconPlus />
              <input
                className="a11y-hidden"
                type="file"
                id="input-file"
                multiple
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
          </StPreview>
        </StImageContainer>
        <StTextContainer>
          <SelectBox
            data={selectboxData}
            currentValue={previewCategory}
            handleOnChangeSelectValue={handleChangeSelectbox}
          />
          <Input
            theme="grey"
            placeholder="제목을 입력해 주세요."
            onChangeHandler={handleChange}
            name="title"
            value={editText.title}
          />
          <Input
            theme="grey"
            placeholder="가격을 입력해 주세요."
            onChangeHandler={handleChange}
            value={editText.price}
            name="price"
          />
          <StTextArea>
            <Textarea
              onChangeHandler={handleChange}
              value={editText.content}
              name="content"
            />
            <p>*15글자 이상 입력해 주세요.</p>
          </StTextArea>
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
          <Button size="large_round" type="submit">
            전송하기
          </Button>
        </StButton>
      </StEditForm>
    );
  }
};

const StEditForm = styled.form``;

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
  width: 100%;
  height: 230px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const StPreview = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  margin-top: -90px;
  padding-left: 35px;

  .a11y-hidden {
    ${a11yHidden}
  }
`;

const StImages = styled.div`
  overflow: scroll;
`;

const StImagesList = styled.div`
  display: flex;
  gap: 4px;
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
  padding: 40px 35px 0 35px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StTextArea = styled.div`
  p {
    color: ${colors.grey3};
    font-size: 12px;
    text-align: right;
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

export default EditForm;
