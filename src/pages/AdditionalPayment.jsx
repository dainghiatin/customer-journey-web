import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdditionalPaymentPage = () => {
  const [color, setColor] = useState(localStorage.getItem("selectedColor"));
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
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
      {/* Tiêu đề */}
      <div className="relative justify-between flex">
        <button onClick={()=>{navigate("../")}}  className=" p-2 border">Home</button>
        <button className=" right-0 p-2 border" >3-BĐK</button>
      </div>
      <div className="text-center border-blue-800 py-2 relative">
        <h1 className="text-3xl font-bold inline-block relative">
          <span className="relative inline-block">
            9.1
            {/* input màu nằm dưới số 9.1 */}
            <input
              type="color"
              value={color}
              onChange={handleChangeColor}
              className="absolute left-1/2 transform -translate-x-1/2 top-full mt-1 w-10 h-8 cursor-pointer"
            />
          </span>
          &nbsp;- GIAO DỊCH THANH TOÁN (GỬI THÊM)
        </h1>

        <h2 className="text-2xl text-black mt-2">
          <i>(Additional Payment)</i>
        </h2>
      </div>

      {/* Mã QR */}
      <div className=" p-2 mt-2 flex items-center">
        <span className="ml-2 font-bold">QR</span>
      </div>

      {/* Bảng thông tin */}
      <div className=" mt-2">
        <div className="grid grid-cols-2  p-2">
          <span className="font-bold">GỬI THÊM</span>
        </div>

        <div className="grid grid-cols-2  p-2">
          <span className="font-bold">
            CHỦ TÀI KHOẢN:
            <div className="text-xs italic">(Bank account holder)</div>
          </span>
          <span className="text-center">CÔNG TY TNHH ĐẠI NGHĨA TÍN</span>
        </div>

        <div className="grid grid-cols-2  p-2">
          <span className="font-bold">
            SỐ TÀI KHOẢN:
            <div className="text-xs italic">(Bank account number)</div>
          </span>
          <span className="text-center">(lệnh)</span>
        </div>

        <div className="grid grid-cols-2  p-2">
          <span className="font-bold">
            TÊN NGÂN HÀNG:
            <div className="text-xs italic">(Name of receive bank)</div>
          </span>
          <span className="text-center">(lệnh)</span>
        </div>

        <div className="grid grid-cols-2  p-2">
          <span className="font-bold">
            NỘI DUNG CHUYỂN KHOẢN:
            <div className="text-xs italic">(Content of transfer)</div>
          </span>
          <span className="text-center">(lệnh)</span>
        </div>

        <div className="grid grid-cols-2 p-2">
          <span className="font-bold">
            SỐ TIỀN:
            <div className="text-xs italic">(Amount)</div>
          </span>
          <span className="text-center">
            <input type="number" className="border" placeholder=" (nhập)" />
          </span>
        </div>
      </div>

      {/* Tải biên lai */}
      <div className="border border-black p-3 mt-2 text-center font-bold rounded">
        TẢI BIÊN LAI LÊN
        <div className="text-xs italic">(Upload bank transfer bill)</div>
      </div>

      {/* Chấp nhận */}
      <div className="border border-black p-3 mt-2 text-center font-bold rounded">
        CHẤP NHẬN
        <div className="text-xs italic">(Accept)</div>
      </div>
    </div>
  );
};

export default AdditionalPaymentPage;
