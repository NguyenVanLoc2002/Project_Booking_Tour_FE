import React, { useEffect, useRef, useState } from "react";
import { View, Text, ImageBackground, Pressable, Button, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Dimensions } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import axiosInstance from  "../../api/axiosInstance"
// import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// const Tab = createMaterialTopTabNavigator();

const Register = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    const [passwordRT, setPasswordRT] = useState('');
    const [passwordRTVisible, setPasswordRTVisible] = useState(false);
    const togglePasswordRTVisibility = () => {
        setPasswordRTVisible(!passwordRTVisible);
    };
    const dangNhap = () => {
        navigation.navigate("Login");
    };
    const dangKy = () => {
        navigation.navigate("Authentic");
    };

    const handleSubmitRegister = async (e) => {
        e.preventDefault(); // Ngăn chặn hành vi mặc định của form
       
    
        const data = {
          email,
          name,
        };
        console.log(data);
    
        try {
          const response = await axiosInstance.post(
            "/v1/customers/addCustomer",
            data
          );
          console.log("Đăng ký thành công:", response.data);
          if (response.status === 201) {
            Modal.success({
              content: "Bạn vui lòng kiểm tra email để xác thực tài khoản.",
            });
            // closeModalRegister();
            // handleRefreshDataRegister();
          }
        } catch (error) {
          console.error("Đăng ký thất bại:", error);
          if (error.response && error.response.status === 400) {
            Modal.error({
              content: "Tài khoản đã tồn tại.",
            });
            // handleRefreshDataRegister();
          }
        }
      };
    return (
        <ScrollView style={{ backgroundColor: "#F2F2F2", height: "100%" }}>
            <ImageBackground source={{
                uri: "https://res.cloudinary.com/doqbelkif/image/upload/v1727568064/28b4e7ff-14a1-446f-af98-98b6d28ff0ba.png"
            }} resizeMode="cover" style={styles.imageBia}>
            </ImageBackground>
            <View style={styles.form}>
                <Text style={{ fontSize: 18, padding: 5, fontWeight: "500", }}>ĐĂNG KÝ NGAY</Text>
                <Text style={{ fontSize: 14, padding: 5, fontWeight: "500", paddingBottom: 15, textAlign: 'center', }}>Tận hưởng những chuyến đi tuyệt vời và hấp dẫn cùng với LuckyPanda Travel</Text>
                <View style={styles.box}>
                    <View style={styles.onlyOne}>

                        <Text style={styles.textTitle}>Họ và tên<Text style={[styles.textTitle, { color: "red" }]}> *</Text></Text>
                        <TextInput
                            style={[styles.formPicker, { paddingLeft: 15 }]}
                            value={name}
                            onChangeText={setName}
                        />
                    </View>
                    <View style={styles.onlyOne}>

                        <Text style={styles.textTitle}>Email<Text style={[styles.textTitle, { color: "red" }]}> *</Text></Text>
                        <TextInput
                            style={[styles.formPicker, { paddingLeft: 15 }]}
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                </View>
                <Pressable style={styles.button} onPress={() => { dangKy() }}>
                    <Text style={{ fontSize: 18, paddingLeft: 10, fontWeight: "500", color: '#fff', textAlign: 'center' }}>ĐĂNG KÝ</Text>
                </Pressable>

                <Text style={{ fontSize: 14, paddingLeft: 10, fontWeight: "500" }}>Bạn có tài khoản?
                    <Pressable onPress={() => { dangNhap() }}>
                        <Text style={{ fontSize: 14, paddingLeft: 10, fontWeight: "500", color: '#3FD0D4' }}>Đăng nhập ngay</Text>
                    </Pressable></Text>

            </View>

        </ScrollView >
    );
};

const styles = StyleSheet.create({
    imageBia: {
        width: '100%',
        height: 200,
        marginRight: 10,
        alignItems: "center",
    },
    form: {
        backgroundColor: "#fff",
        marginTop: -30,
        alignItems: 'center',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingBottom:20
    },
    box: {
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        width: '90%',
        padding: 10,
        paddingBottom:15
    },
    formPicker: {
        borderWidth: 1,
        borderColor: "#3FD0D4",
        borderRadius: 10,
        height: 40,
        display: "flex",
        justifyContent: "center",
        marginLeft: 5,
        marginRight: 5

    },
    onlyOne: {
        padding: 8,
    },
    icon: {
        paddingHorizontal: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#3FD0D4',
        borderRadius: 10,
        paddingHorizontal: 10,
        justifyContent: 'space-between'
    },
    formPickerPass: {
        // borderWidth: 1,
        // borderColor: "#3FD0D4",
        // borderRadius: 10,
        height: 40,
        display: "flex",
        justifyContent: "center",
        marginLeft: 5,
        marginRight: 5

    },
    button: {
        backgroundColor: '#3FD0D4',
        width: '50%',
        height: 40,
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
    }

})
export default Register;