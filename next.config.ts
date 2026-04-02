import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  // 1. Esto permite ignorar errores de ESLint en Vercel
  eslint: {
    ignoreDuringBuilds: true,
  },

  // 2. ESTO ES LO QUE ARREGLA LAS IMÁGENES
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**', // Permite cualquier ruta dentro de Cloudinary
      },
    ],
  },
};

export default nextConfig;