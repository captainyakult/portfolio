/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three'],
  env: {
    // Make Vercel environment available to the client
    NEXT_PUBLIC_VERCEL_ENV: process.env.VERCEL_ENV,
  },
}

module.exports = nextConfig
