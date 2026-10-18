import { SmartImage } from "@/components/SmartImage";
import { creator, instagramInsights } from "@/data/portfolio";
import { useHeroExit } from "@/hooks/useHeroExit";

export function Hero() {
  const hero = useHeroExit();
  return (
    <section ref={hero} className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero-materials" aria-hidden="true">
        <img
          className="cover-paper"
          src="/images/ugc/floral-paper.png"
          alt=""
          aria-hidden="true"
        />
        <img
          className="cover-blossoms"
          src="/images/ugc/pink-blossoms.png"
          alt=""
          aria-hidden="true"
        />
        <img
          className="cover-butterfly"
          src="/images/ugc/golden-butterfly.png"
          alt=""
          aria-hidden="true"
        />
        <img
          className="cover-pink-paper"
          src="/images/ugc/pink-paper.png"
          alt=""
        />
      </div>
      <div className="hero-cutouts" aria-hidden="true">
        <img
          className="cover-white-blossoms"
          src="/images/ugc/white-blossoms.png"
          alt=""
        />
      </div>
      <div className="hero-fruit" aria-hidden="true">
        <img
          className="cover-citrus"
          src="/images/ugc/pink-citrus.png"
          alt=""
        />
      </div>
      <div className="hero-copy">
        <h1 id="hero-title" aria-label={creator.name}>
          <span className="hero-name-back" aria-hidden="true">
            {creator.firstName}
          </span>
        </h1>
      </div>
      <span className="hero-name-front" aria-hidden="true">
        Almazar
      </span>
      <div className="hero-pitch">
        <p className="cover-note">a little personality, in every frame.</p>
        <p className="ugc-intro">
          User-generated content, through {creator.firstName}'s lens.
        </p>
        <div className="cover-evidence">
          <div className="cover-results">
            <a
              className="instagram-link cover-instagram"
              href={creator.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>{creator.instagramHandle}</strong>
            </a>
            <span>
              <a href="#results">
                Instagram views
                <br />
                {instagramInsights[1].value} interactions · See results ↗
              </a>
            </span>
          </div>
          <img
            className="cover-fabric-star"
            src="/images/scrapbook/fabric-star.png"
            alt=""
            aria-hidden="true"
          />
        </div>
      </div>
      <div className="hero-art">
        <div className="portrait-scene">
          <SmartImage
            className="portrait-backing"
            src="/images/daylight.jpg"
            alt=""
            retryable={false}
          />
          <SmartImage
            className="hero-portrait"
            src="/images/ugc/mai-portrait.png"
            alt={`${creator.name}, looking over her shoulder in a cream blouse`}
            fetchPriority="high"
          />
        </div>
      </div>
      <div className="hero-bottom">
        <a className="primary-link" href="#videos">
          Watch the stories <span aria-hidden="true">↗</span>
        </a>
        <a href="#about">
          Turn the page <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
