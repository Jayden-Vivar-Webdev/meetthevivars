import { useState } from 'react'
import { UploadResponse } from '../types/sanity'

export const useVideoUpload = () => {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const uploadVideo = async (
    file: File,
    title: string,
    description: string,
    category: string,
  ): Promise<UploadResponse> => {
    setIsUploading(true)
    setError(null)

    try {
      // Validate file type
      if (!file.type.startsWith('video/')) {
        const errorMessage = 'Please select a valid video file'
        setError(errorMessage)
        return { success: false, error: errorMessage }
      }

      // Validate file size (100MB limit)
      const maxSize = 100 * 1024 * 1024 // 100MB in bytes
      if (file.size > maxSize) {
        const errorMessage = 'Video file size must be less than 100MB'
        setError(errorMessage)
        return { success: false, error: errorMessage }
      }

      const formData = new FormData()
      formData.append('file', file)
      formData.append('title', title)
      formData.append('category', category)
      if (description) {
        formData.append('description', description)
      }

      const response = await fetch('/api/uploadvideo', {
        method: 'POST',
        body: formData,
      })

      const result: UploadResponse = await response.json()

      if (!result.success) {
        setError(result.error || 'Video upload failed')
        return result
      }

      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Video upload failed'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setIsUploading(false)
    }
  }

  const resetError = () => setError(null)

  return {
    uploadVideo,
    isUploading,
    error,
    resetError,
  }
}