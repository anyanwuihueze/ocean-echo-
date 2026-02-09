import type { LucideIcon } from "lucide-react";

export interface Vibe {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface UserProfile {
  id: string;
  nickname: string;
  avatarUrl: string;
  vibeTags: Vibe[];
}
