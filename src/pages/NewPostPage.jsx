import React, { useState, useEffect } from "react";
import "../styles/Login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function NewPostPage() {
  const [color, setColor] = useState(localStorage.getItem("selectedColor"));
  const [cccd, setCccd] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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
              &nbsp;- ĐĂNG BÀI MỚI
            </h1>

            {/* LOGIN bên dưới */}
            <h2 className="text-2xl text-black mt-2">
              <i>(New post)</i>
            </h2>
          </div>
        </div>

        {/* Three columns layout */}
        <div className="mt-6">
          <div className="grid grid-cols-3 gap-4 border border-gray-300">
            {/* Column 1 */}
            <Link to={'../new-good-post'} className="border-r border-gray-400 p-4 text-center">
              <h3 className="font-bold text-lg">HÀNG HÓA</h3>
              <p className="text-sm italic">(Goods)</p>
            </Link>

            {/* Column 2 */}
            <Link to={'../new-freelancer-post'} className="border-r border-gray-400 p-4 text-center">
              <h3 className="font-bold text-lg">CÔNG VIỆC TỰ DO</h3>
              <p className="text-sm italic">(Freelancer)</p>
            </Link>

            {/* Column 3 */}
            <div className="p-4 text-center">
              <h3 className="font-bold text-lg">Ai LIVE</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
