import { useEffect, useRef, useState } from "react";
import Header from "../../layouts/Header";
import Menu from "../../layouts/Menu";
import bn1 from "/src/assets/banner/h1-slider-img-1-.jpg";
import bn2 from "/src/assets/banner/h1-slider-img-2-.jpg";
import haLongImage from "/src/assets/famous-landmark/ha-long_MB.jpg";
import HoiAnImage from "/src/assets/famous-landmark/HoiAn_MT.jpg";
import PhuQuocImage from "/src/assets/famous-landmark/PhuQuoc_MN.jpg";
import BaDenImage from "/src/assets/famous-landmark/Nui-ba-den-Tay-Ninh.jpg";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

import { FaBus, FaCar, FaTrain } from "react-icons/fa6";
import { GiCommercialAirplane, GiShipBow } from "react-icons/gi";
import { BsCalendar4Week, BsCalendarHeart } from "react-icons/bs";
import { TiWeatherPartlySunny } from "react-icons/ti";
import Footer from "../../layouts/Footer";
import mountain from "../../assets/iconTour/mountain.png";
import arrows_top from "../../assets/iconTour/arrows_top.png";
import arrows_bot from "../../assets/iconTour/arrows_bot.png";
import buddhist from "../../assets/iconTour/buddhist.png";
import early from "../../assets/iconTour/early.png";
import history from "../../assets/iconTour/history.png";
import filter from "../../assets/iconTour/filter.png";
import news from "../../assets/iconTour/new.png";
import resort from "../../assets/iconTour/resort.png";
import river from "../../assets/iconTour/river.png";
import target from "../../assets/iconTour/target.png";
import jungle from "../../assets/iconTour/jungle.png";
import bannerMB from "../../assets/banner/banner_MB.jpg";
import bannerMT from "../../assets/banner/banner_MT.jpg";
import bannerMN from "../../assets/banner/banner_MN.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ModalSetCriteria from "../../components/ModalSetCriteria";
import { useUser } from "../../contexts/UserContext";
import { FaHeart } from "react-icons/fa";
import TourCard from "../../components/TourCard";
import { addPreference } from "../../services/api";
import { message } from "antd";

