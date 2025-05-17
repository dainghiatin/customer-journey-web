import React, { useState, useEffect } from "react";
import "../styles/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function NewGoodPostPage() {
  const [color, setColor] = useState(localStorage.getItem("selectedColor"));
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [goodsInfo, setGoodsInfo] = useState({
    name: "",
    model: "",
    size: "",
    color: "",
    price: "",
    askingPrice: "",
    displayPrice: true,
    hidePrice: false,
    location: "",
    address: "",
    description: "",
    estimatedValue: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChangeColor = (e) => {
    const newColor = e.target.value;
    setColor(newColor);
    localStorage.setItem("selectedColor", newColor);
  };

  useEffect(() => {
    document.getElementById("root").style.backgroundColor = color;
  }, [color]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGoodsInfo({
      ...goodsInfo,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", goodsInfo);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-transparent backdrop-blur-md p-6 rounded-lg shadow-lg w-full max-w-6xl mx-auto">
        <div className="flex items-center justify-center relative">
          {/* Tiêu đề ở giữa */}
          <div className="text-center mb-4 relative">
            <h1 className="text-3xl font-bold text-black relative inline-block">
              <span className="relative">
                4{/* input màu ngay dưới số 2 */}
                <input
                  type="color"
                  value={color}
                  onChange={handleChangeColor}
                  className="absolute left-1/2 transform -translate-x-1/2 top-full mt-1 w-10 h-8 cursor-pointer"
                />
              </span>
              &nbsp;- ĐĂNG BÀI MỚI - HÀNG HÓA (MT)
            </h1>

            {/* LOGIN bên dưới */}
            <h2 className="text-2xl text-black mt-2">
              <i>(New post)</i>
            </h2>
          </div>
        </div>

        {/* Main Form */}
        <div className="mt-6">
          <form onSubmit={handleSubmit} className="border border-gray-300">
            {/* Top Categories Section */}
            <div className="grid grid-cols-1">
              <div className="border-b border-gray-300 p-2">
                <div className="font-bold text-center">HÀNG HÓA<br/><span className="text-sm font-normal italic">(Goods)</span></div>
              </div>
            </div>
              
            {/* Category Selection Row */}
            <div className="grid grid-cols-4 border-b border-gray-300">
              <div className="border-r border-gray-300 p-2">
                <div className="text-center">
                  <div>HÀNG BÁN<br/><span className="text-xs italic">(Sale)</span></div>
                  <div>CẦN MUA<br/><span className="text-xs italic">(Buy)</span></div>
                  <div>HÀNG THUÊ<br/><span className="text-xs italic">(Rent)</span></div>
                  <div>CHO THUÊ<br/><span className="text-xs italic">(For rent)</span></div>
                  <div>DỊCH VỤ<br/><span className="text-xs italic">(Service)</span></div>
                </div>
              </div>
              <div className="border-r border-gray-300 p-2">
                <div className="text-center">
                  <div>HÀNG HÓA<br/><span className="text-xs italic">(Goods)</span></div>
                  <div>BẤT ĐỘNG SẢN<br/><span className="text-xs italic">(Land, house)</span></div>
                  <div>PHƯƠNG TIỆN<br/><span className="text-xs italic">(Vehicle)</span></div>
                  <div>NHÂN LỰC<br/><span className="text-xs italic">(Manpower)</span></div>
                  <div>XUẤT - NHẬP KHẨU<br/><span className="text-xs italic">(Import - Export)</span></div>
                </div>
              </div>
              <div className="border-r border-gray-300 p-2">
                <div className="text-center">
                  <div>PHỤ LIỆU<br/><span className="text-xs italic">(Scrap)</span></div>
                  <div>MỚI<br/><span className="text-xs italic">(New)</span></div>
                  <div>CŨ<br/><span className="text-xs italic">(Old)</span></div>
                  <div>CHƯA SỬ DỤNG<br/><span className="text-xs italic">(Unused)</span></div>
                </div>
              </div>
              <div className="p-2">
                <div className="text-center">
                  <div>TẤT CẢ<br/><span className="text-xs italic">(All)</span></div>
                  <div>Chọn tỉnh<br/><span className="text-xs italic">(Select province)</span></div>
                  <div>Chọn nước<br/><span className="text-xs italic">(Select country)</span></div>
                </div>
              </div>
            </div>
              
            {/* Numbered rows section */}
            <div className="grid grid-cols-1">
              {/* Row 1 */}
              <div className="grid grid-cols-8 border-b border-gray-300">
                <div className="border-r border-gray-300 p-2 text-center w-16 flex items-center justify-center">
                  <span className="font-bold">1</span>
                </div>
                <div className="col-span-7">
                  <div className="grid grid-cols-7">
                    <div className="border-r border-gray-300 p-2 text-center">
                      <div>SỐ THỨ TỰ<br/><span className="text-xs italic">(#)</span></div>
                      <div className="text-xs">(Rank)</div>
                    </div>
                    <div className="border-r border-gray-300 p-2 text-center">
                      <div>TÊN HÀNG HÓA<br/><span className="text-xs italic">(nhập)</span></div>
                      <div className="text-xs">(Name of goods)</div>
                      <input type="text" name="name" value={goodsInfo.name} onChange={handleInputChange} className="w-full border border-gray-300 p-1 mt-1" />
                    </div>
                    <div className="border-r border-gray-300 p-2 text-center">
                      <div>MÃ SỐ<br/><span className="text-xs italic">(nhập)</span></div>
                      <div className="text-xs">(Model)</div>
                      <input type="text" name="model" value={goodsInfo.model} onChange={handleInputChange} className="w-full border border-gray-300 p-1 mt-1" />
                    </div>
                    <div className="border-r border-gray-300 p-2 text-center">
                      <div>KÍCH THƯỚC<br/><span className="text-xs italic">(nhập)</span></div>
                      <div className="text-xs">(Size)</div>
                      <input type="text" name="size" value={goodsInfo.size} onChange={handleInputChange} className="w-full border border-gray-300 p-1 mt-1" />
                    </div>
                    <div className="border-r border-gray-300 p-2 text-center">
                      <div>MÀU SẮC<br/><span className="text-xs italic">(nhập)</span></div>
                      <div className="text-xs">(Color)</div>
                      <input type="text" name="color" value={goodsInfo.color} onChange={handleInputChange} className="w-full border border-gray-300 p-1 mt-1" />
                    </div>
                    <div className="border-r border-gray-300 p-2 text-center">
                      <div>HÌNH ẢNH<br/><span className="text-xs italic">(tải lên)</span></div>
                      <div className="text-xs">(Image)</div>
                      <input type="file" className="w-full p-1 mt-1 text-xs" />
                    </div>
                    <div className="p-2 text-center">
                      <div>CHẤT LƯỢNG:<br/><span className="text-xs italic">(Quality)</span></div>
                      <div className="text-xs">TẢI FILE KIỂM ĐỊNH, PHÂN TÍCH CHẤT LƯỢNG, HÓA ĐƠN HÀNG HÓA, HỢP ĐỒNG</div>
                      <div className="text-xs">(Upload: CO, CQ, invoice, contract, inspection file)</div>
                      <input type="file" className="w-full p-1 mt-1 text-xs" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Row 2 */}
              <div className="grid grid-cols-8 border-b border-gray-300">
                <div className="border-r border-gray-300 p-2 text-center w-16 flex items-center justify-center">
                  <span className="font-bold">2</span>
                </div>
                <div className="col-span-7">
                  <div className="grid grid-cols-7">
                    <div className="border-r border-gray-300 p-2 text-center">
                      <div>ƯỚC LƯỢNG<br/><span className="text-xs italic">(nhập)</span></div>
                      <div className="text-xs">(Estimate)</div>
                      <input type="text" name="estimatedValue" value={goodsInfo.estimatedValue} onChange={handleInputChange} className="w-full border border-gray-300 p-1 mt-1" />
                    </div>
                    <div className="border-r border-gray-300 p-2 text-center">
                      <div>ĐVT<br/><span className="text-xs italic">(nhập)</span></div>
                      <div className="text-xs">(Unit)</div>
                      <input type="text" name="unit" className="w-full border border-gray-300 p-1 mt-1" />
                    </div>
                    <div className="border-r border-gray-300 p-2 text-center">
                      <div>GIÁ THỊ TRƯỜNG<br/><span className="text-xs italic">(nhập)</span></div>
                      <div className="text-xs">(Market price)</div>
                      <input type="text" name="price" value={goodsInfo.price} onChange={handleInputChange} className="w-full border border-gray-300 p-1 mt-1" />
                    </div>
                    <div className="border-r border-gray-300 p-2 text-center">
                      <div>GIÁ MONG MUỐN<br/><span className="text-xs italic">(nhập)</span></div>
                      <div className="text-xs">(Asking price)</div>
                      <input type="text" name="askingPrice" value={goodsInfo.askingPrice} onChange={handleInputChange} className="w-full border border-gray-300 p-1 mt-1" />
                    </div>
                    <div className="border-r border-gray-300 p-2 text-center">
                      <div>GIÁ TỰ ĐỘNG DUYỆT<br/><span className="text-xs italic">(nhập)</span></div>
                      <div className="text-xs">(Price to automatically accept)</div>
                      <input type="text" name="autoAcceptPrice" className="w-full border border-gray-300 p-1 mt-1" />
                    </div>
                    <div className="border-r border-gray-300 p-2 text-center">
                      <div>YÊU CẦU ĐẶT CỌC<br/><span className="text-xs italic">(nhập)</span></div>
                      <div className="text-xs">(Deposit requirement)</div>
                      <input type="text" name="depositRequirement" className="w-full border border-gray-300 p-1 mt-1" />
                    </div>
                    <div className="p-2 text-center">
                      <div>NGÀY GIAO HÀNG SAU KHI CHẤP NHẬN<br/><span className="text-xs italic">(nhập)</span></div>
                      <div className="text-xs">(Day of delivery after accept)</div>
                      <input type="text" name="deliveryDay" className="w-full border border-gray-300 p-1 mt-1" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Row 3 */}
              <div className="grid grid-cols-8 border-b border-gray-300">
                <div className="border-r border-gray-300 p-2 text-center w-16 flex items-center justify-center">
                  <span className="font-bold">3</span>
                </div>
                <div className="col-span-7">
                  <div className="grid grid-cols-3">
                    <div className="border-r border-gray-300 p-2 text-center">
                      <div>PHƯƠNG THỨC:<br/><span className="text-xs italic">(Method)</span></div>
                    </div>
                    <div className="border-r border-gray-300 p-2 text-center">
                      <div>HIỂN THỊ GIÁ<br/><span className="text-xs italic">(Display price)</span></div>
                      <div>ẨN GIÁ<br/><span className="text-xs italic">(Hide price)</span></div>
                      <div className="flex justify-center mt-2">
                        <label className="mr-4">
                          <input 
                            type="radio" 
                            name="priceDisplay" 
                            checked={goodsInfo.displayPrice} 
                            onChange={() => setGoodsInfo({...goodsInfo, displayPrice: true, hidePrice: false})}
                          /> Hiển thị
                        </label>
                        <label>
                          <input 
                            type="radio" 
                            name="priceDisplay" 
                            checked={goodsInfo.hidePrice} 
                            onChange={() => setGoodsInfo({...goodsInfo, displayPrice: false, hidePrice: true})}
                          /> Ẩn giá
                        </label>
                      </div>
                    </div>
                    <div className="p-2 text-center">
                      <div>(chọn 1 mục)</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Row 4 */}
              <div className="grid grid-cols-8 border-b border-gray-300">
                <div className="border-r border-gray-300 p-2 text-center w-16 flex items-center justify-center">
                  <span className="font-bold">4</span>
                </div>
                <div className="col-span-7">
                  <div className="grid grid-cols-2">
                    <div className="border-r border-gray-300 p-2 text-center">
                      <div>THÔNG TIN HÀNG HÓA:<br/><span className="text-xs italic">(Goods information)</span></div>
                    </div>
                    <div className="p-2">
                      <textarea 
                        name="description" 
                        value={goodsInfo.description} 
                        onChange={handleInputChange} 
                        className="w-full border border-gray-300 p-1" 
                        rows="3"
                        placeholder="(nhập)"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Row 5 */}
              <div className="grid grid-cols-8 border-b border-gray-300">
                <div className="border-r border-gray-300 p-2 text-center w-16 flex items-center justify-center">
                  <span className="font-bold">5</span>
                </div>
                <div className="col-span-7">
                  <div className="grid grid-cols-3">
                    <div className="border-r border-gray-300 p-2 text-center">
                      <div>ĐỊA CHỈ HÀNG HÓA:<br/><span className="text-xs italic">(Goods address)</span></div>
                    </div>
                    <div className="border-r border-gray-300 p-2">
                      <input 
                        type="text" 
                        name="address" 
                        value={goodsInfo.address} 
                        onChange={handleInputChange} 
                        className="w-full border border-gray-300 p-1" 
                        placeholder="(nhập)"
                      />
                    </div>
                    <div className="p-2 text-center">
                      <div>VỊ TRÍ<br/><span className="text-xs italic">(Map)</span></div>
                      <div className="mt-2">+</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Row 6 */}
              <div className="grid grid-cols-8 border-b border-gray-300">
                <div className="border-r border-gray-300 p-2 text-center w-16 flex items-center justify-center">
                  <span className="font-bold">6</span>
                </div>
                <div className="col-span-7">
                  <div className="grid grid-cols-3">
                    <div className="border-r border-gray-300 p-2 text-center">
                      <div>ĐỊA ĐIỂM GIAO HÀNG:<br/><span className="text-xs italic">(Location of handover)</span></div>
                    </div>
                    <div className="border-r border-gray-300 p-2 text-center">
                      <div>KHO BÊN BÁN<br/><span className="text-xs italic">(Warehouse of seller)</span></div>
                      <div>KHO BÊN MUA<br/><span className="text-xs italic">(Warehouse of buyer)</span></div>
                      <div className="flex justify-center mt-2">
                        <label className="mr-4">
                          <input type="radio" name="deliveryLocation" value="seller" /> Kho bên bán
                        </label>
                        <label>
                          <input type="radio" name="deliveryLocation" value="buyer" /> Kho bên mua
                        </label>
                      </div>
                    </div>
                    <div className="p-2 text-center">
                      <div>(chọn 1 mục)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Submit Button */}
            <div className="flex justify-center mt-4">
              <button 
                type="submit" 
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded"
              >
                Đăng bài
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
