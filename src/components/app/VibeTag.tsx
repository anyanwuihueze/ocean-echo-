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
        "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border transition-all duration-200 uppercase tracking-wider",
        isSelected
          ? 'bg-accent text-accent-foreground border-accent-foreground/50 shadow-lg'
          : 'bg-white/5 border-white/10 text-white/70',
        onClick && isInteractive
          ? 'cursor-pointer hover:bg-accent/80 hover:text-white hover:border-accent shadow-sm'
          : 'cursor-default'
      )}
    >
      <VibeIcon className="h-3 w-3" />
      <span>{vibe.label}</span>
    </TagElement>
  );
}
