// Import necessary hooks and components
import React, { useEffect, useRef, useState } from "react";
import MenuManagement from "../../components/Menu/MenuManagement";
import { Space, Table, Tag, Select, DatePicker, Card } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { EditTwoTone, EyeTwoTone, DeleteTwoTone } from '@ant-design/icons';
import type { TableProps } from 'antd';
import ModalCreateInfo from "./component/ModalCreateInfoTour";


interface Tour {
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
const columns: TableProps<Tour>['columns'] = [
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
        title: 'Hành Động',
        key: 'action',
        render: (_, record: Tour) => (
            <div className="flex flex-col mt-[-8px] mb-[-8px]">
                <Space><EditTwoTone color="#3fd0d4" /><a>Cập nhật</a></Space>
                <Space><DeleteTwoTone color="#3fd0d4" /><a>Xóa</a></Space>
                <Space><EyeTwoTone color="#3fd0d4" /><a>Chi tiết</a></Space>
            </div>
        ),
    },
];
// Functional component definition
const CreateTour: React.FC = () => {
    return (
        <div className=" bg-white  text-black text-base">
            <div className="mr-4 fixed top-6 left-6"><MenuManagement initialVariable="taoTour" /></div>
            <div className=" fixed top-6 right-6 w-[70%] h-[80vh]">
                {/* <Card className=" fixed top-6 right-6 w-[70%] border border-spacing-1 max-h-[550px]  overflow-y-scroll rounded-xl border-[#3fd0d4]"> */}
                {/* <Card className="w-full max-h-[500px] overflow-y-scroll mb-2 border-none" > */}
                <ModalCreateInfo></ModalCreateInfo>
                {/* </Card> */}
            </div>
            {/* </Card> */}
        </div >
    );
}

// Export the component
export default CreateTour;
