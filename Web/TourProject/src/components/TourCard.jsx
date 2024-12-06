import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { GiCommercialAirplane } from "react-icons/gi";
import { FaBus, FaTrain, FaCar } from "react-icons/fa";
import { BsCalendar4Week, BsCalendarHeart } from "react-icons/bs";
import { TiWeatherPartlySunny } from "react-icons/ti";
import axios from "axios";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { handleInteraction } from "../services/api";

const TourCard = ({ tour, user }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [savedTourMessage, setSavedTourMessage] = useState("");

  // Hàm định dạng giá tiền
  const formatCurrency = (amount) => {
    return amount.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0, // không hiển thị số thập phân
      maximumFractionDigits: 0,
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0"); // Lấy ngày và đảm bảo có 2 chữ số
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Lấy tháng (tháng 0 bắt đầu từ 0)
    const year = date.getFullYear(); // Lấy năm
    return `${day}/${month}/${year}`; // Trả về định dạng "dd/mm/yyyy"
  };

  const handleNavigateDetail = async (event,tour) => {
    if (event.target.closest("button")) return;
    await handleInteraction(tour.tourId, "VIEW", user, token);
    navigate(`/detail?ticketId=${tour.ticketId}`);
  };

  const handleSaveTour = async (tour) => {
    if (user) {
      await handleInteraction(tour.tourId, "SAVED");
      setShowModal(true);
      setSavedTourMessage(
        `Tour "${tour.name}" đã được lưu vào danh sách yêu thích!`
      );
      setTimeout(() => {
        setShowModal(false);
      }, 3000); // Đóng modal sau 3 giây
    } else {
      setShowModal(true);
      setSavedTourMessage(`Vui lòng đăng nhập để lưu tour!`);
      setTimeout(() => {
        setShowModal(false);
      }, 3000); // Đóng modal sau 3 giây
      return;
    }
  };

  return (
    <div
      className="bg-white flex flex-col justify-between font-sriracha w-80 h-80 shadow-2xl shadow-gray-500/50 rounded-lg group overflow-hidden relative"
      onClick={(e) => handleNavigateDetail(e,tour)}
    >
      {/* Ảnh tour */}
      <img
        src={tour.urlImage[0]}
        alt={tour.name}
        className="h-44 rounded-t-lg object-cover transform transition-transform duration-1000 ease-in-out group-hover:scale-105"
      />

      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full text-center">
            <p className="text-lg text-green-600">{savedTourMessage}</p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
      {/* Nút Save ở góc trên bên phải */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleSaveTour(tour);
        }}
        className="absolute top-2 right-2 text-red-500 rounded-full p-2 bg-white shadow-md hover:bg-red-100 transition duration-300 ease-in-out"
      >
        <FaHeart size={20} />
      </button>

      {/* Thông tin tour */}
      <p className="text-black font-bold m-1 mt-2 text-xl">{tour.name}</p>
      <div className="flex ml-1 justify-between">
        <p className="text-xl text-red-500">{formatCurrency(tour.price)}</p>
        <div className="flex space-x-2 items-center mr-2">
          {tour.tourFeatureDTO.transportationMode.includes("AIRPLANE") && (
            <GiCommercialAirplane />
          )}
          {tour.tourFeatureDTO.transportationMode.includes("BUS") && <FaBus />}
          {tour.tourFeatureDTO.transportationMode.includes("TRAIN") && (
            <FaTrain />
          )}
          {tour.tourFeatureDTO.transportationMode.includes("PRIVATE_CAR") && (
            <FaCar />
          )}
        </div>
      </div>
      {tour.oldPrice > 0 && (
        <p className="text-gray-400 text-sm ml-1 line-through self-start">
          {formatCurrency(tour.oldPrice)}
        </p>
      )}

      <div className="flex ml-1 justify-between items-center text-sm">
        <div className="flex space-x-2 items-center">
          <BsCalendar4Week />
          <p>Khởi hành: {formatDate(tour.departureDate)}</p>
        </div>

        <p className="text-sm text-green-600 mr-2">
          {tour.availableSlot > 0
            ? `Còn ${tour.availableSlot} chỗ trống`
            : "Hết chỗ"}
        </p>
      </div>
      <div className="flex ml-1 items-center justify-between text-sm mb-2">
        <div className="flex space-x-2 items-center">
          <BsCalendarHeart />
          <p>
            Thời gian: {tour.day} ngày {tour.night} đêm
          </p>
        </div>
        <TiWeatherPartlySunny size={20} className="mr-2" />
      </div>
    </div>
  );
};

export default TourCard;
