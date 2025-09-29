
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { loginAction, changePasswordAction } from '../context/action/authActions';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { generateQrSession } from "../services/authService";


export default function LoginPage() {
  const { t } = useTranslation();
  const [color, setColor] = useState(localStorage.getItem("selectedColor"));
  const [cccd, setCccd] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isQrLoading, setIsQrLoading] = useState(false);
  const [qrError, setQrError] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const handleChangeColor = (e) => {
    const newColor = e.target.value;
    setColor(newColor);
    localStorage.setItem("selectedColor", newColor);
  };

  useEffect(() => {
    document.getElementById("root").style.backgroundColor = color;
  }, [color]);

  const handleLogin = async () => {
    try {
      const response = await login(cccd, password);
      console.log(response);

      
      if (response.status == 200) {
        if (!response.data?.user?.confirmed) {
           dispatch(changePasswordAction(response.data?.user))
          navigate("/change-password");
        }else{
           localStorage.setItem("authToken", response.data.token);
           // Store complete user data in localStorage for easy access
           localStorage.setItem("user", JSON.stringify(response.data.user));
           dispatch(loginAction(response.data?.user))
          console.log(auth);
        
          alert(t('auth.loginSuccess', 'Đăng nhập thành công!'));
          navigate("/"); // Chuyển hướng về trang chủ
        } 
       
      } else {
        alert(t('auth.loginError', 'THÔNG TIN NHẬP CHƯA CHÍNH XÁC, VUI LÒNG NHẬP LẠI'));
      }
    } catch (error) {
      setErrorMessage(t('auth.invalidCredentials', 'Thông tin đăng nhập không chính xác!'));
    }
  };

  const handleOpenQrModal = async () => {
    setIsQrModalOpen(true);
    setIsQrLoading(true);
    setQrError("");
    setQrDataUrl(null);
    try {
      const deviceInfo = navigator.userAgent || 'Unknown Device';
      let ipAddress = null;
      try {
        const ipRes = await axios.get('https://api.ipify.org?format=json');
        ipAddress = ipRes.data?.ip || null;
      } catch (e) {
        ipAddress = null;
      }
      const response = await generateQrSession(deviceInfo, ipAddress);
      const qrCode = response.data?.qrCode;
      if (qrCode) {
        setQrDataUrl(qrCode);
      } else {
        setQrError(t('auth.qrError', 'Không lấy được mã QR, vui lòng thử lại')); 
      }
    } catch (error) {
      setQrError(error.message || t('auth.qrError', 'Không lấy được mã QR, vui lòng thử lại'));
    } finally {
      setIsQrLoading(false);
    }
  };

  const handleCloseQrModal = () => {
    setIsQrModalOpen(false);
    setQrDataUrl(null);
    setQrError("");
    setIsQrLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-transparent backdrop-blur-md p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
        <div className="flex items-center justify-center relative">
          {/* Tiêu đề ở giữa */}
          <div className="text-center mb-4 relative">
            <h1 className="text-3xl font-bold text-black relative inline-block">
              <span className="relative">
                2{/* input màu ngay dưới số 2 */}
                <input
                  type="color"
                  value={color}
                  onChange={handleChangeColor}
                  className="absolute left-1/2 transform -translate-x-1/2 top-full mt-1 w-10 h-8 cursor-pointer"
                />
              </span>
              &nbsp;- {t('auth.loginTitle', 'ĐĂNG NHẬP')}
            </h1>

            {/* LOGIN bên dưới */}
            <h2 className="text-2xl text-black mt-2">
              <i>({t('common.login', 'Login')})</i>
            </h2>
          </div>
        </div>

        {/* LOGIN */}
        <div className="mt-6">
          {/* MÃ QR Row */}
          <div className="grid grid-cols-8">
            <div className="col-span-7"></div>
            <div className="col-span-1 p-2 font-bold text-sm border text-center rounded-sm cursor-pointer hover:bg-gray-100" onClick={handleOpenQrModal}>
              QR
            </div>
          </div>
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-1 items-center gap-4">
              <input
                type="text"
                className="border p-2 rounded w-full"
                placeholder={t('auth.idPlaceholder', 'TK BANK (ID)')}
                value={cccd}
                onChange={(e) => setCccd(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 items-center gap-4">
              <input
                type="text"
                className="border p-2 rounded w-full"
                placeholder={t('auth.password', 'MẬT KHẨU (Password)')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <div className="flex gap-4 w-full">
                <input
                  type="text"
                  className="border p-2 rounded w-full"
                  placeholder={t('auth.captchaPlaceholder', 'NHẬP MÃ CAPCHA (Input CAPCHA code)')}
                />
                <img
                  src="https://www.tnc.com.vn/uploads/File/Image/c1_2.jpg"
                  className="w-60"
                  alt=""
                />
              </div>
            </div>

            <div className="grid grid-cols-1 items-center gap-4">
              <div className="flex gap-4 w-full">
                <button
                  className="border-2 w-[50%] border-black text-black font-bold px-6 py-4 rounded hover:bg-gray-200 flex-1"
                  onClick={handleLogin}
                >
                  {t('auth.loginTitle', 'ĐĂNG NHẬP')} <br />
                  <span className="text-xs text-gray-600">({t('common.login', 'Log in')})</span>
                </button>
              </div>
            </div>
            {errorMessage && (
              <h2 className="text-xl text-center text-red-500">
                {t('auth.loginError', 'THÔNG TIN NHẬP CHƯA CHÍNH XÁC, VUI LÒNG NHẬP LẠI')} <br />
                <span className="text-xs text-red-500">
                  ({t('auth.loginErrorEn', 'Your information inputed is not correct, please try again')})
                </span>
              </h2>
            )}
          </div>
        </div>
      </div>

      {isQrModalOpen && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <button className="absolute top-2 right-2 text-gray-600 hover:text-black" onClick={handleCloseQrModal}>✕</button>
            <h3 className="text-xl font-bold mb-4 text-center">{t('auth.qrTitle', 'MÃ QR ĐĂNG NHẬP')}</h3>
            {isQrLoading && (
              <div className="text-center py-8">{t('common.loading', 'Đang tải...')}</div>
            )}
            {!isQrLoading && qrError && (
              <div className="text-center text-red-600 py-4">{qrError}</div>
            )}
            {!isQrLoading && qrDataUrl && (
              <div className="flex items-center justify-center">
                <img src={qrDataUrl} alt="QR Code" className="w-64 h-64 object-contain border" />
              </div>
            )}
            {!isQrLoading && !qrDataUrl && !qrError && (
              <div className="text-center text-gray-600 py-8">{t('auth.qrNoData', 'Chưa có dữ liệu QR')}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
