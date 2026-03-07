import * as FileSystem from 'expo-file-system';
import { api } from './api';

export async function convertImageToBase64(uri: string): Promise<string> {
  try {
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: 'base64',
    });
    // Add data URI prefix
    return `data:image/jpeg;base64,${base64}`;
  } catch (error) {
    console.error('Error converting image to base64:', error);
    throw new Error('Failed to process image');
  }
}

export async function uploadImage(uri: string): Promise<string> {
  try {
    const base64Image = await convertImageToBase64(uri);
    const response = await api.uploadImage(base64Image);
    
    if (response.error) {
      throw new Error(response.error);
    }
    
    return (response.data as { url: string }).url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

export async function uploadMultipleImages(uris: string[]): Promise<string[]> {
  try {
    const base64Images = await Promise.all(
      uris.map((uri) => convertImageToBase64(uri))
    );
    
    const response = await api.uploadImages(base64Images);
    
    if (response.error) {
      throw new Error(response.error);
    }
    
    return (response.data as { urls: string[] }).urls;
  } catch (error) {
    console.error('Error uploading images:', error);
    throw error;
  }
}
