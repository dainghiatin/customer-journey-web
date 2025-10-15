import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../styles/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Home as HomeIcon,
  KeyboardIcon as KeyboardIcon,
} from "lucide-react";
import { createProduct } from "../services/productService";
import ProductGrid from "../components/ProductGrid";

export default function NewGoodPostPage() {
  const { t } = useTranslation();
  const [color, setColor] = useState(localStorage.getItem("selectedColor"));
  const [user, setUser] = useState(null);
  const [selectedType, setSelectedType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [goodsItems, setGoodsItems] = useState([
    {
      id: 1,
      name: "",
      model: "",
      size: "",
      color: "",
      image: null,
      // New extended fields
      qualityInfoFile: null,
      warrantyChangeDays: "",
      warrantyRepairDays: "",
      repairWarrantyRetentionPercent: "",
      maxDeliveryDaysAfterAcceptance: "",
      handoverLocation: "",
      contractDurationMultiplicity: "",
      contractDurationUnit: "",
      directPayment: "",
      depositRequirementDirect: "",
      paymentViaWallet: "",
      depositRequirementWallet: "",
      vat: "",
      quantityMinimum: "",
      unit: "",
      unitMarketPrice: "",
      unitAskingPrice: "",
      amountDesired: "",
      autoAcceptPrice: ""
    }
  ]);
  
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

  const handleAddGoodsItem = () => {
    setGoodsItems([
      ...goodsItems,
      {
        id: goodsItems.length + 1,
        name: "",
        model: "",
        size: "",
        color: "",
        image: null,
        // New extended fields
        qualityInfoFile: null,
        warrantyChangeDays: "",
        warrantyRepairDays: "",
        repairWarrantyRetentionPercent: "",
        maxDeliveryDaysAfterAcceptance: "",
        handoverLocation: "",
        contractDurationMultiplicity: "",
        contractDurationUnit: "",
        directPayment: "",
        depositRequirementDirect: "",
        paymentViaWallet: "",
        depositRequirementWallet: "",
        vat: "",
        quantityMinimum: "",
        unit: "",
        unitMarketPrice: "",
        unitAskingPrice: "",
        amountDesired: "",
        autoAcceptPrice: ""
      }
    ]);
  };

  const handleGoodsItemChange = (id, field, value) => {
    setGoodsItems(
      goodsItems.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

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
        <div className="flex items-center justify-between relative">
          <button 
            className="text-red-600 hover:text-red-800 relative"
            onClick={() => navigate("/")}
          >
            <HomeIcon size={28} />
          </button>
          {/* Tiêu đề ở giữa */}
          <div className="text-center mb-4 relative flex-1">
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
          <button 
            className="text-red-600 hover:text-red-800"
            onClick={() => navigate("/admin-control")}
          >
            <KeyboardIcon size={28} />
          </button>
        </div>

        {/* Main Form */}
        <div className="mt-6">
          <form onSubmit={handleSubmit} className="border border-gray-300">
            {/* Top Categories Section */}
            <div className="grid grid-cols-3">
              <div className="border p-2 bg-blue-500 text-white">
                <div className="font-bold text-center">HÀNG HÓA<br/><span className="text-sm font-normal italic">(Goods)</span></div>
              </div>
              <div className="border p-2">
                <div className="font-bold text-center" onClick={()=>navigate("/new-freelancer-post")}>CÔNG VIỆC TỰ DO<br/><span className="text-sm font-normal italic">(Freelancer)</span></div>
              </div>
              <div className="p-2 border">
                <div className="font-bold text-center" onClick={()=>navigate("/new-ai-live-post")}>Ai LIVE</div>
              </div>
            </div>
            
            {/* TÀI KHOẢN HÀNG HÓA Section */}
             <div className="grid grid-cols-5 border-b border-gray-300">
               <div className="border-r border-gray-300 p-2">
                 <div className="font-bold text-center">TÀI KHOẢN HÀNG HÓA<br/><span className="text-sm font-normal italic">(Account of goods)</span></div>
               </div>
               <div className="border-r border-gray-300 p-2 text-center">
                 <input 
                   type="number" 
                   name="exchangeRate" 
                   className="w-full border border-gray-300 p-1 mt-1" 
                   defaultValue="1"
                   onChange={(e) => {
                     const value = parseFloat(e.target.value) || 1;
                     const calculatedValue = value * 1; // Tỉ giá mặc định là 1
                     document.getElementById('calculatedValue').value = calculatedValue;
                   }}     
                 />
                 <div className="font-bold">1</div>
               </div>
               <div className="border-r border-gray-300 p-2 text-center">
                 <div className="font-bold  p-1 mt-1">VN</div>
                 <div className="mt-1 flex items-center justify-center">
                   <span className="mr-2">D|</span>
                 </div>
               </div>
               <div className="border-r border-gray-300 p-2 text-center">
                 <input 
                   type="number" 
                   name="exchangeRate" 
                   className="w-full border border-gray-300 p-1 mt-1" 
                   defaultValue="1"
                   onChange={(e) => {
                     const value = parseFloat(e.target.value) || 1;
                     const calculatedValue = value * 1; // Tỉ giá mặc định là 1
                     document.getElementById('calculatedValue').value = calculatedValue;
                   }}
                 />
                 <div className="font-bold">1</div>
               </div>
               <div className="p-2 text-center">
                 <div className="font-bold">CHUYỂN VỀ VÍ</div>
                 <div className="text-sm italic text-center">(Transfer to wallet)</div>
                 <button 
                   type="button" 
                   className="mt-1 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                 >
                   Chuyển
                 </button>
               </div>
             </div>
              

              
            {/* Numbered rows section */}
            <div className="grid grid-cols-1">
              <div className="grid grid-cols-17 border-b border-gray-300">
                <div className="col-span-1 border-r border-gray-300 p-2 text-center w-full flex items-center justify-center">
                  <span className="font-bold">1</span>
                </div>
                <div className="col-span-16">
                  {/* Category Selection Row 1 */}
                  <div className="grid grid-cols-4 border-b border-gray-300">
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
                      </div><div className="text-center">
                        <select className="w-full border border-gray-300 p-1 mb-2">
                          <option value="">TẤT CẢ (All)</option>
                          <option value="">Chọn tỉnh (Select province)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Row 2 */}
              <div className="grid grid-cols-17 border-b border-gray-300">
                <div className="col-span-1 border-r border-gray-300 p-2 text-center w-16 flex items-center justify-center">
                  <span className="font-bold">2</span>
                </div>
                <div className="col-span-16">
                  <ProductGrid products={goodsItems} />
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
                      <div>THỜI LƯỢNG DUYỆT GIÁ:<br/><span className="text-xs italic">(Price review time)</span></div>
                    </div>
                    <div className="border-r border-gray-300 p-2">
                      <input 
                        type="time" 
                        name="priceReviewTime" 
                        value={goodsInfo.priceReviewTime} 
                        onChange={handleInputChange} 
                        className="w-full border border-gray-300 p-1" 
                        placeholder="(nhập)"
                      />
                    </div>
                    <div className="p-2 text-center">
                      <div className="mt-2 text-red-500">*</div>
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
                  <div className="grid grid-cols-4">
                    <div className="border-r border-gray-300 p-2 text-center">
                      <div>THỜI GIAN KẾT THÚC ĐĂNG BÀI:<br/><span className="text-xs italic">(End Post Time)</span></div>
                    </div>
                    <div className="border-r border-gray-300 p-2">
                      <input 
                        type="date" 
                        name="endPostDate" 
                        value={goodsInfo.endPostDate} 
                        onChange={handleInputChange} 
                        className="w-full border border-gray-300 p-1" 
                        placeholder="(nhập)"
                      />
                    </div>
                    <div className="border-r border-gray-300 p-2">
                      <input 
                        type="time" 
                        name="endPostTime" 
                        value={goodsInfo.endPostTime} 
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
                        name="province" 
                        value={goodsInfo.province} 
                        onChange={handleInputChange} 
                        className="w-full border border-gray-300 p-1" 
                        placeholder="(nhập tỉnh)"
                      />
                      <input 
                        type="text" 
                        name="address" 
                        value={goodsInfo.address} 
                        onChange={handleInputChange} 
                        className="w-full border border-gray-300 p-1 mt-1" 
                        placeholder="(nhập xã)"
                      />
                    </div>
                    <div className="p-2 text-center">
                      <div>VỊ TRÍ<br/><span className="text-xs italic">(Map)</span></div>
                      <div className="mt-2 text-red-500">*</div>
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
                      <input
                        type="checkbox"
                        name="confirmOwnership"
                        value={goodsInfo.confirmOwnership}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-1"
                      />
                    </div>
                    <div className="border-r border-gray-300 p-2">
                      <div>XÁC NHẬN LÀ CHỦ SỞ HỮU VÀ CHỊU TRÁCH NHIỆM VỀ HÀNG HÓA / BÀI ĐĂNG.</div>
                      <div>(Confirm owership, responsibilities about the goods / requirement/ posting)</div>
                    </div>
                    <div className="p-2 text-center">
                      <div className="text-red-500">*</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 7 */}
              <div className="grid grid-cols-17 border-b border-gray-300">
                <div className="col-span-1 border-r border-gray-300 p-2 text-center w-16 flex items-center justify-center">
                  <span className="font-bold">7</span>
                </div>
                <div className="col-span-16 grid grid-cols-4">
                  {/* Right side with sub-rows */}
                  <div className="col-span-7">
                    {/* NẠP TIỀN QUẢNG CÁO */}
                    <div className="grid grid-cols-5 border-b border-gray-300">
                      <div className="border-r border-gray-300 p-2 text-center">
                        <div>PHÍ ĐĂNG KÝ SỰ KIỆN:</div>
                        <div className="text-xs italic">(Event Fee)</div>
                      </div>
                      <div className="border-r border-gray-300 p-2 flex items-center">
                        <input 
                          type="text"
                          name="eventPercentFee"
                          value={goodsInfo.eventPercentFee || ''}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 p-1 mr-1"
                          placeholder="(nhập)"
                        />
                        <span className="text-gray-700">%</span>
                      </div>
                      <div className="p-2 text-center">
                        <div>+</div>
                      </div>
                      <div className="border-l border-gray-300 p-2 flex items-center">
                        <input 
                          type="text"
                          name="eventFee"
                          value={goodsInfo.eventFee || ''}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 p-1 mr-1"
                          placeholder="(nhập)"
                        />
                        <span className="text-gray-700">VND</span>
                      </div>
                      <div className="border-l border-gray-300 p-2 text-center">
                        <span>Trả trước <br />(Prepay)</span>
                      </div>
                    </div>

                    {/* TRÊN TRANG CHỦ */}
                    <div className="grid grid-cols-5 border-b border-gray-300">
                      <div className="border-r border-gray-300 p-2 text-center">
                        <div>PHÍ LIVESTREAM:</div>
                        <div className="text-xs italic">(Livestream Fee)</div>
                      </div>
                      <div className="border-r border-gray-300 p-2 flex items-center">
                        <input 
                          type="text"
                          name="livestreamPercentFee"
                          value={goodsInfo.livestreamPercentFee || ''}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 p-1 mr-1"
                          placeholder="(nhập)"
                        />
                        <span className="text-gray-700">%</span>
                      </div>
                      <div className="p-2 text-center">
                        <div>+</div>
                      </div>
                      <div className="border-l border-gray-300 p-2 flex items-center">
                        <input 
                          type="text"
                          name="livestreamFee"
                          value={goodsInfo.livestreamFee || ''}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 p-1 mr-1"
                          placeholder="(nhập)"
                        />
                        <span className="text-gray-700">VND</span>
                      </div>
                      <div className="border-l border-gray-300 p-2 text-center">
                        <span>Trả trước <br />(Prepay)</span>
                      </div>
                    </div>

                    {/* TRÊN VIDEO */}
                    <div className="grid grid-cols-3 border-b border-gray-300">
                      <div className="border-r border-gray-300 p-2 text-center">
                        <div>PHÍ THÀNH CÔNG:</div>
                        <div className="text-xs italic">(Success Fee)</div>
                      </div>
                      <div className="border-r border-gray-300 p-2 flex items-center">
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
                        <span className="text-gray-700">%</span>
                        <div className="text-red-500">*</div>
                      </div>
                    </div>

                    {/* NỘI DUNG QUẢNG CÁO */}
                    <div className="grid grid-cols-3 border-b border-gray-300">
                      <div className="border-r border-gray-300 p-2 text-center">
                        <div>THUẾ + PHÍ KHÁC:</div>
                        <div className="text-xs italic">(VAT + Other fees)</div>
                      </div>
                      <div className="border-r border-gray-300 p-2">
                        <div className="text-xs">0</div>
                      </div>
                      <div className="p-2 text-center">
                        <div className="">%</div>
                      </div>
                    </div>

                    {/* ĐĂNG KÝ LÀM NỘI DUNG QUẢNG CÁO */}
                    <div className="grid grid-cols-5">
                      <div className="border-r border-gray-300 p-2 text-center">
                        <div>TỔNG PHÍ + THUẾ:</div>
                        <div className="text-xs italic">(Total Fee + VAT)</div>
                      </div>
                      <div className="border-r border-gray-300 p-2 flex items-center">
                        0
                        <span className="text-gray-700">%</span>
                      </div>
                      <div className="p-2 text-center">
                        <div>+</div>
                      </div>
                      <div className="border-l border-gray-300 p-2 flex items-center">
                        <input 
                          type="text"
                          name="totalFee"
                          value={goodsInfo.totalFee || ''}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 p-1 mr-1"
                          placeholder="(nhập)"
                        />
                        <span className="text-gray-700">VND</span>
                      </div>
                      <div className="border-l border-gray-300 p-2 text-center">
                        <span>Trả trước <br />(Prepay)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 8 */}
              <div className="grid grid-cols-8 border-b border-gray-300">
                <div className="border-r border-gray-300 p-2 text-center w-16 flex items-center justify-center">
                  <span className="font-bold">8</span>
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
                        <div>SỐ TIỀN DÙNG CHO QUẢNG CÁO</div>
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
                      </div>
                    </div>

                    {/* NỘI DUNG QUẢNG CÁO */}
                    <div className="grid grid-cols-3 border-b border-gray-300">
                      <div className="border-r border-gray-300 p-2 text-center">
                        <div>NỘI DUNG QUẢNG CÁO</div>
                        <div className="text-xs italic">(Advertising content)</div>
                      </div>
                      <div className="border-r border-gray-300 p-2">
                        <input type="file" className="w-full border border-gray-300 p-1"/>
                      </div>
                      <div className="p-2 text-center">
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
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">HỢP ĐỒNG DỊCH VỤ LÀM NỘI DUNG QUẢNG CÁO (ấn xem)</button>
                      </div>
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