import type { CSSProperties } from "react";

const letters: Record<string, [number, number, number, number]> = {
  M: [132, 490, 152, 142],
  a: [239, 27, 112, 130],
  i: [232, 338, 77, 140],
};

export function CutoutText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <span aria-hidden="true" className={`cutout-text ${className}`}>
      {[...text].map((letter, index) => {
        if (letter === " ")
          return <span className="cutout-space" key={index} />;
        const glyph = letters[letter];
        if (!glyph) return <span key={index}>{letter}</span>;
        const [x, y, width, height] = glyph;
        const style: CSSProperties = {
          width: `${width / height}em`,
          backgroundSize: `${1152 / height}em ${2048 / height}em`,
          backgroundPosition: `${-x / height}em ${-y / height}em`,
          "--letter-turn": `${index % 2 ? -5 : 4}deg`,
        } as CSSProperties;
        return <span className="cutout-letter" key={index} style={style} />;
      })}
    </span>
  );
}

type StickerName =
  | "ticket"
  | "fabric-star"
  | "rose-seal"
  | "swan"
  | "ribbon"
  | "hibiscus"
  | "heart-seal";
export function Sticker({
  name,
  className = "",
}: {
  name: StickerName;
  className?: string;
}) {
  return (
    <img
      src={`/images/scrapbook/${name}.png`}
      alt=""
      aria-hidden="true"
      className={`scrap-sticker ${className}`}
      loading="lazy"
      draggable={false}
    />
  );
}
