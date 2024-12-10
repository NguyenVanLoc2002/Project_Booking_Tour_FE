import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

const useGroup = () => {
    const [northernTours, setNorthernTours] = useState([]);
    const [centralTours, setCentralTours] = useState([]);
    const [southernTours, setSouthernTours] = useState([]);
    const [isAscending, setIsAscending] = useState(true);
    const [tourListSort, setTourListSort] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    //Call API Tour by Region
    const fetchToursByRegion = async (region) => {      
        try {
            const response = await axiosInstance.get(
                "/tours/region",
                {
                    params: { region, page: 1, size: 10, isAscending },
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
    const fetchToursSort = async (region,currentPage,toursPerPage,sortType) => {
        try {
          let url = `/tours/region`;
          const params = {
            region,
            page: currentPage,
            size: toursPerPage,
            isAscending: true,
          };
    
          switch (sortType) {
            case "startDateNew": // Mới nhất
              params.isAscending = false; // Ngày giảm dần
              break;
    
            case "priceDesc": // Giá cao nhất
              url = `/tours/region-order-by-price`;
              params.isAscending = false;
              break;
    
            case "priceAsc": // Giá thấp nhất
              url = `/tours/region-order-by-price`;
              params.isAscending = true;
              break;
            case "departureDateAsc": // Khởi hành sớm nhất
              url = `/tours/region-order-by-departure-date`;
              params.isAscending = true;
              break;
            case "departureDateDesc": // Khởi hành muộn nhất
              url = `/tours/region-order-by-departure-date`;
              params.isAscending = false;
              break;
            default:
              // Nếu không có sortType, giữ nguyên URL và params mặc định
              break;
          }
    
          const response = await axiosInstance.get(url, { params });
          setTourListSort(response.data.content); // Lưu danh sách tour
          setTotalPages(response.data?.totalPages || 0);
        } catch (error) {
          console.log(error);
        }
      };

    return {
        northernTours,
        centralTours,
        southernTours,
        tourListSort,
        fetchToursByRegion,
        fetchToursSort,
        totalPages
    };
};

export default useGroup;
