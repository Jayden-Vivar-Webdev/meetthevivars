'use client'
import { useState } from 'react';
import { Camera, Video, Heart, ArrowRight, Play, Image } from 'lucide-react';

export default function WeddingGallery() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const galleryItems = [
    {
      id: 'images',
      title: 'Photo Gallery',
      subtitle: 'I nostri momenti più belli',
      description: 'Discover our journey through beautiful photographs capturing our love story, engagement moments, and precious memories together.',
      icon: Camera,
      backgroundImage: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      link: '/images',
      color: 'amber'
    },
    {
      id: 'videos',
      title: 'Video Collection',
      subtitle: 'La nostra storia in movimento',
      description: 'Watch our love come alive through special video moments, from our proposal to behind-the-scenes wedding preparations.',
      icon: Video,
      backgroundImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      link: '/videos',
      color: 'rose'
    }
  ];

  return (
    <section id='albums' className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-amber-300"></div>
            <Heart className="w-6 h-6 text-amber-400 mx-4" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-amber-300"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-gray-800 mb-4 tracking-wide">
            Our Gallery
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light italic">
            &ldqup;Ogni immagine racconta una parte della nostra storia d&apos;amore&rdquo;
          </p>
          <p className="text-sm text-gray-500 mt-2 tracking-wide">
            Every image tells a part of our love story
          </p>
        </div>

        {/* Gallery Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="group relative"
              onMouseEnter={() => setHoveredCard(item.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <a 
                href={item.link}
                className="block relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:scale-[1.02]"
              >
                {/* Background Image */}
                <div 
                  className="relative h-96 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${item.backgroundImage})` }}
                >
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-500" />
                  
                  {/* Floating Icon */}
                  <div className="absolute top-6 right-6">
                    <div className={`w-12 h-12 bg-${item.color}-500/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-${item.color}-300/30 transition-all duration-500 ${hoveredCard === item.id ? 'scale-110' : ''}`}>
                      <item.icon className={`w-6 h-6 text-${item.color}-300`} />
                    </div>
                  </div>

                  {/* Play Button for Videos */}
                  {item.id === 'videos' && (
                    <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${hoveredCard === item.id ? 'scale-110' : ''}`}>
                      <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </div>
                    </div>
                  )}

                  {/* Image Icon for Photos */}
                  {item.id === 'images' && (
                    <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${hoveredCard === item.id ? 'scale-110' : ''}`}>
                      <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
                        <Image className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="transform transition-transform duration-500 group-hover:translate-y-[-8px]">
                      <p className="text-amber-300 text-sm font-light tracking-widest uppercase mb-2 italic">
                        {item.subtitle}
                      </p>
                      <h3 className="text-2xl md:text-3xl font-serif font-light text-white mb-3 tracking-wide">
                        {item.title}
                      </h3>
                      <p className="text-gray-200 text-sm leading-relaxed mb-6 opacity-90">
                        {item.description}
                      </p>
                      
                      {/* Call to Action */}
                      <div className="flex items-center text-amber-300 font-medium text-sm tracking-wide group-hover:text-amber-200 transition-colors">
                        <span>EXPLORE COLLECTION</span>
                        <ArrowRight className={`w-4 h-4 ml-2 transition-transform duration-300 ${hoveredCard === item.id ? 'translate-x-2' : ''}`} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Border Effect */}
                <div className={`absolute inset-0 rounded-2xl border-2 border-transparent transition-all duration-500 ${hoveredCard === item.id ? `border-${item.color}-300/50` : ''}`} />
              </a>
            </div>
          ))}
        </div>

        {/* Bottom Decorative Element */}
        <div className="text-center mt-16">
          <div className="flex items-center justify-center">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
}