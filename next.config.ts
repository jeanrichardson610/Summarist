import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com'], // Add your allowed domains here
  },
};

export default nextConfig;
