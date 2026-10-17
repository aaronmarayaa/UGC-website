import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Icon } from "@/components/Icon";
import { SmartImage } from "@/components/SmartImage";
import { photos } from "@/data/portfolio";
import { Sticker } from "@/components/Scrapbook";

const categories = [
  "All moments",
  "By the sea",
  "Everyday",
  "In bloom",
  "Saved",
] as const;

export function Moodboard() {
  const [category, setCategory] = useState<string>("All moments");
  const [saved, setSaved] = useState<string[]>(() => {
    try {
      const value: unknown = JSON.parse(
        localStorage.getItem("mai-saved-photos") ?? "[]",
      );
      return Array.isArray(value)
        ? value.filter(
            (id): id is string =>
              typeof id === "string" && photos.some((photo) => photo.id === id),
          )
        : [];
    } catch {
      return [];
    }
  });
  const [activeId, setActiveId] = useState<string | null>(null);
  const [notice, setNotice] = useState("");
  const [tidy, setTidy] = useState(false);
  const strip = useRef<HTMLDivElement>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);
  const filtered = photos.filter(
    (photo) =>
      category === "All moments" ||
      category === photo.category ||
      (category === "Saved" && saved.includes(photo.id)),
  );
  const active = photos.find((photo) => photo.id === activeId);
  const activeIndex = filtered.findIndex((photo) => photo.id === activeId);

  function toggleSave(id: string) {
    const next = saved.includes(id)
      ? saved.filter((value) => value !== id)
      : [...saved, id];
    setSaved(next);
    try {
      localStorage.setItem("mai-saved-photos", JSON.stringify(next));
      setNotice(
        next.includes(id)
          ? "Moment saved to this browser."
          : "Moment removed from saved.",
      );
    } catch {
      setNotice("Saved for this visit. Browser storage is unavailable.");
    }
    if (category === "Saved" && !next.includes(id) && activeId === id)
      setActiveId(null);
  }
  function move(direction: number) {
    if (filtered.length)
      setActiveId(
        filtered[
          (Math.max(activeIndex, 0) + direction + filtered.length) %
            filtered.length
        ].id,
      );
  }
  function scroll(direction: number) {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    strip.current?.scrollBy({
      left: direction * 340,
      behavior: reduced ? "instant" : "smooth",
    });
  }
  useEffect(() => {
    if (!activeId) return;
    const onKey = (event: KeyboardEvent) => {
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      )
        return;
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault();
        setActiveId(
          filtered[
            (Math.max(activeIndex, 0) +
              (event.key === "ArrowRight" ? 1 : -1) +
              filtered.length) %
              filtered.length
          ]?.id ?? null,
        );
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeId, activeIndex, filtered]);

  return (
    <section
      className="moodboard section-shell"
      id="moodboard"
      aria-labelledby="moodboard-title"
    >
      <div className="section-heading reveal">
        <div>
          <p className="editorial-label">Visual direction</p>
          <h2 id="moodboard-title">
            Collected
            <br />
            <em>moments.</em>
          </h2>
        </div>
        <div className="heading-aside">
          <p>
            Soft light. Slow mornings. A little sea air.
            <br />A sample collection of visual inspiration.
          </p>
          <span className="handwritten">a feeling, more than a feed</span>
        </div>
      </div>
      <div className="board-toolbar">
        <div className="filters" aria-label="Filter moodboard">
          {categories.map((value) => (
            <button
              key={value}
              aria-pressed={value === category}
              onClick={() => {
                setCategory(value);
                strip.current?.scrollTo({ left: 0 });
              }}
            >
              {value}
              {value === "Saved" && saved.length > 0 && (
                <span className="saved-count">{saved.length}</span>
              )}
            </button>
          ))}
        </div>
        <div className="strip-controls">
          <Button
            variant="ghost"
            className="tidy-toggle"
            aria-pressed={tidy}
            onClick={() => setTidy(!tidy)}
          >
            {tidy ? "Scatter photos" : "Straighten photos"}
          </Button>
          <Button
            variant="outline"
            size="icon"
            aria-label="Scroll photographs left"
            onClick={() => scroll(-1)}
            disabled={!filtered.length}
          >
            <Icon name="left" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            aria-label="Scroll photographs right"
            onClick={() => scroll(1)}
            disabled={!filtered.length}
          >
            <Icon name="right" />
          </Button>
        </div>
      </div>
      <div className="keepsake-case">
        <div className="case-label">
          <span>A keepsake of little things</span>
          <span>Sample photo collection</span>
        </div>
        <div
          className="photo-strip"
          data-tidy={tidy}
          ref={strip}
          tabIndex={0}
          aria-label={`${category} photographs`}
        >
          {filtered.length ? (
            filtered.map((photo, index) => (
              <article
                className="photo-print"
                key={photo.id}
                style={
                  {
                    "--print-turn": `${index % 2 ? 2 : -2}deg`,
                  } as CSSProperties
                }
              >
                <button
                  type="button"
                  className="photo-open"
                  onClick={(event) => {
                    lastTrigger.current = event.currentTarget;
                    setActiveId(photo.id);
                  }}
                  aria-label={`Open ${photo.title}`}
                >
                  <SmartImage
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    retryable={false}
                  />
                  <span className="view-photo">View photograph</span>
                </button>
                <div className="photo-caption">
                  <div>
                    <span className="photo-category">{photo.category}</span>
                    <h3>{photo.title}</h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="save-button"
                    aria-label={`${saved.includes(photo.id) ? "Unsave" : "Save"} ${photo.title}`}
                    aria-pressed={saved.includes(photo.id)}
                    onClick={() => toggleSave(photo.id)}
                  >
                    <Icon
                      name="heart"
                      fill={saved.includes(photo.id) ? "currentColor" : "none"}
                    />
                  </Button>
                </div>
              </article>
            ))
          ) : (
            <div className="board-empty">
              <h3>Your own little collection.</h3>
              <p>
                Save a photograph with its heart button and it will appear here.
              </p>
              <Button
                variant="outline"
                onClick={() => setCategory("All moments")}
              >
                Browse all moments
              </Button>
            </div>
          )}
        </div>
        <span className="case-hinge" aria-hidden="true" />
      </div>
      <Sticker name="heart-seal" className="moodboard-seal" />
      <div className="board-footer">
        <p>Editorial sample imagery from Unsplash, not commissioned work.</p>
        <p role="status" className="save-notice">
          {notice}
        </p>
      </div>
      <Dialog
        open={Boolean(active)}
        onOpenChange={(open) => {
          if (!open) setActiveId(null);
        }}
      >
        <DialogContent
          className="photo-dialog"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            if (lastTrigger.current?.isConnected) lastTrigger.current.focus();
            else
              document
                .querySelector<HTMLButtonElement>(
                  '.filters button[aria-pressed="true"]',
                )
                ?.focus();
          }}
        >
          {active && (
            <>
              <DialogTitle className="font-display text-3xl">
                {active.title}
              </DialogTitle>
              <DialogDescription>
                {active.category} · Sample moodboard photograph
              </DialogDescription>
              <SmartImage
                key={active.id}
                className="viewer-image"
                src={active.src}
                alt={active.alt}
              />
              <div className="viewer-controls">
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Previous photograph"
                  onClick={() => move(-1)}
                >
                  <Icon name="left" />
                </Button>
                <Button variant="ghost" onClick={() => toggleSave(active.id)}>
                  <Icon
                    name="heart"
                    fill={saved.includes(active.id) ? "currentColor" : "none"}
                  />
                  {saved.includes(active.id) ? "Saved" : "Save moment"}
                </Button>
                <a href={active.source} target="_blank" rel="noreferrer">
                  Photo source
                </a>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Next photograph"
                  onClick={() => move(1)}
                >
                  <Icon name="right" />
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
