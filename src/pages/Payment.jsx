import React, { useState, useEffect } from "react";

const PaymentPage = () => {
  const [color, setColor] = useState(localStorage.getItem("selectedColor"));
  const [expanded, setExpanded] = useState(false);

  const handleChangeColor = (e) => {
    const newColor = e.target.value;
    setColor(newColor);
    localStorage.setItem("selectedColor", newColor);
  };

  useEffect(() => {
    document.getElementById("root").style.backgroundColor = color;
  }, [color]);
  return (
    <div className="flex justify-center py-8 px-4">
      <div className="w-full max-w-4xl shadow-lg rounded">
        {/* Header */}
        <div className="text-center border-blue-800 py-2 bg-gray-50">
          <h1 className="text-lg font-bold inline">9 - GIAO DỊCH THANH TOÁN</h1>
          <h1 className="text-sm italic ml-2">(PAYMENT TRANSACTION)</h1>
        </div>
        {/* Main Content */}
        <div>
          {/* MÃ QR Row */}
          <div className="grid grid-cols-8">
            <div className="col-span-1 p-2 font-bold text-sm">
              MÃ QR:
            </div>
            <div className="col-span-7"></div>
          </div>

          {/* Main Transaction Grid */}
          <div className="grid grid-cols-10 text-center text-sm">
            {/* Cột cố định bên trái */}
            <div className="col-span-2 row-span-4 border p-2 font-bold flex flex-col items-start justify-center text-center">
              Ví <br /> <i>Wallet</i>
            </div>
            <div className="col-span-1 row-span-4 border p-2 flex flex-col items-center justify-center">
              (lệnh)
            </div>
            <div className="col-span-1 row-span-4 border p-2 flex flex-col items-center justify-center">
              VNĐ
            </div>
            <div className="col-span-1 row-span-4 border p-2 flex flex-col items-center justify-center">
              CHUYỂN <br />
              <i>(TRANSFER)</i>
            </div>

            {/* Dòng 1: Header của phần nhập tiền và đích đến */}
            <div className="col-span-1 border p-2">(nhập số tiền)</div>
            <div className="col-span-1 border p-2 font-bold">
              ĐẾN <br />
              <i>To</i>
            </div>
            <div className="col-span-2 grid grid-cols-3 border">
              <div className="border p-2">(nhập ID)</div>
              <div className="border p-2">(danh bạ)</div>
              <div className="border p-2">(quét QR)</div>
            </div>

            <div className="col-span-1 row-span-4 border p-2 font-bold flex flex-col items-center justify-center text-center">
              CHẤP NHẬN
              <i>(ACCEPT)</i>
            </div>

            {/* Hàng 2: Tài khoản HÀNG HÓA */}
            <div className="col-span-1 border p-2">(nhập số tiền)</div>
            <div className="col-span-1 border p-2 font-bold">
              ĐẾN <br />
              <i>To</i>
            </div>
            <div className="col-span-2 border p-2">
              TÀI KHOẢN HÀNG HÓA <br />
              <i>(Account of Goods)</i>
            </div>

            {/* Hàng 3: Tài khoản CÔNG VIỆC TỰ DO */}
            <div className="col-span-1 border p-2">(nhập số tiền)</div>
            <div className="col-span-1 border p-2 font-bold">
              ĐẾN <br />
              <i>To</i>
            </div>
            <div className="col-span-2 border p-2">
              TÀI KHOẢN CÔNG VIỆC TỰ DO <br />
              <i>(Account of Freelancer)</i>
            </div>

            {/* Hàng 4: Tài khoản Ai LIVE */}
            <div className="col-span-1 border p-2">(nhập số tiền)</div>
            <div className="col-span-1 border p-2 font-bold">
              ĐẾN <br />
              <i>To</i>
            </div>
            <div className="col-span-2 border p-2">
              TÀI KHOẢN AI LIVE <br />
              <i>(Account of AI LIVE)</i>
            </div>
          </div>

          <div>
            {/* First Row */}
            <div className="grid grid-cols-10 border-blue-800 mb-10">
              <div className="col-span-2 border-blue-800 p-2 text-sm">
                GỬI THÊM:
                <div>
                  <i>(INPUT ADDITION)</i>
                </div>
                RÚT RA:
                <div>
                  <i>(WITHDRAWNTH)</i>
                </div>
              </div>
              <div className="col-span-1 border-blue-800 p-2 text-sm text-center">
                (nhập)
              </div>
              <div className="col-span-1 border-blue-800 p-2 text-sm text-center">
                VNĐ
              </div>
              <div className="col-span-1">
                <div className="border-3 border-black font-bold rounded cursor-pointer hover:bg-white-100 text-center">
                  CHẤP NHẬN (ACCEPT)
                </div>
              </div>
            </div>
          </div>
          {/* Middle Section */}
          <div>
            {/* First Row */}
            <div className="grid grid-cols-10 border-blue-800">
              <div className="col-span-2  border-blue-800 p-2 font-bold text-sm">
                TÀI KHOẢN HÀNG HÓA
                <div className="text-xs italic">(GOODS ACCOUNT)</div>
              </div>
              <div className="col-span-1  border-blue-800 p-2 text-sm text-center">
                (tiền)
              </div>
              <div className="col-span-1  border-blue-800 p-2 text-sm text-center">
                VNĐ
              </div>
              <div className="col-span-5"></div>
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-10 border-blue-800">
              <div className="col-span-2  border-blue-800 p-2 font-bold text-sm">
                ID HÀNG HÓA:
                <div className="text-xs italic">(ID OF GOODS)</div>
              </div>
              <div className="col-span-1  border-blue-800 p-2 text-sm text-center">
                (chọn)
              </div>
              <div className="col-span-1  border-blue-800 p-2 text-sm text-center">
                VNĐ
              </div>
              <div className="col-span-5"></div>
            </div>

            {/* Third Row */}
            <div className="grid grid-cols-10 border-blue-800">
              <div className="col-span-2  border-blue-800 p-2 font-bold text-sm">
                BAN ĐẦU:
                <div className="text-xs italic">(FOLLOW GOODS'S ID)</div>
              </div>
              <div className="col-span-1  border-blue-800 p-2 text-sm text-center">
                (tiền)
              </div>
              <div className="col-span-1  border-blue-800 p-2 text-sm text-center">
                VNĐ
              </div>
              <div className="col-span-5"></div>
            </div>

            {/* Fourth Row */}
            <div className="grid grid-cols-10 border-blue-800">
              <div className="col-span-2  border-blue-800 p-2 font-bold text-sm">
                THỰC TẾ:
                <div className="text-xs italic">(ACTUAL)</div>
              </div>
              <div className="col-span-1  border-blue-800 p-2 text-sm text-center text-center">
                (nhập)
              </div>
              <div className="col-span-1  border-blue-800 p-2 text-sm text-center">
                (BBBG) (Handover)
              </div>
              <div className="col-span-5"></div>
            </div>

            {/* Fifth Row */}
            <div className="grid grid-cols-10 border-blue-800">
              <div className="col-span-2  border-blue-800 p-2 font-bold text-sm">
                ĐẶT CỌC:
                <div className="text-xs italic">(DEPOSIT)</div>
              </div>
              <div className="col-span-1  border-blue-800 p-2 text-sm text-center">
                (lệnh)
              </div>
              <div className="col-span-1  border-blue-800 p-2 text-sm text-center">
                VNĐ
              </div>
              <div className="col-span-5"></div>
            </div>

            {/* Sixth Row */}
            <div className="grid grid-cols-10 border-blue-800">
              <div className="col-span-2  border-blue-800 p-2 font-bold text-sm">
                CÒN LẠI
                <div className="text-xs italic">(ADDITION TO PAY)</div>
              </div>
              <div className="col-span-1  border-blue-800 p-2 text-sm text-center">
                (lệnh)
              </div>
              <div className="col-span-1  border-blue-800 p-2 text-sm text-center">
                VNĐ
              </div>
              <div className="col-span-5"></div>
            </div>

            {/* Confirm Button */}
            <div className="grid grid-cols-8 border-blue-800">
              <div className="col-span-1"></div>
              <div className="col-span-2 flex justify-end my-4">
                <button className="border-3 px-6 py-2 font-bold rounded">
                  XÁC NHẬN
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-2 gap-2 p-2">
            {/* Left Bottom */}
            <div className="grid gap-5 border-black-800 pr-2">
              <div className="border-3 p-3 font-bold text-center rounded-lg">
                NHẬN HÀNG VÀ THANH TOÁN
                <div className="text-xs italic">
                  (RECEIVE GOODS AND PAYMENT)
                </div>
              </div>
              <div className="border-3 p-3 font-bold text-center rounded-lg">
                TRẢ LẠI HÀNG VÀ BƯỚC CỌC
                <div className="text-xs italic">
                  (RETURN GOODS AND TAKE DEPOSIT)
                </div>
              </div>
            </div>

            {/* Right Bottom */}
            <div className="grid gap-5 pl-2">
              <div className="border-3 p-3 font-bold text-center rounded-lg">
                GIAO HÀNG VÀ NHẬN THANH TOÁN
                <div className="text-xs italic">
                  (DELIVERY GOODS AND RECEIVE PAYMENT)
                </div>
              </div>
              <div className="border-3 p-3 font-bold text-center rounded-lg">
                NHẬN LẠI HÀNG VÀ BƯỚC CỌC
                <div className="text-xs italic">
                  (RETURN GOODS AND LOST DEPOSIT)
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="grid grid-cols-8 border-t border-black-800">
            <div className="col-span-1 border-r border-black-800 p-2 font-bold text-sm">
              LÝ DO:
              <div className="text-xs italic">(REASON)</div>
            </div>
            <div className="col-span-7">
              <input type="text" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
