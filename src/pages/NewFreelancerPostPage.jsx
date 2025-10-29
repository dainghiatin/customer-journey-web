import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../styles/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NewFreelancerPostDirectComponent from "../components/NewFreelancerPostDirectComponent";
import NewFreelancerPostOnlineComponent from "../components/NewFreelancerPostOnlineComponent";
import { Home as HomeIcon, KeyboardIcon as KeyboardIcon } from "lucide-react";
import PostTypeMenu from "../components/PostTypeMenu";

export default function NewFreelancerPostPage() {
  const { t } = useTranslation();
  const [user, setUser] = useState(localStorage.getItem("authToken"));
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
                4{/* input màu ngay dưới số 4 */}
                <input
                  type="color"
                  value={color}
                  onChange={handleChangeColor}
                  className="absolute left-1/2 transform -translate-x-1/2 top-full mt-1 w-10 h-8 cursor-pointer"
                />
              </span>
              &nbsp;- {t("freelancer.newPost")}
            </h1>
            <h2 className="text-2xl text-black mt-2">
              
            </h2>
          </div>
          <button
            className="text-red-600 hover:text-red-800"
            onClick={() => navigate("/admin-control")}
          >
            <KeyboardIcon size={28} />
          </button>
        </div>

        {/* Table layout matching the image */}
        <div className="mt-6">
          <div className="border border-gray-300">
            {/* Top Categories Section */}
            <PostTypeMenu activeType="freelancer" />
            {/* TÀI KHOẢN HÀNG HÓA Section */}
            <div className="grid grid-cols-5 border-b border-gray-300">
              <div className="border-r border-gray-300 p-2">
                <div className="font-bold text-center">
                  {t("freelancer.accountOfFreelancer")}
                </div>
              </div>
              <div className="border-r border-gray-300 p-2 text-center">
                <input
                  type="number"
                  name="exchangeRate"
                  className="w-full border border-gray-300 p-1 mt-1"
                  defaultValue="1"
                  onChange={(e) => {
                    const value = parseFloat(e.target.value) || 1;
                    const calculatedValue = value * 1; // Tỉ giá mặc định là 1
                    document.getElementById("calculatedValue").value =
                      calculatedValue;
                  }}
                />
                <div className="font-bold">1</div>
              </div>
              <div className="border-r border-gray-300 p-2 text-center">
                <div className="font-bold  p-1 mt-1">VN</div>
                <div className="mt-1 flex items-center justify-center">
                  <span className="mr-2">D|</span>
                </div>
              </div>
              <div className="border-r border-gray-300 p-2 text-center">
                <input
                  type="number"
                  name="exchangeRate"
                  className="w-full border border-gray-300 p-1 mt-1"
                  defaultValue="1"
                  onChange={(e) => {
                    const value = parseFloat(e.target.value) || 1;
                    const calculatedValue = value * 1; // Tỉ giá mặc định là 1
                    document.getElementById("calculatedValue").value =
                      calculatedValue;
                  }}
                />
                <div className="font-bold">1</div>
              </div>
              <div className="p-2 text-center">
                <div className="font-bold">
                  {t("freelancer.transferToWallet")}
                </div>
                <button
                  type="button"
                  className="mt-1 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                >
                  Chuyển
                </button>
              </div>
            </div>
            {/* Two columns layout */}
            <div className="grid grid-cols-2">
              {/* Column 1 - THỰC TẾ */}
              <div
                className={`border-r border-gray-300 p-4 text-center cursor-pointer ${
                  activeTab === "direct" ? "bg-blue-400" : ""
                }`}
                onClick={() => setActiveTab("direct")}
              >
                <h3 className="font-bold text-orange-500">
                  {t("freelancer.actual")}
                </h3>
              </div>
              {/* Column 2 - TRỰC TUYẾN */}
              <div
                className={`p-4 text-center cursor-pointer ${
                  activeTab === "online" ? "bg-blue-400" : ""
                }`}
                onClick={() => setActiveTab("online")}
              >
                <h3 className="font-bold text-blue-900">
                  {t("freelancer.online")}
                </h3>
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
