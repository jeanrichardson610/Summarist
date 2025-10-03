"use client";
import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import Sidebar from "../components/Sidebar";
import { auth } from "../firebase/init";
import Modals from "../components/Modals";
import Link from "next/link";
import Image from "next/image";
import login from "../assets/login.png";
import Skeleton from "../components/Skeleton";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { toggleModal } from "@/app/features/modal/modalSlice";

const Settings = () => {
  const dispatch = useDispatch();
  const modalState = useSelector((state: RootState) => state.modal);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isGuest, setIsGuest] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserEmail(user.email || null);
        setIsGuest(user.isAnonymous);
      } else {
        setIsLoggedIn(false);
        setUserEmail(null);
        setIsGuest(false);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <div className="fy__content--wrapper">
        <SearchBar toggleSidebar={toggleSidebar} />
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <div className="container">
          <div className="row">
            <div className="section__title page__title">Settings</div>

            {isLoading ? (
              <>
                <div className="setting__content">
                  <Skeleton width="150px" height="20px" borderRadius="4px" />
                  <Skeleton width="100px" height="20px" borderRadius="4px" />
                </div>
                <div className="setting__content">
                  <Skeleton width="150px" height="20px" borderRadius="4px" />
                  <Skeleton width="100px" height="20px" borderRadius="4px" />
                </div>
              </>
            ) : isLoggedIn ? (
              <>
                <div className="setting__content">
                  <div className="settings__subtitle">Your Subscription Plan</div>
                  <div className="settings__text">Basic</div>
                  <Link href="/choose-plan" className="btn settings__upgrade--btn">
                    Upgrade to Premium
                  </Link>
                </div>
                <div className="setting__content">
                  <div className="settings__subtitle">Email</div>
                  <div className="settings__text">{userEmail || "guest@summarist.com"}</div>
                </div>
              </>
            ) : (
              <div className="settings__login--wrapper">
                <Image
                  className="settings__login--img"
                  src={login}
                  alt="login-img"
                />
                <div className="settings__login--text">
                  Log in to your account to see your details.
                </div>
                <div
                  onClick={() => dispatch(toggleModal("isModalOpen"))}
                  className="btn settings__login--btn"
                >
                  Login
                </div>
              </div>
            )}
          </div>
        </div>

        <Modals />
      </div>
    </>
  );
};

export default Settings;
