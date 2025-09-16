import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../styles/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Home as HomeIcon,
  Settings as SettingsIcon,
} from "lucide-react";
import { createProduct } from "../services/productService";

export default function NewGoodPostPage() {
  const { t } = useTranslation();
  const [color, setColor] = useState(localStorage.getItem("selectedColor"));
  const [user, setUser] = useState(null);
  const [selectedType, setSelectedType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [goodsInfo, setGoodsInfo] = useState({
    name: "",
    model: "",
    size: "",
    color: "",
    price: 0,
    askingPrice: 0,
    displayPrice: true,
    hidePrice: false,
    location: "",
    address: "",
    description: "",
    estimatedValue: 0,
    image: "https://example.com/image.jpg",
    qualityFiles: ["https://example.com/doc1.pdf", "https://example.com/doc2.pdf"],
    deliveryDate: "2023-12-31",
    depositRequirement: "",
    autoAcceptPrice: 0,
    unit: "per",
    marketPrice: 0,
    lowestUnitAskingPrice: 0,
    highestUnitAskingPrice: 0,
    deliveryDays: 0,
    endPostTime: "2023-12-31",
    lowestAmount: 0,
    highestAmount: 0,
    lowestAutoAcceptPrice: 0,
    highestAutoAcceptPrice: 0,
    contractDuration: "2023-12-31",
    personInCharge: "taltal",
    phoneNumber: "1234567890",
    email: "taltal@example.com",
    confirmOwnership: false,
    eventFeePercentage: 0,
    livestreamFee: 0,
    advertisingAmount: 0,
    showOnMainPage: 0,
    showOnVideo: 0,
    advertisingUrl: "https://example.com/advertising",
    registerForAdvertising: false,
    successFee: 0,
    totalFees: 0,
    listingType: "sell",
    categoryType: "goods",
    conditionType: "new",
    nation: "",
    province: ""
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
    const token = localStorage.getItem("authToken");
    setUser(token);
  }, [color]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setGoodsInfo({
      ...goodsInfo,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedData = {
      ...goodsInfo,
      // Convert string values to numbers where needed, default to 0 instead of null
      price: goodsInfo.price ? parseFloat(goodsInfo.price) : 0,
      askingPrice: goodsInfo.askingPrice ? parseFloat(goodsInfo.askingPrice) : 0,
      estimatedValue: goodsInfo.estimatedValue ? parseFloat(goodsInfo.estimatedValue) : 0,
      autoAcceptPrice: goodsInfo.autoAcceptPrice ? parseFloat(goodsInfo.autoAcceptPrice) : 0,
      marketPrice: goodsInfo.marketPrice ? parseFloat(goodsInfo.marketPrice) : 0,
      lowestUnitAskingPrice: goodsInfo.lowestUnitAskingPrice ? parseFloat(goodsInfo.lowestUnitAskingPrice) : 0,
      highestUnitAskingPrice: goodsInfo.highestUnitAskingPrice ? parseFloat(goodsInfo.highestUnitAskingPrice) : 0,
      deliveryDays: goodsInfo.deliveryDays ? parseInt(goodsInfo.deliveryDays) : 0,
      lowestAmount: goodsInfo.lowestAmount ? parseInt(goodsInfo.lowestAmount) : 0,
      highestAmount: goodsInfo.highestAmount ? parseInt(goodsInfo.highestAmount) : 0,
      lowestAutoAcceptPrice: goodsInfo.lowestAutoAcceptPrice ? parseFloat(goodsInfo.lowestAutoAcceptPrice) : 0,
      highestAutoAcceptPrice: goodsInfo.highestAutoAcceptPrice ? parseFloat(goodsInfo.highestAutoAcceptPrice) : 0,
      contractDuration: goodsInfo.contractDuration ? parseInt(goodsInfo.contractDuration) : 0,
      eventFeePercentage: goodsInfo.eventFeePercentage ? parseFloat(goodsInfo.eventFeePercentage) : 0,
      livestreamFee: goodsInfo.livestreamFee ? parseFloat(goodsInfo.livestreamFee) : 0,
      advertisingAmount: goodsInfo.advertisingAmount ? parseFloat(goodsInfo.advertisingAmount) : 0,
      successFee: goodsInfo.successFee ? parseFloat(goodsInfo.successFee) : 0,
      totalFees: goodsInfo.totalFees ? parseFloat(goodsInfo.totalFees) : 0,
      image: "https://example.com/image.jpg",
      qualityFiles: ["https://example.com/doc1.pdf", "https://example.com/doc2.pdf"],
      advertisingUrl: "https://example.com/advertising",
    };
    // Handle form submission logic here
    createProduct("token", formattedData).then((res)=>{
      console.log(res.data);
      alert("Create success "+goodsInfo.name);
    }).catch((e)=>{
      console.log(e);
    })
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-transparent backdrop-blur-md p-6 rounded-lg shadow-lg w-full max-w-6xl mx-auto">
        <div className="flex items-center justify-between relative mb-4">
          {user && (
            <button 
              onClick={() => navigate('/')} 
              className="text-red-600 hover:text-red-800 relative"
            >
              <HomeIcon size={28} />
            </button>
          )}
          <div className="text-center relative flex-1">
            <h1 className="text-3xl font-bold text-black relative inline-block">
              <span className="relative">
                4
                <input
                  type="color"
                  value={color}
                  onChange={handleChangeColor}
                  className="absolute left-1/2 transform -translate-x-1/2 top-full mt-1 w-10 h-8 cursor-pointer"
                />
              </span>{" "}
              - ĐĂNG BÀI MỚI - HÀNG HÓA
            </h1>
            <h2 className="text-xl italic text-gray-600">(New post)</h2>
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
            <div className="grid grid-cols-5 border-b border-gray-300">
              <div className="border-r border-gray-300 p-2">
                <div className="text-center">
                  <select className="w-full border border-gray-300 p-1">
                    <option value="">HÀNG BÁN (Sale)</option>
                    <option value="">CẦN MUA (Buy)</option>
                    <option value="">HÀNG THUÊ (Rent)</option>
                    <option value="">CHO THUÊ (For rent)</option>
                    <option value="">DỊCH VỤ (Service)</option>
                  </select>
                </div>
              </div>
              <div className="border-r border-gray-300 p-2">
                <div className="text-center">
                  <select className="w-full border border-gray-300 p-1">
                    <option value="">HÀNG HÓA (Goods)</option>
                    <option value="">BẤT ĐỘNG SẢN (Land, house)</option>
                    <option value="">PHƯƠNG TIỆN (Vehicle)</option>
                    <option value="">NHÂN LỰC (Manpower)</option>
                    <option value="">XUẤT - NHẬP KHẨU (Import - Export)</option>
                  </select>
                </div>
              </div>
              <div className="border-r border-gray-300 p-2">
                <div className="text-center">
                  <select className="w-full border border-gray-300 p-1">
                    <option value="">PHẾ LIỆU (Scrap)</option>
                    <option value="">MỚI (New)</option>
                    <option value="">CŨ (Old)</option>
                    <option value="">CHƯA SỬ DỤNG (Unused)</option>
                  </select>
                </div>
              </div>
              <div className="p-2">
                <div className="text-center">
                  <select className="w-full border border-gray-300 p-1 mb-2">
                    <option value="">QUỐC GIA (Nation)</option>
                    <option value="">VN</option>
                    <option value="">USA</option>
                  </select>
                </div>
              </div>
              <div className="p-2">
                <div className="text-center">
                  <select className="w-full border border-gray-300 p-1 mb-2">
                    <option value="">TẤT CẢ (All)</option>
                    <option value="">Chọn tỉnh (Select province)</option>
                  </select>
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
                  <div className="grid grid-cols-6">
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
                    <div className="p-2 text-center">
                      <div>HÌNH ẢNH<br/><span className="text-xs italic">(tải lên)</span></div>
                      <div className="text-xs">(Image)</div>
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
                      <div>CHẤT LƯỢNG:<br/><span className="text-xs italic">(Quality)</span></div>
                      <div className="text-xs">TẢI FILE KIỂM ĐỊNH, PHÂN TÍCH CHẤT LƯỢNG, HÓA ĐƠN HÀNG HÓA, HỢP ĐỒNG</div>
                      <div className="text-xs">(Upload: CO, CQ, invoice, contract, inspection file)</div>
                      <input type="file" className="w-full p-1 mt-1 text-xs" />
                    </div>
                    <div className="border-r border-gray-300 p-2 text-center">
                      <div>ƯỚC LƯỢNG<br/><span className="text-xs italic">(nhập)</span></div>
                      <div className="text-xs">(Estimate)</div>
                      <input type="text" name="estimatedValue" value={goodsInfo.estimatedValue} onChange={handleInputChange} className="w-full border border-gray-300 p-1 mt-1" />
                    </div>
                    <div className="border-r border-gray-300 p-2 text-center">
                      <div>ĐVT<br/><span className="text-xs italic">(nhập)</span></div>
                      <div className="text-xs">(Unit)</div>
                      <input type="text" name="unit" value={goodsInfo.unit} onChange={handleInputChange} className="w-full border border-gray-300 p-1 mt-1" />
                    </div>
                    <div className="border-r border-gray-300 p-2 text-center">
                      <div>ĐƠN GIÁ THỊ TRƯỜNG<br/><span className="text-xs italic">(nhập)</span></div>
                      <div className="text-xs">(Unit market price)</div>
                      <input type="text" name="price" value={goodsInfo.price} onChange={handleInputChange} className="w-full border border-gray-300 p-1 mt-1" />
                    </div>
                    <div className="border-r border-gray-300 p-2 text-center">
                      <div>ĐƠN GIÁ MONG MUỐN THẤP NHẤT<br/><span className="text-xs italic">(nhập)</span></div>
                      <div className="text-xs">(Lowest unit asking price)</div>
                      <input type="text" name="askingPrice" value={goodsInfo.askingPrice} onChange={handleInputChange} className="w-full border border-gray-300 p-1 mt-1" />
                    </div>
                    <div className="border-r border-gray-300 p-2 text-center">
                      <div>ĐƠN GIÁ MONG MUỐN CAO NHẤT<br/><span className="text-xs italic">(nhập)</span></div>
                      <div className="text-xs">(Highest unit asking price)</div>
                      <input type="text" name="highestAskingPrice" className="w-full border border-gray-300 p-1 mt-1" />
                    </div>
                    <div className="p-2 text-center">
                      <div>SỐ NGÀY ĐỂ GIAO HÀNG SAU KHI CHẤP NHẬN<br/><span className="text-xs italic">(nhập)</span></div>
                      <div className="text-xs">(Number of days to delivery after accept)</div>
                      <input type="text" name="deliveryDay" value={goodsInfo.deliveryDay} onChange={handleInputChange} className="w-full border border-gray-300 p-1 mt-1" />
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
                  <div className="grid grid-cols-5">
                    <div className="border-r border-gray-300 p-2 text-center">
                      <div>THỜI GIAN KẾT THÚC ĐĂNG BÀI<br/><span className="text-xs italic">(End post time)</span></div>
                    </div>
                    <div className="border-r border-gray-300 p-2 text-center">
                      <div>THÀNH TIỀN MONG MUỐN THẤP NHẤT<br/><span className="text-xs italic">(nhập)</span></div>
                      <div className="text-xs">(Lowest amount)</div>
                    </div>
                    <div className="border-r border-gray-300 p-2 text-center">
                      <div>THÀNH TIỀN MONG MUỐN CAO NHẤT<br/><span className="text-xs italic">(nhập)</span></div>
                      <div className="text-xs">(Highest amount)</div>
                    </div>
                    <div className="border-r border-gray-300 p-2 text-center">
                      <div>GIÁ TỰ ĐỘNG DUYỆT THẤP NHẤT<br/><span className="text-xs italic">(nhập)</span></div>
                      <div className="text-xs">(Lowest price to automatically accept)</div>
                      <input type="text" name="autoAcceptPrice" value={goodsInfo.autoAcceptPrice} onChange={handleInputChange} className="w-full border border-gray-300 p-1 mt-1" />
                    </div>
                    <div className="p-2 text-center">
                      <div>GIÁ TỰ ĐỘNG DUYỆT CAO NHẤT<br/><span className="text-xs italic">(nhập)</span></div>
                      <div className="text-xs">(Highest price to automatically accept)</div>
                      <input type="text" name="highestAutoAcceptPrice" className="w-full border border-gray-300 p-1 mt-1" />
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
                    <div className="border-r border-gray-300 p-2">
                      <select 
                        name="deliveryLocation" 
                        value={goodsInfo.deliveryLocation} 
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-1"
                      >
                        <option value="">Chọn địa điểm</option>
                        <option value="seller">KHO BÊN BÁN (Warehouse of seller)</option>
                        <option value="buyer">KHO BÊN MUA (Warehouse of buyer)</option>
                      </select>
                    </div>
                    <div className="p-2 text-center">
                      <div className="text-red-500">*</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 7 */}
              <div className="grid grid-cols-8 border-b border-gray-300">
                <div className="border-r border-gray-300 p-2 text-center w-16 flex items-center justify-center">
                  <span className="font-bold">7</span>
                </div>
                <div className="col-span-7">
                  <div className="grid grid-cols-4">
                    <div className="border-r border-gray-300 p-2 text-center">
                      <div>THỜI LƯỢNG THỰC HIỆN:<br/><span className="text-xs italic">(Contract duration)</span></div>
                    </div>
                    <div className="border-r border-gray-300 p-2">
                      <select 
                        name="contractDuration" 
                        value={goodsInfo.contractDuration} 
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-1"
                      >
                        <option value="">Chọn thời gian</option>
                        <option value="1">1 LẦN (One)</option>
                        <option value="month">THÁNG (Month)</option>
                        <option value="year">NĂM (Year)</option>
                      </select>
                    </div>
                    <div className="border-r border-gray-300 p-2">
                      <input 
                        type="text" 
                        name="contractPeriod" 
                        value={goodsInfo.contractPeriod} 
                        onChange={handleInputChange} 
                        className="w-full border border-gray-300 p-1" 
                        placeholder="(nhập)"
                      />
                    </div>
                    <div className="p-2 text-center">
                      <div className="text-red-500">*</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 8 */}
              <div className="grid grid-cols-8 border-b border-gray-300">
                <div className="border-r border-gray-300 p-2 text-center w-16 flex items-center justify-center">
                  <span className="font-bold">8</span>
                </div>
                <div className="col-span-7">
                  <div className="grid grid-cols-4">
                    <div className="border-r border-gray-300 p-2 text-center">
                      <div>NGƯỜI PHỤ TRÁCH KHÁC:<br/><span className="text-xs italic">(Other person in charge)</span></div>
                    </div>
                    <div className="border-r border-gray-300 p-2">
                      <input 
                        type="text" 
                        name="personInCharge" 
                        value={goodsInfo.personInCharge} 
                        onChange={handleInputChange} 
                        className="w-full border border-gray-300 p-1" 
                        placeholder="(nhập)"
                      />
                    </div>
                    <div className="border-r border-gray-300 p-2">
                      <div className="text-center">
                        <div>SĐT<br/><span className="text-xs italic">(Phone number)</span></div>
                        <input 
                          type="text" 
                          name="phoneNumber" 
                          value={goodsInfo.phoneNumber} 
                          onChange={handleInputChange} 
                          className="w-full border border-gray-300 p-1 mt-1" 
                          placeholder="(nhập)"
                        />
                      </div>
                    </div>
                    <div className="p-2 text-center">
                      <div>EMAIL<br/><span className="text-xs italic">(nhập)</span></div>
                      <input 
                        type="email" 
                        name="email" 
                        value={goodsInfo.email} 
                        onChange={handleInputChange} 
                        className="w-full border border-gray-300 p-1 mt-1" 
                        placeholder="(nhập)"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 9 */}
              <div className="grid grid-cols-8 border-b border-gray-300">
                <div className="border-r border-gray-300 p-2 text-center w-16 flex items-center justify-center">
                  <span className="font-bold">9</span>
                </div>
                <div className="col-span-7">
                  <div className="grid grid-cols-2">
                    <div className="border-r border-gray-300 p-2 text-center">
                      <div>XÁC NHẬN LÀ CHỦ SỞ HỮU VÀ CHỦ TRÁCH NHIỆM VỀ HÀNG HÓA<br/><span className="text-xs italic">(Confirm ownership and responsibility about the goods)</span></div>
                    </div>
                    <div className="p-2 text-center">
                      <div className="flex justify-center items-center h-full">
                        <input 
                          type="checkbox" 
                          name="ownershipConfirm" 
                          checked={goodsInfo.ownershipConfirm}
                          onChange={handleInputChange}
                          className="w-4 h-4" 
                        />
                      </div>
                      <div className="text-red-500 mt-2">*</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 10 */}
              <div className="grid grid-cols-8 border-b border-gray-300">
                <div className="border-r border-gray-300 p-2 text-center w-16 flex items-center justify-center">
                  <span className="font-bold">10</span>
                </div>
                <div className="col-span-7">
                  <div className="grid grid-cols-2">
                    <div className="border-r border-gray-300 p-2 text-center">
                      <div>PHÍ ĐĂNG KÝ SỰ KIỆN:<br/><span className="text-xs italic">(Event fee)</span></div>
                    </div>
                    <div className="p-2">
                      <input 
                        type="text" 
                        name="fee" 
                        value={goodsInfo.fee} 
                        onChange={handleInputChange} 
                        className="w-full border border-gray-300 p-1" 
                        placeholder="(nhập) %"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 11 */}
              <div className="grid grid-cols-8 border-b border-gray-300">
                <div className="border-r border-gray-300 p-2 text-center w-16 flex items-center justify-center">
                  <span className="font-bold">11</span>
                </div>
                <div className="col-span-7">
                  <div className="grid grid-cols-4">
                    <div className="border-r border-gray-300 p-2 text-center">
                      <div>PHÍ LIVESTREAM:<br/><span className="text-xs italic">(Livestream fee)</span></div>
                    </div>
                    <div className="border-r border-gray-300 p-2">
                      <input 
                        type="text" 
                        name="livestreamFee" 
                        value={goodsInfo.livestreamFee} 
                        onChange={handleInputChange} 
                        className="w-full border border-gray-300 p-1" 
                        placeholder="(nhập) %"
                      />
                    </div>
                    <div className="border-r border-gray-300 p-2 text-center">
                      <div className="text-xs">(tải video lên)</div>
                      <div className="text-xs">MỞ ĐẦU VIDEO BẰNG CÂU "NGHĨA = CÔNG BẰNG, VÌ NGHĨA QUÊN THÂN"</div>
                      <div className="text-xs">(Start video by slogan: NGHĨA as FAIRNESS)</div>
                    </div>
                    <div className="p-2 text-center">
                      <div className="text-red-500">*</div>
                    </div>
                  </div>
                </div>
              </div>

