import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Home as HomeIcon,
  Settings as SettingsIcon,
} from "lucide-react";
import "../styles/Login.css";


export default function RewardListPage() {
  const { t } = useTranslation();
  const [color, setColor] = useState(localStorage.getItem("selectedColor") || "#ffffff");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    document.getElementById("root").style.backgroundColor = color;
    const token = localStorage.getItem("authToken");
    setUser(token);
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
        <div className="flex items-center justify-between relative mb-6">
          {user && (
            <button 
              className="text-red-600 hover:text-red-800 relative"
              onClick={() => navigate("/")}
            >
              <HomeIcon size={28} />
            </button>
          )}
          <div className="text-center mb-4 relative flex-1">
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
              - {t('rewardList.title', 'DANH SÁCH NHẬN THƯỞNG')}
            </h1>
          </div>
          {user && (
            <button 
              className="text-red-600 hover:text-red-800"
              onClick={() => navigate("/admin-control")}
            >
              <SettingsIcon size={28} />
            </button>
          )}
        </div>

        {/* Grid Content */}
        <div className="mt-6">
            <table className="w-full table-fixed border border-black text-xs text-center">
            <thead>
                <tr>
                <th className="border border-black w-10">{t('rewardList.stt', 'STT')}</th>
                <th className="border border-black w-24">{t('rewardList.avatar', 'HÌNH NỀN')}<br />({t('rewardList.avatarEn', 'Avatar')})</th>
                <th className="border border-black w-40 text-red-600">{t('rewardList.referrer', 'NGƯỜI GIỚI THIỆU')}<br />
                    <span className="text-[10px] text-black font-normal">
                    {t('rewardList.referrerNote', '* 7% app thu được từ quá trình mua bán tại hệ thống do bạn giới thiệu sẽ hiện trong NGƯỜI GIỚI THIỆU của họ (APP CHỦ TẤT CẢ CÁC LOẠI)')}
                    </span>
                </th>
                <th className="border border-black w-40 text-red-600">{t('rewardList.sharing', 'CHIA SẺ')}<br />
                    <span className="text-[10px] text-black font-normal">
                    {t('rewardList.sharingNote', '* 14% app thu được qua phần mua bán tại các hàng hoá chia sẻ sẽ hiện trong (APP CHỦ TẤT CẢ CÁC LOẠI THUÊ)')}
                    </span>
                </th>
                <th className="border border-black w-40 text-red-600">{t('rewardList.minorViolation', 'BÁO CÁO VI PHẠM NHẸ')}<br />
                    <span className="text-[10px] text-black font-normal">
                    {t('rewardList.minorViolationNote', '+ 500.000 VNĐ (hoặc quy đổi tương đương % đồng tiền video sau sai phạm) nếu báo đúng')}
                    </span>
                </th>
                <th className="border border-black w-40 text-red-600">{t('rewardList.majorViolation', 'BÁO CÁO VI PHẠM NẶNG')}<br />
                    <span className="text-[10px] text-black font-normal">
                    {t('rewardList.majorViolationNote', '- 1.000.000 VNĐ (hoặc quy đổi tương đương % đồng tiền video số tài khoản đó sai) KHOÁ TẠM THỜI TÀI KHOẢN Ai LIVE ĐỂ XÁC MINH')}
                    </span>
                </th>
                <th className="border border-black w-32">{t('rewardList.interaction', 'TƯƠNG TÁC')}<br />
                    <span className="text-[10px]">{t('rewardList.interactionNote', 'Cài đặt thủ công cho các mức thời gian gọi truy cập app')}</span>
                </th>
                <th className="border border-black w-24">{t('rewardList.foundingDay', 'NGÀY THÀNH LẬP')}<br />
                    <span className="text-[10px]">{t('rewardList.manualSetting', 'Cài đặt thủ công')}</span>
                </th>
                <th className="border border-black w-20">{t('rewardList.endOfYear', 'CUỐI NĂM')}<br />
                    <span className="text-[10px]">{t('rewardList.manualSetting', 'Cài đặt thủ công')}</span>
                </th>
                <th className="border border-black w-20">{t('rewardList.beginningOfYear', 'ĐẦU NĂM')}<br />
                    <span className="text-[10px]">{t('rewardList.manualSetting', 'Cài đặt thủ công')}</span>
                </th>
                <th className="border border-black w-20">{t('rewardList.sudden', 'ĐỘT XUẤT')}<br />
                    <span className="text-[10px]">{t('rewardList.manualSetting', 'Cài đặt thủ công')}</span>
                </th>
                <th className="border border-black w-10">{t('rewardList.total', 'Tổng')}</th>
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
