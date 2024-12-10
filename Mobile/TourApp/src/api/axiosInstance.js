import axios from "axios";
import config from "./config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

const axiosInstance = axios.create({
  baseURL: config.baseURL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      // Chỉ thêm token nếu không phải endpoint đăng nhập
      if (!config.url.includes("/auth/login")) {
        const token = await AsyncStorage.getItem("accessToken");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }

      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => Promise.reject(error)
);

// Interceptor cho response
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Nếu nhận được mã lỗi 401 và request không phải login, thử làm mới token
    if (
      error.response.status === 401 &&
      !originalRequest.url.includes("auth/login")
    ) {
      try {
        const refreshToken = JSON.parse(
          await AsyncStorage.getItem("refreshToken")
        );

        // Gửi request để lấy accessToken mới
        const refreshedTokenResponse = await axiosInstance.post(
          "/auth/refreshToken",
          {
            refreshToken: refreshToken,
          }
        );

        const newAccessToken = refreshedTokenResponse.data.newAccessToken;
        await AsyncStorage.setItem(
          "accessToken",
          JSON.stringify(newAccessToken)
        );

        // Cập nhật header Authorization với token mới và retry request cũ
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);

      } catch (refreshError) {
        showErrorToast("Your session has expired. Please login again.");
        await AsyncStorage.clear();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

const showErrorToast = (message) => {
  Toast.show({
    type: "error",
    text1: "Error",
    text2: message,
    position: "bottom",
    visibilityTime: 4000,
    autoHide: true,
  });
};

export default axiosInstance;
