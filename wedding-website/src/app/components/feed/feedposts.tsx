'use client'
import { useState, useRef } from 'react';
import { Crown, Heart, MessageCircle, Send, X, Plus, Camera, Image as ImageIcon, Trash2, Edit3 } from 'lucide-react';
import React from 'react';
import { usePostUpload } from '@/app/hooks/usePostUpload';


export const dynamic = "force-dynamic"; 



interface Post {
  id: string;
  caption: string;
  images: File[];
  imageUrls: string[]; // Add this for display purposes
  timestamp: string;
  likes: number;
  comments: Comment[];
  author: string;
}

interface Comment {
  id: string;
  text: string;
  author: string;
  timestamp: string;
}
interface WeddingFeedProps {
  initialPosts: Post[];
}

export default function WeddingFeed({ initialPosts }: WeddingFeedProps) {
  const {uploadPost, error, isUploading, resetError} = usePostUpload()
  const [posts, setPosts] = useState<Post[]>(initialPosts || []);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [newPost, setNewPost] = useState({
    caption: '',
    images: [] as File[],
    author: ''
  });
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [newComment, setNewComment] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
  
    const newFiles = Array.from(files);
    setNewPost((prev) => ({
      ...prev,
      images: [...prev.images, ...newFiles],
    }));
  };
  

  const removeImage = (index: number) => {
    setNewPost(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const createPost = async() => {
    if (!newPost.caption.trim() && newPost.images.length === 0) return;
    if (!newPost.author.trim()) return;

    // Create object URLs for display (keep original files for upload)
    const imageUrls = newPost.images.map(file => URL.createObjectURL(file));

    const post: Post = {
      id: `${Date.now().toString()}${newPost.author}`,
      caption: newPost.caption,
      images: newPost.images, // Keep original File objects for upload
      imageUrls: imageUrls,   // Add URLs for display
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: [],
      author: newPost.author
    };

    console.log(post)

    //Create form data to submit - uses the original File objects
    const result = await uploadPost( 
        post.id,
        post.caption,
        post.images, // These are still File objects
        post.timestamp,
        post.likes,
        [],
        post.author,
    )

    setPosts([post, ...posts]);
    setNewPost({ caption: '', images: [], author: '' });
    setIsCreatingPost(false);
  };

  const cancelPost = () => {
    setIsCreatingPost(false);
    setNewPost({ caption: '', images: [], author: '' });
  };

  const likePost = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  const addComment = (postId: string) => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      text: newComment,
      author: 'Guest', // You could add a separate input for comment author names
      timestamp: new Date().toISOString()
    };

    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, comments: [...post.comments, comment] }
        : post
    ));
    setNewComment('');
  };

  const deletePost = (postId: string) => {
    // Clean up object URLs to prevent memory leaks
    const postToDelete = posts.find(post => post.id === postId);
    if (postToDelete?.imageUrls) {
      postToDelete.imageUrls.forEach(url => URL.revokeObjectURL(url));
    }
    setPosts(posts.filter(post => post.id !== postId));
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - postTime.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'now';
    if (diffInHours < 24) return `${diffInHours}h`;
    return `${Math.floor(diffInHours / 24)}d`;
  };

  return (
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
            Wedding Updates
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light italic">
            &ldquo;Condividi i momenti speciali del nostro viaggio&rdquo;
          </p>
          <p className="text-sm text-gray-500 mt-2 tracking-wide">
            Share the special moments of our journey
          </p>
          <div className="mt-6 text-amber-600 font-medium">
            {'Jayden & Annalyse'} • {'September 15, 2024'}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-2xl">
        {/* Create Post Button */}
        <div className="mb-8">
          <button
            onClick={() => setIsCreatingPost(true)}
            className="w-full bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 border border-gray-100"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full flex items-center justify-center">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-gray-500">Share an update about the wedding...</p>
              </div>
              <Plus className="w-6 h-6 text-amber-500" />
            </div>
          </button>
        </div>

        {/* Create Post Modal */}
        {isCreatingPost && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-serif text-gray-800">Create Post</h2>
                  <button
                    onClick={cancelPost}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                {/* Author Name Input */}
                <div className="mb-4">
                  <input
                    type="text"
                    value={newPost.author}
                    onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
                    placeholder="Your name..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-800"
                  />
                </div>

                {/* Profile Header */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-serif text-sm">
                      {newPost.author ? newPost.author.charAt(0).toUpperCase() : '?'}
                    </span>
                  </div>
                  <span className="font-medium text-gray-800">{newPost.author || 'Your Name'}</span>
                </div>

                {/* Caption Input */}
                <textarea
                  value={newPost.caption}
                  onChange={(e) => setNewPost({ ...newPost, caption: e.target.value })}
                  placeholder="What's happening with the wedding?"
                  className="w-full p-4 border-none resize-none focus:outline-none text-gray-800 placeholder-gray-400"
                  rows={4}
                />

                {/* Image Upload */}
                <div className="border-t border-gray-100 pt-4">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  
                  {newPost.images.length > 0 && (
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        {newPost.images.map((file: File, index: number) => {
                        const previewUrl = typeof window !== 'undefined' ? URL.createObjectURL(file) : '';
                        return (
                            <div key={index} className="relative">
                            <img
                                src={previewUrl}
                                alt={`Upload ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg"
                            />
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 hover:bg-black/70 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                            </div>
                        );
                        })}
                    </div>
                    )}

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center space-x-2 text-amber-600 hover:text-amber-700 transition-colors"
                    >
                      <Camera className="w-5 h-5" />
                      <span>Add Photos</span>
                    </button>

                    <button
                      onClick={createPost}
                      disabled={!newPost.caption.trim() && newPost.images.length === 0 || !newPost.author.trim()}
                      className="bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 text-white px-6 py-2 rounded-full font-medium transition-colors duration-300"
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Posts Feed */}
        <div className="space-y-8">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <Crown className="w-16 h-16 text-amber-400 mx-auto mb-6" />
              <h3 className="text-2xl font-serif text-gray-600 mb-4">No posts yet</h3>
              <p className="text-gray-500 mb-6">Share your first wedding update to get started!</p>
              <button
                onClick={() => setIsCreatingPost(true)}
                className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-full font-medium transition-colors duration-300 flex items-center space-x-2 mx-auto"
              >
                <Plus className="w-5 h-5" />
                <span>Create First Post</span>
              </button>
            </div>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
              >
                {/* Post Header */}
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-serif text-sm">
                        {post.author.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{post.author}</p>
                      <p className="text-sm text-gray-500">{formatTimeAgo(post.timestamp)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => deletePost(post.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Post Images - Now using imageUrls for display */}
                {post.imageUrls && post.imageUrls.length > 0 && (
                  <div className={`${post.imageUrls.length === 1 ? '' : 'grid grid-cols-2 gap-1'}`}>
                    {post.imageUrls.map((imageUrl, index) => (
                      <img
                        key={index}
                        src={imageUrl}
                        alt={`Post image ${index + 1}`}
                        className={`w-full object-cover ${post.imageUrls.length === 1 ? 'max-h-96' : 'h-48'}`}
                      />
                    ))}
                  </div>
                )}

                {/* Post Actions */}
                <div className="p-4">
                  <div className="flex items-center space-x-4 mb-3">
                    
                  </div>

                  {/* Post Caption */}
                  {post.caption && (
                    <div className="mb-3">
                      <p className="text-gray-800">
                        <span className="font-medium">{post.author} </span>
                        {post.caption}
                      </p>
                    </div>
                  )}

                  {/* Comments */}
                  {selectedPost?.id === post.id && (
                    <div className="border-t border-gray-100 pt-3 mt-3">
                      {post.comments.map((comment) => (
                        <div key={comment.id} className="mb-2">
                          <p className="text-sm text-gray-800">
                            <span className="font-medium">{comment.author} </span>
                            {comment.text}
                          </p>
                        </div>
                      ))}
                      
                      {/* Add Comment */}
                      <div className="flex items-center space-x-2 mt-3">
                        <input
                          type="text"
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Add a comment..."
                          className="flex-1 text-sm border-none focus:outline-none bg-gray-50 rounded-full px-4 py-2"
                          onKeyPress={(e) => e.key === 'Enter' && addComment(post.id)}
                        />
                        <button
                          onClick={() => addComment(post.id)}
                          disabled={!newComment.trim()}
                          className="text-amber-600 hover:text-amber-700 disabled:text-gray-400 transition-colors"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-center text-amber-600">
            <Crown className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">{'Jayden & Annalyse'}</span>
          </div>
          <p className="text-gray-500 text-sm mt-2">
            Sharing our journey to forever ♥
          </p>
        </div>
      </div>
    </div>
  );
}