import type { LucideIcon } from 'lucide-react';

export type BadgeType = 'Bronze' | 'Silver' | 'Gold' | 'None';

export interface Student {
  studentId: string;
  name: string;
  linkedinProfile: string;
  profilePictureUrl?: string;
  totalPosts: number;
  certificationsCompleted: number;
  engagements: number;
  lastActive: string; // ISO date string
  score: number;
  strikes: number;
  currentRank: number;
  badge: BadgeType;
}

export type ActivityType = 'Post' | 'Certification' | 'Engagement' | 'Strike';

export interface Activity {
  id: string;
  type: ActivityType;
  points: number;
  timestamp: string; // ISO date string
  description: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon | React.ElementType; // Allow Lucide icons or custom SVG components
  earned: boolean;
  progress?: number; // Optional progress (0-100)
  goal?: number; // Optional goal for progress bar
}
