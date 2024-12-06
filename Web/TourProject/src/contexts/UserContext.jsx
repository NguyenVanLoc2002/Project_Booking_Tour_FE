import React, { createContext, useContext, useState, useEffect } from "react";
import { loginApi, fetchUserInfo } from "../services/api"; // Import API functions

// Tạo Context
const UserContext = createContext();

// Provider để bao bọc ứng dụng
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Lưu thông tin người dùng
  const [token, setToken] = useState(localStorage.getItem("token") || null); // Lưu token

  // Hàm đăng nhập
  const login = async (email, password) => {
    try {
      const data = await loginApi(email, password);
      setToken(data.token); // Lưu token từ API trả về
      localStorage.setItem("token", data.token); // Lưu token vào localStorage
      const userData = await fetchUserInfo(data.token); // Lấy thông tin người dùng sau khi đăng nhập
      setUser(userData); // Lưu thông tin người dùng vào state
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  // Hàm đăng xuất
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token"); // Xóa token khỏi localStorage
  };

  // Đảm bảo nếu có token trong localStorage thì tải lại thông tin người dùng khi app được mở lại
  useEffect(() => {
    if (token) {
      fetchUserInfo(token).then(setUser).catch(console.error);
    }
  }, [token]);

  console.log("User: ", user); 

  return (
    <UserContext.Provider value={{ user, token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook để sử dụng UserContext
export const useUser = () => useContext(UserContext);
