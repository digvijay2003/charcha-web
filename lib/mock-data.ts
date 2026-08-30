import {
  Bell,
  Bookmark,
  Briefcase,
  Compass,
  Cpu,
  GraduationCap,
  Heart,
  House,
  Landmark,
  Mail,
  MessageCircle,
  MessagesSquare,
  Scale,
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
  { label: "Home", href: "/", icon: House },
  { label: "Vaad-Vivaad", href: "/vaad-vivaad", icon: Scale },
  { label: "Explore", href: "/explore", icon: Compass },
  { label: "Following", href: "/following", icon: Users },
  { label: "Bookmarks", href: "/bookmarks", icon: Bookmark },
  { label: "My Discussions", href: "/discussions", icon: MessagesSquare },
  { label: "Notifications", href: "/notifications", icon: Bell, badge: 3 },
  { label: "Messages", href: "/messages", icon: Mail },
];

/** Condensed set shown in the mobile bottom bar. */
export const mobileNavItems: NavItem[] = [
  { label: "Home", href: "/", icon: House },
  { label: "Explore", href: "/explore", icon: Compass },
  { label: "Discussions", href: "/discussions", icon: MessagesSquare },
  { label: "Alerts", href: "/notifications", icon: Bell, badge: 3 },
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

export type Insight = {
  value: string;
  label: string;
  delta: string;
  accent: Accent;
};

export const insights: Insight[] = [
  {
    value: "12.4K",
    label: "Active Discussers",
    delta: "+18% this week",
    accent: "purple",
  },
  {
    value: "245",
    label: "Discussions Today",
    delta: "+32% today",
    accent: "pink",
  },
  {
    value: "98%",
    label: "Respectful Conversations",
    delta: "Community Rating",
    accent: "mint",
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

/** People shown in the "Active Now" avatar cluster. */
export const activeNow = {
  people: ["Arjun Singh", "Meera Joshi", "Ken Watanabe", "Fatima Noor", "Luis Ortega"],
  overflow: "+245",
};

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

/** Small helper so the balance bar is never a colour-only signal. */
export const perspectiveIcon: LucideIcon = Scale;
