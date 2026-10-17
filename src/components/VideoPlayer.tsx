import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import type { VideoClip } from "@/data/videos";

export function VideoPlayer({ clip }: { clip: VideoClip }) {
  const player = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const video = player.current;
    if (!video || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) video.pause();
      },
      { threshold: 0.15 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="story-player">
      <div className="video-preview">
        <video
          ref={player}
          controls={started}
          playsInline
          preload="none"
          poster={clip.poster}
          src={clip.src}
          aria-label={clip.label}
          onPlay={(event) => {
            setStarted(true);
            const current = event.currentTarget;
            document
              .querySelectorAll<HTMLVideoElement>("video")
              .forEach((video) => {
                if (video !== current) video.pause();
              });
          }}
          onWaiting={() => setWaiting(true)}
          onPlaying={() => setWaiting(false)}
          onCanPlay={() => setWaiting(false)}
          onPause={() => setWaiting(false)}
          onError={() => {
            setFailed(true);
            setWaiting(false);
          }}
        >
          Your browser cannot play this video.{" "}
          <a href={clip.src}>Open the clip</a>.
        </video>
        {!started && !failed && (
          <button
            type="button"
            className="video-play"
            aria-label={`Play video: ${clip.label}`}
            onClick={() => {
              setStarted(true);
              player.current?.play().catch(() => {
                setFailed(true);
                setWaiting(false);
              });
            }}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m8 4 13 8-13 8z" fill="currentColor" />
            </svg>
          </button>
        )}
      </div>
      {waiting && !failed && (
        <p className="video-status" role="status">
          Buffering video…
        </p>
      )}
      {failed && (
        <div className="video-error" role="alert">
          <p>This clip couldn't load.</p>
          <div>
            <Button
              variant="outline"
              onClick={() => {
                setFailed(false);
                setStarted(false);
                if (player.current) {
                  player.current.preload = "metadata";
                  player.current.load();
                }
              }}
            >
              Retry clip
            </Button>
            <a href={clip.src} download>
              Download clip
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
