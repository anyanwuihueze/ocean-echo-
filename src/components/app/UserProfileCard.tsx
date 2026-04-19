"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { VibeTag } from '@/components/app/VibeTag';
import type { UserProfile, Vibe } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { MessageSquare, Send, Sparkle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from '@/components/ui/textarea';

interface UserProfileCardProps {
  user: UserProfile;
  isCurrentUser?: boolean;
  currentUserVibes?: Vibe[];
  onSendNote?: (userId: string, content: string) => void;
}

export function UserProfileCard({ 
  user, 
  isCurrentUser = false, 
  currentUserVibes = [],
  onSendNote 
}: UserProfileCardProps) {
  const { toast } = useToast();
  const [noteContent, setNoteContent] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Calculate matching vibes to prove PMF concept
  const matchingVibeCount = user.vibeTags.filter(v => 
    currentUserVibes.some(cv => cv.id === v.id)
  ).length;

  const handleVibeClick = (vibeLabel: string) => {
    if (isCurrentUser) return;
    toast({
      title: `Signal sent to ${user.nickname}!`,
      description: `You're feeling the "${vibeLabel}" vibe too.`,
    });
  };

  const handleSend = () => {
    if (!noteContent.trim()) return;
    onSendNote?.(user.id, noteContent);
    toast({
      title: "Echo dropped!",
      description: `Your note is waiting for ${user.nickname}.`,
    });
    setNoteContent('');
    setIsDialogOpen(false);
  };

  return (
    <Card className={cn(
      "group relative overflow-hidden bg-zinc-950/50 backdrop-blur-xl border-white/5 transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(var(--accent),0.15)]",
      matchingVibeCount > 0 && !isCurrentUser && "border-accent/20"
    )}>
      {matchingVibeCount > 0 && !isCurrentUser && (
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-3 py-1 bg-accent/20 backdrop-blur-md rounded-full border border-accent/30 animate-pulse">
          <Sparkle className="h-3 w-3 text-accent fill-accent" />
          <span className="text-[9px] font-bold text-accent uppercase tracking-tighter">Vibe Match</span>
        </div>
      )}

      <CardHeader className="p-0">
        <div className="relative aspect-[4/5]">
          <Image
            src={user.avatarUrl}
            alt={`Avatar of ${user.nickname}`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            data-ai-hint="portrait person"
          />
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent",
              isCurrentUser && "ring-2 ring-inset ring-accent/50"
            )}
          ></div>
          
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
            <div className="space-y-0.5">
              <h2 className="font-bold text-2xl text-white tracking-tight drop-shadow-2xl">
                {user.nickname}
                {isCurrentUser && <span className="text-[10px] uppercase font-medium text-accent ml-2 opacity-80 tracking-widest">You</span>}
              </h2>
              {!isCurrentUser && (
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-[0.2em]">Nearby</p>
              )}
            </div>
            
            {!isCurrentUser && (
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="icon" variant="ghost" className="rounded-full h-10 w-10 bg-white/10 hover:bg-accent text-white backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-300">
                    <MessageSquare className="h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[400px] bg-zinc-950 border-white/5 rounded-3xl overflow-hidden shadow-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-white tracking-tight">Drop a Note to {user.nickname}</DialogTitle>
                    <DialogDescription className="text-zinc-500 font-medium italic">
                      Start an "Echo" that lasts as long as your session.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-6">
                    <Textarea
                      placeholder="Say something interesting..."
                      value={noteContent}
                      onChange={(e) => setNoteContent(e.target.value)}
                      className="bg-zinc-900/50 border-white/5 focus-visible:ring-accent min-h-[140px] rounded-2xl p-4 text-white placeholder:text-zinc-700 text-lg leading-relaxed"
                    />
                  </div>
                  <DialogFooter>
                    <Button onClick={handleSend} className="w-full h-12 gap-3 bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-xl text-lg transition-all duration-300">
                      <Send className="h-5 w-5" />
                      Send Echo
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 bg-zinc-950/50">
        <div className="flex flex-wrap gap-2">
          {user.vibeTags.map((vibe) => {
            const isMatch = currentUserVibes.some(cv => cv.id === vibe.id);
            return (
              <VibeTag
                key={vibe.id}
                vibe={vibe}
                isSelected={isMatch}
                onClick={() => handleVibeClick(vibe.label)}
                isInteractive={!isCurrentUser}
              />
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
