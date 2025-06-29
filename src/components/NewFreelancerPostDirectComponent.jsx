import React from "react";

const NewFreelancerPostDirectComponent = () => {
  return (
    <div className="mt-6 border-2 border-orange-100 p-4">
      <div className="space-y-4">
        {/* Orange indicator bar at the top */}
        <div className="bg-orange-500 text-white py-2 px-4 text-center mb-4">
          <span className="font-bold">THỰC TẾ</span>
          <span className="italic ml-2">(Actual)</span>
        </div>
        
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
              placeholder="TÊN CÔNG VIỆC (Name of JOB)"
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
              placeholder="ƯỚC LƯỢNG (Estimate)"
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
              placeholder="YÊU CẦU NHÂN LỰC, PHƯƠNG TIỆN (Manpower, equipment requirement)"
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
                THỜI GIAN NHẬN VIỆC <span className="italic font-normal text-sm">(Start time)</span>
              </div>
              <input
                type="datetime-local"
                className="w-full mt-2 p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <div className="font-bold">
                THỜI GIAN HOÀN THÀNH <span className="italic font-normal text-sm">(Finish time)</span>
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
                placeholder="ĐỊA ĐIỂM NHẬN VIỆC (Start location)"
              />
            </div>
            <div>
              <div className="font-bold">
                {/* ĐỊA ĐIỂM HOÀN THÀNH <span className="italic font-normal text-sm">(Finish location)</span> */}
              </div>
              <input
                type="text"
                className="w-full mt-2 p-2 border border-gray-300 rounded"
                placeholder="ĐỊA ĐIỂM HOÀN THÀNH (Finish location)"
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
              GIÁ <span className="italic font-normal text-sm">(Price)</span>
            </div>
          </div>
          <div className="col-span-4 border-l border-r border-gray-300 p-2 flex items-center">
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Nhập giá"
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
              ĐẶT CỌC 02 BÊN: <span className="italic font-normal text-sm">(Deposit)</span>
            </div>
          </div>
          <div className="col-span-4 border-l border-r border-gray-300 p-2 flex items-center">
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Nhập số tiền đặt cọc"
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
              PHÍ TRẢ SẢN: <span className="italic font-normal text-sm">(Service fee)</span>
            </div>
          </div>
          <div className="col-span-2 border-l border-r border-gray-300 p-2 flex items-center">
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Nhập %"
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
          <div className="border border-black px-16 py-2 text-center">
            <div className="font-bold">ĐĂNG BÀI</div>
            <div className="italic text-sm">(POST)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewFreelancerPostDirectComponent;