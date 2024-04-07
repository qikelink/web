/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "bafkreihsi2uofstr3oxu355zr3ggxyckxuguken4d6rhqgrah3kaqruo7u.ipfs.nftstorage.link",
    ],
  },
  // webpack: (config) => {
  //   // Add a fallback for the 'stream' module
  //   config.resolve.fallback = {
  //     ...config.resolve.fallback,
  //     stream: require.resolve('stream-browserify'),
  //     crypto: require.resolve('crypto-browserify'),
  //     http: require.resolve('stream-http'),
  //     https: require.resolve('https-browserify'),
  //     querystring: require.resolve('querystring-es3'),
  //   };
  //   return config;
  // }
};

module.exports = nextConfig;

