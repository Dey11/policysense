/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push(
        "crawlee",
        "puppeteer",
        "playwright",
        "puppeteer-core",
        "playwright-core",
      );
    }
    return config;
  },
};

export default nextConfig;
