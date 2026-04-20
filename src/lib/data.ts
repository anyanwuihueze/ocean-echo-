import type { Vibe, UserProfile } from '@/lib/types';
import { GlassWater, Sunset, Music, BrainCircuit, Moon, Users } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export const vibeTags: Vibe[] = [
  { id: 'vibing', label: 'Just vibing', icon: GlassWater },
  { id: 'sunset', label: 'Sunset drinks', icon: Sunset },
  { id: 'music', label: 'Music & movement', icon: Music },
  { id: 'convo', label: 'Deep convo', icon: BrainCircuit },
  { id: 'after-dark', label: 'After-dark energy', icon: Moon },
  { id: 'meeting', label: 'Open to meeting people', icon: Users },
];

const getAvatar = (id: string) => {
  const img = PlaceHolderImages.find(p => p.id === id);
  if (img) return img.imageUrl;
  return PlaceHolderImages.length > 0 ? PlaceHolderImages[0].imageUrl : '';
};

export const mockUsers: UserProfile[] = [
  {
    id: 'user-1',
    nickname: 'Alex',
    avatarUrl: getAvatar('avatar1'),
    vibeTags: [vibeTags[1], vibeTags[0], vibeTags[4]],
  },
  {
    id: 'user-2',
    nickname: 'Jordan',
    avatarUrl: getAvatar('avatar2'),
    vibeTags: [vibeTags[2], vibeTags[5]],
  },
  {
    id: 'user-3',
    nickname: 'Casey',
    avatarUrl: getAvatar('avatar3'),
    vibeTags: [vibeTags[3]],
  },
  {
    id: 'user-4',
    nickname: 'Riley',
    avatarUrl: getAvatar('avatar4'),
    vibeTags: [vibeTags[0], vibeTags[5]],
  },
  {
    id: 'user-5',
    nickname: 'Morgan',
    avatarUrl: getAvatar('avatar5'),
    vibeTags: [vibeTags[1], vibeTags[2], vibeTags[4]],
  },
  {
    id: 'user-6',
    nickname: 'Taylor',
    avatarUrl: getAvatar('avatar6'),
    vibeTags: [vibeTags[3], vibeTags[5]],
  },
  {
    id: 'user-7',
    nickname: 'Sam',
    avatarUrl: getAvatar('avatar7'),
    vibeTags: [vibeTags[1], vibeTags[4]],
  },
  {
    id: 'user-8',
    nickname: 'Drew',
    avatarUrl: getAvatar('avatar8'),
    vibeTags: [vibeTags[0], vibeTags[2]],
  },
];

export const replyScripts: Record<string, string[]> = {
  'sunset': [
    "It's gorgeous right? The light hits different out here 🌅",
    "Sunset drinks are literally my whole personality tonight 😄",
    "I come here every Friday just for this view. You?",
    "The horizon looks unreal tonight. You picked a good night to be out.",
  ],
  'vibing': [
    "Same energy honestly. No agenda, just good atmosphere ✨",
    "This is exactly the vibe I needed tonight.",
    "Just here for the moment. Love that you get it.",
    "Rare to find someone who just *gets* the vibe without explanation 😌",
  ],
  'music': [
    "The DJ tonight is seriously underrated ��",
    "Music & movement is the only way to exist on a Friday.",
    "I was literally just thinking someone else here must be feeling this set.",
    "Who's your go-to artist right now? I need new recs.",
  ],
  'convo': [
    "Finally someone who wants to actually *talk* 😂",
    "Okay real question — what's the most interesting thing that happened to you this week?",
    "I feel like deep convos in loud bars are a vibe of their own.",
    "You seem like you have a story. What brought you out tonight?",
  ],
  'after-dark': [
    "The night is still young honestly 🌙",
    "After-dark energy is the only energy that matters.",
    "I have a feeling tonight is going to be one of those nights.",
    "Good things happen after midnight. Just saying.",
  ],
  'meeting': [
    "Love that you're open to it — so am I! What's your scene?",
    "Meeting people in real life > any app. This is proof 😄",
    "Okay so tell me something about yourself that's NOT on a dating profile.",
    "I always say the best connections happen when you least expect them.",
  ],
  'default': [
    "Hey! Glad you reached out 👋",
    "This app is wild right? Love the concept.",
    "You've got good energy, I could tell from across the room.",
    "Tonight has been full of surprises. You might be the best one 😄",
  ],
};
