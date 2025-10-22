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
        <>
            <div className="flex flex-col items-center" style={{ width: "fit-content", justifyContent: "start", borderRadius: "1px" }}>
                {/* QR Button */}
                <div className="flex flex-col border border-[#1242ae] rounded-[1px] overflow-hidden">
                    {/* QR Button */}
                    <div
                        onClick={onQrClick}
                        className="cursor-pointer border-r border-[#1242ae] flex items-center justify-center border-b"
                    >
                        <p className="px-2 font-bold">QR</p>
                    </div>

                    {/* Computer / Mobile Icon */}
                    <div className="cursor-pointer border-r border-[#1242ae] flex items-center justify-center border-b">
                        <p className="px-2 hidden md:block">
                            APP
                        </p>
                        <p className="px-2 block md:hidden">
                            <i className="fa-solid fa-mobile-screen-button"></i>
                        </p>
                    </div>

                    {/* Color Picker */}
                    <div
                        className="cursor-pointer border-r border-[#1242ae] flex items-center justify-center border-b"
                        onClick={() => document.getElementById("colorPicker").click()}
                    >
                        <div
                            style={{
                                width: "clamp(20px, 4vw, 40px)",
                                height: "clamp(15px, 1.6vw, 40px)",
                            }}
                            className="cursor-pointer"
                        ></div>

                        <input
                            id="colorPicker"
                            hidden
                            type="color"
                            value={color}
                            onChange={onColorChange}
                            className="cursor-pointer"
                        />
                    </div>

                    {/* Language Select */}
                    <div className="cursor-pointer border-r border-[#1242ae] flex items-center justify-center border-b py-2">
                        <select
                            className="cursor-pointer bg-transparent outline-none"
                            value={selectedLang}
                            onChange={handleLanguageChange}
                            style={{
                                fontSize: "clamp(10px, 1vw, 20px)",
                            }}
                        >
                            {colors.map((colorOption) => (
                                <option key={colorOption.value} value={colorOption.value}>
                                    {colorOption.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Bell Icon */}
                    <div
                        style={{ width: "clamp(20px, 2vw, 40px)" }}
                        className="cursor-pointer flex items-center justify-center py-2"
                    >
                        <i
                            style={{ fontSize: "clamp(10px, 1vw, 20px)" }}
                            className="fa-solid fa-bell"
                        ></i>
                    </div>
                </div>



            </div>

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

        </>



    );
};

export default HeaderComponent;