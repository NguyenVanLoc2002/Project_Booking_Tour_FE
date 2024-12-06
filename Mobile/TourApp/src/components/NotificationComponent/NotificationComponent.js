import React, { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Notification from './component/Notification'
const NotificationComponent = ({ navigation, route }) => {
   
    return (
        <View style={{ backgroundColor: "white", height: "100%" }}>
            <View style={styles.header}>
                <Text style={styles.textName}>Thông báo</Text>
            </View>
            <Notification/>
        </View>
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
    
})

export default NotificationComponent;