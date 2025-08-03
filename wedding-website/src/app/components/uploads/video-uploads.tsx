// Updated WeddingVideoUploadForm component
import { useState } from 'react';
import { Upload, Video, FileText, Crown, Heart, Camera, CheckCircle, AlertCircle, Play } from 'lucide-react';
import { useVideoUpload } from '@/app/hooks/useVideoUpload';

export default function WeddingVideoUploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { uploadVideo, isUploading, error, resetError } = useVideoUpload();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title.trim() || !category) return;
    
    resetError();
    
    const result = await uploadVideo(file, title, description, category);
    
    if (result.success) {
      // Reset form
      setFile(null);
      setTitle('');
      setCategory('');
      setDescription('');
      setShowSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type.startsWith('video/')) {
        setFile(droppedFile);
        resetError();
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      resetError();
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 py-10 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 bg-green-500/10 border border-green-500/20 rounded-lg p-4 flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <p className="text-green-400 text-sm">Video memory uploaded successfully!</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="w-12 h-12 mx-auto mb-4 border-2 border-amber-300 rounded-full flex items-center justify-center">
            <Crown className="w-6 h-6 text-amber-300" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white mb-2 font-serif">
            Share Your Video Memories
          </h1>
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-amber-300"></div>
            <div className="mx-4 text-amber-300 text-xs tracking-[0.3em] font-light">
              JAYDEN & ANNALYSE
            </div>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-amber-300"></div>
          </div>
          <p className="text-amber-100/80 text-sm sm:text-base font-light">
            Upload your favorite video moments from our special day
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          <div className="bg-black/20 backdrop-blur-md rounded-xl p-6 sm:p-8 border border-amber-300/20 shadow-2xl">
            
            {/* File Upload Area */}
            <div className="mb-6">
              <label className="block text-amber-200 text-sm font-medium mb-3 flex items-center">
                <Video className="w-4 h-4 mr-2" />
                Upload Video
              </label>
              <div
                className={`relative border-2 border-dashed rounded-lg p-6 sm:p-8 text-center transition-all duration-300 cursor-pointer ${
                  dragActive
                    ? 'border-amber-300 bg-amber-300/5'
                    : file
                    ? 'border-green-400 bg-green-400/5'
                    : 'border-amber-300/40 hover:border-amber-300/60 hover:bg-amber-300/5'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                <div className="flex flex-col items-center space-y-3">
                  {file ? (
                    <>
                      <div className="w-12 h-12 bg-green-400/10 rounded-full flex items-center justify-center">
                        <Play className="w-6 h-6 text-green-400 ml-1" />
                      </div>
                      <div className="text-center">
                        <p className="text-green-400 font-medium text-sm sm:text-base">
                          {file.name}
                        </p>
                        <p className="text-green-300/80 text-xs mt-1">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                      <p className="text-amber-100/60 text-xs">
                        Click to change or drag a new file
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="w-12 h-12 bg-amber-300/10 rounded-full flex items-center justify-center">
                        <Upload className="w-6 h-6 text-amber-300" />
                      </div>
                      <div>
                        <p className="text-amber-100 font-medium text-sm sm:text-base mb-1">
                          Drop your video here, or click to browse
                        </p>
                        <p className="text-amber-100/60 text-xs">
                          MP4, MOV, AVI, WebM up to 100MB
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Title Input */}
            <div className="mb-6">
              <label className="block text-amber-200 text-sm font-medium mb-3 flex items-center">
                <Heart className="w-4 h-4 mr-2" />
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Give your video memory a beautiful title..."
                className="w-full bg-black/30 border border-amber-300/30 rounded-lg px-4 py-3 text-white placeholder-amber-100/50 focus:outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-300/20 transition-all duration-300 text-sm sm:text-base"
                required
              />
            </div>

            {/* Category Select */}
            <div className="mb-6 relative">
              <label className="block text-amber-200 text-sm font-medium mb-3 flex items-center">
                <Camera className="w-4 h-4 mr-2" />
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-black/30 border border-amber-300/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-300/20 transition-all duration-300 text-sm sm:text-base appearance-none cursor-pointer"
                required
              >
                <option value="" disabled className="bg-slate-800">
                  Select a category...
                </option>
                <option value="reception" className="bg-slate-800">Reception</option>
                <option value="ceremony" className="bg-slate-800">Ceremony</option>
                <option value="preparation" className="bg-slate-800">Preparation</option>
              </select>
              {/* Custom dropdown arrow */}
              <div className="absolute right-3 top-11 pointer-events-none">
                <svg className="w-4 h-4 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Description Textarea */}
            <div className="mb-8">
              <label className="block text-amber-200 text-sm font-medium mb-3 flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                Description <span className="text-amber-100/50 font-normal ml-1">(optional)</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Share the story behind this special video moment..."
                rows={4}
                className="w-full bg-black/30 border border-amber-300/30 rounded-lg px-4 py-3 text-white placeholder-amber-100/50 focus:outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-300/20 transition-all duration-300 resize-none text-sm sm:text-base"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={!file || !title.trim() || !category || isUploading}
              className={`w-full py-3 sm:py-4 px-6 rounded-lg font-medium tracking-wide transition-all duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base ${
                !file || !title.trim() || !category
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : isUploading
                  ? 'bg-amber-600 text-white cursor-not-allowed'
                  : 'bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white hover:scale-[1.02] hover:shadow-xl'
              }`}
            >
              {isUploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Uploading Video...</span>
                </>
              ) : (
                <>
                  <Video className="w-4 h-4" />
                  <span>Share Video Memory</span>
                </>
              )}
            </button>
          </div>

          {/* Upload Progress */}
          {isUploading && (
            <div className="bg-black/20 backdrop-blur-md rounded-xl p-4 border border-amber-300/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-amber-200 text-sm">Uploading...</span>
                <span className="text-amber-200 text-sm">Processing</span>
              </div>
              <div className="w-full bg-black/30 rounded-full h-2">
                <div className="bg-gradient-to-r from-amber-600 to-amber-400 h-2 rounded-full animate-pulse"></div>
              </div>
              <p className="text-amber-100/60 text-xs mt-2 text-center">
                Large video files may take a few moments to upload
              </p>
            </div>
          )}

          {/* Footer Message */}
          <div className="text-center">
            <p className="text-amber-100/60 text-xs sm:text-sm font-light italic">
              &ldquo;Every video captures the joy of our celebration&rdquo; - Grazie per condividere i nostri momenti speciali
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}