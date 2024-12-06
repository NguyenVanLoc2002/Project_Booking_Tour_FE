import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';

const DieuKien = ({ navigation, route }) => {
    const { tour } = route.params;
    const [expanded, setExpanded] = useState({}); // Quản lý trạng thái mở của mỗi ngày

    // Hàm để xử lý việc ẩn hoặc hiện phần chi tiết của một ngày cụ thể
    const toggleDetail = (key) => {
        setExpanded((prevExpanded) => ({
            ...prevExpanded,
            [key]: !prevExpanded[key] // Đảo ngược trạng thái của mục hiện tại
        }));
    };

    return (
        <ScrollView style={styles.container}>
            <View >
                <View style={styles.detailBox}>
                    <Pressable style={{ paddingRight: 10 }} onPress={() => toggleDetail('baoGom')}>
                        <View style={styles.rowBetween}>
                            <Text style={styles.tieuDe}>Bao gồm</Text>
                            {expanded.baoGom ? (
                                <Ionicons name="arrow-down-circle" size={24} color="black" />
                            ) : (<Ionicons name="arrow-up-circle" size={24} color="black" />)}
                        </View>
                    </Pressable>
                    {expanded.baoGom && <Text style={{ fontSize: 13, paddingTop: 15, }}>{tour?.dieuKien?.baoGom}</Text>}
                </View>
                <View style={styles.detailBox}>
                    <Pressable style={{ paddingRight: 10 }} onPress={() => toggleDetail('khongBaoGom')}>
                        <View style={styles.rowBetween}><Text style={styles.tieuDe}>Không bao gồm</Text>
                            {expanded.khongBaoGom ? (
                                <Ionicons name="arrow-down-circle" size={24} color="black" />
                            ) : (<Ionicons name="arrow-up-circle" size={24} color="black" />)}
                        </View>
                    </Pressable>
                    {expanded.khongBaoGom && <Text style={{ fontSize: 13, paddingTop: 15, }}>{tour?.dieuKien?.khongBaoGom}</Text>}
                </View>

                <View style={styles.detailBox}>
                    <Pressable style={{ paddingRight: 10 }} onPress={() => toggleDetail('giaveTreEm')}>
                        <View style={styles.rowBetween}><Text style={styles.tieuDe}>Giá vé trẻ em</Text>
                            {expanded.giaveTreEm ? (
                                <Ionicons name="arrow-down-circle" size={24} color="black" />
                            ) : (<Ionicons name="arrow-up-circle" size={24} color="black" />)}
                        </View>
                    </Pressable>
                    {expanded.giaveTreEm && <Text style={{ fontSize: 13, paddingTop: 15, }}>{tour?.dieuKien?.giaveTreEm}</Text>}
                </View>
                <View style={styles.detailBox}>
                    <Pressable style={{ paddingRight: 10 }} onPress={() => toggleDetail('huyTour')}>
                        <View style={styles.rowBetween}>
                            <Text style={styles.tieuDe}>Hủy Tour</Text>
                            {expanded.huyTour ? (
                                <Ionicons name="arrow-down-circle" size={24} color="black" />
                            ) : (<Ionicons name="arrow-up-circle" size={24} color="black" />)}
                        </View>
                    </Pressable>
                    {expanded.huyTour && <Text style={{ fontSize: 13, paddingTop: 15, }}>{tour?.dieuKien?.huyTour}</Text>}
                </View>
                <View style={styles.detailBox}>
                    <Pressable style={{ paddingRight: 10 }} onPress={() => toggleDetail('thanhToan')}>
                        <View style={styles.rowBetween}><Text style={styles.tieuDe}>Thanh Toán</Text>
                            {expanded.thanhToan ? (
                                <Ionicons name="arrow-down-circle" size={24} color="black" />
                            ) : (<Ionicons name="arrow-up-circle" size={24} color="black" />)}
                        </View>
                    </Pressable>
                    {expanded.thanhToan && <Text style={{ fontSize: 13, paddingTop: 15, }}>{tour?.dieuKien?.thanhToan}</Text>}
                </View>

            </View>

        </ScrollView >
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F2F2F2"
    },
    row: {
        display: 'flex',
        flexDirection: "row",
    },
    row50: {
        display: 'flex',
        flexDirection: "row",
        width: "48%",
        paddingTop: 5
    },
    rowBetween: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: "space-between"
    },
    column: {
        display: 'flex',
        flexDirection: "col",
        width: "90%",
    },
    detailBox: {
        width: "90%",
        marginLeft: "5%",
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingTop: 10,
        paddingLeft: 10,
        paddingBottom: 10,
        marginTop: 20,
    },
    detailBoxBorder: {
        width: "90%",
        marginLeft: "5%",
        backgroundColor: "#fff",
        borderRadius: 20,
        paddingTop: 15,
        paddingBottom: 15,
        marginTop: 20,
        borderColor: "#3FD0D4",
        borderWidth: 1
    },
    bannerContainer: {
        margin: 10
    },
    bannerRow: {
        borderRadius: 10,
        height: 156,
        width: 150,
    },

    bannerAvt: {
        height: 150,
        margin: 3,
        alignItems: "center",
        // backgroundColor: "black",
        borderRadius: 15
    },
    banner: {
        marginTop: 20
    },
    tieuDe: {
        fontSize: 14,
        fontWeight: "500",
        // textAlign: "center",
    }
})

export default DieuKien;