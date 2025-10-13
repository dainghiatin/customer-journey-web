import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMetric } from '../services/metricService';
import { CHANGE_USER_COUNTRY } from '../context/action/filterAction';
import { getCountries, getCountryByCode, getDistrictByCode } from '../services/countries';
import { useTranslation } from 'react-i18next';
import {
    KeyboardIcon as KeyboardIcon,
} from "lucide-react";
import { SearchSection } from './Body';
import CategorySelect from './CategorySelect';
import { categories, subCategories, conditions, regions } from '../constants/filterConstants';

function EventFilterComponent() {
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
    const dispatch = useDispatch();

    useEffect(() => {
        localStorage.setItem("category", category?.en);
        localStorage.setItem("subcategory", subcategory?.en);
        localStorage.setItem("condition", condition?.en);
        localStorage.setItem("nation", nation?.en);
        localStorage.setItem("province", province?.en);
        localStorage.setItem("district", district?.en);
        dispatch({ type: CHANGE_USER_COUNTRY, payload: nation?.en });
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
        <>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                width: "100%",
                marginTop: "8%",
                alignItems: "flex-start",
                gap: "10px"
            }}>
                <CategorySelect
                    title="DANH MỤC"
                    items={categories}
                    onChange={handleCategoryChange}
                    value={category}
                    placeholder="Chọn danh mục"
                />
                <CategorySelect
                    title="Subcategories"
                    items={subCategories}
                    onChange={handleCategoryChange}
                    value={subcategory}
                    placeholder="Chọn phân loại"
                />
                <CategorySelect
                    title="Conditions"
                    items={conditions}
                    onChange={handleCategoryChange}
                    value={condition}
                    placeholder="Chọn tình trạng"
                />
                <div className="">
                    <CategorySelect
                        title="Nation"
                        items={[]}
                        onChange={handleCategoryChange}
                        value={nation}
                        fetchItems={getCountries}
                        placeholder="Chọn quốc gia"
                    />

                    <CategorySelect
                        title="Province"
                        items={[]}
                        onChange={handleCategoryChange}
                        value={province}
                        fetchItems={getCountryByCode}
                        dependsOn={nation?.en}
                        placeholder="Chọn tỉnh/thành"
                    />
                </div>
            </div>
            <SearchSection />
        </>
    )
};

export default EventFilterComponent;
