import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMetric } from '../services/metricService';

import { logoutAction } from '../context/action/authActions';

import Select from 'react-select';
import { getCountries, getCountryByCode, getDistrictByCode } from '../services/countries';
import { useTranslation } from 'react-i18next';
import {
  Settings as SettingsIcon,
} from "lucide-react";
import { SearchSection } from './Body';

const categories = [
    {
        vi: "HÀNG BÁN",
        en: "SALE",
    },
    {
        vi: "CẦN MUA",
        en: "BUY",
    },
    {
        vi: "CẦN THUÊ",
        en: "RENT",
    },
    {
        vi: "CHO THUÊ",
        en: "FOR RENT",
    },
    {
        vi: "DỊCH VỤ",
        en: "SERVICES",
    },
];

const subCategories = [
    {
        vi: "HÀNG HÓA",
        en: "GOODS",
    },
    {
        vi: "BẤT ĐỘNG SẢN",
        en: "LAND AND HOUSE",
    },
    {
        vi: "PHƯƠNG TIỆN",
        en: "VEHICLE",
    },
    {
        vi: "NHÂN LỰC",
        en: "MANPOWER",
    },
    {
        vi: "XUẤT - NHẬP KHẨU",
        en: "IMPORT - EXPORT",
    },
];

const conditions = [
    {
        vi: "PHẾ LIỆU",
        en: "SCRAP",
    },
    {
        vi: "MỚI",
        en: "NEW",
    },
    {
        vi: "CŨ",
        en: "OLD",
    },
    {
        vi: "CHƯA SỬ DỤNG",
        en: "UNUSED",
    },
];

const regions = [
    { vi: "TẤT CẢ", en: "ALL" },
    { vi: "ĐÔNG NAM BỘ", en: "SOUTH EAST", num: "I" },
    { vi: "ĐÔNG BẮC BỘ", en: "NORTH EAST", num: "II" },
    { vi: "TÂY NAM BỘ", en: "SOUTH WEST", num: "III" },
    { vi: "TÂY BẮC BỘ", en: "NORTH WEST", num: "IV" },
    { vi: "BẮC TRUNG BỘ", en: "NORTH CENTRAL", num: "V" },
    { vi: "NAM TRUNG BỘ", en: "SOUTH CENTRAL", num: "VI" },
    { vi: "TÂY NGUYÊN", en: "HIGHLANDS", num: "VII" },
    { vi: "NƯỚC KHÁC", en: "OTHER COUNTRIES", num: "VIII" },
];

// const SelectNation = ({ title, items }) => {
//     const options = [
//         { value: 'vietnam', label: 'Vietnam' },
//         { value: 'usa', label: 'USA' },
//         { value: 'japan', label: 'Japan' }
//     ];
//     const handleChange = (selectedOption) => {
//         console.log('Selected:', selectedOption);
//     };
//     useEffect(() => {

//     }, []);
//     return (
//         <div style={{ width: "50%", position: "relative" }}>
//             <Select options={options} onChange={handleChange} />
//         </div>
//     )
// }

