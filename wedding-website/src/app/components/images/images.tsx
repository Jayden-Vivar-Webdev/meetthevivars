'use client'
import { useState } from 'react';
import { X, Heart, ChevronLeft, ChevronRight, Crown } from 'lucide-react';
import React from 'react';
import UploadForm from '../uploads/image-uploads';

interface ImageItem {
  id: number | string;
  src: string;
  title: string;
  description: string;
  category: string;
}

interface WeddingGalleryProps {
  items: ImageItem[];
  title?: string;
  subtitle?: string;
  subtitleTranslation?: string;
  coupleNames?: string;
}

export default function WeddingImagesSection({ 
  items = [], 
  title = "Our Love Story",
  subtitle = "Ogni immagine racconta un capitolo della nostra storia d'amore",
  subtitleTranslation = "Every image tells a chapter of our love story",
  coupleNames = "Jayden & Annalyse"
}: WeddingGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);



  const imagesToShow = items

  // Filter images based on selected category
  const filteredImages = selectedCategory 
    ? imagesToShow.filter(item => item.category === selectedCategory)
    : imagesToShow;

  const openModal = (image: ImageItem, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(filteredImages[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setSelectedImage(filteredImages[prevIndex]);
  };

  const categories = [...new Set(imagesToShow.map(img => img.category))];

  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent) => {
    if (!selectedImage) return;
    
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
  };

  React.useEffect(() => {
    if (selectedImage) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [selectedImage, currentIndex]);

  if (!imagesToShow || imagesToShow.length === 0) {
    return (
      <>
      <div className='pt-6 lg:pt-10'></div>
       <UploadForm />
      <div className="min-h-[12rem] bg-gradient-to-b from-cream-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Crown className="w-12 h-12 text-amber-400 mx-auto mb-4" />
          <h2 className="text-2xl font-serif text-gray-600 mb-2">No Images Available</h2>
          <p className="text-gray-500">Please add some beautiful memories to display.</p>
        </div>
      </div>
      </>
     
    );
  }

  return (
    <>
    
    <div className="min-h-screen bg-gradient-to-b from-cream-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-50 to-cream-50 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-amber-300"></div>
            <Crown className="w-6 h-6 text-amber-400 mx-4" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-amber-300"></div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-gray-800 mb-4 tracking-wide">
            {title}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light italic">
            &ldquo;{subtitle}&rdquo;
          </p>
          <p className="text-sm text-gray-500 mt-2 tracking-wide">
            {subtitleTranslation}
          </p>
        </div>
      </div>
      <UploadForm />

      {/* Gallery */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        {categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 border ${
                selectedCategory === null
                  ? 'bg-amber-500 text-white border-amber-500'
                  : 'bg-amber-100 hover:bg-amber-200 text-amber-800 border-amber-200'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 border ${
                  selectedCategory === category
                    ? 'bg-amber-500 text-white border-amber-500'
                    : 'bg-amber-100 hover:bg-amber-200 text-amber-800 border-amber-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white"
              onClick={() => openModal(image, index)}
            >
              {/* Image */}
              <div className="aspect-[4/5] overflow-hidden relative">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Overlay - same as video section */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="text-amber-300 text-xs font-light tracking-widest uppercase mb-1">
                      {image.category}
                    </div>
                    <h3 className="text-white font-serif text-lg mb-2 tracking-wide">
                      {image.title}
                    </h3>
                    <p className="text-gray-200 text-sm line-clamp-2 leading-relaxed">
                      {image.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Category Badge */}
              <div className="absolute top-3 left-3">
                <span className="bg-amber-500/90 text-white text-xs px-2 py-1 rounded-full font-medium backdrop-blur-sm">
                  {image.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredImages.length === 0 && selectedCategory && (
          <div className="text-center py-12">
            <Crown className="w-8 h-8 text-amber-400 mx-auto mb-4" />
            <h3 className="text-xl font-serif text-gray-600 mb-2">No images in &ldquo;{selectedCategory}&rdquo;</h3>
            <p className="text-gray-500">Try selecting a different category.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white hover:text-amber-300 transition-colors z-10"
            aria-label="Close gallery"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Navigation Buttons */}
          {filteredImages.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-amber-300 transition-colors z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-10 h-10" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-amber-300 transition-colors z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-10 h-10" />
              </button>
            </>
          )}

          {/* Modal Content */}
          <div className="max-w-6xl w-full flex flex-col items-center gap-6 max-h-[90vh]">
            {/* Image */}
            <div className="relative max-w-4xl w-full">
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full max-h-[60vh] object-contain rounded-lg shadow-2xl"
              />
            </div>

            {/* Image Info */}
            <div className="max-w-2xl text-center text-white">
              <div className="bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-amber-300/20">
                <div className="text-amber-300 text-sm font-light tracking-widest uppercase mb-3">
                  {selectedImage.category}
                </div>
                <h2 className="text-2xl font-serif font-light mb-4 tracking-wide text-amber-100">
                  {selectedImage.title}
                </h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                  {selectedImage.description}
                </p>
                
                {/* Image Counter */}
                <div className="flex items-center justify-between text-sm text-amber-200/80">
                  <span>{currentIndex + 1} of {filteredImages.length}</span>
                  <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4 text-amber-300" />
                    <span>{coupleNames}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
    
  );
}