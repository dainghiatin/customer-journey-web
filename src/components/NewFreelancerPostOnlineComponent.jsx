import React, { useState } from "react";
import { createFreelancer } from "../services/freelancerService";
import { useTranslation } from "react-i18next";

const NewFreelancerPostOnlineComponent = () => {
  const { t } = useTranslation();

  const [freelancerData, setFreelancerData] = useState({
      name: "Rajiv Patel",
      estimate: "Estimated completion in 5 days",
      requirement: "IT network setup and security consultation for small office",
      startDate: "2025-08-10T09:00:00.000Z",
      endDate: "2025-08-14T17:00:00.000Z",
      startLocation: "Chicago",
      endLocation: "On-site",
      price: 3000.00,
      deposit: 700.00,
      serviceFee: 300.00,
      type: "online"
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    try {
      const response = await createFreelancer(token, freelancerData);
      console.log("Freelancer created successfully:", response.data);
      // Handle success, e.g., redirect to a success page
    } catch (error) {
      console.error("Error creating freelancer:", error.message);
      // Handle error, e.g., display an error message to the user
    }
  };
  return (
    <div className="mt-6 border-2 border-blue-100 p-4">
      <div className="space-y-4">
        {/* Blue indicator bar at the top */}
        {/* <div className="bg-blue-500 text-white py-2 px-4 text-center mb-4">
          <span className="font-bold">TRỰC TUYẾN</span>
          <span className="italic ml-2">(Online)</span>
        </div> */}
        
        {/* Field 1: TÊN CÔNG VIỆC */}
        <div className="grid grid-cols-12 border border-gray-300">
          <div className="col-span-1 border-r border-gray-300 p-2 flex items-center justify-center font-bold">
            1
          </div>
          <div className="col-span-11 p-2">
            <div className="font-bold">
              {/* TÊN CÔNG VIỆC <span className="italic font-normal text-sm">(Name of JOB)</span> */}
            </div>
            <input
              type="text"
              className="w-full mt-2 p-2 border border-gray-300 rounded"
              placeholder={t('newFreelancerOnline.jobNamePlaceholder', 'TÊN CÔNG VIỆC (Name of JOB)')}
            />
          </div>
        </div>

        {/* Rest of the fields remain unchanged */}
        {/* Field 2: ƯỚC LƯỢNG */}
        <div className="grid grid-cols-12 border border-gray-300">
          <div className="col-span-1 border-r border-gray-300 p-2 flex items-center justify-center font-bold">
            2
          </div>
          <div className="col-span-11 p-2">
            <div className="font-bold">
              {/* ƯỚC LƯỢNG <span className="italic font-normal text-sm">(Estimate)</span> */}
            </div>
            <input
              type="text"
              className="w-full mt-2 p-2 border border-gray-300 rounded"
              placeholder={t('newFreelancerOnline.estimatePlaceholder', 'ƯỚC LƯỢNG (Estimate)')}
            />
          </div>
        </div>

        {/* Field 3: YÊU CẦU NHÂN LỰC */}
        <div className="grid grid-cols-12 border border-gray-300">
          <div className="col-span-1 border-r border-gray-300 p-2 flex items-center justify-center font-bold">
            3
          </div>
          <div className="col-span-11 p-2">
            <div className="font-bold">
              {/* YÊU CẦU NHÂN LỰC <span className="italic font-normal text-sm">(Manpower equipment)</span> */}
            </div>
            <textarea
              className="w-full mt-2 p-2 border border-gray-300 rounded"
              rows="3"
              placeholder={t('newFreelancerOnline.requirementsPlaceholder', 'YÊU CẦU NHÂN LỰC (Manpower equipment)')}
            ></textarea>
          </div>
        </div>

        {/* Field 4: THỜI GIAN */}
        <div className="grid grid-cols-12 border border-gray-300">
          <div className="col-span-1 border-r border-gray-300 p-2 flex items-center justify-center font-bold">
            4
          </div>
          <div className="col-span-11 p-2 space-y-4">
            <div>
              <div className="font-bold">
                {t('newFreelancerOnline.startTime', 'THỜI GIAN NHẬN VIỆC')} <span className="italic font-normal text-sm">({t('newFreelancerOnline.startTimeEn', 'Start time')})</span>
              </div>
              <input
                type="datetime-local"
                className="w-full mt-2 p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <div className="font-bold">
                {t('newFreelancerOnline.finishTime', 'THỜI GIAN HOÀN THÀNH')} <span className="italic font-normal text-sm">({t('newFreelancerOnline.finishTimeEn', 'Finish time')})</span>
              </div>
              <input
                type="datetime-local"
                className="w-full mt-2 p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
        </div>

        {/* Field 5: GIÁ */}
        <div className="grid grid-cols-12 border border-gray-300">
          <div className="col-span-1 border-r border-gray-300 p-2 flex items-center justify-center font-bold">
            5
          </div>
          <div className="col-span-3 p-2">
            <div className="font-bold">
              {t('newFreelancerOnline.price', 'GIÁ')} <span className="italic font-normal text-sm">({t('newFreelancerOnline.priceEn', 'Price')})</span>
            </div>
          </div>
          <div className="col-span-4 border-l border-r border-gray-300 p-2 flex items-center">
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder={t('newFreelancerOnline.pricePlaceholder', 'Nhập giá')}
            />
          </div>
          <div className="col-span-4 p-2 flex items-center">
            <div className="text-center w-full">VND</div>
          </div>
        </div>

        {/* Field 6: ĐẶT CỌC 02 BÊN */}
        <div className="grid grid-cols-12 border border-gray-300">
          <div className="col-span-1 border-r border-gray-300 p-2 flex items-center justify-center font-bold">
            6
          </div>
          <div className="col-span-3 p-2">
            <div className="font-bold">
              {t('newFreelancerOnline.deposit', 'ĐẶT CỌC 02 BÊN')}: <span className="italic font-normal text-sm">({t('newFreelancerOnline.depositEn', 'Deposit')})</span>
            </div>
          </div>
          <div className="col-span-4 border-l border-r border-gray-300 p-2 flex items-center">
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder={t('newFreelancerOnline.depositPlaceholder', 'Nhập số tiền đặt cọc')}
            />
          </div>
          <div className="col-span-4 p-2 flex items-center">
            <div className="text-center w-full">VND</div>
          </div>
        </div>

        {/* Field 7: PHÍ TRẢ SẢN */}
        <div className="grid grid-cols-12 border border-gray-300">
          <div className="col-span-1 border-r border-gray-300 p-2 flex items-center justify-center font-bold">
            7
          </div>
          <div className="col-span-3 p-2">
            <div className="font-bold">
              {t('newFreelancerOnline.serviceFee', 'PHÍ TRẢ SẢN')}: <span className="italic font-normal text-sm">({t('newFreelancerOnline.serviceFeeEn', 'Service fee')})</span>
            </div>
          </div>
          <div className="col-span-2 border-l border-r border-gray-300 p-2 flex items-center">
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder={t('newFreelancerOnline.percentagePlaceholder', 'Nhập %')}
            />
          </div>
          <div className="col-span-2 border-r border-gray-300 p-2 flex items-center">
            <div className="text-center w-full">%</div>
          </div>
          <div className="col-span-2 border-r border-gray-300 p-2 flex items-center">
            <div className="text-center w-full">= ...............</div>
          </div>
          <div className="col-span-2 p-2 flex items-center">
            <div className="text-center w-full">VND</div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-8">
          <button onClick={handleSubmit} className="border border-black px-16 py-2 text-center cursor-pointer hover:bg-gray-100">
            <div className="font-bold">{t('newFreelancerOnline.postButton', 'ĐĂNG BÀI')}</div>
            <div className="italic text-sm">({t('newFreelancerOnline.postButtonEn', 'POST')})</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewFreelancerPostOnlineComponent;