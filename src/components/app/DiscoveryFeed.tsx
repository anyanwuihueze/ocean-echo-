"use client";

import { useState } from 'react';
import { UserProfileCard } from '@/components/app/UserProfileCard';
import { mockUsers } from '@/lib/data';
import type { UserProfile, Note } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { CountdownTimer } from './CountdownTimer';
import { LogOut, Mail } from 'lucide-react';
import { AiVibeCurator } from './AiVibeCurator';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';

interface DiscoveryFeedProps {
  onCheckOut: () => void;
  currentUser: UserProfile;
  notes: Note[];
  onMarkRead: (id: string) => void;
  onSendNote: (userId: string, content: string) => void;
}

export function DiscoveryFeed({ onCheckOut, currentUser, notes, onMarkRead, onSendNote }: DiscoveryFeedProps) {
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const otherUsers = mockUsers.filter(user => user.id !== currentUser.id);
  const allUsers = [currentUser, ...otherUsers];
  const unreadCount = notes.filter(n => !n.isRead).length;

  return (
    <div className="w-full max-w-5xl mx-auto">
      <header className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 p-4 bg-card/50 backdrop-blur-sm rounded-lg border">
        <div className="text-center sm:text-left">
          <h1 className="text-2xl font-headline">You're at Echo Corner 🌅</h1>
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <p className="text-muted-foreground text-sm">Session expires in:</p>
            <CountdownTimer />
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
           <AiVibeCurator currentVibes={currentUser.vibeTags.map(v => v.label)} />
           
           <Sheet open={isNotesOpen} onOpenChange={setIsNotesOpen}>
             <SheetTrigger asChild>
               <Button variant="outline" className="relative gap-2">
                 <Mail className="h-4 w-4" />
                 Echoes
                 {unreadCount > 0 && (
                   <Badge variant="destructive" className="absolute -top-2 -right-2 px-1.5 py-0.5 text-[10px] min-w-[1.25rem] h-5 flex items-center justify-center">
                     {unreadCount}
                   </Badge>
                 )}
               </Button>
             </SheetTrigger>
             <SheetContent>
               <SheetHeader>
                 <SheetTitle>Your Echoes</SheetTitle>
                 <SheetDescription>Messages dropped by other users at the venue.</SheetDescription>
               </SheetHeader>
               <ScrollArea className="h-[calc(100vh-120px)] mt-4">
                 {notes.length === 0 ? (
                   <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                     <Mail className="h-8 w-8 mb-2 opacity-20" />
                     <p>No echoes yet...</p>
                   </div>
                 ) : (
                   <div className="space-y-4 pr-4">
                     {notes.map((note) => (
                       <div 
                         key={note.id} 
                         className={`p-3 rounded-lg border transition-colors ${note.isRead ? 'bg-background/50' : 'bg-primary/10 border-primary/30'}`}
                         onClick={() => onMarkRead(note.id)}
                       >
                         <div className="flex justify-between items-start mb-1">
                           <span className="font-semibold text-accent text-sm">{note.senderNickname}</span>
                           <span className="text-[10px] text-muted-foreground">
                             {formatDistanceToNow(new Date(note.timestamp), { addSuffix: true })}
                           </span>
                         </div>
                         <p className="text-sm leading-relaxed">{note.content}</p>
                       </div>
                     ))}
                   </div>
                 )}
               </ScrollArea>
             </SheetContent>
           </Sheet>

          <Button variant="destructive" onClick={onCheckOut} className="gap-2">
            <LogOut className="h-4 w-4" />
            Check Out
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allUsers.map((user) => (
          <UserProfileCard 
            key={user.id} 
            user={user} 
            isCurrentUser={user.id === currentUser.id}
            onSendNote={onSendNote}
          />
        ))}
      </div>
    </div>
  );
}
