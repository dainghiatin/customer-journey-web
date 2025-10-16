import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const CategorySelect = ({
    title,
    items,
    onChange, // Generic onChange handler for any selection type
    value, // Current selected value (optional)
    fetchItems, // Optional function to fetch items dynamically
    dependsOn, // Optional dependency for fetching items
    placeholder = "Chọn...",
    placeholderKey,
    isDisabled = false
}) => {
    const { t, i18n } = useTranslation();
    const [itemList, setItemList] = useState(items || []);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch items if a fetch function is provided
    useEffect(() => {
        const loadItems = async () => {
            if (fetchItems) {
                setIsLoading(true);
                try {
                    const response = await fetchItems(dependsOn);
                    if (response) {
                        setItemList(response);
                    }
                } catch (error) {
                    console.error(`Error fetching items for ${title}:`, error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        loadItems();
    }, [title, fetchItems, dependsOn]);

    // Determine selected index based on provided value
    const selectedIndex = value
        ? itemList.findIndex(
            (item) => item?.vi === value?.vi && item?.en === value?.en
        )
        : -1;

    const handleChange = (e) => {
        const idx = parseInt(e.target.value, 10);
        if (!Number.isNaN(idx) && itemList[idx] && onChange) {
            onChange(title, itemList[idx]);
        }
    };

    const getLabel = (item) => {
        const lang = (i18n?.language || 'vi').toLowerCase();
        const isVi = lang.startsWith('vi');
        return isVi ? item?.vi : item?.en;
    };

    const getLoadingText = () => t('common.loading', 'Đang tải...');

    const getPlaceholderText = () => {
        if (placeholder && typeof placeholder === 'object') {
            return getLabel(placeholder);
        }
        if (placeholderKey) {
            return t(placeholderKey, placeholder || '');
        }
        return placeholder || '';
    };

    return (
        <div style={{ position: 'relative', flex: 1 }}>
            <select
                value={selectedIndex >= 0 ? String(selectedIndex) : ''}
                onChange={handleChange}
                disabled={isDisabled || isLoading}
                style={{
                    width: '100%',
                    border: '2px solid black',
                    borderRadius: 0,
                    minHeight: 'clamp(3vh, 6vw, 12vh)',
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                    padding: '8px',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: 'clamp(10px, 1vw, 20px)'
                }}
            >
                <option value="" disabled>
                    {isLoading ? getLoadingText() : getPlaceholderText()}
                </option>
                {itemList.map((item, idx) => (
                    <option key={idx} value={idx}>
                        {getLabel(item)}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CategorySelect;