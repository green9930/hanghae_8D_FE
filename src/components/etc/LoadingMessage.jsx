import styled from "styled-components";
import icons from "assets";

const LoadingMessage = () => {
  const {Alarm}=icons
  return (
    <div>
      <StLoadingMessage>
      <Alarm/>
      </StLoadingMessage>
    </div>
  );
};

const StLoadingMessage=styled.div`
position: fixed;
left: 50%;
top:40%;
transform: translate(-50%, 0);

`

export default LoadingMessage;
