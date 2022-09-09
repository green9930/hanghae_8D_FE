import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import icons from "assets";
import { colors } from "styles/theme";
import Button from "components/elements/Button";
import { useState } from "react";
import DeleteAlert from "./DeleteAlert";
import Modal from "components/layout/Modal";

const DetailCarousel = ({
  children,
  width,
  height,
  createdAt,
  isMyArticles,
  articlesId,
}) => {
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    initialSlide: 0,
  };

  const { IconTrash } = icons;

  const handleDeleteDetail = () => setOpenDeleteAlert(true);

  return (
    <StCarousel>
      <StTime>
        <span>{createdAt}</span>
        {isMyArticles && (
          <Button variant="image" onClickHandler={handleDeleteDetail}>
            <IconTrash width="20px" height="20px" fill={`${colors.grey3}`} />
          </Button>
        )}
      </StTime>
      <Slider {...settings}>
        {children?.map((val) => {
          return (
            <StImg key={val} width={width} height={height}>
              <img alt="upload post" src={val} />
            </StImg>
          );
        })}
      </Slider>
      {openDeleteAlert && (
        <Modal handleOpenModal={() => setOpenDeleteAlert(false)}>
          <DeleteAlert
            isArticle={true}
            articlesId={articlesId}
            handleOpenModal={() => setOpenDeleteAlert(false)}
          />
        </Modal>
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

export default DetailCarousel;
