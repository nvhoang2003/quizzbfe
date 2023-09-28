/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    // HOST
    HOST_API_KEY: 'https://localhost:7117/' || 'http://103.161.178.66:8098/',
    // HOST_API_KEY: 'http://103.161.178.66:8098/',
  },
  system: {
    // BRAND NAME
    BRAND_NAME: 'QuizzBank'
  }
}

module.exports = nextConfig
