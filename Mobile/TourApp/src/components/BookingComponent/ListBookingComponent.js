import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground, Pressable, Button, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Dimensions } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import ListBooking from "./component/ListBooking";
import axiosInstance from "./../../api/axiosInstance";
import Ionicons from '@expo/vector-icons/Ionicons';
const BookingComponent = ({ navigation, route }) => {
    const [pendingBookings, setPendingBookings] = useState([]); // Booking chờ xác nhận
    const [confirmedBookings, setConfirmedBookings] = useState([]); // Booking đã xác nhận
    const [paidBookings, setPaidBookings] = useState([]); // Booking đã thanh toán
    const [refundedBookings, setRefundedBookings] = useState([]); // Booking đã hủy
    const [listBooking, setListBooking] = useState([]); // Booking đã hủy
    const vndToUsdRate = 24000; // tỷ giá VND -> USD, ví dụ 1 USD = 24000 VND
    const [user, setUser] = useState(null);
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axiosInstance.get("/customers/by-email");
                setUser(response.data);
                console.log(response.data);
                getCustomerProcessingBookings(response.data.userId);
                getCustomerPaidAndCancelledBookings(response.data.userId);
                return response.data;

            } catch (error) {
                throw new Error("Failed to fetch user info");
            }
        };
        fetchUserInfo();

    }, []);
    const getCustomerProcessingBookings = async (userId) => {
        try {
            const response = await axiosInstance.get(
                `/booking/redis/customer/${userId}`
            );

            // Phân loại bookings đang xử lý
            const pendingBookings = response.data.filter(
                (item) => item.bookingDTO.statusBooking === "PENDING_CONFIRMATION"
            );
            const confirmed = response.data.filter(
                (item) => item.bookingDTO.statusBooking === "CONFIRMED"
            );
            console.log(confirmed);
            // Lưu trữ các loại booking
            setPendingBookings(pendingBookings);
            setConfirmedBookings(confirmed);
            setListBooking(pendingBookings);
        } catch (error) {
            console.error("Error fetching customer processing bookings:", error);
        }
    };
    const getCustomerPaidAndCancelledBookings = async (userId) => {
        try {
            const response = await axiosInstance.get(
                `/booking?customerId=${userId}`
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
    useEffect(() => {
        if (user?.userId) {
            getCustomerProcessingBookings(user.userId);
            getCustomerPaidAndCancelledBookings(user.userId);
        }
    }, []);
    const reload = () => {
        getCustomerProcessingBookings(user.userId);
        getCustomerPaidAndCancelledBookings(user.userId);
    }
    // //trang thai 1 cho thanh toan, 2 da dat, 3 da hoan thanh, 4 da huy
    // const [listBooking, setListBooking] = useState([
    //     {
    //         id: 1,
    //         tour: {
    //             id: 1,
    //             url: "https://res.cloudinary.com/doqbelkif/image/upload/v1726605863/968c81c7-7e7b-447c-962c-7f2c62af98c5.png",
    //             price: '6500000',
    //             originalPrice: '8500000',
    //             title: 'Vịnh Hạ Long-Quảng Ninh',
    //             ngayKhoiHanh: "05-09-2024",
    //             thoiGian: "3 ngày 2 đêm",
    //             thoiTiet: "nang",
    //             soLuongVe: 50,
    //             soVeDaDat: 32,
    //             noiKhoiHanh: "Hồ Chí Minh",
    //             diemThamQuan: "Vịnh Hạ Long-Quảng Ninh-Núi Đá",
    //             noiNghiNgoi: "Khách sạn",
    //             amThuc: "03 bữa sáng + 03 bữa trưa + 02 bữa tối.",
    //             phuongTien: "may bay, xe du lịch",
    //             listAnh: ["https://res.cloudinary.com/doqbelkif/image/upload/v1726605863/968c81c7-7e7b-447c-962c-7f2c62af98c5.png",
    //                 "https://res.cloudinary.com/doqbelkif/image/upload/v1726605863/968c81c7-7e7b-447c-962c-7f2c62af98c5.png",
    //                 "https://res.cloudinary.com/doqbelkif/image/upload/v1726605834/fb61f333-e383-44d1-b1d6-7727f04c7ad1.png"],
    //             traiNghiem: "Nằm dọc vùng Duyên hải Nam Trung Bộ, Mũi Né là một thị trấn nghỉ dưỡng yên tĩnh, nổi tiếng với những bãi biển tuyệt đẹp, cồn cát rực rỡ và thời tiết nắng ấm quanh năm. Từng là bí mật, giờ đây Mũi Né đã trở thành điểm đến phổ biến cho những người tìm kiếm sự thư giãn, hoạt động ngoài trời và vẻ đẹp tự nhiên.",
    //             chuongTrinh: [{
    //                 title: "Phan Thiết- Nui Tà Cù",
    //                 detail: " Đến với Bình Thuận Quý khách dừng chân và tham quan:  + NÚI TÀ CÚ: là một địa điểm leo núi, khung cảnh nơi đây hoang sơ, ký vỹ với núi non trùng điệp, thấp thoáng mái chùa có kính ấn sau rừng cây. "
    //             },
    //             {
    //                 title: "Khu du lịch Bàu Sen",
    //                 detail: "  Đoàn dùng bữa trưa tại nhà hàng KDL TA CŨ dưới chân núi. Tại đây, quý khách có thể thu giân thưởng thức món giải khát thanh nhiệt, nổi tiếng Bình Thuận: MỦ TRÔM ĐƯỜNG PHÊN hoặc mua làm quà cho người thân.  "
    //             },
    //             {
    //                 title: "Biển Mũi Né",
    //                 detail: "Quý khách dùng bữa tối. Sau đó tự do nghỉ ngơi hoặc dạo biển đêm Mũi"
    //             }
    //             ],
    //             thongTinTapTrung: {
    //                 ngay: "05-09-2024",
    //                 noi: "Sân bay tân sơn nhất, HCM"
    //             },
    //             thongTinHuongDanVien: {
    //                 doan: "Bảo Trúc",
    //                 tien: "Mai"
    //             },
    //             dieuKien: {
    //                 baoGom: "Khách sạn: Phòng tiện nghi điều hoà, tivi, nóng lạnh khép kín 02-03 người/phòng.Phương tiện: 01 xe ô tô chỗ du lịch hiện đại, điều hòa, đời mới đưa ",
    //                 khongBaoGom: "Bữa chính: 03 bữa sáng + 03 bữa trưa + 02 bữa tối.Vé thắng cảnh vào cổng các điểm du lịch theo chương trình.",
    //                 giaveTreEm: "Mỗi gia đình chỉ có tiêu chuẩn là 1 trẻ em, trẻ em thứ 2 tính như người lớn, tính 100% giá tour.Dưới 05 tuổi: Miễn phí giá tour. Bố Mẹ tự lo ăn, nghỉ, vé thăm quan - nếu có.",
    //                 huyTour: "+ Quy định hủy đối với ngày lễ, tết - Hủy trước 10 ngày khởi hành hoàn 50% phí tour - Hủy trước 03-09 ngày khởi hành hoàn 25% phí  .",
    //                 thanhToan: "Quý khách nộp hồ sơ và đặt cọc 50% chi phí dịch vụ và 100% chi phí phát sinh (nếu có) khi đặt chổ."
    //             },
    //         },
    //         trangThai: 1,
    //         soVe: 2
    //     },
    //     {
    //         id: 2,
    //         trangThai: 2,
    //         soVe: 4,
    //         tour: {
    //             id: 2,
    //             url: "https://res.cloudinary.com/doqbelkif/image/upload/v1726605834/fb61f333-e383-44d1-b1d6-7727f04c7ad1.png",
    //             price: '7845000',
    //             originalPrice: '9550000',
    //             title: 'Hà Giang',
    //             ngayKhoiHanh: "15-09-2024",
    //             thoiGian: "3 ngày 2 đêm",
    //             thoiTiet: "nang",
    //             soLuongVe: 32,
    //             soVeDaDat: 12,
    //             noiKhoiHanh: "Đà Nẵng",
    //             diemThamQuan: "Vịnh Hạ Long-Quảng Ninh-Núi Đá",
    //             noiNghiNgoi: "Khách sạn",
    //             amThuc: "03 bữa sáng + 03 bữa trưa + 02 bữa tối.",
    //             phuongTien: "may bay, xe du lịch",
    //             listAnh: ["https://res.cloudinary.com/doqbelkif/image/upload/v1726605810/62c96cbc-6b19-4a94-a180-b0d16ac5a9b4.png",
    //                 "https://res.cloudinary.com/doqbelkif/image/upload/v1726605863/968c81c7-7e7b-447c-962c-7f2c62af98c5.png",
    //                 "https://res.cloudinary.com/doqbelkif/image/upload/v1726605834/fb61f333-e383-44d1-b1d6-7727f04c7ad1.png"],
    //             traiNghiem: "Nằm dọc vùng Duyên hải Nam Trung Bộ, Mũi Né là một thị trấn nghỉ dưỡng yên tĩnh, nổi tiếng với những bãi biển tuyệt đẹp, cồn cát rực rỡ và thời tiết nắng ấm quanh năm. Từng là bí mật, giờ đây Mũi Né đã trở thành điểm đến phổ biến cho những người tìm kiếm sự thư giãn, hoạt động ngoài trời và vẻ đẹp tự nhiên.",
    //             chuongTrinh: [{
    //                 title: "Phan Thiết- Nui Tà Cù",
    //                 detail: " Đến với Bình Thuận Quý khách dừng chân và tham quan:  + NÚI TÀ CÚ: là một địa điểm leo núi, khung cảnh nơi đây hoang sơ, ký vỹ với núi non trùng điệp, thấp thoáng mái chùa có kính ấn sau rừng cây. "
    //             },
    //             {
    //                 title: "Khu du lịch Bàu Sen",
    //                 detail: "  Đoàn dùng bữa trưa tại nhà hàng KDL TA CŨ dưới chân núi. Tại đây, quý khách có thể thu giân thưởng thức món giải khát thanh nhiệt, nổi tiếng Bình Thuận: MỦ TRÔM ĐƯỜNG PHÊN hoặc mua làm quà cho người thân.  "
    //             },
    //             {
    //                 title: "Biển Mũi Né",
    //                 detail: "Quý khách dùng bữa tối. Sau đó tự do nghỉ ngơi hoặc dạo biển đêm Mũi"
    //             }
    //             ],
    //             thongTinTapTrung: {
    //                 ngay: "05-09-2024",
    //                 noi: "Sân bay tân sơn nhất, HCM"
    //             },
    //             thongTinHuongDanVien: {
    //                 doan: "Bảo Trúc",
    //             }
    //         }
    //     },
    //     {
    //         id: 3,
    //         trangThai: 3,
    //         soVe: 4,
    //         tour: {
    //             id: 3,
    //             url: "https://res.cloudinary.com/doqbelkif/image/upload/v1726605810/62c96cbc-6b19-4a94-a180-b0d16ac5a9b4.png",
    //             price: '7880000',
    //             originalPrice: '10240000',
    //             title: 'Sapa',
    //             ngayKhoiHanh: "18-09-2024",
    //             thoiGian: "3 ngày 2 đêm",
    //             thoiTiet: "nang",
    //             soLuongVe: 52,
    //             soVeDaDat: 43,
    //             noiKhoiHanh: "Đà Nẵng",
    //             diemThamQuan: "Vịnh Hạ Long-Quảng Ninh-Núi Đá",
    //             noiNghiNgoi: "Khách sạn",
    //             amThuc: "03 bữa sáng + 03 bữa trưa + 02 bữa tối.",
    //             phuongTien: "may bay, xe du lịch",
    //             listAnh: ["https://res.cloudinary.com/doqbelkif/image/upload/v1726605810/62c96cbc-6b19-4a94-a180-b0d16ac5a9b4.png",
    //                 "https://res.cloudinary.com/doqbelkif/image/upload/v1726605863/968c81c7-7e7b-447c-962c-7f2c62af98c5.png",
    //                 "https://res.cloudinary.com/doqbelkif/image/upload/v1726605834/fb61f333-e383-44d1-b1d6-7727f04c7ad1.png"],
    //             traiNghiem: "Nằm dọc vùng Duyên hải Nam Trung Bộ, Mũi Né là một thị trấn nghỉ dưỡng yên tĩnh, nổi tiếng với những bãi biển tuyệt đẹp, cồn cát rực rỡ và thời tiết nắng ấm quanh năm. Từng là bí mật, giờ đây Mũi Né đã trở thành điểm đến phổ biến cho những người tìm kiếm sự thư giãn, hoạt động ngoài trời và vẻ đẹp tự nhiên.",

    //         }
    //     },
    //     {
    //         id: 4,
    //         trangThai: 3,
    //         soVe: 3,
    //         tour: {
    //             id: 4,
    //             url: "https://res.cloudinary.com/doqbelkif/image/upload/v1726605783/077dc171-f2ed-48e2-a4b4-2c20b5fa4bc7.png",
    //             price: '6500000',
    //             originalPrice: '8500000',
    //             title: 'Hội An',
    //             ngayKhoiHanh: "19-10-2024",
    //             thoiGian: "5 ngày 4 đêm",
    //             thoiTiet: "nang",
    //             soLuongVe: 45,
    //             soVeDaDat: 42,
    //             noiKhoiHanh: "Đà Nẵng",
    //             diemThamQuan: "Vịnh Hạ Long-Quảng Ninh-Núi Đá",
    //             noiNghiNgoi: "Khách sạn",
    //             amThuc: "03 bữa sáng + 03 bữa trưa + 02 bữa tối.",
    //             phuongTien: "may bay, xe du lịch",
    //             listAnh: ["https://res.cloudinary.com/doqbelkif/image/upload/v1726605810/62c96cbc-6b19-4a94-a180-b0d16ac5a9b4.png",
    //                 "https://res.cloudinary.com/doqbelkif/image/upload/v1726605863/968c81c7-7e7b-447c-962c-7f2c62af98c5.png",
    //                 "https://res.cloudinary.com/doqbelkif/image/upload/v1726605834/fb61f333-e383-44d1-b1d6-7727f04c7ad1.png"],
    //             traiNghiem: "Nằm dọc vùng Duyên hải Nam Trung Bộ, Mũi Né là một thị trấn nghỉ dưỡng yên tĩnh, nổi tiếng với những bãi biển tuyệt đẹp, cồn cát rực rỡ và thời tiết nắng ấm quanh năm. Từng là bí mật, giờ đây Mũi Né đã trở thành điểm đến phổ biến cho những người tìm kiếm sự thư giãn, hoạt động ngoài trời và vẻ đẹp tự nhiên.",
    //         }
    //     }, {
    //         id: 5,
    //         trangThai: 4,
    //         soVe: 5,
    //         tour: {
    //             id: 5,
    //             url: "https://res.cloudinary.com/doqbelkif/image/upload/v1726605866/35784823-5c44-4f7e-b095-ec45a2d129ec.png",
    //             price: '6570000',
    //             originalPrice: '8570000',
    //             title: 'Hải Phòng',
    //             ngayKhoiHanh: "06-09-2024",
    //             thoiGian: "3 ngày 2 đêm",
    //             thoiTiet: "nang",
    //             soLuongVe: 13,
    //             soVeDaDat: 6,
    //             noiKhoiHanh: "Đà Nẵng",
    //             diemThamQuan: "Vịnh Hạ Long-Quảng Ninh-Núi Đá",
    //             noiNghiNgoi: "Khách sạn",
    //             amThuc: "03 bữa sáng + 03 bữa trưa + 02 bữa tối.",
    //             phuongTien: "may bay, xe du lịch",
    //             listAnh: ["https://res.cloudinary.com/doqbelkif/image/upload/v1726605810/62c96cbc-6b19-4a94-a180-b0d16ac5a9b4.png",
    //                 "https://res.cloudinary.com/doqbelkif/image/upload/v1726605863/968c81c7-7e7b-447c-962c-7f2c62af98c5.png",
    //                 "https://res.cloudinary.com/doqbelkif/image/upload/v1726605834/fb61f333-e383-44d1-b1d6-7727f04c7ad1.png"],
    //             traiNghiem: "Nằm dọc vùng Duyên hải Nam Trung Bộ, Mũi Né là một thị trấn nghỉ dưỡng yên tĩnh, nổi tiếng với những bãi biển tuyệt đẹp, cồn cát rực rỡ và thời tiết nắng ấm quanh năm. Từng là bí mật, giờ đây Mũi Né đã trở thành điểm đến phổ biến cho những người tìm kiếm sự thư giãn, hoạt động ngoài trời và vẻ đẹp tự nhiên.",
    //         }
    //     },
    //     ,

    // ]);
    const [selectTrangThai, setSelectTrangThai] = useState(1);
    const setTrangThai = (loai) => {
        setSelectTrangThai(loai);
        if (loai == 1)
            setListBooking(pendingBookings);
        if (loai == 2)
            setListBooking(confirmedBookings);
        if (loai == 3)
            setListBooking(paidBookings);
        if (loai == 4)
            setListBooking(refundedBookings);
    };
    const loaiBooking = (loai) => {
        if (loai == 1)
            return "Chờ xác nhận"
        else if (loai == 2)
            return "Đã xác nhận"
        else if (loai == 3)
            return "Đã thanh toán"
        else if (loai == 4)
            return "Đã hủy"
    };
    return (
        <ScrollView style={{ backgroundColor: "#fafafa", height: "100%" }}>
            <ImageBackground source={{
                uri: "https://res.cloudinary.com/doqbelkif/image/upload/v1726601540/656c046a-02ef-4286-8f9f-34ca7ef6e82a.png"
            }} resizeMode="cover" style={styles.imageBia}>
                {/* <View style={styles.header}>
                    <FontAwesome5 name={"search"} size={24} color={"black"} />
                    <TextInput placeholder="Nhập vào đây để tìm kiếm" style={styles.buttonSearch}>

                    </TextInput>
                </View> */}
            </ImageBackground>
            <View style={styles.viewBox}>
                {/* Main Options */}
                <View style={styles.optionsCol}>
                    <TouchableOpacity style={[styles.optionButton, { backgroundColor: selectTrangThai == 1 ? "#3FD0D4" : "#fff" }]} onPress={() => setTrangThai(1)}>
                        <Image
                            source={require('../../../assets/choThanhToan.png')}
                            style={{ width: 24, height: 24 }}
                        />
                        <Text style={styles.textBox}>Chờ xác nhận</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.optionButton, { backgroundColor: selectTrangThai == 2 ? "#3FD0D4" : "#fff" }]} onPress={() => setTrangThai(2)}>
                        <Image
                            source={require('../../../assets/daDat.png')}
                            style={{ width: 24, height: 24 }}
                        />
                        <Text style={styles.textBox}>Đã xác nhận</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.optionButton, { backgroundColor: selectTrangThai == 3 ? "#3FD0D4" : "#fff" }]} onPress={() => setTrangThai(3)}>
                        <Image
                            source={require('../../../assets/check.png')}
                            style={{ width: 24, height: 24 }}
                        />
                        <Text style={styles.textBox}>Đã thanh toán</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.optionButton, { backgroundColor: selectTrangThai == 4 ? "#3FD0D4" : "#fff" }]} onPress={() => setTrangThai(4)}>
                        <Image
                            source={require('../../../assets/listing.png')}
                            style={{ width: 24, height: 24 }}
                        />
                        <Text style={styles.textBox}>Đã hủy</Text>
                    </TouchableOpacity>

                </View>
            </View>
            <View style={{ paddingTop: 20 }}>
                <View style={{ display: 'flex', flexDirection:"row",justifyContent: "space-between" }}>
                    <Text style={styles.tieuDe}>{loaiBooking(selectTrangThai)}</Text>
                    <TouchableOpacity onPress={() => reload()}><Ionicons name="reload" size={24} color="black" /></TouchableOpacity>
                </View>
                <ListBooking listBooking={listBooking} navigation={navigation} />
            </View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    header: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        paddingHorizontal: 10,
        height: 40,
        backgroundColor: '#fff',
        width: "70%",
        marginLeft: 15
    },
    buttonSearch: {
        flex: 1,
        paddingLeft: 5
    },
    imageBia: {
        width: '100%',
        height: 250,
        marginRight: 10,
        alignItems: "center",
    },
    optionsCol: {
        flexDirection: 'column',
        // marginVertical: 10,

    },
    optionButton: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: "row",
        height: 40,
        paddingLeft: 20,


    },
    viewBox: {
        marginTop: -100,
        backgroundColor: "#fff",
        marginLeft: "5%",
        borderRadius: 10,
        shadowColor: "black",
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 10, // Android
        width: "90%",

    },

    textBox: {
        alignItems: "center",
        fontSize: 13,
        textAlign: "center",
        paddingLeft: 20
    },
    tieuDe: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 10
    },
})
export default BookingComponent;