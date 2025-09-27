import React, { useState, useRef, useEffect } from 'react';

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  const notifications = [
    "You have a new message",
    "New comment on your post",
    "Update available",
    "Reminder: Meeting at 3 PM"
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="sm:py-3 cursor-pointer relative"
        style={{ width: "100%", height: "10%" }}
      >
        <i
          style={{ fontSize: "clamp(10px, 1vw, 20px)" }}
          className="fa-solid fa-bell"
        ></i>
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
            {notifications.length}
          </span>
        )}
      </button>

      {isOpen && (
        <>
        <div className="abc"></div>
        </>
      )}
    </div>
  );
};

export default NotificationDropdown;