const CategorySelect = ({
    title,
    items,
    onChange, // Generic onChange handler for any selection type
    value, // Current selected value (optional)
    fetchItems, // Optional function to fetch items dynamically
    dependsOn // Optional dependency for fetching items
}) => {
    const [itemList, setItemList] = useState(items || []);
    const [selected, setSelected] = useState(value?.vi || items?.[0]?.vi || "");
    const [selected_en, setSelectedEN] = useState(value?.en || items?.[0]?.en || "");
    const [open, setOpen] = useState(false);

    // Fetch items if a fetch function is provided
    useEffect(() => {
        const loadItems = async () => {
            if (fetchItems) {
                try {
                    const response = await fetchItems(dependsOn);
                    if (response) {
                        setItemList(response);
                    }
                } catch (error) {
                    console.error(`Error fetching items for ${title}:`, error);
                }
            }
        };

        loadItems();
    }, [title, fetchItems, dependsOn]);

    // Update selected values when value prop changes
    useEffect(() => {
        if (value) {
            setSelected(value.vi || "");
            setSelectedEN(value.en || "");
        }
    }, [value]);

    const handleSelection = (item) => {
        setSelected(item.vi);
        setSelectedEN(item.en);
        setOpen(false);

        // Call the generic onChange handler with the selected item and title
        if (onChange) {
            onChange(title, item);
        }
    };

    return (
        <div style={{ width: "80%", position: "relative" }}>
            {/* Selection box */}
            <div
                onClick={() => setOpen(!open)}
                className='items-center'
                style={{
                    width: "clamp(6rem, 21vw, 20rem)", padding: "5px", border: "2px solid black",
                    textAlign: "center", cursor: "pointer",
                    backgroundColor: "transparent",
                    display: "flex", justifyContent: "space-between",
                    fontWeight: "bold", fontSize: "clamp(10px, 1vw, 20px)"
                }}
            >
                <div className='flex grow items-center justify-center flex-col'>
                    <span>{selected} </span>
                    <span className='lowercase' style={{ fontWeight: 'normal', fontStyle: "italic" }}>({selected_en})</span>
                </div>
                <span style={{ fontSize: "16px", fontWeight: "bold", marginLeft: "10px" }}>
                    {open ? "▲" : "▼"}
                </span>
            </div>

            {/* Dropdown list */}
            {open && (
                <ul
                    style={{
                        position: "absolute", width: "clamp(6rem, 21vw, 20rem)", border: "2px solid black",
                        background: "white", listStyle: "none", padding: 0, margin: 0, zIndex: 1000,
                        maxHeight: "300px", overflowY: "auto",
                    }}
                >
                    {itemList.map((item, index) => (
                        <li
                            key={index}
                            style={{
                                padding: "5px", cursor: "pointer",
                                fontWeight: "bold", borderBottom: "1px solid gray",
                                display: "flex", justifyContent: "center",
                                flexDirection: "column", textAlign: "center"
                            }}
                            onClick={() => handleSelection(item)}
                        >
                            <span className="font-bold">{item.vi}</span>
                            <b className='lowercase'>({item.en})</b>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

function EventFilterComponent(){
    const [category, setCategory] = useState("");
    const [subcategory, setSubcategory] = useState("");
    const [condition, setCondition] = useState("");
    const [nation, setNation] = useState({
        vi: "Viet Nam",
        en: "Vietnam"
    });
    const [province, setProvince] = useState({
        vi: "An Giang",
        en: "An Giang"

    });
    const [district, setDistrict] = useState("");

    useEffect(() => {
        localStorage.setItem("category", category?.en);
        localStorage.setItem("subcategory", subcategory?.en);
        localStorage.setItem("condition", condition?.en);
        localStorage.setItem("nation", nation?.en);
        localStorage.setItem("province", province?.en);
        localStorage.setItem("district", district?.en);
    }, [category, subcategory, condition, nation, province, district]);
    const handleCategoryChange = (title, item) => {
        switch (title) {
            case "DANH MỤC":
                setCategory(item);
                break;
            case "Subcategories":
                setSubcategory(item);
                break;
            case "Conditions":
                setCondition(item);
                break;
            case "Nation":
                setNation(item);
                break;
            case "Province":
                setProvince(item);
                break;
            case "District":
                setDistrict(item);
                break;
            default:
                break;
        }
    };
    return (
        <section className="action-section filter-section" style={{}}>
            <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'flex-end', 
                gap: 4, 
                marginBottom: 20,
                marginRight: 20
            }}>
                {/* First row: 4 buttons aligned to the right */}
                <div className="filter-buttons-row">
                    <CategorySelect
                        title="DANH MỤC"
                        items={categories}
                        onChange={handleCategoryChange}
                        value={category}
                    />
                    <CategorySelect
                        title="Subcategories"
                        items={subCategories}
                        onChange={handleCategoryChange}
                        value={subcategory}
                    />
                    <CategorySelect
                        title="Conditions"
                        items={conditions}
                        onChange={handleCategoryChange}
                        value={condition}
                    />
                    <CategorySelect
                        title="Nation"
                        items={[]}
                        onChange={handleCategoryChange}
                        value={nation}
                        fetchItems={getCountries}
                    />
                </div>
                
                {/* Second row: Province button aligned to the right */}
                <div className="filter-buttons-row">
                    <CategorySelect
                        title="Province"
                        items={[]}
                        onChange={handleCategoryChange}
                        value={province}
                        fetchItems={getCountryByCode}
                        dependsOn={nation?.en}
                    />
                </div>
                
                {/* <CategorySelect
                    title="District"
                    items={[]}
                    onChange={handleCategoryChange}
                    value={district}
                    fetchItems={getDistrictByCode}
                    dependsOn={province?.en}
                /> */}
            </div>
            <SearchSection />
        </section>
    )
};

export default EventFilterComponent;
