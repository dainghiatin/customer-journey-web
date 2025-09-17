import React from 'react';
import { useTranslation } from 'react-i18next';

const CompanyInfoTable = ({ userCountry = 'vi' }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'vi';

  // Mock data for different countries
  const countryData = {
    vi: {
      companyName: 'CÔNG TY TNHH CÔNG NGHỆ VIỆT NAM',
      companyNameEn: 'VIETNAM TECHNOLOGY CO., LTD',
      mst: '0123456789',
      stk: '1234567890',
      daiDien: 'Nguyễn Văn A',
      soGphd: 'GP001234567',
      nganHang: 'Vietcombank',
      chucDanh: 'Giám đốc điều hành',
      diaChi: '123 Đường ABC, Quận 1, TP.HCM, Việt Nam'
    },
    en: {
      companyName: 'US TECHNOLOGY CORPORATION',
      companyNameEn: 'US TECHNOLOGY CORPORATION',
      mst: '9876543210',
      stk: '0987654321',
      daiDien: 'John Smith',
      soGphd: 'GP987654321',
      nganHang: 'Bank of America',
      chucDanh: 'Chief Executive Officer',
      diaChi: '456 Main Street, New York, NY 10001, USA'
    }
  };

  const currentCountry = countryData[userCountry] || countryData.vi;

  return (
    <div className="w-full h-full p-4">
      <div className="w-full h-full flex flex-col">
        {/* Company Name Header */}
        <div className="text-center mb-4">
          <h2 className="font-bold text-lg">{currentCountry.companyName}</h2>
          <p className="text-sm italic">({currentCountry.companyNameEn})</p>
        </div>
        
        {/* Main Table */}
        <div className="flex-1">
          <div className="border-2 border-black h-full">
            <table className="w-full h-full text-xs">
              <tbody>
                {/* Row 1: MST and SỐ GPHĐ */}
                <tr className="border-b border-black h-1/4">
                  <td className="p-2 border-r border-black font-bold bg-gray-100 w-1/4">
                    {currentLang === 'vi' ? 'MST:' : 'TAX ID:'}
                  </td>
                  <td className="p-2 border-r border-black w-1/4">{currentCountry.mst}</td>
                  <td className="p-2 border-r border-black font-bold bg-gray-100 w-1/4">
                    {currentLang === 'vi' ? 'SỐ GPHĐ:' : 'LICENSE NO:'}
                  </td>
                  <td className="p-2 w-1/4">{currentCountry.soGphd}</td>
                </tr>
                
                {/* Row 2: STK and Ngân hàng */}
                <tr className="border-b border-black h-1/4">
                  <td className="p-2 border-r border-black font-bold bg-gray-100">
                    {currentLang === 'vi' ? 'STK:' : 'ACCOUNT:'}
                  </td>
                  <td className="p-2 border-r border-black">{currentCountry.stk}</td>
                  <td className="p-2 border-r border-black font-bold bg-gray-100">
                    {currentLang === 'vi' ? 'Ngân hàng:' : 'Bank:'}
                  </td>
                  <td className="p-2">{currentCountry.nganHang}</td>
                </tr>
                
                {/* Row 3: ĐẠI DIỆN and CHỨC DANH */}
                <tr className="border-b border-black h-1/4">
                  <td className="p-2 border-r border-black font-bold bg-gray-100">
                    {currentLang === 'vi' ? 'ĐẠI DIỆN:' : 'REPRESENTATIVE:'}
                  </td>
                  <td className="p-2 border-r border-black">{currentCountry.daiDien}</td>
                  <td className="p-2 border-r border-black font-bold bg-gray-100">
                    {currentLang === 'vi' ? 'CHỨC DANH:' : 'POSITION:'}
                  </td>
                  <td className="p-2">{currentCountry.chucDanh}</td>
                </tr>
                
                {/* Row 4: ĐỊA CHỈ (full width) */}
                <tr className="h-1/4">
                  <td className="p-2 border-r border-black font-bold bg-gray-100">
                    {currentLang === 'vi' ? 'ĐỊA CHỈ:' : 'ADDRESS:'}
                  </td>
                  <td className="p-2" colSpan="3">{currentCountry.diaChi}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfoTable;