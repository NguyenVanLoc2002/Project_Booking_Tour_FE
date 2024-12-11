import { useEffect, useRef, useState } from "react";
import { CiMail } from "react-icons/ci";
import { FaPhone, FaYoutube } from "react-icons/fa6";
import {
  FaFacebook,
  FaMapMarkerAlt,
  FaRegEyeSlash,
  FaRegEye,
} from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { Modal, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../contexts/UserContext";

function Header() {
  const navigate = useNavigate();
  const [isOpenLogin, setIsOpenLogin] = useState(false);

  const openModalLogin = () => setIsOpenLogin(true);
  const closeModalLogin = () => setIsOpenLogin(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);

  const openModalRegister = () => setIsOpenRegister(true);
  const closeModalRegister = () => setIsOpenRegister(false);
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [day, setDay] = useState(1);
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(new Date().getFullYear()); // Mặc định là năm hiện tại
  const [gender, setGender] = useState(0); // 0: Nữ, 1: Nam, 2: Khác
  const { login, user, logout } = useUser();
  const years = [];
  for (let i = 1900; i <= new Date().getFullYear(); i++) {
    years.push(i);
  }

  // Hàm để tính số ngày trong tháng đã chọn
  const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate(); // Ngày cuối cùng của tháng
  };

  // Cập nhật số ngày khi chọn tháng hoặc năm
  const handleMonthChange = (e) => {
    setMonth(parseInt(e.target.value));
    setDay(1); // Reset ngày về 1 khi tháng thay đổi
  };

  const handleYearChange = (e) => {
    setYear(parseInt(e.target.value));
    setDay(1); // Reset ngày về 1 khi năm thay đổi
  };

  const handleRefreshDataRegister = () => {
    setEmail("");
    setName("");
    setDay(1);
    setMonth(1);
    setYear(new Date().getFullYear());
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của form
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      alert("Vui lòng nhập email hợp lệ.");
      return;
    }

    if (!name) {
      alert("Vui lòng điền đầy đủ họ và tên!");
      return;
    }
    const dateOfBirth = `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`;
    // Tính tuổi từ ngày sinh
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    // Kiểm tra tuổi
    if (age < 18) {
      alert("Bạn phải từ 18 tuổi trở lên để đăng ký.");
      return; // Dừng lại nếu không đủ tuổi
    }

    if (!email || !name) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    const data = {
      email,
      name,
      address: "",
      gender: gender === 0 ? false : true,
      dateOfBirth,
      phoneNumber: "",
    };
    console.log(data);

    try {
      const response = await axios.post(
        "https://travelvietnam.io.vn/api/v1/customers/addCustomer",
        data
      );
      console.log("Đăng ký thành công:", response.data);
      if (response.status === 201) {
        Modal.success({
          content: "Bạn vui lòng kiểm tra email để xác thực tài khoản.",
        });
        closeModalRegister();
        handleRefreshDataRegister();
      }
    } catch (error) {
      console.error("Đăng ký thất bại:", error);
      if (error.response && error.response.status === 400) {
        Modal.error({
          content: "Tài khoản đã tồn tại.",
        });
        handleRefreshDataRegister();
      }
    }
  };

  // Đọc tham số từ URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const emailFromUrl = urlParams.get("email");
    const passwordFromUrl = urlParams.get("password");

    if (emailFromUrl && passwordFromUrl) {
      setEmail(emailFromUrl);
      setPassword(passwordFromUrl);
      openModalLogin();
    }
  }, []);

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      // Gọi hàm login từ context
      await login(email, password);

      const newUrl =
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname;
      window.history.replaceState({ path: newUrl }, "", newUrl);

      closeModalLogin();
      handleRefreshDataLogin();
    } catch (error) {
      console.error("Đăng nhập không thành công:", error);
      message.error("Tài khoản hoặc mật khẩu không đúng!")
    }
  };

  const handleRefreshDataLogin = () => {
    setEmail("");
    setPassword("");
  };

  const handleLogout = () => {
    logout(); // Gọi hàm logout từ context
    navigate("/");
  };

  // Hàm để toggle giữa hiển thị và ẩn mật khẩu
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGenderChange = (e) => {
    setGender(parseInt(e.target.value));
  };

  const handleNavigateAccount = () => {
    navigate("/Account");
  };

  const handleNavigateSavedTour = () => {
    navigate("/savedTour"); // Điều hướng đến trang khác
  };

  return (
    <div className="hidden md:flex w-full bg-black text-white text-sm">
      <div className="flex flex-1 items-center p-3">
        <div className="flex flex-wrap justify-center items-center space-x-4 md:space-x-7 mb-2 md:mb-0">
          <div className="flex items-center">
            <CiMail size={20} color="#3fd0d4" />
            <p className="ml-2 text-xs md:text-sm">contact@demo.com</p>
          </div>
          <div className="flex items-center">
            <FaPhone size={16} color="#3fd0d4" />
            <p className="ml-2 text-xs md:text-sm">01234567</p>
          </div>
          <div className="flex items-center">
            <FaMapMarkerAlt size={18} color="#3fd0d4" />
            <p className="ml-2 text-xs md:text-sm">
              Số 123 Đường Phan Chu Trinh, Quận 10, TP.HCM
            </p>
          </div>
        </div>
        <div className="flex space-x-4 mt-2 md:mt-0 ml-auto">
          <FaYoutube size={20} className="hover:text-[#3fd0d4]" />
          <FaFacebook size={18} className="hover:text-[#3fd0d4]" />
        </div>
      </div>
      <li className="relative dropdown dropdown-hover">
        <button className="flex items-center bg-customColor p-3">
          <RxAvatar size={28} />
        </button>
        <ul
          tabIndex="0"
          className="dropdown-content menu bg-slate-200 rounded-box z-[1] shadow text-gray-600 right-0 min-w-[150px] w-max"
        >
          {user ? (
            <div className="flex flex-col space-y-4">
              <li>
                <button
                  className="whitespace-nowrap"
                  onClick={handleNavigateAccount}
                >
                  Thông tin cá nhân
                </button>
              </li>
              <li>
                <button
                  className="whitespace-nowrap"
                  onClick={handleNavigateSavedTour}
                >
                  Danh sách yêu thích
                </button>
              </li>
              <li>
                <button className="whitespace-nowrap" onClick={handleLogout}>
                  Đăng xuất
                </button>
              </li>
            </div>
          ) : (
            <div className="flex flex-col space-y-4">
              <li>
                <button onClick={openModalRegister}>Đăng ký</button>
              </li>
              <li>
                <button onClick={openModalLogin}>Đăng nhập</button>
              </li>
            </div>
          )}
        </ul>
      </li>

      <Modal
        open={isOpenRegister}
        onOk={closeModalRegister}
        onCancel={closeModalRegister}
        footer={null}
        zIndex={1000} // Đảm bảo modal có z-index cao hơn các phần tử khác
        class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full "
      >
        <h1 className="text-2xl font-bold text-center mb-2">ĐĂNG KÝ</h1>
        <p className="text-center mb-8 font-semibold pl-8 pr-8">
          Chúng tôi sẽ gửi một email xác nhận về tài khoản email mà bạn cung
          cấp, hãy xác nhận để hoàn tất quá trình đăng ký
        </p>
        {/* <form > */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-lg max-w-md w-full mb-6">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-textColorCustom rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Nhập email của bạn"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Họ và tên <span className="text-red-500">*</span>
            </label>
            <input
              type="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-textColorCustom rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Nhập họ tên của bạn"
            />
          </div>

          <div className="flex justify-between items-center mb-4">
            <div className="w-24">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Năm sinh
              </label>
              <select
                value={year}
                onChange={handleYearChange}
                className="block w-full border border-textColorCustom rounded p-2"
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-24">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Tháng sinh
              </label>
              <select
                value={month}
                onChange={handleMonthChange}
                className="block w-16 border border-textColorCustom rounded p-2 "
              >
                {[...Array(12).keys()].map((m) => (
                  <option key={m + 1} value={m + 1}>
                    {m + 1}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-16">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Ngày sinh
              </label>
              <select
                value={day}
                onChange={(e) => setDay(parseInt(e.target.value))}
                className="block w-16 border border-textColorCustom rounded p-2"
              >
                {[...Array(getDaysInMonth(month, year)).keys()].map((d) => (
                  <option key={d + 1} value={d + 1}>
                    {d + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Giới tính
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value={0}
                  checked={gender === 0}
                  onChange={handleGenderChange}
                  className="mr-2"
                />
                Nữ
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value={1}
                  checked={gender === 1}
                  onChange={handleGenderChange}
                  className="mr-2"
                />
                Nam
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value={2}
                  checked={gender === 2}
                  onChange={handleGenderChange}
                  className="mr-2"
                />
                Khác
              </label>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-2/3 bg-customColor text-white py-2 rounded-md text-lg font-medium hover:bg-teal-600"
              onClick={handleSubmitRegister}
            >
              ĐĂNG KÝ
            </button>
          </div>
        </div>

        {/* </form> */}
        <p className="text-center mt-4">
          Bạn đã có tài khoản?{" "}
          <button
            onClick={() => {
              setIsOpenLogin(true);
              setIsOpenRegister(false);
            }}
          >
            <a href="#" className="text-teal-500 font-medium">
              Đăng nhập ngay
            </a>
          </button>
        </p>
        <p className=" mt-8 text-center text-sm font-semibold">
          Bằng cách đăng ký, bạn đồng ý với Điều khoản & Điều kiện của chúng tôi
          và bạn đã đọc chính sách về quyền riêng tư của chúng tôi.
        </p>
      </Modal>

      <Modal
        open={isOpenLogin}
        onOk={closeModalLogin}
        onCancel={closeModalLogin}
        footer={null}
        zIndex={1000} // Đảm bảo modal có z-index cao hơn các phần tử khác
        class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full "
      >
        <h1 className="text-2xl font-bold text-center mb-2">ĐĂNG NHẬP</h1>
        <p className="text-center mb-8 font-semibold pl-8 pr-8">
          Tận hưởng những chuyến đi tuyệt vời và hấp dẫn cùng với LuckyPanda
          Travel
        </p>
        <form>
          <div className="bg-gray-100 p-4 rounded-lg shadow-lg max-w-md w-full mb-6">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-textColorCustom rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Nhập email của bạn"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Mật khẩu <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-textColorCustom rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Mật khẩu"
                />
                <span
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <FaRegEyeSlash size={18} color="#3fd0d4" /> // Icon mắt đóng nếu mật khẩu đang hiển thị
                  ) : (
                    <FaRegEye size={18} color="#3fd0d4" /> // Icon mắt mở nếu mật khẩu đang ẩn
                  )}
                </span>
              </div>
            </div>
            <div className="flex justify-end items-center ">
              <a href="#" className="text-sm text-gray-500">
                Bạn quên mật khẩu?
              </a>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-2/3 bg-customColor text-white py-2 rounded-md text-lg font-medium hover:bg-teal-600"
              onClick={handleSubmitLogin}
            >
              ĐĂNG NHẬP
            </button>
          </div>
        </form>

        <p className="text-center mt-4">
          Bạn chưa có tài khoản?{" "}
          <button
            onClick={() => {
              setIsOpenRegister(true);
              setIsOpenLogin(false);
            }}
          >
            <a href="#" className="text-teal-500 font-medium">
              Đăng ký ngay
            </a>
          </button>
        </p>
      </Modal>
    </div>
  );
}

export default Header;
