/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

module.exports = {
    async rewrites() {
      return [
        {
          source: '/:path*',
          destination: 'https://web.dev.adeemoo.com/api/v0.1/:path*',
        },
      ];
    },
  };