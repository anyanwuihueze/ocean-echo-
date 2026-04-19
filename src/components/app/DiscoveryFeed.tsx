
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
  const [mounted, setMounted] = useState(false);
  
  // Prevent hydration mismatch for relative time strings
  useEffect(() => {
    setMounted(true);
  }, []);

  const otherUsers = mockUsers.filter(user => user.id !== currentUser.id);
  const allUsers = [currentUser, ...otherUsers];
  const unreadCount = notes.filter(n => !n.isRead).length;

  return (
    <div className="w-full max-w-5xl px-4 py-8">
      <header className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-12 p-6 bg-zinc-900/40 backdrop-blur-2xl rounded-3xl border border-white/5 shadow-2xl">
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-bold text-white tracking-tight">Echo Corner 🌅</h1>
          <div className="flex items-center justify-center sm:justify-start gap-3 mt-1">
            <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-bold">Session ends in:</p>
            <CountdownTimer />
          </div>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onSimulateEcho}
            className="border-accent/20 bg-accent/5 text-accent hover:bg-accent/10 text-[10px] uppercase tracking-widest h-9 px-4 rounded-full"
          >
            <Zap className="h-3 w-3 mr-2" />
            Test Echo
          </Button>

          <AiVibeCurator currentVibes={currentUser.vibeTags.map(v => v.label)} />
           
           <Sheet open={isNotesOpen} onOpenChange={setIsNotesOpen}>
             <SheetTrigger asChild>
               <Button variant="outline" className="relative gap-3 bg-white/5 border-white/10 hover:bg-white/10 rounded-full px-6 h-10">
                 <Mail className="h-4 w-4" />
                 <span className="text-xs font-bold uppercase tracking-wider">Echoes</span>
                 {unreadCount > 0 && (
                   <Badge variant="destructive" className="absolute -top-1 -right-1 px-1.5 py-0.5 text-[10px] min-w-[1.25rem] h-5 flex items-center justify-center animate-pulse border-2 border-black">
                     {unreadCount}
                   </Badge>
                 )}
               </Button>
             </SheetTrigger>
             <SheetContent className="bg-zinc-950 border-l border-white/5 w-full sm:max-w-md">
               <SheetHeader className="mb-8">
                 <SheetTitle className="text-3xl font-bold text-white tracking-tight">Your Echoes</SheetTitle>
                 <SheetDescription className="text-zinc-500 text-sm">
                   Messages dropped by other users currently at the venue.
                 </SheetDescription>
               </SheetHeader>
               <ScrollArea className="h-[calc(100vh-200px)] mt-4">
                 {notes.length === 0 ? (
                   <div className="flex flex-col items-center justify-center h-64 text-zinc-700">
                     <Mail className="h-16 w-16 mb-4 opacity-10" />
                     <p className="text-sm font-medium italic">The air is quiet... for now.</p>
                   </div>
                 ) : (
                   <div className="space-y-4 pr-4 pb-10">
                     {notes.map((note) => (
                       <div 
                         key={note.id} 
                         className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                           note.isRead 
                           ? 'bg-zinc-900/30 border-white/5 opacity-60' 
                           : 'bg-accent/10 border-accent/30 shadow-[0_0_20px_rgba(var(--accent),0.1)]'
                         }`}
                         onClick={() => onMarkRead(note.id)}
                       >
                         <div className="flex justify-between items-start mb-3">
                           <span className="font-bold text-accent text-xs uppercase tracking-wider">{note.senderNickname}</span>
                           <span className="text-[9px] text-zinc-600 uppercase font-bold tracking-tighter">
                             {mounted ? formatDistanceToNow(new Date(note.timestamp), { addSuffix: true }) : '---'}
                           </span>
                         </div>
                         <p className="text-sm text-zinc-300 leading-relaxed font-light">{note.content}</p>
                       </div>
                     ))}
                   </div>
                 )}
               </ScrollArea>
             </SheetContent>
           </Sheet>

          <Button variant="ghost" onClick={onCheckOut} className="gap-2 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded-full h-10 px-4">
            <LogOut className="h-4 w-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Exit</span>
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-20">
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
