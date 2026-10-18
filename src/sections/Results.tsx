import { SmartImage } from "@/components/SmartImage";
import { VideoPlayer } from "@/components/VideoPlayer";
import { creator } from "@/data/portfolio";

export function Results() {
  return (
    <div
      className="results"
      id="results"
      aria-labelledby="results-title"
    >
      <div className="results-heading reveal">
        <p className="editorial-label">A little creativity, out in the world</p>
        <h2 id="results-title">
          Little moments.
          <br />
          <em>Real attention.</em>
        </h2>
        <p>{creator.firstName}'s Instagram, in numbers.</p>
      </div>
      <div className="results-feature">
        <figure className="results-film">
          <VideoPlayer
            clip={{
              id: "featured-armybomb",
              src: "/videos/featured-armybomb.mp4",
              poster: "/videos/posters/featured-armybomb.jpg",
              label: "Decorating my Armybomb",
              duration: 30.300635,
            }}
          />
          <figcaption>
            <span className="handwritten">
              A little sparkle, a personal touch.
            </span>
            <span>Decorating my Armybomb</span>
          </figcaption>
        </figure>
        <figure className="results-screenshot">
          <div className="results-screenshot-print">
            <SmartImage
              src="/images/ugc/instagram-insights.jpg"
              alt="Marella's Instagram Insights: 267.7K views, 39.7K content interactions, 36 messaging contacts, and 727 follows."
              loading="lazy"
            />
          </div>
          <figcaption>
            <span>
              From Marella's Instagram:{" "}
              <a
                className="instagram-link"
                href={creator.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {creator.instagramHandle}
              </a>
            </span>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
