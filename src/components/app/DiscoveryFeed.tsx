"use client";

import { useState, useEffect } from 'react';
import { UserProfileCard } from '@/components/app/UserProfileCard';
import { mockUsers } from '@/lib/data';
import type { UserProfile, Note } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { CountdownTimer } from './CountdownTimer';
import { LogOut, Mail, Zap, User } from 'lucide-react';
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
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const otherUsers = mockUsers.filter(user => user.id !== currentUser.id);
  const unreadCount = notes.filter(n => !n.isRead).length;

  return (
    <div className="w-full max-w-7xl px-4 py-8 mx-auto">
      <header className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-12 p-8 bg-zinc-900/20 backdrop-blur-3xl rounded-[2.5rem] border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="text-center sm:text-left flex items-center gap-6">
          <div className="relative h-14 w-14 rounded-2xl overflow-hidden border border-accent/30 shadow-[0_0_20px_rgba(var(--accent),0.2)]">
            <img src={currentUser.avatarUrl} alt="Me" className="object-cover h-full w-full" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white tracking-tighter flex items-center gap-2">
              Echo Corner <span className="text-accent">.</span>
            </h1>
            <div className="flex items-center gap-3 mt-1">
              <p className="text-zinc-600 text-[9px] uppercase tracking-[0.3em] font-black">Expiring In:</p>
              <CountdownTimer />
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onSimulateEcho}
            className="border-accent/10 bg-accent/5 text-accent hover:bg-accent/10 text-[9px] uppercase tracking-[0.2em] font-black h-10 px-5 rounded-xl border-dashed"
          >
            <Zap className="h-3 w-3 mr-2 fill-accent" />
            Simulate Echo
          </Button>

          <AiVibeCurator currentVibes={currentUser.vibeTags.map(v => v.label)} />
           
           <Sheet open={isNotesOpen} onOpenChange={setIsNotesOpen}>
             <SheetTrigger asChild>
               <Button variant="outline" className="relative gap-4 bg-white/5 border-white/10 hover:bg-white/10 rounded-xl px-8 h-12 group transition-all duration-300">
                 <Mail className={cn("h-5 w-5 transition-transform duration-300", unreadCount > 0 && "group-hover:scale-110")} />
                 <span className="text-xs font-black uppercase tracking-[0.2em] text-zinc-300">Echoes</span>
                 {unreadCount > 0 && (
                   <Badge variant="destructive" className="absolute -top-2 -right-2 px-2 py-0.5 text-[10px] font-black min-w-[1.5rem] h-6 flex items-center justify-center animate-bounce border-2 border-zinc-950 rounded-lg">
                     {unreadCount}
                   </Badge>
                 )}
               </Button>
             </SheetTrigger>
             <SheetContent className="bg-zinc-950 border-l border-white/5 w-full sm:max-w-md p-8">
               <SheetHeader className="mb-10">
                 <SheetTitle className="text-4xl font-black text-white tracking-tighter">Your Echoes</SheetTitle>
                 <SheetDescription className="text-zinc-500 text-sm font-medium leading-relaxed">
                   Real-time sparks from the crowd tonight.
                 </SheetDescription>
               </SheetHeader>
               <ScrollArea className="h-[calc(100vh-220px)] mt-4 pr-4">
                 {notes.length === 0 ? (
                   <div className="flex flex-col items-center justify-center h-80 text-zinc-800">
                     <Mail className="h-20 w-20 mb-6 opacity-5" />
                     <p className="text-sm font-bold uppercase tracking-widest italic opacity-20">Silence is golden...</p>
                   </div>
                 ) : (
                   <div className="space-y-6 pb-20">
                     {notes.map((note) => (
                       <div 
                         key={note.id} 
                         className={cn(
                           "p-6 rounded-3xl border transition-all duration-500 cursor-pointer",
                           note.isRead 
                           ? 'bg-zinc-900/20 border-white/5 opacity-40' 
                           : 'bg-accent/5 border-accent/20 shadow-[0_10px_30px_rgba(var(--accent),0.05)] ring-1 ring-accent/10'
                         )}
                         onClick={() => onMarkRead(note.id)}
                       >
                         <div className="flex justify-between items-center mb-4">
                           <div className="flex items-center gap-2">
                             <div className="h-6 w-6 rounded-full bg-accent/20 flex items-center justify-center">
                               <User className="h-3 w-3 text-accent" />
                             </div>
                             <span className="font-black text-accent text-[10px] uppercase tracking-widest">{note.senderNickname}</span>
                           </div>
                           <span className="text-[8px] text-zinc-600 uppercase font-black tracking-widest">
                             {mounted ? formatDistanceToNow(new Date(note.timestamp), { addSuffix: true }) : '---'}
                           </span>
                         </div>
                         <p className="text-sm text-zinc-300 leading-relaxed font-medium">{note.content}</p>
                       </div>
                     ))}
                   </div>
                 )}
               </ScrollArea>
             </SheetContent>
           </Sheet>

          <Button variant="ghost" onClick={onCheckOut} className="gap-3 text-zinc-600 hover:text-red-500 hover:bg-red-500/5 rounded-xl h-12 px-6 transition-colors">
            <LogOut className="h-4 w-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Exit Venue</span>
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 pb-32">
        {/* Current User Card First */}
        <UserProfileCard 
          user={currentUser} 
          isCurrentUser={true}
          currentUserVibes={currentUser.vibeTags}
        />
        
        {/* Other Users */}
        {otherUsers.map((user) => (
          <UserProfileCard 
            key={user.id} 
            user={user} 
            currentUserVibes={currentUser.vibeTags}
            onSendNote={onSendNote}
          />
        ))}
      </div>
    </div>
  );
}
