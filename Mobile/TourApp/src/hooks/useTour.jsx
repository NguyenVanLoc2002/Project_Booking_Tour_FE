import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

const useGroup = () => {
  const [northernTours, setNorthernTours] = useState([]);
  const [centralTours, setCentralTours] = useState([]);
  const [southernTours, setSouthernTours] = useState([]);
  const [isAscending, setIsAscending] = useState(true);
  const [tourListSort, setTourListSort] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPagesNorth, setTotalPagesNorth] = useState(1);
  const [totalPagesCentral, setTotalPagesCentral] = useState(1);
  const [totalPagesSouth, setTotalPagesSouth] = useState(1);
  const [saveTour, setSaveTour] = useState([]);
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
        setTotalPagesNorth(response.data?.totalPages || 0)
      } else if (region === "CENTRAL") {
        setCentralTours(response.data.content);
        setTotalPagesCentral(response.data?.totalPages || 0)
      } else if (region === "SOUTH") {
        setSouthernTours(response.data.content);
        setTotalPagesSouth(response.data?.totalPages || 0)
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };
  const normalizeDate = (date) => {
    if (Array.isArray(date)) {
      // Chuyển mảng [YYYY, MM, DD] thành chuỗi "YYYY-MM-DD"
      return new Date(date[0], date[1] - 1, date[2]); // Chú ý: tháng trong JavaScript bắt đầu từ 0
    } else if (typeof date === 'string') {
      return new Date(date); // Nếu đã là chuỗi thì dùng trực tiếp
    }
    return new Date(); // Nếu không hợp lệ, trả về ngày hiện tại
  };

  const setSortType = (tours, sortType) => {
    const now = new Date();

    switch (sortType) {
      case 'priceDesc':
        return tours.sort((a, b) => b.price - a.price); // Giá từ cao đến thấp

      case 'priceAsc':
        return tours.sort((a, b) => a.price - b.price); // Giá từ thấp đến cao

      case 'startDateNew':
        return tours.sort(
          (a, b) =>
            normalizeDate(b.tourFeatureDTO.startDate) - now -
            (normalizeDate(a.tourFeatureDTO.startDate) - now)
        );
      case 'departureDateAsc': // Ngày gần hiện tại nhất trở lên
        return tours.sort(
          (a, b) =>
            normalizeDate(a.departureDate) - now -
            (normalizeDate(b.departureDate) - now)
        );

      case 'departureDateDesc': // Ngày xa hiện tại nhất trở lại
        return tours.sort(
          (a, b) =>
            normalizeDate(b.departureDate) - now -
            (normalizeDate(a.departureDate) - now)
        );
      default:
        return tours; // Không sắp xếp
    }
  };
  const fetchToursSort = async (region, currentPage, toursPerPage, sortType, authUser,name) => {

    try {
      if (region == "RECOMMEND") {
        const url = `/recommendation/${authUser?.userId}?page=${currentPage}&size=${toursPerPage}`;

        const response = await axiosInstance.get(url);

        setTourListSort(setSortType(response.data.content, sortType)); // Lưu danh sách tour
        setTotalPages(response.data?.totalPages || 0);
      }
      else if(region == "NAME"){
        const url = `tours/by-name`;
        const params = {
          page: currentPage,
          size: toursPerPage,
          name: name
        };
        const response = await axiosInstance.get(url,{params});
        if(sortType==""){
          setTourListSort(response.data.content); 
        }else {
          setTourListSort(setSortType(response.data.content, sortType)); // Lưu danh sách tour
        }
       
        setTotalPages(response.data?.totalPages || 0);
      }
      else {
        let url = `/tours/region`;
        const params = {
          region,
          page: currentPage,
          size: toursPerPage,
          isAscending: true,
        };

        const response = await axiosInstance.get(url, { params });

        setTourListSort(setSortType(response.data.content, sortType)); // Lưu danh sách tour
        setTotalPages(response.data?.totalPages || 0);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const saveTourSort = async ( currentPage, toursPerPage, sortType, authUser) => {

    try {
        const url = `/recommendation/customer-interaction/saved/${authUser.userId}`;
        const savedTourResponse = await axiosInstance.get(url);
        const savedTourData = savedTourResponse.data; 
        const totalPages = Math.ceil(savedTourData.length / toursPerPage);
        // Lưu danh sách tour
        setTotalPages(totalPages);
        const paginatedData = paginateData(
          savedTourData,
          currentPage,
          toursPerPage
        );
        const tourPromises = paginatedData.map(async (interaction) => {
          const response = await axiosInstance.get(
            `/tours/getById?ticketId=${interaction.tourId}`
          );
          return { ...response.data, interactionId: interaction.interactionId };
        });
  
        // Đợi tất cả các tour chi tiết
        const toursData = await Promise.all(tourPromises);
        const savedTour = setSortType(toursData, sortType) ; 
        setSaveTour(savedTour);
      
    } catch (error) {
      console.log(error);
    }
  };
  const paginateData = (data, page, perPage) => {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    return data.slice(start, end);
  };

  return {
    northernTours,
    centralTours,
    southernTours,
    tourListSort,
    fetchToursByRegion,
    fetchToursSort,
    totalPages,
    totalPagesSouth,
    totalPagesCentral,
    totalPagesNorth,
    saveTour,
    saveTourSort
  };
};

export default useGroup;
