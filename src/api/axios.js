import axios from "axios";
import { getCookie, removeCookie, setCookie } from "api/cookies";

/* INSTANCE WITHOUT TOKEN --------------------------------------------------- */
export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

/* INSTANCE WITH TOKEN ------------------------------------------------------ */
export const tokenInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
  withCredentials: true,
});

/* REQUEST INTERCEPTORS ----------------------------------------------------- */
tokenInstance.interceptors.request.use(
  // 요청이 전달되기 전에 작업 수행
  (config) => {
    const accessToken = getCookie("accessToken");
    config.headers.Authorization = `${accessToken}`;
    return config;
  },
  (error) => {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
  }
);

/* RESPONSE INTERCEPTORS ---------------------------------------------------- */
tokenInstance.interceptors.response.use(
  (response) => {
    // 응답 데이터가 있는 작업 수행 : STATUS CODE 2XX
    return response;
  },
  async (error) => {
    // 응답 오류가 있는 작업 수행 : STATUS CODE WITHOUT 2XX
    try {
      const { message, response, config } = error;
      const originalRequest = config;
      // ACCESSTOKEN FAILED : 405 / REFRESHTOKEN FAILED : 403
      /* GET ACCESSTOKEN FAILED --------------------------------------------------- */
      if (message === "Network Error" || response.data.errorCode === "405") {
        const refreshToken = getCookie("refreshToken");
        /* GET : NEW ACCESSTOKEN ---------------------------------------------------- */
        try {
          const response = await axios({
            method: "get",
            url: `${process.env.REACT_APP_BASE_URL}/auth/user/token`,
            headers: {
              "Content-Type": "application/json",
              refreshToken: refreshToken,
            },
          });
          /* CHANGE ACCESSTOKEN ------------------------------------------------------- */
          originalRequest.headers.Authorization =
            response.headers.authorization;
          removeCookie("accessToken");
          setCookie("accessToken", response.headers.authorization);
          return axios(originalRequest);
        } catch (error) {
          /* CHANGE ACCESSTOKEN FAILED ------------------------------------------------ */
          removeCookie("accessToken");
          removeCookie("refreshToken");
          window.location.href = "/";
        }
        /* GET REFRESHTOKEN FAILED -------------------------------------------------- */
      } else if (response.data.errorCode === "403") {
        removeCookie("accessToken");
        removeCookie("refreshToken");
        window.location.href = "/";
      }
    } catch (error) {
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);
