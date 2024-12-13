import React, { useEffect, useRef, useState } from "react";
import { View, Text, ImageBackground, Pressable, StyleSheet, TextInput, Image, ScrollView, TouchableOpacity, Modal } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import TourTabbar from "./component/TourTabbar";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Picker } from '@react-native-picker/picker';
import Feather from '@expo/vector-icons/Feather';
import axiosInstance from "./../../api/axiosInstance";
import dayjs from 'dayjs';
import { useAuthContext } from "../../contexts/AuthContext";

const data = require('./../../../assets/json/dataProvinces.json');
const DatTour = ({ navigation, route }) => {
    const { authUser } = useAuthContext();
    const { tour, ticket_tour } = route.params
    const [modalMessage, setModalMessage] = useState(""); // Message to show in modal
    const [isModalOpen, setIsModalOpen] = useState(false); // To control modal visibility

    const [name, setName] = useState(authUser?.name || "");
    const [phone, setPhone] = useState(authUser?.phoneNumber || "");
    const [email, setEmail] = useState(authUser?.email || "");
    const [address, setAddress] = useState(authUser?.address || "");

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [selectedProvince, setSelectedProvince] = useState("01");
    const [selectedDistrict, setSelectedDistrict] = useState("001");
    const [selectedWard, setSelectedWard] = useState("00001");
    const [selectedProvinceLabel, setSelectedProvinceLabel] = useState("");
    const [selectedDistrictLabel, setSelectedDistrictLabel] = useState("");
    const [selectedWardLabel, setSelectedWardLabel] = useState("");
    const [addressParts, setAddressParts] = useState(authUser?.address ? authUser?.address.split(" ,") : '');

    useEffect(() => {
        // Chuyển đổi dữ liệu tỉnh thành mảng phù hợp cho Picker
        const provinceData = data.map((province) => ({
            label: province.Name,
            value: province.Code,
        }));
        setProvinces(provinceData);
        console.log(addressParts)
        if (addressParts) {
            setSelectedProvince(provinceData.find((ward) => ward.label === addressParts[3])?.value)
            setAddress(addressParts[0]);
            setSelectedDistrictLabel(addressParts[2]);
            setSelectedWardLabel(addressParts[1]);
        }
    }, [addressParts]);

    useEffect(() => {
        if (selectedProvince) {
            // Lọc các quận của tỉnh được chọn
            const selectedProvinceData = data.find((province) => province.Code === selectedProvince);
            const districtData = selectedProvinceData.District.map((district) => ({
                label: district.Name,
                value: district.Code,
            }));
            setDistricts(districtData);
            if (selectedDistrictLabel) {
                setSelectedDistrict(districtData.find((ward) => ward.label === selectedDistrictLabel)?.value)
                setSelectedDistrictLabel('');
            } else {
                setSelectedDistrict(districtData[1].value)
            }

            setWards([])
        } else {
            setDistricts([]);
        }
    }, [selectedProvince]);

    useEffect(() => {
        if (selectedDistrict) {
            // Lọc các phường của quận được chọn
            const selectedDistrictData = data
                .find((province) => province.Code === selectedProvince)
                .District.find((district) => district.Code === selectedDistrict);
            if (selectedDistrictData) {
                const wardData = selectedDistrictData.Ward.map((ward) => ({
                    label: ward.Name,
                    value: ward.Code,
                }));
                setWards(wardData);
                if (selectedWardLabel) {
                    setSelectedWard(wardData.find((ward) => ward.label === selectedWardLabel)?.value);
                    setSelectedWardLabel('')
                } else {
                    setSelectedWard(wardData[1].value)
                }

            }
        } else {
            setWards([]);
        }
    }, [selectedDistrict]);

    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [toddlers, setToddlers] = useState(0);
    const [infants, setInfants] = useState(0);
    const [total, setTotal] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const vndToUsdRate = 24000; // tỷ giá VND -> USD, ví dụ 1 USD = 24000 VND

    const ascAdults = () => setAdults((prev) => prev + 1);
    const descAdults = () => setAdults((prev) => (prev > 1 ? prev - 1 : 1));
    const ascChildren = () => setChildren((prev) => prev + 1);
    const descChildren = () => setChildren((prev) => (prev > 0 ? prev - 1 : 0));
    const ascToddlers = () => setToddlers((prev) => prev + 1);
    const descToddlers = () => setToddlers((prev) => (prev > 0 ? prev - 1 : 0));
    const ascInfants = () => setInfants((prev) => prev + 1);
    const descInfants = () => setInfants((prev) => (prev > 0 ? prev - 1 : 0));

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
    function addDays(dateString, daysToAdd) {
        let date = dayjs(`${dateString[0]}-${dateString[1]}-${dateString[2]}`);
        let newDate = date.add(daysToAdd, 'day');
        let resultArray = [newDate.year(), newDate.month() + 1, newDate.date()];
        return resultArray;

    }


    const handleBookTour = async () => {
        // Check if any of the required fields are empty
        if (!name || !phone || !email || !address) {
            setModalMessage("Vui lòng điền đầy đủ thông tin trước khi tiếp tục.");
            setIsModalOpen(true); // Open modal to inform user
            return; // Exit the function early if any field is missing
        }

        try {
            const bookingData = {
                tourId: tour.tourId,
                ticketId: ticket_tour.ticketId,
                quantity: quantity,
                adults: adults,
                children: children,
                toddlers: toddlers,
                infants: infants,
                totalAmount: total / vndToUsdRate,
                customerId: authUser?.userId || null,
                email: email,
                userName: name,
                phoneNumber: phone,
                city: provinces.find((ward) => ward.value === selectedProvince)?.label,
                district: districts.find((ward) => ward.value === selectedDistrict)?.label,
                ward: wards.find((ward) => ward.value === selectedWard)?.label,
                address: address,
            };
            console.log(bookingData);
            console.log(adults)
            // Assuming `bookTour` is an async function that makes the API call
            const response = await bookTour(bookingData);
            console.log("API Response:", response);

            // If booking data is valid, show success modal
            setModalMessage(
                "Đặt tour thành công. Vui lòng kiểm tra email để xác nhận thông tin đặt tour và thực hiện thanh toán."
            );
            setIsModalOpen(true); // Open modal with success message
        } catch (error) {
            console.error("Error calling bookTour API:", error);
            setModalMessage("Đã xảy ra lỗi khi đặt tour. Vui lòng thử lại.");
            setIsModalOpen(true); // Open modal with error message
        }
    };

    const bookTour = async (bookingData) => {

        try {
            const response = await axiosInstance.post(
                "booking/bookTour",
                bookingData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("Booking Success:", response.data);
            return response.data; // Trả về dữ liệu từ API nếu cần sử dụng tiếp
        } catch (error) {
            if (error.response) {
                console.error("Booking Failed:", error.response.data);
            } else if (error.request) {
                console.error("No Response from Server");
            } else {
                console.error("Error:", error.message);
            }
            throw error; // Ném lỗi để xử lý ngoài hàm nếu cần
        }
    };

    // useEffect(() => {
    //     const fetchUserInfo = async () => {
    //         try {
    //             const response = await axiosInstance.get("/customers/by-email");
    //             console.log(response.data);
    //             setName(response.data.name);
    //             setPhone(response.data.phoneNumber);
    //             setEmail(response.data.email);
    //             setAddress(response.data.address);
    //             setUser(response.data);
    //             return response.data;

    //         } catch (error) {
    //             throw new Error("Failed to fetch user info");
    //         }
    //     };
    //     fetchUserInfo();
    // }, []);
    useEffect(() => {
        const { total, quantity } = calculateTotal();
        setTotal(total);
        setQuantity(quantity);
    }, [adults, children, toddlers, infants, tour.price]);
    const formatCurrency = (amount) => {
        return amount.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
            minimumFractionDigits: 0, // không hiển thị số thập phân
            maximumFractionDigits: 0,
        });
    };
    // Hàm tính tổng tiền
    const calculateTotal = () => {
        let total = 0;
        let quantity = adults + children;

        // Tính tiền cho người lớn (100% giá vé)
        total += adults * tour.price;

        // Tính tiền cho trẻ em (70% giá vé cho tất cả trẻ em)
        total += children * (tour.price * 0.7);

        // Nếu thỏa mãn điều kiện có trẻ nhỏ (>= 2 trẻ nhỏ hoặc 1 trẻ nhỏ và 1 em bé)
        if (toddlers >= 2 || (toddlers >= 1 && infants >= 1)) {
            total += toddlers * (tour.price * 0.5);
            quantity += toddlers;
        }

        // Nếu thỏa mãn điều kiện có em bé (>= 2 em bé hoặc 1 em bé và 1 trẻ nhỏ)
        if (infants >= 2 || (infants >= 1 && toddlers >= 1)) {
            total += infants * (tour.price * 0.25);
            quantity += infants;
        }

        return { total, quantity };
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#fafafa", }}>
            <View style={styles.header}>
                <Text style={styles.textName}>Thông tin đặt tour</Text>
            </View>
            <ScrollView>
                <Modal
                    transparent
                    visible={isModalOpen}
                    animationType="fade"
                    onRequestClose={() => setIsModalOpen(false)} // For Android back button
                >
                    <View style={styles.background}>
                        <View style={styles.modalBox}>
                            <Text style={styles.textMessage}>{modalMessage}</Text>
                            <TouchableOpacity
                                style={styles.actionButton}
                                onPress={() => {
                                    setIsModalOpen(false);
                                    navigation.navigate("Bookings", load = "true");
                                }}

                            >
                                <Text style={styles.buttonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <View style={styles.tour}>
                    <Image
                        source={{
                            uri: tour?.urlImage[0]
                        }}
                        style={styles?.tourAvt}
                        resizeMode="cover"
                    />
                    <View style={styles.detailTour}>
                        <Text style={{ fontSize: 16, fontWeight: "500" }}>{tour?.name}</Text>

                        <View>
                            <Text style={{ fontSize: 14 }}>Khởi hành: {formatDate(tour?.departureDate)}</Text>
                            <Text style={{ fontSize: 14 }}>Thời gian: {tour?.day} ngày {tour?.night} đêm</Text>
                            <Text style={{ fontSize: 14 }}>Số chổ còn nhận: {tour?.availableSlot ? tour.availableSlot : 'Hết vé'}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.box}>
                    <Text style={{ fontSize: 14, fontWeight: "500", color: 'gray', paddingBottom: 10 }}>Hành khách</Text>
                    <View style={styles.rowAround}>
                        <View style={styles.boxHanhKhach}>
                            <Text style={styles.textBoxtitle}>Người lớn</Text>
                            <Text style={styles.textBoxdetail}>Từ 12 tuổi trở lên</Text>
                            <View style={[styles.rowAround, { paddingBottom: 0, paddingTop: 5 }]}>
                                <TouchableOpacity onPress={descAdults}><Feather name="minus-circle" size={24} color="black" /></TouchableOpacity>
                                <Text style={[styles.textName, { paddingTop: 0, paddingBottom: 0 }]}>{adults}</Text>
                                <TouchableOpacity onPress={ascAdults}><Feather name="plus-circle" size={24} color="black" /></TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.boxHanhKhach}>
                            <Text style={styles.textBoxtitle}>Trẻ em</Text>
                            <Text style={styles.textBoxdetail}>Từ 5 - dưới 12 tuổi</Text>
                            <View style={[styles.rowAround, { paddingBottom: 0, paddingTop: 5 }]}>
                                <TouchableOpacity onPress={descChildren}><Feather name="minus-circle" size={24} color="black" /></TouchableOpacity>
                                <Text style={[styles.textName, { paddingTop: 0, paddingBottom: 0 }]}>{children}</Text>
                                <TouchableOpacity onPress={ascChildren}><Feather name="plus-circle" size={24} color="black" /></TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.rowAround, { paddingBottom: 0 }]}>
                        <View style={styles.boxHanhKhach}>
                            <Text style={styles.textBoxtitle}>Trẻ nhỏ</Text>
                            <Text style={styles.textBoxdetail}>Từ 2 - dưới 5 tuổi</Text>
                            <View style={[styles.rowAround, { paddingBottom: 0, paddingTop: 5 }]}>
                                <TouchableOpacity onPress={descToddlers}><Feather name="minus-circle" size={24} color="black" /></TouchableOpacity>
                                <Text style={[styles.textName, { paddingTop: 0, paddingBottom: 0 }]}>{toddlers}</Text>
                                <TouchableOpacity onPress={ascToddlers}><Feather name="plus-circle" size={24} color="black" /></TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.boxHanhKhach}>
                            <Text style={styles.textBoxtitle}>Em bé</Text>
                            <Text style={styles.textBoxdetail}>Dưới 2 tuổi</Text>
                            <View style={[styles.rowAround, { paddingBottom: 0, paddingTop: 5 }]}>
                                <TouchableOpacity onPress={descInfants}><Feather name="minus-circle" size={24} color="black" /></TouchableOpacity>
                                <Text style={[styles.textName, { paddingTop: 0, paddingBottom: 0 }]}>{infants}</Text>
                                <TouchableOpacity onPress={ascInfants}><Feather name="plus-circle" size={24} color="black" /></TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.box}>
                    <Text style={{ fontSize: 14, fontWeight: "500", color: 'gray', paddingBottom: 10 }}>Thông tin liên lạc</Text>
                    <View style={styles.onlyOne}>
                        <Text style={styles.textTitle}>Họ và tên<Text style={[styles.textTitle, { color: "red" }]}> *</Text></Text>
                        <TextInput
                            style={[styles.formPicker, { paddingLeft: 15 }]}
                            value={name}
                            defaultValue={authUser?.name}
                            onChangeText={setName}
                        />
                    </View>
                    <View style={styles.onlyOne}>
                        <Text style={styles.textTitle}>Số điện thoại</Text>
                        <TextInput
                            style={[styles.formPicker, { paddingLeft: 15 }]}
                            value={phone}
                            onChangeText={setPhone}
                        />
                    </View>
                    <View style={styles.onlyOne}>

                        <Text style={styles.textTitle}>Email<Text style={[styles.textTitle, { color: "red" }]}> *</Text></Text>
                        <TextInput
                            style={[styles.formPicker, { paddingLeft: 15 }]}
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                    <View style={styles.rowAround}>
                        <View style={styles.col}>
                            <Text style={styles.textTitle}>Tỉnh/ Thành phố</Text>
                            <View style={styles.formPicker}>
                                <Picker
                                    selectedValue={selectedProvince}
                                    onValueChange={(itemValue) => setSelectedProvince(itemValue)}
                                >
                                    {provinces.map((item, index) => (
                                        <Picker.Item key={index} label={item.label} value={item.value} style={styles.textPicker} />
                                    ))}
                                </Picker>
                            </View>
                        </View>
                        <View style={styles.col}>
                            <Text style={styles.textTitle}>Quận/Huyện</Text>
                            <View style={styles.formPicker}>
                                <Picker
                                    selectedValue={selectedDistrict}
                                    onValueChange={(itemValue) => setSelectedDistrict(itemValue)}
                                >
                                    {districts.map((item, index) => (
                                        <Picker.Item key={index} label={item.label} value={item.value} style={styles.textPicker} />
                                    ))}
                                </Picker>
                            </View>
                        </View>
                    </View>
                    <View style={styles.onlyOne}>
                        <Text style={styles.textTitle}>Phường/Xã</Text>
                        <View style={styles.formPicker}>
                            <Picker
                                selectedValue={selectedWard}
                                onValueChange={(itemValue) => setSelectedWard(itemValue)}
                            >
                                {wards.map((item, index) => (
                                    <Picker.Item key={index} label={item.label} value={item.value} style={styles.textPicker} />
                                ))}
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.onlyOne}>
                        <Text style={styles.textTitle}>Địa chỉ cụ thể</Text>
                        <TextInput
                            style={[styles.formPicker, { paddingLeft: 15, height: 70 }]}
                            value={address}
                            onChangeText={setAddress}
                            multiline={true}
                            numberOfLines={3}
                        />
                    </View>
                </View>
                <View style={styles.box}>
                    <Text style={{ fontSize: 14, fontWeight: "500", color: 'gray', paddingBottom: 10 }}>Tóm tắt chuyến đi</Text>
                    <View style={styles.row}>
                        <AntDesign name="calendar" size={24} color="black" />
                        <View>
                            <Text style={{ fontSize: 14, fontWeight: "500", color: 'gray', paddingBottom: 10 }}>Bắt đầu chuyến đi</Text>
                            <Text style={{ fontSize: 14, fontWeight: "500", color: 'black', paddingBottom: 10 }}>{formatDate(ticket_tour?.departureDate)}</Text>
                            <Text style={{ fontSize: 14, fontWeight: "500", color: 'gray', paddingBottom: 10 }}>{ticket_tour?.departureLocation}</Text>

                        </View>
                    </View>
                    <View style={styles.row}>
                        <AntDesign name="calendar" size={24} color="black" />
                        <View>
                            <Text style={{ fontSize: 14, fontWeight: "500", color: 'gray', paddingBottom: 10 }}>Kết thúc chuyến đi</Text>
                            <Text style={{ fontSize: 14, fontWeight: "500", color: 'black', paddingBottom: 10 }}>{formatDate(addDays(ticket_tour?.departureDate, tour?.day))}</Text>
                            <Text style={{ fontSize: 14, fontWeight: "500", color: 'gray', paddingBottom: 10 }}>{tour?.destination}</Text>
                        </View>
                    </View>

                </View>
                <View style={styles.box}>
                    <Text style={{ fontSize: 14, fontWeight: "500", color: 'gray', paddingBottom: 10 }}>Thông tin hành khách</Text>

                    {/* Thông tin người lớn */}
                    <View style={styles.infoBox}>
                        <Text>
                            Người lớn: <Text style={styles.boldText}>{adults} người</Text>
                        </Text>
                        <Text>
                            Giá tiền:{" "}
                            <Text style={styles.boldText}>
                                {adults} x {formatCurrency(tour.price)}
                            </Text>
                        </Text>
                        <Text>
                            Phụ thu phòng riêng: <Text style={styles.boldText}>0đ</Text>
                        </Text>
                    </View>

                    {/* Thông tin trẻ em */}
                    {children > 0 && (
                        <View style={styles.infoBox}>
                            <Text>
                                Trẻ em: <Text style={styles.boldText}>{children} người</Text>
                            </Text>
                            <Text>
                                Giá tiền:{" "}
                                <Text style={styles.boldText}>
                                    {children} x {formatCurrency(tour.price * 0.7)}
                                </Text>
                            </Text>
                        </View>
                    )}

                    {/* Thông tin trẻ nhỏ */}
                    {(toddlers >= 2 || (toddlers >= 1 && infants >= 1)) && (
                        <View style={styles.infoBox}>
                            <Text>
                                Trẻ nhỏ: <Text style={styles.boldText}>{toddlers} người</Text>
                            </Text>
                            <Text>
                                Giá tiền:{" "}
                                <Text style={styles.boldText}>
                                    {toddlers} x {formatCurrency(tour.price * 0.5)}
                                </Text>
                            </Text>
                        </View>
                    )}

                    {/* Thông tin em bé */}
                    {(infants >= 2 || (infants >= 1 && toddlers >= 1)) && (
                        <View style={styles.infoBox}>
                            <Text>
                                Em bé: <Text style={styles.boldText}>{infants} người</Text>
                            </Text>
                            <Text>
                                Giá tiền:{" "}
                                <Text style={styles.boldText}>
                                    {infants} x {formatCurrency(tour.price * 0.25)}
                                </Text>
                            </Text>
                        </View>
                    )}
                </View>
            </ScrollView>
            <View style={styles.priceBox}>
                <Text style={{ fontSize: 15, paddingLeft: 10, color: "red", fontWeight: "500" }}>{formatCurrency(total)}</Text>

                <Pressable style={styles.buttonDat} onPress={() => { handleBookTour() }}>
                    <Text style={styles.textDat}>ĐẶT NGAY</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#3FD0D4",
        marginBottom: 10,
    },
    textName: {
        fontSize: 20,
        fontWeight: "500",
        padding: 10,
        textAlign: 'center'
    },
    itemTour: {
        backgroundColor: "#fff",
        shadowColor: "black",
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 10, // Android,
        borderRadius: 10

    },
    tour: {
        flexDirection: "row",
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        width: '92%',
        marginLeft: '4%',
        marginTop: 15
    },
    tourAvt: {
        width: 120,
        height: 120,
        backgroundColor: "red",
        borderRadius: 5
    },
    detailTour: {
        paddingLeft: 20,
        flexDirection: "column",
        justifyContent: "space-between",
        height: 120,
    },
    row: {
        display: 'flex',
        flexDirection: "row",
    },
    rowAround: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: "space-around",
        paddingBottom: 10,

    },
    boxHanhKhach: {
        backgroundColor: "#f2f2f2",
        width: '40%',
        borderRadius: 5,
        padding: 5
    },
    textBoxdetail: {
        fontSize: 12,
        color: 'gray',
        fontWeight: '300'
    },
    textBoxtitle: {
        fontSize: 13,
        fontWeight: '500'
    },
    box: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        width: '92%',
        marginLeft: '4%',
        marginTop: 15
    },
    col: {
        flexDirection: "column",
        width: "48%",
    },
    textTitle: {
        fontSize: 13,
        fontWeight: "500",
        paddingLeft: 10,
        color: "#3FD0D4"
    },
    formPicker: {
        borderWidth: 1,
        borderColor: "#3FD0D4",
        borderRadius: 10,
        height: 40,
        display: "flex",
        justifyContent: "center",
        marginLeft: 5,
        marginRight: 5

    },
    input: {
        marginBottom: 15,
        padding: 10,
        borderWidth: 1,
        borderColor: '#3FD0D4',
        borderRadius: 5,
    },
    onlyOne: {
        padding: 8,
    },
    buttonDat: {
        height: 40,
        backgroundColor: "#3FD0D4",
        justifyContent: "center",
        width: 150,
        alignItems: "center",
        borderRadius: 20,
        marginRight: 10
    },
    textDat: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: "500",

    },
    priceBox: {
        backgroundColor: "#ffcccc",
        justifyContent: 'center',
        alignItems: 'center'
    },
    infoBox: {
        borderWidth: 1,
        borderColor: '#38b2ac', // teal-400
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
        backgroundColor: '#fff',
    },
    boldText: {
        fontWeight: 'bold',
    },
    background: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBox: {
        width: 300,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    textMessage: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    actionButton: {
        backgroundColor: '#1E90FF',
        borderRadius: 5,
        paddingVertical: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },


});
export default DatTour;