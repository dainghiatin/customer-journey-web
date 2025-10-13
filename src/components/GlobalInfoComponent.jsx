import React from 'react';
import { useTranslation } from 'react-i18next';
import planetImage from '../assets/planet.jpg';

const GlobalInfoComponent = () => {
  const { t } = useTranslation();

  return (
    <div className="">
      {/* Global Logo - Planet Earth */}
      <div className="">
        <div className="">
          <img
            src={planetImage}
            alt="Global Planet"
            className="w-full h-full max-w-[100px] max-h-[100px] sm:max-w-[100px] sm:max-h-[100px] md:max-w-[130px] md:max-h-[130px] object-contain mx-auto"
          />
        </div>
      </div>
      
    </div>
  );
};

export default GlobalInfoComponent;