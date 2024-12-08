import React, { useEffect, useState } from "react";
import PayPalButton from "@/components/PayPalButton.jsx";
import axios from "axios";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import Menu from "../../layouts/Menu";
import { useUser } from "../../contexts/UserContext";
import { handleInteraction } from "../../services/api";
import { useNavigate } from "react-router-dom";
import ChatBot from "../../layouts/ChatBot";

const PaymentPage = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(0); // Giả định số tiền cho tour
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const queryParams = new URLSearchParams(window.location.search);
  const bookingId = queryParams.get("bookingId");

  const { user } = useUser();
  const token = localStorage.getItem("token");
  const [payment, setPayment] = useState();
  const [booking, setBooking] = useState({});
  const [tour, setTour] = useState({});

  useEffect(() => {
    const fetchBookingTour = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/v1/booking/redis/${bookingId}`
        );
        setAmount(res.data.bookingDTO.totalAmount);
        setBooking(res.data.bookingDTO);
        setTour(res.data.tourDTO);
      } catch (error) {
        console.error("Error fetching booking data:", error);
      }
    };
    if (bookingId) {
      fetchBookingTour();
    }
  }, [bookingId]);

  console.log("Book: ", booking);

  const handlePaymentSuccess = async (details) => {
    console.log("Payment successful:", details);

    const paymentID = details.id; // ID giao dịch từ PayPal
    const payerID = details.payer.payer_id; // ID người thanh toán
    const transactionId = details.purchase_units[0].payments.captures[0].id; // Lấy Transaction ID từ response của PayPal

    console.log("paymentID: ", paymentID);
    console.log("payerID: ", payerID);
    console.log("Transaction ID: ", transactionId);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/payments/success",
        {
          paymentId: paymentID,
          payerId: payerID,
          bookingId: bookingId,
          discountId: null,
          amount: details.purchase_units[0].amount.value,
          transactionId: transactionId,
        }
      );
      setPayment(res.data);
      console.log("Payment and booking status updated successfully.");

      if (user) {
        await handleInteraction(tour.tourId, "BOOK", user, token);
      }
    } catch (error) {
      console.error("Error updating payment and booking status:", error);
    }
    setIsPaymentSuccess(true);
  };

  const handleCloseModal = () => {
    if (user) {
      navigate("/bookings");
      setIsPaymentSuccess(false);
    } else {
      navigate("/");
      setIsPaymentSuccess(false);
    }
  };

  const formatCurrency = (amount) => {
    return amount.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0, // không hiển thị số thập phân
      maximumFractionDigits: 0,
    });
  };

  const vndToUsdRate = 24000; // tỷ giá VND -> USD, ví dụ 1 USD = 24000 VND

  console.log("Tour: ", tour);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0"); // Lấy ngày và đảm bảo có 2 chữ số
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Lấy tháng (tháng 0 bắt đầu từ 0)
    const year = date.getFullYear(); // Lấy năm
    return `${day}/${month}/${year}`; // Trả về định dạng "dd/mm/yyyy"
  };

  return (
    <>
      <div className="w-full h-full flex flex-col">
        {/* Header Section */}
        <Header />
        <Menu />
        <div className="w-full bg-white py-8 shadow-lg rounded-lg">
          <div className="max-w-7xl mx-auto flex space-x-10">
            {/* Phần thông tin tour (Bên trái) */}
            <div className="flex-1 bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                Thông tin tour
              </h3>
              <div className="space-y-4">
                <p className="text-lg font-medium text-gray-700">
                  <span className="font-bold">Tour:</span> {tour.name}
                </p>
                <p className="text-lg text-gray-600">
                  <span className="font-bold">Ngày khởi hành:</span>{" "}
                  {formatDate(tour.departureDate ? tour.departureDate : "")}
                </p>
                <p className="text-lg text-gray-600">
                  <span className="font-bold">Điểm xuất phát:</span>{" "}
                  {tour.departureLocation}
                </p>
                <p className="text-lg text-gray-600">
                  <span className="font-bold">Điểm đến:</span>{" "}
                  {tour.destination}
                </p>
                <p className="text-lg text-gray-600">
                  <span className="font-bold">Giá tour:</span>{" "}
                  {formatCurrency(tour.price ? tour.price :0 )} 
                </p>
                <p className="text-lg text-gray-600">
                  <span className="font-bold">Thời gian:</span> {tour.day} ngày{" "}
                  {tour.night} đêm
                </p>
              </div>
            </div>

            {/* Phần thanh toán (Bên phải) */}
            <div className="flex-1">
              <div className="w-full max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
                  Thanh toán tour du lịch
                </h2>
                <p className="text-center text-xl text-gray-600 mb-4">
                  Số tiền cần thanh toán:{" "}
                  <span className="font-semibold text-green-500">
                    {formatCurrency(amount * vndToUsdRate)}
                  </span>
                </p>

                <div className="mt-6">
                  <PayPalButton
                    amount={amount.toFixed(2)}
                    onSuccess={(details, data) => {
                      handlePaymentSuccess(details);
                    }}
                  />
                </div>

                {/* Modal thanh toán thành công */}
                {isPaymentSuccess && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-8 text-center shadow-xl transform transition-all">
                      <h2 className="text-2xl font-semibold text-green-600">
                        Thanh toán thành công!
                      </h2>
                      <p className="mt-4 text-lg text-gray-600">
                        Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.
                      </p>
                      <p className="mt-6 text-sm text-gray-500">
                        Bạn sẽ được chuyển hướng đến trang đặt chỗ...
                      </p>

                      <button
                        onClick={handleCloseModal}
                        className="mt-6 px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none transition-all"
                      >
                        Đóng
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Payment Confirmation Section */}
        <div className="w-full bg-white py-6 mt-6">
          <div className="max-w-lg mx-auto text-center">
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              Xác nhận thanh toán
            </h3>
            <p className="text-gray-600">
              Sau khi thanh toán thành công, thông tin vé của bạn sẽ được cập
              nhật lên hệ thống. Hãy giữ lại thông tin vé để sử dụng khi cần.
            </p>
          </div>
        </div>
        <ChatBot />
        {/* Footer Section */}
        <Footer />
      </div>
    </>
  );
};

export default PaymentPage;
