import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Header from "../../layouts/Header";
import Menu from "../../layouts/Menu";
import Footer from "../../layouts/Footer";
import ModalSetCriteria from "../../components/ModalSetCriteria";
import { useUser } from "../../contexts/UserContext";
import { changePassword, updateInfomation } from "../../services/api";
import { message } from "antd";
import ChatBot from "../../layouts/ChatBot";

function Account() {
  const { user } = useUser();
  const token = localStorage.getItem("token");

  const [isDisabled, setIsDisabled] = useState(true);
  const [gender, setGender] = useState(false);
  const [email, setEmail] = useState(user?.name ? user.name : "");
  const [name, setName] = useState(user?.name ? user.name : "");
  const [address, setAddress] = useState(user?.address ? user.address : "");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [isInfoAccount, setIsInfoAccount] = useState(true);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isChangePassword, setIsChangePassword] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setGender(user.gender);
      setAddress(user.address);
      setPhoneNumber(user.phoneNumber);

      const dateOfBirthDate = new Date(user.dateOfBirth);
      setDay(dateOfBirthDate.getDate()); // Lấy ngày
      setMonth(dateOfBirthDate.getMonth() + 1); // Lấy tháng (tháng bắt đầu từ 0, nên cộng thêm 1)
      setYear(dateOfBirthDate.getFullYear()); // Lấy năm
    }
  }, [user]);

  console.log("DAY: ", day);

  // Modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
    console.log("hihi show modal");
  };

  const showFormChangePassword = () => {
    setIsChangePassword(true);
  };

  const handleCancelChangePW = () => {
    setIsChangePassword(false);
    setNewPassword("");
    setRePassword("");
    setOldPassword("");
  };
  const handleClose = () => setIsModalVisible(false);

  const handleFormat = () => {
    setIsDisabled(false);
  };
  const handleIsInfo = () => {
    setIsInfoAccount(true);
  };
  const handleSecure = () => {
    setIsInfoAccount(false);
  };

  const handleCancle = () => {
    setIsDisabled(true);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from({ length: 124 }, (_, i) => 1900 + i).reverse();
  const daysInMonth = month
    ? getDaysInMonth(month, year || new Date().getFullYear())
    : 31;
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handleUpdateInfo = async () => {
    const formatWithLeadingZero = (number) => {
      return number < 10 ? `0${number}` : number;
    };
    const date = `${year}-${formatWithLeadingZero(
      month
    )}-${formatWithLeadingZero(day)}`;
    try {
      await updateInfomation(
        user.userId,
        name,
        address,
        date,
        gender,
        phoneNumber,
        token
      );
      setIsDisabled(true);
    } catch (error) {
      console.error("Error updating user data:", error);
      message.error("Lỗi khi cập nhật thông tin. Vui lòng thử lại!");
    }
  };

  const handleChangePassword = async () => {
    try {
      // Kiểm tra đầu vào nếu cần
      if (!oldPassword || !newPassword || !user?.email) {
        message.error("Vui lòng điền đầy đủ thông tin!");
        return;
      }

      if (newPassword != rePassword) {
        message.error("Mật khẩu xác nhận mới không khớp!");
        return;
      }

      // Gọi API đổi mật khẩu
      const response = await changePassword(
        user?.email,
        oldPassword,
        newPassword,
        token
      );
      console.log("response: ", response);

      // Hiển thị thông báo thành công
      message.success("Cập nhật mật khẩu thành công!");

      // Reset các trường nhập
      setNewPassword("");
      setRePassword("");
      setOldPassword("");
    } catch (error) {
      console.error("Lỗi cập nhật mật khẩu:", error);
      message.error(
        error.message || "Đã xảy ra lỗi trong quá trình thay đổi mật khẩu!"
      );
    }
  };
  console.log("Phone: ", phoneNumber);

  return (
    <>
      <div className="w-full h-full flex flex-col bg-slate-200">
        <Header />
        <Menu />

        <div className="flex mt-4 container mx-auto">
          <div className="w-1/4 bg-white p-4 shadow rounded-lg">
            <div className="flex items-center space-x-4">
              <img
                className="h-24 w-24 bg-gray-300 rounded-full flex items-center justify-center text-xl font-bold border border-blue-300"
                src={
                  user?.url ||
                  "https://res.cloudinary.com/doqbelkif/image/upload/v1727453521/e015a22e-fa11-4f2c-86bf-322445d957ea.png"
                }
                alt="User Avatar"
              />
              <div>
                <div className="font-bold text-lg">{user?.name}</div>
                <div className="text-gray-500">Google</div>
              </div>
            </div>
            <div className="mt-4 bg-yellow-100 p-2 rounded text-yellow-800">
              Chào mừng bạn là thành viên của LuckyPanda Travel
            </div>
            <div className="mt-4 space-y-2 ml-4 text-base">
              <a className="flex items-center space-x-2 font-bold" href="#">
                Thẻ của tôi
              </a>
              <a className="flex items-center space-x-2 font-bold" href="#">
                <span>Thông tin hành khách</span>
              </a>
              <a className="flex items-center space-x-2 font-bold" href="#">
                <span>Hoàn tiền</span>
              </a>
              <button
                onClick={() => {
                  showModal();
                }}
                className="flex items-center space-x-2 font-bold"
              >
                <span>Thiết lập tiêu chí</span>
              </button>
            </div>
          </div>

          <div className="w-3/4 bg-white p-4 shadow ml-4 rounded-lg">
            <h2 className="text-2xl font-bold">Tài khoản và bảo mật</h2>
            <div className="mt-4">
              <div className="flex space-x-4 border-b">
                <a
                  className={`pb-2 font-bold ${
                    isInfoAccount
                      ? "border-b-2 border-blue-600"
                      : "text-gray-600"
                  }`}
                  onClick={handleIsInfo}
                >
                  Thông tin tài khoản
                </a>
                <a
                  className={`pb-2 ${
                    !isInfoAccount
                      ? "border-b-2 border-blue-600 font-bold"
                      : "text-gray-600"
                  }`}
                  onClick={handleSecure}
                >
                  Mật khẩu &amp; Bảo mật
                </a>
              </div>
              {isInfoAccount ? (
                <div className="mt-4 pr-8 pl-4">
                  <div className="flex justify-between">
                    <h3 className="text-xl font-bold">Dữ liệu cá nhân</h3>
                    <button
                      className="text-xl font-bold "
                      onClick={handleFormat}
                    >
                      THAY ĐỔI
                    </button>
                  </div>
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="block text-gray-600">Tên đầy đủ</label>
                      <input
                        className={
                          isDisabled
                            ? "block appearance-none w-full bg-slate-200 border border-textColorCustom text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            : "block appearance-none w-full bg-white border border-textColorCustom text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        }
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={isDisabled}
                      />
                    </div>
                    <div className="z-500 ">
                      <ModalSetCriteria
                        visible={isModalVisible}
                        onClose={handleClose}
                      />
                    </div>
                    <div className="flex space-x-4 mb-4">
                      <div className="flex-1">
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                          Giới tính
                        </label>
                        <div className="z-30">
                          <select
                            disabled={isDisabled}
                            name="gender"
                            value={gender} // Lấy giá trị giới tính từ state
                            onChange={handleGenderChange}
                            className={
                              isDisabled
                                ? "block appearance-none w-full bg-slate-300 border border-textColorCustom text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                : "block appearance-none w-full bg-white border border-textColorCustom text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            }
                          >
                            <option value={false}>Nữ</option>
                            <option value={true}>Nam</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex-1">
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                          Ngày sinh
                        </label>
                        <div className="relative">
                          <select
                            disabled={isDisabled}
                            value={day}
                            onChange={(e) => setDay(e.target.value)}
                            className={
                              isDisabled
                                ? "block appearance-none w-full bg-slate-300 border border-textColorCustom text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                : "block appearance-none w-full bg-white border border-textColorCustom text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            }
                          >
                            {days.map((d) => (
                              <option key={d} value={d}>
                                {d}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="flex-1">
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                          Chọn tháng
                        </label>
                        <div className="relative">
                          <select
                            disabled={isDisabled}
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                            className={
                              isDisabled
                                ? "block appearance-none w-full bg-slate-300 border border-textColorCustom text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                : "block appearance-none w-full bg-white border border-textColorCustom text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            }
                          >
                            {months.map((m) => (
                              <option key={m} value={m}>
                                {m}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="flex-1">
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                          Chọn năm
                        </label>
                        <div className="relative">
                          <select
                            disabled={isDisabled}
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            className={
                              isDisabled
                                ? "block appearance-none w-full bg-slate-300 border border-textColorCustom text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                : "block appearance-none w-full bg-white border border-textColorCustom text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            }
                          >
                            {years.map((y) => (
                              <option key={y} value={y}>
                                {y}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Thành phố bạn đang ở
                      </label>
                      <input
                        disabled={isDisabled}
                        className={
                          isDisabled
                            ? "block appearance-none w-full bg-slate-200 border border-textColorCustom text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            : "block appearance-none w-full bg-white border border-textColorCustom text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        }
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                    <div className="flex justify-end space-x-4">
                      <button
                        className={`py-2 px-4 rounded ${
                          isDisabled
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-gray-300 text-gray-500"
                        }`}
                        onClick={isDisabled ? null : handleCancle}
                        disabled={isDisabled}
                      >
                        Hủy
                      </button>
                      <button
                        className={`py-2 px-4 rounded ${
                          isDisabled
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-cyan-300 text-gray-500"
                        }`}
                        onClick={isDisabled ? null : handleUpdateInfo}
                        disabled={isDisabled}
                      >
                        Lưu
                      </button>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                      <div className="mb-4">
                        <h2 className="text-gray-800 text-lg font-semibold">
                          Email
                        </h2>
                        <p className="text-gray-600 text-sm">
                          Chỉ có thể sử dụng tối đa 3 email
                        </p>
                      </div>
                      <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                        <div>
                          <p className="text-gray-800 font-medium">{email}</p>
                          <p className="text-green-600 text-sm">
                            Nơi nhận thông báo
                          </p>
                        </div>
                        <button className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded flex items-center">
                          Thêm email
                        </button>
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                      <div className="mb-4">
                        <h2 className="text-gray-800 text-lg font-semibold">
                          Số điện thoại
                        </h2>
                        <p className="text-gray-600 text-sm">
                          Chỉ có thể sử dụng tối đa 1 số điện thoại
                        </p>
                      </div>
                      <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                        <div>
                          <p className="text-gray-800 font-medium">
                            {phoneNumber}
                          </p>
                          <p className="text-green-600 text-sm">
                            Nơi nhận thông báo
                          </p>
                        </div>
                        <button className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded flex items-center">
                          Thêm số điện thoại
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-4 pr-8 pl-4">
                  <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                    <div className=" flex justify-between">
                      <div className="mb-4">
                        <h2 className="text-gray-800 text-lg font-semibold">
                          Mật khẩu
                        </h2>
                        <p className="text-gray-600 text-sm">
                          Bạn có thể đổi mật khẩu tại đây
                        </p>
                      </div>
                      {!isChangePassword && (
                        <button
                          className="text-white font-bold bg-customColor p-2 h-[40px] rounded flex items-center"
                          onClick={showFormChangePassword}
                        >
                          Đổi mật khẩu
                        </button>
                      )}
                    </div>
                    {isChangePassword && (
                      <div className="pt-4 space-y-4 border-t border-gray-200">
                        <div>
                          <label className="block text-gray-600">
                            Mật khẩu cũ
                          </label>
                          <input
                            className={
                              "block appearance-none w-full bg-white border border-textColorCustom text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            }
                            type="text"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-gray-600">
                            Mật khẩu mới
                          </label>
                          <input
                            className={
                              "block appearance-none w-full bg-white border border-textColorCustom text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            }
                            type="text"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-gray-600">
                            Xác nhận mật khẩu mới
                          </label>
                          <input
                            className={
                              "block appearance-none w-full bg-white border border-textColorCustom text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            }
                            type="text"
                            value={rePassword}
                            onChange={(e) => setRePassword(e.target.value)}
                          />
                        </div>
                        <div className="flex justify-end space-x-4">
                          <button
                            className="bg-gray-200 text-gray-500 py-2 px-4 rounded"
                            onClick={handleCancelChangePW}
                          >
                            Hủy
                          </button>
                          <button
                            className=" text-white font-bold py-2 px-4 rounded bg-customColor"
                            onClick={handleChangePassword}
                          >
                            Thay đổi
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                    <div className="mb-4">
                      <h2 className="text-gray-800 text-lg font-semibold">
                        Xóa tài khoản
                      </h2>
                      <p className="text-gray-600 text-sm"></p>
                    </div>
                    <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                      <div>
                        <p className="text-gray-800 font-medium">
                          {user?.phoneNumber}
                        </p>
                        <p className="text-green-600 text-sm">
                          Bạn có thể xóa tài khoản ở đây
                        </p>
                      </div>
                      <button className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded flex items-center">
                        Xóa tài khoản
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <ChatBot />
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

export default Account;
