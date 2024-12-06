import { useEffect, useRef, useState } from "react";
import Header from "../../layouts/Header";
import Menu from "../../layouts/Menu";
import Footer from "../../layouts/Footer";
import DetailRefund from "./component/DetailRefund";
import { Button, Input, Space, Table, Tag } from "antd";
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, DeleteOutlined, SyncOutlined, EyeOutlined } from '@ant-design/icons';
function Bookings() {
  const [tabNameSelect, setTabNameSelect] = useState("all");
  const [textBookingId, setTextBookingId] = useState("");
  const [textRefundId, setTextRefundId] = useState("");
  const [refundData, setRefundData] = useState({});

  const columns = [
    {
      title: 'Mã hoàn tiền',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Mã đặt Tour',
      dataIndex: 'bookingId',
      key: 'bookingId',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Tên Tour',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Ngày Khởi Hành',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Ngày hủy',
      dataIndex: 'dateCancel',
      key: 'dateCancel',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (text) => {
        // Định dạng giá sử dụng Intl.NumberFormat
        return new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND',
        }).format(text);
      },
    },
    {
      title: 'Số tiền hoàn',
      dataIndex: 'priceRefund',
      key: 'priceRefund',
      render: (text) => {
        // Định dạng giá sử dụng Intl.NumberFormat
        return new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND',
        }).format(text);
      },
    },
    {
      title: 'Trạng thái',
      key: 'status',
      dataIndex: 'status',
      render: (text) => (
        <>
          {
            text === "processing" ? (<Tag icon={<SyncOutlined spin />} color="processing">
              Đang xử lý
            </Tag>) : (
              <Tag icon={<CheckCircleOutlined />} color="cyan">
                Đã hoàn thành
              </Tag>
            )
          }
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'status',
      render: (text, record) => (
        <>    
              <div>
                <Button type="primary" icon={<EyeOutlined />} className="mr-2" onClick={() => { showModal(record) }}>
                  Xem chi tiết
                </Button>
              </div>
        </>
      ),
    },
  ];
  const dataRefund = [{
    id: "RF001",
    bookingId: "BK001",
    name: "Phú Quốc - Hà Giang",
    date: "18-12-2024",
    time: "06:20",
    price: 7000000,
    customerName: "TRAN BAO TRUC",
    priceRefund: 3500000,
    dateCancel: "12-12-2024",
    creditBank: "PayPal",
    creditNumber: "8903645719",
    status: "completed",
    transactionId:"1748284759203",
    percentRefund:50
  },
  {
    id: "RF002",
    bookingId: "BK002",
    name: "Phú Quốc - Hà Giang",
    date: "18-12-2024",
    time: "06:20",
    price: 7000000,
    customerName: "TRAN BAO TRUC",
    priceRefund: 3500000,
    dateCancel: "12-12-2024",
    expectedRefundDate: "14-12-2024",
    creditBank: "PayPal",
    creditNumber: "8903645719",
    status: "processing",
    percentRefund:50
  },
  {
    id: "RF003",
    bookingId: "BK003",
    name: "Phú Quốc - Hà Giang",
    date: "18-12-2024",
    time: "06:20",
    price: 7000000,
    customerName: "TRAN BAO TRUC",
    priceRefund: 3500000,
    dateCancel: "12-12-2024",
    expectedRefundDate: "14-12-2024",
    creditBank: "PayPal",
    creditNumber: "8903645719",
    status: "processing",
    percentRefund:50
  },
  {
    id: "RF004",
    bookingId: "BK004",
    name: "Phú Quốc - Hà Giang",
    date: "18-12-2024",
    time: "06:20",
    price: 7000000,
    customerName: "TRAN BAO TRUC",
    priceRefund: 3500000,
    dateCancel: "12-12-2024",
    creditBank: "PayPal",
    creditNumber: "8903645719",
    status: "completed",
    transactionId:"14145183745",
    percentRefund:50
  },
  {
    id: "RF005",
    bookingId: "BK004",
    name: "Phú Quốc - Hà Giang",
    date: "18-12-2024",
    time: "06:20",
    price: 8400000,
    customerName: "TRAN PHI PHAT",
    priceRefund: 2100000,
    dateCancel: "16-12-2024",
    creditBank: "PayPal",
    creditNumber: "8903645719",
    status: "completed",
    transactionId:"871487117478",
    percentRefund:25
  },
  ]
  const dataCompleted = dataRefund.filter(item => item.status === "completed");
  const dataProcessing = dataRefund.filter(item => item.status === "processing");
  const [isModalVisible, setIsModalVisible] = useState(false);



  const showModal = (record) => {

    setRefundData(record);
    setIsModalVisible(true);

  }
  const handleClose = () => setIsModalVisible(false);

  return (
    <>
      <div className="w-full h-full flex flex-col">
        <Header />
        <Menu />
        <body className="bg-gray-100">
          <DetailRefund
            visible={isModalVisible}
            onClose={handleClose}
            refundData={refundData}
          />
          <div className="w-full mx-auto p-4 bg-white shadow-md">
            <div className="flex  mb-8 text-base font-bold">
              <button
                className={
                  tabNameSelect == "all"
                    ? " text-textColorCustom px-4 py-2 border-l border-r border-t border-textColorCustom "
                    : " text-black px-4 py-2 border-b border-b-textColorCustom "
                }
                onClick={() => {
                  setTabNameSelect("all");
                }}
              >
                Tất cả
              </button>
              <button
                className={
                  tabNameSelect == "processing"
                    ? " text-textColorCustom px-4 py-2 border-l border-r border-t border-textColorCustom "
                    : " text-black px-4 py-2 border-b border-b-textColorCustom "
                }
                onClick={() => {
                  setTabNameSelect("processing");
                }}
              >
                Đang xử lý
              </button>
              <button
                className={
                  tabNameSelect == "completed"
                    ? " text-textColorCustom px-4 py-2 border-l border-r border-t border-textColorCustom "
                    : " text-black px-4 py-2 border-b border-b-textColorCustom "
                }
                onClick={() => {
                  setTabNameSelect("completed");
                }}
              >
                Đã hoàn tiền
              </button>
            </div>
            {tabNameSelect == "all" ? (
              <div>
                <div className="flex">
                  <Input
                    placeholder="Mã hoàn tiền"
                    value={textRefundId}
                    onChange={(e) => setTextRefundId(e.target.value)}
                    className="rounded-xl h-10 mr-2  text-base" style={{ width: 300 }}
                  />
                  <Input
                    placeholder="Mã đặt tour"
                    value={textBookingId}
                    onChange={(e) => setTextBookingId(e.target.value)}
                    className="rounded-xl h-10 mr-2  text-base required:" style={{ width: 500 }}
                  />
                  <Button type="primary" className="rounded-xl h-10 pl-8 pr-8 font-bold mr-2 bg-customColor text-lg ">Tìm kiếm</Button>
                </div>
                <Table columns={columns} dataSource={dataRefund} className="mt-8" pagination={{ pageSize: 5 }} />
              </div>
            ) : (
              <div>
                {tabNameSelect == "processing" ? (
                  <Table columns={columns} dataSource={dataProcessing} pagination={{ pageSize: 5 }} />
                ) : (
                  <div>
                    <Table columns={columns} dataSource={dataCompleted} pagination={{ pageSize: 5 }} />
                  </div>
                )}
              </div>
            )}
          </div>
        </body>
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

export default Bookings;
