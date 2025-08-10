"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, Menu, X, Camera, FileText, Home, Video } from "lucide-react";


export default function WeddingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-amber-300/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo/Names */}
          <Link 
            href="/" 
            aria-label="Jayden & Annalyse Italian Wedding" 
            className="flex items-center space-x-3 group"
            onClick={handleLinkClick}
          >
            <div className="w-10 h-10 border-2 border-amber-300 rounded-full flex items-center justify-center group-hover:border-amber-200 transition-colors">
              <Heart className="w-5 h-5 text-amber-300 group-hover:text-amber-200 transition-colors" />
            </div>
            <div className="text-white">
              <div className="font-serif text-lg md:text-xl tracking-wide">
                Jayden <span className="text-amber-300">&</span> Annalyse
              </div>
              <div className="text-xs text-amber-200/80 tracking-widest uppercase">
                9 Settembre 2025
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-amber-100 hover:text-amber-300 font-light text-sm tracking-wide transition-colors duration-300 border-b-2 border-transparent hover:border-amber-300"
              onClick={handleLinkClick}
            >
              HOME
            </Link>

            <Link 
              href="/images" 
              className="text-amber-100 hover:text-amber-300 font-light text-sm tracking-wide transition-colors duration-300 border-b-2 border-transparent hover:border-amber-300 flex items-center space-x-2"
              onClick={handleLinkClick}
            >
              <Camera className="w-4 h-4" />
              <span>IMAGES</span>
            </Link>
            <Link 
              href="/videos" 
              className="text-amber-100 hover:text-amber-300 font-light text-sm tracking-wide transition-colors duration-300 border-b-2 border-transparent hover:border-amber-300 flex items-center space-x-2"
              onClick={handleLinkClick}
            >
              <Video className="w-4 h-4" />
              <span>VIDEOS</span>
            </Link>
            
            {/* <Link 
              href="/updates" 
              className="text-amber-100 hover:text-amber-300 font-light text-sm tracking-wide transition-colors duration-300 border-b-2 border-transparent hover:border-amber-300 flex items-center space-x-2"
              onClick={handleLinkClick}
            >
              <FileText className="w-4 h-4" />
              <span>UPDATES</span>
            </Link> */}
            
            <Link 
              href="/updates" 
              className="px-6 py-2 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-medium text-sm rounded-md hover:from-amber-500 hover:to-amber-400 transition-all duration-300 shadow-lg hover:shadow-xl border border-amber-400/30 tracking-wide"
              onClick={handleLinkClick}
            >
              UPDATES
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-amber-100 hover:text-amber-300 focus:outline-none p-2 rounded-md transition-colors"
            aria-label="Mobile Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav
          className={`${mobileMenuOpen ? "block" : "hidden"} md:hidden py-6 border-t border-amber-300/20`}
          aria-label="Mobile Navigation"
        >
          <div className="flex flex-col space-y-6">
            <Link 
              href="/" 
              className="text-amber-100 hover:text-amber-300 font-light py-2 transition-colors duration-300 tracking-wide flex items-center space-x-3"
              onClick={handleLinkClick}
            >
              <Home className="w-4 h-4" />
              <span>HOME</span>
            </Link>

            <Link 
              href="/images" 
              className="text-amber-100 hover:text-amber-300 font-light py-2 transition-colors duration-300 tracking-wide flex items-center space-x-3"
              onClick={handleLinkClick}
            >
              <Camera className="w-4 h-4" />
              <span>IMAGES</span>
            </Link>
            <Link 
              href="/videos" 
              className="text-amber-100 hover:text-amber-300 font-light py-2 transition-colors duration-300 tracking-wide flex items-center space-x-3"
              onClick={handleLinkClick}
            >
              <Camera className="w-4 h-4" />
              <span>VIDEOS</span>
            </Link>
            
            {/* <Link 
              href="/updates" 
              className="text-amber-100 hover:text-amber-300 font-light py-2 transition-colors duration-300 tracking-wide flex items-center space-x-3"
              onClick={handleLinkClick}
            >
              <FileText className="w-4 h-4" />
              <span>UPDATES</span>
            </Link> */}
            
            <Link 
              href="/updates" 
              className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-medium rounded-md hover:from-amber-500 hover:to-amber-400 transition-all duration-300 text-center shadow-lg border border-amber-400/30 tracking-wide mt-4"
              onClick={handleLinkClick}
            >
              UPDATES
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}