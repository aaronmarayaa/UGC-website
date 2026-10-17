export const creator = {
  name: "Marella Almazar",
  firstName: "Marella",
  email: "",
  biography:
    "Hi, I’m Marella! I’ve been a business owner for the past five years, gaining valuable experience in market research, marketing, data analysis and content creation. I’m now a full-time UGC creator based in Canada and a proud first-time mom. With my background in business and marketing, I’m passionate about creating authentic, engaging and relatable content that helps brands connect with their audience, build trust, expand their reach and turn video content into sales.",
};

export const instagramInsights = [
  { label: "Views", value: "267.7K", change: "102.5K%" },
  { label: "Content interactions", value: "39.7K", change: "100%" },
  { label: "Messaging contacts", value: "36", change: "100%" },
  { label: "Follows", value: "727", change: "18.1K%" },
];

export type Photo = {
  id: string;
  title: string;
  category: "By the sea" | "Everyday" | "In bloom";
  src: string;
  alt: string;
  source: string;
};

export const photos: Photo[] = [
  {
    id: "coast",
    title: "Somewhere slower",
    category: "By the sea",
    src: "/images/coast.jpg",
    alt: "A pale sandy beach and gentle blue waves at sunset",
    source: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },
  {
    id: "flowers",
    title: "A softer kind of morning",
    category: "In bloom",
    src: "/images/flowers.jpg",
    alt: "Yellow poppies in sunlight against a clear blue sky",
    source: "https://images.unsplash.com/photo-1490750967868-88aa4486c946",
  },
  {
    id: "coffee",
    title: "The everyday ritual",
    category: "Everyday",
    src: "/images/coffee.jpg",
    alt: "Pour-over coffee being prepared beside a café window",
    source: "https://images.unsplash.com/photo-1442512595331-e89e73853f31",
  },
  {
    id: "sea",
    title: "Where the waves wander",
    category: "By the sea",
    src: "/images/sea.jpg",
    alt: "Blue ocean waves breaking against a rocky coastline",
    source: "https://images.unsplash.com/photo-1676059056775-643c1ba3a7b9",
  },
  {
    id: "daylight",
    title: "Room to daydream",
    category: "Everyday",
    src: "/images/daylight.jpg",
    alt: "White clouds drifting across an open blue sky",
    source: "https://images.unsplash.com/photo-1513002749550-c59d786b8e6c",
  },
];
