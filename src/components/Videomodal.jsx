import { useState, useEffect } from 'react';

export default function VideoModal({ listenOnId }) {
  const [currentVideo, setCurrentVideo] = useState(
    { id: null, provider: 'youtube' }
  );

  useEffect(() => {
    const handleGalleryClick = (event) => {
      const playCard = event.target.closest('[data-trigger="play-video"]');
      
      if (playCard) {
        const videoId = playCard.dataset.videoid;
        const provider = playCard.dataset.provider || 'youtube';

        setCurrentVideo({ id: videoId, provider });
      }
    };

    const gallery = document.querySelectorAll(`#${listenOnId}`)
      .forEach(node => node.addEventListener('click', handleGalleryClick));

    // Cleanup: remove the listener when the component is unmounted
    return () => {
      gallery.forEach(node => node.removeEventListener('click', handleGalleryClick));
    };
  }, [listenOnId]);

  if (!currentVideo.id) {
    return null;
  }

  const videoSrc = currentVideo.provider === 'vimeo'
    ? `https://player.vimeo.com/video/${currentVideo.id}`
    : `https://www.youtube.com/embed/${currentVideo.id}?autoplay=1`;

  return (
    <div
        class="fixed inset-0 grid place-items-center z-50
          bg-black/90"
        onClick={() => setCurrentVideo({ id: null, provider: 'youtube' })}
    >
      <div
          class="relative w-[90vw] max-w-4xl p-4 rounded-lg shadow-xl
            bg-black"
          onClick={(e) => e.stopPropagation()}
      >
        <button
            class="absolute top-[-10px] right-[-10px] border-2
                rounded-full w-6 h-6 text-sm cursor-pointer
                bg-black text-gray-600 border-gray-800"
            onClick={() => setCurrentVideo({ id: null, provider: 'youtube' })}
        >
          &times;
        </button>
        <div class="aspect-video">
          <iframe
            class="w-full h-full"
            src={videoSrc}
            title="YouTube video player"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
