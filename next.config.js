/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Configuration optimisée pour Vercel
  experimental: {
    serverComponentsExternalPackages: ['mongoose']
  },
  // Augmenter les limites de taille pour les uploads
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
    responseLimit: '50mb',
  },
  // Configuration serveur pour les grandes requêtes
  serverRuntimeConfig: {
    maxBodySize: '50mb'
  }
}

module.exports = nextConfig