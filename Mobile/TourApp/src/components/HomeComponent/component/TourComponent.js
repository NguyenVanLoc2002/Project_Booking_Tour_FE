import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';

const TourComponent = ({ navigation, route, listTour }) => {
    const formatDate = (dateString) => {

        // Đảm bảo luôn hiển thị 2 chữ số cho ngày và tháng
        const formattedDay = dateString[2].toString().padStart(2, "0");
        const formattedMonth = dateString[1].toString().padStart(2, "0");

        return `${formattedDay}/${formattedMonth}/${dateString[0]}`;
    };
    return (

        <ScrollView horizontal style={styles.tourContainer}>
            {listTour?.map((tour, index) => (
                <View key={index} style={styles.tourRow}>
                    <Pressable
                        style={styles.itemTour}
                        onPress={() => { navigation.navigate("DetailTour", { tour: tour }); }}
                    >
                        <View style={styles.tour}>
                            <Image
                                source={{
                                    uri: tour?.urlImage[0] || 'https://i.pinimg.com/474x/c4/a0/8a/c4a08aa606e7f447dce470177e14be56.jpg'
                                }}
                                style={styles.tourAvt}
                                resizeMode="cover"
                            />
                            <View style={styles.detailTour}>
                                <Text style={{ fontSize: 14, fontWeight: "500" }}>{tour.name}</Text>
                                <View style={styles.rowAround}>

                                    <View>

                                        <Text style={{ fontSize: 14, fontWeight: "500", color: "red" }}>{Number(tour.price).toLocaleString('vi-VN')} đ </Text>
                                        <Text style={{ textDecorationLine: "line-through", fontSize: 14, fontWeight: "500", color: "gray" }}>{Number(tour.oldPrice).toLocaleString('vi-VN')} đ</Text>

                                    </View>
                                    <View style={[styles.row, { paddingRight: 10, alignItems: "center" }]}>
                                        {tour.tourFeatureDTO.transportationMode.includes("AIRPLANE") && (
                                           <FontAwesome6 style={{ paddingRight: 10 }} name="plane" size={16} color="black" />
                                        )}
                                        {tour.tourFeatureDTO.transportationMode.includes("BUS") && (
                                            <FontAwesome6 style={{ paddingRight: 10 }} name="bus-simple" size={16} color="black" />
                                        )}
                                        {tour.tourFeatureDTO.transportationMode.includes("TRAIN") && (
                                          <FontAwesome6 style={{ paddingRight: 10 }} name="train" size={16} color="black" />
                                        )}
                                        {tour.tourFeatureDTO.transportationMode.includes("PRIVATE_CAR") && (
                                          <FontAwesome6 style={{ paddingRight: 10 }} name="car" size={16} color="black" />
                                        )}
                                       <Ionicons name="partly-sunny-outline" size={20} color="black" />
                                    </View>
                                </View>
                                <View style={styles.row}><AntDesign name="calendar" size={16} color="black" /><Text style={{ fontSize: 12 }}>Khởi hành: {formatDate(tour.departureDate)}</Text></View>
                                <View style={styles.row}><AntDesign name="clockcircleo" size={16} color="black" /><Text style={{ fontSize: 12 }}>Thời gian: {tour.day} ngày {tour.night} đêm</Text></View>
                                <View style={styles.row}><AntDesign name="team" size={16} color="black" />
                                    <Text style={{ fontSize: 12 }}>Số chổ còn nhận: {tour.availableSlot > 0
                                        ? tour?.availableSlot
                                        : "Hết chỗ"}</Text></View>

                            </View>
                        </View>
                    </Pressable>
                </View>

            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    tourContainer: {
        flex: 1,
        flexDirection: "row",
    },
    tourRow: {
        borderRadius: 10,
        width: 220,
        // margin: 5,
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
        flexDirection: "col",
    },
    tourAvt: {
        width: '100%',
        height: 140,
        backgroundColor: "red",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    detailTour: {
        paddingLeft: 5
    },
    row: {
        display: 'flex',
        flexDirection: "row",
    },
    rowAround: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: "space-between"

    },

});

export default TourComponent;