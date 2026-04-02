"use client";
import Link from "next/link";
import Image from "next/image";
import { useAdmin } from "../../context/AdminContext";
import { Menu } from "lucide-react";
import logo from "../../app/assets/logo.webp"; 

export default function MobileHeader() {
  const { toggleSidebar } = useAdmin();

  return (
    <header className="lg:hidden h-16 border-b border-[var(--glass-border)] bg-[var(--bg-page)]/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-30">
        <Link href="/" className="flex items-center gap-3">
             <div className="w-8 h-8 relative">
                <Image src={logo} alt="Logo" fill className="object-contain" />
             </div>
             <span className="font-display font-bold text-sm tracking-tight text-[var(--text-main)]">
                TRANSCENDENT <span className="text-[var(--text-muted)]">LABS</span>
             </span>
        </Link>
        
        <button 
          onClick={toggleSidebar}
          className="p-2 text-[var(--text-muted)] hover:text-[var(--text-main)] active:scale-95 transition-transform"
        >
            <Menu className="w-6 h-6" />
        </button>
    </header>
  );
}