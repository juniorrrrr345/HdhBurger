/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Force la configuration MongoDB pour Vercel
  env: {
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://Junior:Junior50@hshburgeer.59w7g4q.mongodb.net/hashburger?retryWrites=true&w=majority&appName=HshBurgeer'
  },
  // Configuration optimisée pour Vercel
  experimental: {
    serverComponentsExternalPackages: ['mongoose']
  }
}

module.exports = nextConfig