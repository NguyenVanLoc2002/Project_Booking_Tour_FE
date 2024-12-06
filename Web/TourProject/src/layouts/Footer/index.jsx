import logoText from "../../assets/logo_Text.jpg";
import { CiMail } from "react-icons/ci";
import { FaPhone } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoNewspaper } from "react-icons/io5";
import { IoIosContacts } from "react-icons/io";
import { BsTelephoneOutboundFill } from "react-icons/bs";
import { IoImagesSharp } from "react-icons/io5";
import haLongImage from "/src/assets/famous-landmark/ha-long_MB.jpg";
import HoiAnImage from "/src/assets/famous-landmark/HoiAn_MT.jpg";
import PhuQuocImage from "/src/assets/famous-landmark/PhuQuoc_MN.jpg";
import BaDenImage from "/src/assets/famous-landmark/Nui-ba-den-Tay-Ninh.jpg";

function Footer() {
  const dotsArray = Array.from({ length: 250 });

  const getRandomPosition = () => {
    const x = Math.random() * (window.innerWidth - 50);
    const y = Math.random() * (window.innerWidth - 50); // Adjust -50 to fit dots within viewport
    return { x, y };
  };

  const getRandomStartPosition = () => {
    const startX = Math.random() * (window.innerWidth - 4); // Adjust -4 to avoid overflow
    const startY = Math.random() * (window.innerHeight - 4); // Adjust -4 to avoid overflow
    return { startX, startY };
  };

  const getRandomSize = () => {
    return Math.random() * 5 + "px"; // Random size between 0px and 4px
  };

  return (
    <>
      <div className="w-screen max-w-full h-auto flex flex-col bg-black font-sans text-white text-sm mt-10 relative overflow-hidden">
        {/* Contact Information */}
        <div className="flex flex-col md:flex-row md:justify-between p-10 pt-20 pb-20 space-x-4">
          <div className="flex flex-col space-y-3 text-white md:w-1/4">
            <img
              src={logoText}
              alt="Logo"
              className="w-48 h-28 object-cover mt-[-20px]"
            />
            <p className="text-xl text-gray-500 font-medium">
              Liên hệ với chúng tôi:
            </p>
            <div className="flex space-x-4 items-center">
              <CiMail size={20} color="white" />
              <p>contact@demo.com</p>
            </div>
            <div className="flex space-x-4 items-center">
              <FaPhone size={18} color="white" />
              <p>012365163</p>
            </div>
            <div className="flex space-x-4 items-center">
              <FaMapMarkerAlt size={20} color="white" />
              <p>
                Số 123 Đường Phan Chu Trinh,
                <br /> Quận 10, TP.HCM
              </p>
            </div>
          </div>

          {/* News Section */}
          <div className="flex flex-col space-y-3 text-white md:w-1/4">
            <div className="flex items-center space-x-4 mb-4">
              <IoNewspaper size={25} className="text-textColorCustom" />
              <p className="text-xl font-bold">TIN TỨC MỚI</p>
            </div>
            <div className="flex flex-col justify-center space-y-2">
              <a href="" className="text-sm">
                Có nên du lịch thái land vào mùa tết không?
              </a>
              <p className="text-gray-500">18 Tháng Mười Một, 2019</p>
              <a href="" className="text-sm">
                Có nên du lịch thái land vào mùa tết không?
              </a>
              <p className="text-gray-500">18 Tháng Mười Một, 2019</p>
              <a href="" className="text-sm">
                Có nên du lịch thái land vào mùa tết không?
              </a>
              <p className="text-gray-500">18 Tháng Mười Một, 2019</p>
            </div>
          </div>

          {/* Contact and Form */}
          <div className="flex flex-col space-y-3 text-white md:w-1/4">
            <div className="flex items-center space-x-4 mb-4">
              <IoIosContacts size={30} className="text-textColorCustom" />
              <p className="text-xl font-bold">LIÊN HỆ ĐẶT TOUR</p>
            </div>
            <div className="flex flex-col space-y-3">
              {/* Input Phone */}
              <div className="flex items-center w-full bg-gray-500 p-2 h-12 rounded">
                <BsTelephoneOutboundFill size={18} className="text-white ml-2" />
                <div className="flex-grow overflow-hidden ml-3">
                  <input
                    type="text"
                    placeholder="Điện thoại"
                    className="w-full bg-gray-500 placeholder-white"
                    style={{ outline: "none" }}
                  />
                </div>
              </div>

              {/* Input Email */}
              <div className="flex items-center w-full bg-gray-500 p-2 h-12 rounded">
                <CiMail size={20} className="text-white ml-2" />
                <div className="flex-grow overflow-hidden ml-3">
                  <input
                    type="text"
                    placeholder="Để lại email"
                    className="w-full bg-gray-500 placeholder-white"
                    style={{ outline: "none" }}
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="flex items-center w-full justify-center bg-customColor p-2 h-12 rounded-2xl font-bold hover:bg-white hover:text-black">
                <button>GỬI ĐI</button>
              </div>
            </div>
          </div>

          {/* Images Section */}
          <div className="flex flex-col space-y-3 text-white md:w-1/4">
            <div className="flex items-center space-x-4 mb-4">
              <IoImagesSharp size={25} className="text-textColorCustom" />
              <p className="text-xl font-bold">HÌNH ẢNH NỔI BẬT</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src={haLongImage}
                alt="Image 1"
                className="w-full h-auto transition-transform duration-300 hover:scale-105 hover:brightness-75"
              />
              <img
                src={HoiAnImage}
                alt="Image 2"
                className="w-full h-auto transition-transform duration-300 hover:scale-105 hover:brightness-75"
              />
              <img
                src={PhuQuocImage}
                alt="Image 3"
                className="w-full h-auto transition-transform duration-300 hover:scale-105 hover:brightness-75"
              />
              <img
                src={BaDenImage}
                alt="Image 4"
                className="w-full h-auto transition-transform duration-300 hover:scale-105 hover:brightness-75"
              />
            </div>
          </div>
        </div>

        {/* Footer Text */}
        <div className="flex items-center bg-slate-800 font-sans text-white text-sm pl-10 pt-3 pb-3">
          <p>Copyright &copy; 2024 LocNguyen</p>
        </div>

        {/* Dots Animation */}
        {dotsArray.map((_, index) => {
          const { x, y } = getRandomPosition();
          const size = getRandomSize();
          const { startX, startY } = getRandomStartPosition();
          const animationDuration = `${10 + (index % 10)}s`;
          const animationDelay = `${Math.random() * 5}s`; // Thời gian trễ ngẫu nhiên

          return (
            <div
              key={index}
              className="dot"
              style={{
                "--x": `${x}px`,
                "--y": `${y}px`,
                "--start-top": `${startY}px`,
                "--start-left": `${startX}px`,
                width: size,
                height: size,
                animationDuration,
                animationDelay,
              }}
            ></div>
          );
        })}
      </div>
    </>
  );
}

export default Footer;
