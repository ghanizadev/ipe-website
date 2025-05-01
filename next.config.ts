import { withPayload } from '@payloadcms/next/withPayload';
import _ from 'lodash';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3400',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'instituto-ipe.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ipe-website-stg-30b75539d629.herokuapp.com',
        pathname: '/**',
      },
    ],
  },
  env: {
    CMS_API_URL: process.env.CMS_API_URL,
    CMS_API_KEY: process.env.CMS_API_KEY,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXT_PUBLIC_CMS_URL: process.env.NEXT_PUBLIC_CMS_URL,
  },
  webpack: (config) => {
    return _.merge(config, {
      resolve: {
        alias: {
          handlebars: 'handlebars/dist/handlebars.js',
        },
      },
    });
  },
};

export default withPayload(nextConfig);
