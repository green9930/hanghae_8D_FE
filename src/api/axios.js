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
});

/* REQUEST INTERCEPTORS ----------------------------------------------------- */
tokenInstance.interceptors.request.use(
  (config) => {
    // 요청이 전달되기 전에 작업 수행
    console.log("REQUEST INTERCEPTORS : SUCCESS");
    const accessToken = getCookie("accessToken");
    config.headers.Authorization = `${accessToken}`;
    return config;
  },
  (error) => {
    // 요청 오류가 있는 작업 수행
    console.log("REQUEST INTERCEPTORS : FAILED", error);
    return Promise.reject(error);
  }
);

/* RESPONSE INTERCEPTORS ---------------------------------------------------- */
tokenInstance.interceptors.response.use(
  (response) => {
    // 응답 데이터가 있는 작업 수행 : STATUS CODE 2XX
    console.log("RESPONSE INTERCEPTORS : SUCCESS");
    return response;
  },
  async (error) => {
    // 응답 오류가 있는 작업 수행 : STATUS CODE WITHOUT 2XX
    console.log("RESPONSE INTERCEPTORS : FAILED", error);
    try {
      const { message, response, config } = error;
      const originalRequest = config;

      // ERROR CODE 수정 필요
      if (message === "Network Error" || response.data.errorCode === "400") {
        const refreshToken = getCookie("refreshToken");
        console.log("REFRESHTOKEN", refreshToken);
        /* GET : NEW ACCESSTOKEN ---------------------------------------------------- */
        const response = await axios({
          method: "get",
          url: `${process.env.REACT_APP_BASE_URL}/auth/user/token`,
          headers: {
            "Content-Type": "application/json",
            refreshToken: refreshToken,
          },
        });
        console.log("GET NEW ACCESSTOKEN : SUCCESS", response);
        /* CHANGE ACCESSTOKEN ------------------------------------------------------- */
        console.log(
          "NEW ACCESSTOKEN AUTHORIZATION",
          response.headers.authorization
        );
        originalRequest.headers.Authorization = response.headers.authorization;
        removeCookie("accessToken");
        setCookie("accessToken", response.headers.authorization);
        return axios(originalRequest);
      }
    } catch (error) {
      console.log("GET NEW ACCESSTOKEN : FAIL", error);
      // removeCookie("accessToken");
      // removeCookie("refreshToken");
      // window.location.href = "/";
      return false;
    }
    return Promise.reject(error);
  }
);

/* IMAGE INSTANCE WITH TOKEN ------------------------------------------------------ */
export const tokenImageInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
    responseType: "blob",
  },
});

/*IMAGE REQUEST INTERCEPTORS ----------------------------------------------------- */
tokenImageInstance.interceptors.request.use(
  (config) => {
    // 요청이 전달되기 전에 작업 수행
    console.log("REQUEST INTERCEPTORS : SUCCESS");
    const accessToken = getCookie("accessToken");
    config.headers.Authorization = `${accessToken}`;
    return config;
  },
  (error) => {
    // 요청 오류가 있는 작업 수행
    console.log("REQUEST INTERCEPTORS : FAILED", error);
    return Promise.reject(error);
  }
);

/*IMAGE RESPONSE INTERCEPTORS ---------------------------------------------------- */
tokenImageInstance.interceptors.response.use(
  (response) => {
    // 응답 데이터가 있는 작업 수행 : STATUS CODE 2XX
    console.log("RESPONSE INTERCEPTORS : SUCCESS");
    return response;
  },
  async (error) => {
    // 응답 오류가 있는 작업 수행 : STATUS CODE WITHOUT 2XX
    console.log("RESPONSE INTERCEPTORS : FAILED", error);
    try {
      const { message, response, config } = error;
      const originalRequest = config;

      // ERROR CODE 수정 필요
      if (message === "Network Error" || response.data.errorCode === "400") {
        const refreshToken = getCookie("refreshToken");
        console.log("REFRESHTOKEN", refreshToken);
        /* GET : NEW ACCESSTOKEN ---------------------------------------------------- */
        const response = await axios({
          method: "get",
          url: `${process.env.REACT_APP_BASE_URL}/auth/user/token`,
          headers: {
            "Content-Type": "application/json",
            refreshToken: refreshToken,
          },
        });
        console.log("GET NEW ACCESSTOKEN : SUCCESS", response);
        /* CHANGE ACCESSTOKEN ------------------------------------------------------- */
        console.log(
          "NEW ACCESSTOKEN AUTHORIZATION",
          response.headers.authorization
        );
        originalRequest.headers.Authorization = response.headers.authorization;
        removeCookie("accessToken");
        setCookie("accessToken", response.headers.authorization);
        return axios(originalRequest);
      }
    } catch (error) {
      console.log("GET NEW ACCESSTOKEN : FAIL", error);
      // removeCookie("accessToken");
      // removeCookie("refreshToken");
      // window.location.href = "/";
      return false;
    }
    return Promise.reject(error);
  }
);
