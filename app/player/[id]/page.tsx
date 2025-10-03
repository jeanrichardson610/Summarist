"use client";
import Modals from "@/app/components/Modals";
import SearchBar from "@/app/components/SearchBar";
import Sidebar from "@/app/components/Sidebar";
import Skeleton from "@/app/components/Skeleton";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";
import { MdOutlineForward10, MdOutlineReplay10 } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { toggleModal } from "@/app/features/modal/modalSlice";

interface Book {
  id: string;
  author: string;
  title: string;
  subTitle: string;
  imageLink: string;
  audioLink: string;
  totalRating: number;
  averageRating: number;
  keyIdeas: number;
  type: string;
  status: string;
  subscriptionRequired: boolean;
  summary: string;
  tags: string[];
  bookDescription: string;
  authorDescription: string;
}

const Player = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const modalState = useSelector((state: RootState) => state.modal);

  const [book, setBook] = useState<Book | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fontSize, setFontSize] = useState<number>(16);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<Book>(
          `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
        );
        setBook(res.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching book:", error);
      }
    };

    fetchData();
  }, [id]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const onFontSizeChange = (size: number) => {
    setFontSize(size);
  };

  const toggleButton = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleForwardClick = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 10;
    }
  };

  const handleReplayClick = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 10;
    }
  };

  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const newTime = parseFloat(e.target.value);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
      return () =>
        audioRef.current?.removeEventListener("timeupdate", handleTimeUpdate);
    }
  }, [audioRef.current]);

  const formatDuration = (durationSeconds: number): string => {
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = Math.floor(durationSeconds % 60);
    const formattedSeconds = seconds.toString().padStart(2, "0");
    return `${minutes}:${formattedSeconds}`;
  };

  return (
    <>
      <Modals />
      <div className="fy__content--wrapper">
        <SearchBar toggleSidebar={toggleSidebar} />
        <Sidebar
          toggleSidebar={toggleSidebar}
          fontSize={fontSize}
          onFontSizeChange={onFontSizeChange}
          isSidebarOpen={isSidebarOpen}
        />
        <div className="summary">
          {isLoading ? (
            <div className="spinner__wrapper">
              <ImSpinner8 />
            </div>
          ) : (
            <div className="audio__book--summary">
              <div className="audio__book--summary-title">
                <b>{book?.title}</b>
              </div>
              <div
                className="audio__book--summary-text"
                style={{ fontSize: `${fontSize}px` }}
              >
                {book?.summary}
              </div>
            </div>
          )}
          <div className="audio__wrapper">
            <audio ref={audioRef} src={book?.audioLink}></audio>
            <div className="audio__track--wrapper">
              <figure className="audio__track--image-mask">
                <figure className="audio__book--img-wrapper">
                  {isLoading ? (
                    <Skeleton width="100%" height="100%" borderRadius="4px" />
                  ) : (
                    <img
                      src={book?.imageLink}
                      alt={book?.title}
                      className="audio__book--img"
                    />
                  )}
                </figure>
              </figure>
              <div className="audio__track--details-wrapper">
                {isLoading ? (
                  <Skeleton width="80px" height="20px" borderRadius="4px" />
                ) : (
                  <div className="audio__track--title">{book?.title}</div>
                )}
                {isLoading ? (
                  <Skeleton width="60px" height="20px" borderRadius="4px" />
                ) : (
                  <div className="audio__track--author">{book?.author}</div>
                )}
              </div>
            </div>
            <div className="audio__controls--wrapper">
              <div className="audio__controls">
                <button
                  onClick={handleReplayClick}
                  className="audio__controls--btn"
                >
                  <MdOutlineReplay10 size={38} />
                </button>
                <button
                  onClick={toggleButton}
                  className="audio__controls--btn audio__controls--btn-play"
                >
                  {isPlaying ? (
                    <FaPauseCircle size={40} />
                  ) : (
                    <FaPlayCircle size={40} />
                  )}
                </button>
                <button
                  onClick={handleForwardClick}
                  className="audio__controls--btn"
                >
                  <MdOutlineForward10 size={38} />
                </button>
              </div>
            </div>
            <div className="audio__progress--wrapper">
              <div className="audio__time">{formatDuration(currentTime)}</div>
              <input
                type="range"
                className="audio__progress--bar"
                min="0"
                max={duration}
                value={currentTime}
                onChange={handleSeek}
                style={{
                  background: `linear-gradient(to right, rgb(43, 217, 124) ${
                    (currentTime / duration) * 100
                  }%, rgb(109, 120, 125) ${(currentTime / duration) * 100}%)`,
                }}
              />
              <div className="audio__time">{formatDuration(duration)}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Player;
