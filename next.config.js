/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/orders',
        destination: '/',
        permanent: true,
      },
    ]
  },
}
  
module.exports = nextConfig
