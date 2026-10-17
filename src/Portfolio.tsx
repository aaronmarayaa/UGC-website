import { useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/sections/CreatorHero";
import { CreatorStory } from "@/sections/CreatorStory";
import { creator } from "@/data/portfolio";
import { VideoStories } from "@/sections/VideoStories";
import { TrustedBy } from "@/sections/TrustedBy";

export default function Portfolio() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    )
      return;
    elements.forEach((element) => element.classList.add("reveal-pending"));
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("reveal-pending");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.1 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      elements.forEach((element) => element.classList.remove("reveal-pending"));
    };
  }, []);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navigation />
      <main id="main">
        <Hero />
        <VideoStories />
        <TrustedBy />
        <CreatorStory />
      </main>
      <footer className="site-footer">
        <a className="footer-wordmark" href="#home">
          {creator.name.toLowerCase()}.
        </a>
        <p>A UGC scrapbook. A little piece of {creator.firstName}.</p>
        <a href="#home">
          Back to the beginning <span aria-hidden="true">↑</span>
        </a>
      </footer>
    </>
  );
}
