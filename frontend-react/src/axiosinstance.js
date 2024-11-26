// import axios from "axios";

// const baseURL = import.meta.env.VITE_BACKEND_BASE_API;

// // creating the axios instance
// const axiosInstance = axios.create({
//   baseURL: baseURL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // creating the request interceptor

// axiosInstance.interceptors.request.use(
//   // NB: config is the request
//   function (config) {
//     // get the accessToken

//     const accessToken = localStorage.getItem("accessToken");
//     if (accessToken) {
//       // put the access token inside the request
//       config.headers["Authorization"] = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   function (error) {return Promise.reject(error);
//   }
// );

// // creating the response interceptor

// axiosInstance.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   // handle failed response
//   async function (error) {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       // get the refresh token
//       const refreshToken = localStorage.getItem("refreshToken");
//       try {
//         const response = await axios.post(`${baseURL}/token/refresh/`, {
//           refresh: refreshToken,
//         });
//         localStorage.setItem("accessToken", response.data.access);
//         originalRequest.headers[
//           "Authorization"
//         ] = `Bearer ${response.data.access}`;

//         return axiosInstance(originalRequest);
//       } catch (error) {
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("refreshToken");
//         window.location.href='/login'
        
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;



import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_BASE_API;

// Create the axios instance
const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem("accessToken");
    // console.log(config)
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    // console.log(config)
    return config;
  },
  function (error) {
    // console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    //console.log(response)
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    // if (error.response) {
    //   console.error("Response error status:", error.response.status);
    //   console.error("Response error data:", error.response.data);
    // } else {
    //   console.error("Response error:", error.message);
    // }

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        //console.error("No refresh token available.");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = '/login';
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(`${baseURL}/token/refresh/`, {
          refresh: refreshToken,
        });
        //console.log("New access token:", response.data.access);
        localStorage.setItem("accessToken", response.data.access);
        originalRequest.headers["Authorization"] = `Bearer ${response.data.access}`;

        return axiosInstance(originalRequest);
      } catch (err) {
        //console.error("Token refresh error:", err);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = '/login';
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;


