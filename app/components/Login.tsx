"use client";

import React, { FormEvent, useState } from "react";
import { IoClose, IoPersonSharp } from "react-icons/io5";
import { ImSpinner8 } from "react-icons/im";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInAnonymously,
} from "firebase/auth";
import { auth } from "../firebase/init";
import google from "../assets/google.png";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { toggleModal, closeAll } from "@/app/features/modal/modalSlice";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const modalState = useSelector((state: RootState) => state.modal);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      dispatch(closeAll());
      router.push("/for-you");
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  const handleGuestLogin = async () => {
    try {
      await signInAnonymously(auth);
      dispatch(closeAll());
      router.push("/for-you");
    } catch (error) {
      console.error("Guest login error:", error);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    if (password.length < 6) {
      setError("Password should be a minimum of 6 characters.");
      return;
    }

    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      dispatch(closeAll());
      router.push("/for-you");
    } catch (error: any) {
      switch (error.code) {
        case "auth/user-not-found":
          setError("There is no user associated with this email.");
          break;
        case "auth/wrong-password":
          setError("Invalid password.");
          break;
        case "auth/invalid-email":
          setError("Invalid email.");
          break;
        default:
          setError("An error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`modal__login ${modalState.isModalOpen ? "open" : "closed"}`}>
      <div className="modal__close--wrapper">
        <button
          onClick={() => dispatch(toggleModal("isModalOpen"))}
          className="modal__close--btn"
        >
          <figure className="modal__close--btn-icon-wrapper">
            <IoClose className="modal__close--btn-icon" />
          </figure>
        </button>
      </div>

      <div className="modal__content">
        {error && <div className="error__message">{error}</div>}
        <h3 className="modal__title">Login to Summarist</h3>

        <div className="google__login--wrapper">
          <button className="guest__login--btn" onClick={handleGuestLogin}>
            <figure className="guest__login--icon-wrapper">
              <IoPersonSharp className="guest__login--icon" />
            </figure>
            Login as Guest
          </button>
        </div>

        <div className="modal__seperator">
          <hr className="line1 line" /> or <hr className="line2 line" />
        </div>

        <div className="google__login--wrapper">
          <button onClick={handleGoogleLogin} className="google__login--btn">
            <figure className="google__login--icon-wrapper">
              <Image src={google} alt="google" className="google__login--icon" />
            </figure>
            Login with Google
          </button>
        </div>

        <div className="modal__seperator">
          <hr className="line1 line" /> or <hr className="line2 line" />
        </div>

        <form onSubmit={handleSubmit} className="modal__form" autoComplete="on">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Email Address"
            className="modal__input"
            required
          />
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Password"
            className="modal__input"
            required
          />
          <button type="submit" className="modal__btn">
            {isLoading ? (
              <div className="button__spinner">
                <ImSpinner8 />
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="modal__links">
          <button
            onClick={() => {
              dispatch(toggleModal("isModalOpen"));
              dispatch(toggleModal("passwordModal"));
            }}
            className="modal__link modal__link--password"
          >
            Forgot your password?
          </button>
          <button
            onClick={() => {
              dispatch(toggleModal("isModalOpen"));
              dispatch(toggleModal("signupModal"));
            }}
            className="modal__link modal__link--signup"
          >
            Don't have an account?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
