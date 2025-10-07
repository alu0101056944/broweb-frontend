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
    <div className="modal-overlay" onClick={() => setCurrentVideoId(null)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={() => setCurrentVideoId(null)}>
          &times;
        </button>
        <div className="video-container">
          <iframe
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
