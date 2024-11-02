import type {NextConfig} from "next";
import dotenv from "dotenv";

dotenv.config()

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
        ],
    },
    rewrites: async () => ({
        afterFiles: [
            {
                source: "/admin/:path*",
                destination: process.env.CMS_URL + "/admin/:path*",
            },
            {
                source: "/avatars/:path*",
                destination: process.env.CMS_URL + "/avatars/:path*",
            },
            {
                source: "/media/:path*",
                destination: process.env.CMS_URL + "/media/:path*",
            },
            {
                source: "/logos/:path*",
                destination: process.env.CMS_URL + "/logos/:path*",
            },
            {
                source: "/photos/:path*",
                destination: process.env.CMS_URL + "/photos/:path*",
            },
            {
                source: "/graphql/:path*",
                destination: "http://localhost:3300/graphql/:path*",
            },
            {
                source: "/api/:path*",
                destination: "http://localhost:3300/api/:path*",
            }
        ],
        beforeFiles: [],
        fallback: []
    }),
    env: {
        CMS_API_URL: process.env.CMS_API_URL,
        CMS_API_KEY: process.env.CMS_API_KEY,
        NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
        NEXT_PUBLIC_CMS_URL: process.env.NEXT_PUBLIC_CMS_URL
    }
};

export default nextConfig;
