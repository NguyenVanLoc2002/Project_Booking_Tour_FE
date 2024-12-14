import React, { useEffect, useState } from "react";
import { View, Text, Linking, StyleSheet, ScrollView, Pressable, TouchableOpacity, Alert, SafeAreaView, Button } from "react-native";
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
    // const [payerId, setPayerId] = useState();
    const recipient = "sb-obo2o33206623@business.example.com";
    const amount = parseFloat(booking?.bookingDTO?.totalAmount.toFixed(2)); // Số tiền thanh toán
    const currency = "USD"; // Đơn vị tiền tệ
    const description = "Tour Booking Payment";
    const [approvalUrl, setApprovalUrl] = useState(null);
    const [isOrder, setIsOrder] = useState(false);
    const [paymentID, setPaymentID] = useState(null);
    // Xử lý khi thanh toán thành công
    // const handleNavigationStateChange = async (navState) => {
    //     console.log('nav', navState);
    //     console.log('url', navState.url);
    //     if (navState.url.includes("PayerID")) {
    //         // Lấy thông tin giao dịch từ URL trả về
    //         const transactionId = extractTransactionId(navState.url);
    //         const payerId = extractPayerId(navState.url);
    //         console.log(payerId);
    //         setTransactionId(transactionId);
    //         setPayerId(payerId);
    //         setIsPaymentComplete(true);
    //         try {
    //             const res = await axiosInstance.post(
    //                 "/payments/success",
    //                 {
    //                     paymentId: '4DR2288302972542Y',
    //                     payerId: payerId,
    //                     bookingId: booking?.bookingDTO?.bookingId,
    //                     discountId: null,
    //                     amount: booking?.bookingDTO?.totalAmount,
    //                     transactionId: '4DR2288302972542Y',
    //                 }
    //             );

    //         } catch (error) {
    //         }
    //         // Chuyển hướng người dùng đến màn hình khác trong ứng dụng


    //         // Hiển thị thông báo
    //         // Alert.alert("Thanh toán thành công", `Mã giao dịch: ${transactionId}`);
    //     } else if (navState.url.includes("cancel")) {
    //         setIsPaymentComplete(false);
    //         // Alert.alert("Thanh toán bị hủy", "Bạn đã hủy giao dịch.");
    //     }
    // };

    // const getTransactionDetails = async (paymentId) => {
    //     try {
    //       const auth = Buffer.from(
    //         `${CLIENT_ID}:${SECRET_KEY}`
    //       ).toString("base64");

    //       const { data } = await axios({
    //         url: `https://api-m.sandbox.paypal.com/v1/payments/payment/${paymentId}`,
    //         method: "GET",
    //         headers: {
    //           "Content-Type": "application/json",
    //           Authorization: `Basic ${auth}`,
    //         },
    //       });

    //       console.log("Transaction Details:", data);

    //       const transactionId =
    //         data.transactions[0].related_resources[0].sale.id; // Transaction ID
    //       console.log("Transaction ID:", transactionId);

    //       return transactionId;
    //     } catch (error) {
    //       console.error("Error fetching transaction details:", error.response?.data || error.message);
    //     }
    //   };

    // Hàm để trích xuất thông tin giao dịch từ URL (nếu có)
    const extractTransactionId = (url) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        return urlParams.get("tx");
    };
    const extractPayerId = (url) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        return urlParams.get("PayerID");
    };
    // const handlePayment = () => {
    //     // if (!amount) {
    //     //   Alert.alert('Thông báo', 'Vui lòng nhập số tiền.');
    //     //   return;
    //     // }

    //     // Khởi tạo PayPal với Client ID
    //     PayPal.initialize(PayPal.SANDBOX, CLIENT_ID);

    //     const paymentData = {
    //       price: 50, // Số tiền người dùng nhập
    //       currency: 'USD',
    //       description: 'Thanh toán dịch vụ'
    //     };

    //     // Thực hiện thanh toán
    //     PayPal.pay(paymentData)
    //       .then((confirmation) => {
    //         console.log('Thanh toán thành công:', confirmation);
    //         // Hiển thị kết quả thanh toán
    //         Alert.alert('Thanh toán thành công', `Mã giao dịch: ${confirmation.transaction_id}`);
    //       })
    //       .catch((error) => {
    //         console.error('Thanh toán thất bại:', error);
    //         Alert.alert('Thanh toán thất bại', 'Có lỗi xảy ra trong quá trình thanh toán.');
    //       });
    //   };

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
    const getAccessToken = async () => {
        try {
            const response = await fetch(`${PAYPAL_API_URL}/v1/oauth2/token`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Basic ${btoa(`${CLIENT_ID}:${SECRET_KEY}`)}`,
                },
                body: "grant_type=client_credentials",
            });
            const data = await response.json();
            return data.access_token;
        } catch (error) {
            console.error("Error fetching access token:", error);
            Alert.alert("Error", "Unable to fetch PayPal access token.");
        }
    };

    // Create PayPal Order
    const createOrder = async () => {
        const accessToken = await getAccessToken();
        if (!accessToken) return;

        try {
            const response = await fetch(`${PAYPAL_API_URL}/v2/checkout/orders`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    intent: "CAPTURE",
                    purchase_units: [
                        {
                            amount: {
                                value: amount,
                                currency_code: "USD",
                            },
                            description,
                        },
                    ],
                }),
            });
          

            const data = await response.json();
            console.log(data)
            const approvalLink = data.links.find((link) => link.rel === "approve");
            setApprovalUrl(approvalLink.href);
        } catch (error) {
            console.error("Error creating PayPal order:", error);
            Alert.alert("Error", "Unable to create PayPal order.");
        }
    };

    // Capture Payment
    const captureOrder = async (orderID) => {
        const accessToken = await getAccessToken();
        if (!accessToken) return;

        try {
            const response = await fetch(`${PAYPAL_API_URL}/v2/checkout/orders/${orderID}/capture`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            if (data.status === "COMPLETED") {
                console.log(data);
                id = data.purchase_units[0].payments.captures[0].id;
                console.log(id)
                payerId = data?.payer?.payer_id
                console.log(payerId);
                
                
                try {
                    const res = await axiosInstance.post(
                        "/payments/success",
                        {
                            paymentId: id,
                            payerId: payerId,
                            bookingId: booking?.bookingDTO?.bookingId,
                            discountId: null,
                            amount: booking?.bookingDTO?.totalAmount,
                            transactionId: id,
                        }
                    );
                    Alert.alert("Success", "Thanh toán thành công.");
                    // setIsPaymentComplete(true);
                } catch (error) {
                }
                navigation.navigate("Bookings", { paymentData: data });
            } else {
                // Alert.alert("Error", "Thanh toán không thành công");
            }
        } catch (error) {
            // Alert.alert("Error", "Thanh toán không thành công");
        }
    };

    // Handle WebView Navigation
    const handleNavigation = (navState) => {
        const { url } = navState;

        if (url.includes("token")) {
            const orderID = new URL(url).searchParams.get("token");
            if (orderID) {
                captureOrder(orderID);
            }
        } else if (url.includes("cancel")) {
            Alert.alert("Canceled", "Payment was canceled by the user.");
            navigation.goBack();
        }
    };

    // Initialize Order Creation
    useEffect(() => {
        createOrder();
    }, []);


    return (
        <ScrollView style={styles.container}>
            <View style={{ flex: 1 }}>
                {approvalUrl && (
                        < WebView

                            source={{ uri: approvalUrl }}
                            onNavigationStateChange={handleNavigation}
                            startInLoadingState
                            javaScriptEnabled
                            style={{ height: 1000, width: 'full' }}
                        />)

                }
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
