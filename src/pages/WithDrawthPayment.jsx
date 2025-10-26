import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Home as HomeIcon, KeyboardIcon as KeyboardIcon } from 'lucide-react';

const WithDrawthPaymentPage = () => {
  const { t } = useTranslation();
  const [color, setColor] = useState(localStorage.getItem("selectedColor"));
  const [user, setUser] = useState(localStorage.getItem("authToken"));
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate()
  
  const handleChangeColor = (e) => {
    const newColor = e.target.value;
    setColor(newColor);
    localStorage.setItem("selectedColor", newColor);
  };

  useEffect(() => {
    document.getElementById("root").style.backgroundColor = color;
  }, [color]);
  return (
    <div className="shadow-lg rounded max-w-2xl mx-auto p-4   ">
      <div className="flex items-center justify-between relative">
        <button 
          className="text-red-600 hover:text-red-800 relative"
          onClick={() => navigate("/")}
        >
          <HomeIcon size={28} />
        </button>
        {/* Tiêu đề ở giữa */}
        <div className="text-center border-blue-800 py-2 relative flex-1">
          <h1 className="text-3xl font-bold inline-block relative">
            <span className="relative inline-block">
              4
              <input
                type="color"
                value={color}
                onChange={handleChangeColor}
                className="absolute left-1/2 transform -translate-x-1/2 top-full mt-1 w-10 h-8 cursor-pointer"
              />
            </span>
            &nbsp;- {t('payment.withdraw')}
          </h1>
        </div>
        <button 
          className="text-red-600 hover:text-red-800"
          onClick={() => navigate("/admin-control")}
        >
          <KeyboardIcon size={28} />
        </button>
        </div>

      {/* Mã QR */}
      {/* <div className=" p-2 mt-2 flex items-center">
        <span className="ml-2 font-bold">MÃ QR:</span>
      </div> */}

      {/* Bảng thông tin */}
      <div className="mt-2">
        <div className="grid grid-cols-2  p-2">
          <span className="font-bold">{t('withdrawPayment.withdraw')}</span>
        </div>

        <div className="grid grid-cols-2 p-2">
          <span className="font-bold">
            {t('withdrawPayment.amountToWithdraw')}:
          </span>
          <span className="text-center">
            <input type="number" className="border" placeholder={t('withdrawPayment.enterPlaceholder')} />
          </span>
        </div>
      </div>

      {/* Chấp nhận */}
      <div className="border border-black p-3 mt-2 text-center font-bold rounded ">
        {t('withdrawPayment.accept')}
      </div>
      {/* Tải biên lai */}
      <div className="border border-black p-3 mt-2 text-center font-bold rounded ">
        {t('withdrawPayment.reviewReceipt')}
      </div>
    </div>
  );
};

export default WithDrawthPaymentPage;
