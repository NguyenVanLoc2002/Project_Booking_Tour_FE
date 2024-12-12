import React, { useEffect } from "react";
import { View, TextInput, Pressable, Text, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from "@expo/vector-icons";
import TongQuan from "./TongQuan";
import ChuongTrinh from "./ChuongTrinh";
import DieuKien from "./DieuKien";
const Tab = createMaterialTopTabNavigator();
const TourTabbar = ({ navigation, tour }) => {

  return (
    <Tab.Navigator
      initialRouteName="Tổng quan" tabBarPosition="top"
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
          textTransform: "none",
          display: "flex"
        },
        tabBarStyle: {
          borderRadius: 30,
          backgroundColor: "#fff",
          width: "90%",
          margin: "auto"
        },
        tabBarIndicatorStyle: {
          backgroundColor: "#3FD0D4",
          height: 2,
          width: '26%',
          borderRadius: 10,
          left: '4%',
        },
        tabBarActiveTintColor: "#3FD0D4",
        tabBarInactiveTintColor: "#666",
      }}>
      <Tab.Screen name="Tổng quan" component={TongQuan} initialParams={{ tour: tour }} />
      <Tab.Screen name="Chương Trình" component={ChuongTrinh} initialParams={{ tour: tour }} />
      <Tab.Screen name="Điều kiện" component={DieuKien} initialParams={{ tour: tour }} />
    </Tab.Navigator>
   
  );
};


export default TourTabbar;

