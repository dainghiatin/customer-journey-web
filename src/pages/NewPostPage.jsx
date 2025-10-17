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
import PostTypeMenu from "../components/PostTypeMenu";
import useBlinkIdScanner from "../components/MicrolinkIDScanner";
import { extractSideDocumentImage } from "@microblink/blinkid";

export default function NewPostPage() {
  const { t } = useTranslation();
  const [color, setColor] = useState(localStorage.getItem("selectedColor"));
  const [showCamera, setShowCamera] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  // Store document images ready for Cloudinary upload
  const [documentImageFiles, setDocumentImageFiles] = useState({ front: null, back: null });
  const [isDocumentImagesReady, setIsDocumentImagesReady] = useState(false);

  const ImageDataToBlob = function (imageData) {
    let w = imageData.width;
    let h = imageData.height;
    let canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    let ctx = canvas.getContext("2d");
    ctx.putImageData(imageData, 0, 0);        // synchronous

    return new Promise((resolve) => {
      canvas.toBlob(resolve); // implied image/png format
    });
  }

  const { containerRef, toggle, isReady } = useBlinkIdScanner({
    onResult: async (result) => {
      // Extract front and back document images
      const frontImageData = extractSideDocumentImage(result, "first");
      const backImageData = extractSideDocumentImage(result, "second");

      const timestamp = Date.now();
      const [frontBlob, backBlob] = await Promise.all([
        frontImageData ? ImageDataToBlob(frontImageData) : Promise.resolve(null),
        backImageData ? ImageDataToBlob(backImageData) : Promise.resolve(null),
      ]);

      const frontFile = frontBlob ? new File([frontBlob], `document_front_${timestamp}.png`, { type: "image/png" }) : null;
      const backFile = backBlob ? new File([backBlob], `document_back_${timestamp}.png`, { type: "image/png" }) : null;

      setDocumentImageFiles({ front: frontFile, back: backFile });
      setIsDocumentImagesReady(Boolean(frontFile) && Boolean(backFile));
      console.log(URL.createObjectURL(frontFile));
      console.log(URL.createObjectURL(backFile));

      // Stop scanning and close camera UI
      setShowCamera(false);
    },
    onDestroy: () => {
      setShowCamera(false);
    },
    cameraManagerUiOptions: { showMirrorCameraButton: false },
    // resourcesLocation defaults to "/resources"
  });

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
    setShowCamera(true);
    toggle();
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
        <div className="mt-6" ref={containerRef}>
          <div className="grid grid-cols-2 gap-4 border border-gray-300">
            {/* Scan CCCD */}
            <div className="border-r border-gray-400 p-4 text-center cursor-pointer" onClick={openCamera}>
              <div className="flex flex-col items-center justify-center h-40">
                <CameraIcon size={48} className="mb-2" />
                <h3 className="font-bold text-lg">{t('posts.scanId', 'CCCD CỦA NGƯỜI ĐĂNG BÀI')}</h3>
                <p className="text-sm italic">({t('posts.scanIdEn', "Poster's ID")})</p>
              </div>
            </div>

            {/* Recording Your Goods Video */}
            <div className="p-4 text-center cursor-pointer" onClick={openCamera}>
              <div className="flex flex-col items-center justify-center h-40">
                <CameraIcon size={48} className="mb-2" />
                <h3 className="font-bold text-lg">{t('posts.recordVideo', 'ĐĂNG KÝ KINH DOANH CỦA DOANH NGHIỆP ĐĂNG BÀI')}</h3>
                <p className="text-sm italic">({t('posts.recordVideoEn', "Poster's TRADE REGISTRATION COMPANY")})</p>
              </div>
            </div>
          </div>
        </div>

        {/* Three columns layout */}
        <div className="mt-6">
          <div className="border border-gray-300">
            {/* Using the common PostTypeMenu component */}
            <PostTypeMenu activeType={null} />
          </div>
        </div>

      </div>
    </div>
  );
}
