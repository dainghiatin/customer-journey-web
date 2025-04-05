import React, { useState, useEffect } from "react";
import "../styles/Register.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
  const [color, setColor] = useState(localStorage.getItem("selectedColor"));
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "123456",
    cccd: "",
    reference_id: "",
    full_name: "",
    mobile_number: "",
    bank_number: "",
    bank_name: "",
    address_no: "",
    address_on_map: "",
  });
  const [listBanks, setListBanks] = useState([]);

  const [error, setError] = useState("");

  const handleChangeColor = (e) => {
    const newColor = e.target.value;
    setColor(newColor);
    localStorage.setItem("selectedColor", newColor);
  };

  useEffect(() => {
    document.getElementById("root").style.backgroundColor = color;
  }, [color]);
  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await axios.get(
          "https://api.vietqr.io/v2/banks"
        );
        setListBanks(response.data.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách ngân hàng:", error);
      }
    };
    fetchBanks();
  },[])

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    const { username, cccd } = formData;

    // Kiểm tra các trường bắt buộc
    if (!cccd) {
      setError("Vui lòng điền đầy đủ thông tin cần thiết.");
      return;
    }

    try {
      console.log(formData);
      const response = await axios.post(
        "http://localhost:1337/api/auth/register",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Đăng ký thành công:", response.data);
      alert("Đăng ký thành công!");
      navigate("/login"); // Chuyển hướng sau khi đăng ký thành công
    } catch (error) {
      console.error("Lỗi khi đăng ký:", error.response?.data || error.message);
      setError("Đăng ký thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-transparent backdrop-blur-md p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
        <div className="flex items-center justify-center relative">
          {/* Input Color nằm bên trái */}
          <input
            type="color"
            value={color}
            onChange={handleChangeColor}
            className="absolute left-0 my-2"
          />
          {/* Tiêu đề ở giữa */}
          <div className="text-center w-full">
            <h1 className="text-3xl font-bold text-black">1 - ĐĂNG KÝ</h1>
            <h2 className="text-2xl text-black">
              <span className="text-xs text-gray-600">(REGISTER)</span>
            </h2>
          </div>
        </div>
        <div className="mt-6">
          <div className="space-y-4 mt-4">
            {error && <p className="text-red-500">{error}</p>}
            <div className="grid grid-cols-2 items-center gap-4">
              <label className="text-left">
                1. CCCD/ MST NGƯỜI GIỚI THIỆU: <br />
                <span className="text-xs text-gray-600">
                  (Introducing from ID)
                </span>
              </label>
              <input
                type="text"
                className="border p-2 rounded w-full"
                placeholder="Nhập"
              />
            </div>

            <div className="grid grid-cols-2 items-center gap-4">
              <label className="text-left">
                2. HỢP ĐỒNG: <br />
                <span className="text-xs text-gray-600">(The Contract)</span>
              </label>
              <div className="relative w-full flex items-center">
                <button className="border-1 text-black px-6 py-2 rounded hover:bg-gray-200 flex-1">
                  Ấn xem file
                </button>
                <span className="text-red-500 ml-2">*</span>
              </div>
            </div>

            <div className="grid grid-cols-2 items-center gap-4">
              <label className="text-left">
                3. KÝ HỢP ĐỒNG: <br />
                <span className="text-xs text-gray-600">(Sign contract)</span>
              </label>
              <div className="relative w-full flex items-center">
                <input type="checkbox" className="w-5 h-5" />
                <span className="text-red-500 ml-2">*</span>
              </div>
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <label className="text-left">
                4. HỌ TÊN / TÊN DOANH NGHIỆP: <br />
                <span className="text-xs text-gray-600">(Full name)</span>
              </label>
              <div className="relative w-full flex items-center">
                <input
                  type="text"
                  className="border p-2 rounded w-full"
                  placeholder="Nhập"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                />
                <span className="text-red-500 ml-2">*</span>
              </div>
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <label className="text-left">
                5. CCCD/MST: <br />
                <span className="text-xs text-gray-600">(ID)</span>
              </label>
              <div className="relative w-full flex items-center">
                <input
                  type="text"
                  className="border p-2 rounded w-full"
                  placeholder="Nhập"
                  name="cccd"
                  value={formData.cccd}
                  onChange={handleInputChange}
                />
                <span className="text-red-500 ml-2">*</span>
              </div>
            </div>
            {/* <div className="grid grid-cols-2 items-center gap-4">
              <label className="text-left">
                6. SỐ ĐIỆN THOẠI: <br />
                <span className="text-xs text-gray-600">(Phone number)</span>
              </label>
              <div className="flex gap-4 w-full">
                <input
                  type="text"
                  className="border p-2 rounded w-full"
                  placeholder="Nhập"
                />
              </div>
            </div> */}
            <div className="grid grid-cols-2 items-center gap-4">
              <label className="text-left">
                6. SỐ TÀI KHOẢN: <br />
                <span className="text-xs text-gray-600">(Account number)</span>
              </label>
              <div className="relative w-full flex items-center">
                <input
                  type="text"
                  className="border p-2 rounded w-full"
                  placeholder="Nhập"
                /><span className="text-red-500 ml-2">*</span>
              </div>
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <label className="text-left">
                7. NGÂN HÀNG: <br />
                <span className="text-xs text-gray-600">(With bank)</span>
              </label>

              <div className="relative w-full flex items-center">
                <select
                  className="border p-2 rounded w-full"
                  name="bank_name"
                  value={formData.bank_name}
                  onChange={handleInputChange}
                >
                  <option value="">Chọn ngân hàng</option>
                  {listBanks.map((bank) => (
                    <option key={bank.id} value={bank.shortName}>
                      {bank.name}
                    </option>
                  ))}
                  {/* <option value="Techcombank">
                    Ngân hàng TMCP Kỹ thương Việt Nam (Techcombank)
                  {/* <option value="GPBank">
                    Ngân hàng TNHH MTV Dầu khí toàn cầu (GPBank)
                  </option>
                  <option value="Agribank">
                    Ngân hàng Nông nghiệp và Phát triển Nông thôn Việt Nam
                    (Agribank)
                  </option>
                  <option value="OceanBank">
                    Ngân hàng TNHH MTV Đại Dương (OceanBank)
                  </option>
                  <option value="VietinBank">
                    Ngân hàng TMCP Công thương Việt Nam (VietinBank)
                  </option>
                  <option value="BIDV">
                    Ngân hàng TMCP Đầu tư và Phát triển Việt Nam (BIDV)
                  </option>
                  <option value="Vietcombank">
                    Ngân hàng TMCP Ngoại Thương Việt Nam (Vietcombank)
                  </option> */}
                </select>
                <span className="text-red-500 ml-2">*</span>
              </div>
            </div>

            <div className="grid grid-cols-2 items-center gap-4">
              <label className="text-left">
                8. ĐỊA CHỈ NHẬN HÀNG: <br />
                <span className="text-xs text-gray-600">
                  (Receive goods's address)
                </span>
              </label>
              <div className="flex w-full">
                <div className="relative w-full flex items-center">
                  <input
                    type="text"
                    className="border p-2 rounded w-1/2"
                    placeholder="SỐ NHÀ (Number) *"
                    name="address_no"
                    value={formData.address_no}
                    onChange={handleInputChange}
                  />
                  <span className="text-red-500 ml-2">*</span>
                </div>
                <div className="text-center w-1/2">
                  <button className="border-2 border-black text-black font-bold px-6 py-2 rounded hover:bg-gray-200">
                    GHIM VỊ TRÍ{" "}
                    <span className="text-xs text-gray-600">(Map)</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <label className="text-left">
                9. KÝ TỰ KHÔI PHỤC MẬT KHẨU <br />
                <span className="text-xs text-gray-600">
                  (Password recovery character)
                </span>
              </label>
              <div className="relative w-full flex items-center">
                <input
                  type="text"
                  className="border p-2 rounded w-full"
                  placeholder="Nhập"
                // name="bank_number"
                // value={formData.bank_number}
                // onChange={handleInputChange}
                />
                <span className="text-red-500 ml-2">*</span>
              </div>
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <label className="text-left">
                10. NHẬP LẠI KÝ TỰ KHÔI PHỤC MẬT KHẨU <br />
                <span className="text-xs text-gray-600">
                  (Repeat password recovery character)
                </span>
              </label>
              <div className="relative w-full flex items-center">
                <input
                  type="text"
                  className="border p-2 rounded w-full"
                  placeholder="Nhập"
                // name="bank_number"
                // value={formData.bank_number}
                // onChange={handleInputChange}
                />
                <span className="text-red-500 ml-2">*</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="flex flex-col items-center">
                <input type="checkbox" className="w-5 h-5" />
                <span className="text-red-500 text-lg">*</span>
              </div>
              <div className="text-left">
                Tôi xác nhận đã đọc, hiểu rõ và đồng ý, chấp nhận ký hợp đồng
                cũng như tuân thủ mọi điều khoản và điều kiện do website - app
                yêu cầu bao gồm các nội dung sau: <br />
                <span className="text-xs text-gray-600">
                  (I confirm that I have read, understood and agreed to sign the
                  contract and comply with all terms and conditions required by
                  the website - app including the following contents)
                </span>{" "}
                <br />
                <b>1. Tự động đăng xuất sau 168 h đăng nhập.</b> <br />
                <span className="text-xs text-gray-600">
                  (Automatically log out after 168 hours of login)
                </span>
                <br />
                <b>2. Tự động khóa tài khoản sau 365 h (giờ) đăng xuất.</b>
                <br />
                <span className="text-xs text-gray-600">
                  (Automatically lock account after 365 hours of logging out)
                </span>
                <br />
                <b>3. Tự động xóa tài khoản sau 365 ngày bị khóa.</b>
                <br />
                <span className="text-xs text-gray-600">
                  (Automatically delete account after 365 days of being locked)
                </span>
                <br />
                <b>4. Đăng nhập sai liên tiếp 05 lần sẽ bị khóa tài khoản.</b>
                <br />
                <span className="text-xs text-gray-600">
                  (Login incorrectly 05 times in a row will lock the account)
                </span>
                <br />
                5…..
              </div>
            </div>
            <p></p>
          </div>
          <div className="text-center mt-4">
            <button
              className="border-2 border-black text-black font-bold px-6 py-2 rounded hover:bg-gray-200 flex-1 w-100"
              onClick={handleRegister}
            >
              ĐĂNG KÝ <br />
              <span className="text-xs text-gray-600">(REGISTER)</span>
            </button>
          </div>
        </div>

        <div className="mt-6">
          {/* <h2 className="text-2xl text-center font-semibold text-black">
            1.2: VUI LÒNG KIỂM TRA ZALO, WHATSAPP, SMS CỦA BẠN VÀ ĐỔI MẬT KHẨU
            ĐỂ ĐĂNG NHẬP
          </h2> */}
          <h4 className="text-1xl text-center font-semibold text-black mt-5">
            THAY ĐỔI MẬT KHẨU <br />
            <span className="text-xs text-gray-600">
              (CHANGE YOUR PASSWORD)
            </span>
          </h4>
          <div className="grid gap-4 mt-5">
            <input
              type="text"
              className="border p-2 rounded w-full"
              placeholder="CCCD / MST (ID)"
            />
            <input
              type="password"
              className="border p-2 rounded w-full"
              placeholder="MẬT KHẨU CŨ (Old password)"
            />
            <input
              type="password"
              className="border p-2 rounded w-full text-sm placeholder:text-xs min-h-[50px]"
              placeholder="MẬT KHẨU MỚI (chứa IN HOA, chữ thường, số, và ký tự đặc biệt)(New password inlclude UPPERCASE, lowercase letters, numbers, and special characters)"
            />
            <input
              type="password"
              className="border p-2 rounded w-full text-sm placeholder:text-xs min-h-[50px]"
              placeholder="NHẬP LẠI MẬT KHẨU MỚI (chứa IN HOA, chữ thường, số, và ký tự đặc biệt)(Repeat new password  inlclude UPPERCASE, lowercase letters, numbers, and special characters)"
            />
          </div>

          <div className="text-center mt-4">
            <button className="border-2 border-black text-black font-bold px-6 py-2 rounded hover:bg-gray-200 flex-1">
              XÁC NHẬN <br />
              <span className="text-xs text-gray-600">(ACCEPT)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
