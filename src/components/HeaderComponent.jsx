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
            <div
                className="flex flex-col text-sm text-center"
                style={{ fontSize: "clamp(6px, 0.75vw, 14px)" }}
            >
                <div
                    onClick={onQrClick}
                    className="cursor-pointer flex border-b border-r border-black justify-center items-center"
                >
                    <div className="table-cell flex items-center font-bold py-1 px-1">
                        QR
                    </div>
                </div>

                <div
                    className="cursor-pointer flex border-b border-black border-r justify-center items-center   "
                >
                    <div className="table-cell flex items-center font-bold py-1 px-1 hidden md:block text-center">
                        APP
                    </div>
                    <div className="table-cell flex items-center font-bold py-1 px-1 block md:hidden">
                        <i className="fa-solid fa-mobile-screen-button"></i>
                    </div>
                </div>

                <div
                    onClick={() => document.getElementById("colorPicker").click()}
                    style={{ width: "100%", height: "6vh" }}
                    className="cursor-pointer flex border-b border-black border-r justify-center items-center"
                >
                    <div className="table-cell flex items-center font-bold py-1 px-1 ">
                        <div
                            style={{
                                
                                height: "100%",
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
                </div>


                <div
                    className="cursor-pointer flex border-b border-black border-r justify-center items-center"
                >
                    <select
                        className="table-cell flex items-center font-bold px-1 py-1 text-center"
                        value={selectedLang}
                        onChange={handleLanguageChange}
                    >
                        {colors.map((colorOption) => (
                            <option key={colorOption.value} value={colorOption.value}>
                                {colorOption.name}
                            </option>
                        ))}

                        
                    </select>
                </div>

                <div
                    className="cursor-pointer flex border-b border-black border-r justify-center items-center"  
                >
                    <div className="table-cell flex items-center font-bold py-1 px-1 text-center">
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