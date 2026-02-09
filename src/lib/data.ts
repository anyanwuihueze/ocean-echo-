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
    return img ? img.imageUrl : PlaceHolderImages[0].imageUrl;
}

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
