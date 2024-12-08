import { useEffect, useRef, useState } from "react";
import Header from "../../layouts/Header";
import Menu from "../../layouts/Menu";
import Footer from "../../layouts/Footer";
import * as Icons from "react-icons/ai";
import TongQuan from "./component/TongQuan";
import DieuKien from "./component/DieuKien";
import ChuongTrinh from "./component/ChuongTrinh";
import { useLocation } from "react-router-dom";
import { fetchTourDetail } from "../../services/api";
import ChatBot from "../../layouts/ChatBot";
function DetailTour() {
  const [tabNameSelect, setTabNameSelect] = useState("ChuongTrinh");
  const location = useLocation();

  // Sử dụng URLSearchParams để lấy giá trị từ query string
  const queryParams = new URLSearchParams(location.search);
  const ticketId = queryParams.get("ticketId");
  const [tour, setTour] = useState(null);

  useEffect(() => {
    const getTourDetail = async () => {
      console.log("Calling API with ticketId:", ticketId); // Kiểm tra xem ticketId có đúng không
      try {
        const tourData = await fetchTourDetail(ticketId);
        console.log("Tour data received:", tourData); // Kiểm tra dữ liệu trả về từ API
        setTour(tourData);
      } catch (error) {
        console.error("Error fetching tour detail:", error); // Nếu có lỗi
      }
    };

    if (ticketId) {
      getTourDetail();
    }
  }, [ticketId]);

  console.log("ticketId: ", ticketId);
  console.log("tour: ", tour);

  // Hàm định dạng giá tiền
  const formatCurrency = (amount) => {
    if (amount == null) {
      return "Chưa có giá"; 
    }
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

  const IconDisplay = ({ iconName }) => {
    const IconComponent = Icons[iconName]; // Lấy biểu tượng dựa trên tên truyền vào
    return (
      <div className="flex items-center space-x-2">
        {IconComponent ? <IconComponent size={24} /> : null}{" "}
        {/* Hiển thị biểu tượng nếu tồn tại */}
      </div>
    );
  };

  return (
    <>
      <div className="w-full h-full flex flex-col">
        <Header />
        <Menu />
        <div className="bg-gray-100">
          <div className="w-full mx-auto p-4 bg-white shadow-md">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="font-bold mb-3 text-xl">{tour?.name}</h1>
                <div className="flex space-x-24 mb-4">
                  <div className="flex items-center justify-between">
                    <IconDisplay iconName="AiTwotoneTag" />
                    <span>
                      Giá Tour/khách:
                      {tour?.oldPrice > 0 && (
                        <span className="line-through text-red-500 pl-2 pr-2">
                          {formatCurrency(tour?.oldPrice)}
                        </span>
                      )}
                      <span> {formatCurrency(tour?.price)}</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <IconDisplay iconName="AiOutlineCalendar" />
                    <span>
                      Ngày tour gần nhất: Ngày {formatDate(tour?.departureDate)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <IconDisplay iconName="AiOutlineClockCircle" />
                    <span>
                      Thời gian tour: {tour?.day} ngày {tour?.night} đêm
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* <button className="bg-teal-500 text-black font-bold px-8 py-2 rounded-2xl mb-4">
              ĐẶT TOUR
            </button> */}
            <div className="flex  mb-8 text-base font-bold">
              <button
                className={
                  tabNameSelect == "ChuongTrinh"
                    ? " text-textColorCustom px-4 py-2 border-l border-r border-t border-textColorCustom "
                    : " text-black px-4 py-2 border-b border-b-textColorCustom "
                }
                onClick={() => {
                  setTabNameSelect("ChuongTrinh");
                }}
              >
                Chương trình tour
              </button>
              <button
                className={
                  tabNameSelect == "TongQuan"
                    ? " text-textColorCustom px-4 py-2 border-l border-r border-t border-textColorCustom "
                    : " text-black px-4 py-2 border-b border-b-textColorCustom "
                }
                onClick={() => {
                  setTabNameSelect("TongQuan");
                }}
              >
                Tổng quan tour
              </button>
              <button
                className={
                  tabNameSelect == "DieuKien"
                    ? " text-textColorCustom px-4 py-2 border-l border-r border-t border-textColorCustom "
                    : " text-black px-4 py-2 border-b border-b-textColorCustom "
                }
                onClick={() => {
                  setTabNameSelect("DieuKien");
                }}
              >
                Điều kiện tour
              </button>
            </div>
            {tabNameSelect == "ChuongTrinh" ? (
              <ChuongTrinh tour={tour} />
            ) : (
              <div>
                {tabNameSelect == "TongQuan" ? (
                  <TongQuan tour={tour} />
                ) : (
                  <DieuKien />
                )}
              </div>
            )}
          </div>
        </div>
        <ChatBot />
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

export default DetailTour;
