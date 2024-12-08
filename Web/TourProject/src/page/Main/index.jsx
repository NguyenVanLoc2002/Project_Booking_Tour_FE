import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Header from "../../layouts/Header";
import Menu from "../../layouts/Menu";
import bn1 from "/src/assets/banner/h1-slider-img-1-.jpg";
import bn2 from "/src/assets/banner/h1-slider-img-2-.jpg";
import haLongImage from "/src/assets/famous-landmark/ha-long_MB.jpg";
import thacNuocImage from "/src/assets/famous-landmark/thac-nuoc-goi-y.jpg";
import HoiAnImage from "/src/assets/famous-landmark/HoiAn_MT.jpg";
import PhuQuocImage from "/src/assets/famous-landmark/PhuQuoc_MN.jpg";
import BaDenImage from "/src/assets/famous-landmark/Nui-ba-den-Tay-Ninh.jpg";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { FaBus, FaCar, FaTrain, FaAngleRight, FaHeart } from "react-icons/fa6";
import { GiCommercialAirplane, GiShipBow } from "react-icons/gi";
import { BsCalendar4Week, BsCalendarHeart } from "react-icons/bs";
import { TiWeatherPartlySunny } from "react-icons/ti";
import Footer from "../../layouts/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import ChatBot from "../../layouts/ChatBot";
import TourCard from "../../components/TourCard";
import { useUser } from "../../contexts/UserContext";
import dayjs from "dayjs";

