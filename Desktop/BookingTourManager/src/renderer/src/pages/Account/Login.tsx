import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleSubmitLogin = (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault(); // Ngăn hành vi reload trang
        console.log("Email:", email);
        console.log("Password:", password);
        // Thêm logic xử lý đăng nhập tại đây
    };

    return (

        <div
        className="flex items-center justify-center  bg-cover bg-center"
            style={{
                backgroundImage: `url('https://res.cloudinary.com/doqbelkif/image/upload/v1732992744/0f9e7739-bea8-4d07-be8d-80d9296a8a5e.png')`,
                backgroundSize: 'contain', // Đảm bảo ảnh bao phủ toàn bộ diện tích phần tử
                backgroundPosition: 'center', // Đảm bảo ảnh được căn giữa
                height: '100vh', // Đảm bảo chiều cao của phần tử chiếm toàn bộ màn hình
                width:"100vw"
            }}
        >
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-2xl font-bold text-center mb-2">ĐĂNG NHẬP</h1>
                <p className="text-center mb-8 font-semibold px-8">
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
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
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
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                                    placeholder="Mật khẩu"
                                />
                                <span
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? (
                                        <Eye size={18} color="#3fd0d4" />
                                    ) : (
                                        <EyeOff size={18} color="#3fd0d4" />
                                    )}
                                </span>
                            </div>
                        </div>
                        <div className="flex justify-end items-center">
                            <a href="#" className="text-sm text-gray-500">
                                Bạn quên mật khẩu?
                            </a>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-2/3 bg-teal-500 text-white py-2 rounded-md text-lg font-medium hover:bg-teal-600"
                            onClick={handleSubmitLogin}
                        >
                            ĐĂNG NHẬP
                        </button>
                    </div>
                </form>
            </div>
        </div >
    );
};

export default Login;
