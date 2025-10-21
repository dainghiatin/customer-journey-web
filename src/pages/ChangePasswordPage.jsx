import React, { useState, useEffect } from "react";
import "../styles/Register.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { changePasswordAction } from "../context/action/authActions";
import { changePassword } from "../services/authService";
import { useTranslation } from 'react-i18next';
import { Home as HomeIcon, KeyboardIcon as KeyboardIcon } from 'lucide-react';


export default function ChangePasswordPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [color, setColor] = useState(localStorage.getItem("selectedColor"));
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: user?.username,
    email: user?.email,
    password: "123456",
    newPassword: "",
    confirmPassword: "",
    cccd: user?.cccd,
    reference_id: user?.reference_id,
    full_name: user?.full_name,
    mobile_number: user?.mobile_number,
    bank_number: user?.bank_number,
    bank_name: user?.bank_name,
    address_no: user?.address_no,
    address_on_map: user?.address_on_map,
  });
  const [error, setError] = useState("");
  const [passwordValidation, setPasswordValidation] = useState({
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false,
    isValid: false
  });

  // Hàm kiểm tra yêu cầu mật khẩu
  const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[@$!%*?&]/.test(password);
    const isValid = hasUppercase && hasLowercase && hasNumber && hasSpecialChar && password.length >= 6;

    return {
      hasUppercase,
      hasLowercase,
      hasNumber,
      hasSpecialChar,
      isValid
    };
  };

  const handleChangeColor = (e) => {
    const newColor = e.target.value;
    setColor(newColor);
    localStorage.setItem("selectedColor", newColor);
  };

  useEffect(() => {
    document.getElementById("root").style.backgroundColor = color;
  }, [color]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Kiểm tra validation cho mật khẩu mới
    if (name === 'newPassword') {
      const validation = validatePassword(value);
      setPasswordValidation(validation);
    }
  };

  const handleRegister = async () => {
    const { username, cccd, newPassword, confirmPassword } = formData;

    // Kiểm tra các trường bắt buộc
    if (!cccd) {
      setError(t('auth.fillRequiredFields', 'Vui lòng điền đầy đủ thông tin cần thiết.'));
      return;
    }

    // Kiểm tra mật khẩu mới có đáp ứng yêu cầu không
    if (!passwordValidation.isValid) {
      setError(t('auth.passwordValidation.invalidPassword', 'Mật khẩu mới phải chứa ít nhất 1 chữ in hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt (@$!%*?&)'));
      return;
    }

    // Kiểm tra mật khẩu xác nhận
    if (newPassword !== confirmPassword) {
      setError(t('auth.passwordValidation.confirmPasswordMismatch', 'Mật khẩu xác nhận không khớp'));
      return;
    }

    try {
      console.log(formData);
      const response = await changePassword(formData.cccd, formData.newPassword, formData.confirmPassword)
      console.log(response.data);
      
      
      alert(t('auth.changePasswordSuccess', 'Đổi mật khẩu thành công!'));
      navigate("/"); // Chuyển hướng sau khi đăng ký thành công
    } catch (error) {
      console.error("Lỗi khi đăng ký:", error.response?.data || error.message);
      setError(t('auth.changePasswordError', 'Đổi mật khẩu thất bại. Vui lòng thử lại.'));
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
                4{/* input màu ngay dưới số 4 */}
                <input
                  type="color"
                  value={color}
                  onChange={handleChangeColor}
                  className="absolute left-1/2 transform -translate-x-1/2 top-full mt-1 w-10 h-8 cursor-pointer"
                />
              </span>
              &nbsp;- {t('changePassword.title', 'ĐỔI MẬT KHẨU')}
            </h1>
            <h2 className="text-2xl text-black mt-2">
              <i>({t('changePassword.titleEn', 'Change Password')})</i>
            </h2>
          </div>
          <button 
            className="text-red-600 hover:text-red-800"
            onClick={() => navigate("/admin-control")}
          >
            <KeyboardIcon size={28} />
          </button>
        </div>

        <div className="mt-6">
          {/* <h2 className="text-2xl text-center font-semibold text-black">
            1.2: VUI LÒNG KIỂM TRA ZALO, WHATSAPP, SMS CỦA BẠN VÀ ĐỔI MẬT KHẨU
            ĐỂ ĐĂNG NHẬP
          </h2> */}
          {/* <h4 className="text-1xl text-center font-semibold text-black mt-5">
            THAY ĐỔI MẬT KHẨU <br />
            <span className="text-xs text-gray-600">
              (CHANGE YOUR PASSWORD)
            </span>
          </h4> */}
          <span className="text-xl font-bold text-black">{t('auth.changePasswordTitle', 'Đổi mật khẩu')} </span>
          <span>({t('auth.changePasswordTitleEn', 'Change password')})</span>
          <div className="grid gap-4 mt-5">
            <input
              type="text"
              className="border p-2 rounded w-full"
              placeholder={t('auth.idPlaceholder', 'TK BANK (ID)')}
              name="cccd"
              value={formData.cccd}
              onChange={handleInputChange}

            />
            <input
              type="text"
              className="border p-2 rounded w-full"
              placeholder={t('auth.oldPasswordPlaceholder', 'MẬT KHẨU CŨ (Old password)')}
              value={user?.fullName?.replace(/\s+/g, '') || 'Tran Van A'.replace(/\s+/g, '')}
              disabled
            />
   
          <input
            type="password"
            className={`border p-2 rounded w-full text-sm min-h-[50px] ${
              formData.newPassword && !passwordValidation.isValid ? 'border-red-500' : 
              formData.newPassword && passwordValidation.isValid ? 'border-green-500' : 'border-gray-300'
            }`}
            placeholder={t('auth.newPasswordPlaceholder', 'MẬT KHẨU MỚI')}
            name="newPassword"
            value={formData.newPassword}
            onChange={handleInputChange}
            required
          />
          
          {/* Hiển thị yêu cầu mật khẩu với trạng thái */}
           {formData.newPassword && (
             <div className="text-xs space-y-1">
               <div className={`flex items-center ${passwordValidation.hasUppercase ? 'text-green-600' : 'text-red-600'}`}>
                 <span className="mr-2">{passwordValidation.hasUppercase ? '✓' : '✗'}</span>
                 {t('auth.passwordValidation.hasUppercase', 'Ít nhất 1 chữ in hoa (A-Z)')}
               </div>
               <div className={`flex items-center ${passwordValidation.hasLowercase ? 'text-green-600' : 'text-red-600'}`}>
                 <span className="mr-2">{passwordValidation.hasLowercase ? '✓' : '✗'}</span>
                 {t('auth.passwordValidation.hasLowercase', 'Ít nhất 1 chữ thường (a-z)')}
               </div>
               <div className={`flex items-center ${passwordValidation.hasNumber ? 'text-green-600' : 'text-red-600'}`}>
                 <span className="mr-2">{passwordValidation.hasNumber ? '✓' : '✗'}</span>
                 {t('auth.passwordValidation.hasNumber', 'Ít nhất 1 số (0-9)')}
               </div>
               <div className={`flex items-center ${passwordValidation.hasSpecialChar ? 'text-green-600' : 'text-red-600'}`}>
                 <span className="mr-2">{passwordValidation.hasSpecialChar ? '✓' : '✗'}</span>
                 {t('auth.passwordValidation.hasSpecialChar', 'Ít nhất 1 ký tự đặc biệt (@$!%*?&)')}
               </div>
               <div className={`flex items-center ${formData.newPassword.length >= 6 ? 'text-green-600' : 'text-red-600'}`}>
                 <span className="mr-2">{formData.newPassword.length >= 6 ? '✓' : '✗'}</span>
                 {t('auth.passwordValidation.minLength', 'Ít nhất 6 ký tự')}
               </div>
             </div>
           )}

          <label className="text-xs text-gray-500">
            ({t('auth.passwordHint', 'chứa 1 IN HOA, 1 thường, 1 số, 1 ký tự đặc biệt')})<br />
            ({t('auth.passwordHintEn', 'min 1 UPPERCASE, 1 lowercase, 1 number, 1 special character')})
          </label>

            <input
              type="password"
              className={`border p-2 rounded w-full text-sm placeholder:text-xs min-h-[50px] ${
                formData.confirmPassword && formData.newPassword !== formData.confirmPassword ? 'border-red-500' : 
                formData.confirmPassword && formData.newPassword === formData.confirmPassword && passwordValidation.isValid ? 'border-green-500' : 'border-gray-300'
              }`}
              placeholder={t('auth.confirmPasswordPlaceholder', 'NHẬP LẠI MẬT KHẨU MỚI')}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
            
            {/* Hiển thị trạng thái xác nhận mật khẩu */}
             {formData.confirmPassword && (
               <div className={`text-xs ${
                 formData.newPassword === formData.confirmPassword ? 'text-green-600' : 'text-red-600'
               }`}>
                 <span className="mr-2">{formData.newPassword === formData.confirmPassword ? '✓' : '✗'}</span>
                 {formData.newPassword === formData.confirmPassword 
                   ? t('auth.passwordValidation.passwordMatch', 'Mật khẩu khớp') 
                   : t('auth.passwordValidation.passwordMismatch', 'Mật khẩu không khớp')
                 }
               </div>
             )}

            <label className="text-xs text-gray-500">
              ({t('auth.passwordHint', 'chứa 1 IN HOA, 1 thường, 1 số, 1 ký tự đặc biệt')})<br />
              ({t('auth.passwordHintEn', 'min 1 UPPERCASE, 1 lowercase, 1 number, 1 special character')})
            </label>

            {/* Hiển thị lỗi nếu có */}
            {error && (
              <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded">
                {error}
              </div>
            )}
          </div>

          <div className="text-center mt-4">
            <button
             onClick={()=>handleRegister()}
             disabled={!passwordValidation.isValid || formData.newPassword !== formData.confirmPassword}
             className={`border-2 border-black text-black font-bold px-6 py-2 rounded flex-1 ${
               !passwordValidation.isValid || formData.newPassword !== formData.confirmPassword 
                 ? 'opacity-50 cursor-not-allowed bg-gray-100' 
                 : 'hover:bg-gray-200'
             }`}>
              {t('common.confirm', 'XÁC NHẬN')} <br />
              <span className="text-xs text-gray-600">({t('common.accept', 'Accept')})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
