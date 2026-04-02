import type { Metadata } from "next";
import { Poppins, Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import ThemeProvider from "@/components/landing/ThemeProvider"; 
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext"; 
import CartDrawer from "@/components/cart/CartDrawer"; 
import AgeVerificationModal from "../components/landing/AgeVerificationModal"; 

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
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
  title: "Transcendent | Future of Peptides",
  description: "Advanced bio-active peptide science.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${poppins.variable} ${inter.variable} ${jetbrains.variable}`}>
      <head>
        {/* ✅ SCRIPT PARA PREVENIR EL DESTELLO DE INGLÉS A ESPAÑOL (FOUC) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (document.cookie.match(/(^|;) ?googtrans=([^;]*)(;|$)/) && document.cookie.includes('/es')) {
                document.documentElement.classList.add('translating');
              }
            `,
          }}
        />

        {/* ✅ CSS PARA LIMPIAR EL WIDGET Y MANEJAR LA TRANSICIÓN */}
        <style>{`
          .goog-te-banner-frame { display: none !important; }
          body { top: 0 !important; }
          .skiptranslate iframe { display: none !important; }
          #google_translate_element { display: none !important; }
          
          .goog-text-highlight {
            background-color: transparent !important;
            box-shadow: none !important;
          }

          /* Ocultar el body mientras traduce, solo si la clase 'translating' está presente */
          html.translating body {
            opacity: 0;
          }
          /* Mostrar el body suavemente una vez que Google inyecta su clase nativa de finalización */
          html.translated-ltr body {
            opacity: 1 !important;
            transition: opacity 0.4s ease-in-out;
          }
        `}</style>
      </head>
      
      {/* ✅ suppressHydrationWarning AÑADIDO AL BODY PARA EVITAR CONFLICTOS CON NEXT.JS */}
      <body suppressHydrationWarning className="antialiased bg-[var(--bg-page)] text-[var(--text-main)] selection:bg-cyan-500/30 selection:text-cyan-600 dark:selection:text-cyan-200">
        
        <div id="google_translate_element" className="hidden"></div>

        <Script
          id="google-translate-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              function googleTranslateElementInit() {
                new google.translate.TranslateElement({
                  pageLanguage: 'en',
                  includedLanguages: 'en,es',
                  layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                  autoDisplay: false
                }, 'google_translate_element');
              }
            `,
          }}
        />
        <Script
          id="google-translate-script"
          strategy="afterInteractive"
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        />

        <ThemeProvider>
          <AgeVerificationModal />

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