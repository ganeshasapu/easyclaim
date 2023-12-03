/** @type {import('next').NextConfig} */
//const nextConfig = {}
//module.exports = nextConfig



module.exports = {
    async rewrites() {
        return [
          {
            source: '/api/:path*',
<<<<<<< Updated upstream
            destination: 'https://easyclaim.azurewebsites.next/api/:path*',
=======
            destination: process.env.NEXT_BACKEND_BASE_URL + '/api/:path*',
>>>>>>> Stashed changes
          },
        ]
      },
  };
