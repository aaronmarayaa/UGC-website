import { About } from "@/sections/About";
import { Results } from "@/sections/Results";

export function CreatorStory() {
  return (
    <section
      className="creator-story section-shell"
      aria-label="Marella's story and results"
    >
      <div className="about-top-lace" aria-hidden="true">
        <img src="/images/about/blue-lace.png" alt="" loading="lazy" />
      </div>
      <div className="story-materials" aria-hidden="true">
        <img
          className="story-floral-paper"
          src="/images/ugc/floral-paper.png"
          alt=""
          loading="lazy"
        />
        <img
          className="story-pink-paper"
          src="/images/ugc/pink-paper.png"
          alt=""
          loading="lazy"
        />
        <img
          className="story-dreamer-paper"
          src="/images/about/dreamer-paper.png"
          alt=""
          loading="lazy"
        />
      </div>
      <div className="story-cutouts" aria-hidden="true">
        <img
          className="story-blossoms"
          src="/images/ugc/white-blossoms.png"
          alt=""
          loading="lazy"
        />
        <img
          className="story-hibiscus"
          src="/images/about/hibiscus.png"
          alt=""
          loading="lazy"
        />
        <img
          className="story-butterfly"
          src="/images/ugc/golden-butterfly.png"
          alt=""
          loading="lazy"
        />
        <img
          className="story-painted-swirl"
          src="/images/about/painted-swirl.png"
          alt=""
          loading="lazy"
        />
      </div>
      <header className="story-heading reveal">
        <p className="editorial-label">Meet Marella · A peek behind the posts</p>
        <h2>
          Behind <em>the posts.</em>
        </h2>
      </header>
      <div className="story-columns">
        <About />
        <Results />
      </div>
    </section>
  );
}
