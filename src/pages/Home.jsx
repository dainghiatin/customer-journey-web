import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

// Components
import { HeroHeader, Body, SearchSection, DropdownAuth } from "../components/Body";
import GlobalInfoComponent from '../components/GlobalInfoComponent';
import CountrySpecificComponent from '../components/CountrySpecificComponent';
import CompanyInfoTable from '../components/CompanyInfoTable';
import EventFilterComponent from "../components/EventFilterComponent";
import EventComponent from "../components/EventComponent";
import AdBanner from "../components/AdBaner";
import HeaderComponent from "../components/HeaderComponent";
import QRModalComponent from "../components/QRModalComponent";
import FooterComponent from "../components/FooterComponent";
import DataTableComponent from "../components/DataTableComponent";

// Services
import { generateQrSessionInfo } from "../services/authService";

function HomePage() {
    const { t, i18n } = useTranslation();
    const { user, isAuthenticated } = useSelector(state => state.auth);
    
    // State management
    const [selectedLang, setSelectedLang] = useState(i18n.language || "vi");
    const [color, setColor] = useState("#1242ae");
    const [authToken, setAuthToken] = useState(null);
    const [userCountry, setUserCountry] = useState('Vietnam');
    
    // QR Modal states
    const [isQrModalOpen, setIsQrModalOpen] = useState(false);
    const [isQrLoading, setIsQrLoading] = useState(false);
    const [qrError, setQrError] = useState("");
    const [qrDataUrl, setQrDataUrl] = useState(null);

    // Effects
    useEffect(() => {
        if (user?.country) {
            setUserCountry(user.country);
        }
    }, [user]);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        setAuthToken(token);
    }, []);

    useEffect(() => {
        const savedColor = localStorage.getItem("selectedColor");
        if (savedColor) {
            setColor(savedColor);
        }
    }, []);

    useEffect(() => {
        document.getElementById("root").style.backgroundColor = color;
    }, [color]);

    // Computed values
    const isUserLoggedIn = isAuthenticated || authToken;

    // Handlers
    const handleChangeColor = (e) => {
        const newColor = e.target.value;
        setColor(newColor);
        localStorage.setItem("selectedColor", newColor);
    };

    const handleLanguageChange = (newLang) => {
        setSelectedLang(newLang);
    };

    const handleOpenQrModal = async () => {
        try {
            setIsQrModalOpen(true);
            setIsQrLoading(true);
            setQrError("");
            setQrDataUrl(null);

            const response = await generateQrSessionInfo();
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

    const handleScanResult = (result) => {
        console.log('QR Scan Result:', result);
        // Handle the scanned QR result here
        // You can process the result, make API calls, or show notifications
        alert(`QR Code scanned: ${result}`);
        handleCloseQrModal();
    };

    return (
        <>
            <header className="grid-container "
            style={{ maxHeight: "130px" }}
            >
                {/* Header Component */}
                <HeaderComponent
                    color={color}
                    onColorChange={handleChangeColor}
                    onQrClick={handleOpenQrModal}
                    selectedLang={selectedLang}
                    onLanguageChange={handleLanguageChange}
                />

                {/* Main Content Grid */}
                <div >
                    <div >
                        {isUserLoggedIn ? (
                            <CountrySpecificComponent userCountry={selectedLang} />
                        ) : (
                            <GlobalInfoComponent />
                        )}
                    </div>
                </div>

                <div className="!hidden md:!block flex-1" style={{ height: "100%" }}>
                    {isUserLoggedIn ? (
                        <CompanyInfoTable userCountry={selectedLang} />
                    ) : (
                        <DataTableComponent />
                    )}  
                </div>

                {/* HeroHeader as fourth column when logged in */}
                {isUserLoggedIn && (
                    <div className="!hidden md:!block grid-col-4">
                        <HeroHeader selectedLang={selectedLang} isCompact={true} userCountry={userCountry} />
                        <EventFilterComponent />
                    </div>
                )}

                {/* Mobile layout - Show HeroHeader and EventFilterComponent in a separate row */}
                <div className="md:hidden w-full flex flex-col mt-2">
                    <HeroHeader selectedLang={selectedLang} isCompact={false} />
                    <EventFilterComponent />
                </div>
            </header>

            {/* Body Content */}
            <div className="flex">
                <DropdownAuth />
                {!isUserLoggedIn && (
                    <div className="hidden md:block">
                        <HeroHeader isCompact={false} />
                        <EventFilterComponent />
                    </div>
                )}
            </div>

            {/* Event Component */}
            <EventComponent />

            {/* Footer Component */}
            <FooterComponent />

            {/* Ad Banner */}
            <AdBanner />

            {/* QR Modal */}
            <QRModalComponent
                isOpen={isQrModalOpen}
                onClose={handleCloseQrModal}
                isLoading={isQrLoading}
                error={qrError}
                qrDataUrl={qrDataUrl}
                onScanResult={handleScanResult}
            />
        </>
    );
}

export default HomePage;