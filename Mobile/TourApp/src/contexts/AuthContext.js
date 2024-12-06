import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "./../api/axiosInstance";
const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
};

// AsyncStorage.clear();
export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState("hihi"); 
    useEffect(() => {
        const loadData = async () => {
        
            try {
                await fetchUserInfo(); 
            } catch (error) {
                throw new Error("Error loading data from AsyncStorage:", error);
            }
        };

        loadData();
    }, []);
    useEffect(() => {
        const saveData = async () => {
            try {
                if (authUser) {
                    await AsyncStorage.setItem("authUser", JSON.stringify(authUser));
                }
            } catch (error) {
                throw new Error("Error saving data to AsyncStorage:", error);
            }
        };
        saveData();
    }, [authUser]);
    const fetchUserInfo = async () => {
        try {
            const response = await axiosInstance.get(`/customers/by-email`);
            setAuthUser(response.data);
            return response.data;

        } catch (error) {
            throw new Error("Failed to fetch user info");
        }
    };
    return (
        <AuthContext.Provider
            value={{
                authUser,
                setAuthUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// export default AuthContextProvider;
