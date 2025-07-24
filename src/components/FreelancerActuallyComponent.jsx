import React from "react";

export default function FreelancerActuallyComponent() {
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
          placeholder="TÌM KIẾM (Search): ID công việc, tên công việc" 
          className="w-full p-2 border rounded" 
        />
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-center">STT</th>
              <th className="border border-gray-300 p-2 text-center">
                TÊN CÔNG VIỆC
                <div className="text-xs text-gray-500"><i>(Name of shift)</i></div>
              </th>
              
              {/* Rest of the table headers remain unchanged */}
              <th className="border border-gray-300 p-2 text-center">
                ƯỚC LƯỢNG
                <div className="text-xs text-gray-500"><i>(Estimate)</i></div>
              </th>
              <th className="border border-gray-300 p-2 text-center">
                YÊU CẦU NHÂN LỰC, PHƯƠNG TIỆN
                <div className="text-xs text-gray-500"><i>(Manpower, equipment requirements)</i></div>
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
            <tr>
              <td className="border border-gray-300 p-2 text-center">1</td>
              <td className="border border-gray-300 p-2 text-center">
                Vận chuyển hàng hóa
              </td>
              <td className="border border-gray-300 p-2 text-center">
                2.500.000 VNĐ
              </td>
              <td className="border border-gray-300 p-2 text-center">
                2 người, xe tải 1.5 tấn
              </td>
              <td className="border border-gray-300 p-2 text-center">
                08:00 15/07/2023
              </td>
              <td className="border border-gray-300 p-2 text-center">
                Quận 1, TP.HCM
              </td>
              <td className="border border-gray-300 p-2 text-center">
                17:00 15/07/2023
              </td>
              <td className="border border-gray-300 p-2 text-center">
                Quận 7, TP.HCM
              </td>
              <td className="border border-gray-300 p-2 text-center">
                500.000 VNĐ
              </td>
              <td className="border border-gray-300 p-2 text-center">
                2.800.000 VNĐ
              </td>
              <td className="border border-gray-300 p-2 text-center">
                2.600.000 VNĐ
              </td>
              <td className="border border-gray-300 p-2 text-center">
                <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded">
                  CHẤP NHẬN
                  <div className="text-xs text-white"><i>(Accept)</i></div>
                </button>
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 text-center">2</td>
              <td className="border border-gray-300 p-2 text-center">
                Lắp đặt thiết bị điện
              </td>
              <td className="border border-gray-300 p-2 text-center">
                1.800.000 VNĐ
              </td>
              <td className="border border-gray-300 p-2 text-center">
                3 thợ điện, dụng cụ chuyên dụng
              </td>
              <td className="border border-gray-300 p-2 text-center">
                09:30 20/07/2023
              </td>
              <td className="border border-gray-300 p-2 text-center">
                Quận 2, TP.HCM
              </td>
              <td className="border border-gray-300 p-2 text-center">
                16:30 21/07/2023
              </td>
              <td className="border border-gray-300 p-2 text-center">
                Quận 2, TP.HCM
              </td>
              <td className="border border-gray-300 p-2 text-center">
                400.000 VNĐ
              </td>
              <td className="border border-gray-300 p-2 text-center">
                2.000.000 VNĐ
              </td>
              <td className="border border-gray-300 p-2 text-center">
                1.900.000 VNĐ
              </td>
              <td className="border border-gray-300 p-2 text-center">
                <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded">
                  CHẤP NHẬN
                  <div className="text-xs text-white"><i>(Accept)</i></div>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}