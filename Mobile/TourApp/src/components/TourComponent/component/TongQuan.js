import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Pressable, Image, ScrollView, TouchableOpacity,Dimensions } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import axiosInstance from "../../../api/axiosInstance";
import dayjs from 'dayjs';


const TongQuan = ({ navigation, route }) => {
    const { tour } = route.params;
    const [experience, setExperience] = useState();
    const [detailsTicket, setDetailTicket] = useState(false);
    const [ticket, setTicket] = useState();
    // Hàm để xử lý việc ẩn hoặc hiện phần chi tiết của một ngày cụ thể
    const [tickets, setTickets] = useState([]);
    const [itineraries, setItineraries] = useState([]);
    useEffect(() => {
        const fetchItineraries = async () => {
            if (tour) {
                try {
                    const res = await axiosInstance.get(
                        `/itineraries/by-tour`,
                        {
                            params: { tourId: tour.tourId },
                        }
                    );
                    const data = res.data;
                    setItineraries(data);

                } catch (error) {
                    console.error("Error fetching itinerary data:", error);
                }
            }
        };

        fetchItineraries();
        const fetchTickets = async () => {
            if (tour) {
                try {
                    const response = await axiosInstance.get(
                        `/tour-tickets/by-tour/${tour.tourId}`
                    );
                    const data = response.data;
                    console.log(data)
                    setTickets(data);
                } catch (error) {
                    console.error("Error fetching Ticket Tour data:", error);
                }
            }
        };
        fetchTickets();
    }, [tour]);

    useEffect(() => {

        // Kiểm tra xem itineraries có tồn tại và không rỗng
        if (itineraries.length > 0) {
            let data = ""
            itineraries.forEach((it) => {
                data = data + "\n" + it.description;
            });
            setExperience(data);
        }

    }, [itineraries]);
    const formatDate = (dateString) => {
        const formattedDay = dateString[2].toString().padStart(2, "0");
        const formattedMonth = dateString[1].toString().padStart(2, "0");
        return `${formattedDay}/${formattedMonth}/${dateString[0]}`;
    };
    const getAccommodationQuality = (accommodation) => {
        let temp;
        if (accommodation === "FIVE_STAR_HOTEL") {
            temp = 'Khách sạn 5 sao'
        } else if (accommodation === "FOUR_STAR_HOTEL") {
            temp = 'Khách sạn 4 sao'
        } else if (accommodation === "THREE_STAR_HOTEL") {
            temp = 'Khách sạn 3 sao'
        }
        else if (accommodation === "HOMESTAY") {
            temp = 'Homestay'
        } else if (accommodation === "RESORT") {
            temp = 'Resort'
        }
        return temp;
    };
    // Hàm định dạng giá tiền
    const formatCurrency = (amount) => {
        return amount.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
            minimumFractionDigits: 0, // không hiển thị số thập phân
            maximumFractionDigits: 0,
        });
    };

    //Navigate booking
    const handleChooseTicket = (ticket_tour) => {
       navigation.navigate("DatTour", { tour: tour, ticket_tour: ticket_tour });
        // Chuyển hướng sang trang /booking và truyền dữ liệu ticket_tour
        // navigate("/booking", { state: { ticket: ticket_tour, tour: tour } });
        console.log(tour);
        console.log(ticket_tour);
    };
    return (
        <ScrollView style={styles.container}>
            <View style={styles.detailBox}>
                <View style={styles.row}><AntDesign name="calendar" size={20} color="black" /><Text style={{ fontSize: 14, paddingLeft: 10 }}>Khởi hành: {formatDate(tour.departureDate)}</Text></View>
                <View style={styles.row}><AntDesign name="clockcircleo" size={20} color="black" /><Text style={{ fontSize: 14, paddingLeft: 10 }}>Thời gian: {tour.day} ngày {tour.night} đêm</Text></View>
                <View style={styles.row}><AntDesign name="team" size={20} color="black" /><Text style={{ fontSize: 14, paddingLeft: 10 }}>Số chổ còn nhận: {tour.availableSlot > 0 ? tour?.availableSlot : "Hết chỗ"}</Text></View>
                <View style={styles.row}><FontAwesome6 name="location-dot" size={20} color="black" /><Text style={{ fontSize: 14, paddingLeft: 10 }}>Nơi khởi hành: {tour?.departureLocation}</Text></View>
            </View>
            {detailsTicket && (
                <View style={styles.modalOverlay}>
                    {/* Modal Content */}
                    <View style={styles.modalContent}>
                        {/* Close Button */}
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setDetailTicket(false)}
                        >
                            <Text style={styles.closeButtonText}>✕</Text>
                        </TouchableOpacity>

                        {/* Modal Body */}
                        <Text style={styles.modalTitle}>Thông tin chuyến bay</Text>

                        <View style={styles.gridContainer}>
                            <View style={styles.infoBox}>
                                <Text style={styles.infoLabel}>
                                    <Text style={styles.boldText}>NGÀY ĐI</Text>
                                </Text>
                                <Text style={styles.infoText}>
                                    <Text style={styles.blueText}>06:00</Text> ngày {formatDate(ticket?.departureDate)}
                                </Text>
                                <Text style={styles.infoText}>
                                    <Text style={styles.blueText}>09:30</Text> ngày {formatDate(ticket?.departureDate)}
                                </Text>
                                <Text style={styles.infoText}>
                                    Chuyến bay:{" "}
                                    <Text style={styles.cyanText}>VN600</Text>
                                </Text>
                            </View>

                            <View style={styles.infoBox}>
                                <Text style={styles.infoLabel}>
                                    <Text style={styles.boldText}>NGÀY VỀ</Text>
                                </Text>
                                <Text style={styles.infoText}>
                                    <Text style={styles.blueText}>19:00</Text> ngày 15/09/2024
                                </Text>
                                <Text style={styles.infoText}>
                                    <Text style={styles.blueText}>22:30</Text> ngày 15/09/2024
                                </Text>
                                <Text style={styles.infoText}>
                                    Chuyến bay:{" "}
                                    <Text style={styles.cyanText}>VN601</Text>
                                </Text>
                            </View>
                        </View>

                        <Text style={styles.note}>
                            Chú ý: Vé máy bay không hoàn, không đổi, không hủy, sai tên mất 100%
                        </Text>

                        {/* Additional Sections */}
                        <View style={styles.sectionContainer}>
                            {/* Thông tin tập trung */}
                            <View style={styles.infoSection}>
                                <Text style={styles.sectionTitle}>Thông tin tập trung</Text>
                                <Text style={styles.sectionText}>
                                    <Text style={styles.boldText}>Ngày tập trung:</Text>{formatDate(ticket?.departureDate)}
                                </Text>
                                <Text style={styles.sectionText}>
                                    <Text style={styles.boldText}>Nơi tập trung:</Text>{ticket?.departureLocation}
                                </Text>
                            </View>

                            {/* Thông tin hướng dẫn viên */}
                            <View style={styles.infoSection}>
                                <Text style={styles.sectionTitle}>Thông tin hướng dẫn viên</Text>
                                <Text style={styles.sectionText}>
                                    <Text style={styles.boldText}>HDV dẫn đoàn:</Text> Đang cập nhật
                                </Text>
                                <Text style={styles.sectionText}>
                                    <Text style={styles.boldText}>HDV tiễn:</Text> Đang cập nhật
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            )}
            <View style={styles.detailBox}>
                <View style={styles.rowBetween}>
                    <View style={styles.row50}>
                        <FontAwesome6 name="map-location-dot" size={16} color="black" />
                        <View style={styles.column}>
                            <Text style={{ fontSize: 13, paddingLeft: 10 }}>Điểm tham quan</Text><Text style={{ fontSize: 12, fontStyle: "italic" }}> {tour?.diemThamQuan}</Text></View></View>
                    <View style={styles.row50}>
                        <FontAwesome6 name="hotel" size={16} color="black" />
                        <Text style={{ fontSize: 13, paddingLeft: 10 }}>{getAccommodationQuality(tour?.tourFeatureDTO?.accommodationQuality)}</Text>
                    </View>
                </View>
                <View style={styles.rowBetween}>
                    <View style={styles.row50}><Ionicons name="fast-food-sharp" size={16} color="black" />
                        <View style={styles.column}>
                            <Text style={{ fontSize: 13, paddingLeft: 10 }}>Ẩm thực</Text><Text style={{ fontSize: 12, fontStyle: "italic" }}> {tour?.amThuc}</Text>
                        </View>
                    </View>
                    <View style={styles.row50}>
                        {tour.tourFeatureDTO.transportationMode.includes("AIRPLANE") && (
                            <FontAwesome6 name="plane" size={16} color="black" />
                        )}
                        {tour.tourFeatureDTO.transportationMode.includes("BUS") && (
                            <FontAwesome6 name="bus-simple" size={16} color="black" />
                        )}
                        {tour.tourFeatureDTO.transportationMode.includes("TRAIN") && (
                            <FontAwesome6 name="train" size={16} color="black" />
                        )}
                        {tour.tourFeatureDTO.transportationMode.includes("PRIVATE_CAR") && (
                            <FontAwesome6 name="car" size={16} color="black" />
                        )}
                        <View style={styles.column}>
                            <Text style={{ fontSize: 13, paddingLeft: 10 }}>Phương tiện di chuyển</Text><Text style={{ fontSize: 12, fontStyle: "italic" }}> {tour?.phuongTien}</Text>
                        </View>
                    </View>
                </View>

            </View>
            <View style={styles.banner}>
                <Text style={styles.tieuDe}>Những địa điểm tham quan</Text>
                <ScrollView horizontal style={styles.bannerContainer}
                >
                    {tour?.urlImage?.map((image, index) => (
                        <Pressable key={index} style={styles.bannerRow}>

                            <Image
                                source={{
                                    uri: image
                                }}
                                style={styles.bannerAvt}
                                resizeMode="cover"
                            />
                        </Pressable>
                    ))}
                </ScrollView>
            </View>
            <View style={styles.detailBoxBorder}>
                <Text style={[styles.tieuDe, { borderColor: "#3FD0D4", borderBottomWidth: 1, paddingBottom: 10 }]}>Bạn sẽ trải nghiệm</Text>
                <Text style={{ fontSize: 14, paddingLeft: 10, paddingTop: 20 }}>{experience}</Text>
            </View>
            <View style={styles.detailBoxBorder}>
                <Text style={[styles.tieuDe, { borderColor: "#3FD0D4", borderBottomWidth: 1, paddingBottom: 10 }]}>Vé trống cho bạn</Text>
                {tickets.map((ticket_tour) => (
                    <View
                        style={styles.boxTicket}
                        key={ticket_tour.ticketId}
                    >
                        <View>
                            <Text style={{ fontWeight: 500, paddingBottom: 5, fontSize: 14 }}>Tour ghép - Khởi hành từ {ticket_tour?.departureLocation}</Text>
                            <View style={{ display: 'flex', flexDirection: "row" }}>

                                <AntDesign name="calendar" size={16} color="black" />
                                <Text style={{ fontSize: 12, paddingLeft: 4 }}>Ngày khởi hành: {formatDate(ticket_tour?.departureDate)}</Text>
                            </View>
                            <View style={{ display: 'flex', flexDirection: "row" }}>
                                <AntDesign name="team" size={16} color="black" />
                                <Text style={{ fontSize: 12, paddingLeft: 4 }}>Số chỗ:{ticket_tour.availableSlot > 0 ? `Còn ${ticket_tour.availableSlot} chỗ trống` : "Hết chỗ"}</Text>
                            </View>
                            <Pressable onPress={() =>{ setDetailTicket(true);
                                setTicket(ticket_tour);
                            }}
                            >
                                <Text style={{ color: "#3FD0D4", paddingLeft: 4 }}>Xem chi tiết</Text>
                            </Pressable>
                        </View>
                        <View >
                            <Text style={{ color: 'red', fontSize: 14, fontWeight: 500 }}>{formatCurrency(tour.price)}</Text>
                            <Pressable
                                style={styles.buttonHoanThanh}
                                onPress={() => handleChooseTicket(ticket_tour)}
                            ><Text style={styles.textDat}>Chọn vé</Text>
                            </Pressable>
                        </View>
                    </View>
                ))}
            </View>
        
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F2F2F2"
    },
    row: {
        display: 'flex',
        flexDirection: "row",
    },
    row50: {
        display: 'flex',
        flexDirection: "row",
        width: "48%",
        paddingTop: 5
    },
    rowBetween: {
        display: 'flex',
        flexDirection: "row",
        // justifyContent: "space-evenly"
    },
    column: {
        display: 'flex',
        flexDirection: "col",
        width: "90%",
    },
    detailBox: {
        width: "90%",
        marginLeft: "5%",
        backgroundColor: "#fff",
        borderRadius: 20,
        paddingTop: 15,
        paddingLeft: 15,
        paddingBottom: 15,
        marginTop: 20,
    },
    detailBoxBorder: {
        width: "90%",
        marginLeft: "5%",
        backgroundColor: "#fff",
        borderRadius: 20,
        paddingTop: 15,
        paddingBottom: 15,
        marginTop: 20,
        borderColor: "#3FD0D4",
        borderWidth: 1
    },
    bannerContainer: {
        margin: 10
    },
    bannerRow: {
        borderRadius: 10,
        height: 156,
        width: 150,
    },

    bannerAvt: {
        height: 150,
        margin: 3,
        alignItems: "center",
        // backgroundColor: "black",
        borderRadius: 15
    },
    banner: {
        marginTop: 20
    },
    tieuDe: {
        fontSize: 18,
        fontWeight: "500",
        textAlign: "center",
    },
    //boxTicket className="flex justify-between items-center border p-4 rounded"
    boxTicket: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        padding: 4,
        borderRadius: 10,
        borderColor: '#cecece',
        margin: 5
    },
    buttonHoanThanh: {
        height: 30,
        backgroundColor: "#3FD0D4",
        justifyContent: "center",
        width: 80,
        alignItems: "center",
        borderRadius: 10,
        marginTop: 5,
        fontWeight: 500,
    },
    textDat: {
        textAlign: "center",
        fontSize: 13,
        fontWeight: "500",
        color: "white"

    },
    modalOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      },
      modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        width: "80%",
        maxWidth: 400,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
    closeButton: {
        position: "absolute",
        top: 10,
        right: 10,
    },
    closeButtonText: {
        fontSize: 20,
        color: "#555",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    gridContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    infoBox: {
        flex: 1,
        backgroundColor: "#D9D9D9",
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 5,
    },
    infoLabel: {
        color: "#555",
        marginBottom: 5,
    },
    boldText: {
        fontWeight: "bold",
    },
    infoText: {
        color: "#333",
        marginBottom: 5,
    },
    blueText: {
        color: "#007BFF",
    },
    cyanText: {
        color: "#00BCD4",
    },
    note: {
        color: "#555",
        fontSize: 14,
        marginTop: 10,
        textAlign: "center",
    },
    sectionContainer: {
        marginTop: 20,
    },
    infoSection: {
        backgroundColor: "#F5F5F5",
        padding: 15,
        borderRadius: 5,
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#00BCD4",
        marginBottom: 10,
    },
    sectionText: {
        color: "#333",
        marginBottom: 5,
    },
})
export default TongQuan;