import { VideoPlayer } from "@/components/VideoPlayer";
import { videoStories } from "@/data/videos";
import type { VideoStory } from "@/data/videos";

function durationLabel(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
}

function StorySpread({ story, index }: { story: VideoStory; index: number }) {
  return (
    <article
      className="video-spread"
      aria-label={`${story.category} video collection`}
    >
      <div className="video-description">
        <p className="video-spread-index">
          <span>{String(index + 1).padStart(2, "0")}</span> / 06
          <span className="video-category">{story.category}</span>
        </p>
        <p className="video-story-lead">{story.lead}</p>
        <p className="video-story-detail">{story.description}</p>
        <span className="video-collection-note">
          {story.clips.length === 1
            ? "one little film"
            : `${story.clips.length} little films`}
        </span>
      </div>
      <div
        className="video-collection"
        tabIndex={story.clips.length > 1 ? 0 : undefined}
        role="group"
        aria-label={`${story.category} video previews`}
      >
        {story.clips.map((clip) => (
          <figure className="video-print" key={clip.id}>
            <VideoPlayer clip={clip} />
            <figcaption>
              <span>{clip.label}</span>
              <span>{durationLabel(clip.duration)}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </article>
  );
}

export function VideoStories() {
  return (
    <section
      className="video-stories"
      id="videos"
      aria-labelledby="videos-title"
    >
      <div className="video-stories-heading">
        <p className="editorial-label">From the camera roll</p>
        <h2 id="videos-title">
          A few stories,
          <br />
          <em>in motion.</em>
        </h2>
        <p>Everyday scenes, little discoveries, and a change of perspective.</p>
      </div>
      {videoStories.map((story, index) => (
        <StorySpread key={story.id} story={story} index={index} />
      ))}
    </section>
  );
}
