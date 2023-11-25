/** @type {import('next').NextConfig} */
//const nextConfig = {}
//module.exports = nextConfig

module.exports = {
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'https://easyclaim.azurewebsites.next/api/:path*',
          },
        ]
      },
  };
