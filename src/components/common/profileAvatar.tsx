import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ProfileAvatarProps {
  src?: string;
  name: string;
  className?: string;
  size?: 'sm' | 'default' | 'lg';
}

const sizeClasses = {
  sm: 'h-8 w-8 text-xs',
  default: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
}

// Function to get initials from a name
const getInitials = (name: string): string => {
  const names = name.split(' ');
  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase();
  }
  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
};

export function ProfileAvatar({ src, name, className, size = 'default' }: ProfileAvatarProps) {
  const initials = getInitials(name);

  return (
    <Avatar className={cn(sizeClasses[size], className)}>
      <AvatarImage src={src} alt={name} />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
}
