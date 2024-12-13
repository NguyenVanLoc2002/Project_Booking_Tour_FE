import React, { useEffect, useRef, useState } from "react";
import { View, Text, ImageBackground, Pressable, StyleSheet, TextInput } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import TourTabbar from "./component/TourTabbar";

const DetailTour = ({ navigation, route }) => {
    const { tour } = route.params
    return (
        <View style={{ flex: 1, backgroundColor: "#fafafa", }}>
            <ImageBackground source={{
                uri: tour?.urlImage[0]
            }} resizeMode="cover" style={styles.imageBia}>
            </ImageBackground>

            <View style={styles.viewBox}>
                <View style={{display:'flex', marginBottom:-30, zIndex:500, justifyContent:"space-around", flexDirection:"row", paddingLeft:10, paddingRight:10}}  pointerEvents = "none">
                    <Text style={{ fontSize: 12,  fontWeight: "bold",textTransform: "none", color:"gray"}}>
                        Tổng Quan
                    </Text>
                    <Text style={{ fontSize: 12,  fontWeight: "bold",textTransform: "none", color:"gray"}}>
                        Chương trình
                    </Text>
                    <Text style={{ fontSize: 12,  fontWeight: "bold",textTransform: "none", color:"gray"}}>
                        Điều kiện
                    </Text>
                </View>
                <TourTabbar navigation={navigation} tour={tour} style={styles.viewBox} />
            </View>
            <View style={styles.priceBox}>
                <View style={styles.rowBetween}>
                    <View style={styles.column}>
                        <Text style={{ fontSize: 14, paddingLeft: 10, color: "#8C8C8C", fontWeight: "500", textDecorationLine: "line-through" }}>Giá: {tour?.oldPrice}đ</Text>
                        <Text style={{ fontSize: 15, paddingLeft: 10, color: "red", fontWeight: "500" }}>{tour?.price}đ/khách</Text>
                    </View>
                    <Pressable style={styles.buttonDat}
                    // onPress={() => { navigation.navigate("DatTour", { tour:tour });  }}
                    >
                        <Text style={styles.textDat}>ĐẶT NGAY</Text>
                    </Pressable>
                </View>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        paddingHorizontal: 10,
        height: 40,
        backgroundColor: '#fff',
        width: "70%",
        marginLeft: 15
    },
    buttonSearch: {
        flex: 1,
        paddingLeft: 5
    },
    iconSearch: {
        marginRight: 10,
    },
    optionsRow: {
        flexDirection: 'row',
        // justifyContent: 'space-around',
        marginVertical: 10,
    },
    viewBox: {
        flex: 1,
        marginTop: -50,
        backgroundColor: "transparent",
        borderRadius: 10,
        width: "100%",
        // height: "100%"
        height: '80%',
    },

    imageBia: {
        width: '100%',
        height: 250,
        marginRight: 10,
        alignItems: "center",
    },

    rowBetween: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 6
    },

    priceBox: {
        backgroundColor: "#ffcccc"
    },
    row: {
        display: 'flex',
        flexDirection: "row",
    },
    column: {
        display: 'flex',
        flexDirection: "col",
    },
    buttonDat: {
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
export default DetailTour;