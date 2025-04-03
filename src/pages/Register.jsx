import React, { useState, useEffect } from "react";
import "../styles/Register.css";

export default function RegisterPage() {
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
              1 - ĐĂNG KÝ
            </h1>
            <h2 className="text-2xl text-black">
              <i>(REGISTER)</i>
            </h2>
          </div>
        </div>
        <div className="mt-6">
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 items-center gap-4">
              <label className="text-left">
                1. CCCD/ MST NGƯỜI GIỚI THIỆU: <br />
                <i>(Introducing from ID)</i>
              </label>
              <input
                type="text"
                className="border p-2 rounded w-full"
                placeholder="Nhập"
              />
            </div>

            <div className="grid grid-cols-2 items-center gap-4">
              <label className="text-left">
                2. HỢP ĐỒNG: <br />
                <i>(The Contract)</i>
              </label>
              <button className="border-1 text-black px-6 py-2 rounded hover:bg-gray-200 flex-1">
                Ấn xem file
              </button>
            </div>

            <div className="grid grid-cols-2 items-center gap-4">
              <label className="text-left">
                3. KÝ HỢP ĐỒNG: <br />
                <i>(Sign contract)</i>
              </label>
              <input type="checkbox" className="w-5 h-5" />
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <label className="text-left">
                4. HỌ TÊN / TÊN DOANH NGHIỆP: <br />
                <i>(Full name)</i>
              </label>
              <input
                type="text"
                className="border p-2 rounded w-full"
                placeholder="Nhập"
              />
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <label className="text-left">
                5. CCCD/MST: <br />
                <i>(ID)</i>
              </label>
              <input
                type="text"
                className="border p-2 rounded w-full"
                placeholder="Nhập"
              />
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <label className="text-left">
                6. SỐ ĐIỆN THOẠI: <br />
                <i>(Phone number)</i>
              </label>
              <div className="flex gap-4 w-full">
                <input
                  type="text"
                  className="border p-2 rounded w-full"
                  placeholder="Nhập"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <label className="text-left">
                7. SỐ TÀI KHOẢN: <br />
                <i>(Account number)</i>
              </label>
              <input
                type="text"
                className="border p-2 rounded w-full"
                placeholder="Nhập"
              />
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <label className="text-left">
                8. NGÂN HÀNG: <br />
                <i>(With bank)</i>
              </label>
              <select name="" id="" className="border p-2 rounded">
                <option value="">
                  Ngân hàng TNHH MTV Dầu khí toàn cầu (GPBank)
                </option>
                <option value="">
                  Ngân hàng Nông nghiệp và Phát triển Nông thôn Việt Nam
                  (Agribank)
                </option>
                <option value="">
                  Ngân hàng TNHH MTV Đại Dương (OceanBank)
                </option>
                <option value="">
                  Ngân hàng TMCP Công thương Việt Nam (VietinBank)
                </option>
                <option value="">
                  Ngân hàng TMCP Đầu tư và Phát triển Việt Nam (BIDV)
                </option>
                <option value="">
                  Ngân hàng TMCP Ngoại Thương Việt Nam (Vietcombank)
                </option>
              </select>
            </div>

            <div className="grid grid-cols-2 items-center gap-4">
              <label className="text-left">
                9. ĐỊA CHỈ NHẬN HÀNG: <br />
                <i>(Receive goods's address)</i>
                </label>
              <div className="flex w-full">
                <input
                  type="text"
                  className="border p-2 rounded w-1/2"
                  placeholder="SỐ NHÀ (Number) *"
                />
                <div className="text-center w-1/2">
                  <button className="border-2 border-black text-black font-bold px-6 py-2 rounded hover:bg-gray-200">
                    GHIM VỊ TRÍ <i>(Map)</i>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <input type="checkbox" className="w-5 h-5 mt-1" />
              <div className="text-left">
                Tôi xác nhận đã đọc, hiểu rõ và đồng ý, chấp nhận ký hợp đồng
                cũng như tuân thủ mọi điều khoản và điều kiện do SÀN THƯƠNG MẠI
                ĐẠI NGHĨA TÍN yêu cầu bao gồm các nội dung sau: <br />
                1.......... <br />
                2.......... <br />
                3.......... <br />
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <button className="border-2 border-black text-black font-bold px-6 py-2 rounded hover:bg-gray-200 flex-1 w-100">
              ĐĂNG KÝ <br />
              <i>(REGISTER)</i>
            </button>
          </div>
        </div>

        <div className="mt-6">
          {/* <h2 className="text-2xl text-center font-semibold text-black">
            1.2: VUI LÒNG KIỂM TRA ZALO, WHATSAPP, SMS CỦA BẠN VÀ ĐỔI MẬT KHẨU
            ĐỂ ĐĂNG NHẬP
          </h2> */}
          <h4 className="text-1xl text-center font-semibold text-black mt-5">
            THAY ĐỔI MẬT KHẨU <br />
            <i>(CHANGE YOUR PASSWORD)</i>
          </h4>
          <div className="grid gap-4 mt-5">
            <input
              type="text"
              className="border p-2 rounded w-full"
              placeholder="CCCD / MST (ID)"
            />
            <input
              type="password"
              className="border p-2 rounded w-full"
              placeholder="MẬT KHẨU CŨ (Old password)"
            />
            <input
              type="password"
              className="border p-2 rounded w-full text-sm placeholder:text-xs min-h-[50px]"
              placeholder="MẬT KHẨU MỚI (chứa IN HOA, chữ thường, số, và ký tự đặc biệt)(New password inlclude UPPERCASE, lowercase letters, numbers, and special characters)"
            />
            <input
              type="password"
              className="border p-2 rounded w-full text-sm placeholder:text-xs min-h-[50px]"
              placeholder="NHẬP LẠI MẬT KHẨU MỚI (chứa IN HOA, chữ thường, số, và ký tự đặc biệt)(Repeat new password  inlclude UPPERCASE, lowercase letters, numbers, and special characters)"
            />
          </div>

          <div className="text-center mt-4">
            <button className="border-2 border-black text-black font-bold px-6 py-2 rounded hover:bg-gray-200 flex-1">
              XÁC NHẬN <br />
              <i>(ACCEPT)</i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
