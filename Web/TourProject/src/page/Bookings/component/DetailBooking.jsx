import { Modal, Typography, Divider, Table } from "antd";
import logoText from "../../../assets/logo_Text.jpg";
import { FaPlane } from "react-icons/fa";
const { Text } = Typography;
import { CaretRightOutlined } from "@ant-design/icons";

const DetailBooking = ({ visible, onClose, data }) => {
  const columns = [
    {
      title: "Tên hành khách",
      dataIndex: "userName",
      key: "userName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Trạng thái đặt chỗ",
      dataIndex: "statusBooking",
      key: "statusBooking",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Giá",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (totalAmount) => {
        return totalAmount ? formatCurrency(totalAmount) : "Chưa xác định";
      },
    },
  ];

  // Convert currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0"); // Lấy ngày và đảm bảo có 2 chữ số
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Lấy tháng (tháng 0 bắt đầu từ 0)
    const year = date.getFullYear(); // Lấy năm
    return `${day}/${month}/${year}`; // Trả về định dạng "dd/mm/yyyy"
  };

  return (
    <Modal
      title="Thông tin đặt chỗ"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <div className="flex justify-end">
        <Text strong>
          <Text className="text-lg">{data.tourDTO?.name}, Việt Nam</Text>
        </Text>
      </div>
      <Divider style={{ marginBottom: -15 }} />
      <div className="flex justify-between items-center">
        <Text strong>
          Mã đặt chỗ:{" "}
          <Text code className="text-lg">
            {data.bookingDTO?.bookingId}
          </Text>
        </Text>
        <div className="w-full md:w-[15%]">
          <img src={logoText} alt="Logo" className="w-[120px] h-auto" />
        </div>
      </div>
      <Divider style={{ marginTop: -15 }} />

      <div className="flex">
        <FaPlane size={32} />
        <div className="flex flex-col mr-4 ml-4 mb-4">
          <Text className="text-lg font-bold">
            KHỞI HÀNH: {formatDate(data?.tourDTO?.departureDate)}
          </Text>
          <Text>
            Quý khách vui lòng kiểm tra thời gian bay trước khi khởi hành
          </Text>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="flex flex-col p-4 bg-slate-300">
          <Text className="text-lg ">{data.tourDTO?.departureLocation}</Text>
          <Text className="text-lg font-bold pb-2">{data.tourDTO?.name}</Text>
          <Text>
            Ngày khởi hành: {formatDate(data?.tourDTO?.departureDate)}
          </Text>
        </div>

        <div className="bg-white flex flex-row border-l border-r border-gray-300">
          <div className="flex flex-col border-l border-r border-gray-300">
            <div className="flex justify-between text-lg font-bold border-t border-b border-gray-300 p-4">
              <Text>{data.tourDTO?.departureLocation}</Text>
              <CaretRightOutlined />
              <Text>{data.tourDTO?.destination}</Text>
            </div>
            <div className="flex flex-row text-lg font-bold border-b border-gray-300 w-80">
              <div
                className="flex flex-col text-lg font-bold border-r p-4 border-gray-300"
                style={{ width: "calc(50% - 2px)" }}
              >
                <Text>Giờ khởi hành</Text>
                <Text className="text-2xl font-bold">10:00h</Text>
              </div>
              <div
                className="flex flex-col text-lg font-bold p-4"
                style={{ width: "calc(50% - 2px)" }}
              >
                <Text>Giờ đến</Text>
                <Text className="text-2xl font-bold">14:00h</Text>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Table
          columns={columns}
          dataSource={[data?.bookingDTO]}
          pagination={false}
        />
      </div>
    </Modal>
  );
};

export default DetailBooking;
