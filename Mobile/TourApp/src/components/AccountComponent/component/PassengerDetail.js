import React, { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, Image, ScrollView, Modal } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
const PassengerDetail = ({ navigation, route }) => {
    // const { passenger } = route.params
    const [passengers, setPassengers] = useState([
        {
            name: 'Bao Truc',
            url: 'https://res.cloudinary.com/doqbelkif/image/upload/v1727453521/e015a22e-fa11-4f2c-86bf-322445d957ea.png',
            gioiTinh: 1,
            ngaySinh: "06/05/2002",
            email: "baotruc123@gmail.com",
            phone: "0338030541"
        },
        {
            name: 'Phi Phát',
            url: 'https://res.cloudinary.com/doqbelkif/image/upload/v1727462828/3b58a98e-6fda-4db9-a86a-27cce71df5ea.png',
            gioiTinh: 2,
            ngaySinh: "18/12/2002",
            email: "phiphat123@gmail.com",
            phone: "0338030542"
        }]
    );
    const [modalVisibleEdit, setModalVisibleEdit] = useState(false);
    const [passengerSelect, setPassengerSelect] = useState("");
    const editInfoPassenger = (passenger) => {
        setModalVisibleEdit(false);
        setModalVisibleEdit(true);
        setPassengerSelect(passenger);
    };
    return (
        <ScrollView style={{ backgroundColor: "#fafafa", height: "100%" }}>
            <View style={styles.header}>
                <Text style={styles.textName}>Thông tin hành khách</Text>
            </View>
            <View style={styles.viewBox}>
                <View style={styles.rowBe}>
                    <View style={styles.row}>
                        <Feather name="users" size={24} color="black" />
                        <Text style={styles.textTieuDe}>Thông tin hành khách đã lưu</Text>
                    </View>
                    <Pressable><Text style={styles.textButton}>+Thêm</Text></Pressable>
                </View>
                <Text style={styles.textSelect}>Khi đã điền thông tin hành khách, bạn không cần phải nhập thủ công thông tin trong quá trình đặt chổ</Text>
                {passengers?.map((passenger, index) => (
                    <View style={styles.record} key={index}>
                        <View style={styles.row}>
                            <AntDesign name="filetext1" size={24} color="black" />
                            <Text style={styles.textTitle}>{passenger?.name}</Text>
                        </View>
                        <Pressable onPress={() => editInfoPassenger(passenger)}><MaterialCommunityIcons name="dots-horizontal" size={24} color="#3FD0D4" /></Pressable>
                    </View>
                ))}

            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisibleEdit}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisibleEdit(!modalVisibleEdit);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.textTieuDe}>{passengerSelect?.name}</Text>
                        <Pressable
                            style={[styles.button, styles.buttonEdit]}
                            onPress={() => { navigation.navigate("FormEditPassenger", { passenger: passengerSelect }); }}>
                            <Text style={styles.textStyle}>Chỉnh sửa</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonDelete]}
                            onPress={() => setModalVisibleEdit(!modalVisibleEdit)}>
                            <Text style={[styles.textStyle,{color: 'red',}]}>Xóa</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisibleEdit(!modalVisibleEdit)}>
                            <Text style={[styles.textStyle,{color: '#06BAF2',}]}>Đóng</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

        </ScrollView>
    );
};
const styles = StyleSheet.create({
    header: {
        backgroundColor: "#3FD0D4",
        marginBottom: 25,
    },
    textName: {
        fontSize: 20,
        fontWeight: "500",
        padding: 10,
        textAlign: 'center'
    },
    textTieuDe: {
        fontSize: 16,
        fontWeight: "500",
        paddingBottom: 5,
        paddingLeft: 5
    },
    textButton: {
        fontSize: 14,
        fontWeight: "500",
        color: "#3FD0D4"
    },
    textTitle: {
        fontSize: 13,
        fontWeight: "500",
        paddingLeft: 10
    },
    viewBox: {
        paddingTop: 15,
        padding: 10
    },
    box: {
        backgroundColor: "#fff",
        flexDirection: "row",
        justifyContent: 'space-between',
        padding: 10,
        // alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 10
    },
    borderTop: {
        borderTopWidth: 0.5,
        borderColor: "#bbb"
    },
    rowBe: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between',
        padding: 8
    },
    row: {
        flexDirection: "row",
    },
    textSelect: {
        fontSize: 12,
        fontWeight: "400",
        color: "#8C8C8C",
        paddingLeft: 8
    },
    textDetail: {
        fontSize: 12,
        fontWeight: "400",
        color: "#8C8C8C",
        fontStyle: "italic"
    },
    record: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between',
        padding: 8,
        marginLeft: 15,
        width: '85%',
        backgroundColor: "#EEEEEE",
        marginTop: 15,
        alignItems: "center"
    },
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '90%'
    },
    button: {
        borderRadius: 8,
        padding: 10,
        elevation: 2,
        width:'100%',
        marginTop:10
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#F2F2F2',
        
    },
    buttonEdit: {
        backgroundColor: '#3FD0D4',
    },
    buttonDelete: {
        backgroundColor: '#F2F2F2',
    },
    textStyle: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
})

export default PassengerDetail;