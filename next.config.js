/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['api.bcc.anapolis.ifg.edu.br', 'bcc.anapolis.ifg.edu.br', 'source.unsplash.com']
  },
  generateEtags: false,
  reactStrictMode: true,
  experimental: {
    outputStandalone: true
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [{
          key: 'Cache-Control',
          value: 'no-cache, no-store, max-age=86400, must-revalidate'
        }]
      }
    ];
  }
};

module.exports = nextConfig;
