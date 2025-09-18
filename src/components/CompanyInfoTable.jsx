import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getMe } from '../services/authService';

const CompanyInfoTable = ({ userCountry = 'vi' }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'vi';
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
          const response = await getMe(authToken);
          setUserData(response.data);
        } else {
          // Fallback to localStorage user data if no token
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            setUserData(JSON.parse(storedUser));
          }
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError(err.message);
        // Fallback to localStorage user data on error
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUserData(JSON.parse(storedUser));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Mock data for different countries as fallback
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

  // Create dynamic data based on user information
  const getDynamicData = () => {
    if (!userData) {
      return countryData[userCountry] || countryData.vi;
    }

    // Map user data to company info format
    return {
      companyName: userData.full_name || userData.username || 'CÔNG TY TNHH CÔNG NGHỆ VIỆT NAM',
      companyNameEn: userData.full_name || userData.username || 'VIETNAM TECHNOLOGY CO., LTD',
      mst: userData.cccd || '0123456789',
      stk: userData.bank_number || '1234567890',
      daiDien: userData.full_name || userData.username || 'Nguyễn Văn A',
      soGphd: userData.reference_id || 'GP001234567',
      nganHang: userData.bank_name || 'Vietcombank',
      chucDanh: userData.is_ctv ? 'Cộng tác viên' : 'Giám đốc điều hành',
      diaChi: userData.address_no || userData.address_on_map || '123 Đường ABC, Quận 1, TP.HCM, Việt Nam'
    };
  };

  const currentData = getDynamicData();

  if (loading) {
    return (
      <div className="w-full h-full p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
          <p>Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-4">
      <div className="w-full h-full flex flex-col">
        {/* Company Name Header */}
        <div className="text-center mb-4">
          <h2 className="font-bold text-lg">{currentData.companyName}</h2>
          <p className="text-sm italic">({currentData.companyNameEn})</p>
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
                  <td className="p-2 border-r border-black w-1/4">{currentData.mst}</td>
                  <td className="p-2 border-r border-black font-bold bg-gray-100 w-1/4">
                    {currentLang === 'vi' ? 'SỐ GPHĐ:' : 'LICENSE NO:'}
                  </td>
                  <td className="p-2 w-1/4">{currentData.soGphd}</td>
                </tr>
                
                {/* Row 2: STK and Ngân hàng */}
                <tr className="border-b border-black h-1/4">
                  <td className="p-2 border-r border-black font-bold bg-gray-100">
                    {currentLang === 'vi' ? 'STK:' : 'ACCOUNT:'}
                  </td>
                  <td className="p-2 border-r border-black">{currentData.stk}</td>
                  <td className="p-2 border-r border-black font-bold bg-gray-100">
                    {currentLang === 'vi' ? 'Ngân hàng:' : 'Bank:'}
                  </td>
                  <td className="p-2">{currentData.nganHang}</td>
                </tr>
                
                {/* Row 3: ĐẠI DIỆN and CHỨC DANH */}
                <tr className="border-b border-black h-1/4">
                  <td className="p-2 border-r border-black font-bold bg-gray-100">
                    {currentLang === 'vi' ? 'ĐẠI DIỆN:' : 'REPRESENTATIVE:'}
                  </td>
                  <td className="p-2 border-r border-black">{currentData.daiDien}</td>
                  <td className="p-2 border-r border-black font-bold bg-gray-100">
                    {currentLang === 'vi' ? 'CHỨC DANH:' : 'POSITION:'}
                  </td>
                  <td className="p-2">{currentData.chucDanh}</td>
                </tr>
                
                {/* Row 4: ĐỊA CHỈ (full width) */}
                <tr className="h-1/4">
                  <td className="p-2 border-r border-black font-bold bg-gray-100">
                    {currentLang === 'vi' ? 'ĐỊA CHỈ:' : 'ADDRESS:'}
                  </td>
                  <td className="p-2" colSpan="3">{currentData.diaChi}</td>
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