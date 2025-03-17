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
            <h1 className="text-3xl font-bold text-black">
              2 - ĐĂNG NHẬP TÀI KHOẢN
            </h1>
            <h2 className="text-2xl text-black">(LOGIN)</h2>
          </div>
        </div>

        {/* LOGIN */}
        <div className="mt-6">
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 items-center gap-4">
              <label className="text-left text-black font-bold">ID</label>
              <input
                type="text"
                className="border p-2 rounded w-full"
                placeholder="(nhập)   CCCD / MST"
              />
            </div>

            <div className="grid grid-cols-2 items-center gap-4">
              <label className="text-left text-black font-bold">
                MẬT KHẨU: <br />
                (PASSWORD)
              </label>
              <input
                type="text"
                className="border p-2 rounded w-full"
                placeholder="(nhập) (chứa IN HOA, chữ thường, số, và ký tự đặc biệt)"
              />
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <label className="text-left text-black font-bold">
                NHẬP MÃ CAPCHA, XÁC NHẬN
              </label>
              <div className="flex gap-4 w-full">
                <input
                  type="text"
                  className="border p-2 rounded w-full"
                  placeholder="Nhập mã Capcha"
                />
                <input
                  type="text"
                  className=" p-2 rounded w-full"
                  placeholder="(mã capcha, xác nhận)"
                  disabled
                />
              </div>
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <label className="text-left">
                Đăng nhập bằng mã QR (mở app và quét mã QR)
              </label>
              <div className="flex gap-4 w-full">
                <button className="border-2 border-black text-black font-bold px-6 py-2 rounded hover:bg-gray-200 flex-1">
                  ĐĂNG NHẬP <br />
                  (LOG IN)
                </button>
                <button className="border-2 border-black text-black font-bold px-6 py-2 rounded hover:bg-gray-200 flex-1">
                  QUÊN MẬT KHẨU <br />
                  (FORGOT PASSWORD)
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <label className="text-left"></label>
              <div className="flex gap-4 w-full">
                <div className="flex-1">
                  {/* <select name="" id="" className="border p-2 rounded">
                    <option value="">ZALO</option>
                    <option value="">WHATSAPP</option>
                    <option value="">SMS</option>
                  </select> */}
                </div>
                <div className="flex-1">
                  <div className="grid grid-cols-2 items-center gap-4">
                    <label className="text-left text-red-500">
                      NHẬP SỐ: <br />
                      (INPUT YOUR NUMBER)
                    </label>
                    <input
                      type="text"
                      className="border p-2 rounded w-full"
                      placeholder="Nhập"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 items-center gap-4">
              <div>
                <label className="text-left">
                  NHẬP MÃ OTP NẾU LÀ THIẾT BỊ LẠ <br />
                  (INPUT OTP CODE IF IT IS A STRANGE DEVICE )
                </label>
              </div>
              <div className="flex gap-4 w-full">
                <div className="flex-1 grid grid-cols-2 items-center gap-4">
                  <input
                    type="text"
                    className="border p-2 rounded w-full"
                    placeholder="Nhập"
                  />
                  <button className="border-2 border-black text-black font-bold px-6 py-2 rounded hover:bg-gray-200 flex-1">
                    GỬI
                  </button>
                </div>
                <div className="flex-1 grid grid-cols-2 items-center gap-4">
                  <label className="text-left text-red-500">ID</label>
                  <input
                    type="text"
                    className="border p-2 rounded w-full"
                    placeholder="Nhập"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <label className="text-left">
                duy trì đăng nhập 168 giờ (7 ngày), sau đó tự động thoát và bắt
                buộc đăng nhập lại.
              </label>
              <div className="flex gap-4 w-full">
                <div className="px-6 py-2 rounded flex-1"></div>
                <button className="border-2 border-black text-red-500 font-bold px-6 py-2 rounded hover:bg-gray-200 flex-1">
                  GỬI <br />
                  (SEND)
                </button>
              </div>
            </div>
            <h2 className="text-1xl text-center text-black">
              THÔNG TIN NHẬP CHƯA CHÍNH XÁC, VUI LÒNG NHẬP LẠI <br />
              (YOUR INFORMATION INPUTED IS NOT CORRECT, PLEASE TRY AGAIN)
            </h2>

            {/* CHANGE PASSWORD */}
            {/* <div className="mt-5">
              <div className="text-1xl font-semibold text-red-500">
                VUI LÒNG KIỂM TRA ZALO, WHATSAPP, SMS CỦA BẠN ĐỂ ĐỔI MẬT KHẨU VÀ
                ĐĂNG NHẬP. <br /> (PLEASE CHECK YOUR ZALO, WHATSAPP, SMS AND
                CHANGE PASSWORD TO LOG IN).
              </div>
            </div> */}
            <div className="mt-5">
              <h2 className="text-1xl text-center font-semibold text-black mt-5">
                THAY ĐỔI MẬT KHẨU <br />
                (CHANGE YOUR PASSWORD)
              </h2>
            </div>
            <div className="grid gap-4">
              <input
                type="text"
                className="border p-2 rounded w-full"
                placeholder="ID"
              />
              <input
                type="password"
                className="border p-2 rounded w-full"
                placeholder="MẬT KHẨU CŨ (OLD PASSWORD)"
              />
              <input
                type="password"
                className="border p-2 rounded w-full text-sm placeholder:text-xs min-h-[50px]"
                placeholder="MẬT KHẨU MỚI (chứa IN HOA, chữ thường, số, và ký tự đặc biệt) (NEW PASSWORD include UPPERCASE, lowercase letters, numbers, and special characters)"
              />
              <input
                type="password"
                className="border p-2 rounded w-full text-sm placeholder:text-xs min-h-[50px]"
                placeholder="NHẬP LẠI MẬT KHẨU MỚI (chứa IN HOA, chữ thường, số, và ký tự đặc biệt) (REPEAT NEW PASSWORD include UPPERCASE, lowercase letters, numbers, and special characters)"
              />
            </div>
          </div>
          <div className="text-center mt-4">
            <button className="border-2 border-black text-black font-bold px-6 py-2 rounded hover:bg-gray-200 flex-1">
              XÁC NHẬN <br />
              (ACCEPT)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
