import {withSentryConfig} from '@sentry/nextjs';
import { withPayload } from '@payloadcms/next/withPayload';
import _ from 'lodash';
import type { NextConfig } from 'next';

import { SERVER_HOST, SERVER_PROTOCOL, SERVER_URL } from '@/constants/server';

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: false,
    nodeMiddleware: true,
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

export default withSentryConfig(withPayload(nextConfig), {
// For all available options, see:
// https://www.npmjs.com/package/@sentry/webpack-plugin#options

org: "ghanizadev-ltd",
project: "ipe-web",

// Only print logs for uploading source maps in CI
silent: !process.env.CI,

// For all available options, see:
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

// Upload a larger set of source maps for prettier stack traces (increases build time)
widenClientFileUpload: true,

// Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
// This can increase your server load as well as your hosting bill.
// Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
// side errors will fail.
tunnelRoute: "/monitoring",

// Automatically tree-shake Sentry logger statements to reduce bundle size
disableLogger: true,

// Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
// See the following for more information:
// https://docs.sentry.io/product/crons/
// https://vercel.com/docs/cron-jobs
automaticVercelMonitors: true,
});