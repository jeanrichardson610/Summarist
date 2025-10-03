"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import logo from "../assets/logo.png";

// Icons
import { TiHomeOutline } from "react-icons/ti";
import { CiBookmark, CiSettings } from "react-icons/ci";
import { RiBallPenLine, RiFontSize } from "react-icons/ri";
import { IoSearchOutline } from "react-icons/io5";
import { FiHelpCircle } from "react-icons/fi";
import { LuLogIn, LuLogOut } from "react-icons/lu";
import { ImSpinner8 } from "react-icons/im";

// Firebase
import { auth } from "../firebase/init";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "@/app/features/modal/modalSlice";
import { RootState } from "@/app/store";

type SidebarProps = {
  isSidebarOpen: boolean;
  fontSize?: number;
  onFontSizeChange?: (size: number) => void;
  toggleSidebar: () => void;
};

const Sidebar = ({
  isSidebarOpen,
  fontSize = 16,
  onFontSizeChange = () => {},
  toggleSidebar,
}: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const modalState = useSelector((state: RootState) => state.modal);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  // Track auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
      if (user && modalState.isModalOpen) {
        dispatch(toggleModal("isModalOpen"));
      }
    });
    return () => unsubscribe();
  }, [dispatch, modalState.isModalOpen]);

  // Logout with overlay
  const handleLogOut = async () => {
    try {
      setLoggingOut(true); // show overlay
      await auth.signOut();

      setTimeout(() => {
        router.push("/"); // redirect after 2 seconds
      }, 2000);
    } catch (error) {
      console.error("Error during logout:", error);
      setLoggingOut(false); // hide overlay if error
    }
  };

  return (
    <>
      {/* Logging out overlay */}
      {loggingOut && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2rem",
            zIndex: 9999,
          }}
        >
          Logging out...
          <ImSpinner8
            style={{ marginLeft: "10px", animation: "spin 1s linear infinite" }}
          />
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )}

      {/* Sidebar */}
      <div className={`sidebar__container ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar__content">
          <div className="sidebar__img--wrapper">
            <Image width={160} height={40} src={logo} alt="logo" />
          </div>

          <div className="sidebar__top">
            <a href="/for-you" className="sidebar__link--wrapper sidebar__hover">
              <div
                className={`sidebar__link--line ${
                  pathname === "/for-you" ? "active--tab" : ""
                }`}
              ></div>
              <div className="sidebar__icon--wrapper">
                <TiHomeOutline />
              </div>
              <div className="sidebar__link--text">For You</div>
            </a>

            <a href="#" className="sidebar__link--wrapper sidebar__not-allowed">
              <div
                className={`sidebar__link--line ${
                  pathname === "/library" ? "active--tab" : ""
                }`}
              ></div>
              <div className="sidebar__icon--wrapper">
                <CiBookmark />
              </div>
              <div className="sidebar__link--text">My Library</div>
            </a>

            <div className="sidebar__link--wrapper sidebar__not-allowed">
              <div className="sidebar__link--line"></div>
              <div className="sidebar__icon--wrapper">
                <RiBallPenLine />
              </div>
              <div className="sidebar__link--text">Highlights</div>
            </div>

            <div className="sidebar__link--wrapper sidebar__not-allowed">
              <div className="sidebar__link--line"></div>
              <div className="sidebar__icon--wrapper">
                <IoSearchOutline />
              </div>
              <div className="sidebar__link--text">Search</div>
            </div>

            {pathname.startsWith("/player/") && (
              <div className="sidebar__link--wrapper sidebar__font--size-wrapper">
                {[16, 20, 24, 28].map((size) => (
                  <div
                    key={size}
                    className={`sidebar__link--text sidebar__font--size-icon ${
                      fontSize === size ? "sidebar__font--size-icon--active" : ""
                    }`}
                    onClick={() => onFontSizeChange(size)}
                  >
                    <RiFontSize size={size} />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="sidebar__bottom">
            <a href="/settings" className="sidebar__link--wrapper sidebar__hover">
              <div
                className={`sidebar__link--line ${
                  pathname === "/settings" ? "active--tab" : ""
                }`}
              ></div>
              <div className="sidebar__icon--wrapper">
                <CiSettings className="settings__icon" />
              </div>
              <div className="sidebar__link--text">Settings</div>
            </a>

            <div className="sidebar__link--wrapper sidebar__not-allowed">
              <div className="sidebar__link--line"></div>
              <div className="sidebar__icon--wrapper">
                <FiHelpCircle />
              </div>
              <div className="sidebar__link--text">Help & Support</div>
            </div>

            {isLoggedIn === null ? null : isLoggedIn ? (
              <div onClick={handleLogOut} className="sidebar__link--wrapper sidebar__hover">
                <div className="sidebar__link--line"></div>
                <div className="sidebar__icon--wrapper">
                  <LuLogOut />
                </div>
                <div className="sidebar__link--text">Logout</div>
              </div>
            ) : (
              <div
                onClick={() => dispatch(toggleModal("isModalOpen"))}
                className="sidebar__link--wrapper sidebar__hover"
              >
                <div className="sidebar__link--line"></div>
                <div className="sidebar__icon--wrapper">
                  <LuLogIn />
                </div>
                <div className="sidebar__link--text">Login</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
