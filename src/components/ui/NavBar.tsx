"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./Button";

export function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-md bg-[#202020]/90 border-b border-[#ffffff]/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex flex-col items-start">
          <span className="font-adamina text-2xl tracking-tighter text-white group-hover:text-[var(--color-brand-accent)] transition-colors">
            SUN PAC
          </span>
          <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-gold-light)] font-poppins">
            Pallets
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-10">
          {[
            ["Services", "/services"],
            ["Process", "/#process"],
            ["Contact", "/contact"],
          ].map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className={`text-sm font-poppins tracking-wide hover:text-[var(--color-brand-accent)] transition-colors ${
                pathname === href ? "text-[var(--color-brand-accent)]" : "text-gray-300"
              }`}
            >
              {label}
            </Link>
          ))}
          
          <Button variant="primary" className="ml-4 font-bold text-sm">
            GET QUOTE
          </Button>
        </div>

        {/* Mobile Menu Trigger (Simple for now) */}
        <button className="md:hidden text-white">
          <span className="sr-only">Open menu</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
