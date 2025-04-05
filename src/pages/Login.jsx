import React, { useState, useEffect } from "react";
import "../styles/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
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

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:1337/api/auth/login", {
        cccd,
        password,
      }, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        localStorage.setItem("authToken", response.data.token);
        alert("Đăng nhập thành công!");
        navigate("/"); // Chuyển hướng về trang chủ
      }
    } catch (error) {
      setErrorMessage("Thông tin đăng nhập không chính xác!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-transparent backdrop-blur-md p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
        <div className="flex items-center justify-center relative">
          {/* Input Color nằm bên trái */}
          <input
            type="color"
            value={color}
            onChange={handleChangeColor}
            className="absolute left-0 my-2"
          />
          {/* Tiêu đề ở giữa */}
          <div className="text-center w-full">
            <h1 className="text-3xl font-bold text-black">2 - ĐĂNG NHẬP</h1>
            <h2 className="text-2xl text-black">
              <i>(LOGIN)</i>
            </h2>
          </div>
        </div>

        {/* LOGIN */}
        <div className="mt-6">
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-1 items-center gap-4">
              <input
                type="text"
                className="border p-2 rounded w-full"
                placeholder="CCCD / MST (ID)"
                value={cccd}
                onChange={(e) => setCccd(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 items-center gap-4">
              <input
                type="text"
                className="border p-2 rounded w-full"
                placeholder="MẬT KHẨU (PASSWORD)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <div className="flex gap-4 w-full">
                <input
                  type="text"
                  className="border p-2 rounded w-full"
                  placeholder="NHẬP MÃ CAPCHA (INPUT CAPCHA CODE)"
                />
                <img src="https://www.tnc.com.vn/uploads/File/Image/c1_2.jpg" className="w-60" alt="" />
              </div>
            </div>
            {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
            <div className="grid grid-cols-2 items-center gap-4">
              <div className="flex gap-4 w-full">
                <button className="border-2 border-black text-black font-bold px-6 py-2 rounded hover:bg-gray-200 flex-1" onClick={handleLogin}>
                  ĐĂNG NHẬP <br />
                  <span className="text-xs text-gray-600">(LOG IN)</span>
                </button>
              </div>
              <div className="flex gap-4 w-full">
                <button className="border-2 border-black text-black font-bold px-6 py-2 rounded hover:bg-gray-200 flex-1">
                  QUÊN MẬT KHẨU <br />
                  <span className="text-xs text-gray-600">(FORGOT PASSWORD)</span>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <label className="text-left"></label>
              <div className="flex gap-4 w-full">
                <div className="flex-1">
                  <input
                    type="text"
                    className="border p-2 rounded w-full"
                    placeholder="SĐT (PHONE)"
                  />
                </div>
                <div className="flex-1">
                  <div className="grid grid-cols-1 items-center gap-4">
                    <button className="border-2 border-black text-black font-bold px-6 py-2 rounded hover:bg-gray-200 flex-1">
                      GỬI
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <h2 className="text-xl text-center text-black">
              THÔNG TIN NHẬP CHƯA CHÍNH XÁC, VUI LÒNG NHẬP LẠI <br />
              <span className="text-xs text-gray-600">
                (YOUR INFORMATION INPUTED IS NOT CORRECT, PLEASE TRY AGAIN)
              </span>
            </h2>

          </div>
        </div>
      </div>
    </div>
  );
}
