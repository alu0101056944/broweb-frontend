import { useState, useEffect } from 'react';

export default function VideoModal({ listenOnId }) {
  const [currentVideoId, setCurrentVideoId] = useState(null);

  useEffect(() => {
    const handleGalleryClick = (event) => {
      const playButton = event.target.closest('[data-trigger="play-video"]');
      
      if (playButton) {
        const videoId = playButton.dataset.videoid;
        setCurrentVideoId(videoId);
      }
    };

    const gallery = document.getElementById(listenOnId);
    gallery.addEventListener('click', handleGalleryClick);

    // Cleanup: remove the listener when the component is unmounted
    return () => {
      gallery.removeEventListener('click', handleGalleryClick);
    };
  }, [listenOnId]);

  if (!currentVideoId) {
    return null;
  }

  return (
    <div
        class="fixed inset-0 bg-black/80 grid place-items-center z-50"
        onClick={() => setCurrentVideoId(null)}
    >
      <div
          class="relative bg-white w-[90vw] max-w-4xl p-4 rounded-lg shadow-xl"
          onClick={(e) => e.stopPropagation()}
      >
        <button
            class="absolute top-[-15px] right-[-15px] bg-white border-2
                border-gray-300 rounded-full w-8 h-8 text-xl cursor-pointer"
            onClick={() => setCurrentVideoId(null)}
        >
          &times;
        </button>
        <div class="aspect-video">
          <iframe
            class="w-full h-full"
            src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1`}
            title="YouTube video player"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}

// TODO: Replace className with style tailwind properties
