import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const CategorySelect = ({
    title,
    items,
    onChange, // Generic onChange handler for any selection type
    value, // Current selected value (optional)
    fetchItems, // Optional function to fetch items dynamically
    dependsOn, // Optional dependency for fetching items
    placeholder = "Chọn...",
    isDisabled = false
}) => {
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

    // Convert items to react-select format
    const options = itemList.map((item, index) => ({
        value: item,
        label: item.vi,
        sublabel: item.en
    }));

    // Find current selected option
    const selectedOption = value ? options.find(option => 
        option.value.vi === value.vi && option.value.en === value.en
    ) : null;

    const handleSelection = (selectedOption) => {
        if (selectedOption && onChange) {
            onChange(title, selectedOption.value);
        }
    };

    // Custom option component to show both Vietnamese and English
    const CustomOption = ({ innerRef, innerProps, data }) => (
        <div
            ref={innerRef}
            {...innerProps}
            style={{
                padding: '8px 12px',
                cursor: 'pointer',
                borderBottom: '1px solid #e5e5e5',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >
            <span style={{ fontWeight: 'bold' }}>{data.label}</span>
            <span style={{ fontSize: '0.85em', fontStyle: 'italic', textTransform: 'lowercase' }}>
                ({data.sublabel})
            </span>
        </div>
    );

    // Custom single value component
    const CustomSingleValue = ({ data }) => (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold' }}>{data.label}</span>
        </div>
    );

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            border: '2px solid black',
            borderRadius: 0,
            minHeight: '48px',
            width: 'clamp(5rem, 21vw, 20rem)',
            backgroundColor: 'transparent',
            boxShadow: 'none',
            '&:hover': {
                border: '2px solid black'
            }
        }),
        valueContainer: (provided) => ({
            ...provided,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2px 8px'
        }),
        singleValue: (provided) => ({
            ...provided,
            margin: 0,
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 'clamp(10px, 1vw, 20px)'
        }),
        indicatorSeparator: () => ({
            display: 'none'
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            color: 'black',
            fontSize: '16px',
            fontWeight: 'bold',
            padding: '8px'
        }),
        menu: (provided) => ({
            ...provided,
            border: '2px solid black',
            borderRadius: 0,
            boxShadow: 'none',
            zIndex: 1000
        }),
        menuList: (provided) => ({
            ...provided,
            padding: 0,
            maxHeight: '300px'
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#f0f0f0' : 'white',
            color: 'black',
            '&:hover': {
                backgroundColor: '#f5f5f5'
            },
            padding: 0
        }),
        placeholder: (provided) => ({
            ...provided,
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 'clamp(10px, 1vw, 20px)'
        })
    };

    return (
        <div style={{ position: 'relative' }}>
            <Select
                options={options}
                value={selectedOption}
                onChange={handleSelection}
                placeholder={placeholder}
                isLoading={isLoading}
                isDisabled={isDisabled}
                components={{
                    Option: CustomOption,
                    SingleValue: CustomSingleValue
                }}
                styles={customStyles}
                menuPortalTarget={document.body}
                menuPosition="fixed"
            />
        </div>
    );
};

export default CategorySelect;