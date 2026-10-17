import { useEffect, useRef } from "react";

export function useRibbonTextFlow() {
  const spread = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = spread.current;
    const image = section?.querySelector<HTMLImageElement>(
      ".trusted-floral-swoosh",
    );
    const editorial = section?.querySelector<HTMLElement>(".trusted-editorial");
    if (!section || !image || !editorial) return;
    let disposed = false;
    let frame = 0;
    let pixels: ImageData | undefined;
    let observer: ResizeObserver | undefined;

    function update() {
      frame = 0;
      section?.style.setProperty(
        "--trusted-viewport-width",
        `${document.documentElement.clientWidth}px`,
      );
      if (
        !pixels ||
        !image ||
        !editorial ||
        !section ||
        window.innerWidth < 1100
      )
        return;
      const field = section.querySelector<HTMLElement>(".trusted-brand-field");
      const story = section
        .querySelector(".trusted-story")
        ?.getBoundingClientRect();
      const brands = section
        .querySelector(".trusted-brands")
        ?.getBoundingClientRect();
      if (field && story && brands) {
        const top =
          brands.top +
          brands.height / 2 -
          story.top -
          image.getBoundingClientRect().height * 0.79;
        const offset = `${Math.round(top)}px`;
        if (field.style.getPropertyValue("--trusted-art-offset") !== offset)
          field.style.setProperty("--trusted-art-offset", offset);
      }
      const art = image.getBoundingClientRect();
      const copy = editorial.getBoundingClientRect();
      if (!art.width || !copy.width) return;
      const note = section
        .querySelector(".trusted-portrait-note")
        ?.getBoundingClientRect();
      const end = Math.max(
        480,
        art.bottom - copy.top + 24,
        (note?.bottom ?? 0) - copy.top + 28,
      );
      const obstacles = [
        ...section.querySelectorAll(
          ".trusted-brands li, .trusted-portrait-circle, .trusted-portrait-head, .trusted-portrait-note",
        ),
      ].map((logo) => logo.getBoundingClientRect());
      const scaleX = pixels.width / art.width;
      const scaleY = pixels.height / art.height;
      const raster = pixels;

      section
        .querySelectorAll<HTMLElement>(".trusted-text-wrap")
        .forEach((wrap) => {
          const bounds = wrap.getBoundingClientRect();
          const fromLeft = wrap.dataset.flowSide === "left";
          const height = Math.max(1, end - (bounds.top - copy.top));
          const edge: [number, number][] = [];
          const startX = Math.max(
            0,
            Math.floor((bounds.left - art.left) * scaleX),
          );
          const stopX = Math.min(
            raster.width,
            Math.ceil((bounds.right - art.left) * scaleX),
          );
          for (let y = 0; y <= height; y += 5) {
            const globalY = bounds.top + y;
            const sourceY = Math.floor((globalY - art.top) * scaleY);
            let boundary = fromLeft ? 0 : bounds.width;
            if (sourceY >= 0 && sourceY < raster.height) {
              for (
                let x = fromLeft ? stopX - 1 : startX;
                fromLeft ? x >= startX : x < stopX;
                x += fromLeft ? -2 : 2
              ) {
                if (raster.data[(sourceY * raster.width + x) * 4 + 3] > 100) {
                  boundary = Math.min(
                    bounds.width,
                    Math.max(
                      0,
                      art.left +
                        (x + (fromLeft ? 1 : 0)) / scaleX -
                        bounds.left,
                    ),
                  );
                  break;
                }
              }
            }
            for (const logo of obstacles) {
              if (
                globalY >= logo.top - 8 &&
                globalY <= logo.bottom + 8 &&
                logo.right > bounds.left &&
                logo.left < bounds.right
              ) {
                boundary = fromLeft
                  ? Math.max(
                      boundary,
                      Math.min(bounds.width, logo.right - bounds.left + 8),
                    )
                  : Math.min(
                      boundary,
                      Math.max(0, logo.left - bounds.left - 8),
                    );
              }
            }
            const openWidth = fromLeft ? bounds.width - boundary : boundary;
            if (openWidth < Math.min(110, bounds.width * 0.7))
              boundary = fromLeft ? bounds.width : 0;
            edge.push([(boundary / bounds.width) * 100, (y / height) * 100]);
          }
          const first = edge.findIndex(([x]) => (fromLeft ? x > 0 : x < 100));
          const last = edge.findLastIndex(([x]) =>
            fromLeft ? x > 0 : x < 100,
          );
          const anchor = fromLeft ? 0 : 100;
          const shape =
            first < 0
              ? `polygon(${anchor}% 0, ${anchor}% 100%, ${anchor}% 0)`
              : `polygon(${anchor}% ${edge[first][1].toFixed(2)}%, ${edge
                  .slice(first, last + 1)
                  .map(([x, y]) => `${x.toFixed(2)}% ${y.toFixed(2)}%`)
                  .join(", ")}, ${anchor}% ${edge[last][1].toFixed(2)}%)`;
          if (wrap.style.height !== `${height}px`)
            wrap.style.height = `${height}px`;
          if (wrap.style.shapeOutside !== shape)
            wrap.style.shapeOutside = shape;
        });
    }

    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    async function prepare() {
      try {
        await Promise.all([image!.decode(), document.fonts.ready]);
        if (disposed) return;
        const canvas = document.createElement("canvas");
        canvas.width = image!.naturalWidth;
        canvas.height = image!.naturalHeight;
        const context = canvas.getContext("2d", { willReadFrequently: true });
        if (!context) return;
        context.drawImage(image!, 0, 0);
        pixels = context.getImageData(0, 0, canvas.width, canvas.height);
        canvas.width = canvas.height = 0;
        section!.dataset.textFlow = "ready";
        if ("ResizeObserver" in window) {
          observer = new ResizeObserver(schedule);
          observer.observe(image!);
          observer.observe(editorial!);
        }
        schedule();
      } catch {
        if (!disposed) section!.dataset.textFlow = "fallback";
      }
    }

    void prepare();
    schedule();
    window.addEventListener("resize", schedule);
    return () => {
      disposed = true;
      observer?.disconnect();
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  return spread;
}
