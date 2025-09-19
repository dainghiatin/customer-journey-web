import React, { useState, useEffect } from "react";
import "../styles/Login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import {
  Home as HomeIcon,
  Settings as SettingsIcon,
} from "lucide-react";

export default function NewPostPage() {
  const { t } = useTranslation();
  const [color, setColor] = useState(localStorage.getItem("selectedColor"));
  const [cccd, setCccd] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const handleChangeColor = (e) => {
    const newColor = e.target.value;
    setColor(newColor);
    localStorage.setItem("selectedColor", newColor);
  };

  useEffect(() => {
    document.getElementById("root").style.backgroundColor = color;
    const token = localStorage.getItem("authToken");
    setUser(token);
  }, [color]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-transparent backdrop-blur-md p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
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
                4{/* input màu ngay dưới số 2 */}
                <input
                  type="color"
                  value={color}
                  onChange={handleChangeColor}
                  className="absolute left-1/2 transform -translate-x-1/2 top-full mt-1 w-10 h-8 cursor-pointer"
                />
              </span>
              &nbsp;- {t('posts.newPost', 'ĐĂNG BÀI MỚI')}
            </h1>

            {/* LOGIN bên dưới */}
            <h2 className="text-2xl text-black mt-2">
              <i>({t('posts.newPostEn', 'New post')})</i>
            </h2>
          </div>
          <button 
            className="text-red-600 hover:text-red-800"
            onClick={() => navigate("/admin-control")}
          >
            <SettingsIcon size={28} />
          </button>
        </div>

        {/* Three columns layout */}
        <div className="mt-6">
          <div className="grid grid-cols-3 gap-4 border border-gray-300">
            {/* Column 1 */}
            <Link to={'../new-good-post'} className="border-r border-gray-400 p-4 text-center">
              <h3 className="font-bold text-lg">{t('posts.goods', 'HÀNG HÓA')}</h3>
              <p className="text-sm italic">({t('posts.goodsEn', 'Goods')})</p>
            </Link>

            {/* Column 2 */}
            <Link to={'../new-freelancer-post'} className="border-r border-gray-400 p-4 text-center">
              <h3 className="font-bold text-lg">{t('posts.freelancer', 'CÔNG VIỆC TỰ DO')}</h3>
              <p className="text-sm italic">({t('posts.freelancerEn', 'Freelancer')})</p>
            </Link>

            {/* Column 3 */}
            <Link to={'../new-ai-live-post'} className="p-4 text-center">
              <h3 className="font-bold text-lg">{t('posts.aiLive', 'Ai LIVE')}</h3>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
