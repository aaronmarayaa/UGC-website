export type VideoClip = {
  id: string;
  label: string;
  src: string;
  poster: string;
  duration: number;
};

export type VideoStory = {
  id: string;
  category: string;
  lead: string;
  description: string;
  clips: VideoClip[];
};

function clip(
  folder: string,
  id: string,
  label: string,
  duration: number,
): VideoClip {
  return {
    id,
    label,
    duration,
    src: `/videos/${encodeURIComponent(folder)}/${id}.mp4`,
    poster: `/videos/posters/${id}.jpg`,
  };
}

export const videoStories: VideoStory[] = [
  {
    id: "lifestyle",
    category: "Lifestyle",
    lead: "The moments between the plans have a story of their own.",
    description:
      "A glimpse of the day, a little change, and an evening at home. Personal edits that find something worth keeping in the everyday.",
    clips: [
      clip("lifestyle", "lifestyle-1", "A glimpse of the day", 9.2),
      clip("lifestyle", "lifestyle-2", "Life lately", 41),
      clip("lifestyle", "lifestyle-3", "An evening at home", 24.6),
    ],
  },
  {
    id: "skincare",
    category: "Skincare",
    lead: "A quiet reset, one step at a time.",
    description:
      "Everyday skincare routines, shown up close. A little time for the textures, the steps, and the small rituals around them.",
    clips: [
      clip("skincare", "skincare-1", "The five-minute routine", 45.6),
      clip("skincare", "skincare-2", "An everyday skin reset", 21.4),
    ],
  },
  {
    id: "travel",
    category: "Travel",
    lead: "A change of scene, and a few things worth remembering.",
    description:
      "A family day out and a walk through nature, collected as little travel diaries. The journey matters as much as the destination.",
    clips: [
      clip("Travel", "travel-1", "A family day out", 93.4),
      clip("Travel", "travel-2", "A walk in nature", 14.4),
    ],
  },
  {
    id: "unboxing",
    category: "Unboxing",
    lead: "That first look is part of the story.",
    description:
      "From a fresh read to a long-awaited parcel: opening, noticing, and taking a closer look at what is inside.",
    clips: [
      clip("unboxing", "unboxing-1", "A new chapter", 35.5),
      clip("unboxing", "unboxing-2", "First look: skincare", 11),
      clip("unboxing", "unboxing-3", "The long-awaited parcel", 59.9),
      clip("unboxing", "unboxing-4", "Car seat unboxing", 82.8),
    ],
  },
  {
    id: "shopping",
    category: "Shopping",
    lead: "A day of browsing, with a little purpose.",
    description:
      "An in-store look at choosing the next everyday essentials. Come along for the finds, the decisions, and the details in between.",
    clips: [
      clip("shopping", "shopping-1", "A day of baby-gear shopping", 48.4),
    ],
  },
  {
    id: "reviews",
    category: "Product Reviews",
    lead: "A closer look at the things that become part of the day.",
    description:
      "A sparkling drink and a snack-time find, explored through simple, everyday moments. Space to see the product in context.",
    clips: [
      clip("product reviews", "reviews-1", "A summer drink", 44.9),
      clip("product reviews", "reviews-2", "A snack-time find", 19.2),
    ],
  },
];