{/* Row 12 */}
<div className="grid grid-cols-8 border-b border-gray-300">
                <div className="border-r border-gray-300 p-2 text-center w-16 flex items-center justify-center">
                  <span className="font-bold">12</span>
                </div>
                <div className="col-span-7 grid grid-cols-4">
                  {/* PHÍ QUẢNG CÁO column */}
                  <div className="border-r border-gray-300 p-2 text-center flex items-center justify-center">
                    <div>
                      <div className="font-semibold">PHÍ QUẢNG CÁO:</div>
                      <div className="text-xs italic">(Advertising fee)</div>
                    </div>
                  </div>
                  
                  {/* Right side with sub-rows */}
                  <div className="col-span-3">
                    {/* NẠP TIỀN QUẢNG CÁO */}
                    <div className="grid grid-cols-3 border-b border-gray-300">
                      <div className="border-r border-gray-300 p-2 text-center">
                        <div>NẠP TIỀN QUẢNG CÁO</div>
                        <div className="text-xs italic">(Amount for advertising)</div>
                      </div>
                      <div className="border-r border-gray-300 p-2">
                        <input 
                          type="text" 
                          name="advertisingAmount" 
                          value={goodsInfo.advertisingAmount || ''} 
                          onChange={handleInputChange} 
                          className="w-full border border-gray-300 p-1" 
                          placeholder="(nhập)"
                        />
                      </div>
                      <div className="p-2 text-center">
                        <div>VND</div>
                        <div className="text-red-500">*</div>
                      </div>
                    </div>

                    {/* TRÊN TRANG CHỦ */}
                    <div className="grid grid-cols-3 border-b border-gray-300">
                      <div className="border-r border-gray-300 p-2 text-center">
                        <div>TRÊN TRANG CHỦ</div>
                        <div className="text-xs italic">(On main page)</div>
                      </div>
                      <div className="border-r border-gray-300 p-2">
                        <input 
                          type="text" 
                          name="mainPageAd" 
                          value={goodsInfo.mainPageAd || ''} 
                          onChange={handleInputChange} 
                          className="w-full border border-gray-300 p-1" 
                          placeholder="(nhập)"
                        />
                      </div>
                      <div className="p-2 text-center">
                        <div>VND / GIÂY (S) / LƯỢT XEM (View)</div>
                        <div className="text-red-500">*</div>
                      </div>
                    </div>

                    {/* TRÊN VIDEO */}
                    <div className="grid grid-cols-3 border-b border-gray-300">
                      <div className="border-r border-gray-300 p-2 text-center">
                        <div>TRÊN VIDEO</div>
                        <div className="text-xs italic">(On video)</div>
                      </div>
                      <div className="border-r border-gray-300 p-2">
                        <input 
                          type="text" 
                          name="videoAd" 
                          value={goodsInfo.videoAd || ''} 
                          onChange={handleInputChange} 
                          className="w-full border border-gray-300 p-1" 
                          placeholder="(nhập)"
                        />
                      </div>
                      <div className="p-2 text-center">
                        <div>VND / GIÂY (S) / LƯỢT XEM (View)</div>
                        <div className="text-red-500">*</div>
                      </div>
                    </div>

                    {/* NỘI DUNG QUẢNG CÁO */}
                    <div className="grid grid-cols-3 border-b border-gray-300">
                      <div className="border-r border-gray-300 p-2 text-center">
                        <div>NỘI DUNG QUẢNG CÁO</div>
                        <div className="text-xs italic">(Advertising content)</div>
                      </div>
                      <div className="border-r border-gray-300 p-2">
                        <div className="text-xs">(tải video lên)</div>
                        <div className="text-xs">MỞ ĐẦU VIDEO BẰNG CÂU "NGHĨA = CÔNG BẰNG, VÌ NGHĨA QUÊN THÂN"</div>
                        <div className="text-xs italic">(Start video by slogan: NGHĨA as FAIRNESS)</div>
                      </div>
                      <div className="p-2 text-center">
                        <div className="text-red-500">*</div>
                      </div>
                    </div>

                    {/* ĐĂNG KÝ LÀM NỘI DUNG QUẢNG CÁO */}
                    <div className="grid grid-cols-3">
                      <div className="border-r border-gray-300 p-2 text-center">
                        <div>ĐĂNG KÝ LÀM NỘI DUNG QUẢNG CÁO</div>
                        <div className="text-xs italic">(Register to make advertising)</div>
                      </div>
                      <div className="border-r border-gray-300 p-2">
                        <input 
                          type="checkbox" 
                          name="registerAdvertising" 
                          checked={goodsInfo.registerAdvertising || false} 
                          onChange={handleInputChange} 
                          className="w-4 h-4"
                        />
                      </div>
                      <div className="p-2 text-center">
                        <div className="text-red-500">*</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 13 */}
              <div className="grid grid-cols-8 border-b border-gray-300">
                <div className="border-r border-gray-300 p-2 text-center w-16 flex items-center justify-center">
                  <span className="font-bold">13</span>
                </div>
                <div className="col-span-7">
                  <div className="grid grid-cols-4">
                    <div className="border-r border-gray-300 p-2 text-center">
                      <div>PHÍ THÀNH CÔNG:</div>
                      <div className="text-xs italic">(Success fee)</div>
                    </div>
                    <div className="border-r border-gray-300 p-2">
                      <input 
                        type="text" 
                        name="successFee" 
                        value={goodsInfo.successFee || ''} 
                        onChange={handleInputChange} 
                        className="w-full border border-gray-300 p-1" 
                        placeholder="(nhập) %"
                      />
                    </div>
                    <div className="border-r border-gray-300 p-2"> %
                    </div>
                    <div className="p-2 text-center">
                      <div className="text-red-500">*</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 14 */}
              <div className="grid grid-cols-8 border-b border-gray-300">
                <div className="border-r border-gray-300 p-2 text-center w-16 flex items-center justify-center">
                  <span className="font-bold">14</span>
                </div>
                <div className="col-span-7">
                  <div className="grid grid-cols-4">
                    <div className="border-r border-gray-300 p-2 text-center">
                      <div>TỔNG PHÍ:</div>
                      <div className="text-xs italic">(Total fees)</div>
                    </div>
                    <div className="border-r border-gray-300 p-2">
                      <input 
                        type="text" 
                        name="totalFees" 
                        value={goodsInfo.totalFees || ''} 
                        onChange={handleInputChange} 
                        className="w-full border border-gray-300 p-1" 
                        placeholder="(tính) %"
                      />
                    </div>
                    <div className="border-r border-gray-300 p-2">%
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom declaration section */}
              <div className="border-t border-gray-300 p-4">
                <div className="flex items-start gap-3">
                  <input 
                    type="checkbox" 
                    name="agreeTerms" 
                    checked={goodsInfo.agreeTerms || false} 
                    onChange={handleInputChange} 
                    className="w-4 h-4 mt-1 flex-shrink-0"
                    required
                  />
                  <div className="text-justify text-sm">
                    <div className="mb-2">
                      Tôi cam kết những thông tin trên trên là hoàn toàn đúng sự thật và đồng ý, chấp nhận tuân theo các điều khoản của hợp đồng cũng như mọi điều khoản 
                      và điều kiện do HỆ THỐNG WEBSITE, APP yêu cầu. Tôi xin chịu hoàn toàn trách nhiệm trước pháp luật về hàng hóa và các thông tin đăng tải.
                    </div>
                    <div className="italic text-xs">
                      (I hereby certify that the above information is completely true and agree to comply with the terms of the contract as well as all terms and conditions 
                      required by the WEBSITE SYSTEM, APP. I am fully responsible before the law for the goods and information posted.)
                    </div>
                  </div>
                </div>
              </div>

              {/* Send Request Button */}
              <div className="text-center p-4 border-t border-gray-300">
                <button 
                  type="submit" 
                  className="bg-gray-300 hover:bg-gray-100 text-black font-bold py-2 px-6 border border-gray-200"
                >
                  GỬI YÊU CẦU
                  <div className="text-xs">(Send requirement)</div>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}