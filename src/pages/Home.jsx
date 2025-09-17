// import { HeroHeader, Body, ActionSection, SearchSection, DropdownAuth } from "../components/Body";
import Banner from "../assets/banner_place.png";
import Wheel from '@uiw/react-color-wheel';
import { hsvaToHex } from '@uiw/color-convert';
import { useState, Fragment, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  HeroHeader, Body, ActionSection, SearchSection,DropdownAuth } from "../components/Body";
import { getMetric } from "../services/metricService";
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import GlobalInfoComponent from '../components/GlobalInfoComponent';
import CountrySpecificComponent from '../components/CountrySpecificComponent';
import CompanyInfoTable from '../components/CompanyInfoTable';
const CustomPointer = () => (
    <div style={{ inset: 0, display: "none", borderRadius: "100%", position: "absolute", background: "rgb(180, 80, 230)", width: 10, height: 10 }}></div>
);


const DataTable = () => {
    const { t } = useTranslation();

    const [metric, setMetric] = useState(
        {
            listedValue: "0",
            transactions: "0",
            accesses: "0",
            successfully: "0",
            amount: "0",
            duration: "0",
            latestBank: "0",
            deposited: "0",
            videoViews: "0",
            withdrawn: "0",
            members: 0,
            remaining: "0",
            online: 1,
        }
    );

    useEffect(() => {
        getMetric()
            .then((response) => {
                setMetric(response.data?.data);
                console.log(response.data?.data);
                
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
      <div className="overflow-x-auto h-full w-full">
        <table className="border border-black text-sm text-left h-full w-full">
          <tbody style={{ fontSize: "clamp(6px, 0.75vw, 14px)" }}>
            {/* Row 1 */}
            <tr className="border border-black">
              <td className="p-2 border border-black font-bold">
                <span>{t('metrics.listedValue', 'GIÁ TRỊ LÊN SÀN:')}:</span>
                <br />
                <span className="italic lowercase font-normal">({t('metrics.listedValueEn', 'LISTED VALUE')})</span>
              </td>
              <td className="p-2 border border-black"><br /><strong>{metric.listedValue}</strong></td>
              <td className="p-2 border border-black font-bold">{t('metrics.transactions', 'LƯỢT GIAO DỊCH')}:<br /><span className="italic lowercase font-normal">({t('metrics.transactionsEn', 'TRANSACTIONS')})</span></td>
              <td className="p-2 border border-black"><strong>{metric.transactions}</strong></td>
              <td className="p-2 border border-black font-bold">{t('metrics.accesses', 'LƯỢT TRUY CẬP')}:<br /><span className="italic lowercase font-normal">({t('metrics.accessesEn', 'ACCESSES')})</span></td>
              <td className="p-2 border border-black"><br /><strong>{metric.accesses}</strong></td>
            </tr>
            
            {/* Row 2 */}
            <tr className="border border-black">
              <td className="p-2 border border-black font-bold">{t('metrics.successfully', 'THÀNH CÔNG')}:<br /><span className="italic lowercase font-normal">({t('metrics.successfullyEn', 'SUCCESSFULLY')})</span></td>
              <td className="p-2 border border-black"><br /><strong>{metric.successfully}</strong></td>
              <td className="p-2 border border-black font-bold">{t('metrics.amount', 'SỐ TIỀN')}:<br /><span className="italic lowercase font-normal">({t('metrics.amountEn', 'AMOUNT')})</span></td>
              <td className="p-2 border border-black"><strong>{metric.amount}</strong></td>
              <td className="p-2 border border-black font-bold">{t('metrics.duration', 'THỜI LƯỢNG')}:<br /><span className="italic lowercase font-normal">({t('metrics.durationEn', 'DURATION')})</span></td>
              <td className="p-2 border border-black"><br /><strong>{metric.duration}</strong></td>
            </tr>
            
            {/* Row 3 - Single Row */}
            <tr className="border border-black">
              <td className="p-2 border border-black font-bold text-center" colSpan={2}>{t('metrics.bankUpdate', 'NGÂN HÀNG CẬP NHẬT')}<br /><span className="italic lowercase font-normal">({t('metrics.bankUpdateEn', 'ẩn - hiện')})</span></td>
              <td className="p-2 border border-black font-bold">{t('metrics.deposited', 'ĐÃ GỬI')}:<br /><span className="italic lowercase font-normal">({t('metrics.depositedEn', 'DEPOSITED')})</span></td>
              <td className="p-2 border border-black"><strong>{metric.deposited}</strong></td>
              <td className="p-2 border border-black font-bold">{t('metrics.videoViews', 'LƯỢT XEM VIDEO')}:<br /><span className="italic lowercase font-normal">({t('metrics.videoViewsEn', 'VIDEO VIEWS')})</span></td>
              <td className="p-2 border border-black"><br /><strong>{metric.videoViews}</strong></td>
            </tr>
            
            {/* Row 4 */}
            <tr className="border border-black">
              <td className="p-2 border border-black font-bold">{t('metrics.withTerm', 'CÓ KỲ HẠN')}</td>
              <td className="p-2 border border-black">{t('metrics.update', 'CẬP NHẬT')}</td>
              <td className="p-2 border border-black font-bold">{t('metrics.withdrawn', 'ĐÃ RÚT')}:<br /><span className="italic lowercase font-normal">({t('metrics.withdrawnEn', 'WITHDRAWED')})</span></td>
              <td className="p-2 border border-black"><strong>{metric.withdrawn}</strong></td>
              <td className="p-2 border border-black font-bold">{t('metrics.members', 'THÀNH VIÊN')}:<br /><span className="italic lowercase font-normal">({t('metrics.membersEn', 'MEMBERS')})</span></td>
              <td className="p-2 border border-black"><br /><strong>{metric.members}</strong></td>
            </tr>
            
            {/* Row 5 */}
            <tr className="border border-black">
              <td className="p-2 border border-black font-bold">{t('metrics.withoutTerm', 'KHÔNG KỲ HẠN')}</td>
              <td className="p-2 border border-black">{t('metrics.update', 'CẬP NHẬT')}</td>
              <td className="p-2 border border-black font-bold">{t('metrics.remaining', 'CÒN LẠI')}:<br /><span className="italic lowercase font-normal">({t('metrics.remainingEn', 'REMAINING')})</span></td>
              <td className="p-2 border border-black"><strong>{metric.remaining}</strong></td>
              <td className="p-2 border border-black font-bold">{t('metrics.online', 'TRUY CẬP')}:<br /><span className="italic lowercase font-normal">({t('metrics.onlineEn', 'ONLINE')})</span></td>
              <td className="p-2 border border-black"><br /><strong>{metric.online}</strong></td>
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
    return (
        <>
            <header className="grid-container">
                <div className="grid-col-1" style={{ height: "100%", minWidth:"60px" }}>
                    <div style={{ width: "100%", height: "10%" }}>
                        <p className="flex sm:hidden text-[clamp(10px,1vw,20px)]">
                            <strong>APP</strong>
                        </p>

                        {/* Chỉ hiển thị trên màn hình lớn hơn sm (md trở lên) */}
                        <p className="hidden sm:flex text-[clamp(10px,1vw,20px)]">
                            <strong>QR</strong>
                        </p>
                    </div>
                    <button onClick={()=>{}} className="sm:py-3 cursor-pointer" style={{ width: "100%", height: "10%"}}>
                        {/* <p><strong>MÁY TÍNH</strong></p><p><em>(COMPUTER)</em></p> */}
                        <i style={{ fontSize: "clamp(10px, 1vw, 20px)" }} className="fa-solid fa-computer"></i>
                    </button>
                    <button onClick={()=>{}} className="sm:py-3 cursor-pointer" style={{ width: "100%", height: "10%"}}>
                        {/* <p><strong>DIỆN THOẠI</strong></p><p><em>(PHONE)</em></p> */}
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
                    <button onClick={()=>{}} className="sm:py-3 cursor-pointer" style={{ width: "100%", height: "10%"}}>
                        {/* <p><strong>THÔNG BÁO</strong></p><p><em>(NOTE)</em></p> */}
                        <i style={{ fontSize:"clamp(10px, 1vw, 20px)" }} class="fa-solid fa-bell"></i>
                    </button>
                </div>

                <div className="grid-col-2" style={{ height: "100%" }}>
                    <div style={{ width: "100%", height: `clamp(180px, 30vw, 300px)`, border: '1px solid' }}>
                        {/* Conditional rendering: GlobalInfoComponent for non-logged users, CountrySpecificComponent logo for logged users */}
                        {isUserLoggedIn ? (
                            <CountrySpecificComponent userCountry={selectedLang} />
                        ) : (
                            <GlobalInfoComponent />
                        )}
                    </div>
                </div>
                <div className="grid-col-2" style={{}}>
                    {/* Conditional rendering: DataTable for non-logged users, CompanyInfoTable for logged users */}
                    {isUserLoggedIn ? (
                        <CompanyInfoTable userCountry={selectedLang} />
                    ) : (
                        <DataTable />
                    )}
                </div>
            </header>
            {/* <Body /> */}
            <DropdownAuth />
            <HeroHeader />
            <ActionSection />
            <footer className="footer">
                <h3><strong>{t('common.advertising', 'QUẢNG CÁO')}</strong></h3>
                {/* <p><em>(ADVERTISING)</em></p> */}
            </footer>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: 50 }}>
                <p>{t('common.updateNotice', 'CẬP NHẬT DS NHẬN THƯỞNG, KL HÀNG HÓA ….')} </p>
            </div>
        </>
    );
}
export default HomePage