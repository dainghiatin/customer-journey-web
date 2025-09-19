import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { createMovie } from "../services/movieService";
import { createLive } from "../services/liveService";
import { createVideo } from "../services/videoService";
import {
  Home as HomeIcon,
  Settings as SettingsIcon,
} from "lucide-react";

export default function NewAiLivePostPage() {
  const { t } = useTranslation();
  const [color, setColor] = useState(localStorage.getItem("selectedColor") || "#ffffff");
  const [user, setUser] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [movieFile, setMovieFile] = useState(null);
  const [liveTime, setLiveTime] = useState("");
  const [videoName, setVideoName] = useState("");
  const [movieName, setMovieName] = useState("");
  const [liveName, setLiveName] = useState("");
  const [activeTab, setActiveTab] = useState("video"); // Thêm state tab


  const [videoData, setVideoData] = useState({
      name: "Product Intro",
      savelocation: "/videos/product-intro.mp4",
      allowAdvertising: true,
      showAd: 15,
      insertAd: 45,
      startFromTime: 5,
      startFromView: 250,
      source: "https://www.youtube.com/watch?v=1234567890", // Will be a file url
      confirmCopyright: true
    });


const [movieData, setMovieData] = useState({
  name: '',
  filename: '',
  watchPrice: 0,
  ownerPercentage: 0,
  deposit: 0,
  unitPrice: 0,
  adOnMainPageFee: 0,
  source: 'https://example.com/live/launch',
  rightsDocument: ["https://example.com/live/launch"],
  adContent: 'https://example.com/live/launch'
});

const [liveData, setLiveData] = useState({
  name: "Live Tech Talk: Future of AI",
  expectedAiringTime: "2025-08-10T20:00:00.000Z",
  filename: "ai_tech_talk_2025.mp4",
  watchPrice: 14.99,
  messagePrice: 2.50,
  ownerPercentage: 80,
  deposit: 300.00,
  priceBaseLocal: 12.00,
  unitPrice: 15.00,
  allowAdvertising: true,
  showAd: 20.00,
  startAdvertisingFromSeconds: 60,
  startAdvertisingFromViews: 500,
  rightsDocument: ["https://example.com/live/launch", "https://example.com/live/launch"], // media IDs returned from /upload
  adContent: ["https://example.com/live/launch", "https://example.com/live/launch"]        // media IDs returned from /upload
});


const handleSubmitMovie = async (e) => {
  e.preventDefault();
  try {
    const response = await createMovie("token", movieData);
    console.log("Movie uploaded successfully:", response.data);
    // Handle success (e.g., redirect to movie list page)
  } catch (error) {
    console.error("Error uploading movie:", error.message);
    // Handle error (e.g., show error message to user)
  }
};

  const handleVideoChange = (e) => {
    setVideoFile(e.target.files[0]);
  }; 

  const handleSubmitVideo = async (e) => {
    e.preventDefault();
    try {
      const response = await createVideo("token", videoData);
      console.log("Video uploaded successfully:", response.data);
      // Handle success (e.g., redirect to video list page)
    } catch (error) {
      console.error("Error uploading video:", error.message);
      // Handle error (e.g., show error message to user)
    }
  };

  const handleSubmitLive = async (e) => {
    e.preventDefault();
    try {
      const response = await createLive("token", liveData);
      console.log("Live uploaded successfully:", response.data);
      // Handle success (e.g., redirect to live list page)
    } catch (error) {
      console.error("Error uploading live:", error.message);
      // Handle error (e.g., show error message to user)
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    document.getElementById("root").style.backgroundColor = color;
    const token = localStorage.getItem("authToken");
    setUser(token);
  }, [color]);

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setColor(newColor);
    localStorage.setItem("selectedColor", newColor);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-transparent backdrop-blur-md p-6 rounded-lg shadow-lg w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between relative">
          <button 
            className="text-red-600 hover:text-red-800 relative"
            onClick={() => navigate("/")}
          >
            <HomeIcon size={28} />
          </button>
          {/* Tiêu đề ở giữa */}
          <div className="text-center mb-4 relative flex-1">
            <h1 className="text-3xl font-bold text-black relative inline-block">
              <span className="relative">
                4
                <input
                  type="color"
                  value={color}
                  onChange={handleColorChange}
                  className="absolute left-1/2 transform -translate-x-1/2 top-full mt-1 w-10 h-8 cursor-pointer"
                />
              </span>{" "}
              - ĐĂNG BÀI MỚI
            </h1>
            <h2 className="text-xl italic text-gray-600">(New post)</h2>
          </div>
          <button 
            className="text-red-600 hover:text-red-800"
            onClick={() => navigate("/admin-control")}
          >
            <SettingsIcon size={28} />
          </button>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-3 text-center border border-black text-black">
          <div className="p-3 font-semibold border-r">
            HÀNG HÓA<br /><i>(Goods)</i>
          </div>
          <div className="p-3 font-semibold border-r">
            CÔNG VIỆC TỰ DO<br /><i>(Freelancer)</i>
          </div>
          <div className="p-3 font-semibold bg-blue-600 text-white">
            Ai LIVE
          </div>
        </div>

        {/* Categories: VIDEO - PHIM - TRỰC TIẾP */}
        <div className="grid grid-cols-3 text-center text-white mt-4">
          <div
            className={`p-3 font-bold cursor-pointer ${activeTab === "video" ? "bg-blue-800" : "bg-blue-400"}`}
            onClick={() => setActiveTab("video")}
          >
            VIDEO
          </div>
          <div
            className={`p-3 font-bold cursor-pointer ${activeTab === "movie" ? "bg-cyan-500" : "bg-cyan-300"}`}
            onClick={() => setActiveTab("movie")}
          >
            PHIM<br /><span className="italic text-sm">(Movies)</span>
          </div>
          <div
            className={`p-3 font-bold cursor-pointer ${activeTab === "live" ? "bg-green-600" : "bg-green-400"}`}
            onClick={() => setActiveTab("live")}
          >
            TRỰC TIẾP<br /><span className="italic text-sm">(Live)</span>
          </div>
        </div>

        {/* Input Zones */}
        {activeTab === "video" && (
          <div className="text-black text-sm mt-1">
            {/* VIDEO COLUMN */}
            <div className="bg-blue-100 p-4">
              <label className="block text-red-600 font-semibold mb-2">
                * TẢI VIDEO LÊN
                <span className="block text-blue-600 italic">(Upload video file)</span>
              </label>
              <input type="file" onChange={(e) => setVideoFile(e.target.files[0])} />
              <label className="block mt-4 text-black font-semibold">
                  * TÊN VIDEO
                  <span className="block text-gray-600 italic">(Video's name)</span>
              </label>
              <input
                type="text"
                value={videoName}
                onChange={(e) => setVideoName(e.target.value)}
                className="w-full border rounded px-2 py-1 mt-1"
                placeholder="Tên video"
              />
            </div>
            <div className="bg-blue-100 p-4">
                <label className="block text-red-600 font-semibold mb-2">
                * KHU VỰC LƯU TRỮ
                <span className="block text-gray-600 italic">(Save location)</span>
                </label>
                <select className="w-full border rounded px-2 py-1">
                <option>-- Chọn --</option>
                <option>THIẾU NHI (Children)</option>
                <option>LƯU NIỆM (Memory)</option>
                <option>KINH NGHIỆM SỐNG (Life experience)</option>
                <option>KINH TẾ & XÃ HỘI (Economy & Society)</option>
                <option>THỂ THAO (Sport)</option>
                <option>GIẢI TRÍ (Entertainment)</option>
                <option>SÁNG TẠO (Creative)</option>
                <option>CHIẾN DỊCH & SỰ KIỆN (Campaigns & Events)</option>
                <option>Ý TƯỞNG KHỞI NGHIỆP (Startup ideas)</option>
                </select>
            </div>
            <div className="bg-blue-100 p-4">
                <label className="block font-semibold mb-2">
                CHO PHÉP QUẢNG CÁO TRÊN VIDEO NÀY
                <span className="block text-gray-600 italic">(Allow advertising on this video)</span>
                </label>
                <input type="checkbox" className="mr-2" /> Cho phép
            </div>
            <div className="bg-blue-100 p-4">
                <label className="block font-semibold mb-2">
                HIỆN QUẢNG CÁO
                <span className="block italic text-gray-600">(Show ad)</span>
                </label>
                <input type="number" className="w-full border px-2 py-1" placeholder="VNĐ/giây hoặc lượt" />

                <label className="block font-semibold mt-4 mb-2">
                CHÈN QUẢNG CÁO
                <span className="block italic text-gray-600">(Insert ad)</span>
                </label>
                <input type="number" className="w-full border px-2 py-1" placeholder="VNĐ/giây hoặc lượt" />
            </div>
            <div className="bg-blue-100 p-4">
                <label className="block font-semibold mb-2">
                BẮT ĐẦU QUẢNG CÁO TỪ GIÂY THỨ…
                <span className="block italic text-gray-600">(Start from seconds)</span>
                </label>
                <input type="number" className="w-full border px-2 py-1" />

                <label className="block font-semibold mt-4 mb-2">
                BẮT ĐẦU QUẢNG CÁO TỪ LƯỢT XEM THỨ…
                <span className="block italic text-gray-600">(Start from views)</span>
                </label>
                <input type="number" className="w-full border px-2 py-1" />
            </div>
            <div className="bg-blue-100 p-4">
                <label className="block font-semibold mb-2">
                tick
                </label>
                <input type="checkbox" className="mr-2" />
                <span className="font-semibold">CAM KẾT BẢN QUYỀN</span>
                <br />
                <span className="italic text-gray-600">(Confirm copyright)</span>
            </div>
            <div className="bg-blue-100 p-4"></div>
          </div>
        )}
        {activeTab === "movie" && (
          <div className="text-black text-sm mt-1">
            {/* MOVIE COLUMN */}
            <div className="bg-cyan-100 p-4">
              <label className="block text-red-600 font-semibold mb-2">
                * TẢI PHIM LÊN
                <span className="block text-blue-600 italic">(Upload movies file)</span>
              </label>
              <input type="file" onChange={(e) => setMovieFile(e.target.files[0])} />
              <label className="block mt-4 text-black font-semibold">
                  * TÊN PHIM
                  <span className="block text-gray-600 italic">(Movie's name)</span>
              </label>
              <input
                type="text"
                value={movieName}
                onChange={(e) => setMovieName(e.target.value)}
                className="w-full border rounded px-2 py-1 mt-1"
                placeholder="Tên phim"
              />
            </div>
            <div className="bg-cyan-100 p-4">
                <label className="block text-red-600 font-semibold mb-2">
                * TÊN THƯ MỤC
                <span className="block text-gray-600 italic">(File name)</span>
                </label>
                <input type="text" className="w-full border rounded px-2 py-1" placeholder="Tên thư mục" />
            </div>
            <div className="bg-cyan-100 p-4">
                <label className="block text-red-600 font-semibold mb-2">
                * GIẤY PHÉP CHỦ SỞ HỮU SẢN PHẨM, BẢN QUYỀN, QUYỀN PHÁT SÓNG
                <span className="block text-gray-600 italic">(Product ownership, copyright, broadcast rights)</span>
                </label>
                <input type="file" />
            </div>
            <div className="bg-cyan-100 p-4">
                <label className="block text-red-600 font-semibold mb-2">
                * GIÁ XEM
                <span className="block italic text-gray-600">(Watch price)</span>
                </label>
                <input type="number" className="w-full border px-2 py-1" placeholder="Nhập giá xem" />

                <label className="block text-red-600 font-semibold mt-4 mb-2">
                % CHỦ PHIM NHẬN VỀ
                <span className="block italic text-gray-600">(% Movies owner receive)</span>
                </label>
                <input type="number" className="w-full border px-2 py-1" placeholder="%" />
            </div>
            <div className="bg-cyan-100 p-4">
                <label className="block font-semibold mb-2">
                NẠP TIỀN
                <span className="block italic text-gray-600">(Deposit)</span>
                </label>
                <input type="number" className="w-full border px-2 py-1" />

                <label className="block font-semibold mt-4 mb-2">
                ĐƠN GIÁ (VNĐ / GIÂY / LƯỢT)
                <span className="block italic text-gray-600">(Unit price)</span>
                </label>
                <input type="number" className="w-full border px-2 py-1" />
            </div>
            <div className="bg-cyan-100 p-4">
                <label className="block font-semibold mb-2">
                QUẢNG CÁO TRÊN TRANG CHỦ
                <span className="block italic text-gray-600">(Mainpage)</span>
                </label>
                <input type="text" className="w-full border px-2 py-1" />

                <label className="block mt-4 font-semibold">
                NỘI DUNG QUẢNG CÁO
                <span className="block italic text-gray-600">(Ad content)</span>
                </label>
                <input type="file" />
            </div>
            <div className="bg-cyan-100 p-4"></div>
          </div>
        )}
        {activeTab === "live" && (
          <div className="text-black text-sm mt-1">
            {/* LIVE COLUMN */}
            <div className="bg-green-100 p-4">
              <label className="block text-red-600 font-semibold mb-2">
                * THỜI GIAN DỰ KIẾN PHÁT SÓNG
                <span className="block text-orange-600 italic">(Expected airing time)</span>
              </label>
              <select
                value={liveTime}
                onChange={(e) => setLiveTime(e.target.value)}
                className="w-full border rounded px-2 py-1"
              >
                <option value="">Chọn thời gian</option>
                <option value="today-8am">Hôm nay - 08:00</option>
                <option value="today-8pm">Hôm nay - 20:00</option>
                <option value="tomorrow-8am">Ngày mai - 08:00</option>
                <option value="custom">Tùy chọn...</option>
              </select>
              <label className="block mt-4 text-black font-semibold">
                  * TÊN TRỰC TIẾP
                  <span className="block text-gray-600 italic">(Live's name)</span>
              </label>
              <input
                type="text"
                value={liveName}
                onChange={(e) => setLiveName(e.target.value)}
                className="w-full border rounded px-2 py-1 mt-1"
                placeholder="Tên buổi live"
              />
            </div>
            <div className="bg-green-100 p-4">
                <label className="block text-red-600 font-semibold mb-2">
                * TÊN THƯ MỤC
                <span className="block text-gray-600 italic">(File name)</span>
                </label>
                <input type="text" className="w-full border rounded px-2 py-1" placeholder="Tên thư mục" />
            </div>
            <div className="bg-green-100 p-4">
                <label className="block font-semibold mb-2">
                GIẤY PHÉP CHỦ SỞ HỮU SẢN PHẨM, BẢN QUYỀN, QUYỀN PHÁT SÓNG
                <span className="block text-gray-600 italic">(Product ownership, copyright, broadcast rights)</span>
                </label>
                <input type="file" />
            </div>
            <div className="bg-green-100 p-4">
                <label className="block font-semibold mb-2">
                GIÁ XEM
                <span className="block italic text-gray-600">(Watch price)</span>
                </label>
                <input type="number" className="w-full border px-2 py-1" />

                <label className="block font-semibold mt-4 mb-2">
                GIÁ NHẮN TIN
                <span className="block italic text-gray-600">(Message price)</span>
                </label>
                <input type="number" className="w-full border px-2 py-1" />

                <label className="block font-semibold mt-4 mb-2">
                % CHỦ LIVE NHẬN VỀ
                <span className="block italic text-gray-600">(% Live owner receive)</span>
                </label>
                <input type="number" className="w-full border px-2 py-1" placeholder="%" />
            </div>
            <div className="bg-green-100 p-4">
                <label className="block font-semibold mb-2">
                NẠP TIỀN
                <span className="block italic text-gray-600">(Deposit)</span>
                </label>
                <input type="number" className="w-full border px-2 py-1" />

                <label className="block font-semibold mt-4 mb-2">
                VNĐ
                <span className="block italic text-gray-600">(Theo địa phương)</span>
                </label>
                <input type="number" className="w-full border px-2 py-1" />
            </div>
            <div className="bg-green-100 p-4">
                <label className="block font-semibold mb-2">
                ĐƠN GIÁ
                <span className="block italic text-gray-600">(Unit price)</span>
                </label>
                <input type="number" className="w-full border px-2 py-1" />

                <label className="block mt-4 font-semibold">
                NỘI DUNG QUẢNG CÁO
                <span className="block italic text-gray-600">(Ad content)</span>
                </label>
                <input type="file" />
            </div>
            <div className="bg-green-100 p-4 space-y-4">
                <label className="flex items-center gap-2">
                <input type="checkbox" />
                <span className="font-semibold">CHO PHÉP QUẢNG CÁO TRÊN LIVE NÀY</span>
                <span className="italic text-gray-600">(Allow advertising on this Live)</span>
                </label>

                <div>
                <label className="font-semibold block">
                    HIỆN QUẢNG CÁO
                    <span className="block italic text-gray-600">(Show ad)</span>
                </label>
                <input type="number" className="w-full border px-2 py-1" placeholder="VNĐ / GIÂY (S)" />
                </div>

                <div>
                <label className="font-semibold block">
                    BẮT ĐẦU QUẢNG CÁO TỪ GIÂY THỨ…
                    <span className="block italic text-gray-600">(Start advertising from seconds…)</span>
                </label>
                <input type="number" className="w-full border px-2 py-1" />
                </div>

                <div>
                <label className="font-semibold block">
                    BẮT ĐẦU QUẢNG CÁO TỪ LƯỢT XEM THỨ…
                    <span className="block italic text-gray-600">(Start advertising from views…)</span>
                </label>
                <input type="number" className="w-full border px-2 py-1" />
                </div>

                <div>
                <label className="text-red-600 font-semibold block">
                    * tick
                </label>
                <span className="italic text-gray-600">
                    (Confirm copyright, do not Live anything Prohibited by law)
                </span>
                </div>
            </div>
          </div>
        )}
        {/* DÒNG CAM KẾT CUỐI CÙNG */}
        <div className="border border-black p-4 mt-6 bg-white">
        <label className="flex items-center gap-2 mb-2">
            <input type="checkbox" className="w-4 h-4 text-red-500" />
            <span className="font-semibold text-black">Tick</span>
        </label>
        <p className="text-sm text-black leading-relaxed">
            Tôi xác nhận là chủ sở hữu, có bản quyền, được phép truyền tải và phát sóng các video, phim, các buổi phát sóng trực tiếp này với không phải mục đích quảng cáo, bán hàng và đồng ý chấp nhận tuân theo hợp đồng cũng như mọi điều khoản và điều kiện do HỆ THỐNG WEBSITE, APP yêu cầu.
            <br />
            <span className="italic">
            (I confirm that I am the owner, have the copyright, and am authorized to transmit and broadcast these videos, movies, and live broadcasts without advertising, sale goods and I agree and accept to comply with the contract as well as all terms and conditions required by the WEBSITE, APP.)
            </span>
        </p>
        </div>

        {/* NÚT ĐĂNG */}
        <div className="flex justify-center mt-6">
        <button
            type="submit"
            className="px-8 border py-3 font-bold rounded hover:bg-gray-100 transition-all"
        >
            ĐĂNG <div className="text-sm italic ml-1">(Post)</div>
        </button>
        </div>

      </div>
    </div>
  );
}
