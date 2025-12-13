import { withPayload } from '@payloadcms/next/withPayload';
import { withSentryConfig } from '@sentry/nextjs';
import _ from 'lodash';
import type { NextConfig } from 'next';

import { SERVER_HOST, SERVER_PROTOCOL, SERVER_URL } from '@/constants/server';

const nextConfig: NextConfig = {
  reactCompiler: false,
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
  turbopack: {},
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

export default withSentryConfig(withPayload(nextConfig), {
  org: 'ghanizadev-ltd',
  project: 'ipe-web',
  silent: !process.env.CI,
  widenClientFileUpload: true,
  tunnelRoute: '/monitoring',
  disableLogger: true,
  automaticVercelMonitors: true,
});
