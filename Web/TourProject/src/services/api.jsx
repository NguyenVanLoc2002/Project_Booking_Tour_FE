import { ExceptionMap } from "antd/es/result";
import axios from "axios";
import dayjs from "dayjs";
import { message } from "antd";

const BASE_URL = "https://travelvietnam.io.vn/api/v1";

// Hàm đăng nhập
export const loginApi = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    });
    return response.data; // Trả về dữ liệu trả về từ API
  } catch (error) {
    alert("Tài khoản hoặc mật khẩu không đúng!");
    throw new Error("Login failed");
  }
};

// Hàm lấy thông tin người dùng bằng token
export const fetchUserInfo = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/customers/by-email`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user info");
  }
};

// Hàm thêm  tiêu chí
export const addPreference = async (preference, token) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/recommendation/customer-preference`,
      preference,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error adding preference:",
      error.response ? error.response.data : error.message
    );
    throw new Error(
      "Failed to add preference: " +
        (error.response ? error.response.data : error.message)
    );
  }
};

//Hàm thực hiện lưu tương tác
export const handleInteraction = async (
  tourId,
  interactionType,
  user,
  token
) => {
  if (!user) {
    console.warn("User is not logged in");
    return;
  }

  const interaction = {
    cusId: user.userId,
    tourId: tourId,
    interactionType: interactionType,
    interactionDate: dayjs().format("YYYY-MM-DD"),
  };

  try {
    await axios.post(
      `${BASE_URL}/recommendation/customer-interaction/interactions`,
      interaction,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(`Interaction ${interactionType} saved successfully`);
  } catch (error) {
    console.error(`Failed to save interaction ${interactionType}:`, error);
  }
};

//Hàm thực hiện lưu xóa tương tác
export const deleteInteraction = async (interactionId, token) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/recommendation/customer-interaction/interactions/${interactionId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(`Interaction ${interactionId} deleted successfully`);
    return response.data;
  } catch (error) {
    console.error(`Failed to delete interaction ${interactionId}:`, error);
  }
};

//Hàm thực hiện thay đổi mật khẩu
export const changePassword = async (
  email,
  oldPassword,
  newPassword,
  token
) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/auth/change-password`,
      {
        email,
        oldPassword,
        newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(`Changed password`);
    return response.data;
  } catch (error) {
    if (error.response) {
      // Kiểm tra nếu mã lỗi là 400 và thông báo lỗi là "Mật khẩu cũ không đúng"
      if (
        error.response.status === 400 &&
        error.response?.data === "Mật khẩu cũ không đúng"
      ) {
        console.error("Mật khẩu cũ không đúng!");
        throw new Error("Mật khẩu cũ không đúng!"); // Ném ra lỗi để hiển thị cho người dùng
      } else {
        // Nếu không phải lỗi 400 hoặc thông báo khác
        console.error("Lỗi khác:", error.response.data);
        throw new Error(
          error.response?.data ||
            "Đã xảy ra lỗi trong quá trình thay đổi mật khẩu."
        );
      }
    } else {
      // Xử lý lỗi khi không nhận được response từ server
      console.error("Lỗi không xác định:", error);
      throw new Error("Lỗi không xác định. Vui lòng thử lại sau.");
    }
  }
};

//Hàm cập nhật thông tin
export const updateInfomation = async (
  userId,
  name,
  address,
  dateOfBirth,
  gender,
  phoneNumber,
  token
) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/customers/${userId}`,
      {
        name,
        address,
        dateOfBirth,
        gender,
        phoneNumber,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data) {
      message.info("Thông tin đã được cập nhật");
    }
    return response.data;
  } catch (error) {
    if (error.response) {
      // Kiểm tra lỗi 404
      if (error.response.status === 404) {
        console.error("Cập nhật không thành công!");
        throw new Error("Cập nhật không thành công!");
      }
      console.error("Lỗi khác:", error.response.data);
      throw new Error(
        error.response?.data ||
          "Đã xảy ra lỗi trong quá trình thay đổi thông tin."
      );
    } else {
      console.error("Lỗi không xác định:", error);
      throw new Error("Lỗi không xác định. Vui lòng thử lại sau.");
    }
  }
};

//Hàm lấy thông tin chi tiết tour
export const fetchTourDetail = async (ticketId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/tours/getById?ticketId=${ticketId}`,
      {}
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy thông tin tour:", error);
    throw new Error("Lỗi khi lấy thông tin tour. Vui lòng thử lại sau.");
  }
};
