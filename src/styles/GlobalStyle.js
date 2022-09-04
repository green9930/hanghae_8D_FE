import { createGlobalStyle } from "styled-components";
import { colors, fontSize } from "styles/theme";

const GlobalStyle = createGlobalStyle`
  /* tway 폰트 적용 필요한 경우 */
  /* font-family: 'twayfly', 'Noto Sans KR', sans-serif; */
  @font-face {
    font-family: 'twayfly';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_tway@1.0/twayfly.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }

  * {
    box-sizing: border-box;
    font-size: ${fontSize.regular14};
    font-family: 'Noto Sans KR', sans-serif;
  }
  
  body {
    background-color: ${colors.white};
    margin: 0 auto;
  }

  h1 {
    margin: 0;
    font-size: ${fontSize.large28};
    font-weight: 500;
  }

  h2 {
    margin: 0;
    font-size: ${fontSize.large24};
  }

  h3 {
    margin: 0;
    font-size: ${fontSize.regular18};
  }

  ul {
    list-style: none;
    margin: 0;
  }

  p {
    margin: 0;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: ${fontSize.regular14};
    font-weight: 400;
    line-height: 19px;
  }

  a {
    text-decoration: none;
  }

  button {
    cursor: pointer;
  }

  input {
    font-family: 'Noto Sans KR', sans-serif;
    outline: none;

    ::placeholder,
    ::-webkit-input-placeholder {
      font-family: 'Noto Sans KR', sans-serif;
      font-weight: 400;
      font-size: ${fontSize.regular16};
    }
  }

  select {
    height: 40px;
    border: 0.5px solid gray;
    border-radius: 5px;
    font-family: 'Noto Sans KR', sans-serif;
    padding: 12px 0px 12px 20px; 
  }

  textarea {
    height: 40px;
    border: 0.5px solid gray;
    border-radius: 5px;
    font-family: 'Noto Sans KR', sans-serif;
    padding: 12px 0px 12px 20px; 
  }

  button, input, textarea {
    :focus {
      outline: none;
    }
    :hover {
      outline: none;
    }
  }
`;

export default GlobalStyle;
