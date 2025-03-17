import React, { useState, useEffect } from "react";
import "../styles/Register.css";

export default function RegisterPage() {
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
            <h1 className="text-3xl font-bold text-black">
              1 - ĐĂNG KÝ TÀI KHOẢN
            </h1>
            <h2 className="text-2xl text-black">(ACCOUNT REGISTER)</h2>
          </div>
        </div>

        <table className="w-full border-collapse border border-gray-300 mt-4">
          <thead>
            <tr>
              <th className="border p-2 w-[5%]">STT</th>
              <th className="border p-2 w-[27%]">YÊU CẦU</th>
              <th className="border p-2 w-[50%]">QUYỀN LỢI</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2 text-center w-[5%]">1</td>
              <td className="border p-2 w-[27%]">
                <span className="text-black font-bold">
                  CCCD/ MST NGƯỜI GIỚI THIỆU{" "}
                </span>{" "}
                <br />
                (Referral ID)
              </td>
              <td className="border p-2 w-[50%]">
                <span className="text-black font-bold">
                  NHẬN TIỀN THƯỞNG GỒM: <br />
                  1. GIỚI THIỆU NGƯỜI KHÁC ĐĂNG KÝ TÀI KHOẢN. <br />
                  2. TIỀN THƯỞNG TỪ QUẢNG CÁO. <br />
                  3. TÌM RA LỖI BÀI ĐĂNG, VIDEO. <br />
                  4. CHIA LỢI NHUẬN TỪ SÀN CHO NGƯỜI HOẠT ĐỘNG NHIỀU.
                </span>{" "}
                <br />
                (Earn commission)
              </td>
            </tr>
            <tr>
              <td className="border p-2 text-center w-[5%]">2</td>
              <td className="border p-2 w-[27%]">
                <span className="text-black font-bold">
                  ĐĂNG KÝ TÀI KHOẢN:{" "}
                </span>{" "}
                <br />
                (Register)
              </td>
              <td className="border p-2 w-[50%]">
                <span className="text-black font-bold">
                  - THAM GIA TRAO ĐỔI TẤT CẢ HÀNG HÓA MÀ PHÁP LUẬT KHÔNG CẤM.
                </span>{" "}
                <br />
                (- Participate in the exchange all kinds of goods that are not
                prohibited by law). <br />
                <span className="text-black font-bold">
                  - Ai LIVE: VŨ TRỤ CÁ NHÂN - NƠI BẠN THOẢ SỨC BAY XA SÁNG TẠO,
                  KHÁM PHÁ VÀ SẼ ĐƯA BẠN TỚI BẤT KỲ NƠI ĐÂU TRONG TƯƠNG LAI CHỈ
                  BẰNG MỘT CÁI CHẠM.
                </span>{" "}
                <br />
                (Ai LIVE: PERSONAL UNIVERSE - Where you can freely fly away to
                create, explore, and will take you anywhere in the future with
                just one touch)
              </td>
            </tr>
            <tr>
              <td className="border p-2 text-center w-[5%]">3</td>
              <td className="border p-2 w-[27%]">
                <span className="text-black font-bold">
                  KHÔNG ĐĂNG KÝ TÀI KHOẢN{" "}
                </span>
                <br />
                (Not register)
              </td>
              <td className="border p-2 w-[50%]">
                <span className="text-black font-bold">
                  XEM THÔNG TIN MIỄN PHÍ{" "}
                </span>{" "}
                <br />
                (FREE VIEW INFORMATION)
              </td>
            </tr>
          </tbody>
        </table>

        <div className="mt-6">
          <h2 className="text-2xl text-center font-semibold text-black">
            1.1: NỘI DUNG YÊU CẦU ĐĂNG KÝ TÀI KHOẢN
          </h2>
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 items-center gap-4">
              <label className="text-left">
                1. CCCD/ MST NGƯỜI GIỚI THIỆU: <br />
                (Introducing from ID)
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
                (The Contract)
              </label>
              <button className="border-1 text-black px-6 py-2 rounded hover:bg-gray-200 flex-1">
                Ấn vào để xem hợp đồng
              </button>
            </div>

            <div className="grid grid-cols-2 items-center gap-4">
              <label className="text-left">
                3. ĐÃ ĐỌC KỸ VÀ HIỂU RÕ NỘI DUNG HỢP ĐỒNG: <br />
                (Have read carefully and understood the content of the Contract)
              </label>
              <input type="checkbox" className="w-5 h-5" />
            </div>

            <div className="grid grid-cols-2 items-center gap-4">
              <label className="text-left">
                4. ĐỒNG Ý KÝ HỢP ĐỒNG: <br />
                (Agree to sign contract)
              </label>
              <input type="checkbox" className="w-5 h-5" />
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <label className="text-left">
                5. HỌ TÊN CÁ NHÂN / TÊN DOANH NGHIỆP: <br />
                (Full name)
              </label>
              <input
                type="text"
                className="border p-2 rounded w-full"
                placeholder="Nhập"
              />
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <label className="text-left">
                6. CCCD/MST: <br />
                (ID)
              </label>
              <input
                type="text"
                className="border p-2 rounded w-full"
                placeholder="Nhập"
              />
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <label className="text-left">
                7. SỐ ĐIỆN THOẠI: <br />
                (Phone number)
              </label>
              <div className="flex gap-4 w-full">
                <input
                  type="text"
                  className="border p-2 rounded w-full"
                  placeholder="Nhập"
                />
                {/* <select name="" id="" className="border p-2 w-1/3 rounded">
                  <option value="">ZALO</option>
                  <option value="">WHATSAPP</option>
                  <option value="">SMS</option>
                </select> */}
              </div>
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <label className="text-left">
                8. SỐ TÀI KHOẢN (Tên chủ tài khoản trùng với họ tên cá nhân /
                tên doanh nghiệp): <br />
                (Account number)
              </label>
              <input
                type="text"
                className="border p-2 rounded w-full"
                placeholder="Nhập"
              />
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <label className="text-left">
                9. NGÂN HÀNG: <br />
                (With bank)
              </label>
              <select name="" id="" className="border p-2 rounded">
                <option value="">
                  Ngân hàng TNHH MTV Dầu khí toàn cầu (GPBank)
                </option>
                <option value="">
                  Ngân hàng Nông nghiệp và Phát triển Nông thôn Việt Nam
                  (Agribank)
                </option>
                <option value="">
                  Ngân hàng TNHH MTV Đại Dương (OceanBank)
                </option>
                <option value="">
                  Ngân hàng TMCP Công thương Việt Nam (VietinBank)
                </option>
                <option value="">
                  Ngân hàng TMCP Đầu tư và Phát triển Việt Nam (BIDV)
                </option>
                <option value="">
                  Ngân hàng TMCP Ngoại Thương Việt Nam (Vietcombank)
                </option>
              </select>
            </div>

            <div className="grid grid-cols-2 items-center gap-4">
              <label className="text-left">10. ĐỊA CHỈ NHẬN HÀNG:</label>
              <div className="flex gap-4 w-full">
                <input
                  type="text"
                  className="border p-2 rounded w-1/4"
                  placeholder="SỐ NHÀ (Number) *"
                />
                <input
                  type="text"
                  className="border p-2 rounded w-1/3"
                  placeholder="TÊN ĐƯỜNG/THÔN/ẤP(Street) *"
                />
                <select name="" id="" className="border p-2 w-1/3 rounded">
                  <option value="">PHƯỜNG / XÃ (Ward) *</option>
                  <option value=""></option>
                  <option value=""></option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <select name="" id="" className="border p-2 rounded">
                <option value="">PHƯỜNG / XÃ (Ward) *</option>
                <option value=""></option>
                <option value=""></option>
              </select>
              <select name="" id="" className="border p-2 rounded">
                <option value="">TỈNH / THÀNH PHỐ (City / Province)</option>
                <option value=""></option>
                <option value=""></option>
              </select>
              <select name="" id="" className="border p-2 rounded">
                <option value="">NƯỚC KHÁC (Other countries)</option>
                <option value=""></option>
                <option value=""></option>
              </select>
              <select name="" id="" className="border p-2 rounded">
                <option value="">GHIM VỊ TRÍ (Map)</option>
                <option value=""></option>
                <option value=""></option>
              </select>
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <label className="text-left">
                GHI CHÚ ĐẶC BIỆT: <br />
                (Special note)
              </label>
              <textarea
                className="border p-2 rounded w-full"
                placeholder="Nhập"
              ></textarea>
            </div>
            <div className="flex items-start gap-2">
              <input type="checkbox" className="w-5 h-5 mt-1" />
              <div className="text-left">
                {expanded ? (
                  <>
                    Tôi xác nhận đã đọc, hiểu rõ và đồng ý, chấp nhận tuân thủ
                    mọi điều khoản và điều kiện do SÀN THƯƠNG MẠI ĐẠI NGHĨA TÍN
                    yêu cầu bao gồm và không giới hạn về các .......... (ấn vào
                    các mục điều khoản và điều kiện này để đến các trang nội
                    dung chi tiết cho từng điều khoản và điều kiện). Việc áp
                    dụng điều khoản và điều kiện về dữ liệu cá nhân được cập
                    nhật theo Nghị định số 13/2023/NĐ-CP được chính phủ
                    ............... ban hành ngày 17/04/2023 về bảo vệ dữ liệu
                    cá nhân. Điều khoản và điều kiện về bảo vệ dữ liệu cá nhân
                    là một phần không thể tách rời của các thỏa thuận giữa SÀN
                    THƯƠNG MẠI ĐẠI NGHĨA TÍN và khách hàng. Điều khoản và điều
                    kiện về bảo vệ dữ liệu cá nhân có thể được sửa đổi trong
                    từng thời kỳ và mọi thông tin thay đổi (nếu có) sẽ được
                    thông báo, cập nhật trên website
                    http://www.santhuongmaidainghiatin.com.vn và các kênh thông
                    tin phù hợp của SÀN THƯƠNG MẠI ĐẠI NGHĨA TÍN. Để xem chi
                    tiết điều khoản và điều kiện về Bảo vệ dữ liệu cá nhân, Quý
                    khách vui lòng nhấn TẠI ĐÂY. Trường hợp cần làm rõ hoặc hỗ
                    trợ thêm về điều khoản và điều kiện về Bảo vệ dữ liệu cá
                    nhân, Quý khách vui lòng liên hệ với SÀN THƯƠNG MẠI ĐẠI
                    NGHĨA TÍN theo số hotline 0983442139.
                  </>
                ) : (
                  <>
                    Tôi xác nhận đã đọc, hiểu rõ và đồng ý, chấp nhận tuân thủ
                    mọi điều khoản và điều kiện do SÀN THƯƠNG MẠI ĐẠI NGHĨA TÍN
                    yêu cầu bao gồm và không giới hạn về các ..........
                  </>
                )}
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="text-blue-500 font-semibold ml-2"
                >
                  {expanded ? "(Rút gọn)" : "(Xem thêm)"}
                </button>
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <button className="border-2 border-black text-black font-bold px-6 py-2 rounded hover:bg-gray-200 flex-1">
              ĐĂNG KÝ <br />
              (REGISTER)
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
            (CHANGE YOUR PASSWORD)
          </h4>
          <div className="grid gap-4 mt-5">
            <input
              type="text"
              className="border p-2 rounded w-full"
              placeholder="ID"
            />
            <input
              type="password"
              className="border p-2 rounded w-full"
              placeholder="MẬT KHẨU CŨ (OLD PASSWORD)"
            />
            <input
              type="password"
              className="border p-2 rounded w-full text-sm placeholder:text-xs min-h-[50px]"
              placeholder="MẬT KHẨU MỚI (chứa IN HOA, chữ thường, số, và ký tự đặc biệt) (NEW PASSWORD include UPPERCASE, lowercase letters, numbers, and special characters)"
            />
            <input
              type="password"
              className="border p-2 rounded w-full text-sm placeholder:text-xs min-h-[50px]"
              placeholder="NHẬP LẠI MẬT KHẨU MỚI (chứa IN HOA, chữ thường, số, và ký tự đặc biệt) (REPEAT NEW PASSWORD include UPPERCASE, lowercase letters, numbers, and special characters)"
            />
          </div>

          <div className="text-center mt-4">
            <button className="border-2 border-black text-black font-bold px-6 py-2 rounded hover:bg-gray-200 flex-1">
              XÁC NHẬN <br />
              (ACCEPT)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
