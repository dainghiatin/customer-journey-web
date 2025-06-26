import React, { useState, useEffect } from "react";
import "../styles/Register.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ChangePasswordPage() {
  const [color, setColor] = useState(localStorage.getItem("selectedColor"));
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "123456",
    cccd: "",
    reference_id: "",
    full_name: "",
    mobile_number: "",
    bank_number: "",
    bank_name: "",
    address_no: "",
    address_on_map: "",
  });
  const [error, setError] = useState("");

  const handleChangeColor = (e) => {
    const newColor = e.target.value;
    setColor(newColor);
    localStorage.setItem("selectedColor", newColor);
  };

  useEffect(() => {
    document.getElementById("root").style.backgroundColor = color;
  }, [color]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    const { username, cccd } = formData;

    // Kiểm tra các trường bắt buộc
    if (!cccd) {
      setError("Vui lòng điền đầy đủ thông tin cần thiết.");
      return;
    }

    try {
      console.log(formData);
      // const response = await axios.post(
      //   "http://localhost:1337/api/auth/register",
      //   formData,
      //   {
      //     headers: { "Content-Type": "application/json" },
      //   }
      // );

      // console.log("Đăng ký thành công:", response.data);
      alert("Đổi mật khẩu thành công!");
      // navigate("/login"); // Chuyển hướng sau khi đăng ký thành công
    } catch (error) {
      console.error("Lỗi khi đăng ký:", error.response?.data || error.message);
      setError("Đăng ký thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-transparent backdrop-blur-md p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
        <div className="flex items-center justify-center relative">
          {/* Input Color nằm bên trái */}

          {/* Tiêu đề ở giữa */}
          <div className="text-center w-full relative">
            <h1 className="text-3xl font-bold text-black inline-block relative">
              <span className="relative inline-block">
               {/* input màu nằm dưới số 1 */}
                <input
                  type="color"
                  value={color}
                  onChange={handleChangeColor}
                  className="absolute left-[-50px] transform -translate-x-1/2 top-full mt-1 w-10 h-8 cursor-pointer"
                />
              </span>
               ĐỔI MẬT KHẨU
            </h1>

            <h2 className="text-2xl text-black mt-2">
              <i>(Change your password)</i>
            </h2>
          </div>
        </div>

        <div className="mt-6">
          {/* <h2 className="text-2xl text-center font-semibold text-black">
            1.2: VUI LÒNG KIỂM TRA ZALO, WHATSAPP, SMS CỦA BẠN VÀ ĐỔI MẬT KHẨU
            ĐỂ ĐĂNG NHẬP
          </h2> */}
          {/* <h4 className="text-1xl text-center font-semibold text-black mt-5">
            THAY ĐỔI MẬT KHẨU <br />
            <span className="text-xs text-gray-600">
              (CHANGE YOUR PASSWORD)
            </span>
          </h4> */}
          <span className="text-xl font-bold text-black">Đổi mật khẩu </span>
          <span>(Change password)</span>
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
            className="border p-2 rounded w-full text-sm min-h-[50px]"
            placeholder="MẬT KHẨU MỚI"
          />
          <label className="text-xs text-gray-500">
            (chứa 1 IN HOA, 1 thường, 1 số, 1 ký tự đặc biệt)<br />
            (min 1 UPPERCASE, 1 lowercase, 1 number, 1 special character)
          </label>

            <input
              type="password"
              className="border p-2 rounded w-full text-sm placeholder:text-xs min-h-[50px]"
              placeholder="NHẬP LẠI MẬT KHẨU MỚI"
            />
            <label className="text-xs text-gray-500">
              (chứa 1 IN HOA, 1 thường, 1 số, 1 ký tự đặc biệt)<br />
              (min 1 UPPERCASE, 1 lowercase, 1 number, 1 special character)
            </label>
          </div>

          <div className="text-center mt-4">
            <button className="border-2 border-black text-black font-bold px-6 py-2 rounded hover:bg-gray-200 flex-1">
              XÁC NHẬN <br />
              <span className="text-xs text-gray-600">(Accept)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
