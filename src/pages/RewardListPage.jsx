import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home as HomeIcon,
  Settings as SettingsIcon,
} from "lucide-react";
import "../styles/Login.css";


export default function RewardListPage() {
  const [color, setColor] = useState(localStorage.getItem("selectedColor") || "#ffffff");
  const navigate = useNavigate();


  useEffect(() => {
    document.getElementById("root").style.backgroundColor = color;
  }, [color]);

  const handleChangeColor = (e) => {
    const newColor = e.target.value;
    setColor(newColor);
    localStorage.setItem("selectedColor", newColor);
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <div className="bg-transparent backdrop-blur-md p-6 shadow-lg w-full">
        {/* Header */}
        <div className="flex items-center justify-between  relative mb-6">
          <button className="text-red-600 hover:text-red-800 relative">
            <HomeIcon size={28} />
          </button>
          <div className="text-center mb-4 relative">
            <h1 className="text-3xl font-bold text-black relative inline-block">
              <span className="relative">
                10
                <input
                  type="color"
                  value={color}
                  onChange={handleChangeColor}
                  className="absolute left-1/2 transform -translate-x-1/2 top-full mt-1 w-10 h-8 cursor-pointer"
                />
              </span>{" "}
              - DANH SÁCH NHẬN THƯỞNG
            </h1>
          </div>
          <button className="text-red-600 hover:text-red-800">
            <SettingsIcon size={28} />
          </button>
        </div>

        {/* Grid Content */}
        <div className="mt-6">
            <table className="w-full table-fixed border border-black text-xs text-center">
            <thead>
                <tr>
                <th className="border border-black w-10">STT</th>
                <th className="border border-black w-24">HÌNH NỀN<br />(Avatar)</th>
                <th className="border border-black w-40 text-red-600">NGƯỜI GIỚI THIỆU<br />
                    <span className="text-[10px] text-black font-normal">
                    * 7% app thu được từ quá trình mua bán tại hệ thống do bạn giới thiệu sẽ hiện trong NGƯỜI GIỚI THIỆU của họ (APP CHỦ TẤT CẢ CÁC LOẠI)
                    </span>
                </th>
                <th className="border border-black w-40 text-red-600">CHIA SẺ<br />
                    <span className="text-[10px] text-black font-normal">
                    * 14% app thu được qua phần mua bán tại các hàng hoá chia sẻ sẽ hiện trong (APP CHỦ TẤT CẢ CÁC LOẠI THUÊ)
                    </span>
                </th>
                <th className="border border-black w-40 text-red-600">BÁO CÁO VI PHẠM NHẸ<br />
                    <span className="text-[10px] text-black font-normal">
                    + 500.000 VNĐ (hoặc quy đổi tương đương % đồng tiền video sau sai phạm) nếu báo đúng
                    </span>
                </th>
                <th className="border border-black w-40 text-red-600">BÁO CÁO VI PHẠM NẶNG<br />
                    <span className="text-[10px] text-black font-normal">
                    - 1.000.000 VNĐ (hoặc quy đổi tương đương % đồng tiền video số tài khoản đó sai) KHOÁ TẠM THỜI TÀI KHOẢN Ai LIVE ĐỂ XÁC MINH
                    </span>
                </th>
                <th className="border border-black w-32">TƯƠNG TÁC<br />
                    <span className="text-[10px]">Cài đặt thủ công cho các mức thời gian gọi truy cập app</span>
                </th>
                <th className="border border-black w-24">NGÀY THÀNH LẬP<br />
                    <span className="text-[10px]">Cài đặt thủ công</span>
                </th>
                <th className="border border-black w-20">CUỐI NĂM<br />
                    <span className="text-[10px]">Cài đặt thủ công</span>
                </th>
                <th className="border border-black w-20">ĐẦU NĂM<br />
                    <span className="text-[10px]">Cài đặt thủ công</span>
                </th>
                <th className="border border-black w-20">ĐỘT XUẤT<br />
                    <span className="text-[10px]">Cài đặt thủ công</span>
                </th>
                <th className="border border-black w-10">Tổng</th>
                </tr>
            </thead>
            <tbody>
                {[...Array(10)].map((_, idx) => (
                <tr key={idx}>
                    <td className="border border-black">{idx + 1}</td>
                    <td className="border border-black">AVT</td>
                    <td className="border border-black"></td>
                    <td className="border border-black"></td>
                    <td className="border border-black"></td>
                    <td className="border border-black"></td>
                    <td className="border border-black"></td>
                    <td className="border border-black"></td>
                    <td className="border border-black"></td>
                    <td className="border border-black"></td>
                    <td className="border border-black"></td>
                    <td className="border border-black">0</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}
