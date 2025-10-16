import React, { useEffect, useState } from "react";

export default function ProductGridReadOnly({ products = [], onItemsChange }) {
  const [items, setItems] = useState(products || []);

  useEffect(() => {
    setItems(products || []);
  }, [products]);

  const handleItemChange = (id, field, value) => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setItems(updated);
    if (onItemsChange) onItemsChange(updated);
  };

  return (
    <>
      <div className="grid grid-flow-col auto-cols-[220px]  border-gray-300">
        <div className="border-r border-gray-300 p-2 text-center">
          <div>ID</div>
        </div>
        <div className="border-r border-gray-300 p-2 text-center" style={{ width: 220 * 5 }}>
          <input
            type="text"
            className="w-full border border-gray-300 p-1 mt-1"
            disabled
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        {/* Header columns with horizontal scroll */}
        <div className="grid grid-flow-col auto-cols-[220px] border-t border-gray-300">
          <div className="border-r border-gray-300 p-2 text-center">
            <div>SỐ THỨ TỰ</div>
            <div className="text-xs">(#)</div>
          </div>
          <div className="border-r border-gray-300 p-2 text-center">
            <div>TÊN HÀNG HÓA</div>
            <div className="text-xs">(Name of goods)</div>
          </div>
          <div className="border-r border-gray-300 p-2 text-center">
            <div>MÃ SỐ</div>
            <div className="text-xs">(Model)</div>
          </div>
          <div className="border-r border-gray-300 p-2 text-center">
            <div>KÍCH THƯỚC</div>
            <div className="text-xs">(Size)</div>
          </div>
          <div className="border-r border-gray-300 p-2 text-center">
            <div>MÀU SẮC</div>
            <div className="text-xs">(Color)</div>
          </div>
          <div className="border-r border-gray-300 p-2 text-center">
            <div>HÌNH ẢNH</div>
            <div className="text-xs">
              (Image) <span className="text-red-500">*</span>
            </div>
          </div>
          {/* New columns */}
          <div className="border-r border-gray-300 p-2 text-center">
            <div>
              CHẤT LƯỢNG, THÔNG TIN HÀNG HÓA <span className="text-red-500">*</span>
            </div>
            <div className="text-xs">(Quality, information of goods)</div>
          </div>
          <div className="border-r border-gray-300 p-2 text-center">
            <div>
              SỐ NGÀY BẢO HÀNH ĐỔI TRẢ <span className="text-red-500">*</span>
            </div>
            <div className="text-xs">(Days of warranty to change)</div>
          </div>
          <div className="border-r border-gray-300 p-2 text-center">
            <div>
              SỐ NGÀY BẢO HÀNH SỬA CHỮA <span className="text-red-500">*</span>
            </div>
            <div className="text-xs">(Days of warranty to repair)</div>
          </div>
          <div className="border-r border-gray-300 p-2 text-center">
            <div>
              % TIỀN GIỮ LẠI ĐỂ BẢO HÀNH SỬA CHỮA <span className="text-red-500">*</span>
            </div>
            <div className="text-xs">(% value to repair warranty)</div>
          </div>
          <div className="border-r border-gray-300 p-2 text-center">
            <div>
              SỐ NGÀY NHIỀU NHẤT ĐỂ GIAO HÀNG SAU KHI CHẤP NHẬN <span className="text-red-500">*</span>
            </div>
            <div className="text-xs">
              (Maximum number of days to delivery after acceptance)
            </div>
          </div>
          <div className="border-r border-gray-300 p-2 text-center">
            <div>
              ĐỊA ĐIỂM GIAO HÀNG <span className="text-red-500">*</span>
            </div>
            <div className="text-xs">(Location of handover)</div>
          </div>
          {/* THỜI LƯỢNG THỰC HIỆN split into 2 columns */}
          <div className="border-r border-gray-300 p-2 text-center">
            <div>
              THỜI LƯỢNG THỰC HIỆN <span className="text-red-500">*</span>
            </div>
            <div className="text-xs">(Contract duration) - Một/Nhiều</div>
          </div>
          <div className="border-r border-gray-300 p-2 text-center">
            <div>ĐƠN VỊ THỜI LƯỢNG</div>
            <div className="text-xs">(Time/Year)</div>
          </div>
          <div className="border-r border-gray-300 p-2 text-center">
            <div>THANH TOÁN TRỰC TIẾP</div>
            <div className="text-xs">(Direct payment)</div>
          </div>
          <div className="border-r border-gray-300 p-2 text-center">
            <div>YÊU CẦU ĐẶT CỌC, KÝ QUỸ CHO TT TRỰC TIẾP</div>
            <div className="text-xs">
              (Deposit requirement for direct payment) - Cài đặt mức chấp nhận
            </div>
          </div>
          <div className="border-r border-gray-300 p-2 text-center">
            <div>THANH TOÁN QUA SÀN TMĐT</div>
            <div className="text-xs">(Payment via wallet)</div>
          </div>
          <div className="border-r border-gray-300 p-2 text-center">
            <div>YÊU CẦU ĐẶT CỌC, KÝ QUỸ QUA SÀN TMĐT</div>
            <div className="text-xs">
              (Deposit requirement to payment via wallet) - Cài đặt mức chấp nhận
            </div>
          </div>
          <div className="border-r border-gray-300 p-2 text-center">
            <div>
              HÓA ĐƠN GIÁ TRỊ GIA TĂNG <span className="text-red-500">*</span>
            </div>
            <div className="text-xs">(VAT)</div>
          </div>
          <div className="border-r border-gray-300 p-2 text-center">
            <div>
              SỐ LƯỢNG TỐI THIỂU <span className="text-red-500">*</span>
            </div>
            <div className="text-xs">(Quantity minimum)</div>
          </div>
          <div className="border-r border-gray-300 p-2 text-center">
            <div>
              ĐVT <span className="text-red-500">*</span>
            </div>
            <div className="text-xs">(Unit)</div>
          </div>
          <div className="border-r border-gray-300 p-2 text-center">
            <div>ĐƠN GIÁ THỊ TRƯỜNG <span className="text-red-500">*</span></div>
            <div className="text-xs">(Unit market price)</div>
          </div>
          <div className="border-r border-gray-300 p-2 text-center">
            <div>
              ĐƠN GIÁ MONG MUỐN THẤP NHẤT / CAO NHẤT <span className="text-red-500">*</span>
            </div>
            <div className="text-xs">(Lowest unit asking price) - chọn 1 trong 2</div>
          </div>
          <div className="border-r border-gray-300 p-2 text-center">
            <div>THÀNH TIỀN MONG MUỐN THẤP NHẤT / CAO NHẤT</div>
            <div className="text-xs">(Lowest amount) - đi theo lệnh bên</div>
          </div>
          <div className="p-2 text-center border-r border-gray-300">
            <div>GIÁ TỰ ĐỘNG DUYỆT THẤP NHẤT / CAO NHẤT</div>
            <div className="text-xs">
              (Lowest / Highest price to automatically accept) - đi theo lệnh bên
            </div>
          </div>
          <div className="p-2 text-center border-r border-gray-300">
            <div>ĐẶT GIÁ</div>
            <div className="text-xs">(Set price)</div>
          </div>
        </div>

        {/* Rows */}
        {items.map((item) => (
          <div
            key={item.id}
            className="grid grid-flow-col auto-cols-[220px] border-t border-gray-300"
          >
            <div className="border-r border-gray-300 p-2 text-center">
              <div>{item.id}</div>
            </div>
            <div className="border-r border-gray-300 p-2 text-center">
              <input
                type="text"
                value={item.name}
                onChange={(e) =>
                  handleItemChange(item.id, "name", e.target.value)
                }
                className="w-full border border-gray-300 p-1 mt-1"
                disabled
              />
            </div>
            <div className="border-r border-gray-300 p-2 text-center">
              <input
                type="text"
                value={item.model}
                onChange={(e) =>
                  handleItemChange(item.id, "model", e.target.value)
                }
                className="w-full border border-gray-300 p-1 mt-1"
                disabled
              />
            </div>
            <div className="border-r border-gray-300 p-2 text-center">
              <input
                type="text"
                value={item.size}
                onChange={(e) => handleItemChange(item.id, "size", e.target.value)}
                className="w-full border border-gray-300 p-1 mt-1"
                disabled
              />
            </div>
            <div className="border-r border-t border-b border-gray-300 p-2 text-center">
              <input
                type="text"
                value={item.color}
                onChange={(e) =>
                  handleItemChange(item.id, "color", e.target.value)
                }
                className="w-full border border-gray-300 p-1 mt-1"
                disabled
              />
            </div>
            <div className="border-r border-t border-b border-gray-300 p-2 text-center">
              {item.image}
            </div>
            {/* New cells */}
            <div className="border-r border-t border-b border-gray-300 p-2 text-center">
              {item.licenseFile}
            </div>
            <div className="border-r border-t border-b border-gray-300 p-2 text-center">
              <input
                type="text"
                value={item.warrantyChangeDays}
                onChange={(e) =>
                  handleItemChange(
                    item.id,
                    "warrantyChangeDays",
                    e.target.value
                  )
                }
                className="w-full border border-gray-300 p-1 mt-1"
                disabled
              />
            </div>
            <div className="border-r border-t border-b border-gray-300 p-2 text-center">
              <input
                type="text"
                value={item.warrantyRepairDays}
                onChange={(e) =>
                  handleItemChange(
                    item.id,
                    "warrantyRepairDays",
                    e.target.value
                  )
                }
                className="w-full border border-gray-300 p-1 mt-1"
                disabled
              />
            </div>
            <div className="border-r border-t border-b border-gray-300 p-2 text-center">
              <input
                type="text"
                value={item.repairWarrantyRetentionPercent}
                onChange={(e) =>
                  handleItemChange(
                    item.id,
                    "repairWarrantyRetentionPercent",
                    e.target.value
                  )
                }
                className="w-full border border-gray-300 p-1 mt-1"
                disabled
              />
            </div>
            <div className="border-r border-t border-b border-gray-300 p-2 text-center">
              <input
                type="text"
                value={item.maxDeliveryDaysAfterAcceptance}
                onChange={(e) =>
                  handleItemChange(
                    item.id,
                    "maxDeliveryDaysAfterAcceptance",
                    e.target.value
                  )
                }
                className="w-full border border-gray-300 p-1 mt-1"
                disabled
              />
            </div>
            <div className="border-r border-t border-b border-gray-300 p-2 text-center">
              <select
                value={item.handoverLocation}
                onChange={(e) =>
                  handleItemChange(item.id, "handoverLocation", e.target.value)
                }
                className="w-full border border-gray-300 p-1 mt-1"
                disabled
              >
                <option value="">Chọn</option>
                <option value="Kho bên bán">Kho bên bán</option>
                <option value="Kho bên mua">Kho bên mua</option>
              </select>
            </div>
            <div className="border-r border-t border-b border-gray-300 p-2 text-center">
              <select
                value={item.contractDurationMultiplicity}
                onChange={(e) =>
                  handleItemChange(
                    item.id,
                    "contractDurationMultiplicity",
                    e.target.value
                  )
                }
                className="w-full border border-gray-300 p-1 mt-1"
                disabled
              >
                <option value="">Chọn</option>
                <option value="one">Một (One)</option>
                <option value="many">Nhiều (Many)</option>
              </select>
            </div>
            <div className="border-r border-t border-b border-gray-300 p-2 text-center">
              <select
                value={item.contractDurationUnit}
                onChange={(e) =>
                  handleItemChange(item.id, "contractDurationUnit", e.target.value)
                }
                className="w-full border border-gray-300 p-1 mt-1"
                disabled
              >
                <option value="">Chọn</option>
                <option value="time">LẦN (Time)</option>
                <option value="year">NĂM (Year)</option>
              </select>
            </div>
            <div className="border-r border-t border-b border-gray-300 p-2 text-center">
              <input
                type="text"
                value={item.directPayment}
                onChange={(e) =>
                  handleItemChange(item.id, "directPayment", e.target.value)
                }
                className="w-full border border-gray-300 p-1 mt-1"
                disabled
              />
            </div>
            <div className="border-r border-t border-b border-gray-300 p-2 text-center">
              <input
                type="text"
                value={item.depositRequirementDirect}
                onChange={(e) =>
                  handleItemChange(
                    item.id,
                    "depositRequirementDirect",
                    e.target.value
                  )
                }
                className="w-full border border-gray-300 p-1 mt-1"
                placeholder=""
                disabled
              />
            </div>
            <div className="border-r border-t border-b border-gray-300 p-2 text-center">
              <input
                type="text"
                value={item.paymentViaWallet}
                onChange={(e) =>
                  handleItemChange(item.id, "paymentViaWallet", e.target.value)
                }
                className="w-full border border-gray-300 p-1 mt-1"
                disabled
              />
            </div>
            <div className="border-r border-t border-b border-gray-300 p-2 text-center">
              <input
                type="text"
                value={item.depositRequirementWallet}
                onChange={(e) =>
                  handleItemChange(
                    item.id,
                    "depositRequirementWallet",
                    e.target.value
                  )
                }
                className="w-full border border-gray-300 p-1 mt-1"
                placeholder=""
                disabled
              />
            </div>
            <div className="border-r border-t border-b border-gray-300 p-2 text-center">
              <select
                value={item.vat}
                onChange={(e) => handleItemChange(item.id, "vat", e.target.value)}
                className="w-full border border-gray-300 p-1 mt-1"
                disabled
              >
                <option value="">Chọn</option>
                <option value="yes">CÓ/YES</option>
                <option value="no">KHÔNG/NO</option>
              </select>
            </div>
            <div className="border-r border-t border-b border-gray-300 p-2 text-center">
              <input
                type="text"
                value={item.quantityMinimum}
                onChange={(e) =>
                  handleItemChange(item.id, "quantityMinimum", e.target.value)
                }
                className="w-full border border-gray-300 p-1 mt-1"
                disabled
              />
            </div>
            <div className="border-r border-t border-b border-gray-300 p-2 text-center">
              <input
                type="text"
                value={item.unit}
                onChange={(e) => handleItemChange(item.id, "unit", e.target.value)}
                className="w-full border border-gray-300 p-1 mt-1"
                disabled
              />
            </div>
            <div className="border-r border-t border-b border-gray-300 p-2 text-center">
              <input
                type="text"
                value={item.unitMarketPrice}
                onChange={(e) =>
                  handleItemChange(item.id, "unitMarketPrice", e.target.value)
                }
                className="w-full border border-gray-300 p-1 mt-1"
                disabled
              />
            </div>
            <div className="border-r border-t border-b border-gray-300 p-2 text-center">
              <input
                type="text"
                value={item.unitAskingPrice}
                onChange={(e) =>
                  handleItemChange(item.id, "unitAskingPrice", e.target.value)
                }
                className="w-full border border-gray-300 p-1 mt-1"
                placeholder=""
                disabled
              />
            </div>
            <div className="border-r border-t border-b border-gray-300 p-2 text-center">
              <input
                type="text"
                value={item.amountDesired}
                onChange={(e) =>
                  handleItemChange(item.id, "amountDesired", e.target.value)
                }
                className="w-full border border-gray-300 p-1 mt-1"
                placeholder=""
                disabled
              />
            </div>
            <div className="p-2 text-center border-r border-t border-b border-gray-300">
              <input
                type="text"
                value={item.autoAcceptPrice}
                onChange={(e) =>
                  handleItemChange(item.id, "autoAcceptPrice", e.target.value)
                }
                className="w-full border border-gray-300 p-1 mt-1"
                placeholder=""
                disabled
              />
            </div>
            <div className="p-2 text-center border-r border-t border-b border-gray-300">
              <input
                type="number"
                value={item.setPrice}
                onChange={(e) => handleItemChange(item.id, "setPrice", e.target.value)}
                className="w-full border border-gray-300 p-1 mt-1"
                placeholder=""
              />
            </div>
          </div>
        ))}

        <div className="grid grid-flow-col auto-cols-[220px] border-t border-gray-300">
          <div
            className="border-r border-gray-300 p-2 text-center"
            style={{ gridColumnStart: 16 }}
          >
            <span>Tổng (Toal): 0</span>
          </div>
          <div
            className="border-r border-gray-300 p-2 text-center"
            style={{ gridColumnStart: 18 }}
          >
            <span>Tổng (Toal): 0</span>
          </div>

          <div
            className="border-r border-gray-300 p-2 text-center"
            style={{ gridColumnStart: 24 }}
          >
            <span>Tổng (Toal): 0</span>
          </div>
          <div
            className="border-r border-gray-300 p-2 text-center"
            style={{ gridColumnStart: 26 }}
          >
            <span>Tổng (Toal): 0</span>
          </div>
        </div>

      </div>
    </>
  );
}