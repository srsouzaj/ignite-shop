const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
}

module.exports = nextConfig