function MainLayout() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSlide1Active, setIsSlide1Active] = useState(true);
  const [northernTours, setNorthernTours] = useState([]);
  const [centralTours, setCentralTours] = useState([]);
  const [southernTours, setSouthernTours] = useState([]);
  const [isAscending, setIsAscending] = useState(true);
  const [recommendTour, setRecommendTour] = useState([]);
  const token = localStorage.getItem("token");
  const location = useLocation();

  const { user } = useUser();

  const images = [bn1, bn2];

  function goToNextSlide() {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    setIsSlide1Active((prev) => !prev);
  }

  function goToPreviousSlide() {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    setIsSlide1Active((prev) => !prev);
  }

  //Animation slide Header
  useEffect(() => {
    const slide1 = document.getElementById("slide1");
    const slide2 = document.getElementById("slide2");

    // Đặt ảnh đầu tiên
    slide1.style.backgroundImage = `url(${images[currentImageIndex]})`;
    slide2.style.backgroundImage = `url(${
      images[(currentImageIndex + 1) % images.length]
    })`;

    const nextSlide = isSlide1Active ? slide2 : slide1;
    const currentSlide = isSlide1Active ? slide1 : slide2;

    // Add class to handle sliding transition
    nextSlide.classList.remove("translate-x-full");
    currentSlide.classList.add("translate-x-full");
  }, [currentImageIndex, isSlide1Active]);

  //Animation text
  useEffect(() => {
    const tourText = document.querySelector(".tour-text");
    const holidayText = document.querySelector(".holiday-text");

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

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const bookingId = urlParams.get("bookingId");

    // Nếu có bookingId, điều hướng đến trang thanh toán
    if (bookingId) {
      navigate(`/payment?bookingId=${bookingId}`);
    }
  }, [location]);

  useEffect(() => {
    const fetchRecommendation = async () => {
      if (!user) {
        console.warn("User is not logged in");
        setRecommendTour([]); // Nếu user chưa đăng nhập, không gọi API
        return;
      }

      const url = `http://localhost:8000/api/v1/recommendation/${user.userId}?page=1&size=10`;

      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.content.length === 0) {
          // Xử lý khi không có gợi ý
          setRecommendTour([]);
          console.info("No recommendations found for this user");
        } else {
          setRecommendTour(response.data.content);
        }
      } catch (error) {
        console.error("Failed to fetch recommendation:", error);
        setRecommendTour([]);
      }
    };

    fetchRecommendation();
  }, [user, token]);

  console.log("Recommend Tour: ", recommendTour);

  //Hiện thị trang Chi tiết tour
  const navigate = useNavigate();

  const handleNavigateMatching = (tours) => {
    navigate("/listTour", { state: { tours } });
  };

  //Call API Tour by Region
  const fetchToursByRegion = async (region) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/tours/region`,
        {
          params: { region, page: 1, size: 3, isAscending },
        }
      );
      // Cập nhật state tương ứng với miền
      if (region === "NORTH") {
        setNorthernTours(response.data.content);
      } else if (region === "CENTRAL") {
        setCentralTours(response.data.content);
      } else if (region === "SOUTH") {
        setSouthernTours(response.data.content);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  useEffect(() => {
    fetchToursByRegion("NORTH");
    fetchToursByRegion("CENTRAL");
    fetchToursByRegion("SOUTH");
  }, []);

  return (
    <>
      <div className="w-full h-full flex flex-col">
        <Header />
        <Menu name="Home" />

        <div className="relative w-full h-[500px] overflow-hidden md:h-[500px] sm:h-[250px]">
          <div
            id="slide1"
            className="absolute inset-0 bg-center bg-cover object-cover slide-background"
          >
            <div className="relative w-full h-full">
              <div className="flex items-center justify-center w-full h-full absolute top-0 left-0 z-20">
                <p className="text-white text-6xl font-dancing-script font-bold">
                  Trải nghiệm qua những chuyến đi
                </p>
              </div>
            </div>
          </div>
          <div
            id="slide2"
            className="absolute inset-0 bg-center bg-cover object-cover slide-background translate-x-full"
          >
            <div className="relative w-full h-full">
              <div className="flex items-center justify-center w-full h-full absolute top-0 left-0 z-20">
                <p className="text-white text-6xl font-dancing-script font-bold">
                  Đi cùng bạn, thích hơn nhiều
                </p>
              </div>
            </div>
          </div>
          <div
            className="absolute top-1/2 left-2 transform -translate-y-1/2 text-textColorCustom z-10 p-2 rounded-full bg-white/20 hover:bg-white/90"
            onClick={goToPreviousSlide}
          >
            <IoIosArrowDropleftCircle size={20} />
          </div>
          <div
            className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 text-textColorCustom p-2 rounded-full bg-white/20 hover:bg-white/90"
            onClick={goToNextSlide}
          >
            <IoIosArrowDroprightCircle size={20} />
          </div>
        </div>

        {/* Tittle */}
        <div className="flex flex-col justify-center items-center space-y-5 mt-5">
          <p className="tour-text text-4xl hidden-animation text-textColorCustom font-dancing-script">
            Tour hấp dẫn
          </p>
          <p className="holiday-text text-6xl hidden-animation text-black font-bold font-sriracha">
            Trọn vẹn kì nghỉ
          </p>
        </div>
        {/* Tour 4 miền */}
        <div className="flex flex-col justify-center items-center space-y-5 mt-5">
          {/*  list phù hợp */}
          {recommendTour.length !== 0 && user != null ? (
            <div className="bg-[#a0e9e5] rounded-2xl ">
              <div className="flex justify-between items-center space-x-6  ">
                <h2 className=" text-2xl font-sriracha font-bold pl-4 text-[#2c7a7b]">
                  Tour phù hợp với bạn
                </h2>
                <button
                  onClick={() => {
                    handleNavigateMatching(recommendTour);
                  }}
                  className="pl-4 pr-4 p-2 bg-[#2c7a7b] bg-opacity-65 rounded-bl-2xl rounded-tr-2xl text-xl font-bold flex justify-center items-center text-[#e0fffa]"
                >
                  Xem tất cả <FaAngleRight />
                </button>
              </div>
              <div className="flex flex-wrap justify-center space-x-4 p-4 ">
                {recommendTour.slice(0, 4).map((tour, index) => (
                  <TourCard key={tour.id || index} tour={tour} user={user} />
                ))}
              </div>
            </div>
          ) : null}
          {/* MB */}
          <div className="flex items-center space-x-6 mt-3 mb-3">
            <div
              ref={(el) => (elementRefs.current[4] = el)}
              data-direction="left"
              className="group overflow-hidden relative w-72 h-72 rounded-full "
            >
              <img
                src={haLongImage}
                alt="Hạ Long"
                className="w-full h-full object-cover rounded-full transform transition-transform duration-1000 ease-in-out group-hover:scale-105"
              />
              <p className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10 text-4xl font-dancing-script text-white font-bold">
                Miền Bắc
              </p>
            </div>

            <div className="flex flex-wrap justify-center space-x-4 p-4">
              {northernTours.map((tour, index) => (
                <TourCard key={tour.id || index} tour={tour} user={user} />
              ))}
            </div>
          </div>

          {/* MT */}
          <div className="flex items-center space-x-6 mt-3 mb-3">
            <div className="flex flex-wrap justify-center space-x-4 p-4">
              {centralTours.map((tour, index) => (
                <TourCard key={tour.tourId || index} tour={tour} user={user} />
              ))}
            </div>
            <div
              ref={(el) => (elementRefs.current[1] = el)}
              data-direction="right"
              className="group overflow-hidden relative w-72 h-72 rounded-full "
            >
              <img
                src={HoiAnImage}
                alt="Hạ Long"
                className="w-full h-full object-cover rounded-full transform transition-transform duration-1000 ease-in-out group-hover:scale-105"
              />
              <p className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10 text-4xl font-dancing-script text-white font-bold whitespace-nowrap">
                Miền Trung
              </p>
            </div>
          </div>

          {/* MN */}
          <div className="flex items-center space-x-6 mt-3 mb-3">
            <div
              ref={(el) => (elementRefs.current[2] = el)}
              data-direction="left"
              className="group overflow-hidden relative w-72 h-72 rounded-full "
            >
              <img
                src={BaDenImage}
                alt="Núi Bà Đen"
                className="w-full h-full object-cover rounded-full transform transition-transform duration-1000 ease-in-out group-hover:scale-105"
              />
              <p className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10 text-4xl font-dancing-script text-white font-bold">
                Miền Nam
              </p>
            </div>

            <div className="flex flex-wrap justify-center space-x-4 p-4">
              {southernTours.map((tour, index) => (
                <TourCard key={tour.tourId || index} tour={tour} user={user} />
              ))}
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

export default MainLayout;
