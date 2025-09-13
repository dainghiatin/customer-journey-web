import React, { useState, useEffect } from "react";
import { handleAcceptFreelancer } from "../services/freelancerService";
import { useTranslation } from "react-i18next";



export default function FreelancerOnlineComponent({freelancers}) {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFreelancers, setFilteredFreelancers] = useState(freelancers);

  useEffect(() => {
    const filtered = freelancers.filter(freelancer => 
      freelancer.type === 'offline' &&
      freelancer.id.toString().includes(searchTerm) || 
      freelancer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFreelancers(filtered);
  }, [searchTerm, freelancers]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="mt-4 border-2 border-blue-100 p-4">
      {/* Blue indicator bar at the top */}
      {/* <div className="bg-blue-500 text-white py-2 px-4 text-center mb-4">
        <span className="font-bold">TRỰC TUYẾN</span>
        <span className="italic ml-2">(Online)</span>
      </div> */}
      
      {/* Search input at the top */}
      <div className="mb-4">
        <input 
          type="text" 
          placeholder={t('freelancerOnline.searchPlaceholder', 'TÌM KIẾM (Search): ID công việc, tên công việc')} 
          className="w-full p-2 border rounded" 
        />
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-center">{t('freelancerOnline.stt', 'STT')}</th>
              <th className="border border-gray-300 p-2 text-center">
                {t('freelancerOnline.jobName', 'TÊN CÔNG VIỆC')}
                <div className="text-xs text-gray-500"><i>({t('freelancerOnline.jobNameEn', 'Name of shift')})</i></div>
              </th>
              
              {/* Rest of the table headers remain unchanged */}
              <th className="border border-gray-300 p-2 text-center">
                {t('freelancerOnline.estimate', 'ƯỚC LƯỢNG')}
                <div className="text-xs text-gray-500"><i>({t('freelancerOnline.estimateEn', 'Estimate')})</i></div>
              </th>
              <th className="border border-gray-300 p-2 text-center">
                {t('freelancerOnline.requirements', 'YÊU CẦU NHÂN LỰC, PHƯƠNG TIỆN')}
                <div className="text-xs text-gray-500"><i>({t('freelancerOnline.requirementsEn', 'Manpower, equipment requirements')})</i></div>
              </th>
              <th className="border border-gray-300 p-2 text-center">
                {t('freelancerOnline.startTime', 'THỜI GIAN NHẬN VIỆC')}
                <div className="text-xs text-gray-500"><i>({t('freelancerOnline.startTimeEn', 'Start time')})</i></div>
              </th>
              <th className="border border-gray-300 p-2 text-center">
                {t('freelancerOnline.finishTime', 'THỜI GIAN HOÀN THÀNH')}
                <div className="text-xs text-gray-500"><i>({t('freelancerOnline.finishTimeEn', 'Finish time')})</i></div>
              </th>
              <th className="border border-gray-300 p-2 text-center">
                {t('freelancerOnline.deposit', 'ĐẶT CỌC Ở BÊN')}
                <div className="text-xs text-gray-500"><i>({t('freelancerOnline.depositEn', 'Deposit')})</i></div>
              </th>
              <th className="border border-gray-300 p-2 text-center">
                {t('freelancerOnline.priceOffered', 'GIÁ ĐƯA RA')}
                <div className="text-xs text-gray-500"><i>({t('freelancerOnline.priceOfferedEn', 'Price offered')})</i></div>
              </th>
              <th className="border border-gray-300 p-2 text-center">
                {t('freelancerOnline.serviceFee', 'ĐẶT GIÁ')}
                <div className="text-xs text-gray-500"><i>({t('freelancerOnline.serviceFeeEn', 'Service fee')})</i></div>
              </th>
              <th className="border border-gray-300 p-2 text-center">
                {t('freelancerOnline.accept', 'CHẤP NHẬN')}
                <div className="text-xs text-gray-500"><i>({t('freelancerOnline.acceptEn', 'Accept')})</i></div>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Table rows remain unchanged */}
            {
              filteredFreelancers.map((freelancer, index) => (
                <tr key={freelancer.id}>

              <td className="border border-gray-300 p-2 text-center">{freelancer.id}</td>
              <td className="border border-gray-300 p-2 text-center">
                {freelancer.name}

              </td>
              <td className="border border-gray-300 p-2 text-center">
                {freelancer.estimate}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {freelancer.requirement}

              </td>
              <td className="border border-gray-300 p-2 text-center">
                {freelancer.startTime}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {freelancer.endTime}

              </td>
              <td className="border border-gray-300 p-2 text-center">
                {freelancer.deposit}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {freelancer.price}

              </td>
              <td className="border border-gray-300 p-2 text-center">
                {freelancer.serviceFee}

              </td>
              <td className="border border-gray-300 p-2 text-center">
                <button onClick={() => handleAcceptFreelancer(freelancer.documentId)} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded">
                  {t('freelancerOnline.acceptButton', 'CHẤP NHẬN')}
                  <div className="text-xs text-white"><i>({t('freelancerOnline.acceptButtonEn', 'Accept')})</i></div>
                </button>
              </td>
            </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}