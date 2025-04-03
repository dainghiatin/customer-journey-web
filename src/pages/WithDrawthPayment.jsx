import React, { useState, useEffect } from "react";

const WithDrawthPaymentPage = () => {
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
    <div className="shadow-lg rounded max-w-2xl mx-auto p-4">
      {/* Tiêu đề */}
      <h2 className="text-lg font-bold text-center">
        <input
          type="color"
          value={color} // Gán màu đã chọn
          onChange={handleChangeColor} // Cập nhật khi chọn màu mới
        />
        9 - GIAO DỊCH THANH TOÁN
        <div className="text-sm italic">(PAYMENT TRANSECTION)</div>
      </h2>

      {/* Mã QR */}
      <div className=" p-2 mt-2 flex items-center">
        <span className="ml-2 font-bold">MÃ QR:</span>
      </div>

      {/* Bảng thông tin */}
      <div className="mt-2">
        <div className="grid grid-cols-2  p-2">
          <span className="font-bold">RÚT RA</span>
        </div>

        <div className="grid grid-cols-2 p-2 text-red-500 ">
          <span className="font-bold">
            SỐ TIỀN CẦN RÚT:
            <div className="text-xs italic">(AMOUNT)</div>
          </span>
          <span className="text-center">(nhập)</span>
        </div>
      </div>

      {/* Chấp nhận */}
      <div className="border border-black p-3 mt-2 text-center font-bold rounded text-red-500 ">
        CHẤP NHẬN
        <div className="text-xs italic">(ACCEPT)</div>
      </div>
      {/* Tải biên lai */}
      <div className="border border-black p-3 mt-2 text-center font-bold rounded text-red-500 ">
        XEM BIÊN LAI
        <div className="text-xs italic">(REVIEW BANK TRANSFER BILL)</div>
      </div>
    </div>
  );
};

export default WithDrawthPaymentPage;