function ListTour() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const region = queryParams.get("region");
  const name = queryParams.get("name");
  const token = localStorage.getItem("token");

  const { user } = useUser();

  const [urlImageBanner, setUrlImageBanner] = useState("");
  const [title, setTitle] = useState("");
  const [regionTour, setRegionTour] = useState("");
  const [criteria, setCriteria] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [toursPerPage, setToursPerPage] = useState(12);
  const [tourList, setTourList] = useState([]); // Danh sách tour
  const [totalPages, setTotalPages] = useState(1); // Tổng số trang
  const [sortType, setSortType] = useState("");
  const [typeTour, settypeTour] = useState("");
  const { tours } = location.state || {};
  console.log("Matching: ", tourList);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleClose = () => setIsModalVisible(false);

  console.log("Criteria: ", criteria);

  useEffect(() => {
    if (region === "NORTH") {
      setUrlImageBanner(bannerMB);
      setTitle(
        "Khám Phá Miền Bắc - Vùng Đất Văn Hóa Lịch Sử, Thiên Nhiên Hùng Vĩ và Ẩm Thực Đặc Sắc"
      );
      setRegionTour("MIỀN BẮC");
    } else if (region === "CENTRAL") {
      setUrlImageBanner(bannerMT);
      setTitle(
        "Du Lịch Miền Trung – Nơi Giao Thoa Giữa Văn Hóa Lịch Sử, Biển Cả và Món Ngon Truyền Thống"
      );
      setRegionTour("MIỀN TRUNG");
    } else {
      setUrlImageBanner(bannerMN);
      setTitle(
        "Hành Trình Miền Nam – Từ Sài Gòn Sầm Uất Đến Những Cảnh Đẹp Hoang Sơ và Ẩm Thực Đặc Sắc"
      );
      setRegionTour("MIỀN NAM");
    }
  }, [region]);

  const fetchFilteredTours = async (criteria, currentPage, toursPerPage) => {
    const url = `http://localhost:8000/api/v1/tours/getFilteredTours`;
    try {
      const response = await axios.post(url, criteria, {
        params: { page: currentPage, size: toursPerPage },
      });

      if (response.data === null) {
        return { tours: tourList, totalPages: totalPages };
      }

      return {
        tours: response.data.content,
        totalPages: response.data?.totalPages || 0,
      };
    } catch (error) {
      alert("Không tìm thấy tour", error);
    }
  };

  const fetchTours = async () => {
    try {
      let url = `http://localhost:8000/api/v1/tours/region`;
      const params = {
        page: currentPage,
        size: toursPerPage,
      };
      if (name) {
        url = `http://localhost:8000/api/v1/tours/by-name`;
        params.name = name;
      } else if (criteria) {
        const result = await fetchFilteredTours(
          criteria,
          currentPage,
          toursPerPage
        );

        setTourList(result.tours);
        setTotalPages(result.totalPages);
        return;
      } else {
        params.region = region;

        switch (sortType) {
          case "startDateNew": // Mới nhất
            params.isAscending = false; // Ngày giảm dần
            break;

          case "priceDesc": // Giá cao nhất
            url = `http://localhost:8000/api/v1/tours/region-order-by-price`;
            params.isAscending = false;
            break;

          case "priceAsc": // Giá thấp nhất
            url = `http://localhost:8000/api/v1/tours/region-order-by-price`;
            params.isAscending = true;
            break;
          case "departureDateAsc": // Khởi hành sớm nhất
            url = `http://localhost:8000/api/v1/tours/region-order-by-departure-date`;
            params.isAscending = true;
            break;
          case "departureDateDesc": // Khởi hành muộn nhất
            url = `http://localhost:8000/api/v1/tours/region-order-by-departure-date`;
            params.isAscending = false;
            break;
          case "typeTour": // Khởi hành muộn nhất
            url = `http://localhost:8000/api/v1/tours/by-type`;
            params.typeTour = typeTour;
            break;
          default:
            params.isAscending = true;
            break;
        }
      }

      const response = await axios.get(url, { params });

      if (response.data.totalElements !== 0) {
        setTourList(response.data.content); // Lưu danh sách tour
        setTotalPages(response.data?.totalPages || 0); // Tổng số trang}
      } else {
        message.error("Không tìm thấy tour phù hợp!!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTours();
    if (tours) {
      setTourList(tours);
    }
  }, [
    name,
    region,
    currentPage,
    toursPerPage,
    sortType,
    typeTour,
    criteria,
    tours,
  ]);

  //Animation text
  useEffect(() => {
    const tourText = document.querySelector(".tour-text");
    const holidayText = document.querySelector(".holiday-text");

    console.log("tourText:", tourText); // Kiểm tra nếu tourText được chọn đúng
    console.log("holidayText:", holidayText); // Kiểm tra nếu holidayText được chọn đúng

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            tourText.classList.remove("hidden-animation");
            holidayText.classList.remove("hidden-animation");

            tourText.classList.add("animate-left");
            holidayText.classList.add("animate-right");

            // Ngừng quan sát sau khi animation đã diễn ra
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 } // Tỉ lệ hiển thị thẻ div trong viewport
    );

    if (tourText && holidayText) {
      observer.observe(tourText);
      observer.observe(holidayText);
    }

    // Cleanup observer khi component unmount
    return () => {
      if (tourText && holidayText) {
        observer.unobserve(tourText);
        observer.unobserve(holidayText);
      }
    };
  }, []);
  //Animation image title
  const elementRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const directionClass =
            entry.target.dataset.direction === "left"
              ? "animate-roll-left"
              : "animate-roll-right";
          entry.target.classList.add(directionClass);
          entry.target.addEventListener("animationend", () => {
            entry.target.classList.remove(directionClass);
            entry.target.classList.add("animate-pulse");
          });
        }
      });
    });

    elementRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      elementRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const handleSetCriteria = async (values) => {
    if (!user) {
      console.log("User is not authenticated.");
    } else {
      try {
        const updatedPreference = {
          ...values,
          cusId: user.userId, // Gán cusId là user.userId
        };
        // Nếu user hợp lệ, gọi addPreference và đợi kết quả
        const response = await addPreference(updatedPreference, token);
        console.log("Preference added successfully:", response);
      } catch (error) {
        console.error("Error adding preference:", error.message);
      }
    }
    setCriteria(values); // Lưu giá trị từ Modal
    console.log("Criteria set in ListTour:", values);
  };

  //Thực hiện phân trang
  // Hàm chuyển đến trang đầu tiên
  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  // Hàm chuyển đến trang cuối cùng
  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  // Hàm chuyển đến trang cụ thể
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Tạo danh sách trang hiển thị
  const pageNumbers = () => {
    const pageArr = [];
    let startPage = Math.max(1, currentPage - 2); // Bắt đầu hiển thị từ trang hiện tại - 2
    let endPage = Math.min(totalPages, currentPage + 2); // Kết thúc hiển thị ở trang hiện tại + 2

    if (currentPage <= 2) {
      endPage = Math.min(totalPages, 5);
    } else if (currentPage >= totalPages - 2) {
      startPage = Math.max(1, totalPages - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageArr.push(i);
    }

    return pageArr;
  };

  return (
    <>
      <div className="w-full h-full flex flex-col">
        <Header />
        <Menu name="Tour" />
        <div className="w-full p-8 px-4 py-4 flex items-center justify-between">
          <div className="text-xl pl-[40px] font-bold">{regionTour}</div>
          <div className="text-gray-600 pr-[40px]">{title}</div>
        </div>
        <div className="relative w-full pl-[50px] pr-[50px] mx-auto">
          <img
            alt="Aerial view of a coastal area with cable cars and boats"
            className="w-full  h-[600px] object-cover "
            src={urlImageBanner}
          />
        </div>

        <div className="bg-white container mx-auto px-8  w-3/4 py-6 flex justify-around text-center text-sm text-gray-700">
          <div className={"flex flex-col items-center justify-around"}>
            <button
              onClick={() => {
                settypeTour("SPORT");
                setSortType("typeTour");
              }}
              className="flex flex-col items-center cursor-pointer bg-transparent border-none"
            >
              <img src={mountain} alt="Logo" className="w-[32px] h-auto" />
              <div>Tour mạo hiểm</div>
            </button>
          </div>

          <div className={"flex flex-col items-center justify-center"}>
            <button
              onClick={() => {
                settypeTour("DISCOVER");
                setSortType("typeTour");
              }}
              className="flex flex-col items-center cursor-pointer bg-transparent border-none"
            >
              <img src={river} alt="Logo" className="w-[32px] h-auto" />
              <div>Tour khám phá</div>
            </button>
          </div>

          <div className={"flex flex-col items-center justify-center"}>
            <button
              onClick={() => {
                settypeTour("CULTURE");
                setSortType("typeTour");
              }}
              className="flex flex-col items-center cursor-pointer bg-transparent border-none"
            >
              <img src={buddhist} alt="Logo" className="w-[32px] h-auto" />
              <div>Tour văn hóa</div>
            </button>
          </div>

          <div className={"flex flex-col items-center justify-center"}>
            <button
              onClick={() => {
                settypeTour("ECOLOGY");
                setSortType("typeTour");
              }}
              className="flex flex-col items-center cursor-pointer bg-transparent border-none"
            >
              <img src={jungle} alt="Logo" className="w-[32px] h-auto" />
              <div>Tour sinh thái</div>
            </button>
          </div>

          <div className={"flex flex-col items-center justify-center"}>
            <button
              onClick={() => {
                settypeTour("RESORT");
                setSortType("typeTour");
              }}
              className="flex flex-col items-center cursor-pointer bg-transparent border-none"
            >
              <img src={resort} alt="Logo" className="w-[32px] h-auto" />
              <div>Tour nghỉ dưỡng</div>
            </button>
          </div>

          <div className={"flex flex-col items-center justify-center"}>
            <button
              onClick={() => {
                settypeTour("ENTERTAINMENT");
                setSortType("typeTour");
              }}
              className="flex flex-col items-center cursor-pointer bg-transparent border-none"
            >
              <img src={target} alt="Logo" className="w-[32px] h-auto" />
              <div>Tour giải trí</div>
            </button>
          </div>
        </div>
        <hr className="border-3 border-gray-500 w-full mb-4" />

        <div className="bg-white container mx-auto px-8 w-3/4 py-6 flex justify-around text-center text-sm text-gray-700">
          <button
            className={
              "flex flex-col items-center justify-center cursor-pointer bg-transparent border-none"
            }
            onClick={() => setSortType("startDateNew")}
          >
            <img src={news} alt="Logo" className="w-[32px] h-auto" />
            <div>Mới nhất</div>
          </button>

          <button
            className={
              "flex flex-col items-center justify-center cursor-pointer bg-transparent border-none"
            }
            onClick={() => setSortType("priceDesc")}
          >
            <img src={arrows_bot} alt="Logo" className="w-[32px] h-auto" />
            <div>Giá cao nhất</div>
          </button>

          <button
            className={
              "flex flex-col items-center justify-center cursor-pointer bg-transparent border-none"
            }
            onClick={() => setSortType("priceAsc")}
          >
            <img src={arrows_top} alt="Logo" className="w-[32px] h-auto" />
            <div>Giá thấp nhất</div>
          </button>

          <button
            className={
              "flex flex-col items-center justify-center cursor-pointer bg-transparent border-none"
            }
            onClick={() => setSortType("departureDateAsc")}
          >
            <img src={early} alt="Logo" className="w-[32px] h-auto" />
            <div>Khởi hành sớm nhất</div>
          </button>

          <button
            className={
              "flex flex-col items-center justify-center cursor-pointer bg-transparent border-none"
            }
            onClick={() => setSortType("departureDateDesc")}
          >
            <img src={history} alt="Logo" className="w-[32px] h-auto" />
            <div>Khởi hành muộn nhất</div>
          </button>

          <button
            className={
              "flex flex-col items-center justify-center cursor-pointer bg-transparent border-none"
            }
            onClick={() => showModal()}
          >
            <img src={filter} alt="Logo" className="w-[32px] h-auto" />
            <div>Lọc</div>
          </button>
        </div>
        {/* Tittle */}
        <div className="">
          <ModalSetCriteria
            visible={isModalVisible}
            onClose={handleClose}
            onSubmit={handleSetCriteria}
          />
        </div>
        <div className="flex flex-col justify-center items-center space-y-5 mt-5">
          <p className="tour-text text-4xl hidden-animation text-textColorCustom font-dancing-script">
            Tour hấp dẫn
          </p>
          <p className="holiday-text text-6xl hidden-animation text-black font-bold font-sriracha">
            Trọn vẹn kì nghỉ
          </p>
        </div>

        {/* Tour ĐẶC BIỆT */}
        <div className="flex flex-col justify-center items-center space-y-5 mt-5">
          {/* Danh sách tour */}
          <div className="flex flex-wrap justify-center space-x-4 p-4">
            {tourList.map((tour, index) => (
              <TourCard key={tour.tourId || index} tour={tour} user={user} />
            ))}
          </div>

          {/* Nút phân trang */}
          <div className="flex justify-center space-x-4 mt-4">
            {/* Nút trang đầu */}
            <button
              onClick={handleFirstPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Trang đầu
            </button>

            {/* Hiển thị các số trang */}
            {pageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded ${
                  page === currentPage
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300"
                }`}
              >
                {page}
              </button>
            ))}

            {/* Nút trang cuối */}
            <button
              onClick={handleLastPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Trang cuối
            </button>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

export default ListTour;
