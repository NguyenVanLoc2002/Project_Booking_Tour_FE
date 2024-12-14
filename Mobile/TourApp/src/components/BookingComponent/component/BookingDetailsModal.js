import React, { useState } from "react";
import { Modal, View, Text, StyleSheet, Button, ScrollView, Pressable } from "react-native";
import ModalCancelTour from "./ModalCancelTour";

const BookingDetailsModal = ({ isVisible, onClose, booking }) => {
  if (!booking || booking.length === 0) return null;

  const { bookingDTO, tourDTO } = booking;
  const loaiBooking = (loai) => {
    if (loai == "PENDING_CONFIRMATION")
      return "Chờ xác nhận"
    else if (loai == "CONFIRMED")
      return "Đã xác nhận"
    else if (loai == "PAID")
      return "Đã thanh toán"
    else if (loai == "REFUNDED")
      return "Đã hủy"
  };
  const vndToUsdRate = 24000;
  const formatCurrency = (amount) => {
    return amount.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0, // không hiển thị số thập phân
      maximumFractionDigits: 0,
    });
  };
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
  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={styles.overlay}>

        <View style={styles.modalContent}>
          <ScrollView>
            <Text style={styles.title}>{tourDTO.name}</Text>
            <View style={styles.infoGroup}>
              <Text style={styles.label}>Mã đơn đặt tour</Text>
              <Text style={styles.value}>{bookingDTO.bookingId}</Text>
            </View>
            <View style={styles.infoGroup}>
              <Text style={styles.label}>Địa chỉ của bạn:</Text>
              <Text style={styles.value}>{`${bookingDTO.address}, ${bookingDTO.ward}, ${bookingDTO.district}, ${bookingDTO.city}`}</Text>
            </View>
            <View style={styles.infoGroupRow}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Trạng thái:</Text>
                <Text style={styles.value}>{loaiBooking(bookingDTO.statusBooking)}</Text>
              </View>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Tổng tiền:</Text>
                <Text style={styles.value}>{formatCurrency(bookingDTO.totalAmount * vndToUsdRate)}</Text>
              </View>
            </View>

            <View style={styles.infoGroupRow}>
              <View style={styles.labelRow}>

                <Text style={styles.label}>Nơi khởi hành</Text>
                <Text style={styles.value}>{tourDTO.departureLocation}</Text>
              </View>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Nơi đến</Text>
                <Text style={styles.value}>{tourDTO.destination}</Text>
              </View>
            </View>
            {/* <View style={styles.infoGroup}>
              <Text style={styles.label}>Tổng số vé:</Text>
              <Text style={styles.value}>{bookingDTO.quantity} trong đó có {bookingDTO.adults} người lớn {bookingDTO.children !== 0 ? (" và " + bookingDTO.children + " trẻ em") : ("")}{bookingDTO.infants !== 0 ? (" và " + bookingDTO.infants + " trẻ nhỏ") : ("")}{bookingDTO.toddlers !== 0 ? (" và " + bookingDTO.toddlers + "  em bé") : ("")}</Text>
            </View> */}
            <View style={styles.infoGroup}>
              <Text style={styles.label}>Email liên hệ:</Text>
              <Text style={styles.value}>{bookingDTO.email}</Text>
            </View>
            <View style={styles.infoGroup}>
              <Text style={styles.label}>Ngày đặt vé:</Text>
              <Text style={styles.value}>{formatDate(bookingDTO.bookingDate)}</Text>
            </View>
          </ScrollView>

          <Button title="Close" onPress={onClose} />



        </View>
      </View>
    </Modal >
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    maxHeight: "80%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  infoGroup: {
    flexDirection: "col",
    marginBottom: 10,
  },
  infoGroupRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    width: "100%",
  },
  value: {
    width: "100%",
    color: "gray",
  },
  labelRow: {
    fontWeight: "bold",
    width: "50%",
  },

});

export default BookingDetailsModal;
