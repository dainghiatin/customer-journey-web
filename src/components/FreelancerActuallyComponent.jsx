import React, { useState, useEffect } from "react";
import { handleAcceptFreelancer } from "../services/freelancerService";
import { useTranslation } from "react-i18next";

// FilterDropdown component for each column header
function FilterDropdown({ options, selectedValue, onFilterChange, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value) => {
    onFilterChange(value);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="ml-1 text-xs bg-gray-200 hover:bg-gray-300 px-1 py-0.5 rounded border"
      >
        ▼
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-10 min-w-max">
          <div className="py-1">
            <button
              onClick={() => handleSelect("")}
              className="block w-full text-left px-3 py-1 text-sm hover:bg-gray-100"
            >
              {placeholder || "All"}
            </button>
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelect(option)}
                className={`block w-full text-left px-3 py-1 text-sm hover:bg-gray-100 ${
                  selectedValue === option ? "bg-blue-100" : ""
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function FreelancerActuallyComponent({ freelancers }) {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    id: "",
    name: "",
    estimate: "",
    requirement: "",
    startTime: "",
    startLocation: "",
    endTime: "",
    endLocation: "",
    deposit: "",
    price: "",
    serviceFee: ""
  });
  const [filteredFreelancers, setFilteredFreelancers] = useState(freelancers);

  // Get unique values for each column for dropdown options
  const getUniqueValues = (key) => {
    const values = freelancers.map(freelancer => freelancer[key]).filter(Boolean);
    return [...new Set(values)].sort();
  };

  // Handle filter changes
  const handleFilterChange = (column, value) => {
    setFilters(prev => ({
      ...prev,
      [column]: value
    }));
  };

  // Apply filters
  useEffect(() => {
    let filtered = freelancers.filter(freelancer => {
      return (
        (freelancer.type === "offline" &&
          freelancer.id.toString().includes(searchTerm)) ||
        freelancer.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    // Apply column filters
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        filtered = filtered.filter(freelancer => {
          const value = freelancer[key];
          return value && value.toString().toLowerCase().includes(filters[key].toLowerCase());
        });
      }
    });

    setFilteredFreelancers(filtered);
  }, [searchTerm, filters, freelancers]);

  return (
    <div className="pt-1">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-center">
                {t("common.stt")}
                <FilterDropdown
                  options={getUniqueValues('id').map(id => id.toString())}
                  selectedValue={filters.id}
                  onFilterChange={(value) => handleFilterChange('id', value)}
                  placeholder="All IDs"
                />
              </th>
              <th className="border border-gray-300 p-2 text-center">
                {t("freelancer.jobName")}
                <FilterDropdown
                  options={getUniqueValues('name')}
                  selectedValue={filters.name}
                  onFilterChange={(value) => handleFilterChange('name', value)}
                  placeholder="All Jobs"
                />
              </th>
              <th className="border border-gray-300 p-2 text-center">
                {t("freelancer.estimate")}
                <FilterDropdown
                  options={getUniqueValues('estimate')}
                  selectedValue={filters.estimate}
                  onFilterChange={(value) => handleFilterChange('estimate', value)}
                  placeholder="All Estimates"
                />
              </th>
              <th className="border border-gray-300 p-2 text-center">
                {t("freelancer.requirements")}
                <FilterDropdown
                  options={getUniqueValues('requirement')}
                  selectedValue={filters.requirement}
                  onFilterChange={(value) => handleFilterChange('requirement', value)}
                  placeholder="All Requirements"
                />
              </th>
              <th className="border border-gray-300 p-2 text-center">
                {t("freelancer.startTime")}
                <FilterDropdown
                  options={getUniqueValues('startTime')}
                  selectedValue={filters.startTime}
                  onFilterChange={(value) => handleFilterChange('startTime', value)}
                  placeholder="All Start Times"
                />
              </th>
              <th className="border border-gray-300 p-2 text-center">
                {t("freelancer.startLocation")}
                <FilterDropdown
                  options={getUniqueValues('startLocation')}
                  selectedValue={filters.startLocation}
                  onFilterChange={(value) => handleFilterChange('startLocation', value)}
                  placeholder="All Start Locations"
                />
              </th>
              <th className="border border-gray-300 p-2 text-center">
                {t("freelancer.finishTime")}
                <FilterDropdown
                  options={getUniqueValues('endTime')}
                  selectedValue={filters.endTime}
                  onFilterChange={(value) => handleFilterChange('endTime', value)}
                  placeholder="All Finish Times"
                />
              </th>
              <th className="border border-gray-300 p-2 text-center">
                {t("freelancer.finishLocation")}
                <FilterDropdown
                  options={getUniqueValues('endLocation')}
                  selectedValue={filters.endLocation}
                  onFilterChange={(value) => handleFilterChange('endLocation', value)}
                  placeholder="All Finish Locations"
                />
              </th>
              <th className="border border-gray-300 p-2 text-center">
                {t("freelancer.deposit")}
                <FilterDropdown
                  options={getUniqueValues('deposit')}
                  selectedValue={filters.deposit}
                  onFilterChange={(value) => handleFilterChange('deposit', value)}
                  placeholder="All Deposits"
                />
              </th>
              <th className="border border-gray-300 p-2 text-center">
                {t("freelancer.priceOffered")}
                <FilterDropdown
                  options={getUniqueValues('price')}
                  selectedValue={filters.price}
                  onFilterChange={(value) => handleFilterChange('price', value)}
                  placeholder="All Prices"
                />
              </th>
              <th className="border border-gray-300 p-2 text-center">
                {t("freelancer.serviceFee")}
                <FilterDropdown
                  options={getUniqueValues('serviceFee')}
                  selectedValue={filters.serviceFee}
                  onFilterChange={(value) => handleFilterChange('serviceFee', value)}
                  placeholder="All Service Fees"
                />
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