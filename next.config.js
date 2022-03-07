/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['api.bcc.anapolis.ifg.edu.br', 'bcc.anapolis.ifg.edu.br']
  },
  generateEtags: false,
  reactStrictMode: true,
  experimental: {
    outputStandalone: true
  }
};

module.exports = nextConfig;
