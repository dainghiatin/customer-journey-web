import React, { useState } from "react";
import {
  Eye,
  HandHeart,
  BookOpen,
  Share,
  Flag,
  Plus,
  CircleX,
} from "lucide-react";
import { useTranslation } from 'react-i18next';

export default function AiLiveLiveComponent() {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="p-6">
      {/* Dòng AVATAR */}
      <div className="grid grid-cols-2 border border-black">
        <div className="border-r border-black p-4 font-bold">{t('aiLive.avatar', 'AVATAR')}</div>
        <div className="p-4 text-sm text-black space-y-2">
          <div>
            <span className="text-yellow-600">{t('aiLive.clickStats', 'ấn = vào bảng thống kê')}</span>
          </div>
          <ul className="list-disc ml-4 space-y-1">
            <li>
              <strong>{t('aiLive.whoFollowsMe', 'THƯ MỤC AI THEO DÕI')}:</strong> {t('aiLive.whoFollowsMeDesc', 'Có cập nhật và hiển thị số lượng người đang theo dõi mình lên trên thư mục. Ấn vào thư mục để hiển thị AVATAR người theo dõi mình trong thư mục này.')}
            </li>
            <li>
              <strong>{t('aiLive.whoIFollow', 'THƯ MỤC THEO DÕI AI')}:</strong> {t('aiLive.whoIFollowDesc', 'Có cập nhật và hiển thị số lượng người mình đang theo dõi lên trên thư mục. Ấn vào thư mục để hiển thị AVATAR người mình theo dõi trong thư mục này. Các AVATAR XANH thể hiện người này đang LIVE. Ấn vào các AVATAR của họ đến đến buôi LIVE của họ.')}
            </li>
            <li>
              Trên mỗi AVATAR của người mình đang theo dõi có nút XÓA (gạch
              chéo) để loại người đó khỏi danh sách mình theo dõi, và AVATAR của
              mình sẽ tự động mất ở THƯ MỤC THEO DÕI của họ (người mình đang
              theo dõi).
            </li>
            <li>
              <strong>THƯ MỤC LƯU TRỮ:</strong> Lưu trữ các video đã phát trực
              tiếp trước đó mà ko bị báo cáo vi phạm.
            </li>
            <li>
              <strong>THƯ MỤC VI PHẠM:</strong> Các video bằng chứng live vi
              phạm bị báo cáo 1 lần sẽ chuyển sang mục này. (Record buổi live đó
              và lưu trên hệ thống, khi bị báo cáo thì chuyển về thư mục này để
              người live biết, người báo cáo chỉ hiện trên hệ thống.
            </li>
            <li>
              <button
                onClick={() => alert("Phát live")}
                className="font-bold text-left text-blue-700 hover:underline"
              >
                PHÁT LIVE
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Phần tìm kiếm */}
      <div className="border-l border-r border-b border-black">
        <div className="p-2 text-sm flex items-center gap-2">
          <span className="font-bold">{t('aiLive.search', 'TÌM KIẾM')} ({t('aiLive.searchEn', 'Search')}):</span>
          <input
            type="text"
            placeholder={t('aiLive.searchPlaceholder', 'nhập TÊN THƯ MỤC PHIM')}
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
              <span className="font-bold">
                {t('aiLive.productListDesc', 'Danh sách tên các hàng hóa đang LIVESTREAM được sắp xếp theo thứ tự')}
              </span>
              <div className="text-yellow-600 ml-4">
                1 - Nạp tiền quảng cáo lớn - 2 - Số lượng phí trả sau lời - 3 -
                Gần trị hàng hóa lời - 4 - Thứ tự bán hàng
              </div>
              <div className="text-yellow-600 ml-4">
                (5 - Số bài viết (6 - 6 - Người theo dõi lời )
              </div>
            </div>
          </div>

          {/* 10 dòng hàng hóa */}
          {Array.from({ length: 10 }, (_, index) => (
            <div key={index} className="border-t border-gray-300 p-2 text-sm">
              <div>- {t('aiLive.firstProduct', 'Tên hàng hóa đầu tiên')}</div>
              <div className="ml-4">- {t('aiLive.productId', 'ID hàng hóa')}</div>
              <div className="ml-4">- {t('aiLive.viewerCount', 'hiển thị số người đang xem')}</div>
            </div>
          ))}

          {/* Phân trang */}
          <div className="border-t border-gray-300 p-2 text-center">
            <span className="text-sm">{t('aiLive.page', 'Trang')} / {t('aiLive.pageEn', 'Page')}: 2, 3, 4, 5, 6 ...</span>
          </div>
        </div>

        {/* Cột phải - VIDEO LIVESTREAM */}
        <div className="p-4 h-screen flex flex-col">
          <div className="text-center font-bold mb-4">{t('aiLive.live', 'LIVE')}</div>

          <div className="border border-black p-4 flex-1 flex flex-col">
            <div className="mb-4">
              <div className="text-sm mb-2 text-center">
                <span className="font-bold">{t('aiLive.avatar', 'AVATAR')}:</span> {t('aiLive.liveName', 'Tên LIVE')}
              </div>
              <div className="text-sm flex items-center justify-end">
                <Eye size={16} />
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
              <div className="text-sm ml-4">- {t('aiLive.lawViolation', 'Vi phạm pháp luật')}</div>
              <div className="text-sm ml-4">- {t('aiLive.contactInfo', 'Thông tin liên lạc')}</div>
              <div className="text-sm ml-4">- {t('aiLive.advertisement', 'Quảng cáo')}</div>
            </div>

            <div className="text-sm mb-4">
              <div className="font-bold">{t('aiLive.products', 'HÀNG HÓA')}</div>
            </div>
            <div className="text-sm mb-4">
              <button
                onClick={() => setShowModal(true)}
                className="font-bold text-left text-blue-700 hover:underline"
              >
                {t('aiLive.turnOffAds', 'TẮT QUẢNG CÁO')} <CircleX />
              </button>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
          <div className="bg-white w-[500px] border border-black p-4 rounded shadow-lg">
            <div className="grid grid-cols-3 text-xs text-center border border-black">
              <div className="bg-sky-500 text-white p-2 border-r border-black row-span-2">
                {t('aiLive.noAds', 'KHÔNG XEM')}
                <br />
                {t('aiLive.advertisement', 'QUẢNG CÁO')}
                <br />
                <div className="text-[10px]">
                  ({t('aiLive.noAdsEn', 'Advertising do not allow display')})
                </div>
              </div>
              <div className="bg-sky-300 text-black p-2 border-b border-black flex flex-col items-center">
                <label className="text-xs font-semibold">
                  {t('aiLive.deposit', 'NẠP TIỀN')}
                  <br />
                  <span className="text-[10px]">({t('aiLive.depositEn', 'Deposit')})</span>
                </label>
                <input
                  type="number"
                  placeholder={t('aiLive.enterAmount', 'Nhập số tiền')}
                  className="mt-1 w-24 text-center text-xs border border-black rounded px-1 py-0.5"
                />
              </div>

              <div className="bg-sky-300 text-black p-2">
                {t('aiLive.unitPrice', 'ĐƠN GIÁ')}
                <br />
                <div className="text-[10px]">
                  ({t('aiLive.unitPriceEn', 'Unit price')})
                  <br />
                  ({t('aiLive.priceUnit', 'VNĐ / GIÂY ($)')})
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 text-xs text-center border border-black border-t-0">
              <div className="col-span-3 flex">
                <button className="flex-1 border bg-gray-200 p-2 text-sm font-bold hover:bg-blue-100 cursor-pointer">
                  {t('aiLive.send', 'GỬI')}
                  <br />
                  ({t('aiLive.sendEn', 'Send')})
                </button>
              </div>
              <div className="border border-black p-2 text-sm">
                {t('aiLive.receiveCode', 'NHẬN MÃ')}
                <br />
                ({t('aiLive.code', 'Code')})
              </div>
              <div className="border border-black p-2 text-sm">
                <input
                  type="text"
                  placeholder={t('aiLive.inputCode', 'NHẬP MÃ (Input code)')}
                  className="mt-1 w-24 text-center text-xs border border-black rounded px-1 py-0.5"
                />
              </div>
              <div className="border border-black bg-gray-200 p-2 text-sm hover:bg-blue-100 cursor-pointer">
                {t('aiLive.confirm', 'XÁC NHẬN')}
                <br />
                ({t('aiLive.confirmEn', 'Confirm')})
              </div>
            </div>

            <div className="text-center mt-4">
              <button
                className="text-red-500 underline text-sm"
                onClick={() => setShowModal(false)}
              >
{t('common.close', 'Đóng')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
