import React, { useEffect, useState } from "react";
import { View, Text, Linking, StyleSheet, ScrollView,Pressable, TouchableOpacity, Alert, SafeAreaView, Button } from "react-native";
import axios from 'axios';
// import PayPal from 'react-native-paypal-wrapper';
import axiosInstance from "../../../api/axiosInstance";
import { WebView } from "react-native-webview";
// import { Buffer } from 'buffer';
import { encode } from 'base-64';
// import Braintree from 'braintree-web'; // Import thư viện Braintree

const PayPal = ({ navigation, route }) => {
    const { booking } = route.params;
    console.log('booking', booking)
    const PAYPAL_API_URL = "https://api.sandbox.paypal.com"; // Sử dụng sandbox API URL cho môi trường thử nghiệm
    const CLIENT_ID = "AZUX4JxpgUbsBMZlbHYkrocFL8WrbXkSpU5Kt0VLGboGAkr7w-JMbo5PqVi-LelRRnWrOshQUoWXTO_W";
    const SECRET_KEY = "EAhotxO3gijn7KLc-FiryyAVuyMT5oeAAzK8VdBko06_WlXJ8Uvf03w0ED315ZgQVnXejy0fuyj-qyBI";
    const [paymentUrl, setPaymentUrl] = useState(null);
    const [transactionId, setTransactionId] = useState(null);
    const [isPaymentComplete, setIsPaymentComplete] = useState(false);
    const [payerId, setPayerId] = useState();
    const recipient = "sb-obo2o33206623@business.example.com";
    const amount = booking?.bookingDTO?.totalAmount; // Số tiền thanh toán
    const currency = "USD"; // Đơn vị tiền tệ
    const description = "Tour Booking Payment";


    // Xử lý khi thanh toán thành công
    const handleNavigationStateChange = async (navState) => {
        console.log('nav', navState);
        console.log('url', navState.url);
        if (navState.url.includes("PayerID")) {
            // Lấy thông tin giao dịch từ URL trả về
            const transactionId = extractTransactionId(navState.url);
            const payerId = extractPayerId(navState.url);
            console.log(payerId);
            setTransactionId(transactionId);
            setPayerId(payerId);
            setIsPaymentComplete(true);
            try {
                const res = await axiosInstance.post(
                    "/payments/success",
                    {
                        paymentId: '4DR2288302972542Y',
                        payerId: payerId,
                        bookingId: booking?.bookingDTO?.bookingId,
                        discountId: null,
                        amount: booking?.bookingDTO?.totalAmount,
                        transactionId: '4DR2288302972542Y',
                    }
                );

            } catch (error) {

            }


            // Chuyển hướng người dùng đến màn hình khác trong ứng dụng


            // Hiển thị thông báo
            // Alert.alert("Thanh toán thành công", `Mã giao dịch: ${transactionId}`);
        } else if (navState.url.includes("cancel")) {
            setIsPaymentComplete(false);
            // Alert.alert("Thanh toán bị hủy", "Bạn đã hủy giao dịch.");
        }
    };

    // Hàm để trích xuất thông tin giao dịch từ URL (nếu có)
    const extractTransactionId = (url) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        return urlParams.get("tx");
    };
    const extractPayerId = (url) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        return urlParams.get("PayerID");
    };

    // const fetchPaymentDetails = async (payerID) => {
    //     const accessToken = await getAccessToken();
    //     // const accessToken = 'YOUR_ACCESS_TOKEN';  // Lấy access token từ quá trình xác thực của PayPal
    //     const paymentID = 'YOUR_PAYMENT_ID';  // Bạn cần lưu paymentID trong quá trình tạo thanh toán trước đó
    //     const response = await fetch(`https://api.sandbox.paypal.com/v1/payments/payment/${paymentID}/execute`, {
    //         method: 'POST',
    //         headers: {
    //             Authorization: `Bearer ${accessToken}`,
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             payer_id: payerID,
    //         }),
    //     });

    //     const paymentDetails = await response.json();
    //     console.log(paymentDetails);

    // };


    return (
        <ScrollView style={styles.container}>
            <View style={{ flex: 1 }}>
                {!isPaymentComplete ? (
                    <WebView
                        source={{
                            uri:
                                // https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${recipient}&item_name=${description}&amount=${amount}&currency_code=${currency}&return=http://yourwebsite.com/success&cancel_return=http://yourwebsite.com/cancel`
                                `https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_xclick&business=sb-obo2o33206623@business.example.com&item_name=tour&amount=${booking?.bookingDTO?.totalAmount}&currency_code=USD&return=http://yourwebsite.com/success&cancel_return=http://yourwebsite.com/cancel`

                            // `https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${recipient}&item_name=${description}&amount=${amount}&currency_code=${currency}&return=http://yourwebsite.com/success&cancel_return=http://yourwebsite.com/cancel`

                        }}
                        onNavigationStateChange={handleNavigationStateChange}
                        startInLoadingState
                        javaScriptEnabled
                        style={{ height: 1000, width: 'full' }}
                    />)

                    : (
                        <View style={{ padding: 20 , display:"flex", justifyContent:"center",alignItems:"center"}}>
                            <Text>Chúc mừng bạn thanh toán thành công</Text>
                            <Pressable
                                style={styles.buttonHoanThanh}
                                onPress={() => { navigation.navigate("Bookings");}}
                            ><Text style={styles.textDat}>Xác nhận</Text>
                            </Pressable>
                        </View>
                    )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9f9f9",
        // padding: 16,
    },
    buttonHoanThanh: {
        height: 40,
        backgroundColor: "#3FD0D4",
        justifyContent: "center",
        width: 150,
        alignItems: "center",
        borderRadius: 20,
        marginRight: 10
    },
    textDat: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: "500",

    },
});

export default PayPal;
