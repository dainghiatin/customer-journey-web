import React, { useState, useEffect } from "react";
import { handleAcceptFreelancer } from "../services/freelancerService";
import { useTranslation } from "react-i18next";

export default function FreelancerActuallyComponent({ freelancers }) {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFreelancers, setFilteredFreelancers] = useState(freelancers);

  useEffect(() => {
    const filtered = freelancers.filter(
      (freelancer) =>
        (freelancer.type === "offline" &&
          freelancer.id.toString().includes(searchTerm)) ||
        freelancer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFreelancers(filtered);
  }, [searchTerm, freelancers]);

  return (
    <div className="mt-4 border-2 border-orange-100 p-4">
      {/* Orange indicator bar at the top */}
      {/* <div className="bg-orange-500 text-white py-2 px-4 text-center mb-4">
        <span className="font-bold">THỰC TẾ</span>
        <span className="italic ml-2">(Actual)</span>
      </div> */}

      {/* Search input at the top */}
      <div className="mb-4">
        <input
          type="text"
          placeholder={t("freelancer.searchPlaceholder")}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-center">
                {t("common.stt")}
              </th>
              <th className="border border-gray-300 p-2 text-center">
                {t("freelancer.jobName")}
              </th>

              {/* Rest of the table headers remain unchanged */}
              <th className="border border-gray-300 p-2 text-center">
                {t("freelancer.estimate")}
              </th>
              <th className="border border-gray-300 p-2 text-center">
                {t("freelancer.requirements")}
              </th>
              <th className="border border-gray-300 p-2 text-center">
                {t("freelancer.startTime")}
              </th>
              <th className="border border-gray-300 p-2 text-center">
                {t("freelancer.startLocation")}
              </th>
              <th className="border border-gray-300 p-2 text-center">
                {t("freelancer.finishTime")}
              </th>
              <th className="border border-gray-300 p-2 text-center">
                {t("freelancer.finishLocation")}
              </th>
              <th className="border border-gray-300 p-2 text-center">
                {t("freelancer.deposit")}
              </th>
              <th className="border border-gray-300 p-2 text-center">
                {t("freelancer.priceOffered")}
              </th>
              <th className="border border-gray-300 p-2 text-center">
                {t("freelancer.serviceFee")}
              </th>
              <th className="border border-gray-300 p-2 text-center">
                {t("common.accept")}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredFreelancers.map((freelancer, index) => (
              <tr key={freelancer.id}>
                <td className="border border-gray-300 p-2 text-center">
                  {freelancer.id}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {freelancer.name}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {freelancer.estimate}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {freelancer.requirement}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {freelancer.startTime}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {freelancer.startLocation}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {freelancer.endTime}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {freelancer.endLocation}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {freelancer.deposit}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {freelancer.price}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {freelancer.serviceFee}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  <button
                    onClick={() =>
                      handleAcceptFreelancer(freelancer.documentId)
                    }
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  >
                    {t("common.accept")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
