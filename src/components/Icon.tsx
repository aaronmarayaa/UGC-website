import type { SVGProps } from "react";

type IconName =
  | "arrow"
  | "left"
  | "right"
  | "close"
  | "heart"
  | "download"
  | "menu"
  | "check"
  | "copy";
const paths: Record<IconName, string> = {
  arrow: "M5 19 19 5M5 5h14v14",
  left: "m14 6-6 6 6 6",
  right: "m10 6 6 6-6 6",
  close: "m6 6 12 12M6 18 18 6",
  heart:
    "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z",
  download: "M12 3v12m-5-5 5 5 5-5M5 16v5h14v-5",
  menu: "M4 8h16M4 16h16",
  check: "m5 12 4 4L19 6",
  copy: "M9 9h11v11H9zM15 5V3H3v12h2",
};
export function Icon({
  name,
  ...props
}: SVGProps<SVGSVGElement> & { name: IconName }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="square"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d={paths[name]} />
    </svg>
  );
}
