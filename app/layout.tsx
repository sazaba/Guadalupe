import type { Metadata } from "next";
import { Quicksand, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext"; 
import CartDrawer from "@/components/cart/CartDrawer"; 

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-quicksand",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Guadalupe | Boutique Infantil",
  description: "Moda, ropa y accesorios increíbles para niños y niñas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className={`${quicksand.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body suppressHydrationWarning className="antialiased bg-[#FFFDFE] text-[#33182B] selection:bg-pink-200 selection:text-pink-900">
          <AuthProvider>
            <CartProvider>
              <CartDrawer />
              {children}
            </CartProvider>
          </AuthProvider>
      </body>
    </html>
  );
}