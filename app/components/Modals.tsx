"use client";

import React from "react";
import Login from "./Login";
import ResetPassword from "./ResetPassword";
import Signup from "./Signup";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store";
import { toggleModal } from "@/app/features/modal/modalSlice";

const Modals = () => {
  const dispatch = useDispatch();
  const modalState = useSelector((state: RootState): RootState["modal"] => state.modal);

  const isAnyModalOpen =
    modalState.isModalOpen || modalState.passwordModal || modalState.signupModal;

  const handleOverlayClick = () => {
    if (modalState.isModalOpen) dispatch(toggleModal("isModalOpen"));
    if (modalState.passwordModal) dispatch(toggleModal("passwordModal"));
    if (modalState.signupModal) dispatch(toggleModal("signupModal"));
    console.log("modal overlay clicked");
  };

  return (
    <>
      {isAnyModalOpen && (
        <div className="modal__overlay--background" onClick={handleOverlayClick}></div>
      )}

      <Login />
      <ResetPassword />
      <Signup />
    </>
  );
};

export default Modals;