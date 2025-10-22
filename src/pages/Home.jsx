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
import ContactBookIcon from '../components/ContactBookIcon'


// Services
import { generateQrSessionInfo } from "../services/authService";

function HomePage() {
    const { t, i18n } = useTranslation();
    const { user, isAuthenticated } = useSelector(state => state.auth);
    const lang = localStorage.getItem("selectedLang") || "vi";
    // State management
    const [selectedLang, setSelectedLang] = useState(lang || i18n.language);
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

    // Ensure i18n uses the stored/selected language
    useEffect(() => {
        if (selectedLang && i18n.language !== selectedLang) {
            i18n.changeLanguage(selectedLang);
        }
    }, [selectedLang]);

    // Computed values
    const isUserLoggedIn = localStorage.getItem("authToken") !== null;

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
        setIsQrModalOpen(true);
        
        // Only generate QR code if user is authenticated
        if (isUserLoggedIn) {
            try {
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
                style={{ position: "relative", top: 0, zIndex: 1000 }}
            >
                {/* Header Component */}

                <HeaderComponent
                    color={color}
                    onColorChange={handleChangeColor}
                    onQrClick={handleOpenQrModal}
                    selectedLang={selectedLang}
                    onLanguageChange={handleLanguageChange}
                />
                <DropdownAuth />

                {/* Main Content Grid */}
                <div  className="flex-1 avtblock" style={{ maxWidth: "clamp(50px, 130px, 130px) ",margin: "0 5px" }} >
                    <CountrySpecificComponent userCountry={selectedLang} />
                </div>

                <div className="!hidden md:!block flex-2" style={{ height: "100%", flex: 3 }}>
                    {isUserLoggedIn ? (
                        <CompanyInfoTable userCountry={selectedLang} />
                    ) : (
                        <DataTableComponent />
                    )}
                </div>

                {/* HeroHeader as fourth column when logged in */}
                {isUserLoggedIn && (
                    <div className="!hidden md:!block grid-col-4 w-full " style={{ marginTop: "-1vw" }}>
                        <HeroHeader selectedLang={selectedLang} isCompact={true} userCountry={userCountry} />

                        <EventFilterComponent />
                    </div>
                )}

                {/* Mobile layout - Show HeroHeader and EventFilterComponent in a separate row */}
                <div className="md:hidden w-full flex flex-col mt-2 w-full"
                    style={{ width: "clamp(80%, 80%, 100%) " }}
                >
                    <HeroHeader selectedLang={selectedLang} isCompact={true} ismobile={true} userCountry={userCountry} />
                    <EventFilterComponent />
                </div>
            </header>

            {/* Body Content */}


            {!isUserLoggedIn && (
                <div className="flex" style={{ marginTop: "-20px" }}>
                    <div className="hidden md:block w-full">
                        <HeroHeader isCompact={false} />
                        <EventFilterComponent />
                    </div>
                </div>
            )}


            <EventComponent />

            <FooterComponent />

            <AdBanner />

            {/* QR Modal */}
            <QRModalComponent
                isOpen={isQrModalOpen}
                onClose={handleCloseQrModal}
                isLoading={isQrLoading}
                error={qrError}
                qrDataUrl={qrDataUrl}
                onScanResult={handleScanResult}
                isAuthenticated={isUserLoggedIn}
            />
            <ContactBookIcon />
        </>
    );
}

export default HomePage;