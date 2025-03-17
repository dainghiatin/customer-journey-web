// import { HeroHeader, Body, ActionSection, SearchSection, DropdownAuth } from "../components/Body";
import Banner from "../assets/banner_place.png";
import Wheel from '@uiw/react-color-wheel';
import { hsvaToHex } from '@uiw/color-convert';
import { useState, Fragment, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  HeroHeader, Body, ActionSection, SearchSection,DropdownAuth } from "../components/Body";
const CustomPointer = () => (
    <div style={{ inset: 0, display: "none", borderRadius: "100%", position: "absolute", background: "rgb(180, 80, 230)", width: 10, height: 10 }}></div>
);

function HomePage() {
    // const [color, setColor] = useState("#aabbcc");
    const [selectedLang, setSelectedLang] = useState("vi");
    const [hsva, setHsva] = useState({ h: 214, s: 43, v: 90, a: 1 });
    const [color, setColor] = useState("#1242ae");
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
    return (
        <>
            <header className="grid-container">
                <div className="grid-col-1" style={{ height: "100%", minWidth:"60px" }}>
                    <div style={{ width: "100%", height: "10%" }}>
                        <p style={{ fontSize: "clamp(10px, 1vw, 20px)" }}><strong>APP</strong></p>
                    </div>
                    <div style={{ width: "100%", height: "10%" }}>
                        {/* <p><strong>MÁY TÍNH</strong></p><p><em>(COMPUTER)</em></p> */}
                        <i style={{ fontSize: "clamp(10px, 1vw, 20px)" }} className="fa-solid fa-computer"></i>
                    </div>
                    <div style={{ width: "100%", height: "10%" }}>
                        {/* <p><strong>DIỆN THOẠI</strong></p><p><em>(PHONE)</em></p> */}
                        <i style={{ fontSize: "clamp(10px, 1vw, 20px)" }} className="fa-solid fa-mobile-screen-button"></i>
                    </div>
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
                                onChange={(e) => setSelectedLang(e.target.value)}
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
                    <div style={{ width: "100%", height: "10%" }}>
                        {/* <p><strong>THÔNG BÁO</strong></p><p><em>(NOTE)</em></p> */}
                        <i style={{ fontSize:"clamp(10px, 1vw, 20px)" }} class="fa-solid fa-bell"></i>
                    </div>
                </div>

                <div className="grid-col-2" style={{ height: "100%" }}>
                    <div style={{ width: "100%", height: `clamp(180px, 30vw, 300px)`, border: '1px solid' }}>
                        {/* <img
                            src={Banner}
                            alt="placeholder"
                            style={{ width: "100%", height: "%", objectFit: "cover",visibility: "hidden" }}
                        /> */}
                        {/* <div style={{height: "100%", aspectRatio:748/307}}></div> */}

                    </div>
                </div>
                <div className="grid-col-4" style={{}}>
                    <div>
                        <p><strong>TỔNG LƯỢT TRUY CẬP:</strong></p>
                        <p className='text-sm'><em>(TOTAL OF ACCESES)</em></p>
                    </div>
                    <div style={{ alignItems: "center" }}>
                        <p>12345678</p><p><strong>(LỆNH)</strong></p>
                    </div>
                    
                    <div>
                        <p><strong>TỔNG THỜI LƯỢNG TRUY CẬP:</strong></p>
                        <p className='text-sm'><em>(TOTAL DURATION OF ACCESES)</em></p>
                    </div>
                    <div style={{ alignItems: "center" }}>
                        <p>12345678</p><p><strong>(LỆNH)</strong></p>
                    </div>
                    <div>
                        <p><strong>TỔNG LƯỢT XEM VIDEO:</strong></p>
                        <p className='text-sm'><em>(TOTAL VIDEO VIEWS)</em></p>
                    </div>
                    <div style={{ alignItems: "center" }}>
                        <p>12345678</p><p><strong>(LỆNH)</strong></p>
                    </div>
                    <div>
                        <p><strong>SỐ THÀNH VIÊN:</strong></p>
                        <p className='text-sm'><em>(NUMBER OF LEVEL 1 MENBERS)</em></p>
                    </div>
                    <div style={{ alignItems: "center" }}>
                        <p>56789</p><p><strong>(LỆNH)</strong></p>
                    </div>
                    {/* <div style={{ border: 0 }}>
                        <p style={{ color: "rgb(18 66 174 / 0%)" }}>0</p><p><strong style={{ color: "rgb(18 66 174 / 0%)" }}>(0)</strong></p>
                    </div> */}
                </div>
            </header>
            <Body />
            <HeroHeader />
            <DropdownAuth />
            <ActionSection />
            <SearchSection />
            <footer className="footer">
                <h3><strong>QUẢNG CÁO</strong></h3>
                {/* <p><em>(ADVERTISING)</em></p> */}
            </footer>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: 50 }}>
                <p>CẬP NHẬT DS NHẬN THƯỞNG, KL HÀNG HÓA …. </p>
            </div>
        </>
    );
}
export default HomePage