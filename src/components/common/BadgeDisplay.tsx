import type { BadgeType } from '@/types';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface BadgeDisplayProps {
  badge: BadgeType;
  className?: string;
  size?: 'sm' | 'default' | 'lg';
}

const badgeStyles: Record<BadgeType, string> = {
  Gold: 'bg-yellow-400 hover:bg-yellow-400/90 text-yellow-900 border-yellow-500',
  Silver: 'bg-gray-300 hover:bg-gray-300/90 text-gray-800 border-gray-400',
  Bronze: 'bg-orange-300 hover:bg-orange-300/90 text-orange-900 border-orange-400',
  None: 'bg-muted text-muted-foreground border-transparent',
};

const badgeSizes = {
    sm: 'px-2 py-0.5 text-xs',
    default: 'px-2.5 py-0.5 text-xs',
    lg: 'px-3 py-1 text-sm',
}

export function BadgeDisplay({ badge, className, size = 'default' }: BadgeDisplayProps) {
  if (badge === 'None') {
    return null; // Or display a default state if needed
  }

  return (
    <Badge
      variant="outline"
      className={cn(
          'font-semibold',
           badgeStyles[badge],
           badgeSizes[size],
           className
        )}
    >
      {badge}
    </Badge>
  );
}
