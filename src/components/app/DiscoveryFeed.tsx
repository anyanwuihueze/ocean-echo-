"use client";

import { UserProfileCard } from '@/components/app/UserProfileCard';
import { mockUsers } from '@/lib/data';
import type { UserProfile } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { CountdownTimer } from './CountdownTimer';
import { LogOut } from 'lucide-react';
import { AiVibeCurator } from './AiVibeCurator';

interface DiscoveryFeedProps {
  onCheckOut: () => void;
  currentUser: UserProfile;
}

export function DiscoveryFeed({ onCheckOut, currentUser }: DiscoveryFeedProps) {
  const otherUsers = mockUsers.filter(user => user.id !== currentUser.id);
  const allUsers = [currentUser, ...otherUsers];

  return (
    <div className="w-full max-w-5xl mx-auto">
      <header className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 p-4 bg-card/50 backdrop-blur-sm rounded-lg border">
        <div className="text-center sm:text-left">
          <h1 className="text-2xl font-headline">You're at Echo Corner 🌅</h1>
          <p className="text-muted-foreground">Session expires in:</p>
          <CountdownTimer />
        </div>
        <div className="flex items-center gap-2">
           <AiVibeCurator currentVibes={currentUser.vibeTags.map(v => v.label)} />
          <Button variant="destructive" onClick={onCheckOut} className="gap-2">
            <LogOut />
            Check Out
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allUsers.map((user, index) => (
          <UserProfileCard key={user.id} user={user} isCurrentUser={user.id === currentUser.id} />
        ))}
      </div>
    </div>
  );
}
