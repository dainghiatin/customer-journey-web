import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function PostTypeMenu({ activeType }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleTypeChange = (type) => {
    switch (type) {
      case "goods":
        navigate("/new-good-post");
        break;
      case "freelancer":
        navigate("/new-freelancer-post");
        break;
      case "ailive":
        navigate("/new-ai-live-post");
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex justify-center items-center ">
      <div
        className={` border border-gray-300 p-2 cursor-pointer flex-1 max-w-[130px]  ${
          activeType === "goods" ? "bg-blue-500 text-white " : ""
        }`}
        onClick={() => handleTypeChange("goods")}
      >
        <div className="font-bold text-center">{t("posts.goods")}</div>
      </div>
      <div
        className={` border border-gray-300 p-2 cursor-pointer flex-1 max-w-[130px] ${
          activeType === "freelancer" ? "bg-blue-500 text-white" : ""
        }`}
        onClick={() => handleTypeChange("freelancer")}
      >
        <div className="font-bold text-center">{t("posts.freelancer")}</div>
      </div>
      <div
          className={` border border-gray-300 p-2 cursor-pointer flex-1 max-w-[130px] ${
          activeType === "ailive" ? "bg-blue-500 text-white" : ""
        }`}
        onClick={() => handleTypeChange("ailive")}
      >
        <div className="font-bold text-center">{t("posts.aiLive")}</div>
      </div>
    </div>
  );
}
