import { cn } from '@/lib/utils';
import type { Vibe } from '@/lib/types';

interface VibeTagProps {
  vibe: Vibe;
  isSelected?: boolean;
  onClick?: () => void;
  isInteractive?: boolean;
}

export function VibeTag({ vibe, isSelected, onClick, isInteractive = true }: VibeTagProps) {
  const TagElement = onClick ? 'button' : 'div';
  const VibeIcon = vibe.icon;

  return (
    <TagElement
      type={TagElement === 'button' ? 'button' : undefined}
      onClick={onClick}
      disabled={TagElement === 'button' && !isInteractive}
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-200",
        isSelected
          ? 'bg-accent text-accent-foreground border-accent-foreground/50 shadow-md'
          : 'bg-secondary/50 border-border',
        onClick && isInteractive
          ? 'cursor-pointer hover:bg-accent hover:text-accent-foreground hover:border-accent-foreground/50 hover:shadow-md'
          : 'cursor-default'
      )}
    >
      <VibeIcon className="h-4 w-4" />
      <span>{vibe.label}</span>
    </TagElement>
  );
}
