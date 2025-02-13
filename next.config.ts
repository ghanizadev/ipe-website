import dotenv from 'dotenv';
import type { NextConfig } from 'next';

import getRedirectsService from '@/services/get-redirects.service';

dotenv.config();

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3300',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cms.instituto-ipe.org',
        port: '',
        pathname: '/**',
      },
    ],
  },
  rewrites: async () => {
    const redirects = await getRedirectsService();
    const others = (redirects?.docs ?? []).map((redirect) => ({
      source: redirect.source,
      destination: redirect.target,
    }));

    return {
      afterFiles: [
        ...others,
        {
          source: '/admin/:path*',
          destination: process.env.CMS_API_URL + '/admin/:path*',
        },
        {
          source: '/avatars/:path*',
          destination: process.env.CMS_API_URL + '/avatars/:path*',
        },
        {
          source: '/media/:path*',
          destination: process.env.CMS_API_URL + '/media/:path*',
        },
        {
          source: '/logos/:path*',
          destination: process.env.CMS_API_URL + '/logos/:path*',
        },
        {
          source: '/photos/:path*',
          destination: process.env.CMS_API_URL + '/photos/:path*',
        },
        {
          source: '/graphql/:path*',
          destination: process.env.CMS_API_URL + '/graphql/:path*',
        },
        {
          source: '/api/:path*',
          destination: process.env.CMS_API_URL + '/api/:path*',
        },
      ],
      beforeFiles: [],
      fallback: [],
    };
  },
  env: {
    CMS_API_URL: process.env.CMS_API_URL,
    CMS_API_KEY: process.env.CMS_API_KEY,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXT_PUBLIC_CMS_URL: process.env.NEXT_PUBLIC_CMS_URL,
  },
};

export default nextConfig;
