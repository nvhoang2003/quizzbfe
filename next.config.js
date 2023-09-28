/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    // HOST
    LOCAL_API_KEY: 'https://localhost:7117/',
    HOST_API_KEY: 'http://103.161.178.66:8098/',
  },
  system: {
    // BRAND NAME
    BRAND_NAME: 'QuizzBank'
  }
}

module.exports = nextConfig
