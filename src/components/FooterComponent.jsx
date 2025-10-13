import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const FooterComponent = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <>
            {/* Reward List Link */}
            <div
                onClick={() => navigate("/reward-list")}
                style={{
                    display: "flex",
                    cursor: "pointer",
                    justifyContent: "center", 
                    alignItems: "center", 
                    height: 50, 
                    borderBottom: '1px solid', 
                    fontWeight: 'bold'
                }}
            >
                <p>{t('common.updateNotice', 'DANH SÁCH THƯỞNG')}</p>
            </div>

            {/* Company Information */}
            <div style={{ 
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "center", 
                alignItems: "center", 
                height: 50, 
                fontSize: 10 
            }}>
                <div>{t('common.companyName', '© CÔNG TY TNHH ĐẠI NGHĨA TÍN')}</div>
                <div>{t('common.taxCode', 'MST: 3702678200')}</div>
            </div>
        </>
    );
};

export default FooterComponent;