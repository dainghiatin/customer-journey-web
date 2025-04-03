import React, { useState, useEffect } from "react";
import "../styles/Login.css";

export default function LoginPage() {
  const [color, setColor] = useState(localStorage.getItem("selectedColor"));
  const [expanded, setExpanded] = useState(false);

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
              />
            </div>

            <div className="grid grid-cols-1 items-center gap-4">
              <input
                type="text"
                className="border p-2 rounded w-full"
                placeholder="MẬT KHẨU (PASSWORD)"
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <div className="flex gap-4 w-full">
                <input
                  type="text"
                  className="border p-2 rounded w-full"
                  placeholder="NHẬP MÃ CAPCHA (INPUT CAPCHA CODE)"
                />
                {/* <input
                  type="text"
                  className=" p-2 rounded w-full"
                  placeholder="(mã capcha, xác nhận)"
                  disabled
                /> */}
                <img src="https://www.tnc.com.vn/uploads/File/Image/c1_2.jpg" className="w-60" alt="" />
              </div>
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <div className="flex gap-4 w-full">
                <button className="border-2 border-black text-black font-bold px-6 py-2 rounded hover:bg-gray-200 flex-1">
                  ĐĂNG NHẬP <br />
                  <i>(LOG IN)</i>
                </button>
              </div>
              <div className="flex gap-4 w-full">
                <button className="border-2 border-black text-black font-bold px-6 py-2 rounded hover:bg-gray-200 flex-1">
                  QUÊN MẬT KHẨU <br />
                  <i>(FORGOT PASSWORD)</i>
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
            <h2 className="text-1xl text-center text-black">
              THÔNG TIN NHẬP CHƯA CHÍNH XÁC, VUI LÒNG NHẬP LẠI <br />
              <i>(YOUR INFORMATION INPUTED IS NOT CORRECT, PLEASE TRY AGAIN)</i>
            </h2>

            {/* CHANGE PASSWORD */}
            {/* <div className="mt-5">
              <div className="text-1xl font-semibold text-red-500">
                VUI LÒNG KIỂM TRA ZALO, WHATSAPP, SMS CỦA BẠN ĐỂ ĐỔI MẬT KHẨU VÀ
                ĐĂNG NHẬP. <br /> (PLEASE CHECK YOUR ZALO, WHATSAPP, SMS AND
                CHANGE PASSWORD TO LOG IN).
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
