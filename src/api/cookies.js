import Cookies from "universal-cookie";

const cookies = new Cookies();

export const setCookie = (name, value) => {
  cookies.set(name, value, {
    path: "/",
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });
};

export const getCookie = (name) => cookies.get(name);

export const removeCookie = (name) => cookies.remove(name, { path: "/" });
