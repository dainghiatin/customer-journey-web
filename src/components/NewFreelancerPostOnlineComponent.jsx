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
              {t('newFreelancerOnline.jobName', 'TÊN CÔNG VIỆC')} <span className="italic font-normal text-sm">({t('newFreelancerOnline.jobNameEn', 'Name of JOB')})</span>
            </div>
            <div className="flex items-center">
              <input
                type="text"
                className="w-full mt-2 p-2 border border-gray-300 rounded"
                placeholder={t('newFreelancerOnline.jobNamePlaceholder', 'TÊN CÔNG VIỆC (Name of JOB)')}
              />
              <span className="text-red-500 font-bold ml-2 mt-2">*</span>
            </div>
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
              {t('newFreelancerOnline.estimate', 'ƯỚC LƯỢNG')} <span className="italic font-normal text-sm">({t('newFreelancerOnline.estimateEn', 'Estimate')})</span>
            </div>
            <div className="flex items-center">
              <input
              type="text"
              className="w-full mt-2 p-2 border border-gray-300 rounded"
              placeholder={t('newFreelancerOnline.estimatePlaceholder', 'ƯỚC LƯỢNG, ĐƠN VỊ TÍNH (Estimate, Unit)')}
              />
              <span className="text-red-500 font-bold ml-2 mt-2">*</span>
            </div>
          </div>
        </div>

        {/* Field 3: ƯỚC LƯỢNG */}
        <div className="grid grid-cols-12 border border-gray-300">
          <div className="col-span-1 border-r border-gray-300 p-2 flex items-center justify-center font-bold">
            3
          </div>
          <div className="col-span-11 p-2">
            <div className="font-bold">
              {t('newFreelancerOnline.jobProfile', 'HỒ SƠ / HÌNH ẢNH CÔNG VIỆC')} <span className="italic font-normal text-sm">({t('newFreelancerOnline.jobProfileEn', 'Job profile / pictures')})</span>
            </div>
            <div className="flex items-center">
              <input
                type="file"
                className="w-full mt-2 p-2 border border-gray-300 rounded"
                placeholder={t('newFreelancerOnline.jobProfilePlaceholder', 'HỒ SƠ / HÌNH ẢNH CÔNG VIỆC (Job profile / pictures)')}
              />
              <span className="text-red-500 font-bold ml-2 mt-2">*</span>
            </div>
          </div>
        </div>

        {/* Field 4: YÊU CẦU NHÂN LỰC, PHƯƠNG TIỆN */}
        <div className="grid grid-cols-12 border border-gray-300">
          <div className="col-span-1 border-r border-gray-300 p-2 flex items-center justify-center font-bold">
            4
          </div>
          <div className="col-span-11 p-2">
            <div className="font-bold">
              {t('newFreelancerOnline.requirements', 'YÊU CẦU NHÂN LỰC, PHƯƠNG TIỆN')} <span className="italic font-normal text-sm">({t('newFreelancerOnline.requirementsEn', 'Manpower, equipment requirement')})</span>
            </div>
            <div className="flex items-center">
              <textarea
                className="w-full mt-2 p-2 border border-gray-300 rounded"
                rows="3"
                placeholder={t('newFreelancerOnline.requirementsPlaceholder', 'YÊU CẦU NHÂN LỰC, PHƯƠNG TIỆN (Manpower, equipment requirement)')}
              ></textarea>
              <span className="text-red-500 font-bold ml-2 mt-2">*</span>
            </div>

          </div>
        </div>

        {/* Field 5: THỜI GIAN */}
        <div className="grid grid-cols-12 border border-gray-300">
          <div className="col-span-1 border-r border-gray-300 p-2 flex items-center justify-center font-bold">
            5
          </div>
          <div className="col-span-11 p-2 space-y-4">
            <div>
              <div className="font-bold">
                {t('newFreelancerDirect.startTime', 'THỜI GIAN NHẬN VIỆC')} <span className="italic font-normal text-sm">({t('newFreelancerDirect.startTimeEn', 'Start time')})</span>
              </div>
              <div className="flex items-center">
                <input
                  type="datetime-local"
                  className="w-full mt-2 p-2 border border-gray-300 rounded"
                />
                <span className="text-red-500 font-bold ml-2 mt-2">*</span>
              </div>
            </div>
            <div>
              <div className="font-bold">
                {t('newFreelancerDirect.finishTime', 'THỜI GIAN HOÀN THÀNH')} <span className="italic font-normal text-sm">({t('newFreelancerDirect.finishTimeEn', 'Finish time')})</span>
              </div>
              <div className="flex items-center">
                <input
                  type="datetime-local"
                  className="w-full mt-2 p-2 border border-gray-300 rounded"
                />
                <span className="text-red-500 font-bold ml-2 mt-2">*</span>
              </div>
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
              {t('newFreelancerDirect.price', 'GIÁ MONG MUỐN')} <span className="italic font-normal text-sm">({t('newFreelancerDirect.priceEn', 'AskingPrice')})</span>
            </div>
          </div>
          <div className="col-span-4 border-l border-r border-gray-300 p-2 flex items-center">
            <input
              type="number"
              min="1"
              step="1"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder={t('newFreelancerDirect.pricePlaceholder', 'Nhập giá')}
              onKeyDown={(e) => {
                // Prevent negative sign, decimal point, and non-numeric characters
                if (e.key === '-' || e.key === '.' || e.key === 'e' || e.key === 'E' || e.key === '+') {
                  e.preventDefault();
                }
              }}
              onChange={(e) => {
                // Ensure only positive integers
                const value = e.target.value;
                if (value && (parseFloat(value) <= 0 || !Number.isInteger(parseFloat(value)))) {
                  e.target.value = '';
                }
              }}
            />
          </div>
          <div className="col-span-4 p-2 flex items-center">
            <div className="text-center w-full">{t('common.currency', 'VND')} <span className="text-red-500">*</span></div>
          </div>
        </div>

        {/* Field 7: VAT */}
        <div className="grid grid-cols-12 border border-gray-300">
          <div className="col-span-1 border-r border-gray-300 p-2 flex items-center justify-center font-bold">
            7
          </div>
          <div className="col-span-3 p-2">
            <div className="font-bold">
              HÓA ĐƠN GIÁ TRỊ GIA TĂNG <span className="italic font-normal text-sm">(VAT)</span>
            </div>
          </div>
          <div className="col-span-4 border-l border-r border-gray-300 p-2 flex items-center">
            <select
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="10">CÓ/YES</option>
              <option value="0">KHÔNG/NO</option>
            </select>
          </div>
          <div className="col-span-4 p-2 flex items-center">
            <div className="text-center w-full"> <span className="text-red-500">*</span></div>
          </div>
        </div>

        {/* Field 8: THỜI LƯỢNG DUYỆT GIÁ */}
        <div className="grid grid-cols-12 border border-gray-300">
          <div className="col-span-1 border-r border-gray-300 p-2 flex items-center justify-center font-bold">
            8
          </div>
          <div className="col-span-3 p-2">
            <div className="font-bold">
              {t('newFreelancerOnline.priceReviewTime', 'THỜI LƯỢNG DUYỆT GIÁ')}: <span className="italic font-normal text-sm">({t('newFreelancerOnline.priceReviewTimeEn', 'Price review time')})</span>
            </div>
          </div>
          <div className="col-span-4 border-l border-r border-gray-300 p-2 flex items-center">
            <input
              type="time"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder={t('newFreelancerOnline.timePickerPlaceholder', 'Chọn giờ / phút')}
            />
          </div>
          <div className="col-span-4 p-2 flex items-center">
            <div className="text-center w-full">{t('newFreelancerOnline.lessThan24h', 'Nhỏ hơn 24h')} <span className="text-red-500">*</span></div>
          </div>
        </div>

        {/* Field 9: ĐẶT CỌC 02 BÊN */}
        <div className="grid grid-cols-12 border border-gray-300">
          <div className="col-span-1 border-r border-gray-300 p-2 flex items-center justify-center font-bold">
            9
          </div>
          <div className="col-span-3 p-2">
            <div className="font-bold">
              {t('newFreelancerOnline.deposit', 'ĐẶT CỌC, KÝ QUỸ 02 BÊN')}: <span className="italic font-normal text-sm">({t('newFreelancerOnline.depositEn', 'Deposit')})</span>
            </div>
          </div>
          <div className="col-span-4 border-l border-r border-gray-300 p-2 flex items-center">
            <input
              type="number"
              min="1"
              step="1"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder={t('newFreelancerDirect.depositPlaceholder', 'Nhập số tiền đặt cọc')}
              onKeyDown={(e) => {
                // Prevent negative sign, decimal point, and non-numeric characters
                if (e.key === '-' || e.key === '.' || e.key === 'e' || e.key === 'E' || e.key === '+') {
                  e.preventDefault();
                }
              }}
              onChange={(e) => {
                // Ensure only positive integers
                const value = e.target.value;
                if (value && (parseFloat(value) <= 0 || !Number.isInteger(parseFloat(value)))) {
                  e.target.value = '';
                }
              }}
            />
          </div>
          <div className="col-span-4 p-2 flex items-center">
            <div className="text-center w-full">VND <span className="text-red-500">*</span></div>
          </div>
        </div>

        {/* Field 10: PHÍ KHÁC */}
        <div className="grid grid-cols-12 border border-gray-300">
          <div className="col-span-1 border-r border-gray-300 p-2 flex items-center justify-center font-bold">
            10
          </div>
          <div className="col-span-11 p-2 space-y-4">
            <div className="overflow-x-auto">
              <div className="min-w-max grid grid-cols-7 gap-2">
                {/* Dòng 1 */}
                <div className="font-bold border border-gray-300 p-3 bg-gray-50">{t('newFreelancerOnline.eventFee', 'PHÍ ĐĂNG KÝ SỰ KIỆN')}: <br />({t('newFreelancerOnline.eventFeeEn', 'Event fee')})</div>
                <div className="border border-gray-300 p-2">
                  <input 
                    type="number"
                    min="0"
                    step="1"
                    className="w-full p-2 border border-gray-300 rounded"
                    onKeyDown={(e) => {
                      // Prevent negative sign, decimal point, and non-numeric characters
                      if (e.key === '-' || e.key === '.' || e.key === 'e' || e.key === 'E' || e.key === '+') {
                        e.preventDefault();
                      }
                    }}
                    onChange={(e) => {
                      // Ensure only non-negative integers
                      const value = e.target.value;
                      if (value && (parseFloat(value) < 0 || !Number.isInteger(parseFloat(value)))) {
                        e.target.value = '';
                      }
                    }}
                  />
                </div>
                <div className="flex items-center justify-center border border-gray-300 p-3">{t('common.percent', '%')}</div>
                <div className="flex items-center justify-center border border-gray-300 p-3">{t('common.plus', '+')}</div>
                <div className="border border-gray-300 p-2">
                  <input 
                    type="number"
                    min="0"
                    step="1"
                    className="w-full p-2 border border-gray-300 rounded"
                    onKeyDown={(e) => {
                      // Prevent negative sign, decimal point, and non-numeric characters
                      if (e.key === '-' || e.key === '.' || e.key === 'e' || e.key === 'E' || e.key === '+') {
                        e.preventDefault();
                      }
                    }}
                    onChange={(e) => {
                      // Ensure only non-negative integers
                      const value = e.target.value;
                      if (value && (parseFloat(value) < 0 || !Number.isInteger(parseFloat(value)))) {
                        e.target.value = '';
                      }
                    }}
                  />
                </div>
                <div className="flex items-center justify-center border border-gray-300 p-3">{t('common.currency', 'VNĐ')}</div>
                <div className="flex items-center justify-center border border-gray-300 p-3">{t('newFreelancerOnline.prepay', 'TRẢ TRƯỚC')} <br />({t('newFreelancerOnline.prepayEn', 'Prepay')})</div>
                
                {/* Khoảng cách giữa dòng 1 và 2 */}
                <div className="col-span-7 h-4"></div>
                
                {/* Dòng 2 */}
                <div className="font-bold border border-gray-300 p-3 bg-gray-50">{t('newFreelancerOnline.successFee', 'PHÍ THÀNH CÔNG')}: <br />({t('newFreelancerOnline.successFeeEn', 'Success fee')})</div>
                <div className="border border-gray-300 p-2">
                  <input 
                    type="number"
                    min="0"
                    step="1"
                    className="w-full p-2 border border-gray-300 rounded"
                    onKeyDown={(e) => {
                      // Prevent negative sign, decimal point, and non-numeric characters
                      if (e.key === '-' || e.key === '.' || e.key === 'e' || e.key === 'E' || e.key === '+') {
                        e.preventDefault();
                      }
                    }}
                    onChange={(e) => {
                      // Ensure only non-negative integers
                      const value = e.target.value;
                      if (value && (parseFloat(value) < 0 || !Number.isInteger(parseFloat(value)))) {
                        e.target.value = '';
                      }
                    }}
                  />
                </div>
                <div className="flex items-center justify-center border border-gray-300 p-3">{t('common.percent', '%')}</div>
                <div className="flex items-center justify-center border border-gray-300 p-3 text-red-500 text-xl font-bold">*</div>
                <div className="border border-gray-300 p-3"></div>
                <div className="border border-gray-300 p-3"></div>
                <div className="border border-gray-300 p-3"></div>
                
                {/* Khoảng cách giữa dòng 2 và 3 */}
                <div className="col-span-7 h-4"></div>
                
                {/* Dòng 3 */}
                <div className="font-bold border border-gray-300 p-3 bg-gray-50">{t('newFreelancerOnline.taxOtherFees', 'THUẾ + PHÍ KHÁC')}: <br />({t('newFreelancerOnline.taxOtherFeesEn', 'VAT + Other fees')})</div>
                <div className="flex items-center justify-center border border-gray-300 p-3">0</div>
                <div className="flex items-center justify-center border border-gray-300 p-3">{t('common.percent', '%')}</div>
                <div className="border border-gray-300 p-3"></div>
                <div className="border border-gray-300 p-3"></div>
                <div className="border border-gray-300 p-3"></div>
                <div className="border border-gray-300 p-3"></div>
                
                {/* Khoảng cách giữa dòng 3 và 4 */}
                <div className="col-span-7 h-4"></div>
                
                {/* Dòng 4 */}
                <div className="font-bold border border-gray-300 p-3 bg-gray-50">{t('newFreelancerOnline.totalFeesVat', 'TỔNG PHÍ + THUẾ')} <br />({t('newFreelancerOnline.totalFeesVatEn', 'Total fees + VAT')})</div>
                <div className="border border-gray-300 p-2">
                  <input 
                    type="number"
                    min="0"
                    step="1"
                    className="w-full p-2 border border-gray-300 rounded"
                    onKeyDown={(e) => {
                      // Prevent negative sign, decimal point, and non-numeric characters
                      if (e.key === '-' || e.key === '.' || e.key === 'e' || e.key === 'E' || e.key === '+') {
                        e.preventDefault();
                      }
                    }}
                    onChange={(e) => {
                      // Ensure only non-negative integers
                      const value = e.target.value;
                      if (value && (parseFloat(value) < 0 || !Number.isInteger(parseFloat(value)))) {
                        e.target.value = '';
                      }
                    }}
                  />
                </div>
                <div className="flex items-center justify-center border border-gray-300 p-3">{t('common.percent', '%')}</div>
                <div className="flex items-center justify-center border border-gray-300 p-3">{t('common.plus', '+')}</div>
                <div className="border border-gray-300 p-2">
                  <input 
                    type="number"
                    min="0"
                    step="1"
                    className="w-full p-2 border border-gray-300 rounded"
                    onKeyDown={(e) => {
                      // Prevent negative sign, decimal point, and non-numeric characters
                      if (e.key === '-' || e.key === '.' || e.key === 'e' || e.key === 'E' || e.key === '+') {
                        e.preventDefault();
                      }
                    }}
                    onChange={(e) => {
                      // Ensure only non-negative integers
                      const value = e.target.value;
                      if (value && (parseFloat(value) < 0 || !Number.isInteger(parseFloat(value)))) {
                        e.target.value = '';
                      }
                    }}
                  />
                </div>
                <div className="flex items-center justify-center border border-gray-300 p-3">VNĐ</div>
                <div className="flex items-center justify-center border border-gray-300 p-3">TRẢ TRƯỚC <br />(Prepay)</div>
              </div>
            </div>
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