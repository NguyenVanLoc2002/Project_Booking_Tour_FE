import { useEffect, useState } from "react";
// import { Modal, Typography, Button, message } from "antd";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import dayjs from "dayjs";
import axiosInstance from "../../../api/axiosInstance";
import Toast from "react-native-toast-message";

// const { Text } = Typography;

const ModalCancelTour = ({ visible, onClose, booking }) => {
  if (!booking || booking.length === 0) return null;
  const { bookingDTO, tourDTO } = booking;

  const [loading, setLoading] = useState(false);
  const [percent, setPercent] = useState(0);
  const [numDay, setNumDay] = useState("");
  // Hàm định dạng giá tiền
  // const formatCurrency = (amount) => {
  //   return amount.toLocaleString("vi-VN", {
  //     style: "currency",
  //     currency: "VND",
  //   });
  // };

  const formatDate = (inputDate) => {
    let date;

    // Kiểm tra loại dữ liệu của inputDate
    if (Array.isArray(inputDate)) {
      // Nếu inputDate là mảng [year, month, day]
      const [year, month, day] = inputDate;
      date = new Date(year, month - 1, day); // Lưu ý: Tháng trong Date() bắt đầu từ 0
    } else if (typeof inputDate === 'string') {
      // Nếu inputDate là chuỗi "YYYY-MM-DD"
      date = new Date(inputDate);
    } else {
      throw new Error('Invalid date format'); // Xử lý trường hợp không hợp lệ
    }

    // Định dạng ngày thành dd/MM/yyyy
    const day = String(date.getDate()).padStart(2, '0'); // Đảm bảo 2 chữ số
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng +1
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    console.log('choi oi', booking)
    if (!tourDTO?.departureDate) return;
    let departureDate;
    if (Array.isArray(tourDTO?.departureDate)) {
      // Nếu tourDTO?.departureDate là mảng [year, month, day]
      const [year, month, day] = tourDTO?.departureDate;
      departureDate = new Date(year, month - 1, day); // Lưu ý: Tháng trong Date() bắt đầu từ 0

    } else if (typeof tourDTO?.departureDate === 'string') {
      // Nếu tourDTO?.departureDate là chuỗi "YYYY-MM-DD"
      departureDate = new Date(tourDTO?.departureDate);
    }
    const today = new Date();
    const diffTime = Math.abs(today - departureDate);
    // Chuyển đổi sang số ngày
    const numDaysToDeparture = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // const numDaysToDeparture = departureDate.diff(today, "day");
    console.log(numDaysToDeparture)
    console.log(departureDate)
    setNumDay(numDaysToDeparture);

    const isHoliday = checkIfHoliday(departureDate);

    let refundPercentage = 0;

    if (isHoliday) {
      if (numDaysToDeparture > 10) {
        refundPercentage = 50;
      } else if (numDaysToDeparture >= 3) {
        refundPercentage = 25;
      } else {
        refundPercentage = 0;
      }
    } else {
      if (numDaysToDeparture > 10) {
        refundPercentage = 75;
      } else if (numDaysToDeparture >= 5) {
        refundPercentage = 50;
      } else if (numDaysToDeparture >= 2) {
        refundPercentage = 25;
      } else {
        refundPercentage = 0;
      }
    }

    setPercent(refundPercentage);
  }, [tourDTO]);

  const checkIfHoliday = (date) => {
    const holidays = [
      dayjs("2024-01-01"),
      dayjs("2024-04-30"),
      dayjs("2024-05-01"),
      dayjs("2024-09-02"),
      dayjs("2024-12-25"),
    ];

    return holidays.some((holiday) => holiday.isSame(date, "day"));
  };

  const vndToUsdRate = 24000; 
  const refundBooking = async (bookingId) => {
    try {
      setLoading(true);
      await axiosInstance.post(
        `/payments/process-refund?bookingId=${bookingId}`
        // `https://travelvietnam.io.vn/api/v1/payments/process-refund?bookingId=${bookingId}`,
      );
      Toast.show({
        type: "success",
        text1: "Hoàn tiền thành công",
        position: "bottom",
        visibilityTime: 4000,
        autoHide: true,
      });
      onClose();
    } catch (error) {
      console.log(error.response?.data?.message )
      // message.error("Có lỗi xảy ra khi hoàn tiền.");
      Toast.show({
        type: "error",
        text1: "Hoàn tiền không thành công",
        text2: error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại.",
        position: "bottom",
        visibilityTime: 4000,
        autoHide: true,
      });
    } finally {
      setLoading(false);
    }
  };
  const formatMoney = (data) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(data);
  };
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Xác nhận hủy tour</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeText}>×</Text>
            </TouchableOpacity>
          </View>

          {/* Body */}
          <View style={styles.body}>
            <View style={styles.divider}>
              <View style={styles.line}></View>
              <Text style={styles.dividerText}>Xác nhận hủy tour</Text>
              <View style={styles.line}></View>
            </View>
            <Text style={styles.sectionTitle}>Thông tin</Text>
            <View style={styles.infoRow}>
              <View style={styles.infoLabel}>
                <Text>Mã đặt tour:</Text>
                <Text>Tên tour:</Text>
                <Text>Ngày khởi hành:</Text>
                <Text>Giá tiền:</Text>
                <Text>Số ngày còn lại:</Text>
              </View>
              <View>
                <Text>{bookingDTO?.bookingId}</Text>
                <Text>{tourDTO?.name}</Text>
                <Text>{formatDate(tourDTO?.departureDate)}</Text>
                <Text>{formatMoney(bookingDTO?.totalAmount*vndToUsdRate)}</Text>
                <Text>{numDay} ngày</Text>
              </View>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoLabel}>
                <Text>Trạng thái:</Text>
                <Text>Phần trăm hoàn trả:</Text>
                <Text>Số tiền hoàn trả:</Text>
              </View>
              <View>
                <Text>{bookingDTO?.statusBooking}</Text>
                <Text>{percent}%</Text>
                <Text>{formatMoney((bookingDTO?.totalAmount * percent/100)*vndToUsdRate)}</Text>
              </View>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.confirmButton,
                loading ? styles.disabledButton : null,
              ]}
              onPress={() => refundBooking(bookingDTO?.bookingId)}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.confirmText}>Xác nhận</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
    // <Modal
    //   open={visible}
    //   onCancel={onClose}
    //   footer={[
    //     <Button key="back" onClick={onClose}>
    //       Hủy
    //     </Button>,
    //     <Button
    //       key="submit"
    //       type="primary"
    //       loading={loading}
    //       onClick={() => refundBooking(bookingDTO?.bookingId)}
    //     >
    //       Xác nhận
    //     </Button>,
    //   ]}
    //   width={600}
    // >
    //   <div className="flex items-center mt-4">
    //     <div className="border-t border-gray-400 flex-1"></div>
    //     <span className="mx-4 text-gray-600 text-lg font-bold">
    //       Xác nhận hủy tour
    //     </span>
    //     <div className="border-t border-gray-400 flex-1"></div>
    //   </div>
    //   <div className="pl-4 pt-6">
    //     <div className="pb-2">
    //       <Text className="font-bold text-red-500 text-base">Thông tin</Text>
    //     </div>
    //     <div className="flex">
    //       <div className="flex flex-col w-56 font-bold">
    //         <Text>Mã đặt tour:</Text>
    //         <Text>Tên tour:</Text>
    //         <Text>Ngày khởi hành:</Text>
    //         <Text>Giá tiền:</Text>
    //         <Text>Số ngày còn lại:</Text>
    //       </div>
    //       <div className="flex flex-col">
    //         <Text>{bookingDTO?.bookingId}</Text>
    //         <Text>{tourDTO?.name}</Text>
    //         <Text>{formatDate(tourDTO?.departureDate)}</Text>
    //         <Text>{bookingDTO?.totalAmount} USD</Text>
    //         <Text>{numDay} ngày</Text>
    //       </div>
    //     </div>
    //     <div className="flex mt-4">
    //       <div className="flex flex-col w-56 font-bold">
    //         <Text>Trạng thái:</Text>
    //         <Text>Phần trăm hoàn trả:</Text>
    //         <Text>Số tiền hoàn trả:</Text>
    //       </div>
    //       <div className="flex flex-col">
    //         <Text>{bookingDTO?.statusBooking}</Text>
    //         <Text>{percent}%</Text>
    //         <Text>
    //           {(bookingDTO?.totalAmount * percent)}USD
    //         </Text>
    //       </div>
    //     </div>
    //   </div>
    // </Modal>
    // <div style={styles.overlay}>
    //   <div style={styles.content}>
    //     <div style={styles.header}>
    //       <span style={styles.title}>Xác nhận hủy tour</span>
    //       <button style={styles.close} onClick={onClose}>&times;</button>
    //     </div>
    //     <div style={styles.body}>
    //       <div style={styles.divider}>
    //         <div style={styles.line}></div>
    //         <span style={styles.dividerText}>Xác nhận hủy tour</span>
    //         <div style={styles.line}></div>
    //       </div>
    //       <div>
    //         <p style={styles.sectionTitle}>Thông tin</p>
    //         <div style={styles.infoRow}>
    //           <div style={styles.infoLabel}>
    //             <p>Mã đặt tour:</p>
    //             <p>Tên tour:</p>
    //             <p>Ngày khởi hành:</p>
    //             <p>Giá tiền:</p>
    //             <p>Số ngày còn lại:</p>
    //           </div>
    //           <div>
    //             <p>{bookingDTO?.bookingId}</p>
    //             <p>{tourDTO?.name}</p>
    //             <p>{tourDTO?.departureDate}</p>
    //             <p>{bookingDTO?.totalAmount} USD</p>
    //             <p>{numDay} ngày</p>
    //           </div>
    //         </div>
    //         <div style={styles.infoRow}>
    //           <div style={styles.infoLabel}>
    //             <p>Trạng thái:</p>
    //             <p>Phần trăm hoàn trả:</p>
    //             <p>Số tiền hoàn trả:</p>
    //           </div>
    //           <div>
    //             <p>{bookingDTO?.statusBooking}</p>
    //             <p>{percent}%</p>
    //             <p>{(bookingDTO?.totalAmount * percent).toFixed(2)} USD</p>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div style={styles.footer}>
    //       <button style={{ ...styles.button, ...styles.cancelButton }} onClick={onClose}>
    //         Hủy
    //       </button>
    //       <button
    //         style={{
    //           ...styles.button,
    //           ...styles.confirmButton,
    //           ...(loading && styles.disabledButton),
    //         }}
    //         onClick={() => refundBooking(bookingDTO?.bookingId)}
    //         disabled={loading}
    //       >
    //         {loading ? "Đang xử lý..." : "Xác nhận"}
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
};
const styles = {
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    width: "90%",
    borderRadius: 10,
    overflow: "hidden",
  },
  header: {
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 8,
  },
  closeText: {
    fontSize: 20,
    color: "#333",
  },
  body: {
    padding: 16,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ddd",
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: "#555",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#d9534f",
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  infoLabel: {
    width: 120,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  cancelButton: {
    padding: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 4,
    marginRight: 8,
  },
  cancelText: {
    color: "#333",
  },
  confirmButton: {
    padding: 8,
    backgroundColor: "#007bff",
    borderRadius: 4,
  },
  confirmText: {
    color: "white",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
};

export default ModalCancelTour;
