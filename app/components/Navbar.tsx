"use client";

import Image from "next/image";
import logo from "../assets/logo.png";
import { useDispatch } from "react-redux";
import { toggleModal } from "@/app/features/modal/modalSlice";

const Navbar = () => {
  const dispatch = useDispatch();

  return (
    <nav className="nav">
      <div className="nav__wrapper">
        <figure className="nav__img--mask">
          <Image className="nav__img" src={logo} alt="logo" />
        </figure>
        <ul className="nav__list--wrapper">
          <li
            className="nav__list nav__list--login"
            onClick={() => dispatch(toggleModal("isModalOpen"))}
          >
            Login
          </li>
          <li className="nav__list nav__list--mobile">About</li>
          <li className="nav__list nav__list--mobile">Contact</li>
          <li className="nav__list nav__list--mobile">Help</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;