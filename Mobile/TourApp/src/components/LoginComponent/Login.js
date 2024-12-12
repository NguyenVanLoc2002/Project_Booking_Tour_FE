import React, { useEffect, useRef, useState } from "react";
import { View, Text, ImageBackground, Pressable, Button, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Dimensions } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import authApi from "../../api/authApi";


// import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// const Tab = createMaterialTopTabNavigator();

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    const handleLogin  = async () => {
        try {
            const userData = await authApi.login(email, password);
            navigation.navigate("TourComponent");
          } catch (error) {
            console.error(error.message);
          }
    };
    const handleRegister = () => {
        navigation.navigate("Register")
    };
    return (
        <ScrollView style={{ backgroundColor: "white", height: "100%" }}>
            <ImageBackground source={{
                uri: "https://res.cloudinary.com/doqbelkif/image/upload/v1727568395/2340debd-118a-4f21-b7c8-6e7eed853ef8.png"
            }} resizeMode="cover" style={styles.imageBia}>
            </ImageBackground>
            <View style={styles.form}>
                <Text style={{ fontSize: 18, padding: 5, fontWeight: "500", }}>ĐĂNG NHẬP</Text>
                <Text style={{ fontSize: 14, padding: 5, fontWeight: "500", paddingBottom: 15, textAlign: 'center', }}>Tận hưởng những chuyến đi tuyệt vời và hấp dẫn cùng với LuckyPanda Travel</Text>
                <View style={styles.box}>
                    <View style={styles.onlyOne}>

                        <Text style={styles.textTitle}>Email<Text style={[styles.textTitle, { color: "red" }]}> *</Text></Text>
                      
                        <TextInput
                            style={[styles.formPicker, { paddingLeft: 15 }]}
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            
                        />
                    </View>
                    <View style={styles.onlyOne}>

                        <Text style={styles.textTitle}>Mật khẩu<Text style={[styles.textTitle, { color: "red" }]}> *</Text></Text>
                        <View style={styles.row}>
                            <TextInput
                                style={[styles.formPickerPass, { paddingLeft: 10, width:250 }]}
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                                secureTextEntry={!passwordVisible}
                                underlineColorAndroid="transparent"
                            />
                            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.icon}>
                                <FontAwesome5 name={passwordVisible ? "eye" : "eye-slash"} size={20} color="gray" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={{ fontSize: 14, padding: 10, fontWeight: "500", color: 'gray', textAlign: 'right', }}>Bạn quên mật khẩu?</Text>
                </View>
                <Pressable style={styles.button} onPress={() => { handleLogin () }}>
                    <Text style={{ fontSize: 18, paddingLeft: 10, fontWeight: "500", color: '#fff', textAlign: 'center' }}>ĐĂNG NHẬP</Text>
                </Pressable>
                <Text style={{ fontSize: 14, paddingLeft: 10, fontWeight: "500" }}>Bạn chưa có tài khoản?
                    <Pressable onPress={() => { handleRegister() }}>
                        <Text style={{ fontSize: 14, paddingLeft: 10, fontWeight: "500", color: '#3FD0D4' }}>Đăng ký ngay</Text>
                    </Pressable></Text>

            </View>

        </ScrollView >
    );
};

const styles = StyleSheet.create({
    imageBia: {
        width: '100%',
        height: 250,
        marginRight: 10,
        alignItems: "center",
    },
    form: {
        backgroundColor: "#fff",
        marginTop: -30,
        alignItems: 'center',
        height: '70%',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    box: {
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        width: '90%',
        padding: 10
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
        marginLeft:5,
        marginRight:5,
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
export default Login;