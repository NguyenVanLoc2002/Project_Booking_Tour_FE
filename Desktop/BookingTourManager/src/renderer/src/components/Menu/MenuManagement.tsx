import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

type MenuItem = Required<MenuProps>['items'][number];
const items: MenuItem[] = [
  { key: 'users', label: 'Tài khoản và bảo mật' ,children: [
    { key: 'info', label: 'Thông tin cá nhân' },
    { key: 'logout', label: 'Đăng xuất' },
  ],},
  {
    key: 'tours', label: 'Quản lý tour', children: [
      { key: 'dsTour', label: 'Danh sách tour' },
      { key: 'listTourPushed', label: 'Danh sách tour đã đăng' },
      { key: 'taoTour', label: 'Tạo tour' },
    ],
  },
  {
    key: 'thongKe',
    label: 'Thống kê',
    children: [
      { key: 'tkDoanhThu', label: 'Thống kê doanh thu' },
      { key: 'tkTour', label: 'Thống kê tour' },
    ],
  }
];


interface User {
  name: string;
  url: string;
  gioiTinh: number;
  ngaySinh: string;
  email: string;
  phone: string;
  city: string;
}

interface MenuManagementProps {
  initialVariable: string;
}

// const MenuManagement: React.FC = () => {
  const MenuManagement: React.FC<MenuManagementProps> = ({ initialVariable }) => {
  const user: User = {
    name: "Bao Truc",
    url: "https://res.cloudinary.com/doqbelkif/image/upload/v1727453521/e015a22e-fa11-4f2c-86bf-322445d957ea.png",
    gioiTinh: 1,
    ngaySinh: "06/05/2002",
    email: "baotruc123@gmail.com",
    phone: "0338030541",
    city: "Hồ Chí Minh",
  };
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick = (key: string) => {
    switch (key) {
      case 'listTourPushed':
        navigate('/listTourPushed'); // Điều hướng đến trang Đăng tour
        break;
      case 'taoTour':
        navigate('/createTour'); // Điều hướng đến trang Tạo tour
        break;
      case 'dsTour':
        navigate('/listTour'); // Điều hướng đến trang Danh sách tour
        break;
      default:
        break;
    }
  };

  return (
    <div className='border border-spacing-1 pb-2 rounded-xl border-[#3fd0d4] '>
      <div className="flex items-center pb-2 pl-2">
        <img
          alt="User avatar"
          className="rounded-full"
          height="50"
          src={user.url}
          width="50"
        />
        <div>
          <div className="pl-4 font-bold">{user.name}</div>
          <div className="pl-4 text-gray-400 font-normal pr-4">
            {user.email}
          </div>
        </div>
      </div>

      <div style={{ width: 256 }}>
        <Menu
          defaultSelectedKeys={[initialVariable]}
          // selectedKeys={[selectedKey]} 
          defaultOpenKeys={['tours']}
          mode="inline"
          inlineCollapsed={collapsed}
          items={items}
          onClick={({ key }) => handleMenuClick(key)}
        />

      </div>
    </div>
  );
};

export default MenuManagement;
