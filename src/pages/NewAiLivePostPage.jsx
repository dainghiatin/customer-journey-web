import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { createMovie } from "../services/movieService";
import { createLive } from "../services/liveService";
import { createVideo } from "../services/videoService";
import {
  Home as HomeIcon,
  KeyboardIcon as KeyboardIcon,
  Eye as EyeIcon,
  EyeOff as EyeOffIcon,
} from "lucide-react";
import PostTypeMenu from "../components/PostTypeMenu";

export default function NewAiLivePostPage() {
  const { t } = useTranslation();
  const [color, setColor] = useState(
    localStorage.getItem("selectedColor") || "#ffffff"
  );
  const [user, setUser] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [movieFile, setMovieFile] = useState(null);
  const [liveTime, setLiveTime] = useState("");
  const [liveTimeStartHour, setLiveTimeStartHour] = useState("");
  const [liveTimeStartDate, setLiveTimeStartDate] = useState("");
  const [liveTimeEndHour, setLiveTimeEndHour] = useState("");
  const [liveTimeEndDate, setLiveTimeEndDate] = useState("");
  const [videoName, setVideoName] = useState("");
  const [movieName, setMovieName] = useState("");
  const [liveName, setLiveName] = useState("");
  const [activeTab, setActiveTab] = useState("video"); // Thêm state tab
  const [isVisible1, setIsVisible1] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);

  const [videoData, setVideoData] = useState({
    name: "Product Intro",
    savelocation: "/videos/product-intro.mp4",
    allowAdvertising: true,
    showAd: 15,
    insertAd: 45,
    startFromTime: 5,
    startFromView: 250,
    source: "https://www.youtube.com/watch?v=1234567890", // Will be a file url
    confirmCopyright: true,
  });

  const [movieData, setMovieData] = useState({
    name: "",
    filename: "",
    watchPrice: 0,
    ownerPercentage: 0,
    deposit: 0,
    unitPrice: 0,
    adOnMainPageFee: 0,
    source: "https://example.com/live/launch",
    rightsDocument: ["https://example.com/live/launch"],
    adContent: "https://example.com/live/launch",
  });

  const [liveData, setLiveData] = useState({
    name: "Live Tech Talk: Future of AI",
    expectedAiringTime: "2025-08-10T20:00:00.000Z",
    filename: "ai_tech_talk_2025.mp4",
    watchPrice: 14.99,
    messagePrice: 2.5,
    ownerPercentage: 80,
    deposit: 300.0,
    priceBaseLocal: 12.0,
    unitPrice: 15.0,
    allowAdvertising: true,
    showAd: 20.0,
    startAdvertisingFromSeconds: 60,
    startAdvertisingFromViews: 500,
    rightsDocument: [
      "https://example.com/live/launch",
      "https://example.com/live/launch",
    ], // media IDs returned from /upload
    adContent: [
      "https://example.com/live/launch",
      "https://example.com/live/launch",
    ], // media IDs returned from /upload
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
              - {t("aiLive.newPost")}
            </h1>
            <h2 className="text-xl italic text-gray-600">
              {t("aiLive.newPostEn")}
            </h2>
          </div>
          <button
            className="text-red-600 hover:text-red-800"
            onClick={() => navigate("/admin-control")}
          >
            <KeyboardIcon size={28} />
          </button>
        </div>

        {/* Tabs */}
        <div className="border border-black text-black">
          <PostTypeMenu activeType="ailive" />
        </div>
        {/* TÀI KHOẢN HÀNG HÓA Section */}
        <div className="grid grid-cols-5 border border-gray-300">
          <div className="border-r border-gray-300 p-2">
            <div className="font-bold text-center">
              {t("aiLive.accountOfAiLive")}
            </div>
          </div>
          <div className="border-r border-gray-300 p-2 text-center">
            <input
              type="number"
              name="exchangeRate"
              className="w-full border border-gray-300 p-1 mt-1"
              defaultValue="0"
              onChange={(e) => {
                const value = parseFloat(e.target.value) || 0;
                const calculatedValue = value * 1; // Tỉ giá mặc định là 1
                document.getElementById("calculatedValue").value =
                  calculatedValue;
              }}
            />
            <div className="font-bold flex items-center justify-center">
              <span className="mr-2">{isVisible1 ? "0" : "•••"}</span>
              <button
                type="button"
                onClick={() => setIsVisible1(!isVisible1)}
                className="text-gray-600 hover:text-gray-900"
              >
                {isVisible1 ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
              </button>
            </div>
          </div>
          <div className="border-r border-gray-300 p-2 text-center">
            <div className="font-bold  p-1 mt-1">VN</div>
            <div className="mt-1 flex items-center justify-center">
              <span className="mr-2">D|</span>
            </div>
          </div>
          <div className="border-r border-gray-300 p-2 text-center">
            <input
              type="number"
              name="exchangeRate"
              className="w-full border border-gray-300 p-1 mt-1"
              defaultValue="0"
              onChange={(e) => {
                const value = parseFloat(e.target.value) || 0;
                const calculatedValue = value * 1; // Tỉ giá mặc định là 1
                document.getElementById("calculatedValue").value =
                  calculatedValue;
              }}
            />
            <div className="font-bold flex items-center justify-center">
              <span className="mr-2">{isVisible2 ? "0" : "•••"}</span>
              <button
                type="button"
                onClick={() => setIsVisible2(!isVisible2)}
                className="text-gray-600 hover:text-gray-900"
              >
                {isVisible2 ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
              </button>
            </div>
          </div>
          <div className="p-2 text-center">
            <div className="font-bold">{t("aiLive.transferToWallet")}</div>
            <button
              type="button"
              className="mt-1 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
            >
              {t("aiLive.transfer")}
            </button>
          </div>
        </div>
        {/* Categories: VIDEO - PHIM - TRỰC TIẾP */}
        <div className="grid grid-cols-3 text-center text-white mt-4">
          <div
            className={`p-3 font-bold cursor-pointer ${
              activeTab === "video" ? "bg-blue-800" : "bg-blue-400"
            }`}
            onClick={() => setActiveTab("video")}
          >
            {t("aiLive.video")}
          </div>
          <div
            className={`p-3 font-bold cursor-pointer ${
              activeTab === "movie" ? "bg-cyan-500" : "bg-cyan-300"
            }`}
            onClick={() => setActiveTab("movie")}
          >
            {t("aiLive.movie")}
          </div>
          <div
            className={`p-3 font-bold cursor-pointer ${
              activeTab === "live" ? "bg-green-600" : "bg-green-400"
            }`}
            onClick={() => setActiveTab("live")}
          >
            {t("aiLive.live")}
          </div>
        </div>

        {/* Input Zones */}
        {activeTab === "video" && (
          <div className="text-black text-sm mt-1">
            {/* VIDEO COLUMN */}
            <div className="bg-blue-100 p-4">
              <label className="block text-red-600 font-semibold mb-2">
                * {t("aiLive.uploadVideo")}
              </label>
              <input
                type="file"
                onChange={(e) => setVideoFile(e.target.files[0])}
              />
              <label className="block mt-4 text-black font-semibold">
                * {t("aiLive.videoName")}
              </label>
              <input
                type="text"
                value={videoName}
                onChange={(e) => setVideoName(e.target.value)}
                className="w-full border rounded px-2 py-1 mt-1"
                placeholder={t("aiLive.videoNamePlaceholder")}
              />
            </div>
            <div className="bg-blue-100 p-4">
              <label className="block text-red-600 font-semibold mb-2">
                * {t("aiLive.saveLocation")}
              </label>
              <select className="w-full border rounded px-2 py-1">
                <option>-- {t("aiLive.choose")} --</option>
                <option>{t("aiLive.children")}</option>
                <option>{t("aiLive.memory")}</option>
                <option>{t("aiLive.lifeExperience")}</option>
                <option>{t("aiLive.economySociety")}</option>
                <option>{t("aiLive.sport")}</option>
                <option>{t("aiLive.entertainment")}</option>
                <option>{t("aiLive.creative")}</option>
                <option>{t("aiLive.campaignsEvents")}</option>
                <option>{t("aiLive.startupIdeas")}</option>
              </select>
            </div>
            <div className="bg-blue-100 p-4">
              <label className="block font-semibold mb-2">
                {t("aiLive.allowAdvertising")}
              </label>
              <input type="checkbox" className="mr-2" /> {t("aiLive.allow")}
            </div>
            <div className="bg-blue-100 p-4">
              <div className="flex flex-wrap -mx-2">
                <div className="w-1/2 px-2">
                  <label className="block font-semibold mb-2">
                    {t("aiLive.showAd")}
                  </label>
                  <input
                    type="number"
                    className="w-full border px-2 py-1"
                    placeholder={t("aiLive.adPricePlaceholder")}
                  />
                </div>
                <div className="w-1/2 px-2">
                  <label className="block font-semibold mb-2">
                    {t("aiLive.insertAd")}
                  </label>
                  <input
                    type="number"
                    className="w-full border px-2 py-1"
                    placeholder={t("aiLive.adPricePlaceholder")}
                  />
                </div>
              </div>
            </div>
            <div className="bg-blue-100 p-4">
              <label className="block font-semibold mb-2">
                {t("aiLive.startAdvertisingFromSeconds")}
              </label>
              <input type="number" className="w-full border px-2 py-1" />

              <label className="block font-semibold mt-4 mb-2">
                {t("aiLive.startAdvertisingFromViews")}
              </label>
              <input type="number" className="w-full border px-2 py-1" />
            </div>
            <div className="bg-blue-100 p-4">
              <div className="flex items-center">
                <div className="w-1/15 flex justify-start pl-2">
                  <input type="checkbox" className="w-6 h-6" />
                </div>
                <div className="w-14/15">
                  <span className="font-semibold">
                    {t("aiLive.confirmCopyright")}
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-blue-100 p-4"></div>
          </div>
        )}
        {activeTab === "movie" && (
          <div className="text-black text-sm mt-1">
            {/* MOVIE COLUMN */}
            <div className="bg-cyan-100 p-4">
              <label className="block text-red-600 font-semibold mb-2">
                * {t("aiLive.uploadMovie")}
              </label>
              <input
                type="file"
                onChange={(e) => setMovieFile(e.target.files[0])}
              />
              <label className="block mt-4 text-black font-semibold">
                * {t("aiLive.movieName")}
              </label>
              <input
                type="text"
                value={movieName}
                onChange={(e) => setMovieName(e.target.value)}
                className="w-full border rounded px-2 py-1 mt-1"
                placeholder={t("aiLive.movieNamePlaceholder")}
              />
            </div>
            <div className="bg-cyan-100 p-4">
              <label className="block text-red-600 font-semibold mb-2">
                * {t("aiLive.fileName")}
              </label>
              <input
                type="text"
                className="w-full border rounded px-2 py-1"
                placeholder={t("aiLive.fileNamePlaceholder")}
              />
            </div>
            <div className="bg-cyan-100 p-4">
              <label className="block text-red-600 font-semibold mb-2">
                * {t("aiLive.productOwnership")}
              </label>
              <input type="file" />
            </div>
            <div className="bg-cyan-100 p-4">
              <label className="block text-red-600 font-semibold mb-2">
                * {t("aiLive.watchPrice")}
              </label>
              <input
                type="number"
                className="w-full border px-2 py-1"
                placeholder={t("aiLive.watchPricePlaceholder")}
              />

              <label className="block text-red-600 font-semibold mt-4 mb-2">
                {t("aiLive.movieOwnerReceive")}
              </label>
              <input
                type="number"
                className="w-full border px-2 py-1"
                placeholder={t("aiLive.ownerReceivePlaceholder")}
              />
            </div>
            <div className="bg-cyan-100 p-4">
              <label className="block text-red-600 font-semibold mb-2">
                {t("aiLive.advertisingOnMainpage")}
              </label>
              <label className="block font-semibold mb-2">
                {t("aiLive.deposit")}
              </label>
              <input
                type="number"
                className="w-full border px-2 py-1"
                placeholder={t("aiLive.depositPlaceholder")}
              />
            </div>
            <div className="bg-cyan-100 p-4">
              <div className="flex flex-wrap -mx-2">
                <div className="w-1/2 px-2">
                  <label className="block font-semibold mb-2">
                    {t("aiLive.unitPrice")}
                  </label>
                  <input type="number" className="w-full border px-2 py-1" />
                </div>
                <div className="w-1/2 px-2">
                  <label bel className="block mt-4 font-semibold">
                    {t("aiLive.adContent")}
                  </label>
                  <input type="file" />
                </div>
              </div>
              <div className="bg-cyan-100 p-4">
                <div className="flex items-center">
                  <div className="w-1/15 flex justify-start pl-2">
                    <input type="checkbox" className="w-6 h-6" />
                  </div>
                  <div className="w-14/15">
                    <span className="font-semibold">
                      {t("aiLive.confirmCopyright")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-cyan-100 p-4"></div>
          </div>
        )}
        {activeTab === "live" && (
          <div className="text-black text-sm mt-1">
            {/* LIVE COLUMN */}
            <div className="bg-green-100 p-4">
              <label className="block text-red-600 font-semibold mb-2">
                * {t("aiLive.expectedAiringTime")}
              </label>

              <div className="flex flex-wrap -mx-2 mb-4">
                <div className="w-1/2 px-2">
                  <label className="block text-black font-semibold mb-1">
                    {t("aiLive.from")}
                  </label>
                  <div className="flex space-x-2 mb-2">
                    <input
                      type="time"
                      value={liveTimeStartHour || ""}
                      onChange={(e) => setLiveTimeStartHour(e.target.value)}
                      className="w-full border rounded px-2 py-1"
                    />
                  </div>
                  <input
                    type="date"
                    value={liveTimeStartDate || ""}
                    onChange={(e) => setLiveTimeStartDate(e.target.value)}
                    className="w-full border rounded px-2 py-1"
                  />
                </div>

                <div className="w-1/2 px-2">
                  <label className="block text-black font-semibold mb-1">
                    {t("aiLive.to")}
                  </label>
                  <div className="flex space-x-2 mb-2">
                    <input
                      type="time"
                      value={liveTimeEndHour || ""}
                      onChange={(e) => setLiveTimeEndHour(e.target.value)}
                      className="w-full border rounded px-2 py-1"
                    />
                  </div>
                  <input
                    type="date"
                    value={liveTimeEndDate || ""}
                    onChange={(e) => setLiveTimeEndDate(e.target.value)}
                    className="w-full border rounded px-2 py-1"
                  />
                </div>
              </div>
              <label className="block mt-4 text-black font-semibold">
                * {t("aiLive.liveName")}
              </label>
              <input
                type="text"
                value={liveName}
                onChange={(e) => setLiveName(e.target.value)}
                className="w-full border rounded px-2 py-1 mt-1"
                placeholder={t("aiLive.liveNamePlaceholder")}
              />
            </div>
            <div className="bg-green-100 p-4">
              <label className="block text-red-600 font-semibold mb-2">
                * {t("aiLive.fileName")}
              </label>
              <input
                type="text"
                className="w-full border rounded px-2 py-1"
                placeholder={t("aiLive.fileNamePlaceholder")}
              />
            </div>
            <div className="bg-green-100 p-4">
              <label className="block font-semibold mb-2">
                {t("aiLive.productOwnership")}
              </label>
              <input type="file" />
            </div>
            <div className="bg-green-100 p-4">
              <div className="flex flex-wrap -mx-2">
                <div className="w-1/3 px-2">
                  <label className="block font-semibold mb-2">
                    {t("aiLive.watchPrice")}
                  </label>
                  <input
                    type="number"
                    className="w-full border px-2 py-1"
                    placeholder="VNĐ / LIVE"
                  />
                </div>

                <div className="w-1/3 px-2">
                  <label className="block font-semibold mb-2">
                    {t("aiLive.messagePrice")}
                  </label>
                  <input
                    type="number"
                    className="w-full border px-2 py-1"
                    placeholder={t("aiLive.messagePricePlaceholder")}
                  />
                </div>

                <div className="w-1/3 px-2">
                  <label className="block font-semibold mb-2">
                    {t("aiLive.vipMessagePrice")}
                  </label>
                  <input
                    type="number"
                    className="w-full border px-2 py-1"
                    placeholder={t("aiLive.vipMessagePricePlaceholder")}
                  />
                </div>
              </div>
            </div>
            <div className="bg-green-100 p-4">
              <div className="flex flex-wrap -mx-2">
                <div className="w-1/3 px-2 flex items-center">
                  <label className="block text-red-600 font-semibold">
                    {t("aiLive.advertisingOnMainpage")}
                  </label>
                </div>

                <div className="w-2/3 px-2">
                  <div className="mb-4">
                    <label className="block font-semibold mb-2">
                      {t("aiLive.deposit")}
                    </label>
                    <input
                      type="number"
                      className="w-full border px-2 py-1"
                      placeholder={t("aiLive.depositPlaceholder")}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block font-semibold mb-2">
                      {t("aiLive.unitPrice")}
                    </label>
                    <input
                      type="number"
                      className="w-full border px-2 py-1"
                      placeholder="VNĐ / GIÂY (S) / LƯỢT XEM (View)"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-2">
                      {t("aiLive.adContent")}
                    </label>
                    <input type="file" className="w-full" />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-green-100 p-4 space-y-4">
              <div className="flex items-center">
                <label className="block text-red-600 font-semibold">
                  {t("aiLive.allowAdvertisingOnLive")}
                </label>
              </div>
              <div>
                <label className="font-semibold block">
                  {t("aiLive.showAd")}
                </label>
                <input
                  type="number"
                  className="w-full border px-2 py-1"
                  placeholder="VNĐ / GIÂY (S) / LƯỢT XEM"
                />
              </div>

              <div>
                <label className="font-semibold block">
                  {t("aiLive.startAdvertisingFromSecondsLive")}
                </label>
                <input type="number" className="w-full border px-2 py-1" />
              </div>

              <div>
                <label className="font-semibold block">
                  {t("aiLive.startAdvertisingFromViewsLive")}
                </label>
                <input type="number" className="w-full border px-2 py-1" />
              </div>

              <div className="">
                <div className="flex items-center">
                  <div className="w-1/15 flex justify-start pl-2">
                    <input type="checkbox" className="w-6 h-6" />
                  </div>
                  <div className="w-14/15">
                    <span className="font-semibold">
                      {t("aiLive.confirmCopyright")}
                    </span>
                  </div>
                </div>
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
            {t("aiLive.termsAgreement")}
          </p>
        </div>

        {/* NÚT ĐĂNG */}
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="px-8 border py-3 font-bold rounded hover:bg-gray-100 transition-all"
          >
            {t("aiLive.post")}
          </button>
        </div>
      </div>
    </div>
  );
}
