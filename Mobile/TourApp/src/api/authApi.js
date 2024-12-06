import axiosInstance from "./axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

const authApi = {
  login: async (email, password) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      const { email: userEmail, role, token } = response.data;

      // Lưu token và thông tin người dùng vào AsyncStorage
      await AsyncStorage.setItem("accessToken", token);
      await AsyncStorage.setItem("email", userEmail);
      await AsyncStorage.setItem("role", role);
      // Hiển thị thông báo đăng nhập thành công
      Toast.show({
        type: "success",
        text1: "Đăng nhập thành công",
        text2: "Chào mừng bạn quay lại!",
        position: "bottom",
        visibilityTime: 4000,
        autoHide: true,
      });

      return response.data;
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Đăng nhập thất bại",
        text2: error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại.",
        position: "bottom",
        visibilityTime: 4000,
        autoHide: true,
      });
      throw new Error("Login failed");
    }
  },

  register: async (email, name) => {
    try {
      const response = await axiosInstance.post("/customers/addCustomer", {
        email,
        name
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    try {
      // Xóa thông tin người dùng và token khỏi AsyncStorage khi đăng xuất
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("email");
      await AsyncStorage.removeItem("role");

      // Hiển thị thông báo đăng xuất thành công
      Toast.show({
        type: "success",
        text1: "Đăng xuất thành công",
        text2: "Bạn đã đăng xuất khỏi tài khoản.",
        position: "bottom",
        visibilityTime: 4000,
        autoHide: true,
      });

      return true; // Trả về true nếu đăng xuất thành công
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Đăng xuất thất bại",
        text2: "Có lỗi xảy ra khi đăng xuất.",
        position: "bottom",
        visibilityTime: 4000,
        autoHide: true,
      });
      return false; // Trả về false nếu có lỗi khi đăng xuất
    }
  },
};

export default authApi;
