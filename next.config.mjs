/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'medascend-akt.com',
          },
        ],
        destination: 'https://medexia-akt.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
