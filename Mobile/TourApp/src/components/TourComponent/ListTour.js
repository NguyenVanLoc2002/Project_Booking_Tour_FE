import React, { useEffect, useRef, useState } from "react";
import { View, Text, Pressable, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
// import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// const Tab = createMaterialTopTabNavigator();
import useTour from "../../hooks/useTour";
import Ionicons from '@expo/vector-icons/Ionicons';
const ListTour = ({ navigation, route }) => {
    const { listTour, title ,region,authUser,name} = route.params
    const {totalPages, tourListSort, fetchToursSort } = useTour();
    const [currentPage, setCurrentPage] = useState(1);
    const [toursPerPage, setToursPerPage] = useState(10);
    const [tourList, setTourList] = useState(listTour); // Danh sách tour
    // const [totalPages, setTotalPages] = useState(1); // Tổng số trang
    const [sortType, setSortType]=useState('')
    const getToursByPage = (page) => {
        const startIndex = (page - 1) * toursPerPage;
        const endIndex = startIndex + toursPerPage;
        return listTour.slice(startIndex, endIndex);
      };

    useEffect(() => {
        const fetchTour = async () => {
            await fetchToursSort(region, currentPage, toursPerPage, sortType,authUser,name)
        };
        fetchTour();
    }, [region, currentPage, toursPerPage, sortType]);

    useEffect(() => {
        setTourList(tourListSort);
        // setTotalPages(response.data?.totalPages || 0);
    }, [tourListSort]);

    
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

    // Tạo danh sách trang hiển thị
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
        <ScrollView style={{ flex: 1, backgroundColor: "#fafafa", }}>

            <View style={styles.header}><Text style={styles.textHeader}>{title}</Text></View>
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
            {tourList?.map((tour, index) => (
                <View key={index} style={styles.tourList}>
                    <Pressable
                        style={styles.itemTour}
                        onPress={() => { navigation.navigate("DetailTour", { tour: tour }); }}
                    >
                        <View >
                            <Image
                                source={{
                                    uri: tour?.urlImage[0]
                                }}
                                style={styles?.tourAvt}
                                resizeMode="cover"
                            />
                            <View style={styles.detailTour}>
                                <Text style={{ fontSize: 16, fontWeight: "500" }}>{tour?.name}</Text>
                                <View style={styles.rowAround}>
                                    <View>
                                        <Text style={{ fontSize: 14, fontWeight: "500", color: "red" }}>{Number(tour?.price).toLocaleString('vi-VN')} đ</Text>
                                        <Text style={{ textDecorationLine: "line-through", fontSize: 12, fontWeight: "500", color: "gray" }}>{Number(tour?.oldPrice).toLocaleString('vi-VN')} đ</Text>
                                    </View>
                                    <View style={[styles.row, { paddingRight: 10, alignItems: "center" }]}>
                                        {tour.tourFeatureDTO.transportationMode.includes("AIRPLANE") && (
                                            <FontAwesome6 style={{ paddingRight: 10 }} name="plane" size={16} color="black" />
                                        )}
                                        {tour.tourFeatureDTO.transportationMode.includes("BUS") && (
                                            <FontAwesome6 style={{ paddingRight: 10 }} name="bus-simple" size={16} color="black" />
                                        )}
                                        {tour.tourFeatureDTO.transportationMode.includes("TRAIN") && (
                                            <FontAwesome6 style={{ paddingRight: 10 }} name="train" size={16} color="black" />
                                        )}
                                        {tour.tourFeatureDTO.transportationMode.includes("PRIVATE_CAR") && (
                                            <FontAwesome6 style={{ paddingRight: 10 }} name="car" size={16} color="black" />
                                        )}
                                        <Ionicons name="partly-sunny-outline" size={20} color="black" />
                                    </View>
                                </View>
                                <View style={styles.row}><AntDesign name="calendar" size={20} color="black" /><Text style={{ paddingLeft: 6, fontSize: 14 }}>Khởi hành: {formatDate(tour.departureDate)}</Text></View>
                                <View style={styles.row}><AntDesign name="clockcircleo" size={20} color="black" /><Text style={{ paddingLeft: 6, fontSize: 14 }}>Thời gian: {tour.day} ngày {tour.night} đêm</Text></View>
                                <View style={styles.row}><AntDesign name="team" size={20} color="black" /><Text style={{ paddingLeft: 6, fontSize: 14 }}>Số chổ còn nhận: {tour.availableSlot > 0 ? tour?.availableSlot : "Hết chỗ"}</Text></View>

                            </View>
                        </View>
                    </Pressable>
                </View>

            ))}
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
                        style={[styles.pageButton,page === currentPage  && styles.pageButtonChoose ]}
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
    },
    textHeader: {
        fontSize: 18,
        fontWeight: "500",
        textAlign: "center",
        padding: 8
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
    pageRow:{
        display: 'flex',
        flexDirection: "row",
        justifyContent:'center',
        paddingTop:15
    },
    pageButton:{
        display:"flex",
        paddingLeft:10,
        paddingRight:10,
        marginLeft:5,
        backgroundColor:"#f0ffff",
        borderRadius:10,
        justifyContent:'center',
        height:40
    },
    pageButtonChoose:{
        backgroundColor:"#00ffff"
    },
    disabledButton: {
        backgroundColor: '#dcdcdc', // Màu khi disabled
    },




});
export default ListTour;