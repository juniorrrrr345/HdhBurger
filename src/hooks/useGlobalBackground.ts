import { useEffect } from 'react';
import { instantContent } from '../lib/contentCache';

export const useGlobalBackground = () => {
  useEffect(() => {
    const applyBackground = () => {
      const settings = instantContent.getSettings();
      const backgroundImage = settings?.backgroundImage || '';
      const backgroundOpacity = settings?.backgroundOpacity || 20;
      const backgroundBlur = settings?.backgroundBlur || 5;

      // Appliquer le background sur HTML
      const htmlElement = document.documentElement;
      if (backgroundImage) {
        htmlElement.style.backgroundImage = `url(${backgroundImage})`;
        htmlElement.style.backgroundSize = 'cover';
        htmlElement.style.backgroundPosition = 'center';
        htmlElement.style.backgroundAttachment = 'fixed';
        htmlElement.style.backgroundRepeat = 'no-repeat';
      } else {
        htmlElement.style.backgroundImage = '';
      }
      htmlElement.style.backgroundColor = 'black';

      // Appliquer le background sur BODY
      const bodyElement = document.body;
      if (backgroundImage) {
        bodyElement.style.backgroundImage = `url(${backgroundImage})`;
        bodyElement.style.backgroundSize = 'cover';
        bodyElement.style.backgroundPosition = 'center';
        bodyElement.style.backgroundAttachment = 'fixed';
        bodyElement.style.backgroundRepeat = 'no-repeat';
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
          element.style.backgroundImage = `url(${backgroundImage})`;
          element.style.backgroundSize = 'cover';
          element.style.backgroundPosition = 'center';
          element.style.backgroundAttachment = 'fixed';
          element.style.backgroundRepeat = 'no-repeat';
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