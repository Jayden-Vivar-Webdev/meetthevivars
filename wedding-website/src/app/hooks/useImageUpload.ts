import { useState } from 'react'
import { UploadResponse } from '../types/sanity'

export const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const uploadImage = async (
    file: File,
    title: string,
    category:string,
    description?: string,
  ): Promise<UploadResponse> => {
    setIsUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('title', title)
      formData.append('category', category)
      if (description) {
        formData.append('description', description)
      }

      const response = await fetch('/api/uploadimage', {
        method: 'POST',
        body: formData,
      })

      const result: UploadResponse = await response.json()

      if (!result.success) {
        setError(result.error || 'Upload failed')
        return result
      }

      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setIsUploading(false)
    }
  }

  const resetError = () => setError(null)

  return {
    uploadImage,
    isUploading,
    error,
    resetError,
  }
}