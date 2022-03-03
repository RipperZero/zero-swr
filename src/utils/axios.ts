import type { AxiosInstance, AxiosRequestConfig } from "axios";
import axios from "axios";
import qs from "qs";

type Result<T> = {
  message: string;
  message_id: string;
  result: boolean;
  object: T;
  enError?: string;
  zhError?: string;
};

export const DEFAULT_ERROR: Result<any> = {
  message: "System is busy!",
  message_id: "9999",
  result: false,
  object: null,
};

interface NewAxiosInstance extends AxiosInstance {
  get: <T = any, R = Result<T>>(
    url: string,
    params?: Record<string, unknown>,
    config?: AxiosRequestConfig,
  ) => Promise<R>;

  post: <T = any, R = Result<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ) => Promise<R>;

  delete: <T = any, R = Result<T>>(
    url: string,
    params?: Record<string, unknown>,
    config?: AxiosRequestConfig,
  ) => Promise<R>;

  put: <T = any, R = Result<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ) => Promise<R>;

  all?: <T>(values: (T | Promise<T>)[]) => Promise<T[]>;
}

const logError = (res: any) => {
  //if (__DEV__) {
  console.error("api:", res?.config?.url);
  console.error("error message:", res?.response?.message);
  //}
};

/**
 * 设置请求header
 *
 * @param instance
 */
const withHeaderInterceptor = (instance: AxiosInstance) => {
  instance.defaults.headers.common["Content-Type"] =
    "application/json;charset=UTF-8";

  instance.interceptors.request.use(async (config) => {
    const token = (window as any).token;
    config.headers = {
      Authorization: token ? "Bearer " + token : "",
      ...config.headers,
    };
    return config;
  });
};

/**
 * 处理返回值，异常
 * @param instance
 */
const withResponseInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (res) => {
      if (res.data && !res.data.object && res.data.body) {
        res.data = {
          object: res.data.body,
          message: "",
          message_id: res.data?.messageId,
          result: res.data.success,
        };
      }
      return Promise.resolve(res.data);
    },
    (res) => {
      logError(res);
      return Promise.resolve(DEFAULT_ERROR);
    },
  );
};

/**
 *  method proxy
 * @param instance
 */
const withGetProxy = (instance: AxiosInstance) => {
  const _get = instance.get;
  instance.get = (url: string, params: any, config?: AxiosRequestConfig) => {
    return _get(
      `${url}${qs.stringify(params, { addQueryPrefix: true })}`,
      config,
    );
  };
};

const createInstance = () => {
  const instance: NewAxiosInstance = axios.create({
    withCredentials: false,
    timeout: 10000,
    // baseURL: process.env.REACT_APP_API_URL,
    baseURL: process.env.REACT_APP_API_TB1_URL,
  });

  withHeaderInterceptor(instance);
  withResponseInterceptor(instance);
  withGetProxy(instance);

  return instance;
};

export default createInstance();
