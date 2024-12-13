import React, { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, ScrollView, TextInput } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import AntDesign from '@expo/vector-icons/AntDesign';
import axiosInstance from "../../../api/axiosInstance";
import { TouchableOpacity } from "react-native";
const data = require('./../../../../assets/json/dataProvinces.json');
import { useAuthContext } from "../../../contexts/AuthContext";

const FormEditPassenger = ({ navigation, route }) => {
    const { authUser, fetchUserInfo } = useAuthContext();
    const user = authUser;
    const [name, setName] = useState(user?.name ? user?.name : '');
    const [gender1, setGender] = useState(user?.gender ? user?.gender : false);
    const [zipCode, setZipCode] = useState(user?.zipCode ? user?.zipCode : '');
    const [phone, setPhone] = useState(user?.phoneNumber ? user?.phoneNumber : '');
    const [email, setEmail] = useState(user?.email ? user?.email : '');
    const [passportNumber, setPassportNumber] = useState('');
    const [addressNew, setAddressNew] = useState('');
    const [passenger, setPassenger] = useState(user);
    const [addressParts, setAddressParts] = useState(user?.address ? user?.address.split(" ,") : '');

    // const [passportExpiry, setPassportExpiry] = useState(new Date(2025, 5, 6));
    // const [showExpiryDatePicker, setShowExpiryDatePicker] = useState(false);
    // const [nationality, setNationality] = useState('Việt Nam');


    const listDanhXung = [
        { label: 'Anh', value: 'anh' },
        { label: 'Chị', value: 'chi' },
    ]
    const [selectedDanhXung, setSelectedDanhXung] = useState(gender1 == false ? listDanhXung[1].value : listDanhXung[0].value);

    const listQuocGia = [
        { label: 'Việt Nam', value: 'VN' },
        { label: 'Pháp', value: 'Fran' },
        { label: 'Anh', value: 'UK' },
        { label: 'Mỹ', value: 'USA' },
    ]
    const [selectedQuocGia, setSelectedQuocGia] = useState(listQuocGia[0].value);
    const [selectedQuocTich, setSelectedQuocTich] = useState(listQuocGia[0].value);

    const [dateBD, setDateBD] = useState(passenger?.dateOfBirth ? new Date(passenger?.dateOfBirth) : new Date());
    const [showBD, setShowBD] = useState(false);

    const onChangeBD = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        // setShow(Platform.OS === 'ios'); // Ẩn lịch nếu không phải iOS
        setDateBD(currentDate); // Cập nhật ngày đã chọn
        setShowBD(false);
    };

    const showDatePickerBD = () => {
        setShowBD(true);
    };
    // ngày cấp passpore
    const [datePP, setDatePP] = useState(new Date());
    const [showPP, setShowPP] = useState(false);

    const onChangePP = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        // setShow(Platform.OS === 'ios'); // Ẩn lịch nếu không phải iOS
        setDatePP(currentDate); // Cập nhật ngày đã chọn
        setShowPP(false);
    };

    const showDatePickerPP = () => {
        setShowPP(true);
    };
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [selectedProvince, setSelectedProvince] = useState("01");
    const [selectedDistrict, setSelectedDistrict] = useState("001");
    const [selectedWard, setSelectedWard] = useState("00001");

    const [selectedProvinceLabel, setSelectedProvinceLabel] = useState("");
    const [selectedDistrictLabel, setSelectedDistrictLabel] = useState("");
    const [selectedWardLabel, setSelectedWardLabel] = useState("");

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
            setAddressNew(addressParts[0]);
            setSelectedDistrictLabel(addressParts[2]);
            setSelectedWardLabel(addressParts[1]);
        }
    }, [addressParts]);
    const handleUpdateInfo = async () => {
        const address = addressNew + ' ,' + wards.find((ward) => ward.value === selectedWard)?.label + ' ,' + districts.find((ward) => ward.value === selectedDistrict)?.label + ' ,' + provinces.find((ward) => ward.value === selectedProvince)?.label;
        const gender = (selectedDanhXung == 'anh' ? true : false);
        console.log(gender)
        const dateOfBirth = dateBD;
        const phoneNumber = phone;
        try {
            const response = await axiosInstance.put(
                `/customers/${user.userId}`,
                {
                    name,
                    address,
                    dateOfBirth,
                    gender,
                    phoneNumber,
                }
            );

            if (response.data) {
                console.log(response.data)
                await fetchUserInfo()
                navigation.navigate("AccountDetail");
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
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

    return (

        <ScrollView style={{ backgroundColor: "#fafafa", height: "100%" }}>
            <View style={styles.header}>
                <Text style={styles.textName}>Thông tin hành khách</Text>
            </View>
            <View style={styles.viewBox}>
                <Text style={styles.textTieuDe}>Thông tin bắt buộc</Text>
                <View style={styles.box}>
                    <View style={styles.rowBe}>
                        <View style={styles.col}>
                            <Text style={styles.textTitle}>Danh xưng</Text>
                            <View style={styles.formPicker}>
                                <Picker
                                    selectedValue={selectedDanhXung}
                                    onValueChange={(itemValue) => setSelectedDanhXung(itemValue)}
                                >
                                    {listDanhXung.map((item, index) => (
                                        <Picker.Item key={index} label={item.label} value={item.value} style={styles.textPicker} />
                                    ))}
                                </Picker>
                            </View>
                        </View>
                        <View style={styles.col}>
                            <Text style={styles.textTitle}>Ngày sinh</Text>
                            <View style={styles.formPicker}>
                                <Pressable onPress={showDatePickerBD}>
                                    <View style={[styles.row, { alignContent: "center", paddingLeft: 15 }]}><AntDesign name="calendar" size={20} color="black" />
                                        <Text style={[styles.textPicker, { paddingLeft: 15 }]}>{dateBD.toLocaleDateString()}</Text></View>
                                    {showBD && (
                                        <DateTimePicker
                                            value={dateBD}
                                            mode="date" // Chỉ hiển thị ngày
                                            display="default" // Kiểu hiển thị của lịch (default, spinner, calendar)
                                            onChange={onChangeBD}
                                        />
                                    )}
                                </Pressable>
                            </View>
                        </View>
                    </View>
                    <View style={styles.onlyOne}>

                        <Text style={styles.textTitle}>Họ và tên<Text style={[styles.textTitle, { color: "red" }]}> *</Text></Text>
                        <TextInput
                            style={[styles.formPicker, { paddingLeft: 15 }]}
                            value={name}
                            onChangeText={setName}
                        />
                    </View>
                    <View style={styles.rowBe}>
                        <View style={styles.col}>
                            <Text style={styles.textTitle}>Tỉnh/ Thành phố</Text>
                            <View style={styles.formPicker}>
                                <Picker
                                    selectedValue={selectedProvince}
                                    onValueChange={(value) => setSelectedProvince(value)}
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
                                    onValueChange={(value) => setSelectedDistrict(value)}
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
                                onValueChange={(value) => setSelectedWard(value)}
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
                            style={[styles.formPicker, { paddingLeft: 15 }]}
                            value={addressNew}
                            onChangeText={setAddressNew}
                        />
                    </View>
                </View>
            </View>

            <View style={styles.viewBox}>
                <Text style={styles.textTieuDe}>Thông tin bổ sung</Text>
                <View style={styles.box}>
                    <View style={styles.rowBe}>
                        <View style={styles.col}>
                            <Text style={styles.textTitle}>ZipCode</Text>
                            <TextInput
                                style={[styles.formPicker, { paddingLeft: 15 }]}
                                value={zipCode}
                                onChangeText={setZipCode}
                            />
                        </View>
                        <View style={styles.col}>
                            <Text style={styles.textTitle}>Số điện thoại</Text>
                            <TextInput
                                style={[styles.formPicker, { paddingLeft: 15 }]}
                                value={phone}
                                onChangeText={setPhone}
                            />
                        </View>
                    </View>
                    <View style={styles.onlyOne}>

                        <Text style={styles.textTitle}>Email<Text style={[styles.textTitle, { color: "red" }]}> *</Text></Text>
                        <TextInput
                            style={[styles.formPicker, { paddingLeft: 15 }]}
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.rowRight}>
                    <TouchableOpacity style={styles.buttonHoanThanh} onPress={() => { handleUpdateInfo() }}>
                        <Text style={styles.textDat}>HOÀN THÀNH</Text>
                    </TouchableOpacity>
                </View>
            <View style={styles.viewBox}>
                <Text style={styles.textTieuDe}>Hộ chiếu</Text>
                <View style={styles.box}>
                    <View style={styles.rowBe}>
                        <View style={styles.col}>
                            <Text style={styles.textTitle}>Số hộ chiếu</Text>
                            <TextInput
                                style={[styles.formPicker, { paddingLeft: 15 }]}
                                value={passportNumber}
                                onChangeText={setPassportNumber}
                            />
                        </View>
                        <View style={styles.col}>
                            <Text style={styles.textTitle}>Quốc gia cấp</Text>
                            <View style={styles.formPicker}>
                                <Picker
                                    selectedValue={selectedQuocGia}
                                    onValueChange={(itemValue) => setSelectedQuocGia(itemValue)}
                                >
                                    {listQuocGia.map((item, index) => (
                                        <Picker.Item key={index} label={item.label} value={item.value} style={styles.textPicker} />
                                    ))}
                                </Picker>
                            </View>
                        </View>

                    </View>
                    <View style={styles.rowBe}>

                        <View style={styles.col}>
                            <Text style={styles.textTitle}>Ngày hết hạn</Text>
                            <View style={styles.formPicker}>
                                <Pressable onPress={showDatePickerPP}>
                                    <View style={[styles.row, { alignContent: "center", paddingLeft: 15 }]}><AntDesign name="calendar" size={20} color="black" />
                                        <Text style={[styles.textPicker, { paddingLeft: 15 }]}>{datePP.toLocaleDateString()}</Text></View>
                                    {showPP && (
                                        <DateTimePicker
                                            value={datePP}
                                            mode="date" // Chỉ hiển thị ngày
                                            display="default" // Kiểu hiển thị của lịch (default, spinner, calendar)
                                            onChange={onChangePP}
                                        />
                                    )}
                                </Pressable>
                            </View>
                        </View>
                        <View style={styles.col}>
                            <Text style={styles.textTitle}>Quốc tịch</Text>
                            <View style={styles.formPicker}>
                                <Picker
                                    selectedValue={selectedQuocTich}
                                    onValueChange={(itemValue) => setSelectedQuocTich(itemValue)}
                                >
                                    {listQuocGia.map((item, index) => (
                                        <Picker.Item key={index} label={item.label} value={item.value} style={styles.textPicker} />
                                    ))}
                                </Picker>
                            </View>
                        </View>
                    </View>

                </View>
            </View>
            <View style={styles.viewBox}>
                <Text style={styles.textTieuDe}>Căn cước công dân</Text>
                <View style={styles.box}>
                    <View style={styles.rowBe}>
                        <View style={styles.col}>
                            <Text style={styles.textTitle}>Số hộ chiếu</Text>
                            <TextInput
                                style={[styles.formPicker, { paddingLeft: 15 }]}
                                value={passportNumber}
                                onChangeText={setPassportNumber}
                            />
                        </View>
                        <View style={styles.col}>
                            <Text style={styles.textTitle}>Quốc gia cấp</Text>
                            <View style={styles.formPicker}>
                                <Picker
                                    selectedValue={selectedQuocGia}
                                    onValueChange={(itemValue) => setSelectedQuocGia(itemValue)}
                                >
                                    {listQuocGia.map((item, index) => (
                                        <Picker.Item key={index} label={item.label} value={item.value} style={styles.textPicker} />
                                    ))}
                                </Picker>
                            </View>
                        </View>

                    </View>
                    <View style={styles.rowBe}>

                        <View style={styles.col}>
                            <Text style={styles.textTitle}>Ngày hết hạn</Text>
                            <View style={styles.formPicker}>
                                <Pressable onPress={showDatePickerPP}>
                                    <View style={[styles.row, { alignContent: "center", paddingLeft: 15 }]}><AntDesign name="calendar" size={20} color="black" />
                                        <Text style={[styles.textPicker, { paddingLeft: 15 }]}>{datePP.toLocaleDateString()}</Text></View>
                                    {showPP && (
                                        <DateTimePicker
                                            value={datePP}
                                            mode="date" // Chỉ hiển thị ngày
                                            display="default" // Kiểu hiển thị của lịch (default, spinner, calendar)
                                            onChange={onChangePP}
                                        />
                                    )}
                                </Pressable>
                            </View>
                        </View>
                        <View style={styles.col}>
                            <Text style={styles.textTitle}>Quốc tịch</Text>
                            <View style={styles.formPicker}>
                                <Picker
                                    selectedValue={selectedQuocGia}
                                    onValueChange={(itemValue) => setSelectedQuocGia(itemValue)}
                                >
                                    {listQuocGia.map((item, index) => (
                                        <Picker.Item key={index} label={item.label} value={item.value} style={styles.textPicker} />
                                    ))}
                                </Picker>
                            </View>
                        </View>
                    </View>

                </View>
                

            </View>

        </ScrollView>
    );
};
const styles = StyleSheet.create({
    header: {
        backgroundColor: "#3FD0D4",
        marginBottom: 25,
    },
    textName: {
        fontSize: 20,
        fontWeight: "500",
        padding: 10,
        textAlign: 'center'
    },
    textTieuDe: {
        fontSize: 16,
        fontWeight: "500",
        paddingBottom: 5,
        paddingLeft: 5
    },
    textButton: {
        fontSize: 14,
        fontWeight: "500",
        color: "#3FD0D4"
    },
    textTitle: {
        fontSize: 13,
        fontWeight: "500",
        paddingLeft: 10,
        color: "#3FD0D4"
    },
    viewBox: {
        paddingTop: 10,
        padding: 10
    },
    box: {
        backgroundColor: "#fff",
        padding: 5
    },
    borderTop: {
        borderTopWidth: 0.5,
        borderColor: "#bbb"
    },
    rowBe: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between',
        padding: 8,
    },
    rowRight: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'flex-end',
        padding: 8,
    },
    row: {
        flexDirection: "row",
    },
    col: {
        flexDirection: "column",
        width: "48%",
    },
    textSelect: {
        fontSize: 12,
        fontWeight: "400",
        color: "#8C8C8C",
        paddingLeft: 8
    },
    textDetail: {
        fontSize: 12,
        fontWeight: "400",
        color: "#8C8C8C",
        fontStyle: "italic"
    },
    record: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between',
        padding: 8,
        marginLeft: 15,
        width: '85%',
        backgroundColor: "#EEEEEE",
        marginTop: 15,
        alignItems: "center"
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
    buttonHoanThanh: {
        height: 40,
        backgroundColor: "#3FD0D4",
        justifyContent: "center",
        width: 150,
        alignItems: "center",
        borderRadius: 10,
        marginRight: 10,
        fontWeight: 500,
    },
    textDat: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: "500",
        color: "white"

    },
})

export default FormEditPassenger;