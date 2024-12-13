import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import HomeTour from "../components/HomeComponent/HomeComponent"
import AccountComponent from "../components/AccountComponent/AccountComponent"
import BookingComponent from "../components/BookingComponent/ListBookingComponent"
import NotificationComponent from "../components/NotificationComponent/NotificationComponent"
import SavedListComponent from "../components/SavedListComponent/SavedListComponent"

const Tab = createBottomTabNavigator();

const MainComponent = () => {
    return (
        <Tab.Navigator
            initialRouteName="HomeTour"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === "HomeTour") {
                        iconName = focused
                            ? "home"
                            : "home-outline";
                    } else if (route.name === "Bookings") {
                        iconName = focused ? "list" : "list-outline";
                    } 
                    else if (route.name === "Notifications") {
                        iconName = focused ? "notifications" : "notifications-outline";
                    } else if (route.name === "SavedList") {
                        iconName = focused ? "save" : "save-outline";
                    } else if (route.name === "Account") {
                        iconName = focused
                            ? "person"
                            : "person-outline";
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="HomeTour" component={HomeTour} />
            <Tab.Screen name="SavedList" component={SavedListComponent} />
            <Tab.Screen name="Bookings" component={BookingComponent} load="true"/>
            <Tab.Screen name="Notifications" component={NotificationComponent} />
            <Tab.Screen name="Account" component={AccountComponent} />
           
        </Tab.Navigator>
    );
};

export default MainComponent;