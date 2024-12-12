import React, { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useAuthContext } from "../../../contexts/AuthContext";

const AccountDetail = ({ navigation, route }) => {
    const { authUser, fetchUserInfo } = useAuthContext();
    console.log(authUser?.gender)
    return (

        <ScrollView style={{ backgroundColor: "#fafafa", height: "100%" }}>
            <View style={styles.header}>
                <Text style={styles.textName}>Thông tin tài khoản</Text>
            </View>
            <View style={styles.viewBox}>
                <View style={styles.rowBe}>
                    <Text style={styles.textTieuDe}>Dữ liệu cá nhân</Text>
                    <Pressable onPress={() => { navigation.navigate("FormEditPassenger"); }}><Text style={styles.textButton}>THAY ĐỔI</Text></Pressable></View>
                <Pressable style={styles.box}>
                    <Text style={styles.textTitle}>Họ tên</Text>
                    <Text style={styles.textSelect}>{authUser?.name}</Text>
                </Pressable>
                <Pressable style={[styles.box, styles.borderTop]}>
                    <Text style={styles.textTitle}>Giới tính</Text>
                    <Text style={styles.textSelect}>{ (authUser?.gender == false ? "Nữ" : "Nam")}</Text>
                </Pressable>
                <Pressable style={[styles.box, styles.borderTop]}>
                    <Text style={styles.textTitle}>Ngày sinh</Text>
                    <Text style={styles.textSelect}>{authUser?.dateOfBirth}</Text>
                </Pressable>
                <Pressable style={[styles.boxCol, styles.borderTop]}>
                    <Text style={styles.textTitle}>Thành phố bạn đang ở</Text>
                    <Text style={styles.textSelect}>{authUser?.address ?authUser?.address: "Chưa có dữ liệu"}</Text>
                </Pressable>
            </View>
            <View style={styles.viewBox}>
                <View style={styles.rowBe}>
                    <Text style={styles.textTieuDe}>Email</Text>
                    <Pressable><Text style={styles.textButton}>THAY ĐỔI</Text></Pressable></View>
                <Pressable style={styles.box}>
                    <View>
                        <Text style={styles.textTitle}>{authUser?.email}</Text>
                        <Text style={styles.textDetail}>Đây là địa chỉ email dùng để đăng nhập và nhận các thông báo</Text>
                    </View>
                    <Pressable><MaterialCommunityIcons name="dots-horizontal" size={24} color="black" /></Pressable>
                </Pressable>
                
            </View>
            <View style={styles.viewBox}>
                <View style={styles.rowBe}>
                    <Text style={styles.textTieuDe}>Số điện thoại</Text>
                    <Pressable><Text style={styles.textButton}>THAY ĐỔI</Text></Pressable></View>
                <Pressable style={styles.box}>
                    <View>
                        <Text style={styles.textTitle}>{authUser?.phoneNumber}</Text>
                        <Text style={styles.textDetail}>Đây là số điện thoại bạn đã đăng ký với chúng tôi</Text>
                    </View>
                   <Pressable><MaterialCommunityIcons name="dots-horizontal" size={24} color="black" /></Pressable>
                </Pressable>
                
            </View>

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
    },
    textButton: {
        fontSize: 14,
        fontWeight: "500",
        color: "#3FD0D4"
    },
    textTitle: {
        fontSize: 13,
        fontWeight: "500"
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
    boxCol: {
        backgroundColor: "#fff",
        flexDirection: "column",
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
    textSelect: {
        fontSize: 12,
        fontWeight: "400",
        color: "#8C8C8C"
    },
    textDetail: {
        fontSize: 12,
        fontWeight: "400",
        color: "#8C8C8C",
        fontStyle: "italic"
    },
})

export default AccountDetail;