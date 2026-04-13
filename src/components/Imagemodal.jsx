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
        className="fixed inset-0 grid place-items-center z-50
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
          className="relative w-[90vw] max-w-4xl p-4 rounded-lg shadow-xl
            bg-black"
          onClick={(e) => e.stopPropagation()}
      >
        <button
            className="absolute top-[-10px] right-[-10px] border-2
                rounded-full w-6 h-6 text-sm cursor-pointer
                bg-black text-gray-600 border-gray-800"
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
        <div className="">
          <img
            className="w-full h-full object-contain"
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
