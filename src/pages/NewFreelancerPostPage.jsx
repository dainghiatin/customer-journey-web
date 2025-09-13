import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../styles/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NewFreelancerPostDirectComponent from "../components/NewFreelancerPostDirectComponent";
import NewFreelancerPostOnlineComponent from "../components/NewFreelancerPostOnlineComponent";

export default function NewFreelancerPostPage() {
  const { t } = useTranslation();
  const [color, setColor] = useState(localStorage.getItem("selectedColor"));
  const [activeTab, setActiveTab] = useState("direct"); // "direct" or "online"
  const navigate = useNavigate();

  const handleChangeColor = (e) => {
    const newColor = e.target.value;
    setColor(newColor);
    localStorage.setItem("selectedColor", newColor);
  };

  useEffect(() => {
    document.getElementById("root").style.backgroundColor = color;
  }, [color]);

  return (
    <div className="flex justify-center items-center min-h-screen">

      <div className="bg-transparent backdrop-blur-md p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
              <div className="relative justify-between flex">
        <button onClick={()=>{navigate("../")}}  className="p-2">
          <i class="fa-solid fa-house"></i>
        </button>
        <button className=" right-0 p-2" ><i class="fa-solid fa-solar-panel"></i></button>
      </div>
        <div className="flex items-center justify-center relative">
          {/* Tiêu đề ở giữa */}
          <div className="text-center mb-4 relative">
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

            {/* New post bên dưới */}
            <h2 className="text-2xl text-black mt-2">
              <i>(New post)</i>
            </h2>
          </div>
        </div>

        {/* Table layout matching the image */}
        <div className="mt-6">
          <div className="border border-gray-300">
            {/* Header row - CÔNG VIỆC TỰ DO */}
            <div className="text-center p-4 border-b border-gray-300">
              <h3 className="font-bold text-lg">CÔNG VIỆC TỰ DO</h3>
              <p className="text-sm italic">(Freelancer)</p>
            </div>
            
            {/* Two columns layout */}
            <div className="grid grid-cols-2">
              {/* Column 1 - THỰC TẾ */}
              <div 
                className={`border-r border-gray-300 p-4 text-center cursor-pointer ${activeTab === "direct" ? "bg-orange-100" : ""}`}
                onClick={() => setActiveTab("direct")}
              >
                <h3 className="font-bold text-orange-500">THỰC TẾ</h3>
                <p className="text-sm italic text-orange-500">(Actual)</p>
              </div>

              {/* Column 2 - TRỰC TUYẾN */}
              <div 
                className={`p-4 text-center cursor-pointer ${activeTab === "online" ? "bg-blue-100" : ""}`}
                onClick={() => setActiveTab("online")}
              >
                <h3 className="font-bold text-blue-500">TRỰC TUYẾN</h3>
                <p className="text-sm italic text-blue-500">(Online)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Render the appropriate component based on the active tab */}
        {activeTab === "direct" ? (
          <NewFreelancerPostDirectComponent />
        ) : (
          <NewFreelancerPostOnlineComponent />
        )}
      </div>
    </div>
  );
}
