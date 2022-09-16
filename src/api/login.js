const {
  REACT_APP_KAKAO_CLIENT_ID,
  REACT_APP_KAKAO_REDIRECT_URI,
  REACT_APP_GOOGLE_CLIENT_ID,
  REACT_APP_GOOGLE_REDIRECT_URI,
} = process.env;

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;

export const NAVER_AUTH_URL = ``;

export const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${REACT_APP_GOOGLE_REDIRECT_URI}&response_type=code&scope=profile%20email`;
