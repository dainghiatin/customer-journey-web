import React, { useState } from "react";
import { Eye, HandHeart, BookOpen, Share, Flag, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function AiLiveVideoComponent() {
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
              <strong>{t('aiLive.aiFollowsMe', 'THƯ MỤC AI THEO DÕI')}:</strong> {t('aiLiveVideo.aiFollowsMeDesc', 'Có cập nhật và hiển thị số lượng người đang theo dõi mình lên trên thư mục. Ấn vào thư mục để hiển thị AVATAR người theo dõi mình trong thư mục này.')}
            </li>
            <li>
              <strong>{t('aiLive.whoFollowsMe', 'THƯ MỤC THEO DÕI AI')}:</strong> {t('aiLiveVideo.whoFollowsMeDesc', 'Có cập nhật và hiển thị số lượng người mình đang theo dõi lên trên thư mục. Ấn vào thư mục để hiển thị AVATAR người mình theo dõi trong thư mục này. Trên đầu các AVATAR này hiển thị số cập nhật bài đăng video mới của người này mà mình chưa xem. Ấn vào các AVATAR của họ đến đến trang 8 - Ai LIVE - VIDEO của họ để xem các thư mục chứa các video của họ (không xem được họ đang theo dõi ai và ai đang theo dõi họ). Ấn vào các thư mục chứa video này để xem các video của họ.')}
            </li>
            <li>
              {t('aiLiveVideo.deleteButtonDesc', 'Trên mỗi AVATAR của người mình đang theo dõi có nút XÓA (gạch chéo) để loại người đó khỏi danh sách mình theo dõi, và AVATAR của mình sẽ tự động mất ở THƯ MỤC THEO DÕI của họ (người mình đang theo dõi).')}
            </li>
            <li>
              <strong>{t('aiLiveVideo.videoFolders', 'Các THƯ MỤC VIDEO')}:</strong> {t('aiLiveVideo.videoFoldersDesc', 'có hiển thị tổng số lượt xem và chứa các video được sắp xếp theo thời gian đăng bài.')}
            </li>
            <li>
              {t('aiLiveVideo.videoLifetime', 'Thời hạn tồn tại của các video là 365 ngày, sau đó hệ thống sẽ tự động XÓA, và đã đăng video thì không xóa được (trừ admin).')}
            </li>
            <li>
              <strong>{t('aiLiveVideo.saveFolder', 'THƯ MỤC LƯU')}:</strong> {t('aiLiveVideo.saveFolderDesc', 'hiển thị số lượng video đã lưu. Ấn để vào bên trong chứa các video đã lưu.')}
            </li>
            <li>
              <strong>{t('aiLiveVideo.violationFolder', 'THƯ MỤC VI PHẠM')}:</strong> {t('aiLiveVideo.violationFolderDesc', 'Các video bị báo cáo 1 lần vi phạm sẽ chuyển sang mục này.')}
            </li>
            <li>
              <button
                onClick={() => setShowModal(true)}
                className="font-bold text-left text-blue-700 hover:underline"
              >
{t('aiLiveVideo.noAds', 'KHÔNG QUẢNG CÁO')}
              </button>
            </li>
          </ul>
        </div>
      </div>
    {/* Danh mục chủ đề */}
    <div className="grid grid-cols-5 border border-black text-xs text-center">
    {[
        ["GIỚI THIỆU BẢN THÂN", "Introduce yourself"],
        ["THIẾU NHI", "Children"],
        ["LƯU NIỆM", "Memory"],
        ["KINH NGHIỆM SỐNG", "Life experience"],
        ["ĐIỂM NÓNG", "Hot area"],
        ["KINH TẾ & XÃ HỘI", "Economy & Society"],
        ["THỂ THAO", "Sport"],
        ["GIẢI TRÍ", "Entertainment"],
        ["CHIẾN DỊCH & SỰ KIỆN", "Campaigns & Events"],
        ["SÁNG TẠO", "Creative"],
        ["Ý TƯỞNG KHỞI NGHIỆP", "Start up ideas"],
        ["KHÁC", "Other"]
    ].map(([vi, en], index) => (
        <div
        key={index}
        className="border border-black p-2 hover:bg-yellow-100 cursor-pointer"
        >
        <div className="font-bold">{vi}</div>
        <div className="text-[11px] italic">({en})</div>
        </div>
    ))}
    </div>
      {/* Phần tìm kiếm */}
      <div className="border-l border-r border-b border-black">
        <div className="p-2 text-sm flex items-center gap-2">
          <span className="font-bold">{t('aiLive.search', 'TÌM KIẾM')} ({t('aiLive.searchEn', 'Search')}):</span>
          <input
            type="text"
            placeholder={t('aiLiveVideo.searchPlaceholder', 'nhập TÊN VIDEO')}
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
                {t('aiLiveVideo.sortingCriteria1', '1 - Nạp tiền quảng cáo lớn - 2 - Số lượng phí trả sau lời - 3 - Gần trị hàng hóa lời - 4 - Thứ tự bán hàng')}
              </div>
              <div className="text-yellow-600 ml-4">
                {t('aiLiveVideo.sortingCriteria2', '(5 - Số bài viết (6 - 6 - Người theo dõi lời )')}
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
          <div className="text-center font-bold mb-4">{t('aiLiveVideo.video', 'VIDEO')}</div>

          <div className="border border-black p-4 flex-1 flex flex-col">
            <div className="mb-4">
              <div className="text-sm mb-2 text-center">
                <span className="font-bold">{t('aiLive.avatar', 'AVATAR')}:</span> {t('aiLiveVideo.videoName', 'Tên VIDEO')}
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
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
          <div className="bg-white w-[500px] border border-black p-4 rounded shadow-lg">
            <div className="grid grid-cols-3 text-xs text-center border border-black">
              <div className="bg-sky-500 text-white p-2 border-r border-black row-span-2">
                {t('aiLiveVideo.noView', 'KHÔNG XEM')}
                <br />
                {t('aiLiveVideo.advertising', 'QUẢNG CÁO')}
                <br />
                <div className="text-[10px]">
                  (Advertising do not allow display)
                </div>
              </div>
            <div className="bg-sky-300 text-black p-2 border-b border-black flex flex-col items-center">
            <label className="text-xs font-semibold">{t('aiLiveMovie.topUp', 'NẠP TIỀN')}<br /><span className="text-[10px]">(Deposit)</span></label>
            <input
                type="number"
                placeholder={t('aiLiveMovie.enterAmount', 'Nhập số tiền')}
                className="mt-1 w-24 text-right text-xs border border-black rounded px-1 py-0.5"
            />
            </div>

              <div className="bg-sky-300 text-black p-2">
{t('aiLiveMovie.unitPrice', 'ĐƠN GIÁ')}
                <br />
                <div className="text-[10px]">
                  (Unit price)
                  <br />
                  (VNĐ / GIÂY ($))
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 text-xs text-center border border-black border-t-0">
              <div className="col-span-3 flex">
                <button className="flex-1 border bg-gray-200 p-2 text-sm font-bold hover:bg-blue-100 cursor-pointer">
{t('aiLiveMovie.send', 'GỬI')}
                  <br />
                  (Send)
                </button>
              </div>
              <div className="border border-black p-2 text-sm">
{t('aiLiveMovie.receiveCode', 'NHẬN MÃ')}
                <br />
                (Code)
              </div>
              <div className="border border-black p-2 text-sm">
                <input
                    type="text"
                    placeholder={t('aiLiveMovie.inputCodePlaceholder', 'NHẬP MÃ (Input code)')}
                    className="mt-1 w-24 text-center text-xs border border-black rounded px-1 py-0.5"
                />
              </div>
              <div className="border border-black bg-gray-200 p-2 text-sm hover:bg-blue-100 cursor-pointer">
{t('aiLiveMovie.confirm', 'XÁC NHẬN')}
                <br />
                (Confirm)
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
