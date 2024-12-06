import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const SavedTour = ({ navigation, route, listSaved }) => {
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
                                        uri: tour.url
                                    }}
                                    style={styles.tourAvt}
                                    resizeMode="cover"
                                />
                            </View>
                            <View style={styles.detailTour}>
                                <Text style={{ fontSize: 14, fontWeight: "500", padding: 5, paddingBottom: 10 }}>{tour?.title}</Text>

                                <View style={styles.row}><AntDesign name="calendar" size={16} color="black" /><Text style={{ fontSize: 12 }}>Khởi hành: {tour?.ngayKhoiHanh}</Text></View>
                                <View style={styles.row}><AntDesign name="clockcircleo" size={16} color="black" /><Text style={{ fontSize: 12 }}>Thời gian: {tour?.thoiGian}</Text></View>
                                <View style={styles.row}><AntDesign name="team" size={16} color="red" /><Text style={{ fontSize: 12, color: "red" }}>Số chổ còn nhận: {Number(tour.soLuongVe - tour.soVeDaDat)}/{tour.soLuongVe}</Text></View>
                                <View style={styles.rowAround}>
                                    <View>
                                        <Text style={{ textDecorationLine: "line-through", fontSize: 14, fontWeight: "500", color: "gray" }}>{Number(tour.originalPrice).toLocaleString('vi-VN')} đ</Text>
                                        <Text style={{ fontSize: 14, fontWeight: "500", color: "red" }}>{Number(tour.price).toLocaleString('vi-VN')} đ</Text>

                                    </View>
                                    <Pressable style={styles.buttonXoa}><Text style={{ fontSize: 18, fontWeight: "500" }}>Xóa</Text></Pressable>

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