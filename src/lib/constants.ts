import type { Icon } from "lucide-react";
import {
  LayoutDashboard,
  UserCircle,
  NotebookText,
  ClipboardList,
  TrendingUp,
  BookOpen,
  CalendarDays,
  Target,
  Users,
  MessageCircle,
  Replace,
  Settings,
  Salad,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: Icon;
  match?: (pathname: string) => boolean;
};

export const NAV_ITEMS_MAIN: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/profile", label: "Profile", icon: UserCircle },
  { href: "/diet-plan", label: "Diet Plan", icon: NotebookText },
  { href: "/food-log", label: "Food Log", icon: ClipboardList },
  { href: "/progress", label: "Progress", icon: TrendingUp },
  { href: "/learn", label: "Learn", icon: BookOpen },
  { href: "/meal-planner", label: "Meal Planner", icon: CalendarDays },
  { href: "/goals", label: "Goals", icon: Target },
  { href: "/community", label: "Community", icon: Users },
];

export const NAV_ITEMS_TOOLS: NavItem[] = [
  { href: "/chat", label: "AI Chat", icon: MessageCircle },
  { href: "/ingredient-swapper", label: "Ingredient Swapper", icon: Replace },
];

export const NAV_ITEMS_BOTTOM: NavItem[] = [
  { href: "/settings", label: "Settings", icon: Settings },
];

export const APP_NAME = "DietWise";
export const APP_ICON = Salad;
