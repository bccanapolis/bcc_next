/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'api.bcc.anapolis.ifg.edu.br',
      'bcc.anapolis.ifg.edu.br',
      'source.unsplash.com',
    ],
  },
  reactStrictMode: true,
  optimizeFonts: false,
  output: 'standalone',
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
};

module.exports = nextConfig;
