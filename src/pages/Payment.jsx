import React, { useState, useEffect } from "react";
import { getFavoriteWallets, getWalletFromToken } from "../services/walletService";
import { data } from "react-router-dom";

const PaymentPage = () => {
  const [color, setColor] = useState(localStorage.getItem("selectedColor"));
  const [expanded, setExpanded] = useState(false);

  const [wallet, setWallet] = useState({
    total: 0,
    account_of_goods: 0,
    account_of_freelancer: 0,
    account_of_ailive: 0,
    pending_amount: 0
  })

  const [favorites, setFavorites] = useState([
    {
      id: 0,
      cccd: "(danh bạ)"
    }
  ])

  const [favoriteWalletSelected, setFavoriteWalletSelected] = useState(favorites[0])

  const handleChangeColor = (e) => {
    const newColor = e.target.value;
    setColor(newColor);
    localStorage.setItem("selectedColor", newColor);
  };

  useEffect(() => {
    document.getElementById("root").style.backgroundColor = color;
  }, [color]);

  useEffect(()=>{
    const token = localStorage.getItem("authToken");
    getWalletFromToken(token).then((res)=>{
      setWallet(res.data)
    }).catch((err)=>{
      console.log(err);
    })
    getFavoriteWallets(token).then((res)=>{
      setFavorites([...favorites, ...res.data?.wallets])
      console.log(res.data?.wallets);
      
    }).catch((err)=>{
      console.log(err);
    })

  },[])

  return (
    <div className="flex justify-center py-8 px-4">
      <div className="w-full max-w-4xl shadow-lg rounded">
        {/* Header */}
        <div className="text-center border-blue-800 py-2 relative">
          <h1 className="text-3xl font-bold inline-block relative">
            <span className="relative inline-block">
              9{/* input màu nằm dưới số 9 */}
              <input
                type="color"
                value={color}
                onChange={handleChangeColor}
                className="absolute left-1/2 transform -translate-x-1/2 top-full mt-1 w-10 h-8 cursor-pointer"
              />
            </span>
            &nbsp;- GIAO DỊCH THANH TOÁN
          </h1>

          <h2 className="text-2xl text-black mt-2">
            <i>(Payment Transaction)</i>
          </h2>
        </div>

        {/* Main Content */}
        <div>
          {/* MÃ QR Row */}
          <div className="grid grid-cols-8">
            <div className="col-span-1 p-2 font-bold text-sm">MÃ QR:</div>
            <div className="col-span-7"></div>
          </div>

          {/* Main Transaction Grid */}
          <div className="grid grid-cols-10 text-center text-sm">
            {/* Cột cố định bên trái */}
            <div className="col-span-2 row-span-4 border p-2 font-bold flex flex-col items-start justify-center text-center">
              Ví <br /> <i>Wallet</i>
            </div>
            <div className="col-span-1 row-span-4 border p-2 flex flex-col items-center justify-center">
              {wallet?.total}
            </div>
            <div className="col-span-1 row-span-4 border p-2 flex flex-col items-center justify-center">
              VNĐ
            </div>
          </div>
          <div className="grid grid-cols-6 text-center text-sm">
            <div className="col-span-1 row-span-4 border p-2 font-bold flex flex-col items-center justify-center text-center">
              CHUYỂN <br />
              <i>(Transfer)</i>
            </div>

            <div className="col-span-1 border p-2 flex flex-col items-center">
              <input
                type="text"
                placeholder="(nhập số tiền)"
                className="w-20 h-10 text-center"
              />
              <span className="text-xs text-gray-500 mt-1 italic">(Amount)</span>
            </div>

            <div className="col-span-1 border p-2 font-bold">
              ĐẾN <br />
              <i>To</i>
            </div>
            <div className="col-span-2 grid grid-cols-3 border">
              <div className="border p-2">(nhập ID)</div>
              {/* <div className="border p-2">(danh bạ)</div> */}
              <select className="border p-2" 
              value={favoriteWalletSelected.id}
              defaultValue={0}
              onChange={(e)=>setFavoriteWalletSelected(e.target.value)}
              >
                {favorites?.map((wallet) => (
                    <option key={wallet.id} value={wallet.id}>
                        {wallet.cccd}
                    </option>
                ))}
                </select>
              <div className="border p-2">(quét QR)</div>
            </div>

            <div className="col-span-1 row-span-4 border p-2 font-bold flex flex-col items-center justify-center text-center">
              CHẤP NHẬN
              <i>(ACCEPT)</i>
            </div>

            {/* Hàng 2: Tài khoản HÀNG HÓA */}
            <div className="col-span-1 border p-2 flex flex-col items-center">
              <input
                type="text"
                placeholder="(nhập số tiền)"
                className="w-20 h-10 text-center"
              />
              <span className="text-xs text-gray-500 mt-1 italic">(Amount)</span>
            </div>
            <div className="col-span-1 border p-2 font-bold">
              ĐẾN <br />
              <i>To</i>
            </div>
            <div className="col-span-2 border p-2">
              TÀI KHOẢN HÀNG HÓA <br />
              <i>(Account of Goods)</i>
            </div>

            {/* Hàng 3: Tài khoản CÔNG VIỆC TỰ DO */}
            <div className="col-span-1 border p-2 flex flex-col items-center">
              <input
                type="text"
                placeholder="(nhập số tiền)"
                className="w-20 h-10 text-center"
              />
              <span className="text-xs text-gray-500 mt-1 italic">(Amount)</span>
            </div>
            <div className="col-span-1 border p-2 font-bold">
              ĐẾN <br />
              <i>To</i>
            </div>
            <div className="col-span-2 border p-2">
              TÀI KHOẢN CÔNG VIỆC TỰ DO <br />
              <i>(Account of Freelancer)</i>
            </div>

            {/* Hàng 4: Tài khoản Ai LIVE */}
            <div className="col-span-1 border p-2 flex flex-col items-center">
              <input
                type="text"
                placeholder="(nhập số tiền)"
                className="w-20 h-10 text-center"
              />
              <span className="text-xs text-gray-500 mt-1 italic">(Amount)</span>
            </div>
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
                {/* GỬI THÊM:
                <div>
                  <i>(INPUT ADDITION)</i>
                </div>
                RÚT RA:
                <div>
                  <i>(WITHDRAWNTH)</i>
                </div> */}
                <select name="" id="" className="h-full">
                  <option value="">GỬI THÊM (Input addition)</option>
                  <option value="">RÚT RA (Withdrawnth)</option>
                </select>
              </div>
              <div className="col-span-1 border-blue-800 p-2 text-sm text-center">
                <input
                  type="text"
                  placeholder="(nhập số tiền)"
                  className="h-full"
                />
              </div>
              <div className="col-span-1 border-blue-800 p-2 text-sm text-center h-full flex items-center justify-center">
                VNĐ
              </div>
              <div className="col-span-1">
                <div className="border-3 border-black font-bold rounded cursor-pointer hover:bg-white-100 text-center">
                  CHẤP NHẬN (Accept)
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
                <div className="text-xs italic">(Goods account)</div>
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
                <div className="text-xs italic">(ID of goods)</div>
              </div>
              <div className="col-span-1  border-blue-800 p-2 text-sm text-center">
                <select name="" id="" className="border">
                  <option value="">(Chọn)</option>
                  <option value="">1</option>
                  <option value="">2</option>
                  <option value="">3</option>
                </select>
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
                <div className="text-xs italic">(Follow goods's ID)</div>
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
                <div className="text-xs italic">(Actual)</div>
              </div>
              <div className="col-span-1  border-blue-800 p-2 text-sm text-center text-center">
                <input
                  type="text"
                  placeholder="(nhập số tiền)"
                  className="w-10 h-10"
                />
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
                <div className="text-xs italic">(Deposit)</div>
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
                <div className="text-xs italic">(Addition to pay)</div>
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
                  <div className="text-xs italic">(Accept)</div>
                </button>
              </div>
            </div>
            {/* Sixth Row */}
            <div className="grid grid-cols-10 border-blue-800">
              <div className="col-span-2  border-blue-800 p-2 font-bold text-sm">
                SỐ TIỀN ĐANG KHÓA
                <div className="text-xs italic">(Pending)</div>
              </div>
              <div className="col-span-1  border-blue-800 p-2 text-sm text-center">
                (lệnh)
              </div>
              <div className="col-span-1  border-blue-800 p-2 text-sm text-center">
                VNĐ
              </div>
              <div className="col-span-5"></div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-2 gap-2 p-2">
            {/* Left Bottom */}
            <div className="grid gap-5 border-black-800 pr-2">
              <div className="border-3 p-3 font-bold text-center rounded-lg">
                NHẬN HÀNG VÀ THANH TOÁN
                <div className="text-xs italic">
                  (Receive goods and payment)
                </div>
              </div>
              <div className="border-3 p-3 font-bold text-center rounded-lg">
                TRẢ LẠI HÀNG VÀ ĐƯỢC CỌC
                <div className="text-xs italic">
                  (Return goods and take deposit)
                </div>
              </div>
            </div>

            {/* Right Bottom */}
            <div className="grid gap-5 pl-2">
              <div className="border-3 p-3 font-bold text-center rounded-lg">
                GIAO HÀNG VÀ NHẬN THANH TOÁN
                <div className="text-xs italic">
                  (Delivery goods and receive payment)
                </div>
              </div>
              <div className="border-3 p-3 font-bold text-center rounded-lg">
                NHẬN LẠI HÀNG VÀ BÙ CỌC
                <div className="text-xs italic">
                  (Return goods and lost deposit)
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="grid grid-cols-8 border-t border-black-800">
            <div className="col-span-1 border-r border-black-800 p-2 font-bold text-sm">
              LÝ DO:
              <div className="text-xs italic">(Reason)</div>
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
