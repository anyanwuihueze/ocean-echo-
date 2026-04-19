"use client";

import { useState, useEffect } from 'react';
import { UserProfileCard } from '@/components/app/UserProfileCard';
import { mockUsers } from '@/lib/data';
import type { UserProfile, Note } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { CountdownTimer } from './CountdownTimer';
import { LogOut, Mail, Zap } from 'lucide-react';
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
  onSimulateEcho?: () => void;
}

export function DiscoveryFeed({ 
  onCheckOut, 
  currentUser, 
  notes, 
  onMarkRead, 
  onSendNote,
  onSimulateEcho 
}: DiscoveryFeedProps) {
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const otherUsers = mockUsers.filter(user => user.id !== currentUser.id);
  const allUsers = [currentUser, ...otherUsers];
  const unreadCount = notes.filter(n => !n.isRead).length;

  return (
    <div className="w-full max-w-5xl mx-auto">
      <header className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 p-4 bg-card/30 backdrop-blur-xl rounded-2xl border border-white/10">
        <div className="text-center sm:text-left">
          <h1 className="text-2xl font-headline font-bold text-white">Echo Corner 🌅</h1>
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <p className="text-zinc-400 text-xs uppercase tracking-widest font-medium">Session ends in:</p>
            <CountdownTimer />
          </div>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onSimulateEcho}
            className="text-zinc-500 hover:text-accent hover:bg-accent/10 text-[10px] uppercase tracking-tighter h-8"
          >
            <Zap className="h-3 w-3 mr-1" />
            Test Echo
          </Button>

          <AiVibeCurator currentVibes={currentUser.vibeTags.map(v => v.label)} />
           
           <Sheet open={isNotesOpen} onOpenChange={setIsNotesOpen}>
             <SheetTrigger asChild>
               <Button variant="outline" className="relative gap-2 bg-white/5 border-white/10 hover:bg-white/10 rounded-full px-5">
                 <Mail className="h-4 w-4" />
                 <span className="text-xs font-semibold uppercase tracking-wide">Echoes</span>
                 {unreadCount > 0 && (
                   <Badge variant="destructive" className="absolute -top-1 -right-1 px-1.5 py-0.5 text-[10px] min-w-[1.25rem] h-5 flex items-center justify-center animate-pulse">
                     {unreadCount}
                   </Badge>
                 )}
               </Button>
             </SheetTrigger>
             <SheetContent className="bg-black border-l border-white/10 w-full sm:max-w-md">
               <SheetHeader className="mb-6">
                 <SheetTitle className="text-2xl font-headline text-white">Your Echoes</SheetTitle>
                 <SheetDescription className="text-zinc-400">
                   Messages dropped by other users at the venue.
                 </SheetDescription>
               </SheetHeader>
               <ScrollArea className="h-[calc(100vh-180px)] mt-4">
                 {notes.length === 0 ? (
                   <div className="flex flex-col items-center justify-center h-64 text-zinc-600">
                     <Mail className="h-12 w-12 mb-4 opacity-10" />
                     <p className="text-sm italic">The air is quiet... for now.</p>
                   </div>
                 ) : (
                   <div className="space-y-4 pr-4">
                     {notes.map((note) => (
                       <div 
                         key={note.id} 
                         className={`p-4 rounded-xl border transition-all cursor-pointer ${
                           note.isRead 
                           ? 'bg-zinc-900/50 border-white/5 opacity-70' 
                           : 'bg-accent/10 border-accent/30'
                         }`}
                         onClick={() => onMarkRead(note.id)}
                       >
                         <div className="flex justify-between items-start mb-2">
                           <span className="font-bold text-accent text-sm">{note.senderNickname}</span>
                           <span className="text-[10px] text-zinc-500 uppercase font-mono">
                             {isMounted ? formatDistanceToNow(new Date(note.timestamp), { addSuffix: true }) : 'just now'}
                           </span>
                         </div>
                         <p className="text-sm text-zinc-200 leading-relaxed font-light">{note.content}</p>
                       </div>
                     ))}
                   </div>
                 )}
               </ScrollArea>
             </SheetContent>
           </Sheet>

          <Button variant="ghost" onClick={onCheckOut} className="gap-2 text-zinc-400 hover:text-red-400 hover:bg-red-400/10 rounded-full h-10">
            <LogOut className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase">Exit</span>
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-20">
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
