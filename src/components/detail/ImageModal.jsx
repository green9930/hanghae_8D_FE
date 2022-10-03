import { useEffect } from "react";
import Slider from "react-slick";
import { isMobile } from "react-device-detect";
import styled, { css } from "styled-components";
import Button from "components/elements/Button";
import { colors } from "styles/theme";
import icons from "assets";

const ImageModal = ({ images, handleOpenModal }) => {
  const { IconX } = icons;

  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;

    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

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
    <StModal onClick={handleOpenModal}>
      <StXBtn>
        <Button
          variant="image"
          theme="transparent"
          onClickHandler={handleOpenModal}
        >
          <IconX stroke={colors.grey1} />
        </Button>
      </StXBtn>
      <StModalBody>
        <StCarousel
          isMobile={isMobile}
          onClick={(e) => (isMobile ? null : e.stopPropagation())}
        >
          <Slider {...settings}>
            {images?.map((val) => {
              return (
                <StImg key={val}>
                  <img
                    alt="upload post"
                    src={val}
                    onClick={(e) => (isMobile ? e.stopPropagation() : null)}
                  />
                </StImg>
              );
            })}
          </Slider>
        </StCarousel>
      </StModalBody>
    </StModal>
  );
};

const StCarousel = styled.div`
  position: relative;
  width: ${({ isMobile }) => (isMobile ? "100%" : "500px")};
  height: auto;

  .slick-dots {
    position: fixed;
    bottom: 50px;
    ${({ isMobile }) => {
      if (!isMobile) {
        return css`
          left: 0;
        `;
      }
    }};
    color: ${colors.white};
    z-index: 222;

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

  .slick-track {
    display: flex;
    align-items: center;
  }
`;

const StModal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 555;
`;

const StModalBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  position: absolute;
  overflow: hidden;
  z-index: 560;
`;

const StXBtn = styled.div`
  position: absolute;
  top: 30px;
  right: 35px;
  z-index: 560;
`;

const StImg = styled.div`
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    margin: auto;
  }
`;

export default ImageModal;
