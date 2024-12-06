import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
const SavedTour = ({ navigation, route }) => {
    // type 1 bảo mật, 2 tour
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: 1,
            title: "Mật khẩu của bạn đã được thay đổi. Vui lòng đăng nhập bằng mật khẩu mới",
            time: "28/09/2024"
        },
        {
            id: 2,
            type: 2,
            title: "Bạn vừa hủy tour mã số AB132. Nhấn vào để xem chi tiết hoàn tiền. ",
            time: "28/09/2024"
        },
        {
            id: 3,
            type: 1,
            title: "Mật khẩu của bạn đã được thay đổi. Vui lòng đăng nhập bằng mật khẩu mới",
            time: "28/09/2024"
        },
        {
            id: 4,
            type: 2,
            title: "Bạn vừa hủy tour mã số AB132. Nhấn vào để xem chi tiết hoàn tiền. ",
            time: "28/09/2024"
        }]
    );

    return (
        <ScrollView style={styles.tourContainer}>
            {notifications?.map((noti, index) => (
                <View key={index} style={styles.tourRow}>
                    <Pressable
                        style={[styles.itemTour]}
                    >
                        <View style={styles.noti}>
                            <View style={styles.info}>
                                <View style={styles.avt}>
                                    {noti.type == 1 ? (
                                        <View>
                                            <FontAwesome5 name="user-lock" size={32} color="black" />
                                        </View>
                                    ) :
                                        (
                                            <View>
                                                <MaterialIcons name="tour" size={32} color="black" />
                                            </View>
                                        )}
                                </View>
                                <View style={styles.detailTour}>
                                    <Text style={{ fontSize: 14, fontWeight: "500", padding: 5, paddingBottom: 10 }}>{noti?.title}</Text>
                                    <Text style={{ fontSize: 12, fontWeight: "500", color: "gray", padding: 5, paddingBottom: 10 }}>{noti?.time}</Text>
                                </View>
                            </View>
                            <MaterialCommunityIcons name="dots-horizontal" size={24} color="#3FD0D4" style={{paddingRight:5}}/>
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
    noti: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:'center'
    },
    info: {
        flexDirection: "row",
        width: "90%"
    },
    avt: {
        justifyContent: "center",
        padding: 5
    },

    detailTour: {
        paddingLeft: 5,
        flex: 1
    },
   
   

});

export default SavedTour;