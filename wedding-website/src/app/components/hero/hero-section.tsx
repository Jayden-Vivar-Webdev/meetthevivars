'use client'
import { useState, useEffect } from 'react';
import { Heart, Calendar, MapPin, Crown } from 'lucide-react';
import Link from 'next/link';

export default function WeddingHero() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const backgroundImages = [
    'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    'https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'
  ];

  useEffect(() => {
    setIsVisible(true);
    
    // Background image carousel
    const imageInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
    }, 6000);

    // Countdown timer
    const weddingDate = new Date('2025-09-09T16:00:00').getTime();
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);

    return () => {
      clearInterval(imageInterval);
      clearInterval(countdownInterval);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative p-20 md:p-0 min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Carousel */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1500 ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${image})`
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50" />
      </div>

      {/* Elegant Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 left-16 animate-float delay-1000">
          <Crown className="w-5 h-5 text-amber-300/40" />
        </div>
        <div className="absolute top-48 right-24 animate-float delay-2000">
          <div className="w-2 h-2 bg-amber-400/30 rounded-full"></div>
        </div>
        <div className="absolute bottom-48 left-32 animate-float delay-3000">
          <Crown className="w-4 h-4 text-amber-200/30" />
        </div>
        <div className="absolute top-72 left-1/3 animate-float delay-4000">
          <div className="w-1.5 h-1.5 bg-amber-300/25 rounded-full"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`relative z-10 text-center text-white px-6 max-w-5xl transition-all duration-1200 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}>
        
        {/* Italian Wedding Crest */}
        <div className="mb-8">
          <div className="w-16 h-16 mx-auto mb-6 border-2 border-amber-300 rounded-full flex items-center justify-center">
            <Crown className="w-8 h-8 text-amber-300" />
          </div>
        </div>

        {/* Names */}
        <div className="mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light tracking-wide mb-4 sm:mb-6 font-serif text-cream px-2">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0">
              <span className="inline-block hover:scale-105 transition-transform duration-500">Jayden</span>
              <span className="mx-2 sm:mx-6 text-amber-300">
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 inline-block" />
              </span>
              <span className="inline-block hover:scale-105 transition-transform duration-500">Annalyse</span>
            </div>
          </h1>
          <div className="flex items-center justify-center mb-4 sm:mb-6 px-4">
            <div className="w-8 sm:w-16 h-px bg-gradient-to-r from-transparent to-amber-300"></div>
            <div className="mx-2 sm:mx-4 text-amber-300 text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] font-light">Italian Wedding</div>
            <div className="w-8 sm:w-16 h-px bg-gradient-to-l from-transparent to-amber-300"></div>
          </div>
          <p className="text-base sm:text-lg md:text-xl font-light tracking-wider text-amber-100/90 italic px-4">
            &ldquo;Lamore vero non conosce confini.&rdquo;
          </p>
        </div>

        {/* Wedding Details */}
        <div className="bg-black/20 backdrop-blur-md rounded-xl p-4 sm:p-6 md:p-8 mb-8 sm:mb-10 border border-amber-300/20 shadow-2xl mx-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 text-sm sm:text-base">
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="bg-amber-300/10 p-2 sm:p-3 rounded-full">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
              </div>
              <div className="text-center sm:text-left">
                <p className="font-semibold text-base sm:text-lg tracking-wide">9 September 2025</p>
                <p className="text-amber-100/80 text-xs sm:text-sm">Trani Cathedrale</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="bg-amber-300/10 p-2 sm:p-3 rounded-full">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
              </div>
              <div className="text-center sm:text-left">
                <p className="font-semibold text-base sm:text-lg tracking-wide">Villa Gioa</p>
                <p className="text-amber-100/80 text-xs sm:text-sm">Family and Friends</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 md:space-x-6 justify-center items-center mb-10 sm:mb-12 px-4">
          <Link 
            href='/images'
            className="w-full sm:w-auto bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-md font-medium tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-xl group border border-amber-400/30 text-sm sm:text-base"
          >
            <span className="mr-2">View Images</span>
            <Heart className="w-4 h-4 inline-block" />
          </Link>
          <Link 
            href="/videos"
            className="w-full sm:w-auto bg-transparent border-2 border-amber-300 text-amber-100 hover:bg-amber-300 hover:text-gray-900 px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-md font-medium tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-xl text-sm sm:text-base"
          >
            View Videos
          </Link>
        </div>

        {/* Elegant Countdown */}
        <div className="text-center">
          <p className="text-amber-200/90 mb-6 text-lg font-light italic">For Ever & Always...</p>
          <div className="flex justify-center space-x-2 md:space-x-8">
            <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 md:p-5 min-w-[80px] md:min-w-[90px] border border-amber-300/20">
              <div className="text-2xl md:text-3xl font-light text-amber-300">{timeLeft.days}</div>
              <div className="text-xs md:text-sm text-amber-200/80 font-light">Giorni</div>
            </div>
            <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 md:p-5 min-w-[80px] md:min-w-[90px] border border-amber-300/20">
              <div className="text-2xl md:text-3xl font-light text-amber-300">{timeLeft.hours}</div>
              <div className="text-xs md:text-sm text-amber-200/80 font-light">Ore</div>
            </div>
            <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 md:p-5 min-w-[80px] md:min-w-[90px] border border-amber-300/20">
              <div className="text-2xl md:text-3xl font-light text-amber-300">{timeLeft.minutes}</div>
              <div className="text-xs md:text-sm text-amber-200/80 font-light">Minuti</div>
            </div>
            <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 md:p-5 min-w-[80px] md:min-w-[90px] border border-amber-300/20">
              <div className="text-2xl md:text-3xl font-light text-amber-300">{timeLeft.seconds}</div>
              <div className="text-xs md:text-sm text-amber-200/80 font-light">Secondi</div>
            </div>
          </div>
        </div>
      </div>

      

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}