'use client'
import { useState, useRef, useEffect } from 'react';
import { X, Heart, ChevronLeft, ChevronRight, Crown, Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import React from 'react';
import UploadVideoForm from '@/app/components/uploads/video-uploads'


interface VideoItem {
  id: number | string;
  src: string;
  title: string;
  description: string;
  category: string;
  thumbnail?: string;
  duration?: string;
}

interface WeddingVideoGalleryProps {
  items: VideoItem[];
  title?: string;
  subtitle?: string;
  subtitleTranslation?: string;
  coupleNames?: string;
}

export default function WeddingVideoSection({ 
  items = [], 
  title = "Our Love Story",
  subtitle = "Ogni momento catturato per l'eternità",
  subtitleTranslation = "Every moment captured for eternity",
  coupleNames = "Jayden & Annalyse"
}: WeddingVideoGalleryProps) {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Sample data for demonstration


  const videosToShow = items;


  // Filter videos based on selected category
  const filteredVideos = selectedCategory 
    ? videosToShow.filter(item => item.category === selectedCategory)
    : videosToShow;

  const openModal = (video: VideoItem, index: number) => {
    setSelectedVideo(video);
    setCurrentIndex(index);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const closeModal = () => {
    setSelectedVideo(null);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const nextVideo = () => {
    const nextIndex = (currentIndex + 1) % filteredVideos.length;
    setCurrentIndex(nextIndex);
    setSelectedVideo(filteredVideos[nextIndex]);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const prevVideo = () => {
    const prevIndex = currentIndex === 0 ? filteredVideos.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setSelectedVideo(filteredVideos[prevIndex]);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const categories = [...new Set(videosToShow.map(video => video.category))];

  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent) => {
    if (!selectedVideo) return;
    
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') prevVideo();
    if (e.key === 'ArrowRight') nextVideo();
    if (e.key === ' ') {
      e.preventDefault();
      togglePlay();
    }
  };

  useEffect(() => {
    if (selectedVideo) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [selectedVideo, currentIndex, isPlaying]);

  if (!videosToShow || videosToShow.length === 0) {
    return (
      <>
      <div className='pt-6 lg:pt-10'></div>
      <UploadVideoForm />
      <div className="min-h-[12rem] bg-gradient-to-b from-cream-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Crown className="w-12 h-12 text-amber-400 mx-auto mb-4" />
          <h2 className="text-2xl font-serif text-gray-600 mb-2">No Videos Available</h2>
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
      <UploadVideoForm />

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

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVideos.map((video, index) => (
            <div
              key={video.id}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white"
              onClick={() => openModal(video, index)}
            >
              {/* Video Thumbnail */}
              <div className="aspect-video overflow-hidden relative">
                <video
                  src={video.src}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  preload="metadata"
                  muted
                />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-amber-500/90 rounded-full p-3 backdrop-blur-sm">
                    <Play className="w-6 h-6 text-white ml-1" />
                  </div>
                </div>

                {/* Duration Badge */}
                {video.duration && (
                  <div className="absolute bottom-3 right-3">
                    <span className="bg-black/80 text-white text-xs px-2 py-1 rounded-md font-medium backdrop-blur-sm">
                      {video.duration}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Content */}
              <div className="p-4">
                <div className="text-amber-600 text-xs font-light tracking-widest uppercase mb-1">
                  {video.category}
                </div>
                <h3 className="text-gray-800 font-serif text-lg mb-2 tracking-wide line-clamp-1">
                  {video.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                  {video.description}
                </p>
              </div>

              {/* Category Badge */}
              <div className="absolute top-3 left-3">
                <span className="bg-amber-500/90 text-white text-xs px-2 py-1 rounded-full font-medium backdrop-blur-sm">
                  {video.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredVideos.length === 0 && selectedCategory && (
          <div className="text-center py-12">
            <Crown className="w-8 h-8 text-amber-400 mx-auto mb-4" />
            <h3 className="text-xl font-serif text-gray-600 mb-2">No videos in &ldquo;{selectedCategory}&rdquo;</h3>
            <p className="text-gray-500">Try selecting a different category.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedVideo && (
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
          {filteredVideos.length > 1 && (
            <>
              <button
                onClick={prevVideo}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-amber-300 transition-colors z-10"
                aria-label="Previous video"
              >
                <ChevronLeft className="w-10 h-10" />
              </button>
              <button
                onClick={nextVideo}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-amber-300 transition-colors z-10"
                aria-label="Next video"
              >
                <ChevronRight className="w-10 h-10" />
              </button>
            </>
          )}

          {/* Modal Content */}
          <div className="max-w-6xl w-full flex flex-col items-center gap-6 max-h-[90vh]">
            {/* Video Player */}
            <div className="relative max-w-4xl w-full">
              <video
                ref={videoRef}
                src={selectedVideo.src}
                className="w-full max-h-[60vh] object-contain rounded-lg shadow-2xl"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
              />
              
              {/* Video Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-lg">
                {/* Progress Bar */}
                <div className="mb-3">
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${(currentTime / duration) * 100}%, #4b5563 ${(currentTime / duration) * 100}%, #4b5563 100%)`
                    }}
                  />
                </div>
                
                {/* Control Buttons */}
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={togglePlay}
                      className="hover:text-amber-300 transition-colors"
                    >
                      {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                    </button>
                    
                    <button
                      onClick={toggleMute}
                      className="hover:text-amber-300 transition-colors"
                    >
                      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </button>
                    
                    <span className="text-sm">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => videoRef.current?.requestFullscreen()}
                    className="hover:text-amber-300 transition-colors"
                  >
                    <Maximize className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Video Info */}
            <div className="max-w-2xl text-center text-white">
              <div className="bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-amber-300/20">
                <div className="text-amber-300 text-sm font-light tracking-widest uppercase mb-3">
                  {selectedVideo.category}
                </div>
                <h2 className="text-2xl font-serif font-light mb-4 tracking-wide text-amber-100">
                  {selectedVideo.title}
                </h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                  {selectedVideo.description}
                </p>
                
                {/* Video Counter */}
                <div className="flex items-center justify-between text-sm text-amber-200/80">
                  <span>{currentIndex + 1} of {filteredVideos.length}</span>
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