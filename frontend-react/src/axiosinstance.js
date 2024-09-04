import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_BASE_API;

// creating the axios instance
const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// creating the request interceptor

axiosInstance.interceptors.request.use(
  // NB: config is the request
  function (config) {
    // get the accessToken

    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      // put the access token inside the request
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {return Promise.reject(error);
  }
);

// creating the response interceptor

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  // handle failed response
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // get the refresh token
      const refreshToken = localStorage.getItem("refreshToken");
      try {
        const response = await axiosInstance.post("/token/refresh/", {
          refresh: refreshToken,
        });
        localStorage.setItem("accessToken", response.data.access);
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${response.data.access}`;

        return axiosInstance(originalRequest);
      } catch (error) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;


