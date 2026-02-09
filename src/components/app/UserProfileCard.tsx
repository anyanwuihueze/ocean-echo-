import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { VibeTag } from '@/components/app/VibeTag';
import type { UserProfile } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface UserProfileCardProps {
  user: UserProfile;
  isCurrentUser?: boolean;
}

export function UserProfileCard({ user, isCurrentUser = false }: UserProfileCardProps) {
  const { toast } = useToast();

  const handleVibeClick = (vibeLabel: string) => {
    if (isCurrentUser) return;
    toast({
      title: `Reacted to ${user.nickname}'s vibe!`,
      description: `You sent a signal for "${vibeLabel}".`,
    });
  };

  return (
    <Card className="overflow-hidden bg-card/70 backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20">
      <CardHeader className="p-0">
        <div className="relative">
          <Image
            src={user.avatarUrl}
            alt={`Avatar of ${user.nickname}`}
            width={300}
            height={300}
            className="w-full h-auto aspect-square object-cover"
            data-ai-hint="portrait person"
          />
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent",
              isCurrentUser && "ring-2 ring-inset ring-accent"
            )}
          ></div>
           {!isCurrentUser && (
             <div className="absolute top-2 left-2 animate-pulse-glow rounded-full" />
           )}
           <h2 className="absolute bottom-2 left-4 font-headline text-2xl text-white drop-shadow-md">
            {user.nickname}
            {isCurrentUser && " (You)"}
           </h2>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex flex-wrap gap-2">
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
