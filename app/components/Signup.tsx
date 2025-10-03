"use client";

import React, { FormEvent, useState } from "react";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ImSpinner8 } from "react-icons/im";
import google from "../assets/google.png";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "../firebase/init";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { toggleModal, closeAll } from "@/app/features/modal/modalSlice";

const Signup = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const modalState = useSelector((state: RootState) => state.modal);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      await signInWithPopup(auth, provider);
      dispatch(closeAll());
      router.push("/for-you");
    } catch (error) {
      console.error("Google signup error:", error);
      setError("Google signup failed.");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

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
      await createUserWithEmailAndPassword(auth, email, password);
      dispatch(closeAll());
      router.push("/for-you");
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/invalid-email":
            setError("Invalid email.");
            break;
          case "auth/email-already-in-use":
            setError("There is already a user associated with this email.");
            break;
          default:
            setError("An error occurred.");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`modal__signup ${modalState.signupModal ? "open" : "closed"}`}>
      <div className="modal__close--wrapper">
        <button
          onClick={() => dispatch(toggleModal("signupModal"))}
          className="modal__close--btn"
        >
          <figure className="modal__close--btn-icon-wrapper">
            <IoClose className="modal__close--btn-icon" />
          </figure>
        </button>
      </div>

      <div className="modal__content--signup">
        <h3 className="modal__title--signup">Sign up to Summarist</h3>
        {error && <div className="error__message">{error}</div>}

        <div className="google__signup--wrapper">
          <button onClick={handleGoogleLogin} className="google__signup--btn">
            <figure className="google__signup--icon-wrapper">
              <Image src={google} alt="google" className="google__signup--icon" />
            </figure>
            Signup with Google
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
            className="modal__input"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            className="modal__input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="modal__btn">
            {isLoading ? (
              <div className="button__spinner">
                <ImSpinner8 />
              </div>
            ) : (
              "Sign up"
            )}
          </button>
        </form>

        <button
          onClick={() => {
            dispatch(toggleModal("signupModal"));
            dispatch(toggleModal("isModalOpen"));
          }}
          className="modal__btn--existing-account modal__link"
        >
          Already have an account?
        </button>
      </div>
    </div>
  );
};

export default Signup;
