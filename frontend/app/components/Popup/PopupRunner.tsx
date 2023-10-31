"use client"

import React, { useState } from 'react';
import ConfirmationPopup from './PopupComponent';
import './PopupComponent.css';

const App = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [allowPopup, setAllowPopup] = useState(true);
  const [buttonText, setButtonText] = useState("Approve Claim?")

  const handleApprove = () => {
    setPopupOpen(false); // Close the popup
    setButtonText("Claim Approved!");  // Update button text
    setAllowPopup(false);  // Disable popup
  };

  const handleCancel = () => {
    setPopupOpen(false); // Close the popup
    setButtonText("Approve Claim?");  // Update button text
  };

  return (
    <div>
      <div className="button-container">
        <button onClick={() => setPopupOpen(allowPopup)}>{buttonText}</button>
      </div>
      <ConfirmationPopup
        isOpen={isPopupOpen}
        onApprove={handleApprove}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default App;