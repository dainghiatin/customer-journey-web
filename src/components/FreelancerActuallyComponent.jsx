import React, { useState, useEffect } from "react";
import { handleAcceptFreelancer } from "../services/freelancerService";
import { useTranslation } from 'react-i18next';

export default function FreelancerActuallyComponent({freelancers}) {
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

  return (
    <div className="mt-4 border-2 border-orange-100 p-4">
      {/* Orange indicator bar at the top */}
      {/* <div className="bg-orange-500 text-white py-2 px-4 text-center mb-4">
        <span className="font-bold">THỰC TẾ</span>
        <span className="italic ml-2">(Actual)</span>
      </div> */}
      
      {/* Search input at the top */}
      <div className="mb-4">
        <input 
          type="text" 
          placeholder={t('freelancer.searchPlaceholder', 'TÌM KIẾM (Search): ID công việc, tên công việc')} 
          className="w-full p-2 border rounded" 
        />
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-center">{t('common.stt', 'STT')}</th>
              <th className="border border-gray-300 p-2 text-center">
                {t('freelancer.jobName', 'TÊN CÔNG VIỆC')}
                <div className="text-xs text-gray-500"><i>({t('freelancer.jobNameEn', 'Name of shift')})</i></div>
              </th>
              
              {/* Rest of the table headers remain unchanged */}
              <th className="border border-gray-300 p-2 text-center">
                {t('freelancer.estimate', 'ƯỚC LƯỢNG')}
                <div className="text-xs text-gray-500"><i>({t('freelancer.estimateEn', 'Estimate')})</i></div>
              </th>
              <th className="border border-gray-300 p-2 text-center">
                {t('freelancer.requirements', 'YÊU CẦU NHÂN LỰC, PHƯƠNG TIỆN')}
                <div className="text-xs text-gray-500"><i>({t('freelancer.requirementsEn', 'Manpower, equipment requirements')})</i></div>
              </th>
              <th className="border border-gray-300 p-2 text-center">
                THỜI GIAN NHẬN VIỆC
                <div className="text-xs text-gray-500"><i>(Start time)</i></div>
              </th>
              <th className="border border-gray-300 p-2 text-center">
                ĐỊA ĐIỂM NHẬN VIỆC
                <div className="text-xs text-gray-500"><i>(Start location)</i></div>
              </th>
              <th className="border border-gray-300 p-2 text-center">
                THỜI GIAN HOÀN THÀNH
                <div className="text-xs text-gray-500"><i>(Finish time)</i></div>
              </th>
              <th className="border border-gray-300 p-2 text-center">
                ĐỊA ĐIỂM HOÀN THÀNH
                <div className="text-xs text-gray-500"><i>(Finish location)</i></div>
              </th>
              <th className="border border-gray-300 p-2 text-center">
                ĐẶT CỌC 02 BÊN
                <div className="text-xs text-gray-500"><i>(Deposit)</i></div>
              </th>
              <th className="border border-gray-300 p-2 text-center">
                GIÁ ĐƯA RA
                <div className="text-xs text-gray-500"><i>(Asking price)</i></div>
              </th>
              <th className="border border-gray-300 p-2 text-center">
                ĐẶT GIÁ
                <div className="text-xs text-gray-500"><i>(Set price)</i></div>
              </th>
              <th className="border border-gray-300 p-2 text-center">
                CHẤP NHẬN
                <div className="text-xs text-gray-500"><i>(Accept)</i></div>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredFreelancers.map((freelancer, index) => (
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
                {freelancer.startDate}

              </td>
              <td className="border border-gray-300 p-2 text-center">
                {freelancer.startLocation}

              </td>
              <td className="border border-gray-300 p-2 text-center">
                {freelancer.endDate}

              </td>
              <td className="border border-gray-300 p-2 text-center">
                {freelancer.endLocation}
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
                  CHẤP NHẬN
                  <div className="text-xs text-white"><i>(Accept)</i></div>
                </button>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}