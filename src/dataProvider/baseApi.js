import axios from "axios";
import snackbarUtils from "@/utils/snackbar-utils";

const axiosDisplayError = {
  ERR_NETWORK: "Lỗi kết nối",
};
const axiosNonDisplayError = {
  ERR_BAD_RESPONSE: "Lỗi hệ thống",
};

const axiosError = (response) => {
  if (axiosNonDisplayError[response.code]) {
    console.log(axiosNonDisplayError[response.code]);
  }

  if (axiosDisplayError[response.code]) {
    console.log(axiosDisplayError[response.code]);
    snackbarUtils.error(axiosDisplayError[response.code]);
  }
};

const apiError = (response) => {
  const apiStatusError = {
    403: {
      action: () => {},
      message: "Không có quyền",
      returnUrl: "/",
    },
    401: {
      action: window.sessionStorage.setItem("authenticated", "false"),
      message: "Hết hạn token",
      returnUrl: "/auth/login",
    },
  };

  if (apiStatusError[response.response?.status]) {
    apiStatusError[response.response.status].action;
    snackbarUtils.error(apiStatusError[response.response.status].message);
    window.location.href = apiStatusError[response.response.status].returnUrl;
    return true;
  }

  return false;
};

const catchError = (err) => {
  axiosError(err);
  apiError(err);

  return false;
};

const instance = axios.create({
  baseURL: `${process.env.HOST_API_KEY}api/`,
  timeout: 60000,
});

const getLocalStorage = (key) => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem(key));
  }
};

const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const clearLocalStorage = () => {
  localStorage.clear();
};

const getApi = async (url, params) => {
  const paramObj = {};
  if (params && Object.keys(params).length) {
    Object.keys(params).forEach(function (key) {
      if (params[key]) {
        paramObj[key] = params[key];
      }
    });
  }

  const token = getLocalStorage("access_token");

  try {
    const res = await instance.get(url, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "no auth",
      },
      params: paramObj,
    });
    return res;
  } catch (err) {
    catchError(err);
    return err;
  }
};

const postApi = async (url, payload, file) => {
  const token = getLocalStorage("access_token");
  try {
    const res = await instance.post(`/${url}`, payload, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "no-author",
        "Content-Type": file
          ? "multipart/form-data"
          : "application/json; charset=utf-8",
        "Access-Control-Allow-Headers":
          "Content-Type, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version, X-File-Name",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Origin": "*",
      },
    });

    return res;
  } catch (err) {
    catchError(err);
    return err;
  }
};

const putApi = async (url, payload) => {
  const token = getLocalStorage("access_token");
  try {
    const res = await instance.put(`/${url}`, payload, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "no-author",
      },
    });

    return res;
  } catch (err) {
    catchError(err);
    return err;
  }
};

const deleteApi = async (url) => {
  const token = getLocalStorage("access_token");

  try {
    const res = await instance.delete(`/${url}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "no-author",
      },
    });

    return res;
  } catch (err) {
    catchError(err);
    return err;
  }
};

export {
  instance,
  axiosError,
  getLocalStorage,
  clearLocalStorage,
  setLocalStorage,
  getApi,
  postApi,
  putApi,
  deleteApi,
};
