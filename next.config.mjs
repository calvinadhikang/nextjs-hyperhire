import { faL } from '@fortawesome/free-solid-svg-icons';

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                hostname: 'images-na.ssl-images-amazon.com'
            }
        ]
    }
};

export default nextConfig;
