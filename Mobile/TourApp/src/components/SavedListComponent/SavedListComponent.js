import React, { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import SavedTour from "./component/SavedTour";
import { useAuthContext } from "../../contexts/AuthContext";
import useTour from "../../hooks/useTour";
import axiosInstance from "../../api/axiosInstance";
import Toast from "react-native-toast-message";
const SavedListComponent = ({ navigation, route }) => {
    const { authUser } = useAuthContext();
    const [currentPage, setCurrentPage] = useState(1);
    const [toursPerPage, setToursPerPage] = useState(10);
    const [tourList, setTourList] = useState();
    // const [totalPages, setTotalPages] = useState(1); // Tổng số trang
    const [sortType, setSortType] = useState('')
    const { totalPages, saveTour, saveTourSort } = useTour();
    const [listMienBac, setListMienBac] = useState([
        {
            url: "https://res.cloudinary.com/doqbelkif/image/upload/v1726605863/968c81c7-7e7b-447c-962c-7f2c62af98c5.png",
            price: '6500000',
            originalPrice: '8500000',
            title: 'Vịnh Hạ Long-Quảng Ninh',
            ngayKhoiHanh: "05-09-2024",
            thoiGian: "3 ngày 2 đêm",
            thoiTiet: "nang",
            soLuongVe: 50,
            soVeDaDat: 32,
            noiKhoiHanh: "Hồ Chí Minh",
            diemThamQuan: "Vịnh Hạ Long-Quảng Ninh-Núi Đá",
            noiNghiNgoi: "Khách sạn",
            amThuc: "03 bữa sáng + 03 bữa trưa + 02 bữa tối.",
            phuongTien: "may bay, xe du lịch",
            listAnh: ["https://res.cloudinary.com/doqbelkif/image/upload/v1726605863/968c81c7-7e7b-447c-962c-7f2c62af98c5.png",
                "https://res.cloudinary.com/doqbelkif/image/upload/v1726605863/968c81c7-7e7b-447c-962c-7f2c62af98c5.png",
                "https://res.cloudinary.com/doqbelkif/image/upload/v1726605834/fb61f333-e383-44d1-b1d6-7727f04c7ad1.png"],
            traiNghiem: "Nằm dọc vùng Duyên hải Nam Trung Bộ, Mũi Né là một thị trấn nghỉ dưỡng yên tĩnh, nổi tiếng với những bãi biển tuyệt đẹp, cồn cát rực rỡ và thời tiết nắng ấm quanh năm. Từng là bí mật, giờ đây Mũi Né đã trở thành điểm đến phổ biến cho những người tìm kiếm sự thư giãn, hoạt động ngoài trời và vẻ đẹp tự nhiên.",
            chuongTrinh: [{
                title: "Phan Thiết- Nui Tà Cù",
                detail: " Đến với Bình Thuận Quý khách dừng chân và tham quan:  + NÚI TÀ CÚ: là một địa điểm leo núi, khung cảnh nơi đây hoang sơ, ký vỹ với núi non trùng điệp, thấp thoáng mái chùa có kính ấn sau rừng cây. "
            },
            {
                title: "Khu du lịch Bàu Sen",
                detail: "  Đoàn dùng bữa trưa tại nhà hàng KDL TA CŨ dưới chân núi. Tại đây, quý khách có thể thu giân thưởng thức món giải khát thanh nhiệt, nổi tiếng Bình Thuận: MỦ TRÔM ĐƯỜNG PHÊN hoặc mua làm quà cho người thân.  "
            },
            {
                title: "Biển Mũi Né",
                detail: "Quý khách dùng bữa tối. Sau đó tự do nghỉ ngơi hoặc dạo biển đêm Mũi"
            }
            ],
            thongTinTapTrung: {
                ngay: "05-09-2024",
                noi: "Sân bay tân sơn nhất, HCM"
            },
            thongTinHuongDanVien: {
                doan: "Bảo Trúc",
                tien: "Mai"
            },
            dieuKien: {
                baoGom: "Khách sạn: Phòng tiện nghi điều hoà, tivi, nóng lạnh khép kín 02-03 người/phòng.Phương tiện: 01 xe ô tô chỗ du lịch hiện đại, điều hòa, đời mới đưa ",
                khongBaoGom: "Bữa chính: 03 bữa sáng + 03 bữa trưa + 02 bữa tối.Vé thắng cảnh vào cổng các điểm du lịch theo chương trình.",
                giaveTreEm: "Mỗi gia đình chỉ có tiêu chuẩn là 1 trẻ em, trẻ em thứ 2 tính như người lớn, tính 100% giá tour.Dưới 05 tuổi: Miễn phí giá tour. Bố Mẹ tự lo ăn, nghỉ, vé thăm quan - nếu có.",
                huyTour: "+ Quy định hủy đối với ngày lễ, tết - Hủy trước 10 ngày khởi hành hoàn 50% phí tour - Hủy trước 03-09 ngày khởi hành hoàn 25% phí  .",
                thanhToan: "Quý khách nộp hồ sơ và đặt cọc 50% chi phí dịch vụ và 100% chi phí phát sinh (nếu có) khi đặt chổ."
            }
        },
        {
            url: "https://res.cloudinary.com/doqbelkif/image/upload/v1726605834/fb61f333-e383-44d1-b1d6-7727f04c7ad1.png",
            price: '7845000',
            originalPrice: '9550000',
            title: 'Hà Giang',
            ngayKhoiHanh: "15-09-2024",
            thoiGian: "3 ngày 2 đêm",
            thoiTiet: "nang",
            soLuongVe: 32,
            soVeDaDat: 12,
            noiKhoiHanh: "Đà Nẵng",
            diemThamQuan: "Vịnh Hạ Long-Quảng Ninh-Núi Đá",
            noiNghiNgoi: "Khách sạn",
            amThuc: "03 bữa sáng + 03 bữa trưa + 02 bữa tối.",
            phuongTien: "may bay, xe du lịch",
            listAnh: ["https://res.cloudinary.com/doqbelkif/image/upload/v1726605810/62c96cbc-6b19-4a94-a180-b0d16ac5a9b4.png",
                "https://res.cloudinary.com/doqbelkif/image/upload/v1726605863/968c81c7-7e7b-447c-962c-7f2c62af98c5.png",
                "https://res.cloudinary.com/doqbelkif/image/upload/v1726605834/fb61f333-e383-44d1-b1d6-7727f04c7ad1.png"],
            traiNghiem: "Nằm dọc vùng Duyên hải Nam Trung Bộ, Mũi Né là một thị trấn nghỉ dưỡng yên tĩnh, nổi tiếng với những bãi biển tuyệt đẹp, cồn cát rực rỡ và thời tiết nắng ấm quanh năm. Từng là bí mật, giờ đây Mũi Né đã trở thành điểm đến phổ biến cho những người tìm kiếm sự thư giãn, hoạt động ngoài trời và vẻ đẹp tự nhiên.",
            chuongTrinh: [{
                title: "Phan Thiết- Nui Tà Cù",
                detail: " Đến với Bình Thuận Quý khách dừng chân và tham quan:  + NÚI TÀ CÚ: là một địa điểm leo núi, khung cảnh nơi đây hoang sơ, ký vỹ với núi non trùng điệp, thấp thoáng mái chùa có kính ấn sau rừng cây. "
            },
            {
                title: "Khu du lịch Bàu Sen",
                detail: "  Đoàn dùng bữa trưa tại nhà hàng KDL TA CŨ dưới chân núi. Tại đây, quý khách có thể thu giân thưởng thức món giải khát thanh nhiệt, nổi tiếng Bình Thuận: MỦ TRÔM ĐƯỜNG PHÊN hoặc mua làm quà cho người thân.  "
            },
            {
                title: "Biển Mũi Né",
                detail: "Quý khách dùng bữa tối. Sau đó tự do nghỉ ngơi hoặc dạo biển đêm Mũi"
            }
            ],
            thongTinTapTrung: {
                ngay: "05-09-2024",
                noi: "Sân bay tân sơn nhất, HCM"
            },
            thongTinHuongDanVien: {
                doan: "Bảo Trúc",
            }
        },
        {
            url: "https://res.cloudinary.com/doqbelkif/image/upload/v1726605810/62c96cbc-6b19-4a94-a180-b0d16ac5a9b4.png",
            price: '7880000',
            originalPrice: '10240000',
            title: 'Sapa',
            ngayKhoiHanh: "18-09-2024",
            thoiGian: "3 ngày 2 đêm",
            thoiTiet: "nang",
            soLuongVe: 52,
            soVeDaDat: 43,
            noiKhoiHanh: "Đà Nẵng",
            diemThamQuan: "Vịnh Hạ Long-Quảng Ninh-Núi Đá",
            noiNghiNgoi: "Khách sạn",
            amThuc: "03 bữa sáng + 03 bữa trưa + 02 bữa tối.",
            phuongTien: "may bay, xe du lịch",
            listAnh: ["https://res.cloudinary.com/doqbelkif/image/upload/v1726605810/62c96cbc-6b19-4a94-a180-b0d16ac5a9b4.png",
                "https://res.cloudinary.com/doqbelkif/image/upload/v1726605863/968c81c7-7e7b-447c-962c-7f2c62af98c5.png",
                "https://res.cloudinary.com/doqbelkif/image/upload/v1726605834/fb61f333-e383-44d1-b1d6-7727f04c7ad1.png"],
            traiNghiem: "Nằm dọc vùng Duyên hải Nam Trung Bộ, Mũi Né là một thị trấn nghỉ dưỡng yên tĩnh, nổi tiếng với những bãi biển tuyệt đẹp, cồn cát rực rỡ và thời tiết nắng ấm quanh năm. Từng là bí mật, giờ đây Mũi Né đã trở thành điểm đến phổ biến cho những người tìm kiếm sự thư giãn, hoạt động ngoài trời và vẻ đẹp tự nhiên.",

        },
        {
            url: "https://res.cloudinary.com/doqbelkif/image/upload/v1726605783/077dc171-f2ed-48e2-a4b4-2c20b5fa4bc7.png",
            price: '6500000',
            originalPrice: '8500000',
            title: 'Hội An',
            ngayKhoiHanh: "19-10-2024",
            thoiGian: "5 ngày 4 đêm",
            thoiTiet: "nang",
            soLuongVe: 45,
            soVeDaDat: 42,
            noiKhoiHanh: "Đà Nẵng",
            diemThamQuan: "Vịnh Hạ Long-Quảng Ninh-Núi Đá",
            noiNghiNgoi: "Khách sạn",
            amThuc: "03 bữa sáng + 03 bữa trưa + 02 bữa tối.",
            phuongTien: "may bay, xe du lịch",
            listAnh: ["https://res.cloudinary.com/doqbelkif/image/upload/v1726605810/62c96cbc-6b19-4a94-a180-b0d16ac5a9b4.png",
                "https://res.cloudinary.com/doqbelkif/image/upload/v1726605863/968c81c7-7e7b-447c-962c-7f2c62af98c5.png",
                "https://res.cloudinary.com/doqbelkif/image/upload/v1726605834/fb61f333-e383-44d1-b1d6-7727f04c7ad1.png"],
            traiNghiem: "Nằm dọc vùng Duyên hải Nam Trung Bộ, Mũi Né là một thị trấn nghỉ dưỡng yên tĩnh, nổi tiếng với những bãi biển tuyệt đẹp, cồn cát rực rỡ và thời tiết nắng ấm quanh năm. Từng là bí mật, giờ đây Mũi Né đã trở thành điểm đến phổ biến cho những người tìm kiếm sự thư giãn, hoạt động ngoài trời và vẻ đẹp tự nhiên.",

        }, {
            url: "https://res.cloudinary.com/doqbelkif/image/upload/v1726605866/35784823-5c44-4f7e-b095-ec45a2d129ec.png",
            price: '6570000',
            originalPrice: '8570000',
            title: 'Hải Phòng',
            ngayKhoiHanh: "06-09-2024",
            thoiGian: "3 ngày 2 đêm",
            thoiTiet: "nang",
            soLuongVe: 13,
            soVeDaDat: 6,
            noiKhoiHanh: "Đà Nẵng",
            diemThamQuan: "Vịnh Hạ Long-Quảng Ninh-Núi Đá",
            noiNghiNgoi: "Khách sạn",
            amThuc: "03 bữa sáng + 03 bữa trưa + 02 bữa tối.",
            phuongTien: "may bay, xe du lịch",
            listAnh: ["https://res.cloudinary.com/doqbelkif/image/upload/v1726605810/62c96cbc-6b19-4a94-a180-b0d16ac5a9b4.png",
                "https://res.cloudinary.com/doqbelkif/image/upload/v1726605863/968c81c7-7e7b-447c-962c-7f2c62af98c5.png",
                "https://res.cloudinary.com/doqbelkif/image/upload/v1726605834/fb61f333-e383-44d1-b1d6-7727f04c7ad1.png"],
            traiNghiem: "Nằm dọc vùng Duyên hải Nam Trung Bộ, Mũi Né là một thị trấn nghỉ dưỡng yên tĩnh, nổi tiếng với những bãi biển tuyệt đẹp, cồn cát rực rỡ và thời tiết nắng ấm quanh năm. Từng là bí mật, giờ đây Mũi Né đã trở thành điểm đến phổ biến cho những người tìm kiếm sự thư giãn, hoạt động ngoài trời và vẻ đẹp tự nhiên.",

        },
        ,

    ]);
    useEffect(() => {
        const fetchTours = async () => {
            await saveTourSort(currentPage, toursPerPage, sortType, authUser);
            console.log(saveTour);
        };
        fetchTours();
    }, [currentPage, toursPerPage, sortType]);
    useEffect(() => {
        setTourList(saveTour);
        // setTotalPages(response.data?.totalPages || 0);
    }, [saveTour]);
    //Thực hiện phân trang
    // Hàm chuyển đến trang đầu tiên
    const handleFirstPage = () => {
        setCurrentPage(1);
    };

    // Hàm chuyển đến trang cuối cùng
    const handleLastPage = () => {
        setCurrentPage(totalPages);
    };

    // Hàm chuyển đến trang cụ thể
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const pageNumbers = () => {
        const pageArr = [];
        let startPage = Math.max(1, currentPage - 2); // Bắt đầu hiển thị từ trang hiện tại - 2
        let endPage = Math.min(totalPages, currentPage + 2); // Kết thúc hiển thị ở trang hiện tại + 2

        if (currentPage <= 2) {
            endPage = Math.min(totalPages, 5);
        } else if (currentPage >= totalPages - 2) {
            startPage = Math.max(1, totalPages - 4);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageArr.push(i);
        }

        return pageArr;
    };
    const deleteInteraction = async (interactionId) => {
        try {
            const response = await axiosInstance.delete(
                `/recommendation/customer-interaction/interactions/${interactionId}`,
            );
            await saveTourSort(currentPage, toursPerPage, sortType, authUser);
            Toast.show({
                type: "success",
                text1: "Xóa tour khỏi danh sách yêu thích thành công",
                position: "bottom",
                visibilityTime: 4000,
                autoHide: true,
            });
            
            return response.data;
        } catch (error) {
            console.error(`Failed to delete interaction ${interactionId}:`, error);
        }
    };
    return (
        <ScrollView style={{ flex: 1, backgroundColor: "#fafafa", }}>
            <View style={{ backgroundColor: "#fafafa", height: "100%" }}>
                <View style={styles.header}><Text style={styles.textHeader}>TOUR ĐÃ LƯU</Text></View>
                <View style={styles.RowChoice}>
                    <TouchableOpacity style={styles.optionButton} onPress={() => setSortType("startDateNew")}>
                        <Image
                            source={require('../../../assets/new.png')}
                            style={{ width: 24, height: 24 }}
                        />
                        <Text style={styles.textBox}>Mới nhất</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionButton} onPress={() => setSortType("priceDesc")}>
                        <Image
                            source={require('../../../assets/arrows.png')}
                            style={{ width: 24, height: 24, transform: [{ rotate: '90deg' }] }}
                        />
                        <Text style={styles.textBox}>Giá cao nhất</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionButton} onPress={() => setSortType("priceAsc")}>
                        <Image
                            source={require('../../../assets/arrows.png')}
                            style={{ width: 24, height: 24, transform: [{ rotate: '270deg' }] }}
                        />
                        <Text style={styles.textBox}>Giá thấp nhất</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionButton} onPress={() => setSortType("departureDateAsc")}>
                        <Image
                            source={require('../../../assets/early.png')}
                            style={{ width: 24, height: 24 }}
                        />
                        <Text style={styles.textBox}>Khởi hành sớm nhất</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionButton} onPress={() => setSortType("departureDateDesc")}>
                        <Image
                            source={require('../../../assets/after.png')}
                            style={{ width: 24, height: 24 }}
                        />
                        <Text style={styles.textBox}>Khởi hành muộn nhất</Text>
                    </TouchableOpacity>
                </View>
                <SavedTour listSaved={saveTour} navigation={navigation} deleteInteraction={deleteInteraction} />
            </View>
            <View style={styles.pageRow} >
                {/* Nút trang đầu */}
                <Pressable
                    onPress={handleFirstPage}
                    disabled={currentPage === 1}
                    style={[
                        styles.pageButton,
                        currentPage === 1 && styles.disabledButton
                    ]}
                ><Text>Trang đầu</Text></Pressable>

                {/* Hiển thị các số trang */}
                {pageNumbers().map((page) => (
                    <Pressable
                        key={page}
                        onPress={() => handlePageChange(page)}
                        style={[styles.pageButton, page === currentPage && styles.pageButtonChoose]}
                    ><Text>{page}</Text></Pressable>
                ))}
                <Pressable
                    onPress={handleLastPage}
                    disabled={currentPage === totalPages}
                    style={[
                        styles.pageButton,
                        currentPage === totalPages && styles.disabledButton
                    ]}
                ><Text>Trang cuối</Text></Pressable>
            </View>


        </ScrollView >
    );
};


