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
