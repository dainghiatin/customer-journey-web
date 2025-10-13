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
            <div className="flex items-center">
              <input
                type="text"
                className="w-full mt-2 p-2 border border-gray-300 rounded"
                placeholder={t('newFreelancerDirect.jobNamePlaceholder', 'TÊN CÔNG VIỆC (Name of JOB)')}
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
              {/* ƯỚC LƯỢNG <span className="italic font-normal text-sm">(Estimate)</span> */}
            </div>
            <div className="flex items-center">
              <input
              type="text"
              className="w-full mt-2 p-2 border border-gray-300 rounded"
              placeholder={t('newFreelancerDirect.estimatePlaceholder', 'ƯỚC LƯỢNG, ĐƠN VỊ TÍNH (Estimate, Unit)')}
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
              HỒ SƠ / HÌNH ẢNH CÔNG VIỆC (Job profile / pictures)
            </div>
            <div className="flex items-center">
              <input
                type="file"
                className="w-full mt-2 p-2 border border-gray-300 rounded"
                placeholder={t('newFreelancerDirect.estimatePlaceholder', 'HỒ SƠ / HÌNH ẢNH CÔNG VIỆC (Job profile / pictures)')}
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
              {/* YÊU CẦU NHÂN LỰC, PHƯƠNG TIỆN <span className="italic font-normal text-sm">(Manpower, equipment requirement)</span> */}
            </div>
            <div className="flex items-center">
              <textarea
                className="w-full mt-2 p-2 border border-gray-300 rounded"
                rows="3"
                placeholder={t('newFreelancerDirect.requirementsPlaceholder', 'YÊU CẦU NHÂN LỰC, PHƯƠNG TIỆN (Manpower, equipment requirement)')}
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

        {/* Field 6: ĐỊA ĐIỂM */}
        <div className="grid grid-cols-12 border border-gray-300">
          <div className="col-span-1 border-r border-gray-300 p-2 flex items-center justify-center font-bold">
            6
          </div>
          <div className="col-span-11 p-2 space-y-4">
            <div>
              <div className="font-bold">
                {/* ĐỊA ĐIỂM NHẬN VIỆC <span className="italic font-normal text-sm">(Start location)</span> */}
              </div>
              <div className="flex items-center">
                <input
                  type="text"
                  className="w-full mt-2 p-2 border border-gray-300 rounded"
                  placeholder={t('newFreelancerDirect.startLocationPlaceholder', 'ĐỊA ĐIỂM NHẬN VIỆC (Start location)')}
                />
                <span className="text-red-500 font-bold ml-2 mt-2">*</span>
              </div>
            </div>
            <div>
              <div className="font-bold">
                {/* ĐỊA ĐIỂM HOÀN THÀNH <span className="italic font-normal text-sm">(Finish location)</span> */}
              </div>
              <div className="flex items-center">
                <input
                  type="text"
                  className="w-full mt-2 p-2 border border-gray-300 rounded"
                  placeholder={t('newFreelancerDirect.finishLocationPlaceholder', 'ĐỊA ĐIỂM HOÀN THÀNH (Finish location)')}
                />
                <span className="text-red-500 font-bold ml-2 mt-2">*</span>
              </div>
            </div>
          </div>
        </div>

        {/* Field 7: GIÁ */}
        <div className="grid grid-cols-12 border border-gray-300">
          <div className="col-span-1 border-r border-gray-300 p-2 flex items-center justify-center font-bold">
            7
          </div>
          <div className="col-span-3 p-2">
            <div className="font-bold">
              {t('newFreelancerDirect.price', 'GIÁ MONG MUỐN')} <span className="italic font-normal text-sm">({t('newFreelancerDirect.priceEn', 'AskingPrice')})</span>
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
            <div className="text-center w-full">VND <span className="text-red-500">*</span></div>
          </div>
        </div>

        {/* Field 8: VAT */}
        <div className="grid grid-cols-12 border border-gray-300">
          <div className="col-span-1 border-r border-gray-300 p-2 flex items-center justify-center font-bold">
            8
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

        {/* Field 9: THỜI LƯỢNG DUYỆT GIÁ */}
        <div className="grid grid-cols-12 border border-gray-300">
          <div className="col-span-1 border-r border-gray-300 p-2 flex items-center justify-center font-bold">
            9
          </div>
          <div className="col-span-3 p-2">
            <div className="font-bold">
              THỜI LƯỢNG DUYỆT GIÁ: <span className="italic font-normal text-sm">(Price review time)</span>
            </div>
          </div>
          <div className="col-span-4 border-l border-r border-gray-300 p-2 flex items-center">
            <input
              type="time"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Chọn giờ / phút"
            />
          </div>
          <div className="col-span-4 p-2 flex items-center">
            <div className="text-center w-full">Nhỏ hơn 24h <span className="text-red-500">*</span></div>
          </div>
        </div>

        {/* Field 10: ĐẶT CỌC 02 BÊN */}
        <div className="grid grid-cols-12 border border-gray-300">
          <div className="col-span-1 border-r border-gray-300 p-2 flex items-center justify-center font-bold">
            10
          </div>
          <div className="col-span-3 p-2">
            <div className="font-bold">
              ĐẶT CỌC, KÝ QUỸ 02 BÊN: <span className="italic font-normal text-sm">(Deposit)</span>
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
            <div className="text-center w-full">VND <span className="text-red-500">*</span></div>
          </div>
        </div>

        {/* Field 11: PHÍ KHÁC */}
        <div className="grid grid-cols-12 border border-gray-300">
          <div className="col-span-1 border-r border-gray-300 p-2 flex items-center justify-center font-bold">
            11
          </div>
          <div className="col-span-11 p-2 space-y-4">
            <div className="overflow-x-auto">
              <div className="min-w-max grid grid-cols-7 gap-2">
                {/* Dòng 1 */}
                <div className="font-bold border border-gray-300 p-3 bg-gray-50">PHÍ ĐĂNG KÝ SỰ KIỆN: <br />(Event fee)</div>
                <div className="border border-gray-300 p-2">
                  <input 
                    type="text" 
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="flex items-center justify-center border border-gray-300 p-3">%</div>
                <div className="flex items-center justify-center border border-gray-300 p-3">+</div>
                <div className="border border-gray-300 p-2">
                  <input 
                    type="text" 
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="flex items-center justify-center border border-gray-300 p-3">VNĐ</div>
                <div className="flex items-center justify-center border border-gray-300 p-3">TRẢ TRƯỚC <br />(Prepay)</div>
                
                {/* Khoảng cách giữa dòng 1 và 2 */}
                <div className="col-span-7 h-4"></div>
                
                {/* Dòng 2 */}
                <div className="font-bold border border-gray-300 p-3 bg-gray-50">PHÍ THÀNH CÔNG: <br />(Success fee)</div>
                <div className="border border-gray-300 p-2">
                  <input 
                    type="text" 
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="flex items-center justify-center border border-gray-300 p-3">%</div>
                <div className="flex items-center justify-center border border-gray-300 p-3 text-red-500 text-xl font-bold">*</div>
                <div className="border border-gray-300 p-3"></div>
                <div className="border border-gray-300 p-3"></div>
                <div className="border border-gray-300 p-3"></div>
                
                {/* Khoảng cách giữa dòng 2 và 3 */}
                <div className="col-span-7 h-4"></div>
                
                {/* Dòng 3 */}
                <div className="font-bold border border-gray-300 p-3 bg-gray-50">THUẾ + PHÍ KHÁC: <br />(VAT + Other fees)</div>
                <div className="flex items-center justify-center border border-gray-300 p-3">0</div>
                <div className="flex items-center justify-center border border-gray-300 p-3">%</div>
                <div className="border border-gray-300 p-3"></div>
                <div className="border border-gray-300 p-3"></div>
                <div className="border border-gray-300 p-3"></div>
                <div className="border border-gray-300 p-3"></div>
                
                {/* Khoảng cách giữa dòng 3 và 4 */}
                <div className="col-span-7 h-4"></div>
                
                {/* Dòng 4 */}
                <div className="font-bold border border-gray-300 p-3 bg-gray-50">TỔNG PHÍ + THUẾ <br />(Total fees + VAT)</div>
                <div className="border border-gray-300 p-2">
                  <input 
                    type="text" 
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="flex items-center justify-center border border-gray-300 p-3">%</div>
                <div className="flex items-center justify-center border border-gray-300 p-3">+</div>
                <div className="border border-gray-300 p-2">
                  <input 
                    type="text" 
                    className="w-full p-2 border border-gray-300 rounded"
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