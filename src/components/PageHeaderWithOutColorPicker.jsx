import React from 'react';
import { useTranslation } from 'react-i18next';

const PageHeaderWithOutColorPicker = ({color, onColorChange, titlePrefix = "2", leftButton, rightButton, title }) => {
  const { t } = useTranslation();

  // If leftButton or rightButton are provided, use the flex layout
  if (leftButton || rightButton) {
    return (
      <div className="flex items-center justify-between relative">
        {leftButton && <div className="relative">{leftButton}</div>}
          <div className="flex items-start justify-center">
              {/* Color picker input */}
              <input
                  type="color"
                  value={color}
                  onChange={e=>onColorChange(e)}
                  className="w-10 h-8 cursor-pointer mt-1"
              />
              <div className="text-center mb-4 relative">
                  <h1 className="text-3xl font-bold text-black relative inline-block">
                      &nbsp;{titlePrefix} - {title}
                  </h1>
              </div>
          </div>

        {rightButton && <div>{rightButton}</div>}
      </div>
    );
  }

  // Default layout (for Login.jsx)
  return (
    <div className="flex items-start justify-center">
      {/* Color picker input */}
      <input
        type="color"
        value={color}
        onChange={onColorChange}
        className="w-10 h-8 cursor-pointer mt-1"
      />
      <div className="text-center mb-4 relative">
        <h1 className="text-3xl font-bold text-black relative inline-block">
          &nbsp;{titlePrefix} - {title}
        </h1>
      </div>
    </div>
  );
};

export default PageHeaderWithOutColorPicker;
