// utils/uploadImage.ts
export async function uploadImageToCloudinary(imageDataUrl: string, index: number): Promise<void> {
  const cloudName = 'dojvahtu9';
  const uploadPreset = 'webcam_capture';

  const formData = new FormData();
  formData.append('file', imageDataUrl);
  formData.append('upload_preset', uploadPreset);

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    console.log(`Uploaded image ${index + 1}:`, result.secure_url);
  } catch (error) {
    console.error(`Upload ${index + 1} failed:`, error);
  }
}
