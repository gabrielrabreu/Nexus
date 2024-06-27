import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";

interface ApiError {
  message: string;
}

const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const userJson = localStorage.getItem("user") ?? "{}";
  const user = JSON.parse(userJson) as IUser;
  const accessToken = user.accessToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = async (error: AxiosError): Promise<AxiosResponse> => {
  const apiError = error?.response?.data as ApiError;
  error.message = apiError?.message ?? error.message;

  return Promise.reject(error);
};

const setupInterceptorsTo = (httpClient: AxiosInstance): AxiosInstance => {
  httpClient.interceptors.request.use(onRequest, onRequestError);
  httpClient.interceptors.response.use(onResponse, onResponseError);
  return httpClient;
};

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

setupInterceptorsTo(httpClient);

export default httpClient;
