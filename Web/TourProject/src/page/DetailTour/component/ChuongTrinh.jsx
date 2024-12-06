import * as Icons from "react-icons/ai";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ChuongTrinh({ tour }) {
  const navigate = useNavigate();
  console.log("tour Details: ", tour);
  const [detailsTicket, setDetailTicket] = useState(false);

  const IconDisplay = ({ iconName }) => {
    const IconComponent = Icons[iconName]; // Lấy biểu tượng dựa trên tên truyền vào

    return (
      <div className="flex items-center space-x-2">
        {IconComponent ? <IconComponent size={24} /> : null}{" "}
        {/* Hiển thị biểu tượng nếu tồn tại */}
      </div>
    );
  };

  //Call API Get Itineraries By TourId
  const [itineraries, setItineraries] = useState([]);
  useEffect(() => {
    const fetchItineraries = async () => {
      if (tour) {
        try {
          const res = await axios.get(
            `http://localhost:8000/api/v1/itineraries/by-tour`,
            {
              params: { tourId: tour.tourId },
            }
          );
          setItineraries(res.data);
          console.log(res.data);
        } catch (error) {
          console.error("Error fetching itinerary data:", error);
        }
      }
    };

    fetchItineraries();
  }, [tour]);

  console.log("itineraries: ", itineraries);

  //Call API Ticket Tour
  const [tickets, setTickets] = useState([]);
  useEffect(() => {
    const fetchTickets = async () => {
      if (tour) {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/v1/tour-tickets/by-tour/${tour.tourId}`
          );
          setTickets(response.data);
        } catch (error) {
          console.error("Error fetching Ticket Tour data:", error);
        }
      }
    };
    fetchTickets();
  }, [tour]);

  console.log("Ticket: ", tickets);

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

  //Navigate booking
  const handleChooseTicket = (ticket_tour) => {
    // Chuyển hướng sang trang /booking và truyền dữ liệu ticket_tour
    navigate("/booking", { state: { ticket: ticket_tour, tour: tour } });
  };

  return (
    <>
      <div className="w-full h-full flex flex-col">
        {itineraries.map((it, index) => (
          <div
            key={it.itinerId}
            className="flex justify-around items-stretch mb-4"
          >
            <img
              alt="Beautiful beach"
              className="rounded h-96 w-1/3 object-cover"
              src={
                tour?.urlImage[index] || [
                  "C:BaoTrucKLTNKLTN2BookingTourFrontEndWebTourProjectsrcassets\bannerh1-slider-img-1-.jpg",
                ]
              }
            />
            <div className="bg-white p-4 rounded-lg shadow-md text-base border border-textColorCustom w-7/12 flex flex-col ">
              <div className="flex items-center mb-10">
                <div className="bg-cyan-600 text-white rounded-full w-20 h-20 flex items-center justify-center font-bold">
                  Ngày {it.dayNumber}
                </div>
                <h1 className="ml-4 text-cyan-600 font-semibold text-xl">
                  {it.title}
                </h1>
              </div>

              {/* Render activity dưới dạng HTML */}
              <div
                className="text-gray-800"
                dangerouslySetInnerHTML={{ __html: it.activity }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <div className="border pt-4 pb-4 border-textColorCustom rounded-lg">
        <h2 className="font-bold mb-2 pl-4">Vé trống cho bạn</h2>
        <hr className="border-3 border-[#3FD0D4] w-full mb-4" />
        <button className="bg-gray-200 text-gray-700 ml-4 px-4 py-2 rounded mb-4 flex">
          <IconDisplay iconName="AiOutlineCalendar" />
          Chọn ngày
        </button>

        <div className="space-y-4 pl-4">
          {tickets.map((ticket_tour) => (
            <div
              className="flex justify-between items-center border p-4 rounded"
              key={ticket_tour.ticketId}
            >
              <div>
                <h3 className="font-bold">
                  Tour ghép - Khởi hành từ {ticket_tour?.departureLocation}
                </h3>
                <div className="flex">
                  <IconDisplay iconName="AiOutlineCalendar" />
                  <p className="ml-1">
                    {" "}
                    Ngày khởi hành: {formatDate(ticket_tour?.departureDate)}
                  </p>
                </div>
                <div className="flex">
                  <Icons.AiOutlineUser className="mr-2" size={20} />
                  <p>
                    Số chỗ:{" "}
                    {ticket_tour.availableSlot > 0
                      ? `Còn ${ticket_tour.availableSlot} chỗ trống`
                      : "Hết chỗ"}
                  </p>
                </div>
                <button
                  className="text-teal-500"
                  onClick={() => setDetailTicket(true)}
                >
                  Xem chi tiết
                </button>
              </div>
              <div className="text-right">
                <div className="text-red-500 text-lg font-bold">
                  {formatCurrency(tour.price)}
                </div>
                <button
                  className="bg-teal-500 text-white px-4 py-2 rounded"
                  onClick={() => handleChooseTicket(ticket_tour)}
                >
                  Chọn vé
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {detailsTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          {/* Modal Content */}
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-3/4 md:w-1/2 lg:w-1/3">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setDetailTicket(false)}
            >
              ✕
            </button>

            {/* Modal Body */}
            <h2 className="mb-2 font-bold text-lg text-center">
              Thông tin chuyến bay
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#D9D9D9] text-base p-4">
                <p className="text-gray-500 mb-1">
                  <strong>NGÀY ĐI</strong>
                </p>
                <p className="text-gray-700 mb-1 font-semibold">
                  <span className="text-blue-500 font-semibold">06:00</span>{" "}
                  ngày 13/09/2024
                </p>
                <p className="text-gray-700 mb-1 font-semibold">
                  <span className="text-blue-500 font-semibold">09:30</span>{" "}
                  ngày 13/09/2024
                </p>
                <p className="text-gray-700 mb-1 font-semibold">
                  Chuyến bay:{" "}
                  <span className="text-cyan-600 font-semibold">VN600</span>
                </p>
              </div>
              <div className="bg-[#D9D9D9] text-base p-4">
                <p className="text-gray-500 mb-1">
                  <strong>NGÀY VỀ</strong>
                </p>
                <p className="text-gray-700 mb-1 font-semibold">
                  <span className="text-blue-500 font-semibold">19:00</span>{" "}
                  ngày 15/09/2024
                </p>
                <p className="text-gray-700 mb-1 font-semibold">
                  <span className="text-blue-500 font-semibold">22:30</span>{" "}
                  ngày 15/09/2024
                </p>
                <p className="text-gray-700 mb-1 font-semibold">
                  Chuyến bay:{" "}
                  <span className="text-cyan-600 font-semibold">VN601</span>
                </p>
              </div>
            </div>
            <p className="text-gray-500 mt-2 text-base">
              Chú ý: Vé máy bay không hoàn, không đổi, không hủy, sai tên mất
              100%
            </p>

            {/* Các phần khác */}
            <div className="mt-4">
              {/* Thông tin tập trung */}
              <div className="bg-gray-100 p-4 rounded-md mb-4">
                <h3 className="text-cyan-600 font-semibold mb-2">
                  Thông tin tập trung
                </h3>
                <p className="text-gray-700">
                  <strong>Ngày giờ tập trung:</strong> 19:00 Ngày 15/09/2024
                </p>
                <p className="text-gray-700">
                  <strong>Nơi tập trung:</strong> Sân bay Tân Sơn Nhất, TP.HCM
                </p>
              </div>

              {/* Thông tin hướng dẫn viên */}
              <div className="bg-gray-100 p-4 rounded-md">
                <h3 className="text-cyan-600 font-semibold mb-2">
                  Thông tin hướng dẫn viên
                </h3>
                <p className="text-gray-700">
                  <strong>HDV dẫn đoàn:</strong> Đang cập nhật
                </p>
                <p className="text-gray-700">
                  <strong>HDV tiễn:</strong> Đang cập nhật
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ChuongTrinh;
