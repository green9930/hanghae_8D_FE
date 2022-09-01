import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const DetailCarousel = ({ children, width, height }) => {
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

const StImg = styled.div`
  img {
    width: ${({ width }) => `${width}`};
    height: ${({ height }) => `${height}`};
    object-fit: cover;
  }
`;

export default DetailCarousel;
