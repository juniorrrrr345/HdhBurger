import { useEffect } from 'react';
import { instantContent } from '../lib/contentCache';

export const useGlobalBackground = () => {
  useEffect(() => {
    const applyBackground = () => {
      const settings = instantContent.getSettings();
      const backgroundImage = settings?.backgroundImage || '';
      const backgroundOpacity = settings?.backgroundOpacity || 20;
      const backgroundBlur = settings?.backgroundBlur || 5;

      // Configuration mosaïque : 4 répétitions de l'image
      const mosaicConfig = {
        backgroundSize: '50% 50%',
        backgroundPosition: '0% 0%, 50% 0%, 0% 50%, 50% 50%',
        backgroundRepeat: 'no-repeat, no-repeat, no-repeat, no-repeat',
        backgroundAttachment: 'fixed'
      };

      // Appliquer le background sur HTML
      const htmlElement = document.documentElement;
      if (backgroundImage) {
        // Mosaïque : 4 fois la même image
        htmlElement.style.backgroundImage = `url(${backgroundImage}), url(${backgroundImage}), url(${backgroundImage}), url(${backgroundImage})`;
        htmlElement.style.backgroundSize = mosaicConfig.backgroundSize;
        htmlElement.style.backgroundPosition = mosaicConfig.backgroundPosition;
        htmlElement.style.backgroundAttachment = mosaicConfig.backgroundAttachment;
        htmlElement.style.backgroundRepeat = mosaicConfig.backgroundRepeat;
      } else {
        htmlElement.style.backgroundImage = '';
      }
      htmlElement.style.backgroundColor = 'black';

      // Appliquer le background sur BODY
      const bodyElement = document.body;
      if (backgroundImage) {
        // Mosaïque : 4 fois la même image
        bodyElement.style.backgroundImage = `url(${backgroundImage}), url(${backgroundImage}), url(${backgroundImage}), url(${backgroundImage})`;
        bodyElement.style.backgroundSize = mosaicConfig.backgroundSize;
        bodyElement.style.backgroundPosition = mosaicConfig.backgroundPosition;
        bodyElement.style.backgroundAttachment = mosaicConfig.backgroundAttachment;
        bodyElement.style.backgroundRepeat = mosaicConfig.backgroundRepeat;
      } else {
        bodyElement.style.backgroundImage = '';
      }
      bodyElement.style.backgroundColor = 'black';

      // Mettre à jour l'overlay global s'il existe
      const overlayElement = document.querySelector('.global-overlay') as HTMLElement;
      if (overlayElement && backgroundImage) {
        overlayElement.style.backgroundColor = `rgba(0, 0, 0, ${backgroundOpacity / 100})`;
        overlayElement.style.backdropFilter = `blur(${backgroundBlur}px)`;
        overlayElement.style.display = 'block';
      } else if (overlayElement) {
        overlayElement.style.display = 'none';
      }

      // Appliquer sur tous les conteneurs principaux
      const mainContainers = document.querySelectorAll('.main-container');
      mainContainers.forEach((container) => {
        const element = container as HTMLElement;
        if (backgroundImage) {
          // Mosaïque : 4 fois la même image
          element.style.backgroundImage = `url(${backgroundImage}), url(${backgroundImage}), url(${backgroundImage}), url(${backgroundImage})`;
          element.style.backgroundSize = mosaicConfig.backgroundSize;
          element.style.backgroundPosition = mosaicConfig.backgroundPosition;
          element.style.backgroundAttachment = mosaicConfig.backgroundAttachment;
          element.style.backgroundRepeat = mosaicConfig.backgroundRepeat;
        } else {
          element.style.backgroundImage = '';
        }
        element.style.backgroundColor = 'black';
      });
    };

    // Appliquer immédiatement
    applyBackground();

    // Observer les changements du cache
    const intervalId = setInterval(() => {
      applyBackground();
    }, 1000);

    // Écouter les changements de taille de fenêtre
    const handleResize = () => {
      setTimeout(applyBackground, 100);
    };
    window.addEventListener('resize', handleResize);

    // Nettoyage
    return () => {
      clearInterval(intervalId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
};