const styles = StyleSheet.create({
    header: {
        backgroundColor: "#fff",
        marginBottom: 20,
        padding: 8
    },
    textHeader: {
        fontSize: 18,
        fontWeight: "500",
        textAlign: "center",
    },
    RowChoice: {
        display: "flex",
        justifyContent: "space-around",
        flexDirection: "row",
        paddingTop: 15
    },
    optionButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 85,
        height: 80,
        backgroundColor: '#fff',
        borderRadius: 8,
        width: "18%",
        shadowColor: "black",
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 10, // Android,
    },
    textBox: {
        alignItems: "center",
        fontSize: 13,
        textAlign: "center",
    },
    tourList: {
        width: '90%',
        margin: "auto",
        paddingTop: 20,

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
    tourAvt: {
        width: '100%',
        height: 140,
        backgroundColor: "red",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        // marginRight: 10,
        // alignItems: "center",
    },
    detailTour: {
        padding: 10,
        paddingLeft: 20
    },
    row: {
        display: 'flex',
        flexDirection: "row",
    },
    rowAround: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: 10

    },
    pageRow: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'center',
        paddingTop: 15
    },
    pageButton: {
        display: "flex",
        paddingLeft: 10,
        paddingRight: 10,
        marginLeft: 5,
        backgroundColor: "#f0ffff",
        borderRadius: 10,
        justifyContent: 'center',
        height: 40
    },
    pageButtonChoose: {
        backgroundColor: "#00ffff"
    },
    disabledButton: {
        backgroundColor: '#dcdcdc', // Màu khi disabled
    },

})
export default SavedListComponent;