import React, { useState, useEffect } from "react";
import "../styles/Login.css";
import axios from "axios";
import { getFreelancer } from "../services/freelancerService";
import { useNavigate } from "react-router-dom";
import FreelancerActuallyComponent from "../components/FreelancerActuallyComponent";
import FreelancerOnlineComponent from "../components/FreelancerOnlineComponent";
import {getWalletFromToken} from "../services/walletService";
import { getFreelancerWithNullPic } from "../services/freelancerService";


export default function FreelancerPage() {
  const [color, setColor] = useState(localStorage.getItem("selectedColor"));
  const [activeTab, setActiveTab] = useState("actual"); // "actual" or "online"

  
const [freelancersOffline, setFreelancersOffline] = useState([
    {
      id: 2,
      name: 'OFFLINE job',
      estimate: '1day',
      requirement: 'Java',
      startDate: null,
      endDate: null, 
      startLocation: null,
      endLocation: null,
      price: null,
      deposit: null,
      serviceFee: null,
      type: 'offline',
      documentId: null

    }
  ]);
  const [freelancersOnline, setFreelancersOnline] = useState([
    {
      id: 2,
      name: 'ONLINE job',
      estimate: '1day',
      requirement: 'Java',
      startDate: null,
      endDate: null, 
      startLocation: null,
      endLocation: null,
      price: null,
      deposit: null,
      serviceFee: null,
      type: 'online',
      documentId: null
    }
  ]);
  const navigate = useNavigate();

  const [wallet, setWallet] = useState({
    total: 0,
    account_of_goods: 0,
    account_of_freelancer: 0,
    account_of_ailive: 0,
    pending_amount: 0
  });


  const handleChangeColor = (e) => {
    const newColor = e.target.value;
    setColor(newColor);
    localStorage.setItem("selectedColor", newColor);
  };

  useEffect(() => {
    document.getElementById("root").style.backgroundColor = color;
  }, [color]);

  useEffect(async () => {
    try {
        const response = await getWalletFromToken();
        setWallet(response.data);
        console.log(response.data);
        const freelancersOffline = await getFreelancerWithNullPic(1, 10, 'offline');
        setFreelancersOffline(freelancersOffline.data.data);
        console.log(freelancersOffline.data.data);
        const freelancersOnline = await getFreelancerWithNullPic(1, 10, 'online');
        setFreelancersOnline(freelancersOnline.data.data);
        console.log(freelancersOnline.data.data);
      } catch (error) {
        console.error("Error fetching wallet:", error);
      }
  }, []);


  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-transparent backdrop-blur-md p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
            <div className="relative justify-between flex">
        <button onClick={()=>{navigate("../")}}  className=" p-2 border">Home</button>
        <button className=" right-0 p-2 border" >3-BĐK</button>
      </div>
        <div className="flex items-center justify-center relative">
          {/* Tiêu đề ở giữa */}
          <div className="text-center mb-4 relative">
            <h1 className="text-3xl font-bold text-black relative inline-block">
              <span className="relative">
                7{/* input màu ngay dưới số 2 */}
                <input
                  type="color"
                  value={color}
                  onChange={handleChangeColor}
                  className="absolute left-1/2 transform -translate-x-1/2 top-full mt-1 w-10 h-8 cursor-pointer"
                />
              </span>
              &nbsp;- CÔNG VIỆC TỰ DO
            </h1>

            {/* New post bên dưới */}
            <h2 className="text-2xl text-black mt-2">
              <i>(Freelancer)</i>
            </h2>
          </div>
        </div>

        {/* Table layout */}
        <div className="mt-6">
          <div className="border border-gray-300 rounded-md overflow-hidden">
            {/* Row 1: TÀI KHOẢN CÔNG VIỆC TỰ DO */}
            <div className="grid grid-cols-12 border-b border-gray-300">
              <div className="col-span-4 p-3 border-r border-gray-300 font-bold">
                TÀI KHOẢN CÔNG VIỆC TỰ DO
                <div className="text-sm text-gray-500"><i>(Account of freelancer)</i></div>
              </div>
              <div className="col-span-2 p-3 border-r border-gray-300 text-center">
                <input disabled type="text" value={wallet.account_of_freelancer} placeholder="(lệnh)" className="w-full p-1 border rounded" />


              </div>
              <div className="col-span-2 p-3 border-r border-gray-300 text-center">VNĐ</div>
              <div className="col-span-2 p-3 border-r border-gray-300 text-center">
                <input type="text" placeholder="(nhập)" className="w-full p-1 border rounded" />
              </div>
              <div className="col-span-2 p-3 text-center font-bold">
                CHUYỂN VỀ VÍ
                <div className="text-sm text-gray-500"><i>(Transfer to wallet)</i></div>
              </div>
            </div>

            {/* Row 2: ĐĂNG ĐẶT CỌC */}
            <div className="grid grid-cols-12 border-b border-gray-300">
              <div className="col-span-4 p-3 border-r border-gray-300 font-bold">
                ĐĂNG ĐẶT CỌC
                <div className="text-sm text-gray-500"><i>(Depositing)</i></div>
              </div>
              <div className="col-span-2 p-3 border-r border-gray-300 text-center">
                <input disabled value={wallet.pending_amount} type="text" placeholder="(lệnh)" className="w-full p-1 border rounded" />

              </div>
              <div className="col-span-2 p-3 border-r border-gray-300 text-center">VNĐ</div>
              <div className="col-span-4"></div>
            </div>

            {/* Row 3: THỰC TẾ / TRỰC TUYẾN */}
            <div className="grid grid-cols-2 mt-4">
              <div 
                className={`p-3 border border-gray-300 text-center font-bold cursor-pointer ${activeTab === "actual" ? "bg-orange-100" : ""}`}
                onClick={() => setActiveTab("actual")}
              >
                THỰC TẾ
                <div className="text-sm text-gray-500"><i>(Actual)</i></div>
              </div>
              <div 
                className={`p-3 border border-gray-300 text-center font-bold cursor-pointer ${activeTab === "online" ? "bg-blue-100" : ""}`}
                onClick={() => setActiveTab("online")}
              >
                TRỰC TUYẾN
                <div className="text-sm text-gray-500"><i>(Online)</i></div>
              </div>
            </div>
          </div>
        </div>

        {/* Render the appropriate component based on the active tab */}
        {activeTab === "actual" ? (
          <FreelancerActuallyComponent freelancers={freelancersOffline} />
        ) : (
          <FreelancerOnlineComponent freelancers={freelancersOnline} />
        )}
      </div>
    </div>
  );
}
