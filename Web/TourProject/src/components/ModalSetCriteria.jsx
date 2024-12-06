import { useEffect, useRef, useState } from "react";
import {
  Button,
  Cascader,
  Checkbox,
  Col,
  ColorPicker,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Rate,
  Row,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
  Modal,
  Typography,
} from "antd";
import { FaPlane } from "react-icons/fa";
const { Text } = Typography;
import { CaretRightOutlined } from "@ant-design/icons";
const { RangePicker } = DatePicker;
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
import { useUser } from "../contexts/UserContext";
import { addPreference } from "../services/api";
const ModalSetCriteria = ({ visible, onClose, onSubmit }) => {
  const [formValues, setFormValues] = useState({
    maxCost: 6000000,
    maxDuration: 0,
    startDate: dayjs().format("YYYY-MM-DD"),
  });

  const maxCosts = [
    { value: 4000000, label: "Dưới 4.000.000 đ" },
    { value: 5000000, label: "Dưới 5.000.000 đ" },
    { value: 6000000, label: "Dưới 6.000.000 đ" },
    { value: 7000000, label: "Dưới 7.000.000 đ" },
    { value: 8000000, label: "Dưới 8.000.000 đ" },
  ];

  const typeTours = [
    { value: "SPORT", label: "Mạo hiểm" },
    { value: "DISCOVER", label: "Tham quan" },
    { value: "CULTURE", label: "Văn hóa" },
    { value: "ECOLOGY", label: "Sinh thái" },
    { value: "RESORT", label: "Nghỉ dưỡng" },
    { value: "ENTERTAINMENT", label: "Giải trí" },
  ];
  const regions = [
    { value: "NORTH", label: "Miền Bắc" },
    { value: "CENTRAL", label: "Miền Trung" },
    { value: "SOUTH", label: "Miền Nam" },
  ];
  const transportationModes = [
    { value: "AIRPLANE", label: "Máy bay" },
    { value: "BUS", label: "Xe buýt" },
    { value: "PRIVATE_CAR", label: "Ô tô" },
    { value: "TRAIN", label: "Tàu hỏa" },
    { value: "SHIP", label: "Du thuyền" },
  ];
  const accommodationQualitys = [
    { value: "FIVE_STAR_HOTEL", label: "Khách sạn 5 sao" },
    { value: "FOUR_STAR_HOTEL", label: "Khách sạn 4 sao" },
    { value: "THREE_STAR_HOTEL", label: "Khách sạn 3 sao" },
    { value: "RESORT", label: "Resort" },
    { value: "HOMESTAY", label: "Homestay" },
  ];
  const departureLocations = [
    { value: "An Giang", label: "An Giang" },
    { value: "Bà Rịa - Vũng Tàu", label: "Bà Rịa - Vũng Tàu" },
    { value: "Bạc Liêu", label: "Bạc Liêu" },
    { value: "Bắc Kạn", label: "Bắc Kạn" },
    { value: "Bắc Giang", label: "Bắc Giang" },
    { value: "Bắc Ninh", label: "Bắc Ninh" },
    { value: "Bến Tre", label: "Bến Tre" },
    { value: "Bình Dương", label: "Bình Dương" },
    { value: "Bình Định", label: "Bình Định" },
    { value: "Bình Phước", label: "Bình Phước" },
    { value: "Bình Thuận", label: "Bình Thuận" },
    { value: "Cà Mau", label: "Cà Mau" },
    { value: "Cao Bằng", label: "Cao Bằng" },
    { value: "Cần Thơ", label: "Cần Thơ" },
    { value: "Đà Nẵng", label: "Đà Nẵng" },
    { value: "Đắk Lắk", label: "Đắk Lắk" },
    { value: "Đắk Nông", label: "Đắk Nông" },
    { value: "Điện Biên", label: "Điện Biên" },
    { value: "Đồng Nai", label: "Đồng Nai" },
    { value: "Đồng Tháp", label: "Đồng Tháp" },
    { value: "Gia Lai", label: "Gia Lai" },
    { value: "Hà Giang", label: "Hà Giang" },
    { value: "Hà Nam", label: "Hà Nam" },
    { value: "Hà Nội", label: "Hà Nội" },
    { value: "Hà Tĩnh", label: "Hà Tĩnh" },
    { value: "Hải Dương", label: "Hải Dương" },
    { value: "Hải Phòng", label: "Hải Phòng" },
    { value: "Hậu Giang", label: "Hậu Giang" },
    { value: "Hòa Bình", label: "Hòa Bình" },
    { value: "Hưng Yên", label: "Hưng Yên" },
    { value: "Khánh Hòa", label: "Khánh Hòa" },
    { value: "Kiên Giang", label: "Kiên Giang" },
    { value: "Kon Tum", label: "Kon Tum" },
    { value: "Lai Châu", label: "Lai Châu" },
    { value: "Lâm Đồng", label: "Lâm Đồng" },
    { value: "Lạng Sơn", label: "Lạng Sơn" },
    { value: "Lào Cai", label: "Lào Cai" },
    { value: "Long An", label: "Long An" },
    { value: "Nam Định", label: "Nam Định" },
    { value: "Nghệ An", label: "Nghệ An" },
    { value: "Ninh Bình", label: "Ninh Bình" },
    { value: "Ninh Thuận", label: "Ninh Thuận" },
    { value: "Phú Thọ", label: "Phú Thọ" },
    { value: "Phú Yên", label: "Phú Yên" },
    { value: "Quảng Bình", label: "Quảng Bình" },
    { value: "Quảng Nam", label: "Quảng Nam" },
    { value: "Quảng Ngãi", label: "Quảng Ngãi" },
    { value: "Quảng Ninh", label: "Quảng Ninh" },
    { value: "Quảng Trị", label: "Quảng Trị" },
    { value: "Sóc Trăng", label: "Sóc Trăng" },
    { value: "Sơn La", label: "Sơn La" },
    { value: "Tây Ninh", label: "Tây Ninh" },
    { value: "Thái Bình", label: "Thái Bình" },
    { value: "Thái Nguyên", label: "Thái Nguyên" },
    { value: "Thanh Hóa", label: "Thanh Hóa" },
    { value: "Thừa Thiên Huế", label: "Thừa Thiên Huế" },
    { value: "Tiền Giang", label: "Tiền Giang" },
    { value: "Hồ Chí Minh", label: "TP Hồ Chí Minh" },
    { value: "Trà Vinh", label: "Trà Vinh" },
    { value: "Tuyên Quang", label: "Tuyên Quang" },
    { value: "Vĩnh Long", label: "Vĩnh Long" },
    { value: "Vĩnh Phúc", label: "Vĩnh Phúc" },
    { value: "Yên Bái", label: "Yên Bái" },
  ];

  const handleChange = (key, value) => {
    setFormValues((prevValues) => {
      // Cập nhật giá trị trong formValues
      const updatedValues = { ...prevValues, [key]: value };

      // Kiểm tra nếu trường được thay đổi là 'departureLocation', thêm trường mới và gán giá trị là value
      if (key === "departureLocation") {
        updatedValues.departureLocation = value;
      }

      if (key === "typeTour") {
        updatedValues.typeTour = value; // Gán giá trị của typeTour cho trường mới
      }
      if (key === "accommodationQuality") {
        updatedValues.accommodation = value; // Gán giá trị của accommodationQuality cho trường mới
      }
      if (key === "region") {
        updatedValues.region = value; // Gán giá trị của region cho trường mới
      }
      if (key === "transportationMode") {
        updatedValues.transportationMode = value; // Gán giá trị của transportationMode cho trường mới
      }

      return updatedValues;
    });
  };

  const handleRangePickerChange = (dates, dateStrings) => {
    if (dates) {
      const startDate = dates[0];
      const endDate = dates[1];

      const maxDuration = endDate.diff(startDate, "day");

      // Cập nhật lại formValues với startDate, endDate và maxDuration
      setFormValues({
        ...formValues,
        startDate: startDate.format("YYYY-MM-DD"),
        maxDuration: maxDuration,
      });
    } else {
      // Nếu người dùng xóa giá trị, đặt lại startDate và endDate về mặc định
      setFormValues({
        ...formValues,
        startDate: dayjs(),
        maxDuration: 0,
      });
    }
  };

  const dateFormat = "DD/MM/YYYY";
  const today = dayjs().format("DD/MM/YYYY");
  dayjs.extend(customParseFormat);


  const submit =  () => {
    onSubmit(formValues); // Gửi giá trị lên ListTour
    setFormValues({
      maxCost: 6000000,
      maxDuration: 0,
      startDate: dayjs().format("YYYY-MM-DD"),
    });
    onClose(); // Đóng modal
  };

  const handleCloseModal = () => {
    setFormValues({
      maxCost: 6000000,
      maxDuration: 0,
      startDate: dayjs().format("YYYY-MM-DD"),
    });
    onClose(); // Gọi hàm từ props để đóng modal
  };

  return (
    <>
      {visible && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg">
            <Modal
              title={
                <div className="text-xl font-bold">Thiết lập tiêu chí</div>
              }
              open={visible}
              onCancel={handleCloseModal}
              footer={null}
              width={"60%"}
              style={{
                borderRadius: 30,
              }}
            >
              <Form
                labelCol={{ span: 40 }}
                layout="vertical"
                wrapperCol={{ span: 24 }}
                className="w-full mt-10 p-2"
                initialValues={formValues}
              >
                <Row className="pr-6 justify-between">
                  <Col span={11}>
                    <Form.Item
                      label="Vùng miền"
                      name="region"
                      className="custom-border"
                      rules={[{ required: true }]}
                    >
                      <Select
                        value={formValues.region}
                        defaultValue={formValues.region}
                        onChange={(value) => handleChange("region", value)}
                        options={regions}
                        style={{ height: 40 }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={11}>
                    <Form.Item
                      label="Địa điểm khởi hành"
                      name="departureLocation"
                      className="custom-border"
                      rules={[{ required: true }]}
                    >
                      <Select
                        value={formValues.departureLocation}
                        defaultValue={formValues.departureLocation}
                        onChange={(value) =>
                          handleChange("departureLocation", value)
                        }
                        options={departureLocations}
                        style={{ height: 40 }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row className="pr-6 justify-between">
                  <Col span={11}>
                    <Form.Item
                      label="Chọn khoảng thời gian"
                      className="custom-border"
                      rules={[{ required: true }]}
                    >
                      <RangePicker
                        defaultValue={[
                          dayjs(today, dateFormat),
                          dayjs(today, dateFormat),
                        ]}
                        format={dateFormat}
                        onChange={handleRangePickerChange}
                        style={{ height: 40, width: "100%" }}
                        className="rounded-md"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={11}>
                    <Form.Item
                      label="Loại tour"
                      name="typeTour"
                      className="custom-border"
                      rules={[{ required: true }]}
                    >
                      <Select
                        value={formValues.typeTour}
                        defaultValue={formValues.typeTour}
                        onChange={(value) => handleChange("typeTour", value)}
                        options={typeTours}
                        style={{ height: 40 }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row className="pr-6 justify-between">
                  <Col span={11}>
                    <Form.Item
                      label="Chất lượng chổ ở"
                      name="accommodationQuality"
                      className="custom-border"
                      rules={[{ required: true }]}
                    >
                      <Select
                        value={formValues.accommodationQuality}
                        defaultValue={formValues.accommodationQuality}
                        onChange={(value) =>
                          handleChange("accommodationQuality", value)
                        }
                        options={accommodationQualitys}
                        style={{ height: 40 }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={11}>
                    <Form.Item
                      label="Phương tiện di chuyển"
                      name="transportationMode"
                      className="custom-border"
                      rules={[{ required: true }]}
                    >
                      <Select
                        value={formValues.transportationMode}
                        defaultValue={formValues.transportationMode}
                        onChange={(value) =>
                          handleChange("transportationMode", value)
                        }
                        options={transportationModes}
                        style={{ height: 40 }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row className="pr-6 justify-between">
                  <Col span={11}>
                    <Form.Item
                      label="Chọn giá tối đa"
                      className="custom-border"
                      name="maxCost"
                      rules={[{ required: true }]}
                    >
                      <Select
                        defaultValue={formValues.maxCost}
                        value={formValues.maxCost} // Truyền giá trị đã chọn vào Select
                        onChange={(value) => handleChange("maxCost", value)} // Cập nhật giá trị khi chọn
                        style={{ height: 40 }}
                        options={maxCosts}
                        className="rounded-md"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={11}>
                    <Form.Item label=" " className="custom-border">
                      <Button
                        className=" bg-[#3fd0d4] pr-5 pl-5 w-full h-[40px]"
                        typeTour="primary"
                        onClick={submit}
                      >
                        <span className="font-bold text-white text-lg">
                          XÁC NHẬN
                        </span>
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Modal>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalSetCriteria;
