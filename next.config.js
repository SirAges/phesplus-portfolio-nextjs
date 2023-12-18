/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: [
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
      "cdn.sanity.io",
    ],

    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "*.googleusercontent.com",
    //     port: "",
    //     pathname: "**",
    //   },
    //   {
    //     protocol: "http",
    //     hostname: "res.cloudinary.com",
    //     port: "",
    //     pathname: "**",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "*/cdn.sanity.io",
    //     port: "",
    //     pathname: "**",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "cdn.sanity.io",
    //     port: "",
    //     pathname: "/cdn/**",
    //   },
    // ],

    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "lh3.googleusercontent.com",
    //     port: "",
    //     pathname: "/lh3**",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "res.cloudinary.com",
    //     port: "",
    //     pathname: "/res/**",
    //   },
    // ],
  },
  experimental: {
    serverComponentsExternalPackages: ["cloudinary"],
  },
};

module.exports = nextConfig;
