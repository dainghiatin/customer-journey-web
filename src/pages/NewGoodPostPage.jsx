import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../styles/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Home as HomeIcon, KeyboardIcon as KeyboardIcon } from "lucide-react";
import { createProduct } from "../services/productService";
import ProductGrid from "../components/ProductGrid";
import PostTypeMenu from "../components/PostTypeMenu";
import PageHeaderWithOutColorPicker from "../components/PageHeaderWithOutColorPicker.jsx";
import {
  getCountries,
  getCountryByCode,
  getDistrictByCode,
} from "../services/countries";
import {
  categories,
  subCategories,
  conditions,
} from "../constants/filterConstants";

export default function NewGoodPostPage() {
  const { t, i18n } = useTranslation();
  const [color, setColor] = useState(localStorage.getItem("selectedColor"));
  const [user, setUser] = useState(null);
  const [selectedType, setSelectedType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
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
      autoAcceptPrice: "",
    },
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
    qualityFiles: [
      "https://example.com/doc1.pdf",
      "https://example.com/doc2.pdf",
    ],
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
    province: "",
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
    // Prefill first three selects from EventFilter localStorage
    setSelectedType(localStorage.getItem("category") || "");
    setSelectedCategory(localStorage.getItem("subcategory") || "");
    setSelectedCondition(localStorage.getItem("condition") || "");
    // preload country/province options and preselect from localStorage
    let isMounted = true;
    (async () => {
      try {
        const list = await getCountries();
        if (!isMounted) return;
        setCountries(list);
        const savedCountry =
          localStorage.getItem("nation") ||
          localStorage.getItem("selectedCountryName") ||
          "";
        const savedProvince =
          localStorage.getItem("province") ||
          localStorage.getItem("selectedProvinceName") ||
          "";
        const savedDistrict = localStorage.getItem("district") || "";
        if (savedCountry) {
          setSelectedCountry(savedCountry);
          try {
            const states = await getCountryByCode(savedCountry);
            if (!isMounted) return;
            setProvinces(states);
            if (savedProvince) {
              setSelectedProvince(savedProvince);
              try {
                const ds = await getDistrictByCode(savedProvince);
                if (!isMounted) return;
                setDistricts(ds);
                if (savedDistrict) {
                  setSelectedDistrict(savedDistrict);
                }
              } catch {}
            }
          } catch {}
        }
      } catch {}
    })();
    return () => {
      isMounted = false;
    };
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
        autoAcceptPrice: "",
      },
    ]);
  };

  const handleGoodsItemChange = (id, field, value) => {
    setGoodsItems(
      goodsItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setGoodsInfo({
      ...goodsInfo,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedData = {
      ...goodsInfo,
      // Convert string values to numbers where needed, default to 0 instead of null
      price: goodsInfo.price ? parseFloat(goodsInfo.price) : 0,
      askingPrice: goodsInfo.askingPrice
        ? parseFloat(goodsInfo.askingPrice)
        : 0,
      estimatedValue: goodsInfo.estimatedValue
        ? parseFloat(goodsInfo.estimatedValue)
        : 0,
      autoAcceptPrice: goodsInfo.autoAcceptPrice
        ? parseFloat(goodsInfo.autoAcceptPrice)
        : 0,
      marketPrice: goodsInfo.marketPrice
        ? parseFloat(goodsInfo.marketPrice)
        : 0,
      lowestUnitAskingPrice: goodsInfo.lowestUnitAskingPrice
        ? parseFloat(goodsInfo.lowestUnitAskingPrice)
        : 0,
      highestUnitAskingPrice: goodsInfo.highestUnitAskingPrice
        ? parseFloat(goodsInfo.highestUnitAskingPrice)
        : 0,
      deliveryDays: goodsInfo.deliveryDays
        ? parseInt(goodsInfo.deliveryDays)
        : 0,
      lowestAmount: goodsInfo.lowestAmount
        ? parseInt(goodsInfo.lowestAmount)
        : 0,
      highestAmount: goodsInfo.highestAmount
        ? parseInt(goodsInfo.highestAmount)
        : 0,
      lowestAutoAcceptPrice: goodsInfo.lowestAutoAcceptPrice
        ? parseFloat(goodsInfo.lowestAutoAcceptPrice)
        : 0,
      highestAutoAcceptPrice: goodsInfo.highestAutoAcceptPrice
        ? parseFloat(goodsInfo.highestAutoAcceptPrice)
        : 0,
      contractDuration: goodsInfo.contractDuration
        ? parseInt(goodsInfo.contractDuration)
        : 0,
      eventFeePercentage: goodsInfo.eventFeePercentage
        ? parseFloat(goodsInfo.eventFeePercentage)
        : 0,
      livestreamFee: goodsInfo.livestreamFee
        ? parseFloat(goodsInfo.livestreamFee)
        : 0,
      advertisingAmount: goodsInfo.advertisingAmount
        ? parseFloat(goodsInfo.advertisingAmount)
        : 0,
      successFee: goodsInfo.successFee ? parseFloat(goodsInfo.successFee) : 0,
      totalFees: goodsInfo.totalFees ? parseFloat(goodsInfo.totalFees) : 0,
      image: "https://example.com/image.jpg",
      qualityFiles: [
        "https://example.com/doc1.pdf",
        "https://example.com/doc2.pdf",
      ],
      advertisingUrl: "https://example.com/advertising",
    };
    // Handle form submission logic here
    createProduct("token", formattedData)
      .then((res) => {
        console.log(res.data);
        alert("Create success " + goodsInfo.name);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-transparent backdrop-blur-md p-6 rounded-lg shadow-lg w-full max-w-6xl mx-auto">
        <PageHeaderWithOutColorPicker
          color={color}
          onColorChange={handleChangeColor}
          titlePrefix="4"
          leftButton={
            <button
              className="text-red-600 hover:text-red-800 relative"
              onClick={() => navigate("/")}
            >
              <HomeIcon size={28} />
            </button>
          }
          rightButton={
            <button
              className="text-red-600 hover:text-red-800"
              onClick={() => navigate("/admin-control")}
            >
              <KeyboardIcon size={28} />
            </button>
          }
          title={t("goods.newPost")}
        />

        {/* Main Form */}
        <div className="mt-6">
          <form onSubmit={handleSubmit} className="border border-gray-300">
            {/* Top Categories Section */}
            <PostTypeMenu activeType="goods" />

            {/* TÀI KHOẢN HÀNG HÓA Section */}
            <div className="grid grid-cols-5 border-b border-gray-300">
              <div className="border-r border-gray-300 p-2">
                <div className="font-bold text-center">
                  {t("goods.accountOfGoods")}
                </div>
              </div>
              <div className="border-r border-gray-300 p-2 text-center">
                <input
                  type="number"
                  min="1"
                  step="1"
                  name="exchangeRate"
                  className="w-full border border-gray-300 p-1 mt-1 text-right"
                  defaultValue="1"
                  onKeyDown={(e) => {
                    // Prevent negative sign, decimal point, and non-numeric characters
                    if (
                      e.key === "-" ||
                      e.key === "." ||
                      e.key === "e" ||
                      e.key === "E" ||
                      e.key === "+"
                    ) {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => {
                    // Ensure only positive integers
                    const value = e.target.value;
                    if (
                      value &&
                      (parseFloat(value) <= 0 ||
                        !Number.isInteger(parseFloat(value)))
                    ) {
                      e.target.value = "1";
                    } else {
                      const calculatedValue = parseFloat(e.target.value) || 1;
                      document.getElementById("calculatedValue").value =
                        calculatedValue;
                    }
                  }}
                />
                <div className="font-bold">1</div>
              </div>
              <div className="border-r border-gray-300 p-2 text-center">
                <div className="font-bold  p-1 mt-1">{t("goods.vn")}</div>
                <div className="mt-1 flex items-center justify-center">
                  <span className="mr-2">D|</span>
                </div>
              </div>
              <div className="border-r border-gray-300 p-2 text-center">
                <input
                  type="number"
                  min="1"
                  step="1"
                  name="exchangeRate"
                  className="w-full border border-gray-300 p-1 mt-1 text-right"
                  defaultValue="1"
                  onKeyDown={(e) => {
                    // Prevent negative sign, decimal point, and non-numeric characters
                    if (
                      e.key === "-" ||
                      e.key === "." ||
                      e.key === "e" ||
                      e.key === "E" ||
                      e.key === "+"
                    ) {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => {
                    // Ensure only positive integers
                    const value = e.target.value;
                    if (
                      value &&
                      (parseFloat(value) <= 0 ||
                        !Number.isInteger(parseFloat(value)))
                    ) {
                      e.target.value = "1";
                    } else {
                      const calculatedValue = parseFloat(e.target.value) || 1;
                      document.getElementById("calculatedValue").value =
                        calculatedValue;
                    }
                  }}
                />
                <div className="font-bold">1</div>
              </div>
              <div className="p-2 text-center">
                <div className="font-bold">{t("goods.transferToWallet")}</div>
                <button
                  type="button"
                  className="mt-1 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                >
                  {t("goods.transfer")}
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
                        <select
                          className="w-full border border-gray-300 p-1"
                          value={selectedType}
                          onChange={(e) => setSelectedType(e.target.value)}
                        >
                          <option value="">
                            {t("goods.selectCategory")}
                          </option>
                          {categories.slice(1).map((c, idx) => {
                            const isVi = (i18n.language || 'vi').toLowerCase().startsWith('vi');
                            // Map en values to translation keys
                            const categoryKeyMap = {
                              'SALE': 'sale',
                              'BUY': 'buy',
                              'RENT': 'rent',
                              'FOR RENT': 'for_rent',
                              'SERVICES': 'service'
                            };
                            const key = categoryKeyMap[c.en] || c.en.toLowerCase();
                            return (
                              <option key={`cat-${idx}`} value={c.en}>
                                {t(`goods.category.${key}`) || (isVi ? c.vi : c.en)}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="border-r border-gray-300 p-2">
                      <div className="text-center">
                        <select
                          className="w-full border border-gray-300 p-1"
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                          <option value="">
                            {t("goods.selectSubcategoryPlaceholder")}
                          </option>
                          {subCategories.slice(1).map((sc, idx) => {
                            const isVi = (i18n.language || 'vi').toLowerCase().startsWith('vi');
                            // Map en values to translation keys
                            const subcategoryKeyMap = {
                              'GOODS': 'goods',
                              'LAND AND HOUSE': 'landhouse',
                              'VEHICLE': 'vehicle',
                              'MANPOWER': 'manpower',
                              'IMPORT - EXPORT': 'import_export'
                            };
                            const key = subcategoryKeyMap[sc.en] || sc.en.toLowerCase().replace(/\s+/g, '_').replace(/-/g, '_');
                            return (
                              <option key={`sub-${idx}`} value={sc.en}>
                                {t(`goods.subcategory.${key}`) || (isVi ? sc.vi : sc.en)}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="border-r border-gray-300 p-2">
                      <div className="text-center">
                        <select
                          className="w-full border border-gray-300 p-1"
                          value={selectedCondition}
                          onChange={(e) => setSelectedCondition(e.target.value)}
                        >
                          <option value="">
                            {t("goods.selectConditionPlaceholder")}
                          </option>
                          {conditions.slice(1).map((cd, idx) => {
                            const isVi = (i18n.language || 'vi').toLowerCase().startsWith('vi');
                            // Map en values to translation keys
                            const conditionKeyMap = {
                              'SCRAP': 'scrap',
                              'NEW': 'new',
                              'OLD': 'old',
                              'UNUSED': 'unused'
                            };
                            const key = conditionKeyMap[cd.en] || cd.en.toLowerCase();
                            return (
                              <option key={`cond-${idx}`} value={cd.en}>
                                {t(`goods.condition.${key}`) || (isVi ? cd.vi : cd.en)}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="p-2">
                      <div className="text-center">
                        <select
                          className="w-full border border-gray-300 p-1 mb-2"
                          value={selectedCountry}
                          onChange={async (e) => {
                            const name = e.target.value;
                            setSelectedCountry(name);
                            localStorage.setItem("nation", name || "");
                            if (!name) {
                              localStorage.removeItem("province");
                              localStorage.removeItem("district");
                            }
                            if (name) {
                              try {
                                const states = await getCountryByCode(name);
                                setProvinces(states);
                                setSelectedProvince("");
                                setDistricts([]);
                                setSelectedDistrict("");
                              } catch {
                                setProvinces([]);
                                setDistricts([]);
                              }
                            } else {
                              setProvinces([]);
                              setDistricts([]);
                            }
                          }}
                        >
                          {(countries || []).map((c, idx) => (
                            <option
                              key={`${c.en || c.vi || "all"}-${idx}`}
                              value={c.en || c.vi}
                            >
                              {c.vi || c.en}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="text-center">
                        <select
                          className="w-full border border-gray-300 p-1 mb-2"
                          value={selectedProvince}
                          onChange={async (e) => {
                            const val = e.target.value;
                            setSelectedProvince(val);
                            localStorage.setItem("province", val || "");
                            // sync goodsInfo province
                            setGoodsInfo((prev) => ({
                              ...prev,
                              province: val,
                            }));
                            // load districts for selected province
                            if (val) {
                              try {
                                const ds = await getDistrictByCode(val);
                                setDistricts(ds);
                                setSelectedDistrict("");
                                localStorage.removeItem("district");
                              } catch {
                                setDistricts([]);
                              }
                            } else {
                              setDistricts([]);
                              setSelectedDistrict("");
                              localStorage.removeItem("district");
                            }
                          }}
                          disabled={!selectedCountry}
                        >
                          {(provinces || []).map((p, idx) => (
                            <option
                              key={`${p.en || p.vi || "all"}-${idx}`}
                              value={p.en || p.vi}
                            >
                              {p.vi || p.en}
                            </option>
                          ))}
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
              <div className="grid grid-cols-17 border-b border-gray-300">
                <div className="col-span-1 border-r border-gray-300 p-2 text-center flex items-center justify-center">
                  <span className="font-bold">3</span>
                </div>
                <div className="col-span-3 border-r border-gray-300 p-2 flex items-center">
                  <div>{t("goods.priceReviewTime")}</div>
                </div>
                <div className="col-span-6 border-r border-gray-300 p-2">
                  <input
                    type="time"
                    name="priceReviewTime"
                    value={goodsInfo.priceReviewTime}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-1"
                    placeholder={t("goods.enter")}
                  />
                </div>
                <div className="col-span-7 text-center flex items-center justify-center">
                  <div className="text-red-500">*</div>
                </div>
              </div>

              {/* Row 4 */}
              <div className="grid grid-cols-17 border-b border-gray-300">
                <div className="col-span-1 border-r border-gray-300 p-2 text-center flex items-center justify-center">
                  <span className="font-bold">4</span>
                </div>
                <div className="col-span-3 border-r border-gray-300 p-2 flex items-center">
                  <div>{t("goods.endPostTime")}</div>
                </div>
                <div className="col-span-4 border-r border-gray-300 p-2">
                  <input
                    type="date"
                    name="endPostDate"
                    value={goodsInfo.endPostDate}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-1"
                    placeholder={t("goods.enter")}
                  />
                </div>
                <div className="col-span-4 border-r border-gray-300 p-2">
                  <input
                    type="time"
                    name="endPostTime"
                    value={goodsInfo.endPostTime}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-1"
                    placeholder={t("goods.enter")}
                  />
                </div>
                <div className="col-span-5 text-center flex items-center justify-center">
                  <div className="text-red-500">*</div>
                </div>
              </div>

              {/* Row 5 */}
              <div className="grid grid-cols-17 border-b border-gray-300">
                <div className="col-span-1 border-r border-gray-300 p-2 text-center flex items-center justify-center">
                  <span className="font-bold">5</span>
                </div>
                <div className="col-span-3 border-r border-gray-300 p-2 flex items-center">
                  <div>{t("goods.goodsAddress")}</div>
                </div>
                <div className="col-span-8 border-r border-gray-300 p-2">
                  <select
                    className="w-full border border-gray-300 p-1"
                    value={selectedProvince}
                    onChange={async (e) => {
                      const val = e.target.value;
                      setSelectedProvince(val);
                      localStorage.setItem("province", val || "");
                      setGoodsInfo((prev) => ({ ...prev, province: val }));
                      if (val) {
                        try {
                          const ds = await getDistrictByCode(val);
                          setDistricts(ds);
                          setSelectedDistrict("");
                          localStorage.removeItem("district");
                        } catch {
                          setDistricts([]);
                        }
                      } else {
                        setDistricts([]);
                        setSelectedDistrict("");
                        localStorage.removeItem("district");
                      }
                    }}
                    required
                    disabled={!selectedCountry}
                  >
                    {(provinces || []).map((p, idx) => (
                      <option
                        key={`${p.en || p.vi || "all"}-${idx}`}
                        value={p.en || p.vi}
                      >
                        {p.vi || p.en}
                      </option>
                    ))}
                  </select>
                  <select
                    className="w-full border border-gray-300 p-1 mt-1"
                    value={selectedDistrict}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSelectedDistrict(val);
                      localStorage.setItem("district", val || "");
                      // store into address field for now
                      setGoodsInfo((prev) => ({ ...prev, address: val }));
                    }}
                    required
                    disabled={!selectedProvince}
                  >
                    {(districts || []).map((d, idx) => (
                      <option
                        key={`${d.en || d.vi || "all"}-${idx}`}
                        value={d.en || d.vi}
                      >
                        {d.vi || d.en}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-5 text-center flex items-center justify-center">
                  <div>
                    <div>{t("goods.map")}</div>
                    <div className="text-red-500">*</div>
                  </div>
                </div>
              </div>

              {/* Row 6 */}
              <div className="grid grid-cols-17 border-b border-gray-300">
                <div className="col-span-1 border-r border-gray-300 p-2 text-center flex items-center justify-center">
                  <span className="font-bold">6</span>
                </div>
                <div className="col-span-3 border-r border-gray-300 p-2 flex items-center">
                  <input
                    type="checkbox"
                    name="confirmOwnership"
                    value={goodsInfo.confirmOwnership}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                </div>
                <div className="col-span-10 border-r border-gray-300 p-2 flex items-center">
                  <div>{t("goods.confirmOwnership")}</div>
                </div>
                <div className="col-span-3 text-center flex items-center justify-center">
                  <div className="text-red-500">*</div>
                </div>
              </div>

              {/* Row 7 */}
              <div className="grid grid-cols-17 border-b border-gray-300">
                <div className="col-span-1 border-r border-gray-300 p-2 text-center flex items-center justify-center">
                  <span className="font-bold">7</span>
                </div>
                {/* Right side with sub-rows */}
                <div className="col-span-16">
                    {/* NẠP TIỀN QUẢNG CÁO */}
                    <div className="grid grid-cols-16 border-b border-gray-300">
                      <div className="col-span-3 border-r border-gray-300 p-2 flex items-center">
                        <div>{t("goods.eventFee")}</div>
                      </div>
                      <div className="col-span-4 border-r border-gray-300 p-2 flex items-center">
                        <input
                          type="number"
                          min="0"
                          step="1"
                          name="eventPercentFee"
                          value={goodsInfo.eventPercentFee || ""}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 p-1 mr-1 text-right"
                          placeholder={t("goods.enter")}
                          onKeyDown={(e) => {
                            // Prevent negative sign, decimal point, and non-numeric characters
                            if (
                              e.key === "-" ||
                              e.key === "." ||
                              e.key === "e" ||
                              e.key === "E" ||
                              e.key === "+"
                            ) {
                              e.preventDefault();
                            }
                          }}
                        />
                        <span className="text-gray-700">%</span>
                      </div>
                      <div className="col-span-1 p-2 text-center">
                        <div>+</div>
                      </div>
                      <div className="col-span-5 border-l border-gray-300 p-2 flex items-center">
                        <input
                          type="number"
                          min="0"
                          step="1"
                          name="eventFee"
                          value={goodsInfo.eventFee || ""}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 p-1 mr-1 text-right"
                          placeholder={t("goods.enter")}
                          onKeyDown={(e) => {
                            // Prevent negative sign, decimal point, and non-numeric characters
                            if (
                              e.key === "-" ||
                              e.key === "." ||
                              e.key === "e" ||
                              e.key === "E" ||
                              e.key === "+"
                            ) {
                              e.preventDefault();
                            }
                          }}
                        />
                        <span className="text-gray-700">{t("goods.vnd")}</span>
                      </div>
                      <div className="col-span-3 border-l border-gray-300 p-2 text-center">
                        <span>{t("goods.prepay")}</span>
                      </div>
                    </div>

                    {/* TRÊN TRANG CHỦ */}
                    <div className="grid grid-cols-16 border-b border-gray-300">
                      <div className="col-span-3 border-r border-gray-300 p-2 flex items-center">
                        <div>{t("goods.livestreamFee")}</div>
                      </div>
                      <div className="col-span-4 border-r border-gray-300 p-2 flex items-center">
                        <input
                          type="number"
                          min="0"
                          step="1"
                          name="livestreamPercentFee"
                          value={goodsInfo.livestreamPercentFee || ""}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 p-1 mr-1 text-right"
                          placeholder={t("goods.enter")}
                          onKeyDown={(e) => {
                            // Prevent negative sign, decimal point, and non-numeric characters
                            if (
                              e.key === "-" ||
                              e.key === "." ||
                              e.key === "e" ||
                              e.key === "E" ||
                              e.key === "+"
                            ) {
                              e.preventDefault();
                            }
                          }}
                        />
                        <span className="text-gray-700">%</span>
                      </div>
                      <div className="col-span-1 p-2 text-center">
                        <div>+</div>
                      </div>
                      <div className="col-span-5 border-l border-gray-300 p-2 flex items-center">
                        <input
                          type="number"
                          min="0"
                          step="1"
                          name="livestreamFee"
                          value={goodsInfo.livestreamFee || ""}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 p-1 mr-1 text-right"
                          placeholder={t("goods.enter")}
                          onKeyDown={(e) => {
                            // Prevent negative sign, decimal point, and non-numeric characters
                            if (
                              e.key === "-" ||
                              e.key === "." ||
                              e.key === "e" ||
                              e.key === "E" ||
                              e.key === "+"
                            ) {
                              e.preventDefault();
                            }
                          }}
                        />
                        <span className="text-gray-700">{t("goods.vnd")}</span>
                      </div>
                      <div className="col-span-3 border-l border-gray-300 p-2 text-center">
                        <span>{t("goods.prepay")}</span>
                      </div>
                    </div>

                    {/* TRÊN VIDEO */}
                    <div className="grid grid-cols-16 border-b border-gray-300">
                      <div className="col-span-3 border-r border-gray-300 p-2 flex items-center">
                        <div>{t("goods.successFee")}</div>
                      </div>
                      <div className="col-span-9 border-r border-gray-300 p-2 flex items-center">
                        <input
                          type="number"
                          min="0"
                          step="1"
                          name="videoAd"
                          value={goodsInfo.videoAd || ""}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 p-1 text-right"
                          placeholder={t("goods.enter")}
                          onKeyDown={(e) => {
                            // Prevent negative sign, decimal point, and non-numeric characters
                            if (
                              e.key === "-" ||
                              e.key === "." ||
                              e.key === "e" ||
                              e.key === "E" ||
                              e.key === "+"
                            ) {
                              e.preventDefault();
                            }
                          }}
                        />
                      </div>
                      <div className="col-span-4 p-2 text-center">
                        <span className="text-gray-700">%</span>
                        <div className="text-red-500">*</div>
                      </div>
                    </div>

                    {/* NỘI DUNG QUẢNG CÁO */}
                    <div className="grid grid-cols-16 border-b border-gray-300">
                      <div className="col-span-3 border-r border-gray-300 p-2 flex items-center">
                        <div>{t("goods.vatOtherFees")}</div>
                      </div>
                      <div className="col-span-8 border-r border-gray-300 p-2">
                        <div className="text-right">0</div>
                      </div>
                      <div className="col-span-5 p-2 text-center">
                        <div className="">%</div>
                      </div>
                    </div>

                    {/* ĐĂNG KÝ LÀM NỘI DUNG QUẢNG CÁO */}
                    <div className="grid grid-cols-16">
                      <div className="col-span-3 border-r border-gray-300 p-2 flex items-center">
                        <div>{t("goods.totalFeeVat")}</div>
                      </div>
                      <div className="col-span-4 border-r border-gray-300 p-2 flex items-center justify-end">
                        0<span className="text-gray-700">%</span>
                      </div>
                      <div className="col-span-1 p-2 text-center">
                        <div>+</div>
                      </div>
                      <div className="col-span-5 border-l border-gray-300 p-2 flex items-center">
                        <div className="w-full p-1 mr-1 text-right">
                          0
                        </div>
                        <span className="text-gray-700">{t("goods.vnd")}</span>
                      </div>
                      <div className="col-span-3 border-l border-gray-300 p-2 text-center">
                        <span>{t("goods.prepay")}</span>
                      </div>
                    </div>
                </div>
              </div>

              {/* Row 8 */}
              <div className="grid grid-cols-17 border-b border-gray-300">
                <div className="col-span-1 border-r border-gray-300 p-2 text-center flex items-center justify-center">
                  <span className="font-bold">8</span>
                </div>
                <div className="col-span-3 border-r border-gray-300 p-2 flex items-center">
                  <div className="font-semibold">{t("goods.advertisingFee")}</div>
                </div>

                {/* Right side with sub-rows */}
                <div className="col-span-13">
                    {/* NẠP TIỀN QUẢNG CÁO */}
                    <div className="grid grid-cols-17 border-b border-gray-300">
                      <div className="col-span-3 border-r border-gray-300 p-2">
                        <div>{t("goods.amountForAdvertising")}</div>
                      </div>
                      <div className="col-span-9 border-r border-gray-300 p-2">
                        <input
                          type="number"
                          min="0"
                          step="1"
                          name="advertisingAmount"
                          value={goodsInfo.advertisingAmount || ""}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 p-1 text-right"
                          placeholder={t("goods.enter")}
                          onKeyDown={(e) => {
                            // Prevent negative sign, decimal point, and non-numeric characters
                            if (
                              e.key === "-" ||
                              e.key === "." ||
                              e.key === "e" ||
                              e.key === "E" ||
                              e.key === "+"
                            ) {
                              e.preventDefault();
                            }
                          }}
                        />
                      </div>
                      <div className="col-span-5 p-2 text-center">
                        <div>{t("goods.vnd")}</div>
                      </div>
                    </div>

                    {/* TRÊN TRANG CHỦ */}
                    <div className="grid grid-cols-17 border-b border-gray-300">
                      <div className="col-span-3 border-r border-gray-300 p-2">
                        <div>{t(
                          "goods.onMainPage"
                        )}</div>
                      </div>
                      <div className="col-span-9 border-r border-gray-300 p-2">
                        <input
                          type="number"
                          min="0"
                          step="1"
                          name="mainPageAd"
                          value={goodsInfo.mainPageAd || ""}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 p-1 text-right"
                          placeholder={t("goods.enter")}
                          onKeyDown={(e) => {
                            // Prevent negative sign, decimal point, and non-numeric characters
                            if (
                              e.key === "-" ||
                              e.key === "." ||
                              e.key === "e" ||
                              e.key === "E" ||
                              e.key === "+"
                            ) {
                              e.preventDefault();
                            }
                          }}
                        />
                      </div>
                      <div className="col-span-5 p-2 text-center">
                        <div>{t("goods.vndPerSecondView")}</div>
                      </div>
                    </div>

                    {/* TRÊN VIDEO */}
                    <div className="grid grid-cols-17 border-b border-gray-300">
                      <div className="col-span-3 border-r border-gray-300 p-2">
                        <div>{t("goods.onVideo")}</div>
                      </div>
                      <div className="col-span-9 border-r border-gray-300 p-2">
                        <input
                          type="number"
                          min="0"
                          step="1"
                          name="videoAd"
                          value={goodsInfo.videoAd || ""}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 p-1 text-right"
                          placeholder={t("goods.enter")}
                          onKeyDown={(e) => {
                            // Prevent negative sign, decimal point, and non-numeric characters
                            if (
                              e.key === "-" ||
                              e.key === "." ||
                              e.key === "e" ||
                              e.key === "E" ||
                              e.key === "+"
                            ) {
                              e.preventDefault();
                            }
                          }}
                        />
                      </div>
                      <div className="col-span-5 p-2 text-center">
                        <div>{t("goods.vndPerSecondView")}</div>
                      </div>
                    </div>

                    {/* NỘI DUNG QUẢNG CÁO */}
                    <div className="grid grid-cols-17 border-b border-gray-300">
                      <div className="col-span-3 border-r border-gray-300 p-2">
                        <div>{t("goods.advertisingContent")}</div>
                      </div>
                      <div className="col-span-9 border-r border-gray-300 p-2">
                        <input
                          type="file"
                          className="w-full border border-gray-300 p-1"
                        />
                      </div>
                      <div className="col-span-5 p-2 text-center"></div>
                    </div>

                    {/* ĐĂNG KÝ LÀM NỘI DUNG QUẢNG CÁO */}
                    <div className="grid grid-cols-17">
                      <div className="col-span-3 border-r border-gray-300 p-2">
                        <div>{t("goods.registerAdvertising")}</div>
                      </div>
                      <div className="col-span-9 border-r border-gray-300 p-2">
                        <input
                          type="checkbox"
                          name="registerAdvertising"
                          checked={goodsInfo.registerAdvertising || false}
                          onChange={handleInputChange}
                          className="w-4 h-4"
                        />
                      </div>
                      <div className="col-span-5 p-2 text-center">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                          {t("goods.serviceContract")}
                        </button>
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
                    <div className="mb-2">{t("goods.termsAgreement")}</div>
                  </div>
                </div>
              </div>

              {/* Send Request Button */}
              <div className="text-center p-4 border-t border-gray-300">
                <button
                  type="submit"
                  className="bg-gray-300 hover:bg-gray-100 text-black font-bold py-2 px-6 border border-gray-200"
                >
                  {t("goods.sendRequirement")}
                  <div className="text-xs">{t("goods.sendRequirementEn")}</div>
                </button>
              </div>
            </form>
          </div>
        </div>
      
    </div>
  );
}
