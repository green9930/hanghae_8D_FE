import { useEffect } from "react";
import styled from "styled-components";
import Button from "components/elements/Button";
import { colors } from "styles/theme";
import icons from "assets";

const Modal = ({ handleOpenModal, height = "194px", children }) => {
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

  return (
    <StModal onClick={handleOpenModal}>
      <StModalBody height={height} onClick={(e) => e.stopPropagation()}>
        <StXBtn>
          <Button
            variant="image"
            theme="transparent"
            onClickHandler={handleOpenModal}
          >
            <IconX stroke={colors.grey2} />
          </Button>
        </StXBtn>
        {children}
      </StModalBody>
    </StModal>
  );
};

export default Modal;

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
  z-index: 110;
`;

const StModalBody = styled.div`
  position: absolute;
  width: 305px;
  height: ${({ height }) => height};
  background-color: ${colors.white};
  border-radius: 5px;
  overflow: hidden;
  z-index: 111;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
`;

const StXBtn = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 120;
`;
