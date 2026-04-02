import { prisma } from "@/lib/prisma";
import { Crown } from "lucide-react";

// ✅ ESTA LÍNEA ELIMINA EL CACHÉ Y MUESTRA PRECIOS SIEMPRE ACTUALIZADOS
export const dynamic = "force-dynamic";

// --- IMPORTACIONES DE COMPONENTES ---
import PremiumBackground from "@/components/landing/PremiumBackground";
import Navbar from "@/components/landing/Navbar";
import HeroBoutique from "@/components/landing/HeroModern"; 
import TrustTicker from "@/components/landing/TrustTicker";
import BoutiqueFeaturesGrid from "@/components/landing/BoutiqueFeaturesGrid";
import BoutiqueShowcase from "@/components/landing/BoutiqueShowcase";
import PrincessGallery from "@/components/landing/PrincessGallery"; 
import BoutiqueReels from "@/components/landing/BoutiqueReels"; // 🎬 NUEVO COMPONENTE
import CustomerReviews from "@/components/landing/CustomerReviews"; 
import SizeGuide from "@/components/landing/SizeGuide"; 
import FAQSection from "@/components/landing/FAQSection";
import Footer from "@/components/landing/Footer";

export default async function Home() {
  
  // 1. OBTENER DATOS REALES DE LA BASE DE DATOS
  const products = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' }
  });

  // 2. SERIALIZAR DATOS
  const serializedProducts = products.map((product: any) => ({
    ...product,
    price: Number(product.price), 
    purity: product.purity || "", 
    description: product.description || "",
    isFeatured: Boolean(product.isFeatured) 
  }));

  return (
    <main className="relative flex min-h-dvh flex-col overflow-x-hidden selection:bg-pink-200 selection:text-pink-900">
      
      <Navbar /> 
      <PremiumBackground />
      
      {/* Textura sutil de ruido */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay fixed z-0"></div>

      <section id="hero"><HeroBoutique /></section>
      <section id="promises" className="scroll-mt-24"><TrustTicker /></section>
      <section id="about" className="scroll-mt-24"><BoutiqueFeaturesGrid /></section>
      
      <section id="catalog" className="scroll-mt-24">
        <BoutiqueShowcase products={serializedProducts} />
      </section>

      <section id="gallery" className="scroll-mt-24"><PrincessGallery /></section>
      
      {/* 🎬 SECCIÓN DE REELS (VIDEOS EN ACCIÓN) */}
      <section id="reels" className="scroll-mt-24"><BoutiqueReels /></section> 

      <section id="reviews" className="scroll-mt-24"><CustomerReviews /></section> 

      <section id="sizes" className="scroll-mt-24"><SizeGuide /></section> 
      <section id="faq" className="scroll-mt-24"><FAQSection /></section>
      
      <Footer />

      <div className="py-8 w-full px-6 flex justify-center text-[10px] text-[#7B5C73] font-sans font-bold uppercase tracking-wider border-t border-[#FAD1E6]/50 relative z-10 bg-[#FFFDFE]">
        <div className="flex items-center gap-2">
           <Crown className="w-4 h-4 text-[#E85D9E]" />
           <span>Guadalupe Boutique Infantil © 2026</span>
        </div>
      </div>
    </main>
  );
}