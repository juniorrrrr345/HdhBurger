'use client';

import { useRef, useState } from 'react';

interface MediaPlayerProps {
  media: string;
  productName: string;
}

export default function MediaPlayer({ media, productName }: MediaPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const isVideo = media.endsWith('.mp4') || media.endsWith('.mov');

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const skipVideo = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  return (
    <div className="relative mx-5 mb-5 rounded-2xl overflow-hidden bg-black aspect-video">
      {isVideo ? (
        <>
          <video
            ref={videoRef}
            className="w-full h-full object-cover cursor-pointer"
            muted
            onEnded={handleVideoEnd}
            onClick={togglePlay}
          >
            <source src={media} type="video/mp4" />
          </video>
          
          {/* Contrôles vidéo */}
          <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-5 items-center">
            <button
              onClick={() => skipVideo(-10)}
              className="bg-white/80 hover:bg-white/90 text-gray-800 rounded-full w-12 h-12 flex items-center justify-center font-bold transition-all"
            >
              ⏪
            </button>
            
            <button
              onClick={togglePlay}
              className="bg-white/80 hover:bg-white/90 text-gray-800 rounded-full w-15 h-15 flex items-center justify-center text-xl font-bold transition-all"
            >
              {isPlaying ? '⏸' : '▶'}
            </button>
            
            <button
              onClick={() => skipVideo(10)}
              className="bg-white/80 hover:bg-white/90 text-gray-800 rounded-full w-12 h-12 flex items-center justify-center font-bold transition-all"
            >
              ⏩
            </button>
          </div>
        </>
      ) : (
        <img
          src={media}
          alt={productName}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
}