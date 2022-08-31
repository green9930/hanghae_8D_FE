import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
      font-family: 'twayair';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_tway@1.0/twayair.woff') format('woff');
      font-weight: 400;
      font-style: normal;
  }

  * {
    font-size: 14px;
    box-sizing: border-box;
    font-family: 'twayair', 'Noto Sans KR', sans-serif;
  }
  
  body {
    background-color: #ffffff;
    margin: 0 auto;
  }

  h1 {
    margin: 0;
    font-size: 28px;
    font-weight: 500;
  }

  h2 {
    margin: 0;
    font-size: 32px;
  }

  h3 {
    margin: 0;
    font-size: 20px;
  }

  ul {
    list-style: none;
  }

  p {
    font-size: 18px;
    margin: 0;
  }

  a {
    text-decoration: none;
  }

  button {
    cursor: pointer;
  }

  input {
    height: 40px;
    border: 0.5px solid gray;
    border-radius: 5px;
    font-family: 'Noto Sans KR', sans-serif;
    padding: 12px 0px 12px 20px; 

    ::placeholder,
    ::-webkit-input-placeholder {
      font-size: 16px;
      font-family: 'Noto Sans KR', sans-serif;
    }
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
