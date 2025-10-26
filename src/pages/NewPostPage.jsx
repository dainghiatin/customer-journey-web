import React, { useState, useEffect, useRef } from "react";
import Tesseract from "tesseract.js";
import "../styles/Login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Home as HomeIcon,
  KeyboardIcon as KeyboardIcon,
  Camera as CameraIcon,
} from "lucide-react";
import PostTypeMenu from "../components/PostTypeMenu";
import useBlinkIdScanner from "../components/MicrolinkIDScanner";
import { extractSideDocumentImage } from "@microblink/blinkid";

export default function NewPostPage() {
  const { t } = useTranslation();
  const [color, setColor] = useState(localStorage.getItem("selectedColor"));
  const [showCamera, setShowCamera] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [hasIdCaptured, setHasIdCaptured] = useState(false);
  const [idPhotoDataUrl, setIdPhotoDataUrl] = useState(null);
  const [hasBusinessVideo, setHasBusinessVideo] = useState(false);
  const [businessVideoUrl, setBusinessVideoUrl] = useState(null);
  const [isVideoMode, setIsVideoMode] = useState(false);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const [isOcrRunning, setIsOcrRunning] = useState(false);
  const [ocrHasText, setOcrHasText] = useState(null);
  const [ocrError, setOcrError] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const recordTimerRef = useRef(null);
  const [previewBlocked, setPreviewBlocked] = useState(false);
  const containerRef = useRef(null);

  const { scanId, toggle } = useBlinkIdScanner({
    onSuccess: (result) => {
      setHasIdCaptured(true);
      setIdPhotoDataUrl(result.faceImage);
      console.log(result);
      closeCamera();
    },
    onError: (error) => {
      console.error("BlinkID Scan Error:", error);
      alert(t("scanner.error"));
      closeCamera();
    },
  });

  const handleChangeColor = (e) => {
    const newColor = e.target.value;
    setColor(newColor);
    localStorage.setItem("selectedColor", newColor);
  };

  useEffect(() => {
    document.getElementById("root").style.backgroundColor = color;
    const token = localStorage.getItem("authToken");
    setUser(token);

    // Cleanup camera stream when component unmounts
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [color, cameraStream]);

  const openCamera = async (e, mode) => {
    if (e && e.preventDefault) e.preventDefault();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraStream(stream);
      setShowCamera(true);
      setIsVideoMode(mode === "video");

      if (videoRef.current) {
        const video = videoRef.current;
        video.srcObject = stream;
        video.muted = true; // allow autoplay without user gesture
        try {
          await video.play();
          setPreviewBlocked(false);
        } catch (_) {
          // some browsers block autoplay even when muted
          setPreviewBlocked(true);
        }
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert(t("camera.error"));
    }
  };

  const closeCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
    }
    setCameraStream(null);
    setShowCamera(false);
    setIsVideoMode(false);
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      try {
        mediaRecorderRef.current.stop();
      } catch (_) {}
    }
    recordedChunksRef.current = [];
    if (recordTimerRef.current) {
      clearInterval(recordTimerRef.current);
      recordTimerRef.current = null;
    }
    setIsRecording(false);
    setRecordSeconds(0);
  };

  const tryStartPreview = async () => {
    const video = videoRef.current;
    if (!video) return;
    try {
      await video.play();
      setPreviewBlocked(false);
    } catch (_) {
      setPreviewBlocked(true);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    const width = video.videoWidth || 640;
    const height = video.videoHeight || 480;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, width, height);
    const dataUrl = canvas.toDataURL("image/png");
    setIdPhotoDataUrl(dataUrl);
    setHasIdCaptured(true);
    closeCamera();
  };

  const handleContractUpload = (e) => {
    // removed: switching to video recording instead of upload
  };

  const startRecording = () => {
    if (!cameraStream) return;
    recordedChunksRef.current = [];
    const mediaRecorder = new MediaRecorder(cameraStream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        recordedChunksRef.current.push(event.data);
      }
    };
    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      if (businessVideoUrl) {
        try {
          URL.revokeObjectURL(businessVideoUrl);
        } catch (_) {}
      }
      setBusinessVideoUrl(url);
      setHasBusinessVideo(true);
      // kick off OCR check at ~5s frame
      runOcrOnVideo(url);
    };
    mediaRecorder.start();
    setIsRecording(true);
    setRecordSeconds(0);
    if (recordTimerRef.current) clearInterval(recordTimerRef.current);
    recordTimerRef.current = setInterval(() => {
      setRecordSeconds((s) => s + 1);
    }, 1000);
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }
    if (recordTimerRef.current) {
      clearInterval(recordTimerRef.current);
      recordTimerRef.current = null;
    }
    setIsRecording(false);
    // keep modal open briefly to avoid abrupt close; but current UX closes.
    closeCamera();
  };

  const runOcrOnVideo = async (videoUrl) => {
    try {
      setIsOcrRunning(true);
      setOcrHasText(null);
      setOcrError(null);

      // Create an off-DOM video element to seek to 5s
      const tempVideo = document.createElement("video");
      tempVideo.src = videoUrl;
      tempVideo.crossOrigin = "anonymous";
      tempVideo.preload = "auto";

      await new Promise((resolve, reject) => {
        const onLoaded = () => resolve();
        const onError = () =>
          reject(new Error("Cannot load recorded video for OCR"));
        tempVideo.addEventListener("loadedmetadata", onLoaded, { once: true });
        tempVideo.addEventListener("error", onError, { once: true });
      });

      const targetTime = Math.min(
        5,
        tempVideo.duration ? tempVideo.duration - 0.1 : 5
      );

      await new Promise((resolve) => {
        const onSeeked = () => resolve();
        tempVideo.currentTime = targetTime > 0 ? targetTime : 0;
        tempVideo.addEventListener("seeked", onSeeked, { once: true });
      });

      const canvas = document.createElement("canvas");
      const width = tempVideo.videoWidth || 640;
      const height = tempVideo.videoHeight || 480;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas context not available");
      ctx.drawImage(tempVideo, 0, 0, width, height);

      const dataUrl = canvas.toDataURL("image/png");
      const { data } = await Tesseract.recognize(dataUrl, "eng+vie");
      const text = data && data.text ? data.text.trim() : "";
      setOcrHasText(Boolean(text));
    } catch (err) {
      console.error("OCR error:", err);
      setOcrError(err.message || "OCR failed");
      setOcrHasText(null);
    } finally {
      setIsOcrRunning(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-transparent backdrop-blur-md p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
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
                4{/* input màu ngay dưới số 2 */}
                <input
                  type="color"
                  value={color}
                  onChange={handleChangeColor}
                  className="absolute left-1/2 transform -translate-x-1/2 top-full mt-1 w-10 h-8 cursor-pointer"
                />
              </span>
              &nbsp;- {t("posts.newPost")}
            </h1>

            {/* LOGIN bên dưới */}
            <h2 className="text-2xl text-black mt-2">
              <i>{t("posts.newPostEn")}</i>
            </h2>
          </div>
          <button
            className="text-red-600 hover:text-red-800"
            onClick={() => navigate("/admin-control")}
          >
            <KeyboardIcon size={28} />
          </button>
        </div>

        {/* Two large boxes layout */}
        <div className="mt-6" ref={containerRef}>
          <div className="grid grid-cols-2 gap-4 border border-gray-300">
            {/* Scan CCCD */}
            <div
              className="border-r border-gray-400 p-4 text-center cursor-pointer"
              onClick={(e) => toggle(e)}
            >
              <div className="flex flex-col items-center justify-center h-40">
                <CameraIcon size={48} className="mb-2" />
                <h3 className="font-bold text-lg">{t("posts.scanId")}</h3>
                {hasIdCaptured && (
                  <p className="text-green-600 mt-2">{t("camera.captured")}</p>
                )}
              </div>
            </div>

            {/* Business registration video recording */}
            <div
              className="p-4 text-center cursor-pointer"
              onClick={(e) => openCamera(e, "video")}
            >
              <div className="flex flex-col items-center justify-center h-40">
                <CameraIcon size={48} className="mb-2" />
                <h3 className="font-bold text-lg">{t("posts.recordVideo")}</h3>
                {hasBusinessVideo && (
                  <div className="text-center mt-2">
                    <p className="text-green-600">
                      {t("camera.videoRecorded")}
                    </p>
                    {isOcrRunning && (
                      <p className="text-blue-600 mt-1">{t("ocr.running")}</p>
                    )}
                    {!isOcrRunning && ocrError && (
                      <p className="text-red-600 mt-1">
                        {t("ocr.error")}: {ocrError}
                      </p>
                    )}
                    {!isOcrRunning && ocrHasText === true && (
                      <p className="text-green-700 mt-1">{t("ocr.hasText")}</p>
                    )}
                    {!isOcrRunning && ocrHasText === false && (
                      <p className="text-yellow-700 mt-1">{t("ocr.noText")}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Three columns layout */}
        <div className="mt-6">
          <div className="border border-gray-300">
            {/* Using the common PostTypeMenu component */}
            {hasIdCaptured && hasBusinessVideo ? (
              <PostTypeMenu activeType={null} />
            ) : (
              <div className="p-4 text-center text-gray-700">
                {t("posts.requirements")}
              </div>
            )}
          </div>
        </div>

        {/* Camera Modal */}
        {showCamera && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg max-w-2xl w-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{t("camera.title")}</h2>
                <button
                  className="text-gray-700 hover:text-gray-900"
                  onClick={closeCamera}
                >
                  ✕
                </button>
              </div>
              <div className="relative">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-auto border border-gray-300 rounded"
                />
                {previewBlocked && (
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <button
                      className="bg-white text-black px-3 py-2 rounded shadow"
                      onClick={tryStartPreview}
                    >
                      {t("camera.clickToPreview")}
                    </button>
                  </div>
                )}
                {isVideoMode && isRecording && (
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-sm px-2 py-1 rounded">
                    {t("camera.recording")}{" "}
                    {String(Math.floor(recordSeconds / 60)).padStart(2, "0")}:
                    {String(recordSeconds % 60).padStart(2, "0")}
                  </div>
                )}
              </div>
              <div className="mt-4 flex justify-center">
                {!isVideoMode ? (
                  <>
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2"
                      onClick={capturePhoto}
                    >
                      {t("camera.capture")}
                    </button>
                    <button
                      className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                      onClick={closeCamera}
                    >
                      {t("camera.cancel")}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className={`px-4 py-2 rounded mr-2 text-white ${
                        isRecording
                          ? "bg-red-300 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600"
                      }`}
                      onClick={startRecording}
                      disabled={isRecording}
                    >
                      {t("camera.startRecording")}
                    </button>
                    {isRecording && (
                      <button
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                        onClick={stopRecording}
                      >
                        {t("camera.stopRecording")}
                      </button>
                    )}
                    {!isRecording && (
                      <button
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                        onClick={closeCamera}
                      >
                        {t("camera.cancel")}
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
