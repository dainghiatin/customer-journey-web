import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const WithDrawthPaymentPage = () => {
  const { t } = useTranslation();
  const [color, setColor] = useState(localStorage.getItem("selectedColor"));
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
    <div className="shadow-lg rounded max-w-2xl mx-auto p-4">
      {/* Tiêu đề */}
      <div className="text-center border-blue-800 py-2 relative">
              <div className="relative justify-between flex">
        <button onClick={()=>{navigate("../")}} className=" p-2 border">{t('common.home', 'Home')}</button>
        <button className=" right-0 p-2 border" >3-{t('common.bdk', 'BĐK')}</button>
      </div>
        <h1 className="text-3xl font-bold inline-block relative">
          <span className="relative inline-block">
            9.2
            {/* input màu nằm dưới số 9.2 */}
            <input
              type="color"
              value={color}
              onChange={handleChangeColor}
              className="absolute left-1/2 transform -translate-x-1/2 top-full mt-1 w-10 h-8 cursor-pointer"
            />
          </span>
          &nbsp;- {t('withdrawPayment.title', 'GIAO DỊCH THANH TOÁN (RÚT RA)')}
        </h1>

        <h2 className="text-2xl text-black mt-2">
          <i>({t('withdrawPayment.titleEn', 'Withdrawth Payment')})</i>
        </h2>
      </div>

      {/* Mã QR */}
      {/* <div className=" p-2 mt-2 flex items-center">
        <span className="ml-2 font-bold">MÃ QR:</span>
      </div> */}

      {/* Bảng thông tin */}
      <div className="mt-2">
        <div className="grid grid-cols-2  p-2">
          <span className="font-bold">{t('withdrawPayment.withdraw', 'RÚT RA')}</span>
        </div>

        <div className="grid grid-cols-2 p-2">
          <span className="font-bold">
            {t('withdrawPayment.amountToWithdraw', 'SỐ TIỀN CẦN RÚT')}:
            <div className="text-xs italic">({t('withdrawPayment.amountToWithdrawEn', 'Amount')})</div>
          </span>
          <span className="text-center">
            <input type="number" className="border" placeholder={t('withdrawPayment.enterPlaceholder', ' (nhập)')} />
          </span>
        </div>
      </div>

      {/* Chấp nhận */}
      <div className="border border-black p-3 mt-2 text-center font-bold rounded ">
        {t('withdrawPayment.accept', 'CHẤP NHẬN')}
        <div className="text-xs italic">({t('withdrawPayment.acceptEn', 'Accept')})</div>
      </div>
      {/* Tải biên lai */}
      <div className="border border-black p-3 mt-2 text-center font-bold rounded ">
        {t('withdrawPayment.reviewReceipt', 'XEM BIÊN LAI')}
        <div className="text-xs italic">({t('withdrawPayment.reviewReceiptEn', 'Review bank transfer bill')})</div>
      </div>
    </div>
  );
};

export default WithDrawthPaymentPage;
