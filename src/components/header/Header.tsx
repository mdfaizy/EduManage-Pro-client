"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-md shadow-md" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-green-600 text-white font-bold w-9 h-9 flex items-center justify-center rounded-lg transition-transform group-hover:scale-110">
              EM
            </div>
            <div>
              <h1 className="text-base md:text-lg font-bold text-gray-800">
                EduManage Pro
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block">
                School Management Platform
              </p>
            </div>
          </Link>

          {/* Desktop Menu (only large screens) */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-700">
            <Link href="/" className="hover:text-green-600 transition">Home</Link>
            <Link href="/features" className="hover:text-green-600 transition">Features</Link>
            <Link href="/solutions" className="hover:text-green-600 transition">Solutions</Link>
            <Link href="/pricing" className="hover:text-green-600 transition">Pricing</Link>
            <Link href="/contact" className="hover:text-green-600 transition">Contact</Link>
          </nav>

          {/* Right Buttons (desktop only) */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/login" className="text-gray-700 font-medium hover:text-green-600 transition">
              Login
            </Link>
            <button className="border border-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-100 transition">
              Book Demo
            </button>
            <Link
  href="/register"
  className="bg-green-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 hover:scale-105 transition"
>
  Start Free Trial
</Link>
          </div>

          {/* Hamburger (mobile + tablet) */}
          <button onClick={() => setOpen(true)} className="lg:hidden text-gray-700">
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Drawer */}
      <div
        className={`fixed inset-0 z-50 transition ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setOpen(false)}
        />

        <div
          className={`absolute right-0 top-0 h-full w-72 bg-white shadow-lg p-6 transform transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button className="mb-6 text-gray-600" onClick={() => setOpen(false)}>
            <X size={26} />
          </button>

          <nav className="flex flex-col gap-5 text-gray-700 font-medium">
            <Link href="/">Home</Link>
            <Link href="/features">Features</Link>
            <Link href="/solutions">Solutions</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/contact">Contact</Link>
          </nav>

         <div className="mt-8 flex flex-col gap-3">
  <Link href="/login" className="border px-4 py-2 rounded-lg text-center">
    Login
  </Link>

  <Link href="/demo" className="border px-4 py-2 rounded-lg text-center">
    Book Demo
  </Link>

  <Link
  href="/register"
  className="bg-green-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 hover:scale-105 transition"
>
  Start Free Trial
</Link>
</div>

        </div>
      </div>
    </header>
  );
}
