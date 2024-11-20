"use client";

import { images } from '@/lib/images';

export function useImages() {
  const getImageUrl = (key: keyof typeof images, quality = 80) => {
    const baseUrl = images[key];
    if (!baseUrl) return '';
    return `${baseUrl}?q=${quality}&auto=format`;
  };

  return {
    getImageUrl,
    images
  };
}