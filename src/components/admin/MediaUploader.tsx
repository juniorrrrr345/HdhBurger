'use client';
import { useState } from 'react';

interface MediaUploaderProps {
  onMediaSelected: (url: string, type: 'image' | 'video') => void;
  acceptedTypes?: string;
  maxSize?: number;
  className?: string;
}

export default function MediaUploader({ 
  onMediaSelected, 
  acceptedTypes = "image/*,video/*",
  maxSize = 15,
  className = ""
}: MediaUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Vérifier la taille
    const maxBytes = maxSize * 1024 * 1024;
    if (file.size > maxBytes) {
      setError(`Fichier trop volumineux. Maximum ${maxSize}MB`);
      return;
    }

    setUploading(true);
    setError('');

    try {
      console.log('🚀 Début upload client:', {
        name: file.name,
        type: file.type,
        size: file.size
      });
      
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      console.log('📡 Réponse serveur:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Erreur serveur:', errorData);
        throw new Error(errorData.error || `Erreur HTTP ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Upload réussi:', result);
      onMediaSelected(result.url, result.type);
      
      // Reset l'input
      event.target.value = '';
      
    } catch (error) {
      console.error('❌ Erreur upload client:', error);
      setError(error instanceof Error ? error.message : 'Erreur upload inconnue');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={`media-uploader ${className}`}>
      <div className="flex items-center gap-2">
        <label className={`
          inline-flex items-center px-4 py-2 border border-gray-600 rounded-lg 
          bg-gray-700 hover:bg-gray-600 text-white cursor-pointer transition-colors
          ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
        `}>
          <input
            type="file"
            className="hidden"
            accept={acceptedTypes}
            onChange={handleFileSelect}
            disabled={uploading}
          />
          {uploading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Upload...
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Choisir un fichier
            </>
          )}
        </label>
        
        <span className="text-sm text-gray-400">
          Images & Vidéos (max {maxSize}MB)
        </span>
      </div>
      
      {error && (
        <div className="mt-2 text-sm text-red-400 bg-red-900/20 px-3 py-2 rounded border border-red-500">
          {error}
        </div>
      )}
    </div>
  );
}