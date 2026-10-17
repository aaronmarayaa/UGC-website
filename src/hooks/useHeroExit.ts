import { useEffect, useRef } from "react";

export function useHeroExit() {
  const hero = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = hero.current;
    if (!section) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    function update() {
      frame = 0;
      if (!section) return;
      const bounds = section.getBoundingClientRect();
      const progress = motion.matches
        ? 0
        : Math.max(0, Math.min(1, -bounds.top / (bounds.height * 0.72)));
      section.style.setProperty("--hero-departure", progress.toFixed(4));
    }

    function schedule() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    motion.addEventListener("change", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      motion.removeEventListener("change", schedule);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return hero;
}
