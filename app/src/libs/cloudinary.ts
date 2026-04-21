export function getCloudinaryConfig(): {
  cloudName: string
  uploadPreset: string
  isConfigured: boolean
} {
  const cloudName = process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME?.trim() ?? ''
  const uploadPreset = process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET?.trim() ?? ''
  return {
    cloudName,
    uploadPreset,
    isConfigured: Boolean(cloudName && uploadPreset),
  }
}

type CloudinaryUploadResponse = {
  secure_url?: string
  url?: string
  error?: { message?: string }
}

export async function uploadImageToCloudinary(localUri: string, mimeType: string): Promise<string> {
  const { cloudName, uploadPreset, isConfigured } = getCloudinaryConfig()
  if (!isConfigured) {
    throw new Error(
      'Cloudinary is not configured. Set EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME and EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET (same values as the web app).',
    )
  }

  const ext = mimeType.includes('png') ? 'png' : mimeType.includes('webp') ? 'webp' : 'jpg'
  const name = `upload.${ext}`

  const form = new FormData()
  form.append('file', { uri: localUri, name, type: mimeType } as unknown as Blob)
  form.append('upload_preset', uploadPreset)

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: form,
  })

  const payload = (await res.json()) as CloudinaryUploadResponse
  if (!res.ok) {
    throw new Error(payload.error?.message ?? 'Upload failed')
  }
  const url = payload.secure_url ?? payload.url
  if (!url) {
    throw new Error('Upload failed: missing URL in response')
  }
  return url
}
