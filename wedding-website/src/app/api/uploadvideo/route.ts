import { NextRequest, NextResponse } from 'next/server'
import client from '@/lib/client'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const title = formData.get('title') as string
    const category = formData.get('category') as string
    const description = formData.get('description') as string

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      )
    }

    if (!title) {
      return NextResponse.json(
        { success: false, error: 'Title is required' },
        { status: 400 }
      )
    }

    if (!category) {
      return NextResponse.json(
        { success: false, error: 'Category is required' },
        { status: 400 }
      )
    }

    // Validate file type
    if (!file.type.startsWith('video/')) {
      return NextResponse.json(
        { success: false, error: 'File must be a video' },
        { status: 400 }
      )
    }

    // Validate file size (100MB limit for videos)
    const maxSize = 100 * 1024 * 1024 // 100MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: 'Video file size must be less than 100MB' },
        { status: 400 }
      )
    }

    // Validate category values
    const validCategories = ['reception', 'ceremony', 'preparation']
    if (!validCategories.includes(category)) {
      return NextResponse.json(
        { success: false, error: 'Invalid category. Must be reception, ceremony, or preparation' },
        { status: 400 }
      )
    }

    // Convert file to buffer
    const buffer = await file.arrayBuffer()
    const fileBuffer = Buffer.from(buffer)

    // Upload video to Sanity
    const videoAsset = await client.assets.upload('file', fileBuffer, {
      filename: file.name,
      contentType: file.type,
    })

    // Create the video document
    const document = await client.create({
      _type: 'videoAsset',
      title: title.trim(),
      description: description?.trim() || undefined,
      category: category,
      video: {
        _type: 'file',
        asset: {
          _type: 'reference',
          _ref: videoAsset._id,
        },
      },
    })

    return NextResponse.json({
      success: true,
      data: document,
    })

  } catch (error) {
    console.error('Video upload error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Video upload failed' 
      },
      { status: 500 }
    )
  }
}