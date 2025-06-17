import type { NextConfig } from 'next'

const isProd = process.env.NODE_ENV === 'production'

const nextConfig: NextConfig = {
  assetPrefix: isProd ? '/ero-movies' : '',
  basePath: isProd ? '/ero-movies' : '',
  output: 'export',
  reactStrictMode: false,
  // ✅ Add this block at the top level
  images: {
    unoptimized:true,
    domains: ['image.tmdb.org'],
  },
}

export default nextConfig
