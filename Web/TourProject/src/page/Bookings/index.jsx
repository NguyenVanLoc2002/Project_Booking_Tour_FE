import { useEffect, useRef, useState } from "react";
import Header from "../../layouts/Header";
import Menu from "../../layouts/Menu";
import Footer from "../../layouts/Footer";
import DetailBooking from "./component/DetailBooking";
import ModalCancelTour from "./component/ModalCancelTour";
import { Button, Input, Space, Table, Tag } from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  SyncOutlined,
  EyeOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useUser } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import ChatBot from "../../layouts/ChatBot";


function Bookings() {
  const navigate = useNavigate();

  const [tabNameSelect, setTabNameSelect] = useState("ordered");
  const [textBookingId, setTextBookingId] = useState("");
  const [textMail, setTextMail] = useState("");
  const [tourData, setTourData] = useState({});
  const [pendingBookings, setPendingBookings] = useState([]); // Booking chờ xác nhận
  const [confirmedBookings, setConfirmedBookings] = useState([]); // Booking đã xác nhận
  const [paidBookings, setPaidBookings] = useState([]); // Booking đã thanh toán
  const [refundedBookings, setRefundedBookings] = useState([]); // Booking đã hủy

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalCancelVisible, setIsModalCancelVisible] = useState(false);
  const { user } = useUser();

  const vndToUsdRate = 24000; // tỷ giá VND -> USD, ví dụ 1 USD = 24000 VND

  const columns = [
    {
      title: "Mã đặt tour",
      dataIndex: ["bookingDTO", "bookingId"],
      key: "bookingId",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tên Tour",
      dataIndex: ["tourDTO", "name"],
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Ngày Khởi Hành",
      dataIndex: ["tourDTO", "departureDate"],
      key: "departureDate",
      render: (date) => formatDate(date),
    },
    {
      title: "Thời Gian",
      dataIndex: ["tourDTO", "day"],
      key: "day",
      render: (day, record) => `${day} ngày ${record.tourDTO.night} đêm`,
    },
    {
      title: "Giá",
      dataIndex: ["bookingDTO", "totalAmount"],
      key: "totalAmount",
      render: (totalAmount) => formatCurrency(totalAmount * vndToUsdRate),
    },
    {
      title: "Trạng thái",
      dataIndex: ["bookingDTO", "statusBooking"],
      key: "statusBooking",
      render: (status) => renderStatusTag(status),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => renderActionButtons(record),
    },
  ];

  const formatCurrency = (amount) =>
    amount.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    });

  const formatDate = (dateArray) =>
    dateArray ? `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}` : "";

  const renderStatusTag = (status) => {
    switch (status) {
      case "PENDING_CONFIRMATION":
        return (
          <Tag icon={<ClockCircleOutlined />} color="success">
            Đang chờ xác nhận
          </Tag>
        );
      case "CONFIRMED":
        return (
          <Tag icon={<SyncOutlined spin />} color="processing">
            Đã xác nhận
          </Tag>
        );
      case "REFUNDED":
        return (
          <Tag icon={<CloseCircleOutlined />} color="error">
            Đã hoàn tiền
          </Tag>
        );
      case "PAID":
        return (
          <Tag icon={<CheckCircleOutlined />} color="cyan">
            Hoàn thành
          </Tag>
        );
      default:
        return <Tag color="default">Không xác định</Tag>;
    }
  };

  const handlePayment = (record) =>{
    const bookingId = record.bookingDTO.bookingId;
    navigate(`/payment?bookingId=${bookingId}`);
  }

  const renderActionButtons = (record) => {
    const { statusBooking } = record.bookingDTO;
    console.log("record: ", record);
    
    if (statusBooking === "PENDING_CONFIRMATION") {
      // Chỉ có nút "Xem chi tiết" khi trạng thái là PENDING_CONFIRMATION
      return (
        <Button
          type="primary"
          icon={<EyeOutlined />}
          onClick={() => showModal(record)}
        >
          Xem chi tiết
        </Button>
      );
    }

    if (statusBooking === "CONFIRMED") {
      // Cả nút "Thanh toán" và "Xem chi tiết" khi trạng thái là CONFIRMED
      return (
        <div>
          <Button
            type="primary"
            icon={<DollarOutlined />}
            className="mr-2 bg-yellow-500 hover:bg-yellow-600 text-black border-yellow-500 hover:border-yellow-600"
            onClick={() => handlePayment(record)}
          >
            Thanh toán
          </Button>
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => showModal(record)}
          >
            Xem chi tiết
          </Button>
        </div>
      );
    }

    if (statusBooking === "PAID") {
      // Cả nút "Xem chi tiết" và "Hủy Tour" khi trạng thái là PAID
      return (
        <div>
          <Button
            className="mr-2"
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => showModal(record)}
          >
            Xem chi tiết
          </Button>
          <Button
            type="primary"
            icon={<DeleteOutlined />}
            danger
            onClick={() => showModalCancel(record)} // Xử lý hủy tour
          >
            Hủy Tour
          </Button>
        </div>
      );
    }

    // Trường hợp mặc định, chỉ có nút "Xem chi tiết"
    return (
      <Button
        type="primary"
        icon={<EyeOutlined />}
        onClick={() => showModal(record)}
      >
        Xem chi tiết
      </Button>
    );
  };

  const showModal = (record) => {
    setTourData(record);
    setIsModalVisible(true);
  };

  const handleClose = () => setIsModalVisible(false);

  const showModalCancel = (record) => {
    setTourData(record);
    setIsModalCancelVisible(true);
  };

  const handleCloseCancel = () => setIsModalCancelVisible(false);

  const token = localStorage.getItem("token");

  const getCustomerProcessingBookings = async (userId) => {
    try {
      const response = await axios.get(
        `https://travelvietnam.io.vn/api/v1/booking/redis/customer/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Phân loại bookings đang xử lý
      const pendingBookings = response.data.filter(
        (item) => item.bookingDTO.statusBooking === "PENDING_CONFIRMATION"
      );
      const confirmedBookings = response.data.filter(
        (item) => item.bookingDTO.statusBooking === "CONFIRMED"
      );

      // Lưu trữ các loại booking
      setPendingBookings(pendingBookings);
      setConfirmedBookings(confirmedBookings);
    } catch (error) {
      console.error("Error fetching customer processing bookings:", error);
    }
  };

  const getCustomerPaidAndCancelledBookings = async (userId) => {
    try {
      const response = await axios.get(
        `https://travelvietnam.io.vn/api/v1/booking?customerId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Phân loại bookings đã thanh toán và đã hủy
      const paidBookings = response.data.filter(
        (item) => item.bookingDTO.statusBooking === "PAID"
      );
      const refundedBookings = response.data.filter(
        (item) => item.bookingDTO.statusBooking === "REFUNDED"
      );

      // Lưu trữ các loại booking
      setPaidBookings(paidBookings);
      setRefundedBookings(refundedBookings);
    } catch (error) {
      console.error("Error fetching customer paid/cancelled bookings:", error);
    }
  };

  // Callback function to refresh data after refund
  const handleRefundSuccess = () => {
    if (user?.userId) {
      getCustomerProcessingBookings(user.userId);
      getCustomerPaidAndCancelledBookings(user.userId);
    }
  };

  useEffect(() => {
    if (user?.userId) {
      getCustomerProcessingBookings(user.userId);
      getCustomerPaidAndCancelledBookings(user.userId);
    }
  }, [user]);

  const tabs = {
    ordered: pendingBookings,
    processing: confirmedBookings,
    completed: paidBookings,
    canceled: refundedBookings,
  };

  // Log tất cả booking mỗi khi các biến cập nhật
  useEffect(() => {
    console.log("Pending Bookings:", pendingBookings);
    console.log("Confirmed Bookings:", confirmedBookings);
    console.log("Paid Bookings:", paidBookings);
    console.log("Refunded Bookings:", refundedBookings);
  }, [pendingBookings, confirmedBookings, paidBookings, refundedBookings]);

  return (
    <div className="w-full h-full flex flex-col">
      <Header />
      <Menu name="Bookings" />
      <div className="w-full mx-auto p-4 bg-white shadow-md">
        <div className="flex mb-8 text-base font-bold">
          {["ordered", "processing", "completed", "canceled"].map((tab) => (
            <button
              key={tab}
              className={`${
                tabNameSelect === tab
                  ? "text-textColorCustom border-l border-r border-t border-textColorCustom"
                  : "text-black border-b border-b-textColorCustom"
              } px-4 py-2`}
              onClick={() => setTabNameSelect(tab)}
            >
              {tab === "ordered"
                ? "Tour đã đặt"
                : tab === "processing"
                ? "Tour đang xử lý"
                : tab === "completed"
                ? "Tour đã hoàn thành"
                : "Tour đã hủy"}
            </button>
          ))}
        </div>
        <Table
          columns={columns}
          dataSource={tabs[tabNameSelect]}
          pagination={{ pageSize: 5 }}
        />
      </div>
      <DetailBooking
        visible={isModalVisible}
        onClose={handleClose}
        data={tourData}
      />
      <ModalCancelTour
        visible={isModalCancelVisible}
        onClose={handleCloseCancel}
        data={tourData}
        onRefundSuccess={handleRefundSuccess} 
      />
      <ChatBot />
      <Footer />
    </div>
  );
}

export default Bookings;
