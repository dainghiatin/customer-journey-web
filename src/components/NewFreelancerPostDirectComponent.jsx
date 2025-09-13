import React, { useState } from "react";
import { createFreelancer } from "../services/freelancerService";
import { useTranslation } from "react-i18next";

const NewFreelancerPostDirectComponent = () => {
  const { t } = useTranslation();

  const [freelancerData, setFreelancerData] = useState({
        name: "John Doe",
        estimate: "Estimated completion in 2 weeks",
        requirement: "Need expertise in React and Node.js",
        startDate: "2023-12-01T09:00:00.000Z",
        endDate: "2023-12-15T18:00:00.000Z",
        startLocation: "New York",
        endLocation: "Remote",
        price: 2500.00,
        deposit: 500.00,
        serviceFee: 250.00,
        type: "offline" 
  });

  const handleSubmit = async (e) => {
    const token = localStorage.getItem("authToken");
    e.preventDefault();
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
    <div className="mt-6 border-2 border-orange-100 p-4">
      <div className="space-y-4">
        {/* Orange indicator bar at the top */}
        {/* <div className="bg-orange-500 text-white py-2 px-4 text-center mb-4">
          <span className="font-bold">THỰC TẾ</span>
          <span className="italic ml-2">(Actual)</span>
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
              placeholder={t('newFreelancerDirect.jobNamePlaceholder', 'TÊN CÔNG VIỆC (Name of JOB)')}
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
              placeholder={t('newFreelancerDirect.estimatePlaceholder', 'ƯỚC LƯỢNG (Estimate)')}
            />
          </div>
        </div>

        {/* Field 3: YÊU CẦU NHÂN LỰC, PHƯƠNG TIỆN */}
        <div className="grid grid-cols-12 border border-gray-300">
          <div className="col-span-1 border-r border-gray-300 p-2 flex items-center justify-center font-bold">
            3
          </div>
          <div className="col-span-11 p-2">
            <div className="font-bold">
              {/* YÊU CẦU NHÂN LỰC, PHƯƠNG TIỆN <span className="italic font-normal text-sm">(Manpower, equipment requirement)</span> */}
            </div>
            <textarea
              className="w-full mt-2 p-2 border border-gray-300 rounded"
              rows="3"
              placeholder={t('newFreelancerDirect.requirementsPlaceholder', 'YÊU CẦU NHÂN LỰC, PHƯƠNG TIỆN (Manpower, equipment requirement)')}
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
                {t('newFreelancerDirect.startTime', 'THỜI GIAN NHẬN VIỆC')} <span className="italic font-normal text-sm">({t('newFreelancerDirect.startTimeEn', 'Start time')})</span>
              </div>
              <input
                type="datetime-local"
                className="w-full mt-2 p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <div className="font-bold">
                {t('newFreelancerDirect.finishTime', 'THỜI GIAN HOÀN THÀNH')} <span className="italic font-normal text-sm">({t('newFreelancerDirect.finishTimeEn', 'Finish time')})</span>
              </div>
              <input
                type="datetime-local"
                className="w-full mt-2 p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
        </div>

        {/* Field 5: ĐỊA ĐIỂM */}
        <div className="grid grid-cols-12 border border-gray-300">
          <div className="col-span-1 border-r border-gray-300 p-2 flex items-center justify-center font-bold">
            5
          </div>
          <div className="col-span-11 p-2 space-y-4">
            <div>
              <div className="font-bold">
                {/* ĐỊA ĐIỂM NHẬN VIỆC <span className="italic font-normal text-sm">(Start location)</span> */}
              </div>
              <input
                type="text"
                className="w-full mt-2 p-2 border border-gray-300 rounded"
                placeholder={t('newFreelancerDirect.startLocationPlaceholder', 'ĐỊA ĐIỂM NHẬN VIỆC (Start location)')}
              />
            </div>
            <div>
              <div className="font-bold">
                {/* ĐỊA ĐIỂM HOÀN THÀNH <span className="italic font-normal text-sm">(Finish location)</span> */}
              </div>
              <input
                type="text"
                className="w-full mt-2 p-2 border border-gray-300 rounded"
                placeholder={t('newFreelancerDirect.finishLocationPlaceholder', 'ĐỊA ĐIỂM HOÀN THÀNH (Finish location)')}
              />
            </div>
          </div>
        </div>

        {/* Field 6: GIÁ */}
        <div className="grid grid-cols-12 border border-gray-300">
          <div className="col-span-1 border-r border-gray-300 p-2 flex items-center justify-center font-bold">
            6
          </div>
          <div className="col-span-3 p-2">
            <div className="font-bold">
              {t('newFreelancerDirect.price', 'GIÁ')} <span className="italic font-normal text-sm">({t('newFreelancerDirect.priceEn', 'Price')})</span>
            </div>
          </div>
          <div className="col-span-4 border-l border-r border-gray-300 p-2 flex items-center">
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder={t('newFreelancerDirect.pricePlaceholder', 'Nhập giá')}
            />
          </div>
          <div className="col-span-4 p-2 flex items-center">
            <div className="text-center w-full">VND</div>
          </div>
        </div>

        {/* Field 7: ĐẶT CỌC 02 BÊN */}
        <div className="grid grid-cols-12 border border-gray-300">
          <div className="col-span-1 border-r border-gray-300 p-2 flex items-center justify-center font-bold">
            7
          </div>
          <div className="col-span-3 p-2">
            <div className="font-bold">
              {t('newFreelancerDirect.deposit', 'ĐẶT CỌC 02 BÊN')}: <span className="italic font-normal text-sm">({t('newFreelancerDirect.depositEn', 'Deposit')})</span>
            </div>
          </div>
          <div className="col-span-4 border-l border-r border-gray-300 p-2 flex items-center">
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder={t('newFreelancerDirect.depositPlaceholder', 'Nhập số tiền đặt cọc')}
            />
          </div>
          <div className="col-span-4 p-2 flex items-center">
            <div className="text-center w-full">VND</div>
          </div>
        </div>

        {/* Field 8: PHÍ TRẢ SẢN */}
        <div className="grid grid-cols-12 border border-gray-300">
          <div className="col-span-1 border-r border-gray-300 p-2 flex items-center justify-center font-bold">
            8
          </div>
          <div className="col-span-3 p-2">
            <div className="font-bold">
              {t('newFreelancerDirect.serviceFee', 'PHÍ TRẢ SẢN')}: <span className="italic font-normal text-sm">({t('newFreelancerDirect.serviceFeeEn', 'Service fee')})</span>
            </div>
          </div>
          <div className="col-span-2 border-l border-r border-gray-300 p-2 flex items-center">
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder={t('newFreelancerDirect.percentagePlaceholder', 'Nhập %')}
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
          <button onClick={handleSubmit} className="border border-black px-16 py-2 text-center">
            <div className="font-bold">{t('newFreelancerDirect.postButton', 'ĐĂNG BÀI')}</div>
            <div className="italic text-sm">({t('newFreelancerDirect.postButtonEn', 'POST')})</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewFreelancerPostDirectComponent;