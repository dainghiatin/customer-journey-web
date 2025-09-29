import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMetric } from '../services/metricService';
import EventFilterComponent from './EventFilterComponent';

import { logoutAction } from '../context/action/authActions';

import Select from 'react-select';
import { getCountries, getCountryByCode, getDistrictByCode } from '../services/countries';
import { useTranslation } from 'react-i18next';
import {
    KeyboardIcon,
} from "lucide-react";

function HeroHeader({ selectedLang, isCompact = false }) {
    const { t } = useTranslation();

    // Adjust font sizes based on compact mode
    const titleFontSize = isCompact ? '20px' : '3vw';
    const subtitleFontSize = isCompact ? '1.5vw' : '2vw';
    const marginBottom = isCompact ? '2vw' : '-2vw';
    const marginTop = isCompact ? '1vw' : '0vw';

    return (
        <>
        <div style={{ position: "relative", marginBottom: "5px" }}>
            <div className="hero-title flex" style={{
                marginTop: "0px",
                fontWeight: "bold",

            }}>
                <h3 style={{ color: "black", fontSize: titleFontSize, }}>{t('hero.mainTitle', 'CÔNG BẰNG LỚN - UY TÍN LỚN')}</h3>
                <h4 className='' style={{ color: "black", fontSize: subtitleFontSize }}><em>({t('hero.mainTitleEn', 'Great fairness - Great reputation')})</em></h4>
            </div>
            <div className="hero-subtitle" style={{ border: 0, marginTop: marginTop, alignSelf: "center", fontWeight: "bold" }}>
                <h3 style={{ color: "black", fontSize: titleFontSize, }}>{t('hero.subtitle', 'MỤC TIÊU: CÔNG CỤ THƯƠNG MẠI CỦA MỖI QUỐC GIA')}</h3>
                <h4 className='' style={{ color: "black", fontSize: subtitleFontSize }}>
                    <em>
                        ({t('hero.subtitleEn', 'Target: National V-Commercial')})
                    </em>

                </h4>
            </div>
            <aside className="main-aside-2" >
                <Link to={'ai-live'} className="main-aside-2-1 border w-[18vw] sm:w-[12vw] right-[1vw] sm:right-[2vw]" style={{ right: '77%', position: "absolute", top: '20%', fontSize: "clamp(10px, 1.5vw, 30px)" }}>
                    <div className="flex items-center justify-center" style={{ color: "black", textAlign: "center", height: "clamp(18px,3vw, 45px)" }}>
                        <p><strong>{t('navigation.aiLive', 'Ai LIVE')}</strong></p>
                    </div>
                </Link>
                <Link to={'new-post'} className="main-aside-2-1 border w-[18vw] sm:w-[12vw] right-[1vw] sm:right-[2vw] flex items-center justify-center" style={{ left: '77%', position: "absolute", top: '20%', textAlign: "center" }}>
                    <div className="flex items-center justify-center" style={{ color: "black", textAlign: "center", height: "clamp(18px,3vw, 45px)", fontSize: "clamp(7px, 1.2vw, 20px)" }}>
                        <p><strong>{t('navigation.newPost', 'ĐĂNG BÀI MỚI')}</strong></p>
                    </div>
                </Link>
                <Link to={'freelancer'} className="border-1 main-aside-2-2 border w-[18vw] sm:w-[12vw] right-[1vw] sm:right-[2vw] flex items-center justify-center" style={{ right: '66%', position: "absolute", bottom: '-3vw' }}>
                    <div className="flex items-center justify-center" style={{ color: "black", textAlign: "center", fontSize: "clamp(7px, 1.2vw, 20px)", height: "clamp(20px,4vw, 60px)" }}>
                        <p><strong>{t('navigation.freelancer', 'CÔNG VIỆC TỰ DO')}</strong></p>
                        {/* <p><strong>VIỆC LÀM TỰ DO</strong></p> */}
                    </div>
                </Link>
                <Link to={'payment'} className="main-aside-2-2 border w-[18vw] sm:w-[12vw] right-[1vw] sm:right-[2vw] flex items-center justify-center" style={{ position: "absolute", bottom: "-3vw", left: '66%' }}>
                    <div className="flex items-center justify-center" style={{ color: "black", fontSize: "clamp(6px, 1vw, 20px)", textAlign: "center", height: "clamp(20px,4vw, 60px)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <p className=""><strong>{t('navigation.paymentTransaction', 'GIAO DỊCH THANH TOÁN')}</strong></p>
                    </div>
                </Link>
            </aside>
            
        </div>
        
        </>
    )
}






const DropdownAuth = () => {
    const [isShow, setIsShow] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    const DEFAULT_AVT = 'https://th.bing.com/th/id/OIP.aqzvZTh44zgk38UdpdE1KQHaHa?rs=1&pid=ImgDetMain';
    // const [password, setPassword] = useState(null);
    useEffect(() => {
        const storedUser = localStorage.getItem('authToken');
        if (storedUser) {
            setUser(storedUser);
        }
    }
        , []);

    return (
        <div style={{ display: "flex", flexDirection: "column", width: 'fit-content' }}>

            {!user ? <button
                onClick={() => { navigate('login') }}
                style={{ fontSize: "clamp(10px, 1vw, 20px)", fontWeight: 'bold', background: 'none', cursor: 'pointer', border: '1px solid black', padding: "1vw" }}
            >
                ĐĂNG NHẬP
            </button> :
                <div

                    className='flex flex-col items-center justify-center'
                    style={{ fontSize: "clamp(10px, 1vw, 20px)", fontWeight: 'bold', background: 'none', cursor: 'pointer', border: '1px solid black', padding: "1vw", justifyContent: "center", alignItems: "center", display: "flex" }}
                >
                    {/* Avartar */}
                    {/* <div className='lowercase' style={{ fontSize: "clamp(10px, 1vw, 20px)", fontStyle: 'italic' }}>(LOGIN)</div> */}
                    <button onClick={() => { navigate('login') }}>
                        <img src={auth.user?.avt?.url || DEFAULT_AVT} alt="Avatar" style={{ borderRadius: '50%', height: "clamp(20px, 3vw, 50px)", aspectRatio: 1, }} />
                    </button>

                </div>}
            {user ? <div className="flex items-center justify-center gap-2 h-[55px]"
                style={{ fontSize: "clamp(10px, 1vw, 20px)", fontWeight: 'bold', background: 'none', cursor: 'pointer', border: '1px solid black', padding: "1vw" }}
                onClick={() => navigate("/admin-control")}
            >
                <button
                    className="text-red-600 hover:text-red-800"

                >
                    <KeyboardIcon className="hover:text-red-800" style={{ cursor: "pointer" }} size={24} />
                </button>
            </div> : ""}
            {!user ? <button
                onClick={() => { navigate('register') }}
                style={{ fontSize: "clamp(10px, 1vw, 20px)", fontWeight: 'bold', background: 'none', cursor: 'pointer', border: '1px solid black', padding: "1vw" }}
            >
                ĐĂNG KÝ

            </button> : <button
                onClick={() => {
                    localStorage.removeItem('authToken'); // Xóa token khỏi localStorage
                    localStorage.removeItem('user'); // Xóa user data khỏi localStorage
                    setUser(null); // Đặt lại trạng thái người dùng
                    dispatch(logoutAction());
                    window.location.reload();
                }}
                style={{ fontSize: "clamp(10px, 1vw, 20px)", fontWeight: 'bold', background: 'none', cursor: 'pointer', border: '1px solid black', padding: "1vw" }}
            >
                THOÁT
            </button>}

        </div>
    );
};

const Body = () => {
    return (
        <>
            <main className="main-grid-container" style={{ marginBottom: 50 }}>
                {/* <aside className="main-aside-1"> */}
                {/* <div>
                        <div>
                            <p><strong>DANG KY</strong><em>(REGISTER)</em></p> <p><strong>ID</strong></p>
                        </div>
                        <div>
                            <p><strong>DANG NHAP</strong><em>(LOGIN)</em></p> <p><strong>THOAT</strong><em>(LOGOUT)</em></p>
                        </div> 
                    </div>
                    <div>
                        <div>
                            <p><strong>DANG BAI MOI</strong><em>(NEW POST)</em></p> 
                        </div>
                        <div>
                            <p><strong>CHAT</strong></p><p><strong>19002139</strong></p> 
                        </div> 
                    </div> */}
                {/* </aside> */}

                <section className="main-section-2"
                // style={{
                //     maxWidth: 800
                // }}
                >
                    <div className="main-section-info-1" >
                        <div style={{ width: "100%" }}>
                            <p style={{ textAlign: "center" }}><strong>TỔNG GIÁ TRỊ TÀI SẢN ĐÃ LÊN SÀN:</strong></p>
                            <p className='text-sm'><em>(TOTAL LISTED ASSETS VALUE)</em></p>
                        </div>
                        <div  >
                            <p >123456789</p><p><strong>(asdasdasda)</strong></p>
                        </div>
                    </div>
                    <div className="main-section-info-1">
                        <div style={{ width: "100%" }}>
                            <p style={{ textAlign: "center" }}><strong>TỔNG GIÁ TRỊ TÀI SẢN ĐÃ GIAO DỊCH THÀNH CÔNG:</strong></p>
                            <p className='text-sm'><em>(TOTAL SUCCESSFULLY TRANSED VALUE)</em></p>
                        </div>
                        <div>
                            <p style={{ textAlign: "center" }}>123456789</p><p><strong>(LỆNH)</strong></p>
                        </div>
                    </div>
                    <div className="main-section-info-1">
                        <div style={{ width: "100%", padding: "14px" }}>
                            <p style={{ textAlign: "center" }}><strong>NGÂN HÀNG TỰ ĐỘNG CẬP NHẬT SỐ DƯ</strong></p>
                        </div>
                    </div>
                    <div className="main-section-info-1">
                        <div style={{ minWidth: "30%" }}>
                            <p style={{ textAlign: "center" }}><strong>GỬI CÓ KỲ HẠN</strong></p>
                        </div>
                        <div>
                            <p style={{ textAlign: "center" }}><strong>(HIỆN SỐ, FILE NGÂN HÀNG CẬP NHẬT, HOẶC SÀN TRA CỨU GỬI LÊN)</strong></p>
                        </div>
                    </div>
                    <div className="main-section-info-1">
                        <div style={{ minWidth: "30%" }}>
                            <p style={{ textAlign: "center" }}><strong>GỬI KHÔNG KỲ HẠN</strong></p>
                        </div>
                        <div >
                            <p style={{ textAlign: "center" }}><strong>(HIỆN SỐ, FILE NGÂN HÀNG CẬP NHẬT, HOẶC SÀN TRA CỨU GỬI LÊN)</strong></p>
                        </div>
                    </div>
                </section>
                {/* <section className="main-section-2"
                    style={{ maxWidth: 400 }}>
                    <div className="main-section-info-1" >
                        <div style={{width: "100%"}}>
                            <p style={{textAlign:"center"}}><strong>TỔNG GIÁ TRỊ TÀI SẢN ĐÃ LÊN SÀN:</strong></p> 
                            <p><em>(TOTAL LISTED ASSETS VALUE)</em></p>
                        </div>
                        <div  >
                            <p >123456789</p><p><strong>(LỆNH)</strong></p>
                        </div> 
                    </div>
                    <div className="main-section-info-1">
                        <div style={{width: "100%"}}>
                            <p style={{textAlign:"center"}}><strong>TỔNG GIÁ TRỊ TÀI SẢN ĐÃ GIAO DỊCH THÀNH CÔNG:</strong></p>
                            <p><em>(TOTAL SUCCESSFULLY TRANSED VALUE)</em></p>
                        </div>
                        <div>
                            <p style={{textAlign:"center"}}>123456789</p><p><strong>(LỆNH)</strong></p> 
                        </div> 
                    </div>
                    <div className="main-section-info-1">
                        <div style={{ width: "100%" }}>
                            <p style={{ textAlign: "center" }}><strong>NGÂN HÀNG TỰ ĐỘNG CẬP NHẬT SỐ DƯ</strong></p>

                        </div>
                    </div>
                    <div className="main-section-info-1">
                        <div style={{ minWidth: "30%" }}>
                            <p style={{ textAlign: "center" }}><strong>GỬI CÓ KỲ HẠN</strong></p>
                        </div>
                        <div>
                            <p style={{ textAlign: "center" }}><strong>(HIỆN SỐ, FILE NGÂN HÀNG CẬP NHẬT, HOẶC SÀN TRA CỨU GỬI LÊN)</strong></p>
                        </div>
                    </div>
                    <div className="main-section-info-1">
                        <div style={{ minWidth: "30%" }}>
                            <p style={{ textAlign: "center" }}><strong>GỬI KHÔNG KỲ HẠN</strong></p>
                        </div>
                        <div >
                            <p style={{ textAlign: "center" }}><strong>(HIỆN SỐ, FILE NGÂN HÀNG CẬP NHẬT, HOẶC SÀN TRA CỨU GỬI LÊN)</strong></p>
                        </div>
                    </div>
                </section> */}
                <section className="main-section-2"
                // style={{ maxWidth: 800 }}
                >
                    <div className="main-section-info-2" style={{ height: "32%" }} >
                        <div style={{ width: "70%" }}>
                            <p style={{ textAlign: "center" }}><strong>TỔNG SỐ LẦN ĐÃ GIAO DỊCH:</strong></p>
                            <p className='text-sm' style={{ textAlign: "center" }}><em>(TOTAL NUMBER OF TIMES FOR TRANSACTION)</em></p>
                        </div>
                        <div style={{ width: "30%" }}>
                            <p><strong>(LỆNH)</strong></p>
                        </div>
                    </div>
                    <div className="main-section-info-2" style={{ height: "32%" }}>
                        <div style={{ width: "70%" }}>
                            <p style={{ textAlign: "center" }}><strong>TỔNG SỐ TIỀN ĐÃ GIAO DỊCH:</strong></p>
                            <p className='text-sm' style={{ textAlign: "center" }}><em>(TOTAL AMOUNT FOR TRANSACTION)</em></p>
                        </div>
                        <div style={{ width: "30%" }}>
                            <p><strong>(LỆNH)</strong></p>
                        </div>
                    </div>
                    <div className="main-section-info-2" style={{ height: "32%" }} >
                        <div style={{ width: "70%" }}>
                            <p style={{ textAlign: "center" }}><strong>TỔNG SỐ TIỀN ĐÃ GỬI:</strong></p>
                            <p className='text-sm' style={{ textAlign: "center" }}><em>(TOTAL AMOUNT FOR DEPOSIT)</em></p>
                        </div>
                        <div style={{ width: "30%" }}>
                            <p><strong>(LỆNH)</strong></p>
                        </div>
                    </div>
                    <div className="main-section-info-2" style={{ height: "20%" }} >
                        <div style={{ width: "70%" }}>
                            <p style={{ textAlign: "center" }}><strong>TỔNG SỐ TIỀN ĐÃ RÚT:</strong></p>
                            <p className='text-sm' style={{ textAlign: "center" }}><em>(TOTAL AMOUNT FOR WITHDRAW)</em></p>
                        </div>
                        <div style={{ width: "30%" }}>
                            <p><strong>(LỆNH)</strong></p>
                        </div>
                    </div>
                    <div className="main-section-info-2" style={{ height: "20%" }} >
                        <div style={{ width: "70%" }}>
                            <p style={{ textAlign: "center" }}><strong>TỔNG SỐ TIỀN TRÊN HỆ THỐNG:</strong></p>
                            <p className='text-sm' style={{ textAlign: "center" }}><em>(TOTAL AMOUNT FOR REMAIN)</em></p>
                        </div>
                        <div style={{ width: "30%" }}>
                            <p><strong>(LỆNH)</strong></p>
                        </div>
                    </div>
                </section>
                {/* <section className="main-section-2"
                    style={{ maxWidth: 400 }}
                >
                    <div className="main-section-info-2" style={{ height: "20%" }} >
                        <div style={{ width: "40%" }}>
                            <p style={{ textAlign: "center" }}><strong>TỔNG SỐ LẦN ĐÃ GIAO DỊCH:</strong></p><p style={{ textAlign: "center" }}><em>(TOTAL NUMBER OF TIMES FOR TRANSACTION)</em></p>
                        </div>
                        <div style={{ width: "60%" }}>
                            <p><strong>(LỆNH)</strong></p>
                        </div>
                    </div>
                    <div className="main-section-info-2" style={{ height: "20%" }}>
                        <div style={{ width: "40%" }}>
                            <p style={{ textAlign: "center" }}><strong>TỔNG SỐ TIỀN ĐÃ GIAO DỊCH:</strong></p><p style={{ textAlign: "center" }}><em>(TOTAL AMOUNT FOR TRANSACTION)</em></p>
                        </div>
                        <div style={{ width: "60%" }}>
                            <p><strong>(LỆNH)</strong></p>
                        </div>
                    </div>
                    <div className="main-section-info-2" style={{ height: "20%" }} >
                        <div style={{ width: "40%" }}>
                            <p style={{ textAlign: "center" }}><strong>TỔNG SỐ TIỀN ĐÃ GỬI:</strong></p><p style={{ textAlign: "center" }}><em>(TOTAL AMOUNT FOR DEPOSIT)</em></p>
                        </div>
                        <div style={{ width: "60%" }}>
                            <p><strong>(LỆNH)</strong></p>
                        </div>
                    </div>
                    <div className="main-section-info-2" style={{ height: "48%" }} >
                        <div style={{ width: "40%" }}>
                            <p style={{ textAlign: "center" }}><strong>TỔNG SỐ TIỀN ĐÃ RÚT:</strong></p><p style={{ textAlign: "center" }}><em>(TOTAL AMOUNT FOR WITHDRAW)</em></p>
                        </div>
                        <div style={{ width: "60%" }}>
                            <p><strong>(LỆNH)</strong></p>
                        </div>
                    </div>
                    <div className="main-section-info-2" style={{ height: "48%" }} >
                        <div style={{ width: "40%" }}>
                            <p style={{ textAlign: "center" }}><strong>TỔNG SỐ TIỀN TRÊN HỆ THỐNG:</strong></p><p style={{ textAlign: "center" }}><em>(TOTAL AMOUNT FOR REMAIN)</em></p>
                        </div>
                        <div style={{ width: "60%" }}>
                            <p><strong>(LỆNH)</strong></p>
                        </div>
                    </div>
                </section> */}

            </main>

        </>
    )
}

function SearchSection() {
    return (
        <section className="search-section">
            <div className="search-title " style={{ cursor: "pointer" }}>
                <button onClick={() => {
                    window.location.href = "/list-of-goods";
                }}>
                    <h3><strong>TÌM KIẾM</strong></h3>
                </button>
            </div>
            {/* <div>
                <p>SAP XEP BO CUC CHO PHU HOP VOI MAN HINH HIEN THI MAY TINH + DIEN THOI</p>
            </div> */}
        </section>
    )
}

export { HeroHeader, Body, SearchSection, DropdownAuth }