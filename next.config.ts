import { withPayload } from '@payloadcms/next/withPayload';
import _ from 'lodash';
import type { NextConfig } from 'next';

import { SERVER_HOST, SERVER_PROTOCOL, SERVER_URL } from '@/constants/server';

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: SERVER_PROTOCOL,
        hostname: SERVER_HOST,
        pathname: '/**',
      },
    ],
  },
  env: {
    SERVER_URL: SERVER_URL,
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
