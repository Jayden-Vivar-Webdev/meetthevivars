// Updated WeddingUploadForm component
import { useState } from 'react';
import { Upload, Image, FileText, Crown, Heart, Camera, CheckCircle, AlertCircle } from 'lucide-react';
import { useImageUpload } from '@/app/hooks/useImageUpload';

export default function WeddingUploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { uploadImage, isUploading, error, resetError } = useImageUpload();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title.trim()) return;
    
    resetError();
    
    const result = await uploadImage(file, title, description, category);
    
    if (result.success) {
      // Reset form
      setFile(null);
      setTitle('');
      setCategory('')
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
      if (droppedFile.type.startsWith('image/')) {
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

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 py-10 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 bg-green-500/10 border border-green-500/20 rounded-lg p-4 flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <p className="text-green-400 text-sm">Memory uploaded successfully!</p>
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
            Share Your Memories
          </h1>
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-amber-300"></div>
            <div className="mx-4 text-amber-300 text-xs tracking-[0.3em] font-light">
              JAYDEN & ANNALYSE
            </div>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-amber-300"></div>
          </div>
          <p className="text-amber-100/80 text-sm sm:text-base font-light">
            Upload your favorite moments from our special day
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-black/20 backdrop-blur-md rounded-xl p-6 sm:p-8 border border-amber-300/20 shadow-2xl">
            
            {/* File Upload Area */}
            <div className="mb-6">
              <label className="block text-amber-200 text-sm font-medium mb-3 flex items-center">
                <Camera className="w-4 h-4 mr-2" />
                Upload Photo
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
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                <div className="flex flex-col items-center space-y-3">
                  {file ? (
                    <>
                      <div className="w-12 h-12 bg-green-400/10 rounded-full flex items-center justify-center">
                        <Image className="w-6 h-6 text-green-400" />
                      </div>
                      <p className="text-green-400 font-medium text-sm sm:text-base">
                        {file.name}
                      </p>
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
                          Drop your image here, or click to browse
                        </p>
                        <p className="text-amber-100/60 text-xs">
                          JPG, PNG, GIF up to 10MB
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
                placeholder="Give your memory a beautiful title..."
                className="w-full bg-black/30 border border-amber-300/30 rounded-lg px-4 py-3 text-white placeholder-amber-100/50 focus:outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-300/20 transition-all duration-300 text-sm sm:text-base"
                required
              />
            </div>
            <div className="mb-6">
            <label className="block text-amber-200 text-sm font-medium mb-3 flex items-center">
              <Heart className="w-4 h-4 mr-2" />
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-black/30 border border-amber-300/30 rounded-lg px-4 py-3 text-white placeholder-amber-100/50 focus:outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-300/20 transition-all duration-300 text-sm sm:text-base appearance-none"
              required
            >
              <option value="" disabled>
                Select a category...
              </option>
              <option value="reception">Reception</option>
              <option value="ceremony">Ceremony</option>
              <option value="preparation">Preparation</option>
            </select>
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
                placeholder="Share the story behind this special moment..."
                rows={4}
                required
                className="w-full bg-black/30 border border-amber-300/30 rounded-lg px-4 py-3 text-white placeholder-amber-100/50 focus:outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-300/20 transition-all duration-300 resize-none text-sm sm:text-base"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!file || !title.trim() || isUploading}
              className={`w-full py-3 sm:py-4 px-6 rounded-lg font-medium tracking-wide transition-all duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base ${
                !file || !title.trim()
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : isUploading
                  ? 'bg-amber-600 text-white cursor-not-allowed'
                  : 'bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white hover:scale-[1.02] hover:shadow-xl'
              }`}
            >
              {isUploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  <span>Share Memory</span>
                </>
              )}
            </button>
          </div>

          {/* Footer Message */}
          <div className="text-center">
            <p className="text-amber-100/60 text-xs sm:text-sm font-light italic">
              &ldquo;Every picture tells a story of love&rdquo; - Grazie per condividere i nostri momenti speciali
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}