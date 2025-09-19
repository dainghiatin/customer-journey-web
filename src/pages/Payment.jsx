import React, { useState, useEffect } from "react";
import { getFavoriteWallets, getWalletFromToken } from "../services/walletService";
import { data, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import {
  Home as HomeIcon,
  Settings as SettingsIcon,
} from "lucide-react";

const GoodsPaymentPage = () => {
  const { t } = useTranslation();
  return (<>
    <div>
      <div className="grid grid-cols-10 border-blue-800">
        <div className="col-span-2  border-blue-800 p-2 font-bold text-sm">
          {t('payment.goodsAccount', 'TÀI KHOẢN HÀNG HÓA')}
          <div className="text-xs italic">({t('payment.goodsAccountEn', 'Goods account')})</div>
        </div>
        <div className="col-span-1  border-blue-800 p-2 text-sm text-center">
          ({t('payment.money', 'tiền')})
        </div>
        <div className="col-span-1  border-blue-800 p-2 text-sm text-center">
          VNĐ
        </div>
        <div className="col-span-1"></div>
        <div className="col-span-2">
          <button className="border-1 px-6 py-2 font-bold rounded text-sm">
            {t('payment.transferToWallet', 'CHUYỂN VỀ VÍ')} 
            <br />
            ({t('payment.transferToWalletEn', 'Transfer to wallet')})
          </button>
        </div>
      </div>
      <div className="grid grid-cols-10 border-blue-800">
        <div className="col-span-4">
          <select name="" id="" className="border w-full">
            <option value="">
              {t('payment.posted', 'BÀI ĐĂNG')} <br/>
              ({t('payment.postedEn', 'POSTED')})
            </option>
            <option value="">{t('payment.joined', 'BÀI THAM GIA')} ({t('payment.joinedEn', 'JOINED')})</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-10 border-blue-800">
        <div className="col-span-2  border-blue-800 p-2 font-bold text-sm">
          {t('payment.acceptingDeposit', 'ĐANG NHẬN CỌC')}:
          <div className="text-xs italic">({t('payment.acceptingDepositEn', 'Accepting deposit')})</div>
        </div>
        <div className="col-span-1  border-blue-800 p-2 text-sm text-center">
          (tiền)
        </div>
        <div className="col-span-1  border-blue-800 p-2 text-sm text-center">
          VNĐ
        </div>
        <div className="col-span-5"></div>
      </div>
      <div className="grid grid-cols-10 border-blue-800">
        <div className="col-span-2  border-blue-800 p-2 font-bold text-sm">
          {t('payment.goodsId', 'ID HÀNG HÓA')}:
          <div className="text-xs italic">({t('payment.goodsIdEn', 'ID of goods')})</div>
        </div>

        <div className="col-span-1  border-blue-800 p-2 text-sm text-center">
          <select name="" id="" className="border">
            <option value="">({t('payment.select', 'Chọn')})</option>
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
      <div className="grid grid-cols-10 border-blue-800">
        <div className="col-span-2  border-blue-800 p-2 font-bold text-sm">
          {t('payment.status', 'TRẠNG THÁI')}:
          <div className="text-xs italic">({t('payment.statusEn', 'status')})</div>
        </div>

        <div className="col-span-1  border-blue-800 p-2 text-sm text-center">
          ({t('payment.command', 'lệnh')})
        </div>
       
        <div className="col-span-5"></div>
      </div>

      <div className="grid grid-cols-10 border-blue-800">
        <div className="col-span-2  border-blue-800 p-2 font-bold text-sm">
          {t('payment.initial', 'BAN ĐẦU')}:
          <div className="text-xs italic">({t('payment.initialEn', 'Follow goods\'s ID')})</div>
        </div>
        <div className="col-span-1  border-blue-800 p-2 text-sm text-center">
          (tiền)
        </div>
        <div className="col-span-1  border-blue-800 p-2 text-sm text-center">
          VNĐ
        </div>
        <div className="col-span-5"></div>
      </div>

      <div className="grid grid-cols-10 border-blue-800">
        <div className="col-span-2  border-blue-800 p-2 font-bold text-sm">
          {t('payment.actual', 'THỰC TẾ')}:
          <div className="text-xs italic">({t('payment.actualEn', 'Actual')})</div>
        </div>
        <div className="col-span-1  border-blue-800 p-2 text-sm text-center">
          <input
            type="text"
            placeholder={t('payment.enterAmount', '(nhập số tiền)')}
            className="w-10 h-10"
          />
        </div>
        <div className="col-span-1  border-blue-800 p-2 text-sm text-center">
          ({t('payment.handover', 'BBBG')}) ({t('payment.handoverEn', 'Handover')})
        </div>
        <div className="col-span-5"></div>
      </div>


      <div className="grid grid-cols-10 border-blue-800">
        <div className="col-span-2  border-blue-800 p-2 font-bold text-sm">
          {t('payment.deposit', 'ĐẶT CỌC')}:
          <div className="text-xs italic">({t('payment.depositEn', 'Deposit')})</div>
        </div>
        <div className="col-span-1  border-blue-800 p-2 text-sm text-center">
          (lệnh)
        </div>
        <div className="col-span-1  border-blue-800 p-2 text-sm text-center">
          VNĐ
        </div>
        <div className="col-span-5"></div>
      </div>

      <div className="grid grid-cols-10 border-blue-800">
        <div className="col-span-2  border-blue-800 p-2 font-bold text-sm">
          {t('payment.remainingAmount', 'SỐ TIỀN CÒN LẠI PHẢI TRẢ')}:
          <div className="text-xs italic">({t('payment.remainingAmountEn', 'Amount remaining to be paid')})</div>
        </div>
        <div className="col-span-1  border-blue-800 p-2 text-sm text-center">
          (lệnh)
        </div>
        <div className="col-span-1  border-blue-800 p-2 text-sm text-center">
          VNĐ
        </div>
        <div className="col-span-5"></div>
      </div>

      <div className="grid grid-cols-8 border-blue-800">
        <div className="col-span-1"></div>
        <div className="col-span-2 flex justify-end my-4">
          <button className="border-3 px-6 py-2 font-bold rounded">
            {t('payment.confirm', 'XÁC NHẬN')}
            <div className="text-xs italic">({t('payment.confirmEn', 'Accept')})</div>
          </button>
        </div>
      </div>

      {/* <div className="grid grid-cols-10 border-blue-800">
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
      </div> */}
    </div>


    <div className="grid grid-cols-2 gap-2 p-2">

      <div className="grid gap-5 border-black-800 pr-2">
        <div className="border-3 p-3 font-bold text-center rounded-lg">
          {t('payment.deliveryAndReceivePayment', 'GIAO HÀNG VÀ NHẬN THANH TOÁN')}
          <div className="text-xs italic">
            ({t('payment.deliveryAndReceivePaymentEn', 'Delivery goods and receive payment')})
          </div>
        </div>
  
        <div className="border-3 p-3 font-bold text-center rounded-lg">
          {t('payment.takeBackGoodsLose100', 'NHẬN LẠI HÀNG VÀ BÙ 100% CỌC')}
          <div className="text-xs italic">
            ({t('payment.takeBackGoodsLose100En', 'Take back goods and lost 100% deposit')})
          </div>
        </div>
        <div className="border-3 p-3 font-bold text-center rounded-lg">
         {t('payment.returnGoodsGet50', 'TRẢ LẠI HÀNG VÀ ĐƯỢC 50% CỌC')}
          <div className="text-xs italic">
            ({t('payment.returnGoodsGet50En', 'Return goods and take 50% deposite')})
          </div>
        </div>
      </div>

      <div className="grid gap-5 pl-2">
        <div className="border-3 p-3 font-bold text-center rounded-lg">
          {t('payment.receiveGoodsAndPayment', 'NHẬN HÀNG VÀ THANH TOÁN')}
          <div className="text-xs italic">
            ({t('payment.receiveGoodsAndPaymentEn', 'Receive goods and payment')})
          </div>
        </div>
        <div className="border-3 p-3 font-bold text-center rounded-lg">
         {t('payment.returnGoodsGet50', 'TRẢ LẠI HÀNG VÀ ĐƯỢC 50% CỌC')}
          <div className="text-xs italic">
            ({t('payment.returnGoodsGet50En', 'Return goods and take 50% deposite')})
          </div>
        </div>
        <div className="border-3 p-3 font-bold text-center rounded-lg">
         {t('payment.returnGoodsGet100', 'TRẢ LẠI HÀNG VÀ ĐƯỢC 100% CỌC')}
          <div className="text-xs italic">
            ({t('payment.returnGoodsGet100En', 'Return goods and take 100% deposite')})
          </div>
        </div>
      </div>
    </div>


    <div className="grid grid-cols-8 border-t border-black-800">
      <div className="col-span-1 border-r border-black-800 p-2 font-bold text-sm">
        {t('payment.reason', 'LÝ DO')}:
        <div className="text-xs italic">({t('payment.reasonEn', 'Reason')})</div>
      </div>
      <div className="col-span-7">
        <input type="text" />
      </div>
    </div>

  </>)
}

const FreelancerPaymentPage = () => {
    const { t } = useTranslation();
    return (<>


    <div>
      <div className="grid grid-cols-10 border-blue-800">
        <div className="col-span-2  border-blue-800 p-2 font-bold text-sm">
          {t('payment.freelancerAccount', 'TÀI KHOẢN CÔNG VIỆC TỰ DO')}:
          <div className="text-xs italic">({t('payment.freelancerAccountEn', 'Freelancer account')})</div>
        </div>
        <div className="col-span-1  border-blue-800 p-2 text-sm text-center">
          (tiền)
        </div>
        <div className="col-span-1  border-blue-800 p-2 text-sm text-center">
          VNĐ
        </div>
        <div className="col-span-1"></div>
        <div className="col-span-2">
          <button className="border-1 px-6 py-2 font-bold rounded text-sm">
            CHUYỂN VỀ VÍ 
            <br />
            (Transfer to wallet)
          </button>
        </div>
      </div>
      <div className="grid grid-cols-10 border-blue-800">
        <div className="col-span-4">
          <select name="" id="" className="border w-full">
            <option value="">
              BÀI ĐĂNG <br/>
              (POSTED)
            </option>
            <option value="">BÀI THAM GIA (JOINED)</option>
          </select>
        </div>
      </div>
       <div className="grid grid-cols-10 border-blue-800">
        <div className="col-span-2  border-blue-800 p-2 font-bold text-sm">
          ĐANG NHẬN CỌC:
          <div className="text-xs italic">(Accepting deposit)</div>
        </div>
        <div className="col-span-1  border-blue-800 p-2 text-sm text-center">
          (tiền)
        </div>
        <div className="col-span-1  border-blue-800 p-2 text-sm text-center">
          VNĐ
        </div>
        <div className="col-span-5"></div>
      </div>
      <div className="grid grid-cols-10 border-blue-800">
        <div className="col-span-2  border-blue-800 p-2 font-bold text-sm">
          {t('payment.jobId', 'ID CÔNG VIỆC')}:
          <div className="text-xs italic">({t('payment.jobIdEn', 'Job ID')})</div>
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
      <div className="grid grid-cols-10 border-blue-800">
        <div className="col-span-2  border-blue-800 p-2 font-bold text-sm">
          TRẠNG THÁI:
          <div className="text-xs italic">(status)</div>
        </div>

        <div className="col-span-1  border-blue-800 p-2 text-sm text-center">
          (lệnh)
        </div>
        
        <div className="col-span-5"></div>
      </div>

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

      <div className="grid grid-cols-10 border-blue-800">
        <div className="col-span-2  border-blue-800 p-2 font-bold text-sm">
          THỰC TẾ:
          <div className="text-xs italic">(Actual)</div>
        </div>
        <div className="col-span-1  border-blue-800 p-2 text-sm text-center">
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

      <div className="grid grid-cols-10 border-blue-800">
        <div className="col-span-2  border-blue-800 p-2 font-bold text-sm">
          SỐ TIỀN CÒN LẠI PHẢI TRẢ:
          <div className="text-xs italic">(Amount remaining to be paid)</div>
        </div>
        <div className="col-span-1  border-blue-800 p-2 text-sm text-center">
          (lệnh)
        </div>
        <div className="col-span-1  border-blue-800 p-2 text-sm text-center">
          VNĐ
        </div>
        <div className="col-span-5"></div>
      </div>

      <div className="grid grid-cols-8 border-blue-800">
        <div className="col-span-1"></div>
        <div className="col-span-2 flex justify-end my-4">
          <button className="border-3 px-6 py-2 font-bold rounded">
            XÁC NHẬN
            <div className="text-xs italic">(Accept)</div>
          </button>
        </div>
      </div>

      {/* <div className="grid grid-cols-10 border-blue-800">
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
      </div> */}
    </div>


    <div className="grid grid-cols-2 gap-2 p-2">

      <div className="grid gap-5 border-black-800 pr-2">
        <div className="border-3 p-3 font-bold text-center rounded-lg">
          NHẬN KẾT QUẢ VÀ THANH TOÁN
          <div className="text-xs italic">
            (Take result and payment)
          </div>
        </div>
        <div className="border-3 p-3 font-bold text-center rounded-lg">
          KHÔNG NHẬN KẾT QUẢ VÀ ĐƯỢC 50% CỌC
          <div className="text-xs italic">
            (Not take result and take 50% deposite)
          </div>
        </div>
        <div className="border-3 p-3 font-bold text-center rounded-lg">
         KHÔNG GIAO VIỆC VÀ BÙ 100% CỌC
          <div className="text-xs italic">
           (Not deliver work and lost 100% deposite)
          </div>
        </div>
      </div>

      <div className="grid gap-5 pl-2">
        <div className="border-3 p-3 font-bold text-center rounded-lg">
          HOÀN THÀNH VIỆC VÀ NHẬN THANH TOÁN
          <div className="text-xs italic">
            (Completed work and receive payment)
          </div>
        </div>
        <div className="border-3 p-3 font-bold text-center rounded-lg">
          KHÔNG HOÀN THÀNH VIỆC VÀ BÙ 100% CỌC
          <div className="text-xs italic">
            (Not accept and lost 100% deposit)
          </div>
        </div>
        <div className="border-3 p-3 font-bold text-center rounded-lg">
         KHÔNG NHẬN VIỆC VÀ ĐƯỢC 50% CỌC
          <div className="text-xs italic">
            (Not accept and take 50% deposit)
          </div>
        </div>
      </div>
    </div>


    <div className="grid grid-cols-8 border-t border-black-800">
      <div className="col-span-1 border-r border-black-800 p-2 font-bold text-sm">
        LÝ DO:
        <div className="text-xs italic">(Reason)</div>
      </div>
      <div className="col-span-7">
        <input type="text" />
      </div>
    </div>

  </>)
}

const PaymentPage = () => {
  const { t } = useTranslation();
  const [color, setColor] = useState(localStorage.getItem("selectedColor"));
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate()
  const [Page, setPage] = useState(null);
  const [user, setUser] = useState(null);

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

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setUser(token);
    getWalletFromToken(token).then((res) => {
      setWallet(res.data)
    }).catch((err) => {
      console.log(err);
    })
    getFavoriteWallets(token).then((res) => {
      setFavorites([...favorites, ...res.data?.wallets])
      console.log(res.data?.wallets);

    }).catch((err) => {
      console.log(err);
    })

  }, [])

  return (
    <div className="flex justify-center py-8 px-4">
      <div className="w-full max-w-4xl shadow-lg rounded relative">
        {/* Header with Navigation */}
        <div className="flex items-center justify-between relative mb-6">
          <button 
            className="text-red-600 hover:text-red-800"
            onClick={() => navigate("/")}
          >
            <HomeIcon size={28} />
          </button>
          
          <div className="flex-1 text-center">
            <h1 className="text-3xl font-bold inline-block relative">
              <span className="relative inline-block">
                9
                <input
                  type="color"
                  value={color}
                  onChange={handleChangeColor}
                  className="absolute left-1/2 transform -translate-x-1/2 top-full mt-1 w-10 h-8 cursor-pointer"
                />
              </span>
              &nbsp;- {t('payment.paymentTransaction', 'GIAO DỊCH THANH TOÁN')}
            </h1>
            <h2 className="text-2xl text-black mt-2">
              <i>({t('payment.paymentTransactionEn', 'Payment Transaction')})</i>
            </h2>
          </div>
          
          <button 
            className="text-red-600 hover:text-red-800"
            onClick={() => navigate("/admin-control")}
          >
            <SettingsIcon size={28} />
          </button>
        </div>

        {/* Main Content */}
        <div>
          {/* MÃ QR Row */}
          <div className="grid grid-cols-8">
            <div className="col-span-4 p-2 font-bold text-sm">{t('payment.qr', 'QR')}:</div>
            <div className="col-span-4 p-2 font-bold text-sm text-end">
              {t('payment.scanQr', 'Quét QR')}
              <br />
              <i>({t('payment.scanQrEn', 'Scan QR')})</i>
            </div>
          </div>

          {/* Main Transaction Grid */}

          <div className="grid grid-cols-6 text-center text-sm">
            <div className="col-span-2 grid grid-cols-4 text-center text-sm" >
              <div className="col-span-1 row-span-4 border p-2 font-bold flex flex-col items-start justify-center text-center">
                {t('payment.wallet', 'Ví')} <br /> <i>{t('payment.walletEn', 'Wallet')}</i>
              </div>
              <div className="col-span-2 row-span-4 border p-2 flex flex-col items-center justify-center">
                {wallet?.total}
              </div>
              <div className="col-span-1 row-span-4 border p-2 flex flex-col items-center justify-center">
                VNĐ
              </div>
            </div>
            <div className="col-span-4 grid grid-cols-6 text-center text-sm">
              <div className="col-span-1 row-span-4 border p-2 font-bold flex flex-col items-center justify-center text-center">
                CHUYỂN <br />
                <i>(Transfer)</i>
              </div>

              <div className="col-span-1 border p-2 flex flex-col items-center">
                <label className="text-xl text-gray-500 mb-1 italic">
                  Số tiền
                </label>
                <input
                  type="text"
                  placeholder="(nhập số tiền)"
                  className="w-20 h-10 text-center"
                />
                <span className="text-xs text-gray-500 mt-1 italic">(Amount)</span>
              </div>

              <div className="col-span-1 border p-2 font-bold">
                ĐẾN <br />
                <i>(To)</i>
              </div>
              <div className="col-span-2 grid grid-cols-2 border">
                <div className="border p-2 flex justify-center items-center">
                  CCCD/MST
                  <br />
                  (ID)</div>
                {/* <div className="border p-2">(danh bạ)</div> */}
                <select className="border p-2"
                  value={favoriteWalletSelected.id}
                  defaultValue={0}
                  onChange={(e) => setFavoriteWalletSelected(e.target.value)}
                >
                  {favorites?.map((wallet) => (
                    <option key={wallet.id} value={wallet.id}>
                      {wallet.cccd}
                    </option>
                  ))}
                </select>
                {/* <div className="border p-2">(quét QR)</div> */}
              </div>

              <div className="col-span-1 row-span-4 border p-2 font-bold flex flex-col items-center justify-center text-center">
                CHẤP NHẬN
                <i>(ACCEPT)</i>
              </div>

              {/* Hàng 2: Tài khoản HÀNG HÓA */}
              <div className="col-span-1 border p-2 flex flex-col items-center">
                <label className="text-xl text-gray-500 mb-1 italic">
                  Số tiền
                </label>
                <input
                  type="text"
                  placeholder="(nhập số tiền)"
                  className="w-20 h-10 text-center"
                />
                <span className="text-xs text-gray-500 mt-1 italic">(Amount)</span>
              </div>
              <div className="col-span-1 border p-2 font-bold">
                ĐẾN <br />
                <i>(To)</i>
              </div>
              <div className="col-span-2 border p-2">
                TÀI KHOẢN HÀNG HÓA <br />
                <i>(Account of Goods)</i>
              </div>

              {/* Hàng 3: Tài khoản CÔNG VIỆC TỰ DO */}
              <div className="col-span-1 border p-2 flex flex-col items-center">
                <label className="text-xl text-gray-500 mb-1 italic">
                  Số tiền
                </label>
                <input
                  type="text"
                  placeholder="(nhập số tiền)"
                  className="w-20 h-10 text-center"
                />
                <span className="text-xs text-gray-500 mt-1 italic">(Amount)</span>
              </div>
              <div className="col-span-1 border p-2 font-bold">
                ĐẾN <br />
                <i>(To)</i>
              </div>
              <div className="col-span-2 border p-2">
                TÀI KHOẢN CÔNG VIỆC TỰ DO <br />
                <i>(Account of Freelancer)</i>
              </div>

              {/* Hàng 4: Tài khoản Ai LIVE */}
              <div className="col-span-1 border p-2 flex flex-col items-center">
                <label className="text-xl text-gray-500 mb-1 italic">
                  Số tiền
                </label>
                <input
                  type="text"
                  placeholder="(nhập số tiền)"
                  className="w-20 h-10 text-center"
                />
                <span className="text-xs text-gray-500 mt-1 italic">(Amount)</span>
              </div>
              <div className="col-span-1 border p-2 font-bold">
                ĐẾN <br />
                <i>(To)</i>
              </div>
              <div className="col-span-2 border p-2">
                TÀI KHOẢN Ai LIVE <br />
                <i>(Account of Ai LIVE)</i>
              </div>
            </div>

          </div>

          <div>
            {/* First Row */}
            <div className="grid grid-cols-10 border-blue-800 mb-10 mt-5">
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
              <div className="col-span-2"></div>
              <div className="col-span-2">
                <div className="border-3 border-black font-bold rounded cursor-pointer hover:bg-white-100 text-center">
                  THANH TOÁN DỊCH VỤ
                  <br/>
                   (Service payment)
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 p-2">
            <button onClick={()=>{setPage(Page !=="goods" ? "goods" : null)}} className="grid gap-5 border-black-800 pr-2">
              <div className="border-3 p-3 font-bold text-center rounded-lg">
                HÀNG HÓA
                <div className="text-xs italic">
                  (Goods)
                </div>
              </div>

            </button>

            <button onClick={()=>{setPage(Page !=="freelancer" ? "freelancer" : null)}} className="grid gap-5 pl-2">
              <div className="border-3 p-3 font-bold text-center rounded-lg">
                CÔNG VIỆC TỰ DO
                <div className="text-xs italic">
                  (Freelancer)
                </div>
              </div>
            </button>
          </div>
          {/* Middle Section */}
          {/* <div>
           
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

            <div className="grid grid-cols-8 border-blue-800">
              <div className="col-span-1"></div>
              <div className="col-span-2 flex justify-end my-4">
                <button className="border-3 px-6 py-2 font-bold rounded">
                  XÁC NHẬN
                  <div className="text-xs italic">(Accept)</div>
                </button>
              </div>
            </div>

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


          <div className="grid grid-cols-2 gap-2 p-2">

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

  
          <div className="grid grid-cols-8 border-t border-black-800">
            <div className="col-span-1 border-r border-black-800 p-2 font-bold text-sm">
              LÝ DO:
              <div className="text-xs italic">(Reason)</div>
            </div>
            <div className="col-span-7">
              <input type="text" />
            </div>
          </div> */}
          {Page === "goods" ? <GoodsPaymentPage /> : null}
          {Page === "freelancer" ? <FreelancerPaymentPage /> : null}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
