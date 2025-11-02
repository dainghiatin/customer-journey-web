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
      companyName: 'CÔNG TY TNHH ĐẠI NGHĨA TÍN',
      companyNameEn: 'VIETNAM TECHNOLOGY CO., LTD',
      mst: '3702678200',
      stk: '',
      daiDien: 'VŨ VĂN NGHĨA',
      soGphd: '',
      nganHang: '',
      chucDanh: 'CEO',
      diaChi: 'TỔ 4, ẤP 5, AN PHƯỚC, ĐỒNG NAI, VIỆT NAM'
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
    return countryData[userCountry] || countryData.vi;
  };

  const currentData = getDynamicData();

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 mx-auto mb-2"></div>
          <p>Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full px-1">
      <div className="w-full h-full flex flex-col">
        {/* Company Name Header */}
        <div className="text-center mb-1 sm:mb-1 md:mb-1">
          <h2 className="font-bold text-xs sm:text-sm md:text-lg break-words leading-tight">
            {currentData.companyName}
          </h2>
        </div>
        
        {/* Main Table */}
        <div className="flex-1 overflow-auto">
          <div className="border-2 border-black h-full min-h-0">
            <div className="overflow-auto h-full">
              <table className="w-full min-w-full table-fixed company-info-table">
                <tbody className="text-xs">
                  {/* Row 1: MST and SỐ GPHĐ */}
                  <tr className="border-b border-black">
                    <td className="p-1 sm:p-2 border-r border-black font-bold bg-gray-100 w-1/4 sm:w-1/5 text-xs break-words label-cell">
                      <div className="break-words leading-tight">
                        {currentLang === 'vi' ? 'MST:' : 'TAX ID:'}
                      </div>
                    </td>
                    <td className="p-1 sm:p-2 border-r border-black w-1/4 sm:w-3/10 text-xs break-all data-cell">
                      <div className="break-all leading-tight">{currentData.mst}</div>
                    </td>
                    <td className="p-1 sm:p-2 border-r border-black font-bold bg-gray-100 w-1/4 sm:w-1/5 text-xs break-words label-cell">
                      <div className="break-words leading-tight">
                        {currentLang === 'vi' ? 'SỐ GPHĐ:' : 'LICENSE NO:'}
                      </div>
                    </td>
                    <td className="p-1 sm:p-2 w-1/4 sm:w-3/10 text-xs break-all data-cell">
                      <div className="break-all leading-tight">{currentData.soGphd}</div>
                    </td>
                  </tr>
                  
                  {/* Row 2: STK and Ngân hàng */}
                  <tr className="border-b border-black">
                    <td className="p-1 sm:p-2 border-r border-black font-bold bg-gray-100 text-xs break-words label-cell">
                      <div className="break-words leading-tight">
                        {currentLang === 'vi' ? 'STK:' : 'ACCOUNT:'}
                      </div>
                    </td>
                    <td className="p-1 sm:p-2 border-r border-black text-xs break-all data-cell">
                      <div className="break-all leading-tight">{currentData.stk}</div>
                    </td>
                    <td className="p-1 sm:p-2 border-r border-black font-bold bg-gray-100 text-xs break-words label-cell">
                      <div className="break-words leading-tight">
                        {currentLang === 'vi' ? 'NGÂN HÀNG:' : 'Bank:'}
                      </div>
                    </td>
                    <td className="p-1 sm:p-2 text-xs break-words data-cell">
                      <div className="break-words leading-tight">{currentData.nganHang}</div>
                    </td>
                  </tr>
                  
                  {/* Row 3: ĐẠI DIỆN and CHỨC DANH */}
                  <tr className="border-b border-black">
                    <td className="p-1 sm:p-2 border-r border-black font-bold bg-gray-100 text-xs break-words label-cell">
                      <div className="break-words leading-tight">
                        {currentLang === 'vi' ? 'ĐẠI DIỆN:' : 'REPRESENTATIVE:'}
                      </div>
                    </td>
                    <td className="p-1 sm:p-2 border-r border-black text-xs break-words data-cell">
                      <div className="break-words leading-tight">{currentData.daiDien}</div>
                    </td>
                    <td className="p-1 sm:p-2 border-r border-black font-bold bg-gray-100 text-xs break-words label-cell">
                      <div className="break-words leading-tight">
                        {currentLang === 'vi' ? 'CHỨC DANH:' : 'POSITION:'}
                      </div>
                    </td>
                    <td className="p-1 sm:p-2 text-xs break-words data-cell">
                      <div className="break-words leading-tight">{currentData.chucDanh}</div>
                    </td>
                  </tr>
                  
                  {/* Row 4: ĐỊA CHỈ (full width) */}
                  <tr>
                    <td className="p-1 sm:p-2 border-r border-black font-bold bg-gray-100 text-xs break-words align-top label-cell">
                      <div className="break-words leading-tight">
                        {currentLang === 'vi' ? 'ĐỊA CHỈ:' : 'ADDRESS:'}
                      </div>
                    </td>
                    <td className="p-1 sm:p-2 text-xs break-words align-top data-cell" colSpan="3">
                      <div className="break-words leading-tight">{currentData.diaChi}</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfoTable;