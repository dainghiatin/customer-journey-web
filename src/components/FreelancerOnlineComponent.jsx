import React from "react";

export default function FreelancerOnlineComponent() {
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
                THỜI GIAN HOÀN THÀNH
                <div className="text-xs text-gray-500"><i>(Finish time)</i></div>
              </th>
              <th className="border border-gray-300 p-2 text-center">
                ĐẶT CỌC Ở BÊN
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
            {/* Table rows remain unchanged */}
            <tr>
              <td className="border border-gray-300 p-2 text-center">1</td>
              <td className="border border-gray-300 p-2 text-center">
                Thiết kế website
              </td>
              <td className="border border-gray-300 p-2 text-center">
                5.000.000 VNĐ
              </td>
              <td className="border border-gray-300 p-2 text-center">
                1 lập trình viên, kinh nghiệm React
              </td>
              <td className="border border-gray-300 p-2 text-center">
                10:00 18/07/2023
              </td>
              <td className="border border-gray-300 p-2 text-center">
                15:00 25/07/2023
              </td>
              <td className="border border-gray-300 p-2 text-center">
                1.000.000 VNĐ
              </td>
              <td className="border border-gray-300 p-2 text-center">
                5.500.000 VNĐ
              </td>
              <td className="border border-gray-300 p-2 text-center">
                5.200.000 VNĐ
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
                Dịch tài liệu Anh-Việt
              </td>
              <td className="border border-gray-300 p-2 text-center">
                1.200.000 VNĐ
              </td>
              <td className="border border-gray-300 p-2 text-center">
                1 biên dịch viên, chuyên ngành kỹ thuật
              </td>
              <td className="border border-gray-300 p-2 text-center">
                08:00 19/07/2023
              </td>
              <td className="border border-gray-300 p-2 text-center">
                17:00 22/07/2023
              </td>
              <td className="border border-gray-300 p-2 text-center">
                300.000 VNĐ
              </td>
              <td className="border border-gray-300 p-2 text-center">
                1.500.000 VNĐ
              </td>
              <td className="border border-gray-300 p-2 text-center">
                1.300.000 VNĐ
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