/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  generateEtags: false,
  env: {
    BACKOFFICE_API: process.env.BACKOFFICE_API,
    BACKOFFICE_API_TOKEN: process.env.BACKOFFICE_API_TOKEN,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    API_URL: process.env.API_URL,
    SERVICE_KEY: process.env.SERVICE_KEY,
    SERVICE_ID: process.env.SERVICE_ID,
    GOOGLE_ID: process.env.GOOGLE_ID,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET
  },

  async redirects() {
    return [
      {
        source: '/nouvelle-campagne',
        destination: '/nouvelle-campagne',
        permanent: false,
      },
      {
        source: '/new-campain',
        destination: '/nouvelle-campagne',
        permanent: false,
      },
    ]
  }
}

module.exports = nextConfig
