import type { Student, Activity, BadgeType, Achievement } from '@/types';
import { Award, BarChart, BookOpenCheck, Bot, Crown, Star, ThumbsUp, UserCheck } from 'lucide-react';
import { differenceInDays, parseISO } from 'date-fns';

// Mock Student Data
const mockStudents: Student[] = [
  {
    studentId: '123',
    name: 'Alice Johnson',
    linkedinProfile: 'https://linkedin.com/in/alicejohnson',
    profilePictureUrl: 'https://picsum.photos/seed/alice/100/100',
    totalPosts: 18,
    certificationsCompleted: 4,
    engagements: 75,
    lastActive: '2024-07-28T10:00:00Z',
    score: 0, // Calculated later
    strikes: 0, // Calculated later
    currentRank: 0, // Calculated later
    badge: 'None', // Calculated later
  },
  {
    studentId: '456',
    name: 'Bob Williams',
    linkedinProfile: 'https://linkedin.com/in/bobwilliams',
    profilePictureUrl: 'https://picsum.photos/seed/bob/100/100',
    totalPosts: 10,
    certificationsCompleted: 5,
    engagements: 110,
    lastActive: '2024-07-10T15:30:00Z', // Inactive > 14 days
    score: 0,
    strikes: 0,
    currentRank: 0,
    badge: 'None',
  },
  {
    studentId: '789',
    name: 'Charlie Brown',
    linkedinProfile: 'https://linkedin.com/in/charliebrown',
    profilePictureUrl: 'https://picsum.photos/seed/charlie/100/100',
    totalPosts: 5,
    certificationsCompleted: 1,
    engagements: 30,
    lastActive: '2024-07-25T08:00:00Z',
    score: 0,
    strikes: 0,
    currentRank: 0,
    badge: 'None',
  },
  {
    studentId: '101',
    name: 'Diana Miller',
    linkedinProfile: 'https://linkedin.com/in/dianamiller',
    // No profile picture
    totalPosts: 25,
    certificationsCompleted: 6,
    engagements: 150,
    lastActive: '2024-07-29T12:00:00Z',
    score: 0,
    strikes: 0,
    currentRank: 0,
    badge: 'None',
  },
    {
    studentId: '112',
    name: 'Ethan Davis',
    linkedinProfile: 'https://linkedin.com/in/ethandavis',
    profilePictureUrl: 'https://picsum.photos/seed/ethan/100/100',
    totalPosts: 2,
    certificationsCompleted: 0,
    engagements: 10,
    lastActive: '2024-07-20T11:00:00Z',
    score: 0,
    strikes: 0,
    currentRank: 0,
    badge: 'None',
  },
];

// Mock Activity Data for a specific student (e.g., Alice Johnson)
const mockActivities: Activity[] = [
  { id: 'a1', type: 'Post', points: 10, timestamp: '2024-07-28T10:00:00Z', description: 'Shared an article on AI advancements.' },
  { id: 'a2', type: 'Certification', points: 20, timestamp: '2024-07-26T14:30:00Z', description: 'Completed "Cloud Computing Basics".' },
  { id: 'a3', type: 'Engagement', points: 5, timestamp: '2024-07-25T09:15:00Z', description: 'Liked a post by a connection.' },
  { id: 'a4', type: 'Post', points: 10, timestamp: '2024-07-22T11:00:00Z', description: 'Posted about a recent project success.' },
  { id: 'a5', type: 'Engagement', points: 5, timestamp: '2024-07-20T16:45:00Z', description: 'Commented on an industry trend discussion.' },
];


// --- Calculation Logic ---

/**
 * Calculates the score and strikes for a student.
 * @param student - The student data.
 * @returns An object containing the calculated score and strikes.
 */
export function calculateScoreAndStrikes(student: Omit<Student, 'score' | 'strikes' | 'currentRank' | 'badge'>): { score: number; strikes: number } {
  const score =
    (student.totalPosts * 10) +
    (student.certificationsCompleted * 20) +
    (student.engagements * 5);

  const lastActiveDate = parseISO(student.lastActive);
  const daysInactive = differenceInDays(new Date(), lastActiveDate);
  const strikes = daysInactive > 14 ? 1 : 0;

  return { score, strikes };
}

/**
 * Assigns a badge based on the score.
 * @param score - The student's score.
 * @returns The badge type.
 */
export function assignBadge(score: number): BadgeType {
  if (score >= 151) return 'Gold';
  if (score >= 51) return 'Silver';
  if (score >= 0) return 'Bronze'; // Everyone starts with Bronze if score >= 0
  return 'None'; // Should not happen with current logic, but included for safety
}

/**
 * Processes the list of students to calculate scores, strikes, badges, and assign ranks.
 * @param students - Array of student data.
 * @returns The processed and ranked list of students.
 */
