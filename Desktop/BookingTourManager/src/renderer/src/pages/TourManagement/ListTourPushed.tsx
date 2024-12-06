// Import necessary hooks and components
import React, { useEffect, useRef, useState } from "react";
import MenuManagement from "../../components/Menu/MenuManagement";
import { Space, Table, Tag, Select, DatePicker, Card, Button, Pagination } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { EditTwoTone, EyeTwoTone, DeleteTwoTone } from '@ant-design/icons';
import type { TableColumnsType, TableProps } from 'antd';
type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];


interface Tour {
  id: string,
  url: string;
  price: string;
  originalPrice: string;
  title: string;
  ngayKhoiHanh: string;
  thoiGian: string;
  thoiTiet: string;
  soLuongVe: number;
  soVeDaDat: number;
  noiKhoiHanh: string;
  diemThamQuan: string;
  noiNghiNgoi: string;
  amThuc: string;
  phuongTien: string;
  ngayKetThuc: string;
  noiKetThuc: string;
  listAnh: string[];
  traiNghiem: string;
  chuongTrinh: { title: string; detail: string }[];
  thongTinTapTrung: { ngay: string; noi: string };
  thongTinHuongDanVien: { doan: string; tien?: string };
  dieuKien: {
    baoGom: string;
    khongBaoGom: string;
    giaveTreEm: string;
    huyTour: string;
    thanhToan: string;
  };
}

