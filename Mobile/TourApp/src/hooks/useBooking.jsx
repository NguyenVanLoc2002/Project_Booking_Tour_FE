import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

const useGroup = () => {
    const [northernTours, setNorthernTours] = useState([]);
    const [centralTours, setCentralTours] = useState([]);
    const [southernTours, setSouthernTours] = useState([]);
    const [isAscending, setIsAscending] = useState(true);
    //Call API Tour by Region
    const fetchToursByRegion = async (region) => {      
        try {
            const response = await axiosInstance.get(
                "/tours/region",
                {
                    params: { region, page: 1, size: 3, isAscending },
                }
            );
            // Cập nhật state tương ứng với miền
            if (region === "NORTH") {
                setNorthernTours(response.data.content);
            } else if (region === "CENTRAL") {
                setCentralTours(response.data.content);
            } else if (region === "SOUTH") {
                setSouthernTours(response.data.content);
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
        }
    };

    return {
        northernTours,
        centralTours,
        southernTours,
        fetchToursByRegion
    };
};

export default useGroup;
