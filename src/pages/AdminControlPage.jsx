import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home as HomeIcon,
  KeyboardIcon as KeyboardIcon,
} from "lucide-react";
import "../styles/Login.css";
import { useTranslation } from 'react-i18next';

export default function AdminControlPage() {
  const { t } = useTranslation();
  const [color, setColor] = useState(localStorage.getItem("selectedColor") || "#ffffff");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.getElementById("root").style.backgroundColor = color;
    const token = localStorage.getItem("authToken");
    setUser(token);
  }, [color]);

  const handleChangeColor = (e) => {
    const newColor = e.target.value;
    setColor(newColor);
    localStorage.setItem("selectedColor", newColor);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-transparent backdrop-blur-md p-6 rounded-lg shadow-lg w-full max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between relative">
          <button 
            className="text-red-600 hover:text-red-800 relative"
            onClick={() => navigate("/")}
          >
            <HomeIcon size={28} />
          </button>
          {/* Tiêu đề ở giữa */}
          <div className="text-center mb-4 relative flex-1">
            <h1 className="text-3xl font-bold text-black relative inline-block">
              <span className="relative">
                3
                <input
                  type="color"
                  value={color}
                  onChange={handleChangeColor}
                  className="absolute left-1/2 transform -translate-x-1/2 top-full mt-1 w-10 h-8 cursor-pointer"
                />
              </span>{" "}
              - {t('adminControl.title', 'BẢNG ĐIỀU KHIỂN')}
            </h1>
          </div>
          <button 
            className="text-red-600 hover:text-red-800"
            onClick={() => navigate("/admin-control")}
          >
            <KeyboardIcon size={28} />
          </button>
        </div>

        {/* Content */}
        <div className="mt-6 text-center">
          <div className="bg-white bg-opacity-20 backdrop-blur-md p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-black mb-4">
              {t('adminControl.welcomeTitle', 'Chào mừng đến với Bảng Điều Khiển')}
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              {t('adminControl.welcomeMessage', 'Trang này đang được phát triển. Các tính năng quản trị sẽ được thêm vào sớm.')}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-blue-100 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800">
                  {t('adminControl.userManagement', 'Quản lý người dùng')}
                </h3>
                <p className="text-sm text-blue-600 mt-2">
                  {t('adminControl.comingSoon', 'Sắp ra mắt')}
                </p>
              </div>
              <div className="bg-green-100 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800">
                  {t('adminControl.systemKeyboardIcon', 'Cài đặt hệ thống')}
                </h3>
                <p className="text-sm text-green-600 mt-2">
                  {t('adminControl.comingSoon', 'Sắp ra mắt')}
                </p>
              </div>
              <div className="bg-purple-100 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800">
                  {t('adminControl.analytics', 'Phân tích')}
                </h3>
                <p className="text-sm text-purple-600 mt-2">
                  {t('adminControl.comingSoon', 'Sắp ra mắt')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}