/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ywwuyawqnlato5w5.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