export function processAndRankStudents(students: Omit<Student, 'score' | 'strikes' | 'currentRank' | 'badge'>[]): Student[] {
  const processedStudents = students.map(student => {
    const { score, strikes } = calculateScoreAndStrikes(student);
    const badge = assignBadge(score);
    return { ...student, score, strikes, badge, currentRank: 0 }; // Initialize rank
  });

  // Sort by score descending, then by certifications, then posts
  const sortedStudents = processedStudents.sort(
    (a, b) =>
      b.score - a.score ||
      b.certificationsCompleted - a.certificationsCompleted ||
      b.totalPosts - a.totalPosts
  );

  // Assign ranks
  return sortedStudents.map((student, idx) => ({
    ...student,
    currentRank: idx + 1,
  }));
}

/**
 * Gets the list of all students, processed and ranked.
 * Simulates an async data fetch.
 * @returns A promise resolving to an array of Student objects.
 */
export async function getRankedStudents(): Promise<Student[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 50));
  return processAndRankStudents(mockStudents);
}

/**
 * Gets the profile data for a specific student.
 * Simulates an async data fetch.
 * @param studentId - The ID of the student.
 * @returns A promise resolving to the Student object or undefined if not found.
 */
export async function getStudentProfile(studentId: string): Promise<Student | undefined> {
    // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 50));
  const rankedStudents = processAndRankStudents(mockStudents);
  return rankedStudents.find(s => s.studentId === studentId);
}

/**
 * Gets the recent activity for a specific student.
 * Simulates an async data fetch.
 * @param studentId - The ID of the student.
 * @returns A promise resolving to an array of Activity objects.
 */
export async function getStudentActivities(studentId: string): Promise<Activity[]> {
   // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 50));
  // In a real app, filter activities based on studentId
  // For now, return the mock activities for Alice (ID '123') or empty array
  return studentId === '123' ? mockActivities : [];
}


/**
 * Gets the achievements for a specific student.
 * Simulates calculation based on student data.
 * @param student - The student object.
 * @returns A promise resolving to an array of Achievement objects.
 */
export async function getStudentAchievements(student: Student): Promise<Achievement[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 50));

  const achievements: Achievement[] = [
    {
      id: 'achieve1',
      name: 'Consistent Poster',
      description: 'Make 10 posts on LinkedIn.',
      icon: BarChart,
      goal: 10,
      progress: Math.min(100, (student.totalPosts / 10) * 100),
      earned: student.totalPosts >= 10,
    },
    {
      id: 'achieve2',
      name: 'Certification Master',
      description: 'Complete 5 certifications.',
      icon: BookOpenCheck,
      goal: 5,
      progress: Math.min(100, (student.certificationsCompleted / 5) * 100),
      earned: student.certificationsCompleted >= 5,
    },
    {
        id: 'achieve3',
        name: 'Rising Star',
        description: 'Make 10 Posts',
        icon: Star, // Placeholder, can customize
        goal: 10,
        progress: Math.min(100, (student.totalPosts / 10) * 100),
        earned: student.totalPosts >= 10,
    },
    {
        id: 'achieve4',
        name: 'Networking Ninja',
        description: 'Reach 100 Post Engagements',
        icon: ThumbsUp,
        goal: 100,
        progress: Math.min(100, (student.engagements / 100) * 100),
        earned: student.engagements >= 100,
    },
    {
        id: 'achieve5',
        name: 'Certification Champion',
        description: 'Complete 5 Certifications',
        icon: Award,
        goal: 5,
        progress: Math.min(100, (student.certificationsCompleted / 5) * 100),
        earned: student.certificationsCompleted >= 5,
    },
    {
        id: 'achieve6',
        name: 'Top Performer',
        description: 'Reach #1 on the Leaderboard',
        icon: Crown,
        earned: student.currentRank === 1,
        progress: student.currentRank === 1 ? 100 : 0, // Simple binary progress
    },
    {
        id: 'achieve7',
        name: 'Elite Achiever',
        description: 'Reach Top 3 on the Leaderboard',
        icon: UserCheck, // Using UserCheck as a proxy for Elite
        earned: student.currentRank <= 3 && student.currentRank > 0,
        progress: student.currentRank <= 3 && student.currentRank > 0 ? 100 : 0, // Simple binary progress
    },
    // Add other achievements like "Networking Ninja", "Certification Champion", etc.
  ];

  return achievements;
}

/**
 * Gets motivational message based on rank.
 * @param rank - The student's current rank.
 * @param rankedStudents - The full list of ranked students.
 * @returns A motivational string or null.
 */
export function getMotivationalMessage(rank: number, rankedStudents: Student[]): string | null {
    if (rank === 0) return null; // Not ranked yet

    if (rank === 1) {
        return "You're leading the pack! Keep up the great work!";
    }
    if (rank <= 3) {
        return "Top 3 Achiever unlocked! Amazing performance!";
    }

    // Find points needed for next rank
    const currentStudent = rankedStudents[rank - 1];
    const nextRankStudent = rankedStudents[rank - 2]; // Student ranked higher

    if (nextRankStudent && currentStudent) {
        const pointsDifference = nextRankStudent.score - currentStudent.score;
        if (pointsDifference > 0) {
            return `You’re ${pointsDifference} points away from Rank #${rank - 1}!`;
        } else {
             return "You're tied! Aim for more certifications or posts to break the tie!";
        }
    }

    return "Keep engaging and climbing the ranks!";
}
