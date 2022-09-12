import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getDetailCheck } from "api/detailApi";
import { useQuery } from "react-query";
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
import { putDetailCheck } from "api/editApi";

const EditForm = () => {
  // const formData = {
  //   articlesDto: {
  //     title: "",
  //     content: "",
  //     category: "",
  //     price: "",
  //   },
  //   multipartFile: ["dfnsdf.png", "dfnsdf.png", "dfnsdf.png"],
  // };

  const [editText, setEditText] = useState({
    category: "",
    title: "",
    price: "",
    content: "",
  });
  const [files, setFiles] = useState([]);

  const { id } = useParams();
  const { IconPlus, IconX } = icons;

  const { isLoading, data, refetch, isSuccess } = useQuery(
    // const detailcheck = useQuery(
    "detailCheckEdit",
    () => getDetailCheck(id),
    {
      onSuccess: (data) => {
        // console.log("GET DETAIL CHECK EDIT", data.data);
        setEditText({
          ...editText,
          category: `카테고리 > ${data.data.category}`,
          title: data.data.title,
          price: data.data.price,
          content: data.data.content,
        });
        setFiles([...data.data.images]);
      },
      staleTime: 5000,
      enabled: false,
    }
  );

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    // console.log(editText.category.includes("카테고리 >"));
  }, [editText]);

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

    const handleAddImages = (e) => {
      setFiles([...files, ...e.target.files]);
      console.log([...files, ...e.target.files]);
      console.log(e.target.files);
      console.log("FILE LENGTH", [...files, ...e.target.files].length);
    };

    const handleDeleteImage = (id) => {
      console.log(id);
      setFiles(files.filter((file, index) => index !== id));
    };

    const handleChangeSelectbox = (e) => {
      setEditText({ ...editText, category: e.target.innerText });
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      if (editText.category.includes("카테고리 >"))
        setEditText({
          ...editText,
          category: editText.category.replace("카테고리 > ", ""),
        });
      setEditText({ ...editText, [name]: value });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(editText.category.includes("카테고리 >"));
      console.log("SUBMIT TEXT", editText);
      console.log("SUBMIT FILES", files);
      const payload = {
        articlesId: id,
        data: { editText, files },
      };
      putDetailCheck(payload);
    };

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
                {files.map((image, id) => {
                  return (
                    <StPreviewImage key={image}>
                      <Button
                        variant="image"
                        onClickHandler={() => handleDeleteImage(id)}
                      >
                        <IconX stroke={colors.white} />
                      </Button>
                      <img alt="detailcheck preview" src={image} key={image} />
                    </StPreviewImage>
                  );
                })}
              </StImagesList>
            </StImages>
          </StPreview>
        </StImageContainer>
        <StTextContainer>
          <SelectBox
            data={selectboxData}
            currentValue={editText.category}
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
    z-index: 111;
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
  position: fixed;
  bottom: 30px;
  padding: 0 35px;
  width: 100%;
`;

export default EditForm;
