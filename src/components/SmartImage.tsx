import { useState } from "react";
import type { ImgHTMLAttributes } from "react";

export function SmartImage({
  src,
  alt,
  className = "",
  retryable = true,
  ...props
}: ImgHTMLAttributes<HTMLImageElement> & { retryable?: boolean }) {
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [attempt, setAttempt] = useState(0);
  return (
    <span className={`smart-image ${className}`} data-state={state}>
      {state === "loading" && (
        <span className="image-status" role="status">
          Loading photograph…
        </span>
      )}
      {state === "error" && (
        <span className="image-status" role="alert">
          This photograph couldn’t load.
          {retryable ? (
            <button
              type="button"
              onClick={() => {
                setState("loading");
                setAttempt(attempt + 1);
              }}
            >
              Retry photograph
            </button>
          ) : (
            <span>Open the photograph to try again.</span>
          )}
        </span>
      )}
      <img
        key={`${src}-${attempt}`}
        src={src}
        alt={alt}
        onLoad={() => setState("ready")}
        onError={() => setState("error")}
        {...props}
      />
    </span>
  );
}
