import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function HeroHeader() {
    return (
        <div style={{ position: "relative", marginBottom: "5vw" }}>
            <div className="hero-title" style={{ marginTop: "0px",fontWeight:"bold"  }}>
                <h3 style={{ color: "black", fontSize: '3vw', }}>CÔNG BẰNG LỚN - UY TÍN LỚN</h3>
                <h4 className='lowercase' style={{ color: "black", fontSize: '2.6vw' }}><em>(GREAT FAIRNESS - GREAT REPUTATION)</em></h4>
            </div>
            <div className="hero-subtitle" style={{ border: 0, marginTop: '3vw', alignSelf: "center", fontWeight:"bold" }}>
                <h3 style={{ color: "black", fontSize: '3vw',   }}>MỤC TIÊU: SÀN THƯƠNG MẠI ĐIỆN TỬ QUỐC GIA</h3>
                <h4 className='lowercase' style={{ color: "black", fontSize: '2.6vw' }}><em>(TARGET: NATIONAL V-COMERCIAL)</em></h4>
            </div>
            <aside className="main-aside-2" >
                <div className="main-aside-2-1" style={{ width: '19vw' , position: "absolute", top: '3vw', right: '1vw', fontSize: "clamp(12px, 2vw, 40px)" }}>
                    <div style={{ color: "black", textAlign: "center",height: "clamp(20px,4vw, 60px)" }}>
                        <p><strong>Ai LIVE</strong></p>
                    </div>
                </div>
                <div className="main-aside-2-1"  style={{width: '19vw', position: "absolute", top: '3vw', left: '1vw',  textAlign: "center"  }}>
                    <div style={{ fontSize: "clamp(5px, 1vw, 20px)", color: "black",height:"clamp(20px,4vw, 60px)" }}>
                        <p><strong>ĐĂNG BÀI MỚI</strong></p><p className='lowercase'><em>(NEW POST)</em></p>
                    </div>
                </div>
                <div className="main-aside-2-2"  style={{ width: '19vw', position: "absolute", bottom: '-2vw', left: '1vw' }}>
                    <div style={{ color: "black", textAlign: "center", fontSize: "clamp(5px, 1vw, 20px)",height:"clamp(20px,4vw, 60px)"}}>
                        <p><strong>CÔNG VIỆC TỰ DO</strong></p>
                        {/* <p><strong>VIỆC LÀM TỰ DO</strong></p> */}
                        <p className='lowercase' style={{ fontStyle: "italic", fontWeight: "normal" }}>(FREELANCER)</p>
                    </div>
                </div>
                <div className="main-aside-2-2" style={{ width: '19vw', position: "absolute", bottom: "-2vw", right: '1vw' }}>
                    <div style={{ color: "black", fontSize: "clamp(5px, 1vw, 20px)", textAlign: "center",height:"clamp(20px,4vw, 60px)" }}>
                        <p className="whitespace-nowrap text-ellipsis max-w-ful"><strong>GIAO DỊCH THANH TOÁN</strong></p>
                        <p className='lowercase'><em>(PAYMENT TRANSACTION)</em></p>
                    </div>
                </div>
            </aside>
        </div>
    )
}
const categories = [
    {
        vi: "HÀNG BÁN",
        en: "SALE",
    },
    {
        vi: "CẦN MUA",
        en: "BUY",
    },
    {
        vi: "CẦN THUÊ",
        en: "RENT",
    },
    {
        vi: "CHO THUÊ",
        en: "FOR RENT",
    },
    {
        vi: "DỊCH VỤ",
        en: "SERVICES",
    },
];

const subCategories = [
    {
        vi: "HÀNG HÓA",
        en: "GOODS",
    },
    {
        vi: "BẤT ĐỘNG SẢN",
        en: "LAND AND HOUSE",
    },
    {
        vi: "PHƯƠNG TIỆN",
        en: "VEHICLE",
    },
    {
        vi: "NHÂN LỰC",
        en: "MANPOWER",
    },
    {
        vi: "XUẤT - NHẬP KHẨU",
        en: "IMPORT - EXPORT",
    },
];

const conditions = [
    {
        vi: "PHẾ LIỆU",
        en: "SCRAP",
    },
    {
        vi: "MỚI",
        en: "NEW",
    },
    {
        vi: "CŨ",
        en: "OLD",
    },
    {
        vi: "CHƯA SỬ DỤNG",
        en: "UNUSED",
    },
];

