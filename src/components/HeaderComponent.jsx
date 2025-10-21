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
            <div className="flex flex-col items-center" style={{ width: "fit-content", justifyContent: "start", border: "1px solid #1242ae", borderRadius: "1px" }}>
                {/* QR Button */}
                <div
                    style={{ borderBottom: "1px solid #1242ae", borderRadius: "1px",borderTop: "1px solid #1242ae" }}
                    onClick={onQrClick}
                    className="cursor-pointer"

                >
                    <p className="px-2">
                        <strong>QR</strong>
                    </p>
                    {/* <p className="hidden sm:flex text-[clamp(10px,1vw,20px)]">
                    <strong>QR</strong>
                </p> */}
                </div>
                <div
                    style={{ borderBottom: "1px solid #1242ae" }}
                    className="cursor-pointer"
                >
                    <p className="px-2 hidden md:block">
                        <i className="fa-solid fa-computer"></i>
                    </p>
                    <p className="px-2 block md:hidden">
                        <i className="fa-solid fa-mobile-screen-button"></i>
                    </p>
                </div>

                <div
                    className="cursor-pointer"
                    onClick={() => document.getElementById("colorPicker").click()}
                >
                    {/* This div can show current color or an icon */}
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


                <div
                    style={{ borderBottom: "1px solid #1242ae", borderTop: "1px solid #1242ae" }}
                    className="cursor-pointer"
                >
                    <select
                        className="cursor-pointer"
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

                <div
                    style={{ width: "clamp(20px, 2vw, 40px)", textAlign: "center" }}
                    className="cursor-pointer"
                >
                    <i
                            style={{ fontSize: "clamp(10px, 1vw, 20px)" }}
                            className="fa-solid fa-bell"
                        ></i>
                    {/* <button
                        onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                        className="cursor-pointer"
                        style={{}}
                    >
                        
                        
                    </button> */}
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