import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../styles/Login.css";
import { useParams } from "react-router-dom";
import { getProductById, updateProductPriceInfo } from "../services/productService";


export default function DetailOfGoodsPage() {
  const { t } = useTranslation();
  const [color, setColor] = useState(localStorage.getItem("selectedColor"));
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [priceData, setPriceData] = useState({
    setPrice: null,
    depositRequirement: null,
  });


  const handlePriceUpdate = async () => {
    const authToken = await localStorage.getItem("authToken");
    try {
      await updateProductPriceInfo(product.id, authToken, priceData);
      alert(t('goods.priceUpdatedSuccess', 'Price updated successfully'));
    } catch (error) {
      alert(t('goods.priceUpdateError', 'Price update failed'));
    }
  };


  const navigate = useNavigate();
  const { id } = useParams(); // Get the ID from the URL parameter
  const [product, setProduct] = useState({
    id: 1,
  documentId: "w940wbgafccoucy16evy21v4",
  name: "Oil",
  model: "M",
  size: "120 KG",
  color: "red",
  price: 100000,
  askingPrice: null,
  displayPrice: true,
  hidePrice: false,
  location: "HCM",
  address: null,
  description: null,
  estimatedValue: null,
  deliveryDate: null,
  depositRequirement: null,
  autoAcceptPrice: null,
  unit: null,
  marketPrice: null,
  lowUnitPrice: null,
  lowestUnitAskingPrice: null,
  highestUnitAskingPrice: null,
  deliveryDays: null,
  endPostTime: null,
  lowestAmount: null,
  highestAmount: null,
  lowestAutoAcceptPrice: null,
  highestAutoAcceptPrice: null,
  contractDuration: null,
  personInCharge: null,
  phoneNumber: null,
  email: null,
  confirmOwnership: true,
  eventFeePercentage: null,
  livestreamFee: null,
  advertisingAmount: null,
  showOnMainPage: 0,
  showOnVideo: 0,
  advertisingUrl: null,
  registerForAdvertising: false,
  successFee: null,
  totalFees: null,
  createdAt: "2025-08-10T07:55:48.149Z",
  updatedAt: "2025-08-10T07:55:48.149Z",
  publishedAt: "2025-08-10T07:55:48.127Z",
  listingType: null,
  categoryType: null,
  conditionType: null,
  nation: null,
  province: null
  });

  const categories = {
    sale: { vi: "HÀNG BÁN", en: "Sale" },
    buy: { vi: "CẦN MUA", en: "Buy" },
    rent: { vi: "HÀNG THUÊ", en: "Rent" },
    forRent: { vi: "CHO THUÊ", en: "For rent" },
    service: { vi: "DỊCH VỤ", en: "Service" }
  };

  const subcategories = {
    goods: { vi: "HÀNG HÓA", en: "Goods" },
    land: { vi: "BẤT ĐỘNG SẢN", en: "Land/house" },
    vehicle: { vi: "PHƯƠNG TIỆN", en: "Vehicle" },
    manpower: { vi: "NHÂN LỰC", en: "Manpower" },
    importExport: { vi: "XUẤT - NHẬP KHẨU", en: "Import - Export" }
  };

  const conditions = {
    scrap: { vi: "PHẾ LIỆU", en: "Scrap" },
    new: { vi: "MỚI", en: "New" },
    old: { vi: "CŨ", en: "Old" },
    unused: { vi: "CHƯA SỬ DỤNG", en: "Unused" }
  };

  const handleChangeColor = (e) => {
    const newColor = e.target.value;
    setColor(newColor);
    localStorage.setItem("selectedColor", newColor);
  };

  useEffect(() => {
    document.getElementById("root").style.backgroundColor = color;
  }, [color]);

  useEffect(() => {
    // Fetch product details using the ID
    fetchProductDetails();

  }, [id]);

const fetchProductDetails = async () => {
      try {
        const response = await getProductById(id);
        setProduct(response.data.data);
        console.log(response.data.data);
        setSelectedCategory(response.data.data.listingType);
        setSelectedSubcategory(response.data.data.categoryType);
        setSelectedCondition(response.data.data.conditionType);
        setSelectedCountry(response.data.data.nation);
        setSelectedProvince(response.data.data.province);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
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
            &nbsp;- {t('detailOfGoods.title', 'CHI TIẾT HÀNG HÓA')}
          </h1>
          <h2 className="text-2xl text-black mt-2">
            <i>({t('detailOfGoods.titleEn', 'Detail of goods')})</i>
          </h2>
        </div>

        {/* Category Selection Table */}
        <div className="w-full border border-gray-300 mt-4">
          <table className="w-full border-collapse">
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2 text-center font-bold w-1/5">
                  <select 
                    className="w-full p-2 border border-gray-300 rounded"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">{t('detailOfGoods.selectType', 'Chọn loại')}</option>
                    {Object.entries(categories).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value.vi} ({value.en})
                      </option>
                    ))}
                  </select>
                </td>
                <td className="border border-gray-300 p-2 text-center font-bold w-1/5">
                  <select 
                    className="w-full p-2 border border-gray-300 rounded"
                    value={selectedSubcategory}
                    onChange={(e) => setSelectedSubcategory(e.target.value)}
                  >
                    <option value="">Chọn loại</option>
                    {Object.entries(subcategories).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value.vi} ({value.en})
                      </option>
                    ))}
                  </select>
                </td>
                <td className="border border-gray-300 p-2 text-center font-bold w-1/5">
                  <select 
                    className="w-full p-2 border border-gray-300 rounded"
                    value={selectedCondition}
                    onChange={(e) => setSelectedCondition(e.target.value)}
                  >
                    <option value="">Chọn loại</option>
                    {Object.entries(conditions).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value.vi} ({value.en})
                      </option>
                    ))}
                  </select>
                </td>
                <td className="border border-gray-300 p-2 text-center font-bold w-2/5">
                  <select className="w-full p-2 border border-gray-300 rounded">
                    <option value="">{t('detailOfGoods.all', 'TẤT CẢ')} ({t('detailOfGoods.allEn', 'All')})</option>
                    <option value="">{t('detailOfGoods.selectProvince', 'Chọn tỉnh')} ({t('detailOfGoods.selectProvinceEn', 'Select province')})</option>
                    <option value="">{t('detailOfGoods.selectCountry', 'Chọn nước')} ({t('detailOfGoods.selectCountryEn', 'Select country')})</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
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
                  {product.custom_id}
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
                  {t('detailOfGoods.orderNumber', 'SỐ THỨ TỰ')}
                  <br />
                  <span className="text-sm italic">(#)</span>
                  <br />
                  <span className="text-sm italic">{product.id}</span>
                </td>
                <td className="border border-gray-300 p-2 text-center font-bold">
                  {t('detailOfGoods.goodsName', 'TÊN HÀNG HÓA')}
                  <br />
                  <span className="text-sm italic">({t('detailOfGoods.goodsNameEn', 'Name of goods')})</span>
                  <br />
                  <span className="text-sm italic">{product.name}</span>
                </td>
                <td className="border border-gray-300 p-2 text-center font-bold">
                  {t('detailOfGoods.model', 'MÃ SỐ')}
                  <br />
                  <span className="text-sm italic">({t('detailOfGoods.modelEn', 'Model')})</span>
                  <br />
                  <span className="text-sm italic">{product.model}</span>

                </td>
                <td className="border border-gray-300 p-2 text-center font-bold">
                  {t('detailOfGoods.size', 'KÍCH THƯỚC')}
                  <br />
                  <span className="text-sm italic">({t('detailOfGoods.sizeEn', 'Size')})</span>
                  <br />
                  <span className="text-sm italic">{product.size}</span>
                </td>
                <td className="border border-gray-300 p-2 text-center font-bold">
                  {t('detailOfGoods.color', 'MÀU SẮC')}
                  <br />
                  <span className="text-sm italic">({t('detailOfGoods.colorEn', 'Color')})</span>
                  <br />
                  <span className="text-sm italic">{product.color}</span>
                </td>
                <td className="border border-gray-300 p-2 text-center font-bold">
                  {t('detailOfGoods.image', 'HÌNH ẢNH')}
                  <br />
                  <span className="text-sm italic">({t('detailOfGoods.imageEn', 'Image')})</span>
                  <br />
                  <span className="text-sm italic">({t('detailOfGoods.command', 'lệnh')})</span>
                </td>
                <td className="border border-gray-300 p-2 text-center font-bold">
                  {t('detailOfGoods.quality', 'CHẤT LƯỢNG')} <span className="text-red-500 font-bold">*</span>
                  <br />
                  <span className="text-sm italic">({t('detailOfGoods.qualityEn', 'Quality')})</span>
                  <br />
                  <span className="text-sm italic">({t('detailOfGoods.command', 'lệnh')})</span>
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 text-center font-bold w-1/5">
                  {t('detailOfGoods.estimate', 'ƯỚC LƯỢNG')}
                  <br />
                  <span className="text-sm italic">({t('detailOfGoods.estimateEn', 'Estimate')})</span>
                  <br />
                  <span className="text-sm italic">{product.estimatedValue}</span>

                </td>
                <td className="border border-gray-300 p-2 text-center font-bold">
                  {t('detailOfGoods.unit', 'ĐVT')}
                  <br />
                  <span className="text-sm italic">({t('detailOfGoods.unitEn', 'Unit')})</span>
                  <br />
                  <span className="text-sm italic">{product.unit}</span>

                </td>
                <td className="border border-gray-300 p-2 text-center font-bold">
                  {t('detailOfGoods.marketPrice', 'GIÁ THỊ TRƯỜNG')}
                  <br />
                  <span className="text-sm italic">({t('detailOfGoods.marketPriceEn', 'Market price')})</span>
                  <br />
                  <span className="text-sm italic">{product.price}</span>

                </td>
                <td className="border border-gray-300 p-2 text-center font-bold">
                  {t('detailOfGoods.askingPrice', 'GIÁ MONG MUỐN')}
                  <br />
                  <span className="text-sm italic">({t('detailOfGoods.askingPriceEn', 'Asking price')})</span>
                  <br />
                  <span className="text-sm italic">{product.askingPrice}</span>
                </td>
                <td className="border border-gray-300 p-2 text-center font-bold">
                  {t('detailOfGoods.setPrice', 'GIÁ ĐẶT')}
                  <br />
                  <span className="text-sm italic">({t('detailOfGoods.setPriceEn', 'Set price')})</span>
                  <br />
                  <input
                    type="number"
                    value={priceData.setPrice ? priceData.setPrice : ""}
                    onChange={(e) => setPriceData({ ...priceData, setPrice: e.target.value })}
                    className="w-full mt-1 p-1 text-center border border-gray-300 rounded"
                    placeholder={t('detailOfGoods.enter', '(nhập)')}
                  />
                </td>
                <td className="border border-gray-300 p-2 text-center font-bold">
                  {t('detailOfGoods.depositRequirement', 'YÊU CẦU ĐẶT CỌC')}
                  <br />
                  <span className="text-sm italic">({t('detailOfGoods.depositRequirementEn', 'Deposit requirement')})</span>
                  <br />
                  <input
                    type="number"
                    className="w-full mt-1 p-1 text-center border border-gray-300 rounded"
                    placeholder={t('detailOfGoods.enter', '(nhập)')}
                    value={priceData.depositRequirement ? priceData.depositRequirement : ""}
                    onChange={(e) => setPriceData({ ...priceData, depositRequirement: e.target.value })}
                  />
                </td>
                <td className="border border-gray-300 p-2 text-center font-bold">
                  {t('detailOfGoods.deliveryEndDate', 'NGÀY GIAO HÀNG/KẾT THÚC CHẤP NHẬN')} <span className="text-red-500 font-bold">*</span>
                  <br />
                  <span className="text-sm italic">
                    ({t('detailOfGoods.deliveryEndDateEn', 'Date of delivery/End of accept')})
                  </span>
                  <br />
                  <span className="text-sm italic">{product.deliveryDate}</span>

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
                  {t('detailOfGoods.goodsInfo', 'THÔNG TIN HÀNG HÓA')}
                  <br />
                  <span className="text-sm italic">({t('detailOfGoods.goodsInfoEn', 'INFORMATION OF GOODS')})</span>
                </td>
                <td
                  className="border border-gray-300 p-2 text-center"
                  colSpan="4"
                >
                  <span className="text-sm italic">{product.description}</span>

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
                  {t('detailOfGoods.goodsAddress', 'ĐỊA CHỈ HÀNG HÓA')}:
                  <br />
                  <span className="text-sm italic">({t('detailOfGoods.goodsAddressEn', 'Goods address')})</span>
                </td>
                <td className="border border-gray-300 p-2 text-center" style={{ width: 'calc(2/6 * 100%)' }}>
                  {product.address}

                </td>
                <td className="border border-gray-300 p-2 text-center font-bold w-1/5">
                  {t('detailOfGoods.handoverLocation', 'ĐỊA ĐIỂM GIAO HÀNG')}:
                  <br />
                  <span className="text-sm italic">({t('detailOfGoods.handoverLocationEn', 'Location of handover')})</span>
                </td>
                <td className="border border-gray-300 p-2 text-center" style={{ width: 'calc(2/6 * 100%)' }}>
                  {product.location}
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
                  {t('detailOfGoods.contractDuration', 'THỜI LƯỢNG THỰC HIỆN')}:
                  <br />
                  <span className="text-sm italic">({t('detailOfGoods.contractDurationEn', 'Contract duration')})</span>
                </td>
                <td className="border border-gray-300 p-2 text-center w-1/6">
                  <span>
                    {product.contractDuration} <br />

                    {t('detailOfGoods.one', 'MỘT')}
                    <br />
                    ({t('detailOfGoods.oneEn', 'One')})
                    <br />
                    {t('detailOfGoods.many', 'NHIỀU')}
                    <br />
                    ({t('detailOfGoods.manyEn', 'Many')})
                  </span>
                </td>
                <td className="border border-gray-300 p-2 text-center w-1/6">
                  <span>
                    ({t('detailOfGoods.command', 'lệnh')})
                    <br />
                    {t('detailOfGoods.time', 'LẦN')}
                    <br />
                    ({t('detailOfGoods.timeEn', 'Time')})
                    <br />
                    {t('detailOfGoods.year', 'NĂM')}
                    <br />
                    ({t('detailOfGoods.yearEn', 'Year')})
                  </span>
                </td>
                <td
                  className="border border-gray-300 p-2 text-center font-bold w-1/5"
                  rowSpan="2"
                >
                  {t('detailOfGoods.endTime', 'THỜI GIAN KẾT THÚC')}:
                  <br />
                  <span className="text-sm italic">({t('detailOfGoods.endTimeEn', 'End time')})</span>
                </td>
                <td className="border border-gray-300 p-2 text-center w-1/6">
                  {product.endPostTime ? new Date(product.endPostTime).toLocaleDateString('vi-VN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  }) : ''}
                  <span className="text-sm italic">({t('detailOfGoods.dayMonthYear', 'ngày, tháng, năm')})</span>
                </td>
               <td className="border border-gray-300 p-2 text-center w-1/6">
                  {product.endPostTime ? new Date(product.endPostTime).toLocaleTimeString('vi-VN', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                  }) : ''}
                  <span className="text-sm italic">({t('detailOfGoods.hourMinute', 'giờ, phút')})</span>
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
                    onClick={handlePriceUpdate}

                    className="px-6 py-2 border rounded hover:bg-green-600 font-bold w-full"
                  >
                    {t('detailOfGoods.accept', 'CHẤP NHẬN')}
                    <br />
                    <span className="text-sm italic">({t('detailOfGoods.acceptEn', 'Accept')})</span>
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
            {t('common.goBack', 'Quay lại')}
          </button>
        </div>
      </div>
    </div>
  );
}
