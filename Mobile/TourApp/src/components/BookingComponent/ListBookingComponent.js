import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground, Pressable, Button, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Dimensions } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import ListBooking from "./component/ListBooking";
import axiosInstance from "./../../api/axiosInstance";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAuthContext } from "../../contexts/AuthContext";
const BookingComponent = ({ navigation, route }) => {
    // const { load } = route.params
    const [pendingBookings, setPendingBookings] = useState([]); // Booking chờ xác nhận
    const [confirmedBookings, setConfirmedBookings] = useState([]); // Booking đã xác nhận
    const [paidBookings, setPaidBookings] = useState([]); // Booking đã thanh toán
    const [refundedBookings, setRefundedBookings] = useState([]); // Booking đã hủy
    const [listBooking, setListBooking] = useState([]); // Booking đã hủy
    const vndToUsdRate = 24000; // tỷ giá VND -> USD, ví dụ 1 USD = 24000 VND
    const { authUser } = useAuthContext();

    const getCustomerProcessingBookings = async (userId) => {
        try {
            const response = await axiosInstance.get(
                `/booking/redis/customer/${userId}`
            );

            // Phân loại bookings đang xử lý
            const pendingBookings = response.data.filter(
                (item) => item.bookingDTO.statusBooking === "PENDING_CONFIRMATION"
            );
            const confirmed = response.data.filter(
                (item) => item.bookingDTO.statusBooking === "CONFIRMED"
            );
            console.log(confirmed);
            // Lưu trữ các loại booking
            setPendingBookings(pendingBookings);
            setConfirmedBookings(confirmed);
            if (selectTrangThai == 1) {
                setListBooking(pendingBookings);
            } else if (selectTrangThai == 2) {
                setListBooking(confirmed)
            }

        } catch (error) {
            console.error("Error fetching customer processing bookings:", error);
        }
    };
    const getCustomerPaidAndCancelledBookings = async (userId) => {
        try {
            const response = await axiosInstance.get(
                `/booking?customerId=${userId}`
            );

            // Phân loại bookings đã thanh toán và đã hủy
            const paidBookings = response.data.filter(
                (item) => item.bookingDTO.statusBooking === "PAID"
            );
            const refundedBookings = response.data.filter(
                (item) => item.bookingDTO.statusBooking === "REFUNDED"
            );
            if (selectTrangThai == 3) {
                setListBooking(paidBookings);
            } else if (selectTrangThai == 4) {
                setListBooking(refundedBookings)
            }
            // Lưu trữ các loại booking
            setPaidBookings(paidBookings);
            setRefundedBookings(refundedBookings);
        } catch (error) {
            console.error("Error fetching customer paid/cancelled bookings:", error);
        }
    };
    useEffect(() => {
        if (authUser?.userId) {
            if (selectTrangThai == 1 || selectTrangThai == 2) {
                getCustomerProcessingBookings(authUser.userId);
            }
            else {
                Ơ
                getCustomerPaidAndCancelledBookings(authUser.userId);
            }
        }
    }, [selectTrangThai]);
    const reload = () => {
        getCustomerProcessingBookings(authUser.userId);
        getCustomerPaidAndCancelledBookings(authUser.userId);
    }

    const [selectTrangThai, setSelectTrangThai] = useState(1);
    const setTrangThai = (loai) => {
        console.log(pendingBookings);
        setSelectTrangThai(loai);
        if (loai == 1)
            setListBooking(pendingBookings);
        if (loai == 2)
            setListBooking(confirmedBookings);
        if (loai == 3)
            setListBooking(paidBookings);
        if (loai == 4)
            setListBooking(refundedBookings);
    };
    const getListByTrangThai = (loai) => {


    };
    const loaiBooking = (loai) => {
        if (loai == 1)
            return "Chờ xác nhận"
        else if (loai == 2)
            return "Đã xác nhận"
        else if (loai == 3)
            return "Đã thanh toán"
        else if (loai == 4)
            return "Đã hủy"
    };

    return (
        <ScrollView style={{ backgroundColor: "#fafafa", height: "100%" }}>
            <ImageBackground source={{
                uri: "https://res.cloudinary.com/doqbelkif/image/upload/v1726601540/656c046a-02ef-4286-8f9f-34ca7ef6e82a.png"
            }} resizeMode="cover" style={styles.imageBia}>
                {/* <View style={styles.header}>
                    <FontAwesome5 name={"search"} size={24} color={"black"} />
                    <TextInput placeholder="Nhập vào đây để tìm kiếm" style={styles.buttonSearch}>

                    </TextInput>
                </View> */}
            </ImageBackground>

            <View style={styles.viewBox}>
                {/* Main Options */}
                <View style={styles.optionsCol}>
                    <TouchableOpacity style={[styles.optionButton, { backgroundColor: selectTrangThai == 1 ? "#3FD0D4" : "#fff" }]} onPress={() => setTrangThai(1)}>
                        <Image
                            source={require('../../../assets/choThanhToan.png')}
                            style={{ width: 24, height: 24 }}
                        />
                        <Text style={styles.textBox}>Chờ xác nhận</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.optionButton, { backgroundColor: selectTrangThai == 2 ? "#3FD0D4" : "#fff" }]} onPress={() => setTrangThai(2)}>
                        <Image
                            source={require('../../../assets/daDat.png')}
                            style={{ width: 24, height: 24 }}
                        />
                        <Text style={styles.textBox}>Đã xác nhận</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.optionButton, { backgroundColor: selectTrangThai == 3 ? "#3FD0D4" : "#fff" }]} onPress={() => setTrangThai(3)}>
                        <Image
                            source={require('../../../assets/check.png')}
                            style={{ width: 24, height: 24 }}
                        />
                        <Text style={styles.textBox}>Đã thanh toán</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.optionButton, { backgroundColor: selectTrangThai == 4 ? "#3FD0D4" : "#fff" }]} onPress={() => setTrangThai(4)}>
                        <Image
                            source={require('../../../assets/listing.png')}
                            style={{ width: 24, height: 24 }}
                        />
                        <Text style={styles.textBox}>Đã hủy</Text>
                    </TouchableOpacity>

                </View>
            </View>
            <View style={{ paddingTop: 20 }}>
                <View style={{ display: 'flex', flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={styles.tieuDe}>{loaiBooking(selectTrangThai)}</Text>
                    <TouchableOpacity onPress={() => reload()}><Ionicons name="reload" size={24} color="black" /></TouchableOpacity>
                </View>
                <ListBooking listBooking={listBooking} navigation={navigation} />
                {/* {
                    if (loai == 1)
                        <ListBooking listBooking={pendingBookings} navigation={navigation} />
                    else if (loai == 2)
                        <ListBooking listBooking={confirmedBookings} navigation={navigation} />
                    if (loai == 3)
                     <ListBooking listBooking={paidBookings} navigation={navigation} />
                    if (loai == 4)
                       <ListBooking listBooking={refundedBookings} navigation={navigation} />} */}

            </View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    header: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        paddingHorizontal: 10,
        height: 40,
        backgroundColor: '#fff',
        width: "70%",
        marginLeft: 15
    },
    buttonSearch: {
        flex: 1,
        paddingLeft: 5
    },
    imageBia: {
        width: '100%',
        height: 250,
        marginRight: 10,
        alignItems: "center",
    },
    optionsCol: {
        flexDirection: 'column',
        // marginVertical: 10,

    },
    optionButton: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: "row",
        height: 40,
        paddingLeft: 20,


    },
    viewBox: {
        marginTop: -100,
        backgroundColor: "#fff",
        marginLeft: "5%",
        borderRadius: 10,
        shadowColor: "black",
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 10, // Android
        width: "90%",

    },

    textBox: {
        alignItems: "center",
        fontSize: 13,
        textAlign: "center",
        paddingLeft: 20
    },
    tieuDe: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 10
    },
})
export default BookingComponent;