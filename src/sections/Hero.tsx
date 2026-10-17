import { useState } from "react";
import { SmartImage } from "@/components/SmartImage";
import { CutoutText, Sticker } from "@/components/Scrapbook";

export function Hero() {
  const [scene, setScene] = useState<"sky" | "sea">("sky");
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="editorial-label">A visual journal, made personal.</p>
        <h1 id="hero-title" className="scrapbook-title">
          <span className="sr-only">A little world, by Marella.</span>
          <span className="hero-pretitle" aria-hidden="true">
            A little world, by
          </span>
          <CutoutText text="Marella" />
          <span className="hero-surname" aria-hidden="true">
            Almazar
          </span>
        </h1>
        <p className="hero-description">
          A personal scrapbook of moments, moods,
          <br className="desktop-break" /> and things worth keeping.
        </p>
        <a className="primary-link" href="#moodboard">
          Step into my moodboard <span aria-hidden="true">↗</span>
        </a>
        <Sticker name="ticket" className="hero-ticket" />
      </div>
      <div className="hero-art">
        <Sticker name="ribbon" className="hero-ribbon" />
        <Sticker name="fabric-star" className="hero-star" />
        <div className="portrait-scene" data-scene={scene}>
          <SmartImage
            className="scene-photo"
            src="/images/daylight.jpg"
            alt=""
            fetchPriority="high"
          />
          <SmartImage
            className={`scene-photo sea-scene ${scene === "sea" ? "scene-visible" : ""}`}
            src="/images/sea.jpg"
            alt=""
          />
          <span className="scene-word" aria-hidden="true">
            {scene === "sky" ? "daydream" : "breathe"}
          </span>
          <SmartImage
            className="hero-portrait"
            src="/images/portrait.png"
            alt="Marella Almazar, looking over her shoulder in a cream blouse"
            fetchPriority="high"
          />
        </div>
        <Sticker name="hibiscus" className="hero-flower" />
        <a
          href="#moodboard"
          className="hero-print"
          aria-label="Browse the coastal moodboard"
        >
          <SmartImage
            src="/images/coast.jpg"
            alt="Blue sea and white sandy beach"
            retryable={false}
          />
          <span>a slower state of mind</span>
        </a>
        <div className="paper-note">
          <span className="note-kicker">a note to self</span>
          <p>
            Make room for
            <br />
            the little things.
          </p>
          <span className="note-signature">with love, Marella</span>
        </div>
        <div className="art-footer">
          <p className="portrait-caption">
            A little corner of the internet, just for Marella.
          </p>
          <div className="scene-controls" aria-label="Portrait background">
            <span>Set the scene</span>
            <button
              type="button"
              aria-pressed={scene === "sky"}
              onClick={() => setScene("sky")}
            >
              Sky
            </button>
            <button
              type="button"
              aria-pressed={scene === "sea"}
              onClick={() => setScene("sea")}
            >
              Sea
            </button>
          </div>
        </div>
      </div>
      <aside className="hero-details" aria-label="Inside Marella's scrapbook">
        <p className="details-heading">Inside this scrapbook</p>
        <nav aria-label="Scrapbook contents">
          <a href="#moodboard">
            <strong>The visual moodboard</strong>
            <span>Photographs & inspiration</span>
          </a>
          <a href="#about">
            <strong>A little about Marella</strong>
            <span>The personal journal</span>
          </a>
          <a href="#contact">
            <strong>A note for Marella</strong>
            <span>Prepare a project brief</span>
          </a>
        </nav>
      </aside>
      <div className="hero-bottom">
        <span>Stay curious. Look a little closer.</span>
        <a href="#moodboard">
          Keep scrolling <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
