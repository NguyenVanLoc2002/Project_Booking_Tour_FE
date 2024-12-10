import React, { useEffect, useState } from "react";
import { View, Text, Linking, StyleSheet, ScrollView, TouchableOpacity, Alert, SafeAreaView, Button } from "react-native";
import axios from 'axios';
// import PayPal from 'react-native-paypal-wrapper';
import axiosInstance from "../../../api/axiosInstance";
import { WebView } from "react-native-webview";

// import Braintree from 'braintree-web'; // Import thư viện Braintree

const Payment = ({ navigation, route }) => {
    const { booking } = route.params;
    const formatCurrency = (amount) => {
        return `${amount.toLocaleString()} USD`;
    };
    const formatDate = (dateString) => {
        const formattedDay = dateString[2].toString().padStart(2, "0");
        const formattedMonth = dateString[1].toString().padStart(2, "0");
        return `${formattedDay}/${formattedMonth}/${dateString[0]}`;
    };
    const [loading, setLoading] = useState(false)
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

            {/* Phần thanh toán */}
            <View style={styles.paymentBox}>
                <Text style={styles.title}>Thanh toán tour du lịch</Text>
                <Text style={styles.paymentText}>
                    Số tiền cần thanh toán:{" "}
                    <Text style={styles.greenText}>
                        {formatCurrency(booking?.bookingDTO?.totalAmount)}
                    </Text>
                </Text>
                <View>
                    <Button
                        title={loading ? 'Đang thanh toán...' : 'Thanh toán qua PayPal'}
                        onPress={() => { navigation.navigate("PayPal", { booking: booking }) }}

                    />

                </View>
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
