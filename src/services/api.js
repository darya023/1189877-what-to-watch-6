import axios from "axios";

const BASE_URL = `https://6.react.pages.academy/wtw`;
const REQUEST_TIMEOUT = 5000;
const HttpCode = {
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400
};

export const createAPI = (onUnauthorized) => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
    withCredentials: true
  });

  const onSuccess = (response) => response;

  const onError = (error) => {
    const {response} = error;

    if (response.status === HttpCode.UNAUTHORIZED) {
      onUnauthorized();
    }

    throw error;
  };

  api.interceptors.response.use(onSuccess, onError);

  return api;
};
