import React from 'react';
import { useTranslation } from 'react-i18next';
import planetImage from '../assets/planet.jpg';

const GlobalInfoComponent = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full h-full flex flex-col">
      {/* Global Logo - Planet Earth */}
      <div className="flex-1 flex items-center justify-center p-2 sm:p-4">
        <div className="">
          <img
            src={planetImage}
            alt="Global Planet"
            className="w-full h-full max-w-[100px] max-h-[100px] sm:max-w-[100px] sm:max-h-[100px] md:max-w-[150px] md:max-h-[150px] object-contain mx-auto"
          />
        </div>
      </div>
      
      {/* Global Website Information */}
      <div className="p-2 sm:p-4 text-center">
      </div>
    </div>
  );
};

export default GlobalInfoComponent;