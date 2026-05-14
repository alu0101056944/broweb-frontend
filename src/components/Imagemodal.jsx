import { useState, useEffect } from 'react';

import { Image } from 'astro:assets';

export default function ImageModal({ listenOnId }) {
  const [currentImage, setCurrentImage] = useState(
    {
      imageUrl: null,
      description: null,
      imageWidth: null,
      imageHeight: null,
    }
  );

  useEffect(() => {
    const handleGalleryClick = (event) => {
      const playCard = event.target.closest('[data-trigger="view-image"]');
      
      if (playCard) {
        setCurrentImage({
          imageUrl: playCard.dataset.imageurl,
          description: playCard.dataset.description,
          imageWidth: playCard.dataset.imagewidth,
          imageHeight: playCard.dataset.imageheight,
        });
      }
    };

    const gallery = document.querySelectorAll(`#${listenOnId}`);
    gallery.forEach(node => node.addEventListener('click', handleGalleryClick));

    // Cleanup: remove the listener when the component is unmounted
    return () => {
      gallery.forEach(node => node.removeEventListener('click', handleGalleryClick));
    };
  }, [listenOnId]);

  if (!currentImage.imageUrl) {
    return null;
  }

  return (
    <div
        className="fixed inset-0 flex items-center justify-center z-50
          bg-black/90"
        onClick={() => setCurrentImage(
          {
            imageUrl: null,
            description: null,
            imageWidth: null,
            imageHeight: null,
          }
        )}
    >
      <div
          className="relative flex flex-col items-center"
          onClick={(e) => e.stopPropagation()}
      >
        <button
            className="absolute -top-8 -right-8 z-10 flex h-8 w-8 cursor-pointer
              items-center justify-center rounded-full border-2 border-gray-800
              bg-black text-xl text-gray-400 hover:text-white"
            onClick={() => setCurrentImage({
                imageUrl: null,
                description: null,
                imageWidth: null,
                imageHeight: null,
              }
            )}
        >
          &times;
        </button>
        <div className="overflow-hidden rounded-lg shadow-2xl">
          <img
            className="w-auto h-auto max-w-full max-h-[85vh] object-contain"
            src={currentImage.imageUrl}
            alt={currentImage.description || "Gallery image"}
            width={currentImage.imageWidth}
            height={currentImage.imageHeight}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
