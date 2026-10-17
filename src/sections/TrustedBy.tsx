import { SmartImage } from "@/components/SmartImage";
import { creator } from "@/data/portfolio";
import { useRibbonTextFlow } from "@/hooks/useRibbonTextFlow";

const brands = [
  {
    name: "Keepigo",
    image: "keepigo-transparent.png",
    bounds: [112, 70, 1448, 863, 1672],
  },
  {
    name: "NATPAT",
    image: "natpat-transparent.png",
    bounds: [145, 157, 963, 941, 1254],
  },
  {
    name: "Simply Gourmet",
    image: "simply-gourmet-transparent.png",
    bounds: [39, 91, 1173, 1097, 1254],
  },
  {
    name: "Spinnakers",
    image: "spinnakers-transparent.png",
    bounds: [20, 263, 1616, 447, 1672],
  },
  {
    name: "The Fave Stuff",
    image: "the-fave-stuff-transparent.png",
    bounds: [55, 145, 1161, 948, 1254],
  },
  {
    name: "Upfairy",
    image: "upfairy-transparent.png",
    bounds: [35, 468, 1173, 342, 1254],
  },
];

export function TrustedBy() {
  const spread = useRibbonTextFlow();
  return (
    <section
      ref={spread}
      className="trusted-spread"
      id="trusted-by"
      aria-labelledby="trusted-title"
    >
      <div className="trusted-partners">
        <div className="trusted-intro">
          <h2 id="trusted-title">
            Trusted
            <br />
            <em>by:</em>
          </h2>
        </div>
        <div className="trusted-brand-header">
          <ul className="trusted-brands" aria-label="Brands that trust Marella">
            {brands.map((brand) => {
              const [left, top, width, height, sourceWidth] = brand.bounds;
              const frameWidth = width + 8;
              const frameHeight = height + 8;
              return (
                <li key={brand.name}>
                  <figure
                    className="trusted-brand"
                    style={{ aspectRatio: `${frameWidth} / ${frameHeight}` }}
                  >
                    <img
                      className={
                        brand.name === "Spinnakers"
                          ? "trusted-logo-ink"
                          : undefined
                      }
                      src={`/images/brands/${brand.image}`}
                      alt={brand.name}
                      loading="lazy"
                      style={{
                        width: `${(sourceWidth / frameWidth) * 100}%`,
                        left: `${(-(left - 4) / frameWidth) * 100}%`,
                        top: `${(-(top - 4) / frameHeight) * 100}%`,
                      }}
                    />
                  </figure>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="trusted-story">
        <div className="trusted-editorial" lang="en">
          <div className="trusted-text-column">
            <span className="trusted-text-wrap" aria-hidden="true" />
            <p className="trusted-opening-copy">
              Everyday stories, with a personal point of view. Marella brings
              brands into familiar routines.
            </p>
          </div>
          <div className="trusted-text-column">
            <span className="trusted-text-wrap" aria-hidden="true" />
            <h3>Details tell the story.</h3>
            <p>
              A closer look, an unboxing, a first impression. Thoughtful details
              give every product its own introduction. Texture, movement, and
              familiar settings help the story feel personal, with room for the
              product to be seen and understood.
            </p>
            <p>
              Five years as a business owner shape her creative perspective.
              Research, marketing, and content come together to help a brand
              connect with its audience.
            </p>
          </div>
          <div className="trusted-text-column">
            <span className="trusted-text-wrap" aria-hidden="true" />
            <h3>A personal perspective.</h3>
            <p>Real routines. Small discoveries.</p>
          </div>
        </div>
        <div className="trusted-brand-field">
          <div className="trusted-swoosh-scene">
            <img
              className="trusted-floral-swoosh"
              src="/images/brands/floral-serpentine-ribbon.png"
              width="1448"
              height="1086"
              alt=""
              aria-hidden="true"
              loading="eager"
            />
            <div className="trusted-portrait-scene">
              <div className="trusted-portrait-circle">
                <SmartImage
                  className="trusted-portrait"
                  src="/images/ugc/mai-portrait.png"
                  alt={creator.name}
                  loading="lazy"
                />
              </div>
              <img
                className="trusted-portrait-head"
                src="/images/ugc/mai-portrait.png"
                alt=""
                aria-hidden="true"
                loading="lazy"
              />
              <div className="trusted-portrait-note">
                <h3>Brand stories, with a personal touch.</h3>
                <p>
                  Marella brings skincare routines, everyday finds, and product
                  discoveries into familiar settings. Her content gives brands a
                  place in the small moments people recognize.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
