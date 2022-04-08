/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['api.bcc.anapolis.ifg.edu.br', 'bcc.anapolis.ifg.edu.br', 'source.unsplash.com']
  },
  reactStrictMode: true,
  optimizeFonts: false,
  experimental: {
    outputStandalone: true
  }
};

module.exports = nextConfig;
