import {
  Bell,
  Bookmark,
  Briefcase,
  Compass,
  Cpu,
  GraduationCap,
  Heart,
  Landmark,
  Mail,
  MessageCircle,
  MessagesSquare,
  Sprout,
  Users,
  type LucideIcon,
} from "lucide-react";

/** Accent families used across cards, rings and topic chips. */
export type Accent = "purple" | "mint" | "orange" | "pink";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
};

export const navItems: NavItem[] = [
  { label: "Explore", href: "/explore", icon: Compass },
  { label: "Following", href: "/following", icon: Users },
  { label: "Bookmarks", href: "/bookmarks", icon: Bookmark },
  { label: "My Discussions", href: "/discussions", icon: MessagesSquare },
  { label: "Notifications", href: "/notifications", icon: Bell, badge: 3 },
  { label: "Messages", href: "/messages", icon: Mail },
];

export type Discussion = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  participants: string;
  comments: number;
  agreePercentage: number;
  accent: Accent;
  icon: LucideIcon;
  /** Names used to render the initials avatar stack. */
  voices: string[];
};

export const discussions: Discussion[] = [
  {
    id: "1",
    title: "Will AI replace human jobs in the next 10 years?",
    description:
      "Exploring the impact of AI on employment and the future of work.",
    tags: ["Technology", "Future"],
    participants: "1.2K",
    comments: 342,
    agreePercentage: 62,
    accent: "purple",
    icon: Cpu,
    voices: ["Neha Rao", "Ibrahim Khan", "Sara Mehta", "Dev Patel"],
  },
  {
    id: "2",
    title: "Is a 4-day work week better for productivity?",
    description: "Balancing work-life integration and economic outcomes.",
    tags: ["Work", "Productivity"],
    participants: "856",
    comments: 289,
    agreePercentage: 71,
    accent: "mint",
    icon: Briefcase,
    voices: ["Priya Nair", "Tom Alvarez", "Kabir Sen", "Lena Fischer"],
  },
  {
    id: "3",
    title: "Do college degrees still matter?",
    description:
      "Are degrees essential or are skills becoming the new currency?",
    tags: ["Education", "Career"],
    participants: "1.5K",
    comments: 512,
    agreePercentage: 48,
    accent: "orange",
    icon: GraduationCap,
    voices: ["Ana Duarte", "Rohit Shah", "Mei Lin", "Yusuf Ali"],
  },
  {
    id: "4",
    title: "Is social media doing more harm than good?",
    description: "Exploring the impact of social platforms on modern society.",
    tags: ["Society", "Technology"],
    participants: "2.3K",
    comments: 731,
    agreePercentage: 33,
    accent: "pink",
    icon: MessageCircle,
    voices: ["Zoya Iqbal", "Marco Rossi", "Aditi Rane", "Sam Okafor"],
  },
];

export type Topic = {
  name: string;
  count: string;
  icon: LucideIcon;
  accent: Accent;
};

export const topics: Topic[] = [
  { name: "Technology", count: "2.1K", icon: Cpu, accent: "purple" },
  { name: "Work", count: "1.8K", icon: Briefcase, accent: "mint" },
  { name: "Politics", count: "1.5K", icon: Landmark, accent: "orange" },
  { name: "Society", count: "1.2K", icon: Heart, accent: "pink" },
  { name: "Education", count: "1.1K", icon: GraduationCap, accent: "purple" },
  { name: "Lifestyle", count: "980", icon: Sprout, accent: "mint" },
];

export const thoughtOfTheDay = {
  quote:
    "The quality of your questions determines the quality of your life.",
  author: "Unknown",
};

export const currentUser = {
  name: "Arjun Singh",
  handle: "@arjun.charcha",
};

export const streakDays = 7;


/** Deliberately surfaced counter-view — blueprint §8.2, not an engagement bait feed. */
export const unseenPerspective = {
  discussionId: "1",
  topic: "Will AI replace human jobs?",
  stance: "Disagree",
  share: 38,
  body: "Every automation wave since the loom was predicted to end work. Each one moved it. The question is not whether jobs vanish but who pays for the transition.",
  author: "Ibrahim Khan",
};
