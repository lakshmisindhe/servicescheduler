/** @type {import('next').NextConfig} */
const nextConfig = {
    // Ensure no custom output directory is set
    distDir: 'build', // Default output directory for Next.js builds
}

// Change module.exports to export default
export default nextConfig;