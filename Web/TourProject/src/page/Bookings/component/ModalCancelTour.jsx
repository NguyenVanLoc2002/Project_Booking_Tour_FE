import { useEffect, useRef, useState } from "react";
import { Modal, Typography, Button, message } from "antd";
import panda from "../../../assets/iconTour/panda.png";
const { Text } = Typography;
import dayjs from "dayjs";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const ModalCancelTour = ({ visible, onClose, data, onRefundSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [percent, setPercent] = useState("");
  const [numDay, setNumDay] = useState("");
  // const [priceRefund, setPriceRefund] = useState('');

  // Hàm định dạng giá tiền
  const formatCurrency = (amount) => {
    return amount.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0, // không hiển thị số thập phân
      maximumFractionDigits: 0,
    });
  };

  const { tourDTO, bookingDTO } = data;
  console.log("tourDTO: ", tourDTO);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0"); // Lấy ngày và đảm bảo có 2 chữ số
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Lấy tháng (tháng 0 bắt đầu từ 0)
    const year = date.getFullYear(); // Lấy năm
    return `${day}/${month}/${year}`; // Trả về định dạng "dd/mm/yyyy"
  };

  useEffect(() => {
    if (!tourDTO?.departureDate) return;

    // Lấy ngày khởi hành từ tourDTO và chuyển sang kiểu ngày
    const departureDate = dayjs(tourDTO?.departureDate);
    const today = dayjs();

    // Tính số ngày còn lại đến ngày khởi hành
    const numDaysToDeparture = departureDate.diff(today, "day");

    setNumDay(numDaysToDeparture);

    // Kiểm tra ngày lễ (giả sử bạn có một hàm checkIfHoliday để kiểm tra)
    const isHoliday = checkIfHoliday(departureDate);

    let refundPercentage = 0;

    if (isHoliday) {
      // Tính phần trăm hoàn trả cho ngày lễ
      if (numDaysToDeparture > 10) {
        refundPercentage = 50; // 50% cho ngày lễ nếu còn hơn 10 ngày
      } else if (numDaysToDeparture >= 3) {
        refundPercentage = 25; // 25% cho ngày lễ nếu còn từ 3 đến 10 ngày
      } else {
        refundPercentage = 0; // 0% nếu còn ít hơn 3 ngày
      }
    } else {
      // Tính phần trăm hoàn trả cho ngày thường
      if (numDaysToDeparture > 10) {
        refundPercentage = 75; // 75% nếu còn hơn 10 ngày
      } else if (numDaysToDeparture >= 5) {
        refundPercentage = 50; // 50% nếu còn từ 5 đến 10 ngày
      } else if (numDaysToDeparture >= 2) {
        refundPercentage = 25; // 25% nếu còn từ 2 đến 4 ngày
      } else {
        refundPercentage = 0; // 0% nếu còn dưới 2 ngày
      }
    }

    // Cập nhật phần trăm hoàn trả
    setPercent(refundPercentage);
    setNumDay(numDaysToDeparture);
  }, [tourDTO, bookingDTO]);

  // Hàm kiểm tra ngày lễ (có thể cần điều chỉnh theo nhu cầu của bạn)
  const checkIfHoliday = (date) => {
    const holidays = [
      dayjs("2024-01-01"), // Tết Dương Lịch
      dayjs("2024-04-30"), // Ngày Giải Phóng Miền Nam
      dayjs("2024-05-01"), // Quốc Tế Lao Động
      dayjs("2024-09-02"), // Quốc Khánh Việt Nam
      dayjs("2024-12-25"), // Noel
      dayjs("2024-02-14"), // Valentine
    ];

    return holidays.some((holiday) => holiday.isSame(date, "day"));
  };

  const formatMoney = (data) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(data);
  };
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const token = localStorage.getItem("token");

  const refundBooking = async (bookingId) => {
    console.log("Token: ", token);

    try {
      setLoading(true);
      await axios.post(
        `https://travelvietnam.io.vn/api/v1/payments/process-refund?bookingId=${bookingId}`, // URL với tham số query
        {}, // Nếu có dữ liệu cần gửi, bạn có thể truyền vào đây (ở đây không cần dữ liệu trong body)
        {
          headers: {
            Authorization: `Bearer ${token}`, // Đảm bảo token được gửi trong headers
          },
        }
      );
      message.success("Hoàn tiền thành công!");
      onRefundSuccess();
      onClose();
    } catch (error) {
      message.error("Có lỗi xảy ra khi hoàn tiền.");
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const vndToUsdRate = 24000; // tỷ giá VND -> USD, ví dụ 1 USD = 24000 VND
  return (
    <>
      <Modal
        open={visible}
        onCancel={onClose}
        footer={[
          <Button key="back" onClick={onClose}>
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={() => refundBooking(bookingDTO?.bookingId)}
          >
            Xác nhận
          </Button>,
        ]}
        width={600}
      >
        <div className="flex items-center mt-4">
          <div className="border-t border-gray-400 flex-1"></div>
          <span className="mx-4 text-gray-600 text-lg font-bold">
            Xác nhận hủy tour
          </span>
          <div className="border-t border-gray-400 flex-1"></div>
        </div>
        <div className="pl-4 pt-6">
          <div className="pb-2">
            <Text className="font-bold text-red-500 text-base">Thông tin</Text>
          </div>
          <div className="flex">
            <div className="flex flex-col w-56 font-bold">
              <Text>Mã đặt tour:</Text>
              <Text>Tên tour:</Text>
              <Text>Ngày khởi hành:</Text>
              <Text>Giá tiền:</Text>
              <Text>Số ngày đến ngày khởi hành:</Text>
            </div>
            <div className="flex flex-col">
              <Text>{bookingDTO?.bookingId}</Text>
              <Text>{tourDTO?.name}</Text>
              <Text>{formatDate(tourDTO?.departureDate)}</Text>
              <Text>{formatMoney(bookingDTO?.totalAmount * vndToUsdRate)}</Text>
              <Text>{numDay}</Text>
            </div>
          </div>
          <div className="p-2">
            <div className="flex justify-center p-2">
              <Text className="font-bold text-center  text-lg">
                Bạn có chắc chắn muốn hủy tour trên không?
              </Text>
            </div>

            <Text>
              Nếu bạn hủy đơn đặt tour ngay bây giờ thì thì bạn sẽ được hoàn{" "}
            </Text>
            <Text strong>
              {formatMoney(
                (bookingDTO?.totalAmount * vndToUsdRate * percent) / 100
              )}{" "}
              ({percent}%){" "}
            </Text>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalCancelTour;
