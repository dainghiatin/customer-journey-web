import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

export default function DetailOfGoodsPage() {
  const [color, setColor] = useState(localStorage.getItem("selectedColor"));
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
    <div className="min-h-screen w-full">
      <div className="bg-transparent p-4 w-full">
        {/* Header */}
        <div className="text-center mb-4 relative">
          <h1 className="text-3xl font-bold text-black relative inline-block">
            <span className="relative">
              6
              <input
                type="color"
                value={color}
                onChange={handleChangeColor}
                className="absolute left-1/2 transform -translate-x-1/2 top-full mt-1 w-10 h-8 cursor-pointer"
              />
            </span>
            &nbsp;- CHI TIẾT HÀNG HÓA
          </h1>
          <h2 className="text-2xl text-black mt-2">
            <i>(Detail of goods)</i>
          </h2>
        </div>

        {/* Category Selection Table */}
        {/* Category Selection Row (with <select> dropdowns) */}
<div className="grid grid-cols-4 border border-gray-300">
  <div className="border-r border-gray-300 p-2 text-center">
    <label className="block font-semibold mb-1">Loại giao dịch</label>
    <select className="w-full border border-gray-300 rounded p-1">
      <option value="sale">HÀNG BÁN (Sale)</option>
      <option value="buy">CẦN MUA (Buy)</option>
      <option value="rent">HÀNG THUÊ (Rent)</option>
      <option value="for_rent">CHO THUÊ (For rent)</option>
      <option value="service">DỊCH VỤ (Service)</option>
    </select>
  </div>
  <div className="border-r border-gray-300 p-2 text-center">
    <label className="block font-semibold mb-1">Danh mục chính</label>
    <select className="w-full border border-gray-300 rounded p-1">
      <option value="goods">HÀNG HÓA (Goods)</option>
      <option value="land">BẤT ĐỘNG SẢN (Land, house)</option>
      <option value="vehicle">PHƯƠNG TIỆN (Vehicle)</option>
      <option value="manpower">NHÂN LỰC (Manpower)</option>
      <option value="import_export">XUẤT - NHẬP KHẨU (Import - Export)</option>
    </select>
  </div>
  <div className="border-r border-gray-300 p-2 text-center">
    <label className="block font-semibold mb-1">Tình trạng</label>
    <select className="w-full border border-gray-300 rounded p-1">
      <option value="scrap">PHỤ LIỆU (Scrap)</option>
      <option value="new">MỚI (New)</option>
      <option value="old">CŨ (Old)</option>
      <option value="unused">CHƯA SỬ DỤNG (Unused)</option>
    </select>
  </div>
  <div className="p-2 text-center">
    <label className="block font-semibold mb-1">Vị trí</label>
    <select className="w-full border border-gray-300 rounded p-1 mb-1">
      <option value="all">TẤT CẢ (All)</option>
    </select>
    <select className="w-full border border-gray-300 rounded p-1 mb-1">
      <option value="">Chọn tỉnh (Select province)</option>
      {/* Bạn có thể thêm các tỉnh cụ thể ở đây */}
    </select>
    <select className="w-full border border-gray-300 rounded p-1">
      <option value="">Chọn nước (Select country)</option>
      {/* Bạn có thể thêm các nước cụ thể ở đây */}
    </select>
  </div>
</div>


        {/* ID Section */}
        <div className="w-full border border-gray-300 mt-4">
          <table className="w-full border-collapse">
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2 text-center font-bold w-1/5">
                  ID
                </td>
                <td
                  className="border border-gray-300 p-2 text-center"
                  colSpan="4"
                >
                  B/M/T/CT/DV-HH/BĐS/PT/NL/XNK-PL/M/C/CSD-NĂM ĐĂNG BÀI-STT{" "}
                  <span className="text-sm italic">(lệnh)</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Product Details Section */}
        <div className="w-full border border-gray-300 mt-4">
          <table className="w-full border-collapse">
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2 text-center font-bold w-1/5">
                  SỐ THỨ TỰ
                  <br />
                  <span className="text-sm italic">(#)</span>
                  <br />
                  <span className="text-sm italic">(lệnh)</span>
                </td>
                <td className="border border-gray-300 p-2 text-center font-bold">
                  TÊN HÀNG HÓA
                  <br />
                  <span className="text-sm italic">(Name of goods)</span>
                  <br />
                  <span className="text-sm italic">(lệnh)</span>
                </td>
                <td className="border border-gray-300 p-2 text-center font-bold">
                  MÃ SỐ
                  <br />
                  <span className="text-sm italic">(Model)</span>
                  <br />
                  <span className="text-sm italic">(lệnh)</span>
                </td>
                <td className="border border-gray-300 p-2 text-center font-bold">
                  KÍCH THƯỚC
                  <br />
                  <span className="text-sm italic">(Size)</span>
                  <br />
                  <span className="text-sm italic">(lệnh)</span>
                </td>
                <td className="border border-gray-300 p-2 text-center font-bold">
                  MÀU SẮC
                  <br />
                  <span className="text-sm italic">(Color)</span>
                  <br />
                  <span className="text-sm italic">(lệnh)</span>
                </td>
                <td className="border border-gray-300 p-2 text-center font-bold">
                  HÌNH ẢNH
                  <br />
                  <span className="text-sm italic">(Image)</span>
                  <br />
                  <span className="text-sm italic">(lệnh)</span>
                </td>
                <td className="border border-gray-300 p-2 text-center font-bold">
                  CHẤT LƯỢNG <span className="text-red-500 font-bold">*</span>
                  <br />
                  <span className="text-sm italic">(Quality)</span>
                  <br />
                  <span className="text-sm italic">(lệnh)</span>
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 text-center font-bold w-1/5">
                  ƯỚC LƯỢNG
                  <br />
                  <span className="text-sm italic">(Estimate)</span>
                  <br />
                  <span className="text-sm italic">(lệnh)</span>
                </td>
                <td className="border border-gray-300 p-2 text-center font-bold">
                  ĐVT
                  <br />
                  <span className="text-sm italic">(Unit)</span>
                  <br />
                  <span className="text-sm italic">(lệnh)</span>
                </td>
                <td className="border border-gray-300 p-2 text-center font-bold">
                  GIÁ THỊ TRƯỜNG
                  <br />
                  <span className="text-sm italic">(Market price)</span>
                  <br />
                  <span className="text-sm italic">(lệnh)</span>
                </td>
                <td className="border border-gray-300 p-2 text-center font-bold">
                  GIÁ MONG MUỐN
                  <br />
                  <span className="text-sm italic">(Asking price)</span>
                  <br />
                  <span className="text-sm italic">(lệnh)</span>
                </td>
                <td className="border border-gray-300 p-2 text-center font-bold">
                  GIÁ ĐẶT
                  <br />
                  <span className="text-sm italic">(Set price)</span>
                  <br />
                  <input
                    type="text"
                    className="w-full mt-1 p-1 text-center border border-gray-300 rounded"
                    placeholder="(nhập)"
                  />
                </td>
                <td className="border border-gray-300 p-2 text-center font-bold">
                  YÊU CẦU ĐẶT CỌC
                  <br />
                  <span className="text-sm italic">(Deposit requirement)</span>
                  <br />
                  <input
                    type="text"
                    className="w-full mt-1 p-1 text-center border border-gray-300 rounded"
                    placeholder="(nhập)"
                  />
                </td>
                <td className="border border-gray-300 p-2 text-center font-bold">
                  NGÀY GIAO HÀNG/KẾT THÚC CHẤP NHẬN <span className="text-red-500 font-bold">*</span>
                  <br />
                  <span className="text-sm italic">
                    (Date of delivery/End of accept)
                  </span>
                  <br />
                  <span className="text-sm italic">(lệnh)</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Product Information */}
        <div className="w-full border border-gray-300 mt-4">
          <table className="w-full border-collapse">
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2 text-center font-bold w-1/5">
                  THÔNG TIN HÀNG HÓA
                  <br />
                  <span className="text-sm italic">(INFORMATION OF GOODS)</span>
                </td>
                <td
                  className="border border-gray-300 p-2 text-center"
                  colSpan="4"
                >
                  <span className="text-sm italic">(lệnh)</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Address Information */}
        <div className="w-full border border-gray-300 mt-4">
          <table className="w-full border-collapse">
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2 text-center font-bold w-1/5">
                  ĐỊA CHỈ HÀNG HÓA:
                  <br />
                  <span className="text-sm italic">(Goods address)</span>
                </td>
                <td className="border border-gray-300 p-2 text-center" style={{ width: 'calc(2/6 * 100%)' }}>
                  (lệnh)
                </td>
                <td className="border border-gray-300 p-2 text-center font-bold w-1/5">
                  ĐỊA ĐIỂM GIAO HÀNG:
                  <br />
                  <span className="text-sm italic">(Location of handover)</span>
                </td>
                <td className="border border-gray-300 p-2 text-center" style={{ width: 'calc(2/6 * 100%)' }}>
                (lệnh)
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Contract Duration */}
        <div className="w-full border border-gray-300 mt-4">
          <table className="w-full border-collapse">
            <tbody>
              <tr>
                <td
                  className="border border-gray-300 p-2 text-center font-bold w-1/5"
                  rowSpan="2"
                >
                  THỜI LƯỢNG THỰC HIỆN:
                  <br />
                  <span className="text-sm italic">(Contract duration)</span>
                </td>
                <td className="border border-gray-300 p-2 text-center w-1/6">
                  <span>
                    (lệnh) <br />
                    MỘT
                    <br />
                    (One)
                    <br />
                    NHIỀU
                    <br />
                    (Many)
                  </span>
                </td>
                <td className="border border-gray-300 p-2 text-center w-1/6">
                  <span>
                    (lệnh)
                    <br />
                    LẦN
                    <br />
                    (Time)
                    <br />
                    NĂM
                    <br />
                    (Year)
                  </span>
                </td>
                <td
                  className="border border-gray-300 p-2 text-center font-bold w-1/5"
                  rowSpan="2"
                >
                  THỜI GIAN KẾT THÚC:
                  <br />
                  <span className="text-sm italic">(End time)</span>
                </td>
                <td className="border border-gray-300 p-2 text-center w-1/6">
                (lệnh) 
                  <span className="text-sm italic">(ngày, tháng, năm)</span>
                </td>
                <td className="border border-gray-300 p-2 text-center w-1/6">
                (lệnh) 
                  <span className="text-sm italic">(giờ, phút)</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Accept Section */}
        <div className="w-full  mt-4">
          <table className="w-full border-collapse">
            <tbody>
              <tr>
                <td
                  className=" p-2 text-center"
                  width="30%"
                ></td>
                <td
                  className=" p-2 text-center font-bold"
                  width="40%"
                >
                  <button
                    className="px-6 py-2 border rounded hover:bg-green-600 font-bold w-full"
                  >
                    CHẤP NHẬN
                    <br />
                    <span className="text-sm italic">(Accept)</span>
                  </button>
                </td>
                <td
                  className=" p-2 text-center"
                  width="30%"
                ></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Back Button */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Quay lại
          </button>
        </div>
      </div>
    </div>
  );
}
