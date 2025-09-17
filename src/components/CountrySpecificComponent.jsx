import React from 'react';
import { useTranslation } from 'react-i18next';

const CountrySpecificComponent = ({ userCountry = 'vi' }) => {
  const { t, i18n } = useTranslation();
  
  // Mock data for country information - will be replaced with JSON later
  const countryData = {
    vi: {
      flag: '/VIỆT NAM.jpg',
      companyName: 'CÔNG TY TNHH ĐẠI NGHĨA TÍN',
      companyNameEn: 'DAI NGHIA TIN COMPANY LIMITED',
      mst: '3702678200',
      address: 'AN PHƯỚC - ĐỒNG NAI - VIỆT NAM',
      representative: 'VŨ VĂN NGHĨA',
      position: 'CHỨC DANH',
      role: 'CHỦ TỊCH CÔNG TY KIÊM GIÁM ĐỐC'
    },
    en: {
      flag: '/United States.jpg',
      companyName: 'DAI NGHIA TIN COMPANY LIMITED',
      companyNameEn: 'DAI NGHIA TIN COMPANY LIMITED',
      mst: 'US-123456789',
      address: 'NEW YORK - UNITED STATES',
      representative: 'VU VAN NGHIA',
      position: 'POSITION',
      role: 'CHAIRMAN & CEO'
    }
  };

  const currentCountry = countryData[userCountry] || countryData.vi;
  const currentLang = i18n.language || 'vi';

  return (
    <div className="w-full h-full flex flex-col">
      {/* Global Logo - Planet Earth */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="">
          <img
            src={currentCountry.flag}
            alt="Country"
            className="max-w-[300px] max-h-[300px] object-contain mx-auto"
          />
        </div>
      </div>
      
      {/* Global Website Information */}
      <div className="p-4 text-center">
      </div>
    </div>
  );
};

export default CountrySpecificComponent;