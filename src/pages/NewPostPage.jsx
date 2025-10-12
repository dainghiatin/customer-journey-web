import React, { useState, useEffect, useRef } from "react";
import "../styles/Login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import {
  Home as HomeIcon,
  KeyboardIcon as KeyboardIcon,
  Camera as CameraIcon
} from "lucide-react";

export default function NewPostPage() {
  const { t } = useTranslation();
  const [color, setColor] = useState(localStorage.getItem("selectedColor"));
  const [showCamera, setShowCamera] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const videoRef = useRef(null);
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

    // Cleanup camera stream when component unmounts
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [color, cameraStream]);

  const openCamera = async (e) => {
    e.preventDefault();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraStream(stream);
      setShowCamera(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert(t('camera.error', 'Không thể truy cập camera. Vui lòng kiểm tra quyền truy cập.'));
    }
  };

  const closeCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
    }
    setCameraStream(null);
    setShowCamera(false);
  };

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
            <KeyboardIcon size={28} />
          </button>
        </div>

        {/* Two large boxes layout */}
        <div className="mt-6">
          <div className="grid grid-cols-2 gap-4 border border-gray-300">
            {/* Scan CCCD */}
            <div className="border-r border-gray-400 p-4 text-center cursor-pointer" onClick={openCamera}>
               <div className="flex flex-col items-center justify-center h-40">
                 <CameraIcon size={48} className="mb-2" />
                 <h3 className="font-bold text-lg">{t('posts.scanId', 'CCCD CỦA NGƯỜI ĐĂNG BÀI')}</h3>
                 <p className="text-sm italic">({t('posts.scanIdEn', 'Poster\'s ID')})</p>
               </div>
             </div>

             {/* Recording Your Goods Video */}
             <div className="p-4 text-center cursor-pointer" onClick={openCamera}>
               <div className="flex flex-col items-center justify-center h-40">
                 <CameraIcon size={48} className="mb-2" />
                 <h3 className="font-bold text-lg">{t('posts.recordVideo', 'ĐĂNG KÝ KINH DOANH CỦA DOANH NGHIỆP ĐĂNG BÀI')}</h3>
                 <p className="text-sm italic">({t('posts.recordVideoEn', 'Poster\'s TRADE REGISTRATION COMPANY')})</p>
               </div>
             </div>
          </div>
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

        {/* Camera Modal */}
        {showCamera && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg max-w-2xl w-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{t('camera.title', 'Camera')}</h2>
                <button 
                  className="text-gray-700 hover:text-gray-900"
                  onClick={closeCamera}
                >
                  ✕
                </button>
              </div>
              <div className="relative">
                <video 
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-auto border border-gray-300 rounded"
                />
              </div>
              <div className="mt-4 flex justify-center">
                <button 
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2"
                  onClick={closeCamera}
                >
                  {t('camera.capture', 'Chụp')}
                </button>
                <button 
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                  onClick={closeCamera}
                >
                  {t('camera.cancel', 'Hủy')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
