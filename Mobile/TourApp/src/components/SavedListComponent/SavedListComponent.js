import React, { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import SavedTour from "./component/SavedTour";
import { useAuthContext } from "../../contexts/AuthContext";
import useTour from "../../hooks/useTour";
import axiosInstance from "../../api/axiosInstance";
import Toast from "react-native-toast-message";
const SavedListComponent = ({ navigation, route }) => {
    useEffect(() => {
        // Lắng nghe sự kiện focus
        const unsubscribe = navigation.addListener("focus", () => {
            fetchTours(); // Gọi hàm xử lý khi focus
        });

        // Dọn dẹp khi unmount
        // return unsubscribe;
    }, [navigation]);
    const { authUser } = useAuthContext();
    const [currentPage, setCurrentPage] = useState(1);
    const [toursPerPage, setToursPerPage] = useState(10);
    const [tourList, setTourList] = useState();
    // const [totalPages, setTotalPages] = useState(1); // Tổng số trang
    const [sortType, setSortType] = useState('')
    const { totalPages, saveTour, saveTourSort } = useTour();
    const fetchTours = async () => {
        await saveTourSort(currentPage, toursPerPage, sortType, authUser);
    };

    useEffect(() => {
        
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