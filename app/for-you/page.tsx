"use client";
import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import Sidebar from "../components/Sidebar";
import FeaturedBook from "../components/FeaturedBook";
import Recommended from "../components/Recommended";
import Suggested from "../components/Suggested";
import Modals from "../components/Modals";

const ForYou = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="fy__content--wrapper">
      <SearchBar toggleSidebar={toggleSidebar} />
      <Sidebar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

      <div className="row">
        <div className="container">
          <FeaturedBook />
          <div className="fy__title">Recommended For You</div>
          <div className="fy__subtitle">We think you'll like these</div>
          <Recommended />
          <div className="fy__title">Suggested Books</div>
          <div className="fy__subtitle">Browse those books</div>
          <Suggested />
        </div>
      </div>

      <Modals />
    </div>
  );
};

export default ForYou;
