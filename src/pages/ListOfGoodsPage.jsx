import React, { useState, useEffect } from "react";
import "../styles/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ListOfGoodsPage() {
  const [color, setColor] = useState(localStorage.getItem("selectedColor"));
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const navigate = useNavigate();

  const handleChangeColor = (e) => {
    const newColor = e.target.value;
    setColor(newColor);
    localStorage.setItem("selectedColor", newColor);
  };

  useEffect(() => {
    document.getElementById("root").style.backgroundColor = color;
  }, [color]);

  // Categories data
  const categories = {
    "HÀNG BÁN": { vi: "HÀNG BÁN", en: "Sale" },
    "CẦN MUA": { vi: "CẦN MUA", en: "Buy" },
    "HÀNG THUÊ": { vi: "HÀNG THUÊ", en: "Rent" },
    "CHO THUÊ": { vi: "CHO THUÊ", en: "For rent" },
    "DỊCH VỤ": { vi: "DỊCH VỤ", en: "Service" },
  };

  const subcategories = {
    "HÀNG HÓA": { vi: "HÀNG HÓA", en: "Goods" },
    "BẤT ĐỘNG SẢN": { vi: "BẤT ĐỘNG SẢN", en: "Land/house" },
    "PHƯƠNG TIỆN": { vi: "PHƯƠNG TIỆN", en: "Vehicle" },
    "NHÂN LỰC": { vi: "NHÂN LỰC", en: "Manpower" },
    "XUẤT - NHẬP KHẨU": { vi: "XUẤT - NHẬP KHẨU", en: "Import - Export" },
  };

  const conditions = {
    "PHẾ LIỆU": { vi: "PHẾ LIỆU", en: "Scrap" },
    "MỚI": { vi: "MỚI", en: "New" },
    "CŨ": { vi: "CŨ", en: "Old" },
    "CHƯA SỬ DỤNG": { vi: "CHƯA SỬ DỤNG", en: "Unused" },
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-transparent backdrop-blur-md p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
        <div className="flex items-center justify-center relative">
          <div className="text-center mb-4 relative">
            <h1 className="text-3xl font-bold text-black relative inline-block">
              <span className="relative">
                5
                <input
                  type="color"
                  value={color}
                  onChange={handleChangeColor}
                  className="absolute left-1/2 transform -translate-x-1/2 top-full mt-1 w-10 h-8 cursor-pointer"
                />
              </span>
              &nbsp;- DANH SÁCH HÀNG HÓA
            </h1>
            <h2 className="text-2xl text-black mt-2">
              <i>(List of goods)</i>
            </h2>
          </div>
        </div>

        <div className="mt-6">
          {/* Updated to 4-column grid */}
          <div className="grid grid-cols-4 gap-0 border-2 border-black">
            {/* Column 1 - Categories */}
            <div className="border-r-2 border-black p-2 flex items-center justify-center">
              <select 
                className="w-full p-2 border border-gray-300 my-4"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Chọn loại</option>
                {Object.entries(categories).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value.vi} ({value.en})
                  </option>
                ))}
              </select>
            </div>
            
            {/* Column 2 - Subcategories */}
            <div className="border-r-2 border-black p-2 flex items-center justify-center">
              <select 
                className="w-full p-2 border border-gray-300 my-4"
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
              >
                <option value="">Chọn danh mục con</option>
                {Object.entries(subcategories).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value.vi} ({value.en})
                  </option>
                ))}
              </select>
            </div>
            
            {/* Column 3 - Conditions */}
            <div className="border-r-2 border-black p-2 flex items-center justify-center">
              <select 
                className="w-full p-2 border border-gray-300 my-4"
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
              >
                <option value="">Chọn điều kiện</option>
                {Object.entries(conditions).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value.vi} ({value.en})
                  </option>
                ))}
              </select>
            </div>
            
            {/* Column 4 - All and Filters */}
            <div className="border-r-2 border-black p-2 flex items-center justify-center">
            <select className="w-full p-2 border border-gray-300 my-4">
                    <option value="">TẤT CẢ (All)</option>
                    <option value="">Chọn tỉnh (Select province)</option>
                    <option value="">Chọn nước (Select country)</option>
                  </select>
            </div>
          </div>
          
          {/* Search section */}
          <div className="mt-2 p-2 border-2 border-black bg-yellow-200">
            <div className="flex items-center">
              <div className="font-bold mr-4">1. TÌM KIẾM <i>(search)</i>:</div>
              <input 
                type="text" 
                placeholder="Gõ vào để tìm kiếm..." 
                className="flex-1 p-2 rounded"
              />
            </div>
          </div>
          
          {/* Listing section */}
          <div className="mt-2 p-2 border-2 border-black">
            <div className="font-bold">2. DANH SÁCH CÁC GIAN HÀNG</div>
            
            {/* Sample listings */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-4">
              {/* Generate 12 sample items */}
              {Array(12).fill().map((_, index) => (
                <div 
                  key={index} 
                  className="border border-gray-300 p-2 flex flex-col relative overflow-hidden cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => navigate('/detail-of-goods')}
                >
                  {/* Background watermark image */}
                  <div className="absolute inset-0 opacity-15 z-0">
                    <img 
                      src="https://img.lovepik.com/png/20231125/delivery-box-3d-illustration-icon-arrows-search_698016_wh860.png" 
                      alt="Watermark" 
                      className="w-full h-full object-cover"
                    />
                  </div>               
                  {/* Product details - with z-index to appear above the watermark */}
                  <div className="text-center font-medium relative z-10">Tên hàng hóa</div>
                  <div className="text-center text-sm relative z-10">Tổng giá mong muốn</div>
                  <div className="text-center text-sm text-gray-600 relative z-10">Địa chỉ hàng hóa</div>
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            <div className="flex justify-center mt-6">
              <div className="flex space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100">1</button>
                <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100">2</button>
                <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100">3</button>
                <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100">...</button>
                <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100">10</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
