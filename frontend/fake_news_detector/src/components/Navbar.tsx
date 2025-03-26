"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    {label:"Home",href:"/"},
    { label: "Predict by URL", href: "/scrape" },
  ];

  return (
    <motion.header className="fixed top-4 left-0 w-full z-50 flex justify-center px-4">
      <motion.div
        animate={{ height: isOpen ? "12rem" : "4rem" }} // Avoid 'auto' for smoother animation
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`max-w-5xl w-full bg-neutral-900/80 ${
          scrolling ? "backdrop-blur-md shadow-lg" : "backdrop-blur-none"
        } transition-all duration-300  rounded-xl border border-white/15 flex flex-col md:flex-row items-center px-6 overflow-hidden`}
      >
        {/* Top Row: Logo & Button */}
        <div className="w-full flex justify-between items-center py-4">
          <div className="text-xl md:text-3xl text-white font-bold">
            NewsGuard
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-md text-white hover:text-lime-400 transition duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation (Expands Inside Navbar) */}
        <AnimatePresence>
          {isOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "8rem" }} // Set a fixed height instead of auto
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="w-full flex flex-col items-center gap-2 pb-4 md:hidden"
            >
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-md text-white hover:text-lime-400 transition duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.header>
  );
};

export default Navbar;
