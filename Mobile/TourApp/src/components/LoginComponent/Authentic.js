import React, { useEffect, useRef, useState } from "react";
import { View, Text, ImageBackground, Pressable, Button, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Dimensions } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


const Authentic = ({ navigation }) => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);

    const handleChangeText = (text, index) => {
        let newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        // Move to the next input if text is entered and not the last input
        if (text && index < 5) {
            inputRefs.current[index + 1].focus();
        }

        // Move to the previous input if backspace and input is empty
        if (!text && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };
    return (
        <ScrollView style={{ backgroundColor: "#F2F2F2"}}>
            <ImageBackground source={{
                uri: "https://res.cloudinary.com/doqbelkif/image/upload/v1727568064/28b4e7ff-14a1-446f-af98-98b6d28ff0ba.png"
            }} resizeMode="cover" style={styles.imageBia}>
            </ImageBackground>
            <View style={styles.form}>
                <Text style={{ fontSize: 18, padding: 5, fontWeight: "500", }}>Nhập mã xác thực</Text>
                <Text style={{ fontSize: 14, padding: 5, fontWeight: "500", paddingBottom: 15, textAlign: 'center', }}>Vui lòng nhập mã xác thực tôi đã gửi cho bạn qua email “***2002@gmail.com”</Text>
                <View style={styles.box}>
                    <Text style={{ fontSize: 18, padding: 5, fontWeight: "500", }}>OTP</Text>
                    <View style={styles.row}>
                        {otp.map((value, index) => (
                            <TextInput
                                key={index}
                                style={styles.input}
                                value={value}
                                onChangeText={(text) => handleChangeText(text, index)}
                                keyboardType="numeric"
                                maxLength={1}
                                ref={(el) => (inputRefs.current[index] = el)} // Gán tham chiếu đến input
                            />
                        ))}
                    </View>
                </View>
                <Pressable style={[styles.button, { backgroundColor: '#F5F5F5' }]} >
                    <Text style={{ fontSize: 18, paddingLeft: 10, fontWeight: "500", textAlign: 'center' }}>Đợi 46s gửi lại mã xác thực</Text>
                </Pressable>
                <Pressable style={styles.button} >
                    <Text style={{ fontSize: 18, paddingLeft: 10, fontWeight: "500", color: '#fff', textAlign: 'center' }}>XÁC THỰC</Text>
                </Pressable>


            </View>

        </ScrollView >
    );
};

const styles = StyleSheet.create({
    imageBia: {
        width: '100%',
        height: 200,
        marginRight: 10,
        alignItems: "center",
    },
    form: {
        backgroundColor: "#fff",
        marginTop: -30,
        alignItems: 'center',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingBottom: 150
    },
    box: {
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        width: '90%',
        padding: 10,
        paddingBottom: 15,
        alignItems:'center'
    },
    input: {
        borderWidth: 1,
        borderColor: "#3FD0D4",
        borderRadius: 10,
        height: 40,
        width: 40,
        margin:5,
        textAlign: 'center',
        fontSize: 20,
    },
    row: {
        flexDirection: 'row',
        // justifyContent: 'space-between'
    },

    button: {
        backgroundColor: '#3FD0D4',
        width: '70%',
        height: 40,
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
    }

})
export default Authentic;