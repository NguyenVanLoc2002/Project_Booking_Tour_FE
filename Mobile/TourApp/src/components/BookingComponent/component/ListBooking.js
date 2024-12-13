import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import BookingDetailsModal from "./BookingDetailsModal";
import ModalCancelTour from "./ModalCancelTour";

const ListBooking = ({ navigation, route, listBooking }) => {
    //trang thai 1 cho thanh toan, 2 da dat, 3 da hoan thanh, 4 da huy
    const [isModalVisible, setIsModalVisible] = useState(false);
    // const [bookingSelected, setBookingSelected] = useState();
    const [bookingSelected, setBookingSelected] = useState([]);
    // const handleOpenModal = (bk) => {
    //     setBookingSelected(bk)
    //     console.log(bk)
    //     setIsModalVisible(true);
    // };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };
    // const handleOpenModal = () => {
    //     console.log(booking)
    //     setIsModalVisible(true);
    //     setModalVisible(false)
    // };

    // const handleCloseModal = () => {
    //     setIsModalVisible(false);
    // };
    const loaiBooking = (loai) => {
        if (loai == "PENDING_CONFIRMATION")
            return "Chờ xác nhận"
        else if (loai == "CONFIRMED")
            return "Đã xác nhận"
        else if (loai == "PAID")
            return "Đã thanh toán"
        else if (loai == "REFUNDED")
            return "Đã hủy"
    };
    const mauTrangThai = (loai) => {
        if (loai == "PENDING_CONFIRMATION")
            return "#FFCCCC"
        else if (loai == "CONFIRMED")
            return "#3FD0D4"
        else if (loai == "PAID")
            return "#fff"
        else if (loai == "REFUNDED")
            return "#E1E1E1"
    };
    const [modalVisible, setModalVisible] = useState(false);
    const [booking, setBooking] = useState(null);

    const formatDate = (dateString) => {
        const formattedDay = dateString[2].toString().padStart(2, "0");
        const formattedMonth = dateString[1].toString().padStart(2, "0");
        return `${formattedDay}/${formattedMonth}/${dateString[0]}`;
    };
    return (
        <ScrollView style={styles.tourContainer}>
            <View>
                <BookingDetailsModal
                    isVisible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    booking={booking}
                />
                <View>
                    {
                        bookingSelected && (
                            <ModalCancelTour
                                visible={isModalVisible}
                                onClose={() => handleCloseModal()}
                                booking={bookingSelected}
                            />
                        )
                    }
                </View>
                <View>
                    {listBooking?.map((booking, index) => (
                        <View key={index} style={styles.tourRow}>
                            <Pressable
                                style={[styles.itemTour, { backgroundColor: mauTrangThai(booking?.bookingDTO?.statusBooking) }]}
                                onPress={() => { setModalVisible(true); setBooking(booking) }}
                            >
                                <View style={styles.tour}>
                                    <View style={styles.avt}>
                                        <Image
                                            source={{
                                                uri: booking?.tourDTO?.urlImage[0]
                                            }}
                                            style={styles.tourAvt}
                                            resizeMode="cover"
                                        />
                                    </View>
                                    <View style={styles.detailTour}>
                                        <Text style={{ fontSize: 14, fontWeight: "500", padding: 5, paddingBottom: 10 }}>{booking?.tourDTO?.name}</Text>

                                        <View style={styles.row}><AntDesign name="calendar" size={16} color="black" /><Text style={{ fontSize: 12 }}>Khởi hành: {formatDate(booking?.tourDTO?.departureDate)}</Text></View>
                                        <View style={styles.row}><AntDesign name="clockcircleo" size={16} color="black" /><Text style={{ fontSize: 12 }}>Thời gian: {booking?.tourDTO?.day} ngày {booking?.tourDTO?.night} đêm</Text></View>

                                        <View style={styles.row}><AntDesign name="team" size={16} color="black" /><Text style={{ fontSize: 12 }}>Số vé đã đặt: {booking?.bookingDTO?.quantity}</Text></View>
                                        <View style={styles.rowAround}>
                                            <Text style={{ fontSize: 12 }}>{loaiBooking(booking?.bookingDTO?.statusBooking)}</Text>
                                            {
                                                booking?.bookingDTO?.statusBooking == "CONFIRMED" && (<Pressable
                                                    style={styles.buttonHoanThanh}
                                                    onPress={() => { navigation.navigate("Payment", { booking: booking }); }}
                                                ><Text style={styles.textDat}>Thanh toán</Text>
                                                </Pressable>)
                                            }
                                            {
                                                booking?.bookingDTO?.statusBooking == "PAID" && (
                                                    <Pressable
                                                        style={styles.buttonHoanThanh}
                                                        onPress={() => { setIsModalVisible(true); setBookingSelected(booking) }}
                                                    ><Text style={styles.textDat}>Hủy tour</Text>
                                                    </Pressable>
                                                )
                                            }
                                        </View>
                                    </View>
                                </View>
                            </Pressable>
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView >
    );
};

const styles = StyleSheet.create({
    tourContainer: {
        flex: 1,

    },
    tourRow: {
        borderRadius: 10,
        width: '90%',
        marginLeft: "5%",
        padding: 5,
        paddingBottom: 10,
        paddingRight: 7
    },
    itemTour: {
        backgroundColor: '#fff',
        shadowColor: "black",
        shadowOffset: { width: 1, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
        borderRadius: 10,
    },
    tour: {
        flexDirection: "row",
    },
    tourAvt: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    avt: {
        justifyContent: "center",
        padding: 5
    },

    detailTour: {
        paddingLeft: 5,
        width: '60%'
    },
    row: {
        display: 'flex',
        flexDirection: "row",
        paddingBottom: 3
    },
    rowAround: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: "space-between"

    },
    buttonHoanThanh: {
        height: 30,
        backgroundColor: "#E1E1E1",
        justifyContent: "center",
        // width: 80,
        alignItems: "center",
        borderRadius: 10,
        marginTop: 5,
        fontWeight: 500,
        marginBottom: 5,
    },
    textDat: {
        textAlign: "center",
        fontSize: 13,
        fontWeight: "500",
        paddingLeft: 10,
        paddingRight: 10,

    },

});

export default ListBooking;