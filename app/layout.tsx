import type { Metadata } from "next";
import { Quicksand, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import ThemeProvider from "@/components/landing/ThemeProvider"; 
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
      <body suppressHydrationWarning className="antialiased bg-[var(--bg-page)] text-[var(--text-main)] selection:bg-pink-200 selection:text-pink-900 dark:selection:bg-pink-500/30 dark:selection:text-pink-200">
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <CartDrawer />
              {children}
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}