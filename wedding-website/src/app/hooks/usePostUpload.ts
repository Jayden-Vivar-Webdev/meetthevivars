import { useState } from 'react'
import { UploadResponse } from '../types/sanity'

export const usePostUpload = () => {
    const [isUploading, setIsUploading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const uploadPost = async(
        id: string,
        caption: string,
        images: File[],
        timestamp: string,
        likes: number,
        comments: Comment[],
        author: string
    ): Promise<UploadResponse> => {
        setIsUploading(true)
        setError(null)
        try{
            const formData = new FormData()
            formData.append('id', id)
            formData.append('caption', caption)
            formData.append('timestamp', timestamp)
            formData.append('likes', likes.toString())
            formData.append('author', author)
            comments.forEach((comment) => {
                formData.append('comments', JSON.stringify(comment));
              });
              
            images.forEach((image) => {formData.append('images', image)});
            //Submit new form data to api
            const response = await fetch('/api/uploadpost', {
                method: 'POST',
                body: formData
            })

            const result = await response.json()

            if(!result.ok){
                setError(result.error || 'Post Failed')
                return result
            }
            return result
        }
        catch(err){
            const errorMsg = err instanceof Error ? err.message : 'Post Failed'
            setError(errorMsg)
            return{ success: false, error: errorMsg}
        }finally{
            setIsUploading(false)
        }
    }

    const resetError = () => setError(null)

    return {
        uploadPost,
        error,
        isUploading,
        resetError
    }
}