import React, { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, Image, ScrollView } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Octicons from '@expo/vector-icons/Octicons';
import authApi from "../../api/authApi";
import axiosInstance from "./../../api/axiosInstance";
// import { useAuthContext } from "../../contexts/AuthContext";
const AccountComponent = ({ navigation, route }) => {
    const [authUser, setAuthUser] = useState(null); // Lưu thông tin người dùng
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axiosInstance.get("/customers/by-email");
                console.log(response.data)
                setAuthUser(response.data);
                return response.data;

            } catch (error) {
                throw new Error("Failed to fetch user info");
            }
        };
        fetchUserInfo();
    }, []);
    // gioi tinh 1: nu, 2 nam
    const user = {
        name: 'Bao Truc',
        url: 'https://res.cloudinary.com/doqbelkif/image/upload/v1727453521/e015a22e-fa11-4f2c-86bf-322445d957ea.png',
        gioiTinh: 1,
        ngaySinh: "06/05/2002",
        email: "baotruc123@gmail.com",
        phone: "0338030541"
    }


    const handleLogout = async () => {
        const isLoggedOut = await authApi.logout();
        if (isLoggedOut) {
            navigation.navigate("Login");
        } else {
            console.error("Logout failed");
        }
    };

    return (

        <ScrollView style={{ backgroundColor: "#fafafa", height: "100%" }}>
            <View style={styles.header}>
                <View style={styles.avt}>
                    <Image
                        source={{
                            uri: user?.url
                        }}
                        style={styles.tourAvt}
                        resizeMode="cover"
                    />
                </View>
                <View style={styles.viewHeader}>
                    <Text style={styles.textName}>{authUser?.name}</Text>
                    <Pressable style={styles.buttonXem}><Text style={styles.textButton}>Xem trang cá nhân</Text></Pressable>
                </View>
            </View>
            <View style={styles.viewBox} >
                <Text style={styles.textName}>Lựa chọn thanh toán của tôi</Text>
                <Pressable style={styles.box}>
                    <AntDesign name="creditcard" size={24} color="black" />
                    <View style={styles.col}>
                        <Text style={styles.textTitle}>Thẻ của tôi</Text>
                        <Text style={styles.textDetail}>Thanh toán siêu tốc chỉ trong 1 chạm</Text>
                    </View>
                </Pressable>
            </View>
            <View style={styles.viewBox} >
                <Text style={styles.textName}>Tính năng dành cho thành viên</Text>
                <Pressable style={styles.box} onPress={() => { navigation.navigate("PassengerDetail", { passenger: user }); }}>
                    <MaterialIcons name="edit-note" size={24} color="black" />
                    <View style={styles.col}>
                        <Text style={styles.textTitle}>Thông tin hành khách</Text>
                        <Text style={styles.textDetail}>Quản lý thông tin hành khách đã lưu và địa chỉ đã lưu</Text>
                    </View>

                </Pressable>
                <Pressable style={[styles.box, styles.borderTop]}>
                    <MaterialCommunityIcons name="cash-refund" size={24} color="black" />
                    <View style={styles.col}>
                        <Text style={styles.textTitle}>Hoàn tiền</Text>
                        <Text style={styles.textDetail}>Theo dõi hoàn tiền và quản lý chi tiết ngân hàng</Text>
                    </View>

                </Pressable>
            </View>
            <View style={styles.viewBox} >
                <Text style={styles.textName}>Tài khoản và bảo mật</Text>
                <Pressable style={styles.box}
                    onPress={() => { navigation.navigate("AccountDetail", { user: authUser }); }}
                >
                    <AntDesign name="user" size={24} color="black" />
                    <View style={styles.col}>
                        <Text style={styles.textTitle}>Thông tin tài khoản</Text>
                    </View>

                </Pressable>
                <Pressable style={[styles.box, styles.borderTop]}>
                    <Ionicons name="shield-checkmark-outline" size={24} color="black" />
                    <View style={styles.col}>
                        <Text style={styles.textTitle}>Mật khẩu và bảo mật</Text>
                    </View>

                </Pressable>
            </View>
            <View style={styles.viewBox} >
                <Text style={styles.textName}>Cài đặt</Text>
                <Pressable style={styles.box}>
                    <FontAwesome6 name="map-location-dot" size={24} color="black" />
                    <View style={styles.rowBe}>
                        <Text style={styles.textTitle}>Quốc gia</Text>
                        <Text style={styles.textSelect}>Việt Nam</Text>
                    </View>
                </Pressable>
                <Pressable style={[styles.box, styles.borderTop]}>
                    <MaterialIcons name="currency-exchange" size={24} color="black" />
                    <View style={styles.rowBe}>
                        <Text style={styles.textTitle}>Tiền tệ</Text>
                        <Text style={styles.textSelect}>Việt Nam Đồng</Text>

                    </View>

                </Pressable>
                <Pressable style={[styles.box, styles.borderTop]}>
                    <FontAwesome name="language" size={24} color="black" />
                    <View style={styles.rowBe}>
                        <Text style={styles.textTitle}>Ngôn ngữ</Text>
                        <Text style={styles.textSelect}>Tiếng Việt</Text>

                    </View>
                </Pressable>
            </View>
            <View style={styles.viewBox} >

                <Pressable style={styles.box}>
                    <FontAwesome6 name="map-location-dot" size={24} color="black" />
                    <View style={styles.rowBe}>
                        <Text style={styles.textTitle}>Phiên bản ứng dụng</Text>
                        <Text style={styles.textSelect}>2.1.1</Text>

                    </View>
                </Pressable>
                <Pressable style={[styles.box, styles.borderTop]}>
                    <Octicons name="law" size={24} color="black" />
                    <View style={styles.col}>
                        <Text style={styles.textTitle}>Điều khoản và điều kiện</Text>
                    </View>

                </Pressable>

            </View>
            <View style={styles.viewBox} >

                <Pressable style={styles.box} onPress={handleLogout}>
                    <AntDesign name="logout" size={24} color="black" />
                    <View style={styles.col}>
                        <Text style={styles.textTitle}>Đăng xuất</Text>
                    </View>
                </Pressable>


            </View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    header: {
        backgroundColor: "#fff",
        flexDirection: "row"
    },
    row: {
        display: "flex",
        flexDirection: "row"
    },
    tourAvt: {
        width: 80,
        height: 80,
        borderRadius: 10,
        borderColor: "#000",
        borderWidth: 1
    },
    avt: {
        justifyContent: "center",
        padding: 5,
        paddingLeft: 20

    },
    textName: {
        fontSize: 18,
        fontWeight: "500",
        paddingBottom: 10
    },
    textButton: {
        fontSize: 15,
        fontWeight: "500",
        color: "#fff"
    },
    buttonXem: {
        width: '100%',
        backgroundColor: "#3FD0D4",
        borderRadius: 10,
        height: 30,
        justifyContent: "center",
        alignItems: "center"
    },
    viewHeader: {
        justifyContent: "space-around",
        flex: 1,
        paddingLeft: 30,
        paddingRight: 30
    },
    textTitle: {
        fontSize: 14,
        fontWeight: "500"
    },
    textDetail: {
        fontSize: 11,
        fontWeight: "300"
    },
    viewBox: {
        paddingTop: 15,
        padding: 10,
        paddingRight: 0
    },
    box: {
        backgroundColor: "#fff",
        flexDirection: "row",
        padding: 8,
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 0
    },
    borderTop: {
        borderTopWidth: 0.5,
        borderColor: "#bbb"
    },
    col: {
        justifyContent: "space-around",
        flex: 1,
        paddingLeft: 25

    },
    rowBe: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between',
        paddingLeft: 25,
        paddingRight: 25

    },
    textSelect: {
        fontSize: 13,
        fontWeight: "400",
        color: "gray"
    }
})

export default AccountComponent;