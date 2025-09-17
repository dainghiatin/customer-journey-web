import React, { useState, useEffect } from "react";
import "../styles/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { filterProducts } from "../services/productService";
import { useTranslation } from 'react-i18next';
import {
  Home as HomeIcon,
  Settings as SettingsIcon,
} from "lucide-react";


export default function ListOfGoodsPage() {
  const { t } = useTranslation();
  const [color, setColor] = useState(localStorage.getItem("selectedColor"));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");


  
// Filter state
  const [filters, setFilters] = useState({
    listingType: '',
    categoryType: '',
    conditionType: '',
    nation: '',
    province: '',
    name: ''
  });
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setFilters({
      listingType: selectedCategory ? categories[selectedCategory].en.toLowerCase() : '',
      categoryType: selectedSubcategory ? subcategories[selectedSubcategory].en.toLowerCase() : '',
      conditionType: selectedCondition ? conditions[selectedCondition].en.toLowerCase() : '',
      nation: selectedCountry,
      province: selectedProvince,
      name: searchTerm
    });
  }, [selectedCategory, selectedSubcategory, selectedCondition, selectedCountry, selectedProvince, searchTerm]);
  
  const handleChangeColor = (e) => {
    const newColor = e.target.value;
    setColor(newColor);
    localStorage.setItem("selectedColor", newColor);
  };

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  useEffect(() => {
    document.getElementById("root").style.backgroundColor = color;
    const token = localStorage.getItem("authToken");
    setUser(token);
  }, [color]);

  const fetchProducts = async () => {
      try {
        //setLoading(true);
        const response = await filterProducts(filters, currentPage, 25, null, true);
        setProducts(response.data.data || []);
        setTotalPages(response.data.meta.pagination.pageCount);
        setCurrentPage(response.data.meta.pagination.page);

      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        //setLoading(false);
      }
    };
  
    


  useEffect(() => {
    fetchProducts();
    const category = localStorage.getItem("category");
    const subcategory = localStorage.getItem("subcategory");
    const condition = localStorage.getItem("condition")
    setSelectedCategory(category)
    setSelectedSubcategory(subcategory)
    setSelectedCondition(condition)
    setSelectedProvince(localStorage.getItem("province")===undefined? null : localStorage.getItem("province"))
    setSelectedCountry(localStorage.getItem("nation")===undefined? null : localStorage.getItem("nation"))


  }, []);


  // Categories data
  const categories = {
    "SALE": { vi: "HÀNG BÁN", en: "Sale" },
    "BUY": { vi: "CẦN MUA", en: "Buy" },
    "RENT": { vi: "HÀNG THUÊ", en: "Rent" },
    "FOR_RENT": { vi: "CHO THUÊ", en: "For rent" },
    "SERVICE": { vi: "DỊCH VỤ", en: "Service" },
  };

  const subcategories = {
    "GOODS": { vi: "HÀNG HÓA", en: "Goods" },
    "LANDHOUSE": { vi: "BẤT ĐỘNG SẢN", en: "Land/house" },
    "VEHICLE": { vi: "PHƯƠNG TIỆN", en: "Vehicle" },
    "Manpower": { vi: "NHÂN LỰC", en: "Manpower" },
    "IMPORT_EXPORT": { vi: "XUẤT - NHẬP KHẨU", en: "Import - Export" },
  };

  const conditions = {
    "SCRAP": { vi: "PHẾ LIỆU", en: "Scrap" },
    "NEW": { vi: "MỚI", en: "New" },
    "OLD": { vi: "CŨ", en: "Old" },
    "UNUSED": { vi: "CHƯA SỬ DỤNG", en: "Unused" },
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-transparent backdrop-blur-md p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
        {/* Header with Navigation */}
        <div className="flex items-center justify-between relative mb-6">
          {user && (
            <button 
              className="text-red-600 hover:text-red-800"
              onClick={() => navigate("/")}
            >
              <HomeIcon size={28} />
            </button>
          )}
          
          <div className="flex-1 text-center">
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
              &nbsp;- {t('goods.listOfGoods', 'DANH SÁCH HÀNG HÓA')}
            </h1>
            <h2 className="text-2xl text-black mt-2">
              <i>({t('goods.listOfGoodsEn', 'List of goods')})</i>
            </h2>
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
                <option value="">{t('goods.selectType', 'Chọn loại')}</option>
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
                <option value="">{t('goods.selectSubcategory', 'Chọn danh mục con')}</option>
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
                <option value="">{t('goods.selectCondition', 'Chọn điều kiện')}</option>
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
                    <option value="">{t('goods.all', 'TẤT CẢ')} ({t('goods.allEn', 'All')})</option>
                    <option value="">{t('goods.selectProvince', 'Chọn tỉnh')} ({t('goods.selectProvinceEn', 'Select province')})</option>
                    <option value="">{t('goods.selectCountry', 'Chọn nước')} ({t('goods.selectCountryEn', 'Select country')})</option>
                  </select>
            </div>
          </div>
          
          {/* Search section */}
          <div className="mt-2 p-2 border-2 border-black bg-yellow-200">
            <div className="flex items-center">
              <div className="font-bold mr-4">1. {t('goods.search', 'TÌM KIẾM')} <i>({t('goods.searchEn', 'search')})</i>:</div>
              <input 
                type="text" 
                placeholder={t('goods.searchPlaceholder', 'Gõ vào để tìm kiếm...')} 
                className="flex-1 p-2 rounded"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {/* Listing section */}
          <div className="mt-2 p-2 border-2 border-black">
            <div className="font-bold">2. {t('goods.listOfStores', 'DANH SÁCH CÁC GIAN HÀNG')}</div>
            
            {/* Sample listings */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-4">
              {/* Generate 12 sample items */}
              {products.map((_, index) => (
                <div 
                  key={index} 
                  className="border border-gray-300 p-2 flex flex-col relative overflow-hidden cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => navigate(`/list-of-goods/${_.documentId}`)}
                >
                  {/* Background watermark image */}
                  <div className="absolute inset-0 opacity-15 z-0">
                    <img 
                      src={_.image ? _.image : 'https://img.lovepik.com/png/20231125/delivery-box-3d-illustration-icon-arrows-search_698016_wh860.png'}
                      alt="Watermark" 
                      className="w-full h-full object-cover"
                    />
                  </div>               
                  {/* Product details - with z-index to appear above the watermark */}
                  <div className="text-center font-medium relative z-10">{_.name}</div>
                  <div className="text-center text-sm relative z-10">{_.price}</div>
                  <div className="text-center text-sm text-gray-600 relative z-10">{_.address}</div>
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            <div className="flex justify-center mt-6">
              <div className="flex space-x-2">
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 ${
                        currentPage === index + 1 ? 'bg-gray-200' : ''
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
