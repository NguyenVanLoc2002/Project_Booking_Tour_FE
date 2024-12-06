/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
import forms from "@tailwindcss/forms";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        customColor: "#3fd0d4", // Thêm màu tùy chỉnh
      },
      colors: {
        textColorCustom: "#3fd0d4", // Ví dụ, bạn có thể đặt mã màu tùy ý
      },
      fontFamily: {
        'dancing-script': ['Dancing Script', 'cursive'],
        sriracha: ['Sriracha', 'cursive'],
      }
    },
  },
  plugins: [
    daisyui,
    forms,
    function ({ addUtilities }) {
      const newUtilities = {
        ".underline-hover": {
          position: "relative",
          display: "flex",
        },
        ".underline-hover::before": {
          content: '""',
          position: "absolute",
          bottom: "0",
          left: "0",
          width: "0",
          height: "2px", // Độ dày của gạch chân
          backgroundColor: "#3fd0d4", // Thay đổi màu theo nhu cầu
          transition: "width 0.3s ease", // Thay đổi thời gian và hiệu ứng
        },
        ".underline-hover:hover::before": {
          width: "100%",
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
