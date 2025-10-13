import { useState, useEffect, useRef } from "react";
import { useTranslation } from 'react-i18next';
import useNotifications from "../custom-hooks/useNotifications";
import markAsRead from "../services/notificationService";

const HeaderComponent = ({ 
    color, 
    onColorChange, 
    onQrClick, 
    selectedLang, 
    onLanguageChange 
}) => {
    const { t, i18n } = useTranslation();
    const notifications = useNotifications(17);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const dropdownRef = useRef();

    const colors = [
        { name: "VN", value: "vi" },
        { name: "EN", value: "en" },
    ];

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsNotificationOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLanguageChange = (e) => {
        const newLang = e.target.value;
        onLanguageChange(newLang);
        i18n.changeLanguage(newLang);
        localStorage.setItem("selectedLang", newLang);
    };

    return (
        <div className="grid-col-1" style={{ height: "100%", minWidth: "60px" }}>
            {/* QR Button */}
            <div 
                style={{ width: "100%", height: "10%" }} 
                onClick={onQrClick} 
                className="cursor-pointer"
            >
                <p className="">
                    <strong>QR</strong>
                </p>
                {/* <p className="hidden sm:flex text-[clamp(10px,1vw,20px)]">
                    <strong>QR</strong>
                </p> */}
            </div>

            {/* Device Icon */}
            <button className="p-2 hover:bg-gray-100 rounded transition-colors hidden md:block">
                <i style={{ fontSize: "clamp(10px, 1vw, 20px)" }} className="fa-solid fa-computer"></i>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded transition-colors block md:hidden">
                <i style={{ fontSize: "clamp(10px, 1vw, 20px)" }} className="fa-solid fa-mobile-screen-button"></i>
            </button>

            {/* Color Picker */}
            <div >
                <div style={{ border: 0, width: '50%' }}>
                    <input
                        type="color"
                        value={color}
                        onChange={onColorChange}
                    />
                </div>
            </div>

            {/* Language Selector */}
            <div style={{ width: "100%", height: "10%" }}>
                <div style={{ border: 0, width: "100%", paddingRight: 10 }}>
                    <select
                        value={selectedLang}
                        onChange={handleLanguageChange}
                        style={{ 
                            width: "100%", 
                            padding: "5px", 
                            backgroundColor: color, 
                            border: 0, 
                            textAlign: 'center', 
                            fontSize: "clamp(10px, 1vw, 20px)" 
                        }}
                    >
                        {colors.map((colorOption) => (
                            <option key={colorOption.value} value={colorOption.value}>
                                {colorOption.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Notification Bell */}
            <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className=""
                style={{ width: "100%", height: "10%" }}
            >
                <i
                    style={{ fontSize: "clamp(10px, 1vw, 20px)" }}
                    className="fa-solid fa-bell"
                ></i>
                {notifications.filter(note => !note.read).length > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                        {notifications.filter(note => !note.read).length}
                    </span>
                )}
            </button>

            {/* Notification Dropdown */}
            {isNotificationOpen && (
                <div ref={dropdownRef} className="absolute left w-50 bg-white shadow-lg rounded-md z-50 border border-gray-200">
                    <h6 className="text-sm px-1 font-bold">{t('common.notifications')}</h6>
                    <div className="px-1">
                        <ul className="max-h-50 overflow-y-auto">
                            {notifications.length > 0 ? (
                                notifications.slice(0, 5).map((note, idx) => (
                                    <li
                                        onMouseEnter={() => !note.read && markAsRead(17, note.id)}
                                        key={idx}
                                        className="text-sm px-1 hover:bg-gray-100 cursor-pointer"
                                    >
                                        {!note.read ? (
                                            <b className="font-bold">{note.message} (new)</b>
                                        ) : (
                                            <>{note.message}</>
                                        )}
                                    </li>
                                ))
                            ) : (
                                <li className="text-sm px-1 text-gray-500">
                                    {t('common.no_notifications')}
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HeaderComponent;