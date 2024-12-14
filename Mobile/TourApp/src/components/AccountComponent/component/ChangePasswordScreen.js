import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import axiosInstance from "../../../api/axiosInstance";
import { useAuthContext } from "../../../contexts/AuthContext";
import Toast from "react-native-toast-message";
const ChangePasswordScreen = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { authUser } = useAuthContext();
  const handleChangePassword = async () => {

      if (!currentPassword || !newPassword || !confirmPassword) {
        Toast.show({
          type: "error",
          text1: "Thông báo",
          text2: "Vui lòng điền đầy đủ thông tin.",
          position: "bottom",
          position: "bottom",
          visibilityTime: 4000,
          autoHide: true,
        });

        return;
      }

      if (newPassword !== confirmPassword) {
        Toast.show({
          type: "error",
          text1: "Thông báo",
          text2: "Mật khẩu mới và xác nhận mật khẩu phải trùng khớp.",
          position: "bottom",
          visibilityTime: 4000,
          autoHide: true,
        });

        return;
      }
      const email = authUser.email;
      const oldPassword = currentPassword
      try {
        const response = await axiosInstance.put(
          `/auth/change-password`,
          {
            email,
            oldPassword,
            newPassword,
          }
        );
        console.log(response.data)
        setNewPassword("");
      setConfirmPassword("");
      setCurrentPassword("");
        Toast.show({
          type: "success",
          text1: "Cập nhật mật khẩu thành công!",
          position: "bottom",
          visibilityTime: 4000,
          autoHide: true,
        });
        return response.data;
      } catch (error) {
        if (error.response) {
          // Kiểm tra nếu mã lỗi là 400 và thông báo lỗi là "Mật khẩu cũ không đúng"
          if (
            error.response.status === 400 &&
            error.response?.data === "Mật khẩu cũ không đúng"
          ) {
            Toast.show({
              type: "error",
              text1: "Lỗi",
              text2: "Mật khẩu cũ không đúng!",
              position: "bottom",
              visibilityTime: 4000,
              autoHide: true,
            });
          } else {
            // Nếu không phải lỗi 400 hoặc thông báo khác
            Toast.show({
              type: "error",
              text1: "Lỗi",
              text2: "Đã xảy ra lỗi trong quá trình thay đổi mật khẩu.",
              position: "bottom",
              visibilityTime: 4000,
              autoHide: true,
            });

          }
        } else {
          Toast.show({
            type: "error",
            text1: "Lỗi",
            text2: "Lỗi không xác định. Vui lòng thử lại sau.",
            position: "bottom",
            visibilityTime: 4000,
            autoHide: true,
          });
        }
      }

  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đổi Mật Khẩu</Text>

      <Text style={styles.label}>Mật khẩu hiện tại</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập mật khẩu hiện tại"
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />

      <Text style={styles.label}>Mật khẩu mới</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập mật khẩu mới"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />

      <Text style={styles.label}>Xác nhận mật khẩu mới</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập lại mật khẩu mới"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Xác nhận</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: "#555",
  },
  input: {
    height: 40,
    borderColor: "#3FD0D4",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
    fontSize: 14,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ChangePasswordScreen;
