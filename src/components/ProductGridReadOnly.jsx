import React, { useEffect, useState } from "react";
import { Eye as EyeIcon, Forward as ForwardIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ProductGridReadOnly({ products = [], onItemsChange }) {
  const { t } = useTranslation();
  const [items, setItems] = useState(products || []);
  const [isFollowing, setIsFollowing] = useState(false);

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
      <div className="border border-gray-300">
        <div className="flex flex-col sm:flex-row">
          <div className="border-r border-gray-300 p-2 text-center min-w-[60px] sm:min-w-[80px]">
            <div>ID</div>
          </div>
          <div className="flex-1 border-r border-gray-300 p-2">
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <input
                type="text"
                className="flex-1 w-full sm:w-auto border border-gray-300 p-1 text-sm"
                disabled
              />
              <div className="flex items-center space-x-2 flex-shrink-0">
                <button
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`p-1 rounded-full transition-colors ${
                    isFollowing
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-gray-400 hover:text-blue-500"
                  }`}
                  title={
                    isFollowing
                      ? t("productGrid.unfollow")
                      : t("productGrid.follow")
                  }
                >
                  <EyeIcon
                    size={18}
                    strokeWidth={isFollowing ? 2.5 : 1.5}
                    className={isFollowing ? "text-blue-500" : "text-gray-400"}
                  />
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert(t("productGrid.linkCopied"));
                  }}
                  className="p-1 rounded-full text-green-500 hover:text-green-600 transition-colors"
                  title={t("productGrid.share")}
                >
                  <ForwardIcon size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        {/* Header columns with horizontal scroll */}
        <div className="grid grid-flow-col auto-cols-[220px] border-t border-gray-300">
          <div className="border-r border-gray-300 p-2 text-center">
            <div>SỐ THỨ TỰ</div>
            <div className="text-xs">{t("productGrid.sequenceNumber")}</div>
          </div>
          <div className="border-r border-gray-300 p-2 text-center">
            <div>{t("productGrid.nameOfGoods")}</div>
          </div>
          <div className="border-r border-gray-300 p-2 text-center">
            <div>{t("productGrid.model")}</div>
          </div>
          <div className="border-r border-gray-300 p-2 text-center">
            <div>{t("productGrid.size")}</div>
          </div>
          <div className="border-r border-gray-300 p-2 text-center">
            <div>{t("productGrid.color")}</div>
          </div>
          <div className="border-r border-gray-300 p-2 text-center">
            <div>
              {t("productGrid.image")} <span className="text-red-500">*</span>
            </div>
          </div>
          {/* New columns */}
          <div className="border-r border-gray-300 p-2 text-center">
            <div>
              {t("productGrid.qualityInfo")}{" "}
              <span className="text-red-500">*</span>
            </div>
          </div>
          <div className="border-r border-gray-300 p-2 text-center">
            <div>
              {t("productGrid.warrantyChangeDays")}{" "}
              <span className="text-red-500">*</span>
            </div>
          </div>
          <div className="border-r border-gray-300 p-2 text-center">
            <div>
              {t("productGrid.warrantyRepairDays")}{" "}
              <span className="text-red-500">*</span>
            </div>
          </div>
          <div className="border-r border-gray-300 p-2 text-center">
            <div>
              {t("productGrid.repairWarrantyPercent")}{" "}
              <span className="text-red-500">*</span>
            </div>
          </div>
          <div className="border-r border-gray-300 p-2 text-center">
            <div>
              {t("productGrid.maxDeliveryDays")}{" "}
              <span className="text-red-500">*</span>
            </div>
          </div>
          <div className="border-r border-gray-300 p-2 text-center">
            <div>
              {t("productGrid.handoverLocation")}{" "}
              <span className="text-red-500">*</span>
            </div>
          </div>
          {/* THỜI LƯỢNG THỰC HIỆN split into 2 columns */}
          <div className="border-r border-gray-300 p-2 text-center">
            <div>
              {t("productGrid.contractDuration")}{" "}
              <span className="text-red-500">*</span>
            </div>
          </div>
          <div className="border-r border-gray-300 p-2 text-center">
            <div>{t("productGrid.timeUnit")}</div>
          </div>
          <div className="border-r border-gray-300 p-2 text-center">
            <div>{t("productGrid.directPayment")}</div>
          </div>
          <div className="border-r border-gray-300 p-2 text-center">
            <div>{t("productGrid.depositRequirementDirect")}</div>
          </div>
          <div className="border-r border-gray-300 p-2 text-center">
            <div>{t("productGrid.paymentViaWallet")}</div>
          </div>
          <div className="border-r border-gray-300 p-2 text-center">
            <div>{t("productGrid.depositRequirementWallet")}</div>
          </div>
          <div className="border-r border-gray-300 p-2 text-center">
            <div>
              {t("productGrid.vat")} <span className="text-red-500">*</span>
            </div>
          </div>
          <div className="border-r border-gray-300 p-2 text-center">
            <div>
              {t("productGrid.quantityMinimum")}{" "}
              <span className="text-red-500">*</span>
            </div>
          </div>
          <div className="border-r border-gray-300 p-2 text-center">
            <div>
              {t("productGrid.unit")} <span className="text-red-500">*</span>
            </div>
          </div>
          <div className="border-r border-gray-300 p-2 text-center">
            <div>
              {t("productGrid.unitMarketPrice")}{" "}
              <span className="text-red-500">*</span>
            </div>
          </div>
          <div className="border-r border-gray-300 p-2 text-center">
            <div>
              {t("productGrid.lowestHighestAskingPrice")}{" "}
              <span className="text-red-500">*</span>
            </div>
          </div>
          <div className="border-r border-gray-300 p-2 text-center">
            <div>{t("productGrid.lowestAmount")}</div>
          </div>
          <div className="p-2 text-center border-r border-gray-300">
            <div>{t("productGrid.lowestHighestAutoAccept")}</div>
          </div>
          <div className="p-2 text-center border-r border-gray-300">
            <div>{t("productGrid.autoRejectPrice")}</div>
          </div>
          <div className="p-2 text-center border-r border-gray-300">
            <div>{t("productGrid.setPrice")}</div>
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
                onChange={(e) =>
                  handleItemChange(item.id, "size", e.target.value)
                }
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
                <option value="">{t("productGrid.choose")}</option>
                <option value="Kho bên bán">
                  {t("productGrid.sellerWarehouse")}
                </option>
                <option value="Kho bên mua">
                  {t("productGrid.buyerWarehouse")}
                </option>
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
                <option value="">{t("productGrid.choose")}</option>
                <option value="one">{t("productGrid.one")}</option>
                <option value="many">{t("productGrid.many")}</option>
              </select>
            </div>
            <div className="border-r border-t border-b border-gray-300 p-2 text-center">
              <select
                value={item.contractDurationUnit}
                onChange={(e) =>
                  handleItemChange(
                    item.id,
                    "contractDurationUnit",
                    e.target.value
                  )
                }
                className="w-full border border-gray-300 p-1 mt-1"
                disabled
              >
                <option value="">{t("productGrid.choose")}</option>
                <option value="time">{t("productGrid.time")}</option>
                <option value="year">{t("productGrid.year")}</option>
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
                onChange={(e) =>
                  handleItemChange(item.id, "vat", e.target.value)
                }
                className="w-full border border-gray-300 p-1 mt-1"
                disabled
              >
                <option value="">{t("productGrid.choose")}</option>
                <option value="yes">{t("productGrid.yes")}</option>
                <option value="no">{t("productGrid.no")}</option>
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
                onChange={(e) =>
                  handleItemChange(item.id, "unit", e.target.value)
                }
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
                type="text"
                value={item.autoRejectPrice}
                onChange={(e) =>
                  handleItemChange(item.id, "autoRejectPrice", e.target.value)
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
                onChange={(e) =>
                  handleItemChange(item.id, "setPrice", e.target.value)
                }
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
            <span>{t("productGrid.total")}: 0</span>
          </div>
          <div
            className="border-r border-gray-300 p-2 text-center"
            style={{ gridColumnStart: 18 }}
          >
            <span>{t("productGrid.total")}: 0</span>
          </div>

          <div
            className="border-r border-gray-300 p-2 text-center"
            style={{ gridColumnStart: 24 }}
          >
            <span>{t("productGrid.total")}: 0</span>
          </div>
          <div
            className="border-r border-gray-300 p-2 text-center"
            style={{ gridColumnStart: 26 }}
          >
            <span>{t("productGrid.total")}: 0</span>
          </div>
        </div>
      </div>
    </>
  );
}
