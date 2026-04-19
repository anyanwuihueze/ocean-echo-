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

export interface Note {
  id: string;
  senderId: string;
  senderNickname: string;
  content: string;
  timestamp: string; // ISO string to avoid hydration mismatches
  isRead: boolean;
}