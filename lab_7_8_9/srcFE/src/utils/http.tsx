import { Store } from "@reduxjs/toolkit";
import axios, { AxiosInstance } from "axios";
import { RootState } from "../store";
import { logout } from "../store/slices/adminSlice";

let store: Store;

export const injectStore = (_store: Store) => {
  store = _store;
};
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "*";
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers.common["Referrer-Policy"] =
  "strict-origin-when-cross-origin";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.post["Access-Control-Allow-Credentials"] = "true";
export const defaultHttp = axios.create();
const http = axios.create();

http.interceptors.request.use(
  (config) => {
    const state: RootState = store.getState();
    const apiToken = state.admin?.token;

    if (apiToken) {
      config.headers.Authorization = `Bearer ${apiToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const getClient = (baseUrl = null) => {
  const options = {
    //baseURL: baseUrl ? baseUrl : "https://localhost:7049/api",
    baseURL: baseUrl ? baseUrl : "http://localhost/api",
    // withCredentials: true,
  };
  const client = axios.create(options);
  // Add a request interceptor
  client.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      config.headers["token"] = `${token}`;
      return config;
    },
    (error) => {
      // Handle request error
      return Promise.reject(error);
    }
  );
  // Add a response interceptor
  http.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        store.dispatch(logout());
      }
      return Promise.reject(error);
    }
  );

  return client;
};
class ApiClient {
  private client: AxiosInstance;
  constructor(baseUrl = null) {
    this.client = getClient(baseUrl);
  }

  get(url: any, conf = {}) {
    return this.client
      .get(url, conf)
      .then((response: any) => Promise.resolve(response))
      .catch((error: any) => Promise.reject(error));
  }

  delete(url: any, conf = {}) {
    return this.client
      .delete(url, conf)
      .then((response: any) => Promise.resolve(response))
      .catch((error: any) => Promise.reject(error));
  }

  head(url: any, conf = {}) {
    return this.client
      .head(url, conf)
      .then((response: any) => Promise.resolve(response))
      .catch((error: any) => Promise.reject(error));
  }

  options(url: any, conf = {}) {
    return this.client
      .options(url, conf)
      .then((response: any) => Promise.resolve(response))
      .catch((error: any) => Promise.reject(error));
  }

  post(url: any, data = {}, conf = {}) {
    return this.client
      .post(url, data, conf)
      .then((response: any) => Promise.resolve(response))
      .catch((error: any) => Promise.reject(error));
  }

  put(url: any, data = {}, conf = {}) {
    return this.client
      .put(url, data, conf)
      .then((response: any) => Promise.resolve(response))
      .catch((error: any) => Promise.reject(error));
  }

  patch(url: any, data = {}, conf = {}) {
    return this.client
      .patch(url, data, conf)
      .then((response: any) => Promise.resolve(response))
      .catch((error: any) => Promise.reject(error));
  }
}

export { ApiClient };

export default http;
