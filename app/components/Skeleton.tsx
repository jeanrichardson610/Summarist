import React from "react";

interface SkeletonProps {
    width: string;
    height: string;
    borderRadius: string;
}

const Skeleton = ({ width, height, borderRadius }: SkeletonProps) => {
  return (
    <div
      className="skeleton-box"
      style={{
        width: width || "100%",
        height: height || "",
        borderRadius: borderRadius || ""
      }}
    ></div>
  );
};

export default Skeleton;