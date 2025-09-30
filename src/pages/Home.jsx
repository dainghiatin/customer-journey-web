// import { HeroHeader, Body, ActionSection, SearchSection, DropdownAuth } from "../components/Body";
import Banner from "../assets/banner_place.png";
import Wheel from '@uiw/react-color-wheel';
import { hsvaToHex } from '@uiw/color-convert';
import { useState, Fragment, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { HeroHeader, Body, SearchSection, DropdownAuth } from "../components/Body";
import { getMetric } from "../services/metricService";
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import GlobalInfoComponent from '../components/GlobalInfoComponent';
import CountrySpecificComponent from '../components/CountrySpecificComponent';
import CompanyInfoTable from '../components/CompanyInfoTable';
import EventFilterComponent from "../components/EventFilterComponent";
import EventComponent from "../components/EventComponent";
import useNotifications from "../custom-hooks/useNotifications";
import markAsRead from "../services/notificationService";
import NotificationDropdown from "../components/NotificationDropdown";
import useMetric from "../custom-hooks/useMetric";
import AdBanner from "../components/AdBaner";
import { Link, useNavigate } from 'react-router-dom';



// Thêm import cho QR
import axios from "axios";
import { generateQrSession } from "../services/authService";
import _default from "react-select";
const CustomPointer = () => (
    <div style={{ inset: 0, display: "none", borderRadius: "100%", position: "absolute", background: "rgb(180, 80, 230)", width: 10, height: 10 }}></div>
);


const DataTable = () => {
    const { t } = useTranslation();

    const metric = useMetric();


    return (
        <div className="overflow-x-auto h-full w-full">
            <table className="border border-black text-sm text-left h-full w-full">
                <tbody style={{ fontSize: "clamp(6px, 0.75vw, 14px)" }}>
                    {/* Row 1 */}
                    <tr className="border border-black">
                        <td className="px-1   border border-black font-bold h-5">
                            <span>{t('metrics.listedValue', 'GIÁ TRỊ LÊN SÀN:')}:</span>
                        </td>
                        <td className="px-1 border border-black h-5"><strong>{metric.listedValue}</strong></td>
                        <td className="px-1 border border-black font-bold h-5">{t('metrics.transactions', 'LƯỢT GIAO DỊCH')}:</td>
                        <td className="px-1 border border-black h-5"><strong>{metric.transactions}</strong></td>
                        <td className="px-1 border border-black font-bold h-5">{t('metrics.accesses', 'LƯỢT TRUY CẬP')}:</td>
                        <td className="px-1 border border-black h-5"><strong>{metric.accesses}</strong></td>
                    </tr>

                    {/* Row 2 */}
                    <tr className="border border-black">
                        <td className="px-1 border border-black font-bold h-5">{t('metrics.successfully', 'THÀNH CÔNG')}:</td>
                        <td className="px-1 border border-black h-5"><strong>{metric.successfully}</strong></td>
                        <td className="px-1 border border-black font-bold h-5">{t('metrics.amount', 'SỐ TIỀN')}:</td>
                        <td className="px-1 border border-black h-5"><strong>{metric.amount}</strong></td>
                        <td className="px-1 border border-black font-bold h-5">{t('metrics.duration', 'THỜI LƯỢNG')}:</td>
                        <td className="px-1 border border-black h-5"><strong>{metric.duration}</strong></td>
                    </tr>

                    {/* Row 3 - Single Row */}
                    <tr className="border border-black">
                        <td className="px-1 border border-black font-bold text-center h-5" colSpan={2}>{t('metrics.bankUpdate', 'NGÂN HÀNG CẬP NHẬT')}:</td>
                        <td className="px-1 border border-black font-bold h-5">{t('metrics.deposited', 'ĐÃ GỬI')}:</td>
                        <td className="px-1 border border-black h-5"><strong>{metric.deposited}</strong></td>
                        <td className="px-1 border border-black font-bold h-5">{t('metrics.videoViews', 'LƯỢT XEM VIDEO')}:</td>
                        <td className="px-1 border border-black h-5"><strong>{metric.videoViews}</strong></td>
                    </tr>

                    {/* Row 4 */}
                    <tr className="border border-black">
                        <td className="px-1 border border-black font-bold h-5">{t('metrics.withTerm', 'CÓ KỲ HẠN')}</td>
                        <td className="px-1 border border-black h-5">{t('metrics.update', 'CẬP NHẬT')}</td>
                        <td className="px-1 border border-black font-bold h-5">{t('metrics.withdrawn', 'ĐÃ RÚT')}:</td>
                        <td className="px-1 border border-black h-5"><strong>{metric.withdrawn}</strong></td>
                        <td className="px-1 border border-black font-bold h-5">{t('metrics.members', 'THÀNH VIÊN')}:</td>
                        <td className="px-1 border border-black h-5"><strong>{metric.members}</strong></td>
                    </tr>

                    {/* Row 5 */}
                    <tr className="border border-black">
                        <td className="px-1 border border-black font-bold h-5">{t('metrics.withoutTerm', 'KHÔNG KỲ HẠN')}</td>
                        <td className="px-1 border border-black h-5">{t('metrics.update', 'CẬP NHẬT')}</td>
                        <td className="px-1 border border-black font-bold h-5">{t('metrics.remaining', 'CÒN LẠI')}:</td>
                        <td className="px-1 border border-black h-5"><strong>{metric.remaining}</strong></td>
                        <td className="px-1 border border-black font-bold h-5">{t('metrics.online', 'TRUY CẬP')}:</td>
                        <td className="px-1 border border-black h-5"><strong>{metric.online}</strong></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
function HomePage() {
    const { t, i18n } = useTranslation();
    const { user, isAuthenticated } = useSelector(state => state.auth);
    // const [color, setColor] = useState("#aabbcc");
    const [selectedLang, setSelectedLang] = useState(i18n.language || "vi");
    const [hsva, setHsva] = useState({ h: 214, s: 43, v: 90, a: 1 });
    const [color, setColor] = useState("#1242ae");

    // Check if user is logged in via token as well
    const [authToken, setAuthToken] = useState(null);
    // State cho QR modal
    const [isQrModalOpen, setIsQrModalOpen] = useState(false);
    const [isQrLoading, setIsQrLoading] = useState(false);
    const [qrError, setQrError] = useState("");
    const [qrDataUrl, setQrDataUrl] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        setAuthToken(token);
    }, []);

    const isUserLoggedIn = isAuthenticated || authToken;
    useEffect(() => {
        const savedColor = localStorage.getItem("selectedColor");
        if (savedColor) {
            setColor(savedColor);
        }
    }, []);

    const handleChangeColor = (e) => {
        const newColor = e.target.value;
        setColor(newColor);
        localStorage.setItem("selectedColor", newColor);
    };
    useEffect(() => {
        document.getElementById("root").style.backgroundColor = color;
    }, [color]);
    const colors = [
        { name: "VN", value: "vi" },
        { name: "EN", value: "en" },
    ];

    // Handler mở/đóng QR modal
    const handleOpenQrModal = async () => {
        try {
            setIsQrModalOpen(true);
            setIsQrLoading(true);
            setQrError("");
            setQrDataUrl(null);

            const deviceInfo = navigator.userAgent || 'unknown';
            let ipAddress = '';
            try {
                const ipRes = await axios.get('https://api.ipify.org?format=json');
                ipAddress = ipRes.data?.ip || '';
            } catch (ipErr) {
                // Không chặn flow nếu không lấy được IP
                ipAddress = '';
            }

            const response = await generateQrSession(deviceInfo, ipAddress);
            const qrCode = response.data?.qrCode;
            if (qrCode) {
                setQrDataUrl(qrCode);
            } else {
                setQrError(t('auth.qrError', 'Không lấy được mã QR, vui lòng thử lại'));
            }
        } catch (error) {
            setQrError(error.message || t('auth.qrError', 'Không lấy được mã QR, vui lòng thử lại'));
        } finally {
            setIsQrLoading(false);
        }
    };

    const handleCloseQrModal = () => {
        setIsQrModalOpen(false);
        setQrDataUrl(null);
        setQrError("");
        setIsQrLoading(false);
    };

    const userInStorege = JSON.parse(localStorage.getItem("user"));
    const notifications = useNotifications(17);

    useEffect(() => {
        console.log(notifications);
    }, [notifications]);


    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef();

    const navigate = useNavigate();



    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            <header className="grid-container">
                <div className="grid-col-1" style={{ height: "100%", minWidth: "60px" }}>
                    <div style={{ width: "100%", height: "10%" }} onClick={handleOpenQrModal} className="cursor-pointer">
                        <p className="flex sm:hidden text-[clamp(10px,1vw,20px)]">
                            <strong>QR</strong>
                        </p>

                        {/* Chỉ hiển thị trên màn hình lớn hơn sm (md trở lên) */}
                        <p className="hidden sm:flex text-[clamp(10px,1vw,20px)]">
                            <strong>QR</strong>
                        </p>
                    </div>
                    {/* Chỉ hiện trên màn hình lớn */}
                    <button className="hidden sm:block w-full h-[10%] sm:py-3 cursor-pointer">
                        <i style={{ fontSize: "clamp(10px, 1vw, 20px)" }} className="fa-solid fa-computer"></i>
                    </button>

                    {/* Chỉ hiện trên màn hình nhỏ */}
                    <button className="block sm:hidden w-full h-[10%] sm:py-3 cursor-pointer">
                        <i style={{ fontSize: "clamp(10px, 1vw, 20px)" }} className="fa-solid fa-mobile-screen-button"></i>
                    </button>

                    <div style={{ width: "100%", height: "10%", display: "flex", flexDirection: 'column' }}>
                        {/* <div style={{ height:"100%",  aspectRatio: "1/1" }}> */}
                        {/* <Fragment> */}
                        {/* <Wheel height={90} width={90} style={{border:"0px"}} pointer={CustomPointer} color={hsva} onChange={(color) => setHsva({ ...hsva, ...color.hsva })} /> */}
                        {/* <div style={{ width: '100%', height: 34, marginTop: 20, background: hsvaToHex(hsva) }}></div> */}
                        {/* </Fragment> */}
                        {/* </div> */}
                        <div style={{ border: 0, width: '50%' }}>
                            <input
                                type="color"
                                value={color} // Gán màu đã chọn
                                onChange={handleChangeColor} // Cập nhật khi chọn màu mới
                            />
                        </div>

                    </div>
                    <div style={{ width: "100%", height: "10%" }}>
                        <div style={{ border: 0, width: "100%", paddingRight: 10 }}>
                            <select
                                value={selectedLang}
                                onChange={(e) => {
                                    setSelectedLang(e.target.value);
                                    i18n.changeLanguage(e.target.value);
                                    localStorage.setItem("selectedLang", e.target.value);
                                }}
                                style={{ width: "100%", padding: "5px", backgroundColor: color, border: 0, textAlign: 'center', fontSize: "clamp(10px, 1vw, 20px)" }}
                            >
                                {colors.map((color) => (
                                    <option key={color.value} value={color.value}>
                                        {color.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="sm:py-3 cursor-pointer relative"
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
                    {isOpen && (
                        <div ref={dropdownRef} className="absolute left w-50 bg-white shadow-lg rounded-md z-50 border border-gray-200">
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
                                                    <>
                                                        {note.message}
                                                    </>
                                                )}
                                            </li>
                                        ))
                                    ) : (
                                        <li className="text-sm px-1 text-gray-500">{t('common.no_notifications')}</li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>

                <div className="!hidden md:!block grid-col-3" style={{ height: "100%" }}>
                    <div style={{ width: "100%", height: `clamp(120px, 25vw, 300px)`, border: '1px solid' }}>
                        {/* Conditional rendering: GlobalInfoComponent for non-logged users, CountrySpecificComponent logo for logged users */}
                        {isUserLoggedIn ? (
                            <CountrySpecificComponent userCountry={selectedLang} />
                        ) : (
                            <GlobalInfoComponent />
                        )}
                    </div>
                </div>
                <div className="!hidden md:!block grid-col-2" style={{ height: `clamp(120px, 25vw, 300px)`, border: '1px solid' }}>
                    {/* Conditional rendering: DataTable for non-logged users, CompanyInfoTable for logged users */}
                    {isUserLoggedIn ? (
                        <CompanyInfoTable userCountry={selectedLang} />
                    ) : (
                        <DataTable />
                    )}
                </div>

                {/* HeroHeader as fourth column when logged in */}
                {isUserLoggedIn && (
                    <div className="!hidden md:!block grid-col-4" style={{}}>
                        <HeroHeader selectedLang={selectedLang} isCompact={true} />
                        <EventFilterComponent />
                    </div>
                )}

                {/* Mobile layout - Show HeroHeader and EventFilterComponent in a separate row */}
                <div className="md:hidden w-full flex flex-col mt-2">
                    <HeroHeader selectedLang={selectedLang} isCompact={false} />
                    <EventFilterComponent />
                </div>
            </header>
            {/* <Body /> */}

            <div className="flex">
                <DropdownAuth />
                {!isUserLoggedIn && (
                    <div className="hidden md:block">
                        <HeroHeader isCompact={false} />
                        <EventFilterComponent />
                    </div>
                )}
            </div>
            <div className="">

            </div>


            {/* HeroHeader outside grid when not logged in */}



            <EventComponent />


            <div
                onClick={() => navigate("/reward-list")}
                style={{
                    display: "flex",
                    cursor: "pointer",
                    justifyContent: "center", alignItems: "center", height: 50, borderBottom: '1px solid', fontWeight: 'bold'
                }}>
                <p>{t('common.updateNotice', 'DANH SÁCH THƯỞNG')} </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: 50, fontSize: 10 }}>
                <div>{t('common.companyName', '© CÔNG TY TNHH ĐẠI NGHĨA TÍN')}</div>
                <div>{t('common.taxCode', 'MST: 3702678200')}</div>
            </div>
            <AdBanner />


            {/* Modal QR */}
            {isQrModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-50 p-4">
                    <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <button className="absolute topx-1 right-2 text-gray-600 hover:text-black" onClick={handleCloseQrModal}>✕</button>
                        <h3 className="text-xl font-bold mb-4 text-center">{t('auth.qrTitle', 'MÃ QR ĐĂNG NHẬP')}</h3>

                        {isQrLoading && (
                            <div className="flex items-center justify-center py-8">
                                <svg className="animate-spin h-6 w-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                </svg>
                                <span className="ml-3">{t('common.loading', 'Đang tải QR...')}</span>
                            </div>
                        )}

                        {!isQrLoading && qrError && (
                            <div className="text-center text-red-600 py-4">{qrError}</div>
                        )}

                        {!isQrLoading && qrDataUrl && (
                            <div className="flex flex-col items-center">
                                <img src={qrDataUrl} alt="QR Code" className="w-64 h-64 object-contain border" />
                            </div>
                        )}

                        {!isQrLoading && !qrDataUrl && !qrError && (
                            <div className="text-center text-gray-600 py-8">{t('auth.qrNoData', 'Chưa có dữ liệu QR')}</div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
export default HomePage