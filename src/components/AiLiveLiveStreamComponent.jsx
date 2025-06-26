import React from "react";
import { Eye, HandHeart, BookOpen, Share, Flag, Plus } from "lucide-react";

export default function AiLiveLiveStreamComponent() {
  return (
    <div className="p-6">
      {/* Dòng AVATAR */}
      <div className="grid grid-cols-2 border border-black">
        <div className="border-r border-black p-4 font-bold">AVATAR</div>
        <div className="p-4 text-sm text-black space-y-2">
          <div><span className="text-yellow-600">ấn = vào bảng thống kê</span></div>
          <ul className="list-disc ml-4 space-y-1">
            <li>
              <strong>THƯ MỤC THEO DÕI:</strong> Có cập nhật và hiển thị số lượng người đang theo dõi mình lên trên thư mục. Ấn vào thư mục để hiển thị AVATAR người theo dõi mình trong thư mục này.
            </li>
            <li>
              <strong>THƯ MỤC XEM:</strong> Có cập nhật và hiển thị số người mình đang theo dõi lên trên thư mục. Ấn vào thư mục để hiển thị AVATAR người mình theo dõi trong thư mục này.
            </li>
            <li>
              Trên đầu các AVATAR này hiển thị số cập nhật bài đăng livestream mới của người này mà mình chưa xem. Ấn vào các AVATAR của họ để chỉ được xem các thư mục ID HÀNG HÓA chứa các video livestream của họ (không xem được thư mục ID của ai và ai đang theo dõi họ).
            </li>
            <li>
              Trên mỗi AVATAR của người mình đang theo dõi có nút XÓA (gạch chéo) để loại người đó khỏi danh sách mình theo dõi, và AVATAR của mình sẽ tự động mất ở THƯ MỤC THEO DÕI của họ (người bị xoá).
            </li>
            <li>
              <strong>CÁC THƯ MỤC ID HÀNG HÓA – TÊN HÀNG HÓA:</strong> (tự động hiển thị số lượt duyệt là đồng ý của người duyệt DỮ LIỆU cho video livestream của ID hàng hoá này) và có thể sắp xếp tăng dần – giảm dần theo lượt duyệt đồng ý đó.
            </li>
            <li>
              Khi đăng 01 bài mà yêu cầu LIVESTREAM thì hệ thống hiển thị TÊN HÀNG HÓA ở đó.
            </li>
            <li>
              Ấn vào các THƯ MỤC này để xem video livestream đã được tải lên theo từng bài đăng hoặc post.
            </li>
            <li>
              Ấn vào các video livestream này và nhấn XÓA nếu muốn. Chỉ nên chọn 01 video để phát nhiều video livestream cùng 1 lúc và ở các mục khác nhau.
            </li>
            <li>
              Khi các bài đăng hết hạn post thì các ID hàng hóa này (chứa các video livestream) cũng tự động XÓA.
            </li>
            <li>
              <strong>THƯ MỤC LƯU:</strong> hiển thị số lượng video livestream đã lưu. Ấn để vào bên trong chứa các video livestream đã lưu.
            </li>
          </ul>
        </div>
      </div>

      {/* Phần tìm kiếm */}
      <div className="border-l border-r border-b border-black">
        <div className="p-2 text-sm flex items-center gap-2">
          <span className="font-bold">TÌM KIẾM (Search):</span>
          <input 
            type="text" 
            placeholder="nhập ID HÀNG HÀNG - TÊN HÀNG HÓA"
            className="flex-1 border border-gray-300 px-2 py-1 rounded text-sm"
          />
        </div>
      </div>

      {/* Danh sách hàng hóa và VIDEO LIVESTREAM */}
      <div className="grid grid-cols-2 border-l border-r border-b border-black">
        {/* Cột trái - Danh sách hàng hóa */}
        <div className="border-r border-black">
          <div className="p-2 text-sm">
            <div className="mb-2">
              <span className="font-bold">Danh sách tên các hàng hóa đang LIVESTREAM được sắp xếp theo thứ tự</span>
              <div className="text-yellow-600 ml-4">1 - Nạp tiền quảng cáo lớn - 2 - Số lượng phí trả sau lời - 3 - Gần trị hàng hóa lời - 4 - Thứ tự bán hàng</div>
              <div className="text-yellow-600 ml-4">(5 - Số bài viết (6 - 6 - Người theo dõi lời )</div>
            </div>
          </div>

          {/* 10 dòng hàng hóa */}
          {Array.from({ length: 10 }, (_, index) => (
            <div key={index} className="border-t border-gray-300 p-2 text-sm">
              <div>- Tên hàng hóa đầu tiên</div>
              <div className="ml-4">- ID hàng hóa</div>
              <div className="ml-4">- hiển thị số người đang xem</div>
            </div>
          ))}

          {/* Phân trang */}
          <div className="border-t border-gray-300 p-2 text-center">
            <span className="text-sm">Trang / Page: 2, 3, 4, 5, 6 ...</span>
          </div>
        </div>

        {/* Cột phải - VIDEO LIVESTREAM */}
        <div className="p-4 h-screen flex flex-col">
          <div className="text-center font-bold mb-4">VIDEO LIVESTREAM</div>
          
          <div className="border border-black p-4 flex-1 flex flex-col">
            <div className="mb-4">
              <div className="text-sm mb-2">
                <span className="font-bold">Hình nền:</span> ID hàng hóa - Tên hàng hóa (đầu tiên)
              </div>
              <div className="text-sm flex items-center justify-end">
                <Eye size={16} />
              </div>
            </div>

            <div className="mb-4">
              <div className="text-sm flex items-center justify-end">
                <HandHeart size={16} />
              </div>
            </div>

            <div className="mb-4">
              <div className="text-sm flex items-center justify-end">
                <Plus size={16} />
              </div>
            </div>

            <div className="mb-4">
              <div className="text-sm flex items-center justify-end mb-2">
                <BookOpen size={16} />
              </div>
              <div className="text-sm flex items-center justify-end">
                <Share size={16} />
              </div>
            </div>

            <div className="mb-4">
              <div className="text-sm flex items-center justify-end mb-2">
                <Flag size={16} />
              </div>
              <div className="text-sm ml-4">- Vi phạm pháp luật</div>
            </div>

            <div className="text-sm mb-4">
              <div className="font-bold">HÀNG HÓA</div>
            </div>

            {/* Các nút video - flex-1 để chiếm hết không gian còn lại */}
            {/* <div className="flex-1 flex flex-col justify-center space-y-2">
              {Array.from({ length: 4 }, (_, index) => (
                <div key={index} className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-yellow-100 p-2 text-center">ấn = vào video livestream</div>
                  <div className="bg-yellow-100 p-2 text-center">Gạt lên = dẫn video livestream tập theo gióng tiktok</div>
                </div>
              ))}
            </div>

            <div className="mt-4 text-center">
              <div className="bg-yellow-100 p-2 text-sm">ấn = đến trang</div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}