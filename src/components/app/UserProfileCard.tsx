"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { VibeTag } from '@/components/app/VibeTag';
import type { UserProfile } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { MessageSquare, Send } from 'lucide-react';
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
  onSendNote?: (userId: string, content: string) => void;
}

export function UserProfileCard({ user, isCurrentUser = false, onSendNote }: UserProfileCardProps) {
  const { toast } = useToast();
  const [noteContent, setNoteContent] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleVibeClick = (vibeLabel: string) => {
    if (isCurrentUser) return;
    toast({
      title: `Reacted to ${user.nickname}'s vibe!`,
      description: `You sent a signal for "${vibeLabel}".`,
    });
  };

  const handleSend = () => {
    if (!noteContent.trim()) return;
    onSendNote?.(user.id, noteContent);
    toast({
      title: "Note dropped!",
      description: `Your echo has been sent to ${user.nickname}.`,
    });
    setNoteContent('');
    setIsDialogOpen(false);
  };

  return (
    <Card className="group overflow-hidden bg-card/70 backdrop-blur-sm transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/20 border-white/5">
      <CardHeader className="p-0">
        <div className="relative aspect-square">
          <Image
            src={user.avatarUrl}
            alt={`Avatar of ${user.nickname}`}
            fill
            className="object-cover"
            data-ai-hint="portrait person"
          />
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80",
              isCurrentUser && "ring-2 ring-inset ring-accent"
            )}
          ></div>
          
          <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
            <div>
              <h2 className="font-headline text-xl text-white drop-shadow-md">
                {user.nickname}
                {isCurrentUser && <span className="text-xs opacity-60 ml-1">(You)</span>}
              </h2>
            </div>
            
            {!isCurrentUser && (
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="icon" variant="secondary" className="rounded-full h-8 w-8 bg-accent/20 hover:bg-accent text-white backdrop-blur-md border-none">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-black border-white/10">
                  <DialogHeader>
                    <DialogTitle>Drop a Note to {user.nickname}</DialogTitle>
                    <DialogDescription>
                      Share a thought or start a conversation. Your note will appear in their "Echoes".
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <Textarea
                      placeholder="Type your message here..."
                      value={noteContent}
                      onChange={(e) => setNoteContent(e.target.value)}
                      className="bg-zinc-900 border-white/5 focus-visible:ring-accent min-h-[120px]"
                    />
                  </div>
                  <DialogFooter>
                    <Button onClick={handleSend} className="w-full gap-2">
                      <Send className="h-4 w-4" />
                      Send Echo
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-3">
        <div className="flex flex-wrap gap-1.5">
          {user.vibeTags.map((vibe) => (
            <VibeTag
              key={vibe.id}
              vibe={vibe}
              onClick={() => handleVibeClick(vibe.label)}
              isInteractive={!isCurrentUser}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
