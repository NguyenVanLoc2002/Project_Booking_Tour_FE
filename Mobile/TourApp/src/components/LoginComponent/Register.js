import React, { useEffect, useRef, useState } from "react";
import { View, Text, ImageBackground, Pressable, Button, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Dimensions } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import axiosInstance from "../../api/axiosInstance"
import Toast from "react-native-toast-message";
import DateTimePicker from '@react-native-community/datetimepicker';
import AntDesign from '@expo/vector-icons/AntDesign';
// import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// const Tab = createMaterialTopTabNavigator();
import { Radio } from "antd"
const Register = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [gender, setGender] = useState(true);
    const dangNhap = () => {
        navigation.navigate("Login");
    };
    const dangKy = () => {
        handleSubmitRegister();
    };
    const [showBD, setShowBD] = useState(false);

    const onChangeBD = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        // setShow(Platform.OS === 'ios'); // Ẩn lịch nếu không phải iOS
        setDateOfBirth(currentDate); // Cập nhật ngày đã chọn
        setShowBD(false);
    };

    const showDatePickerBD = () => {
        setShowBD(true);
    };
    const handleGenderSelect = (value) => {
        setGender(value); // Cập nhật state
    };

    // const handleSubmitRegister = async (e) => {
    //     e.preventDefault(); // Ngăn chặn hành vi mặc định của form


    //     const data = {
    //         email,
    //         name,
    //     };
    //     console.log(data);

    //     try {
    //         const response = await axiosInstance.post(
    //             "/v1/customers/addCustomer",
    //             data
    //         );
    //         console.log("Đăng ký thành công:", response.data);
    //         if (response.status === 201) {
    //             dangNhap();
    //             Toast.show({
    //                 type: "success",
    //                 text1: "Cần xác thực tài khoản",
    //                 text2: `Bạn vui lòng kiểm tra email để xác thực tài khoản.`,
    //                 position: "bottom",
    //                 visibilityTime: 4000,
    //                 autoHide: true,
    //             });

    //         }
    //     } catch (error) {
    //         console.error("Đăng ký thất bại:", error);
    //         if (error.response && error.response.status === 400) {

    //             Toast.show({
    //                 type: "error",
    //                 text1: "Tài khoản đã tồn tại",
    //                 position: "bottom",
    //                 visibilityTime: 4000,
    //                 autoHide: true,
    //             });
    //         }
    //     }
    // };

    const handleRefreshDataRegister = () => {
        setEmail("");
        setName("");
        setDateOfBirth(new Date());
        setGender(true);
    };
    const handleSubmitRegister = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            Toast.show({
                type: "error",
                text1: "Vui lòng điền đúng định dạng email",
                position: "bottom",
                visibilityTime: 4000,
                autoHide: true,
            });
            return;
        }

        if (!name) {
            Toast.show({
                type: "error",
                text1: "Vui lòng điền đầy đủ họ và tên!",
                position: "bottom",
                visibilityTime: 4000,
                autoHide: true,
            });
            return;
        }
        // Tính tuổi từ ngày sinh
        const birthDate = new Date(dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
            age--;
        }

        // Kiểm tra tuổi
        if (age < 18) {
            alert("Bạn phải từ 18 tuổi trở lên để đăng ký.");
            return; // Dừng lại nếu không đủ tuổi
        }

        if (!email || !name) {
            alert("Vui lòng điền đầy đủ thông tin!");
            return;
        }
        const dob = birthDate.getFullYear() + '-' + birthDate.getMonth() + '-' + birthDate.getDate();
        const data = {
            email,
            name,
            address: "",
            gender: gender,
            dateOfBirth: dob,
            phoneNumber: "",
        };
        console.log(data);

        try {
            const response = await axiosInstance.post(
                "/customers/addCustomer",
                data
            );
            console.log("Đăng ký thành công:", response.data);
            if (response.status === 201) {
                Toast.show({
                    type: "success",
                    text1: "Cần xác thực tài khoản",
                    text2: `Bạn vui lòng kiểm tra email để xác thực tài khoản.`,
                    position: "bottom",
                    visibilityTime: 4000,
                    autoHide: true,
                });

                // closeModalRegister();
                handleRefreshDataRegister();
            }
        } catch (error) {
            console.error("Đăng ký thất bại:", error);
            if (error.response && error.response.status === 400) {
                Toast.show({
                    type: "error",
                    text1: "Tài khoản đã tồn tại.",
                    position: "bottom",
                    visibilityTime: 4000,
                    autoHide: true,
                });
                // Modal.error({
                //   content: "Tài khoản đã tồn tại.",
                // });
                handleRefreshDataRegister();
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
                    <View style={styles.onlyOne}>

                        <Text style={styles.textTitle}>Email<Text style={[styles.textTitle, { color: "red" }]}> *</Text></Text>
                        <Pressable style={styles.formPicker} onPress={showDatePickerBD}>
                            <View style={[styles.rowOption, { alignContent: "center", paddingLeft: 15 }]}><AntDesign name="calendar" size={20} color="black" />
                                <Text style={[styles.textPicker, { paddingLeft: 15 }]}>{dateOfBirth.toLocaleDateString()}</Text></View>
                            {showBD && (
                                <DateTimePicker
                                    value={dateOfBirth}
                                    mode="date" // Chỉ hiển thị ngày
                                    display="default" // Kiểu hiển thị của lịch (default, spinner, calendar)
                                    onChange={onChangeBD}
                                />
                            )}
                        </Pressable>
                    </View>
                    <View style={styles.onlyOne}>

                        <Text style={styles.textTitle}>Giới tính<Text style={[styles.textTitle, { color: "red" }]}> *</Text></Text>

                        <View style={styles.radioGroup}>
                            <TouchableOpacity
                                style={styles.radioButton}
                                onPress={() => handleGenderSelect(true)}
                            >
                                <View
                                    style={[
                                        styles.outerCircle,
                                        gender === true && styles.selectedOuterCircle,
                                    ]}
                                >
                                    {gender === true && <View style={styles.innerCircle} />}
                                </View>
                                <Text style={styles.label}>Nam</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.radioButton}
                                onPress={() => handleGenderSelect(false)}
                            >
                                <View
                                    style={[
                                        styles.outerCircle,
                                        gender === false && styles.selectedOuterCircle,
                                    ]}
                                >
                                    {gender === false && <View style={styles.innerCircle} />}
                                </View>
                                <Text style={styles.label}>Nữ</Text>
                            </TouchableOpacity>

                        </View>

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
        paddingBottom: 20,
        height: 620
    },
    box: {
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        width: '90%',
        padding: 10,
        paddingBottom: 15
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
    rowOption: {
        display: "flex",
        flexDirection: "row",
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
    },
    radioGroup: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },
    radioButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    outerCircle: {
        width: 20,
        height: 20,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "#aaa",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    selectedOuterCircle: {
        borderColor: "#3FD0D4",
    },
    innerCircle: {
        width: 10,
        height: 10,
        borderRadius: 6,
        backgroundColor: "#3FD0D4",
    },
    label: {
        fontSize: 16,
    },
    selectedText: {
        marginTop: 20,
        fontSize: 16,
        color: "#333",
    },

})
export default Register;