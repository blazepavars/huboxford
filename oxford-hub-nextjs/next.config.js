/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.agilitycdn.com',
      },
      {
        protocol: 'https',
        hostname: 'digitalasset.oxfordproperties.com',
      },
    ],
  },
}

module.exports = nextConfig