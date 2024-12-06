import React, { useEffect, useState } from "react";
import { View, Text, Linking, StyleSheet, ScrollView, TouchableOpacity, Alert, SafeAreaView, Button } from "react-native";
import axios from 'axios';

import axiosInstance from "../../../api/axiosInstance";


const Payment = ({ navigation, route }) => {
    const { booking } = route.params;
    const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
    //   useEffect(() => {
    //     const fetchBookingTour = async () => {
    //       try {
    //         const res = await axios.get(
    //           `http://localhost:8000/api/v1/booking/redis/${booking?.bookingDTO?.bookingId}`
    //         );
    //         setAmount(res.data.bookingDTO.totalAmount);
    //         setBooking(res.data.bookingDTO);
    //         setTour(res.data.tourDTO);
    //       } catch (error) {
    //         console.error("Error fetching booking data:", error);
    //       }
    //     };

    //     if (bookingId) {
    //       fetchBookingTour();
    //     }
    //   }, [booking?.bookingDTO?.bookingId]);

    //   const handlePaymentSuccess = async (details) => {
    //     Alert.alert("Thanh toán thành công!", "Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.");
    //     setIsPaymentSuccess(true);

    //     // Gửi dữ liệu thanh toán lên server
    //     try {
    //       await axiosInstance.post("/payments/success", {
    //         paymentId: details.id,
    //         payerId: details.payer.payer_id,
    //         bookingId: booking?.bookingDTO?.bookingId,
    //         discountId: null,
    //         amount: details.purchase_units[0].amount.value,
    //         transactionId: details.purchase_units[0].payments.captures[0].id,
    //       });
    //     } catch (error) {
    //       console.error("Error updating payment status:", error);
    //     }
    //   };

    const formatCurrency = (amount) => {
        return `${amount.toLocaleString()} USD`;
    };

    const formatDate = (dateString) => {
        const formattedDay = dateString[2].toString().padStart(2, "0");
        const formattedMonth = dateString[1].toString().padStart(2, "0");
        return `${formattedDay}/${formattedMonth}/${dateString[0]}`;
    };

    const [loading, setLoading] = useState(false);
    const clientId = "AZUX4JxpgUbsBMZlbHYkrocFL8WrbXkSpU5Kt0VLGboGAkr7w-JMbo5PqVi-LelRRnWrOshQUoWXTO_W";
    const returnUrl = "https://www.npmjs.com/package/react-native-paypal-lib"; // Thay bằng URL sau khi thanh toán thành công
    const cancelUrl = "https://reactnative.dev/"; // Thay bằng URL khi người dùng hủy giao dịch
    const paypalUrl = `https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_xclick&business=sb-obo2o33206623@business.example.com&item_name=Item&amount=50&currency_code=USD&return=https://www.npmjs.com/package/react-native-paypal-lib&cancel_return=https://reactnative.dev`;

    const handlePayment = async () => {
        setLoading(true);

        Linking.openURL(paypalUrl)
            .catch(err => console.error("An error occurred", err));
    };

    return (
        <ScrollView style={styles.container}>
            {/* Phần thông tin tour */}
            <View style={styles.infoBox}>
                <Text style={styles.title}>Thông tin tour</Text>
                <Text style={styles.text}>
                    <Text style={styles.bold}>Tour:</Text> {booking?.tourDTO?.name}
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.bold}>Ngày khởi hành:</Text> {formatDate(booking?.tourDTO?.departureDate)}
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.bold}>Điểm xuất phát:</Text> {booking?.tourDTO?.departureLocation}
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.bold}>Điểm đến:</Text> {booking?.tourDTO?.destination}
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.bold}>Giá tour:</Text> {formatCurrency(booking?.bookingDTO?.totalAmount)}
                </Text>
                {booking?.bookingDTO?.includePromotions && (
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Khuyến mãi:</Text> Có
                    </Text>
                )}
                <Text style={styles.text}>
                    <Text style={styles.bold}>Thời gian:</Text> {booking?.tourDTO?.day} ngày {booking?.tourDTO?.night} đêm
                </Text>
            </View>
            <View>
                <Button
                    title={loading ? 'Đang thanh toán...' : 'Thanh toán qua PayPal'}
                    onPress={handlePayment}
                    disabled={loading}
                />
            </View>

            {/* Phần thanh toán */}
            <View style={styles.paymentBox}>
                <Text style={styles.title}>Thanh toán tour du lịch</Text>
                <Text style={styles.paymentText}>
                    Số tiền cần thanh toán:{" "}
                    <Text style={styles.greenText}>
                        {formatCurrency(booking?.bookingDTO?.totalAmount)}
                    </Text>
                </Text>

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9f9f9",
        padding: 16,
    },
    infoBox: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    paymentBox: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 12,
    },
    text: {
        fontSize: 16,
        color: "#333",
        marginBottom: 6,
    },
    bold: {
        fontWeight: "bold",
    },
    paymentText: {
        fontSize: 18,
        marginBottom: 12,
    },
    greenText: {
        color: "#28a745",
        fontWeight: "bold",
    },
});

export default Payment;
