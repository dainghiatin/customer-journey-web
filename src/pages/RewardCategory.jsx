import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home as HomeIcon,
  Settings as SettingsIcon,
} from "lucide-react";
import "../styles/Login.css";


export default function RewardCategoryPage() {
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
              - DANH MỤC PHẦN THƯỞNG
            </h1>
          </div>
          <button className="text-red-600 hover:text-red-800">
            <SettingsIcon size={28} />
          </button>
        </div>

        {/* Grid Content */}
        <div className="mt-6">
            <div className="overflow-x-auto border border-black text-sm mt-6">
                <table className="table-auto w-full border-collapse text-center">
                    <thead>
                    <tr className="bg-white border-b border-black">
                        <th colSpan={6} className="text-xl font-bold py-3 border-b border-black">
                        DANH MỤC PHẦN THƯỞNG
                        </th>
                    </tr>
                    <tr className="bg-gray-100 border-b border-black">
                        <th className="border border-black px-2 py-1">Stt</th>
                        <th className="border border-black px-2 py-1">Nội dung</th>
                        <th className="border border-black px-2 py-1">
                        Ước lượng tỉ lệ trả thưởng trên <br /> tổng lợi nhuận sau thuế của sàn
                        </th>
                        <th className="border border-black px-2 py-1">Thời gian chốt thưởng</th>
                        <th className="border border-black px-2 py-1">Thời gian trả thưởng</th>
                        <th className="border border-black px-2 py-1">Đối tượng nhận thưởng</th>
                    </tr>
                    </thead>
                    <tbody>
                    {[
                        {
                        stt: 1,
                        title: "NGƯỜI GIỚI THIỆU",
                        rate: "10%",
                        deadline: "Cuối tháng",
                        payout: "Ngày 05 hàng tháng",
                        target: "Tất cả",
                        },
                        {
                        stt: 2,
                        title: "CHIA SẺ",
                        rate: "20%",
                        deadline: "Hoàn thành công việc",
                        payout: "Ngày 05 hàng tháng",
                        target: "Tất cả",
                        },
                        {
                        stt: 3,
                        title: "QUẢNG CÁO",
                        rate: "30%",
                        deadline: "Cuối tháng",
                        payout: "Ngày 05 hàng tháng",
                        target: "Tất cả",
                        },
                        {
                        stt: 4,
                        title: "BÁO CÁO VI PHẠM",
                        rate: "40%",
                        deadline: "Người vi phạm nộp phạt",
                        payout: "Ngày 05 hàng tháng",
                        target: "Tất cả",
                        },
                        {
                        stt: 5,
                        title: "NGÀY THÀNH LẬP",
                        rate: "10%",
                        deadline: "15/06",
                        payout: "02/07",
                        target: "Tất cả",
                        },
                        {
                        stt: 6,
                        title: "CUỐI NĂM",
                        rate: "10%",
                        deadline: "31/12",
                        payout: "30/01",
                        target: "Tất cả",
                        },
                        {
                        stt: 7,
                        title: "ĐẦU NĂM",
                        rate: "Đếm chính xác số lượng tờ tiền VNĐ mệnh giá cao nhất",
                        deadline: "Mùng 10 tháng Riêng",
                        payout: "Cùng ngày",
                        target: "Nhân viên công ty",
                        },
                        {
                        stt: 8,
                        title: "ĐỘT XUẤT",
                        rate: "50%",
                        deadline: "Nhận thanh toán",
                        payout: "Cùng ngày",
                        target: "Nhân viên công ty",
                        },
                    ].map((row, i) => (
                        <tr key={i} className="border-b border-black">
                        <td className="border border-black px-2 py-1">{row.stt}</td>
                        <td className="border border-black px-2 py-1 text-left">{row.title}</td>
                        <td className="border border-black px-2 py-1">{row.rate}</td>
                        <td className="border border-black px-2 py-1">{row.deadline}</td>
                        <td className="border border-black px-2 py-1">{row.payout}</td>
                        <td className="border border-black px-2 py-1">{row.target}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>

        </div>
      </div>
    </div>
  );
}
