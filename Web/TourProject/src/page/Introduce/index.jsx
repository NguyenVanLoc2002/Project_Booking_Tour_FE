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
import { FaBus } from "react-icons/fa6";
import { GiCommercialAirplane, GiShipBow } from "react-icons/gi";
import { BsCalendar4Week, BsCalendarHeart } from "react-icons/bs";
import { TiWeatherPartlySunny } from "react-icons/ti";
import Footer from "../../layouts/Footer";

function Introduce() {




  return (
    <>
      <div className="w-full h-full flex flex-col">
        <Header />
        <Menu name="Introduce"/>

        <div className="container mx-auto">
          <div className="relative">
            <img alt="Beautiful landscape with mountains and a boat on the water" className="w-full h-[600px]" src="https://res.cloudinary.com/doqbelkif/image/upload/v1726605866/35784823-5c44-4f7e-b095-ec45a2d129ec.png" />
          </div>
          <div className="p-8">
            <div className="flex mb-[40px] mt-[40px]">
              <div className="w-3/5">
                <h2 className="text-2xl font-bold mb-4">
                  Giới thiệu
                </h2>
                <p className="mb-4">
                  Lucky Panda Travel tự hào là đơn vị dẫn đầu trong công việc mang đến những hành trình khám phá tuyệt vời tại Việt Nam. Sứ mệnh của chúng tôi là đem lại sự trải nghiệm độc đáo và dịch vụ tuyệt hảo cho khách hàng. Chúng tôi hiểu rằng mỗi chuyến đi là một cơ hội để trải nghiệm, và chúng tôi luôn nỗ lực để mang đến những hành trình đáng nhớ.
                  Trang web của Lucky Panda Travel được xây dựng với sự chú trọng đến trải nghiệm của khách hàng. Chúng tôi cung cấp thông tin chi tiết về các điểm đến, loại hình du lịch và các dịch vụ liên quan. Bạn có thể dễ dàng tìm kiếm, lựa chọn và đặt tour du lịch phù hợp với nhu cầu của mình. Chúng tôi cam kết mang đến cho bạn những thông tin chính xác, cập nhật và hữu ích nhất. Đội ngũ nhân viên của chúng tôi luôn sẵn sàng hỗ trợ bạn trong mọi khâu của hành trình, từ việc lên kế hoạch cho đến khi bạn trở về nhà an toàn.
                  Lucky Panda Travel còn cung cấp các dịch vụ đặc biệt, như tổ chức sự kiện, hội nghị và các chương trình team building. Chúng tôi hiểu rằng mỗi chuyến đi đều là một trải nghiệm đặc biệt và chúng tôi luôn nỗ lực để mang đến cho bạn những trải nghiệm đáng nhớ.
                </p>
              </div>
              <div className="w-2/5 flex items-center ">
                <img alt="Modern office space with desks and chairs" className="w-4/5  border-4 h-[300px] border-gray-500 ml-auto" src="https://storage.googleapis.com/a1aa/image/m1znoUXYPN7cE1fhWRnjr5IHexgt2EIUSHFpLlti2DXhRfGnA.jpg" />
              </div>
            </div>
            <div className="flex  justify-between items-center mb-[40px]" >
              <div className="w-1/5 flex items-center">
                <img alt="Hand holding a globe with a view of the earth" className="w-full rounded-full border-4 h-[300px] border-gray-500 ml-10" src="https://storage.googleapis.com/a1aa/image/XEXbe9hlSekLckzN7X54sUDsqsxJ7Zr20mexzjc2TcD9ieNOB.jpg" />
              </div>
              <div className="w-3/5">
                <h2 className="text-2xl font-bold mb-4 text-right mr-8">
                  Sứ mệnh
                </h2>
                <p className="mb-4">
                  Sứ mệnh của Lucky Panda Travel là mang đến những trải nghiệm ấn tượng, độc đáo, dễ dàng và đáng nhớ cho mỗi khách hàng.
                  Chúng tôi cam kết không ngừng cải thiện chất lượng, và chăm sóc từng chuyến đi của bạn từ khi bắt đầu đến khi kết thúc, giúp bạn khám phá và trải nghiệm những điều tuyệt vời nhất.
                  Với tinh thần trách nhiệm cao, Lucky Panda Travel luôn đề cao bảo vệ sự bền vững của môi trường, văn hóa, và nền kinh tế, và mong hành trình của bạn sẽ thật đầy ý nghĩa.
                </p>

              </div>

            </div>
            <div className="flex  items-center">
              <div className="w-4/5">
                <h2 className="text-2xl font-bold mb-4">
                  Tầm nhìn
                </h2>
                <ul className="list-disc list-inside mb-4">
                  <li>
                    Trở thành thương hiệu du lịch được yêu thích nhất của người Việt Nam.
                  </li>
                  <li>
                    Phát triển các dịch vụ du lịch bền vững tại Việt Nam.
                  </li>
                  <li>
                    Phát triển mạnh mẽ các dịch vụ du lịch thông minh.
                  </li>
                  <li>
                    Khám phá và đưa vào khai thác những điểm đến mới lạ.
                  </li>
                  <li>
                    Góp phần nâng cao vị thế của du lịch Việt Nam trên thị trường quốc tế.
                  </li>
                </ul>
              </div>
              <div className="flex   w-2/5 ">
                <img alt="Person holding a lens with a view of a beautiful landscape" className="w-full h-[250px]" src="https://storage.googleapis.com/a1aa/image/AQTcFe05ia3rcaXULHxCsqguJd4XrFrfCjkLVkPF57dfieNOB.jpg"/>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

export default Introduce;
