import type { Student, BadgeType } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BadgeDisplay } from '@/components/common/BadgeDisplay';
import { ProfileAvatar } from '@/components/common/ProfileAvatar';
import { Crown, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface LeaderboardTableProps {
  students: Student[];
  currentStudentId?: string;
}

const RankIndicator = ({ rank }: { rank: number }) => {
  if (rank === 1) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Crown className="h-5 w-5 text-yellow-500" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Top Performer</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  if (rank <= 3) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
             <Star className="h-5 w-5 text-blue-400" />
          </TooltipTrigger>
          <TooltipContent>
             <p>Elite Achiever</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  return <span className="font-semibold">{rank}</span>;
};

export function LeaderboardTable({ students, currentStudentId }: LeaderboardTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[60px] text-center">Rank</TableHead>
          <TableHead>Student</TableHead>
          <TableHead className="text-center hidden sm:table-cell">Badge</TableHead>
          <TableHead className="text-right w-[100px]">Score</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((student) => (
          <TableRow
            key={student.studentId}
            className={cn(student.studentId === currentStudentId ? 'bg-accent/10' : '')}
            >
            <TableCell className="text-center">
                <div className="flex justify-center items-center h-full">
                 <RankIndicator rank={student.currentRank} />
                </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-3">
                <ProfileAvatar src={student.profilePictureUrl} name={student.name} size="sm" />
                <span className="font-medium">{student.name}</span>
              </div>
            </TableCell>
            <TableCell className="text-center hidden sm:table-cell">
               <div className="flex justify-center items-center h-full">
                <BadgeDisplay badge={student.badge} size="sm" />
               </div>
            </TableCell>
            <TableCell className="text-right font-semibold">{student.score}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
