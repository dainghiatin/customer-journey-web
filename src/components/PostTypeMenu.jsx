import React from "react";
import { useNavigate } from "react-router-dom";

export default function PostTypeMenu({ activeType }) {
  const navigate = useNavigate();

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
    <div className="grid grid-cols-3">
      <div 
        className={`border p-2 cursor-pointer ${activeType === "goods" ? "bg-blue-500 text-white" : ""}`}
        onClick={() => handleTypeChange("goods")}
      >
        <div className="font-bold text-center">
          HÀNG HÓA
          <br/>
          <span className="text-sm font-normal italic">(Goods)</span>
        </div>
      </div>
      <div 
        className={`border p-2 cursor-pointer ${activeType === "freelancer" ? "bg-blue-500 text-white" : ""}`}
        onClick={() => handleTypeChange("freelancer")}
      >
        <div className="font-bold text-center">
          CÔNG VIỆC TỰ DO
          <br/>
          <span className="text-sm font-normal italic">(Freelancer)</span>
        </div>
      </div>
      <div 
        className={`border p-2 cursor-pointer ${activeType === "ailive" ? "bg-blue-500 text-white" : ""}`}
        onClick={() => handleTypeChange("ailive")}
      >
        <div className="font-bold text-center">
          Ai LIVE
        </div>
      </div>
    </div>
  );
}