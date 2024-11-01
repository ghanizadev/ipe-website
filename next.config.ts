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
    rewrites: async () => ([
        {
            source: "/cms/:path*",
            destination: "http://localhost:3300/api/:path*",
        }
    ]),
    env: {
        CMS_API_URL: process.env.CMS_API_URL,
        CMS_API_KEY: process.env.CMS_API_KEY,
        NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
        NEXT_PUBLIC_CMS_URL: process.env.NEXT_PUBLIC_CMS_URL
    }
};

export default nextConfig;
