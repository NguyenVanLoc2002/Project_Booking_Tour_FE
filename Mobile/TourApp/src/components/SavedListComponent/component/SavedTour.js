import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const SavedTour = ({ navigation, route, listSaved ,deleteInteraction}) => {
    const formatDate = (inputDate) => {
        let date;

        // Kiểm tra loại dữ liệu của inputDate
        if (Array.isArray(inputDate)) {
            // Nếu inputDate là mảng [year, month, day]
            const [year, month, day] = inputDate;
            date = new Date(year, month - 1, day); // Lưu ý: Tháng trong Date() bắt đầu từ 0
        } else if (typeof inputDate === 'string') {
            // Nếu inputDate là chuỗi "YYYY-MM-DD"
            date = new Date(inputDate);
        } else {
            throw new Error('Invalid date format'); // Xử lý trường hợp không hợp lệ
        }

        // Định dạng ngày thành dd/MM/yyyy
        const day = String(date.getDate()).padStart(2, '0'); // Đảm bảo 2 chữ số
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng +1
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    };
    
    return (
        <ScrollView style={styles.tourContainer}>
            {listSaved?.map((tour, index) => (
                <View key={index} style={styles.tourRow}>


                    <Pressable
                        style={[styles.itemTour]}
                        onPress={() => { navigation.navigate("DetailTour", { tour: tour }); }}
                    >
                        <View style={styles.tour}>
                            <View style={styles.avt}>
                                <Image
                                    source={{
                                        uri: tour.urlImage[0]
                                    }}
                                    style={styles.tourAvt}
                                    resizeMode="cover"
                                />
                            </View>
                            <View style={styles.detailTour}>
                                <Text style={{ fontSize: 14, fontWeight: "500", padding: 5, paddingBottom: 10 }}>{tour?.name}</Text>

                                <View style={styles.row}><AntDesign name="calendar" size={16} color="black" /><Text style={{ fontSize: 12 }}>Khởi hành:  {formatDate(tour.departureDate)}</Text></View>
                                <View style={styles.row}><AntDesign name="clockcircleo" size={16} color="black" /><Text style={{ fontSize: 12 }}>Thời gian: {tour?.day} ngày {tour?.night} đêm</Text></View>
                                <View style={styles.row}><AntDesign name="team" size={16} color="red" /><Text style={{ fontSize: 12, color: "red" }}>Số chổ còn nhận:{tour.availableSlot > 0
                                        ? tour?.availableSlot
                                        : "Hết chỗ"}</Text></View>
                                <View style={styles.rowAround}>
                                    <View>
                                        <Text style={{ textDecorationLine: "line-through", fontSize: 14, fontWeight: "500", color: "gray" }}>{Number(tour.oldPrice).toLocaleString('vi-VN')} đ</Text>
                                        <Text style={{ fontSize: 14, fontWeight: "500", color: "red" }}>{Number(tour.price).toLocaleString('vi-VN')} đ</Text>

                                    </View>
                                    <Pressable style={styles.buttonXoa} onPress={()=>{deleteInteraction(tour.interactionId)}}><Text style={{ fontSize: 18, fontWeight: "500" }}>Xóa</Text></Pressable>

                                </View>
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

    },
    tourRow: {
        borderRadius: 10,
        width: '97%',
        marginLeft: "1.5%",
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
        width: 140,
        height: 150,

    },
    avt: {
        justifyContent: "center",
       
    },

    detailTour: {
        paddingLeft: 5,
        flex: 1
    },
    row: {
        display: 'flex',
        flexDirection: "row",
        paddingBottom: 3
    },
    rowAround: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: "space-between",
        paddingRight: 5,
        paddingTop:10
    },
    buttonXoa: {
        width: 100,
        height: 35,
        backgroundColor: "#F5F5F5",
        borderColor: "#3FD0D4",
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    }

});

export default SavedTour;