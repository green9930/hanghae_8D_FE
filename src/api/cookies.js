import Cookies from "universal-cookie";

const cookies = new Cookies();

export const setCookie = (name, value, expire) => {
  cookies.set(name, value, {
    path: "/",
  });
};

export const getCookie = (name) => cookies.get(name);

export const removeCookie = (name) => cookies.remove(name, { path: "/" });
