import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Modal from "components/layout/Modal";
import Button from "components/elements/Button";
import ImageModal from "components/detail/ImageModal";
import DeleteAlert from "components/detail/DeleteAlert";
import { colors, fontSize } from "styles/theme";
import icons from "assets";

const DetailCarousel = ({
  children,
  width,
  height,
  createdAt,
  isMyArticles,
  articlesId,
  process,
}) => {
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openImageModal, setOpenImageModal] = useState(false);

  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    initialSlide: 0,
  };

  const { IconDots, IconX } = icons;

  return (
    <StCarousel>
      <StTime>
        <span>{createdAt}</span>
        {isMyArticles && process === "진행중" && (
          <Button variant="image" onClickHandler={() => setOpenMenu(true)}>
            <IconDots width="20px" height="20px" fill={`${colors.grey4}`} />
          </Button>
        )}
      </StTime>
      <Slider {...settings}>
        {children?.map((val) => {
          return (
            <StImg
              key={val}
              width={width}
              height={height}
              onClick={() => setOpenImageModal(true)}
            >
              <img alt="upload post" src={val} />
            </StImg>
          );
        })}
      </Slider>
      {openMenu && (
        <StMenu>
          <StButton>
            <Button variant="image" onClickHandler={() => setOpenMenu(false)}>
              <IconX width="20px" height="20px" stroke={colors.grey4} />
            </Button>
          </StButton>
          <Button
            theme="transparent"
            onClickHandler={() => navigate(`/edit/${articlesId}`)}
          >
            수정
          </Button>
          <Button
            theme="transparent"
            onClickHandler={() => setOpenDeleteAlert(true)}
          >
            삭제
          </Button>
        </StMenu>
      )}
      {openDeleteAlert && (
        <Modal handleOpenModal={() => setOpenDeleteAlert(false)}>
          <DeleteAlert
            isArticle={true}
            articlesId={articlesId}
            handleOpenModal={() => setOpenDeleteAlert(false)}
          />
        </Modal>
      )}
      {openImageModal && (
        <ImageModal
          handleOpenModal={() => setOpenImageModal(false)}
          images={children}
        />
      )}
    </StCarousel>
  );
};

const StCarousel = styled.div`
  position: relative;
  background-color: ${colors.white};
  height: 230px;

  .slick-dots {
    bottom: 10px;
    color: ${colors.white};

    li,
    .slick-active {
      margin: -4px;
      padding: 0;

      button,
      button::before {
        font-size: 8px;
        width: 10px;
      }
    }
  }
`;

const StTime = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 8px;
  right: 18px;
  z-index: 11;
  color: ${colors.grey3};
  font-family: "Roboto", "Noto Sans KR", sans-serif;
  font-size: 12px;
  gap: 4px;
`;

const StImg = styled.div`
  img {
    width: ${({ width }) => `${width}`};
    height: ${({ height }) => `${height}`};
    object-fit: cover;
  }
`;

const StMenu = styled.div`
  display: flex;
  flex-direction: column;
  width: 90px;
  height: 90px;
  padding-top: 20px;
  background: ${colors.white};
  position: absolute;
  top: 8px;
  right: 18px;
  z-index: 11;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.25);

  button {
    height: 30px;
    color: ${colors.grey2};
    font-size: ${fontSize.regular14};
  }
`;

const StButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  button {
    height: 100%;
  }
`;

export default DetailCarousel;
