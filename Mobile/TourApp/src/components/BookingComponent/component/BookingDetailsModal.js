import React, { useState } from "react";
import { Modal, View, Text, StyleSheet, Button, ScrollView, Pressable } from "react-native";
import ModalCancelTour from "./ModalCancelTour";

const BookingDetailsModal = ({ isVisible, onClose, booking }) => {
  if (!booking || booking.length === 0) return null;

  const { bookingDTO, tourDTO } = booking;

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={styles.overlay}>

        <View style={styles.modalContent}>
          <ScrollView>
            <Text style={styles.title}>Booking Details</Text>
            <View style={styles.infoGroup}>
              <Text style={styles.label}>Booking ID:</Text>
              <Text style={styles.value}>{bookingDTO.bookingId}</Text>
            </View>
            <View style={styles.infoGroup}>
              <Text style={styles.label}>Address:</Text>
              <Text style={styles.value}>{`${bookingDTO.address}, ${bookingDTO.ward}, ${bookingDTO.district}, ${bookingDTO.city}`}</Text>
            </View>
            <View style={styles.infoGroup}>
              <Text style={styles.label}>Status:</Text>
              <Text style={styles.value}>{bookingDTO.statusBooking}</Text>
            </View>
            <View style={styles.infoGroup}>
              <Text style={styles.label}>Total Amount:</Text>
              <Text style={styles.value}>{bookingDTO.totalAmount}</Text>
            </View>
            <View style={styles.infoGroup}>
              <Text style={styles.label}>Total Tickets:</Text>
              <Text style={styles.value}>{bookingDTO.quantity}</Text>
            </View>
            <View style={styles.infoGroup}>
              <Text style={styles.label}>Adults:</Text>
              <Text style={styles.value}>{bookingDTO.adults}</Text>
            </View>
            <View style={styles.infoGroup}>
              <Text style={styles.label}>Children:</Text>
              <Text style={styles.value}>{bookingDTO.children}</Text>
            </View>
            <View style={styles.infoGroup}>
              <Text style={styles.label}>Infants:</Text>
              <Text style={styles.value}>{bookingDTO.infants}</Text>
            </View>
            <View style={styles.infoGroup}>
              <Text style={styles.label}>Toddlers:</Text>
              <Text style={styles.value}>{bookingDTO.toddlers}</Text>
            </View>
            <View style={styles.infoGroup}>
              <Text style={styles.label}>Tour Name:</Text>
              <Text style={styles.value}>{tourDTO.name}</Text>
            </View>
            <View style={styles.infoGroup}>
              <Text style={styles.label}>Departure Location:</Text>
              <Text style={styles.value}>{tourDTO.departureLocation}</Text>
            </View>
            <View style={styles.infoGroup}>
              <Text style={styles.label}>Destination:</Text>
              <Text style={styles.value}>{tourDTO.destination}</Text>
            </View>
            <View style={styles.infoGroup}>
              <Text style={styles.label}>Phone:</Text>
              <Text style={styles.value}>{bookingDTO.phoneNumber}</Text>
            </View>
            <View style={styles.infoGroup}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>{bookingDTO.email}</Text>
            </View>
            <View style={styles.infoGroup}>
              <Text style={styles.label}>Booking Date:</Text>
              <Text style={styles.value}>{new Date(bookingDTO.bookingDate[0]).toLocaleDateString()}</Text>
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
    flexDirection: "row",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    width: "40%",
  },
  value: {
    width: "60%",
    color: "gray",
  },
});

export default BookingDetailsModal;
