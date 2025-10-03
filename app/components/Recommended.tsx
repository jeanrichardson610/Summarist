"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiClock2 } from "react-icons/ci";
import { IoStarOutline } from "react-icons/io5";
import PremiumPill from "./PremiumPill";
import Link from "next/link";
import Skeleton from "./Skeleton";

interface RecommendedBook {
  id: string;
  title: string;
  subTitle: string;
  author: string;
  duration: string;
  audioLink: string;
  imageLink: string;
  averageRating: number;
  subscriptionRequired: boolean;
}

const Recommended = () => {
  const [recommendedBook, setRecommendedBook] = useState<RecommendedBook[]>([]);
  const [durations, setDurations] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<RecommendedBook[]>(
          "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended"
        )
        const books = res.data
        setRecommendedBook(books)
        books.forEach((book) => {
          const audio = new Audio(book.audioLink);
          audio.addEventListener("loadedmetadata", () => {
            const duration = formatDuration(audio.duration);
            setDurations((prev) => ({ ...prev, [book.id]: duration }));
          })
        })

        setIsLoading(false); 
      } catch (error) {
        console.error("Error", error);
        setIsLoading(false); 
      }
    };

    fetchData();
  }, []);

  const formatDuration = (durationSeconds: number): string => {
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = Math.floor(durationSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="rb__wrapper">
      {isLoading
        ? Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="rb__link">
              <div>
                <Skeleton width="150px" height="200px" borderRadius="4px" />
                <Skeleton width="100px" height="20px" borderRadius="4px" />
                <Skeleton width="80px" height="20px" borderRadius="4px" />
                <Skeleton width="60px" height="20px" borderRadius="4px" />
              </div>
            </div>
          ))
        : recommendedBook.map((book) => (
            <div key={book.id} className="rb__link">
              <Link href={`/book/${book.id}`}>
                {book.subscriptionRequired && <PremiumPill />}
                <figure className="rb__img--wrapper">
                  <img
                    className="rb__img"
                    src={book.imageLink}
                    alt={book.title}
                  />
                </figure>
                <div className="rb__title">{book.title}</div>
                <div className="rb__author">{book.author}</div>
                <div className="rb__subtitle">{book.subTitle}</div>
                <div className="rb__details--wrapper">
                  <div className="rb__details">
                    <div className="rb__details--icon">
                      <CiClock2 />
                    </div>
                    <div className="rb__details--text">
                      {durations[book.id] || "Loading"}
                    </div>
                  </div>
                  <div className="rb__details">
                    <div className="rb__details--icon">
                      <IoStarOutline />
                    </div>
                    <div className="rb__details--text">
                      {book.averageRating}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
    </div>
  );
};

export default Recommended;
