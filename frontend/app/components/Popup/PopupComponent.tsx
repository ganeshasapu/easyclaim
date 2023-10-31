"use client"

import React, { useState } from 'react';
import './PopupComponent.css';

const ConfirmationPopup = ({ isOpen, onApprove, onCancel }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="popup-container">
      <div className="popup">
        <p>Are you sure you want to approve this claim?</p>
        <div className="button-container">
          <button onClick={onApprove}>Yes</button>
          <button onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;