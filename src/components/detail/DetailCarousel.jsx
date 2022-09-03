import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ReactComponent as IconTrash } from "assets/icon_trash.svg";

const DetailCarousel = ({
  children,
  width,
  height,
  createdAt,
  isMyArticles,
}) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    initialSlide: 0,
  };

  return (
    <StCarousel>
      <StTime>
        <span>{createdAt}</span>
        {isMyArticles && <IconTrash width="20px" height="20px" />}
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
    </StCarousel>
  );
};

const StCarousel = styled.div`
  position: relative;
  background-color: white;
  height: 230px;

  .slick-dots {
    bottom: 10px;
    color: white;

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