const regions = [
    { vi: "TẤT CẢ", en: "ALL" },
    { vi: "ĐÔNG NAM BỘ", en: "SOUTH EAST", num: "I" },
    { vi: "ĐÔNG BẮC BỘ", en: "NORTH EAST", num: "II" },
    { vi: "TÂY NAM BỘ", en: "SOUTH WEST", num: "III" },
    { vi: "TÂY BẮC BỘ", en: "NORTH WEST", num: "IV" },
    { vi: "BẮC TRUNG BỘ", en: "NORTH CENTRAL", num: "V" },
    { vi: "NAM TRUNG BỘ", en: "SOUTH CENTRAL", num: "VI" },
    { vi: "TÂY NGUYÊN", en: "HIGHLANDS", num: "VII" },
    { vi: "NƯỚC KHÁC", en: "OTHER COUNTRIES", num: "VIII" },
];
const CategorySelect = ({ title, items }) => {
    const [selected, setSelected] = useState(items[0]?.vi || "");
    const [selected_en, setSelectedEN] = useState(items[0]?.en || "");
    const [open, setOpen] = useState(false);

    return (
        <div style={{ width: "50%", position: "relative" }}>
            {/* Ô chọn (giống <select>) */}
            <div 
                onClick={() => setOpen(!open)} 
                className='items-center'
                style={{
                    width: 340, padding: "5px", border: "2px solid black",
                    textAlign: "center", cursor: "pointer", 
                    backgroundColor: "transparent",
                    // gap: 4,
                    
                    display:"flex", justifyContent:"space-between",
                    fontWeight: "bold", fontSize: "clamp(10px, 1vw, 20px)"
                }}
            >
                <div className='flex grow items-center justify-center flex-col'>
                    <span>{selected} </span>
                    <span className='lowercase' style={{fontWeight:'normal', fontStyle:"italic"}}>({selected_en})</span>
                </div>
                <span style={{ fontSize: "16px", fontWeight: "bold", marginLeft: "10px" }}>
                    {open ? "▲" : "▼"}
                </span>
            </div>

            {/* Dropdown danh sách */}
            {open && (
                <ul 
                    style={{
                        position: "absolute", width: 340, border: "2px solid black",
                        background: "white", listStyle: "none", padding: 0, margin: 0, zIndex: 1000
                    }}
                >
                    {items.map((item, index) => (
                        <li 
                            key={index} 
                            style={{
                                padding: "5px", cursor: "pointer",
                                fontWeight: "bold", borderBottom: "1px solid gray",
                                display: "flex", justifyContent: "center",
                                flexDirection: "column", textAlign: "center"
                            }}
                            onClick={() => { setSelected(item.vi); setOpen(false); setSelectedEN(item.en) }}
                        >
                            <span className="font-bold">{item.vi}</span> 
                            <b className='lowercase'>({item.en})</b>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

function ActionSection() {
    return (
        <section className="action-section" style={{}}>
            <div className="action-section-1" style={{ gap: 10 }}>
                <div style={{ backgroundColor: "white", aspectRatio: 3/4, width: '25%',  }}>
                    <h3>SỰ KIỆN</h3>
                    <h4><em>(EVENT)</em></h4>
                    {/* <h5><em>(slide cập nhật)</em></h5> */}
                </div>
                <div style={{ backgroundColor: "white", aspectRatio: 3/4, width: '25%' }}>
                    <h3>SỰ KIỆN</h3>
                    <h4><em>(EVENT)</em></h4>
                    {/* <h5><em>(slide cập nhật)</em></h5> */}
                </div>
                <div style={{ backgroundColor: "white", aspectRatio: 3/4, width: '25%' }}>
                    <h3>SỰ KIỆN</h3>
                    <h4><em>(EVENT)</em></h4>
                    {/* <h5><em>(slide cập nhật)</em></h5> */}
                </div>
                <div style={{ backgroundColor: "white", aspectRatio: 3/4, width: '25%' }}>
                    <h3>SỰ KIỆN</h3>
                    <h4><em>(EVENT)</em></h4>
                    {/* <h5><em>(slide cập nhật)</em></h5> */}
                </div>
                <div style={{ backgroundColor: "white", aspectRatio: 3/4, width: '25%' }}>
                    <h3>SỰ KIỆN</h3>
                    <h4><em>(EVENT)</em></h4>
                    {/* <h5><em>(slide cập nhật)</em></h5> */}
                </div>
                <div style={{ backgroundColor: "white", aspectRatio: 3/4, width: '25%' }}>
                    <h3>SỰ KIỆN</h3>
                    <h4><em>(EVENT)</em></h4>
                    {/* <h5><em>(slide cập nhật)</em></h5> */}
                </div>
            </div>
            <div className="action-section-1-mobile" style={{ justifyContent: "space-between"}}>
                <div style={{ backgroundColor: "white", aspectRatio: 3/4, width: '49%' }}>
                    <h3>SỰ KIỆN</h3>
                    <h4><em>(EVENT)</em></h4>
                    {/* <h5><em>(slide cập nhật)</em></h5> */}
                </div>
                <div style={{ backgroundColor: "white", aspectRatio: 3/4, width: '49%' }}>
                    <h3>SỰ KIỆN</h3>
                    <h4><em>(EVENT)</em></h4>
                    {/* <h5><em>(slide cập nhật)</em></h5> */}
                </div>

            </div>

            <div className="action-section-2" style={{ gap: 10 }}>
                <CategorySelect title="DANH MỤC" items={categories} />
                <CategorySelect title="Subcategories" items={subCategories} />
                <CategorySelect title="Conditions" items={conditions} />
                <CategorySelect title="Regions" items={regions} />
            </div>

        </section>
    )
}

const DropdownAuth = () => {
    const [isShow, setIsShow] = useState(false);
    const navigate = useNavigate();

    return (
        <div style={{ position: 'relative', display: "flex", flexDirection: "column", width: 'fit-content' }}>
            <button
                onClick={() => { navigate('login') }}
                style={{ fontSize: "clamp(10px, 1vw, 20px)", fontWeight: 'bold', background: 'none', cursor: 'pointer', border: '1px solid black', padding:"1vw"  }}
            >
                ĐĂNG NHẬP
                <div className='lowercase' style={{ fontSize: "clamp(10px, 1vw, 20px)", fontStyle: 'italic' }}>(LOGIN)</div>
            </button>
            <button
                onClick={() => { navigate('register') }}
                style={{ fontSize: "clamp(10px, 1vw, 20px)", fontWeight: 'bold', background: 'none', cursor: 'pointer', border: '1px solid black', padding:"1vw" }}
            >
                ĐĂNG KÝ
                <div className='lowercase' style={{ fontSize: "clamp(10px, 1vw, 20px)", fontStyle: 'italic' }}>(REGISTER)</div>
            </button>
        </div>
    );
};

function Body() {
    return (
        <>
            <main className="main-grid-container" style={{marginBottom:50}}>
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
                            <p >123456789</p><p><strong>(LỆNH)</strong></p>
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
                        <div style={{width: "100%",padding: "14px"}}>
                            <p style={{textAlign:"center"}}><strong>NGÂN HÀNG TỰ ĐỘNG CẬP NHẬT SỐ DƯ</strong></p>
                        </div>
                    </div>   
                    <div className="main-section-info-1">
                        <div style={{minWidth:"30%"}}>
                            <p style={{textAlign:"center"}}><strong>GỬI CÓ KỲ HẠN</strong></p>
                        </div>
                        <div>
                            <p style={{textAlign:"center"}}><strong>(HIỆN SỐ, FILE NGÂN HÀNG CẬP NHẬT, HOẶC SÀN TRA CỨU GỬI LÊN)</strong></p>
                        </div> 
                    </div>
                    <div className="main-section-info-1">
                        <div style={{minWidth:"30%"}}>
                            <p style={{textAlign:"center"}}><strong>GỬI KHÔNG KỲ HẠN</strong></p>
                        </div>
                        <div >
                            <p style={{textAlign:"center"}}><strong>(HIỆN SỐ, FILE NGÂN HÀNG CẬP NHẬT, HOẶC SÀN TRA CỨU GỬI LÊN)</strong></p> 
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
            <div className="search-title">
                <h3><strong>TÌM KIẾM</strong></h3><h4 className='lowercase'><em>(SEARCH)</em></h4>
            </div>
            {/* <div>
                <p>SAP XEP BO CUC CHO PHU HOP VOI MAN HINH HIEN THI MAY TINH + DIEN THOI</p>
            </div> */}
        </section>
    )
}

export { HeroHeader, Body, ActionSection, SearchSection , DropdownAuth}