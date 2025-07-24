import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home as HomeIcon,
  Settings as SettingsIcon,
} from "lucide-react";
import "../styles/Login.css";
import AiLiveLiveStreamComponent from "../components/AiLiveLiveStreamComponent";
import AiLiveVideoComponent from "../components/AiLiveVideoComponent";
import AiLiveMovieComponent from "../components/AiLiveMovieComponent";
import AiLiveLiveComponent from "../components/AiLiveLiveComponent";


export default function AiLivePage() {
  const [color, setColor] = useState(localStorage.getItem("selectedColor") || "#ffffff");
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const [selectedComponent, setSelectedComponent] = useState(null);


  useEffect(() => {
    document.getElementById("root").style.backgroundColor = color;
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
        <div className="flex items-center justify-between  relative mb-6">
          <button className="text-red-600 hover:text-red-800 relative">
            <HomeIcon size={28} />
          </button>
          <div className="text-center mb-4 relative">
            <h1 className="text-3xl font-bold text-black relative inline-block">
              <span className="relative">
                8
                <input
                  type="color"
                  value={color}
                  onChange={handleChangeColor}
                  className="absolute left-1/2 transform -translate-x-1/2 top-full mt-1 w-10 h-8 cursor-pointer"
                />
              </span>{" "}
              - Ai LIVE
            </h1>
          </div>
          <button className="text-red-600 hover:text-red-800">
            <SettingsIcon size={28} />
          </button>
        </div>

        {/* Grid Content */}
        <div className="mt-6">
        <div className="grid grid-cols-5 border border-black text-center text-black">
          <div className="p-2 font-semibold border-r">
            TÀI KHOẢN Ai LIVE
            <br />
            <i>(Account of Ai LIVE)</i>
          </div>
          <div className="p-2 font-semibold border-r">(lệnh)</div>
          <div className="p-2 font-semibold border-r text-yellow-600">
            VNĐ
            <br />
            <span className="text-xs">(thay đổi bằng tiền bản địa sau đăng nhập)</span>
          </div>
          <div className="p-2 border-r">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full text-center border border-gray-400 rounded px-2 py-1"
              placeholder="Nhập số"
            />
          </div>
          <div className="p-2 font-semibold">
            CHUYỂN VỀ VÍ
            <br />
            <i>(Transfer to wallet)</i>
          </div>
        </div>
        </div>
        {/* Hàng trống */}
        <div className="grid grid-cols-5 border-x border-b border-black h-10"></div>

        {/* 6 Buttons */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          {[
            { label: "LIVESTREAM", sub: "(Goods)", value: "LIVESTREAM" },
            { label: "VIDEO", sub: "", value: "VIDEO" },
            { label: "PHIM", sub: "(MOVIES)", value: "MOVIE" },
            { label: "TRỰC TIẾP", sub: "(Live)", value: "LIVE" },
            { label: "CÔNG CỤ", sub: "(Equipment)", value: "EQUIPMENT" },
            { label: "TRÒ CHƠI", sub: "(Game)", value: "GAME" },
          ].map((item, idx) => (
            <button
              key={idx}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-lg text-center shadow-md transition-all"
              onClick={() => {setSelectedComponent(item.value);}}
            >
              {item.label}
              <br />
              <span className="italic text-sm">{item.sub}</span>
            </button>
          ))}
        </div>
        {/* Hiển thị component tùy theo lựa chọn */}
        {selectedComponent === "LIVESTREAM" && (
        <AiLiveLiveStreamComponent />
        )}
        {selectedComponent === "VIDEO" && (
        <AiLiveVideoComponent />
        )}
        {selectedComponent === "MOVIE" && (
        <AiLiveMovieComponent />
        )}
        {selectedComponent === "LIVE" && (
        <AiLiveLiveComponent />
        )}
      </div>
    </div>
  );
}
