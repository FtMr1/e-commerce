import React, { useState } from "react";
import "./Dialog.css";

const dialog = ({ setIsModal, isModal }) => {
  const handleCloseDialog = (event) => {
    const check = event.target.checked;
    localStorage.setItem("dialog", JSON.stringify(!check));
  };

  return (
    <div className={`modal-dialog ${isModal ? "show" : ""} `}>
      <div className="modal-content">
        <button onClick={() => setIsModal(false)} className="modal-close">
          <i className="bi bi-x"></i>
        </button>
        <div className="modal-image">
          <img src="/imgimg/modal-dialog.jpg" alt="" />
        </div>
        <div className="popup-wrapper">
          <div className="popup-content">
            <div className="popup-title">
              <h3>NEWSLETTER</h3>
            </div>
            <p className="popup-text">
              Sign up to our newsletter and get exclusive deals you won find any
              where else straight to your inbox!
            </p>
            <form className="popup-form">
              <input type="text" placeholder="Enter Email Address Here" />
              <button className="btn btn-primary">SUBSCRIBE</button>
              <label>
                <input type="checkbox" onChange={handleCloseDialog} />
                <span>Don't show this popup again</span>
              </label>
            </form>
          </div>
        </div>
      </div>
      <div className="modal-overlay" onClick={() => setIsModal(false)}></div>
    </div>
  );
};

export default dialog;