const { RangePicker } = DatePicker;
const dateFormat = 'DD/MM/YYYY';
const today: string = dayjs().format('DD/MM/YYYY');
dayjs.extend(customParseFormat);
const columns: TableColumnsType<Tour> = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: 'Tên Tour',
    dataIndex: 'title',
    key: 'title',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: 'Giá',
    dataIndex: 'price',
    key: 'price',
    render: (text: number) => {
      // Định dạng giá sử dụng Intl.NumberFormat
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(text);
    },
  },
  {
    title: 'Ngày Khởi Hành',
    dataIndex: 'ngayKhoiHanh',
    key: 'ngayKhoiHanh',
  },
  {
    title: 'Thời Gian',
    dataIndex: 'thoiGian',
    key: 'thoiGian',
  },
  {
    title: 'Số Lượng Vé',
    dataIndex: 'soLuongVe',
    key: 'soLuongVe',
  },
  {
    title: 'Số Vé Đã Đặt',
    dataIndex: 'soVeDaDat',
    key: 'soVeDaDat',
  },
  {
    title: '#',
    key: 'action',
    width: 140,
    render: (_, record: Tour) => (
      <div className="flex flex-col mt-[-8px] mb-[-8px]">
        <Space><EditTwoTone  twoToneColor="#3fd0d4" /><a>Cập nhật</a></Space>
        <Space><EyeTwoTone  twoToneColor="#3fd0d4"/><a>Chi tiết</a></Space>
      </div>
    ),
  },

];
// Functional component definition
const ListTourPushed: React.FC = () => {
  // State to hold the list of tours
  const dataSource = Array.from({ length: 46 }).map<Tour>((_, i) => ({
    key: i,
    id: "T000" + i,
    url: "https://res.cloudinary.com/doqbelkif/image/upload/v1726605863/968c81c7-7e7b-447c-962c-7f2c62af98c5.png",
    price: '6500000',
    originalPrice: '8500000',
    title: `Vịnh Hạ Long-Quảng Ninh ${i}`,
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
    ngayKetThuc: "08-09-2024",
    noiKetThuc: "Phú Quốc",
    listAnh: [
      "https://res.cloudinary.com/doqbelkif/image/upload/v1726605863/968c81c7-7e7b-447c-962c-7f2c62af98c5.png",
      "https://res.cloudinary.com/doqbelkif/image/upload/v1726605863/968c81c7-7e7b-447c-962c-7f2c62af98c5.png",
      "https://res.cloudinary.com/doqbelkif/image/upload/v1726605834/fb61f333-e383-44d1-b1d6-7727f04c7ad1.png"
    ],
    traiNghiem: "Nằm dọc vùng Duyên hải Nam Trung Bộ, Mũi Né là một thị trấn nghỉ dưỡng yên tĩnh, nổi tiếng với những bãi biển tuyệt đẹp...",
    chuongTrinh: [
      {
        title: "Phan Thiết- Nui Tà Cù",
        detail: "Đến với Bình Thuận Quý khách dừng chân và tham quan: + NÚI TÀ CÚ:..."
      },
      // Other items...
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
      baoGom: "Khách sạn: Phòng tiện nghi điều hoà...",
      khongBaoGom: "Bữa chính: 03 bữa sáng...",
      giaveTreEm: "Mỗi gia đình chỉ có tiêu chuẩn là 1 trẻ em...",
      huyTour: "+ Quy định hủy đối với ngày lễ, tết...",
      thanhToan: "Quý khách nộp hồ sơ và đặt cọc 50% chi phí dịch vụ..."
    }
  }));

  // const rowSelection: TableRowSelection<Tour> = {
  //   selectedRowKeys,
  //   onChange: onSelectChange,
  //   selections: [
  //     Table.SELECTION_ALL,
  //     Table.SELECTION_INVERT,
  //     Table.SELECTION_NONE,
  //     {
  //       key: 'odd',
  //       text: 'Select Odd Row',
  //       onSelect: (changeableRowKeys) => {
  //         let newSelectedRowKeys = [];
  //         newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
  //           if (index % 2 !== 0) {
  //             return false;
  //           }
  //           return true;
  //         });
  //         setSelectedRowKeys(newSelectedRowKeys);
  //       },
  //     },
  //     {
  //       key: 'even',
  //       text: 'Select Even Row',
  //       onSelect: (changeableRowKeys) => {
  //         let newSelectedRowKeys = [];
  //         newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
  //           if (index % 2 !== 0) {
  //             return true;
  //           }
  //           return false;
  //         });
  //         setSelectedRowKeys(newSelectedRowKeys);
  //       },
  //     },
  //   ],
  // };
  const loaiTour = [
    { value: 'mh', label: 'Mạo hiểm' },
    { value: 'tq', label: 'Tham quan' },
    { value: 'vh', label: 'Văn hóa' },
    { value: 'st', label: 'Sinh thái' },
    { value: 'nd', label: 'Nghỉ dưỡng' },
    { value: 'tb', label: 'Team building' },
  ]
  const vungMien = [
    { value: 'mb', label: 'Miền Bắc' },
    { value: 'mtr', label: 'Miền Trung' },
    { value: 'mt', label: 'Miền Tây' },
    { value: 'mn', label: 'Miền Nam' },
  ]
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const paginatedData = dataSource.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Return statement to render the UI
  return (
    <div className=" bg-white  text-black">
      <div className="mr-4 fixed top-6 left-6 "><MenuManagement initialVariable="listTourPushed" /></div>
      <div className=" w-[70%] fixed top-6 right-6 border border-spacing-1 rounded-xl border-[#3fd0d4] text-sm">
        <div className="flex flex-row justify-between " >
          <h3 className="text-xl font-bold pl-5 pt-2">Danh sách tour đã đăng</h3>
          <Space wrap className="mr-5">
            <Select
              defaultValue="mb"
              style={{ width: 120 }}
              options={vungMien}
            />
            <Select
              defaultValue="mh"
              style={{ width: 120 }}
              options={loaiTour}
            />
            <RangePicker
              defaultValue={[dayjs(today, dateFormat), dayjs(today, dateFormat)]}
              format={dateFormat}
            />
          </Space></div>
        <Card
          className="w-full max-h-[500px] overflow-y-scroll mb-2 border-none" >
          <Table<Tour> columns={columns} dataSource={paginatedData} pagination={false} />

        </Card>
        {/* <Button type="primary" >Đăng Tour</Button> */}
        <Pagination
          className="fixed bottom-12 right-12"
          current={currentPage}
          pageSize={pageSize}
          total={dataSource.length}
          onChange={handlePageChange} // Xử lý khi thay đổi trang
          showSizeChanger={false} // Ẩn dropdown thay đổi số lượng bản ghi trên mỗi trang
        />
      </div>
    </div>
  );
}

export default ListTourPushed;
