/** @type {import('next').NextConfig} */
const nextConfig = {
    // Ensure no custom output directory is set
    distDir: 'build', // Default output directory for Next.js builds
  }
  // Use module.exports instead of export default
  module.exports = nextConfig;