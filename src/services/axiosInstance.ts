import axios from "axios";

const axiosInstance = axios.create({
//   baseURL: "https://ecommerce.magaritatech.com/api",
  baseURL:'http://localhost:8000/api',
  withCredentials: true,
});

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // ✅ refresh-token ko retry loop se bahar rakho
//     if (
//       error.response?.status === 401 &&
//       !originalRequest._retry &&
//       !originalRequest.url.includes("/refresh")
//     ) {
//       originalRequest._retry = true;

//       try { 
//         await axiosInstance.post("/refresh");

//         return axiosInstance(originalRequest);
//       } catch (err) {
//         console.error("Refresh token expired → redirect to login");
//         window.location.href = "/login";
//         return Promise.reject(err);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/refresh")
    ) {
      originalRequest._retry = true;

      try {
        await axiosInstance.post("/refresh", {}, { withCredentials: true });
        return axiosInstance(originalRequest);
      } catch {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
