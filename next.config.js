/** @type {import('next').NextConfig} */

const securityHeaders = [
  {
    key: "Access-Control-Allow-Origin", // PROTECT AGAINST CSRF
    value: "http://localhost:3000",
  },
  {
    key: "X-XSS-Protection", // PROTECT AGAINST XSS
    value: "1; mode=block",
  },
];

const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: `/(.*)`,
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
