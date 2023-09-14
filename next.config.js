/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    // HOST
    HOST_API_KEY: 'https://localhost:7117/',
  },
  system: {
    // BRAND NAME
    BRAND_NAME: 'QuizzBank'
  }
}

module.exports = nextConfig
