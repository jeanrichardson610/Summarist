"use client";
import React from "react";
import Navbar from "../components/Navbar";
import Landing from "../components/Landing";
import Features from "../components/Features";
import Reviews from "../components/Reviews";
import Numbers from "../components/Numbers";
import Modals from "../components/Modals";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { toggleModal } from "@/app/features/modal/modalSlice";

const Main = () => {
  const dispatch = useDispatch();
  const modalState = useSelector((state: RootState) => state.modal);

  return (
    <>
      <Navbar />
      <Landing />
      <Modals />
      <Features />
      <Reviews />
      <Numbers />
    </>
  );
};

export default Main;
