import type { Student } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BadgeDisplay } from '@/components/common/BadgeDisplay';
import { BarChart, BookOpenCheck, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScorecardProps {
  student: Student;
}

interface StatItemProps {
  icon: React.ElementType;
  label: string;
  value: number | string;
  iconColor?: string;
}

function StatItem({ icon: Icon, label, value, iconColor }: StatItemProps) {
  return (
    <div className="flex items-center space-x-2">
      <Icon className={cn("h-5 w-5 text-muted-foreground", iconColor)} />
      <div>
        <p className="text-sm font-medium leading-none">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

export function Scorecard({ student }: ScorecardProps) {
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">Your Scorecard</CardTitle>
          <BadgeDisplay badge={student.badge} size="lg" />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-8">
        <div className="text-center sm:text-left">
          <p className="text-6xl font-bold text-primary">{student.score}</p>
          <p className="text-sm text-muted-foreground">Total Points</p>
        </div>
        <div className="grid grid-cols-3 gap-4 pt-2 sm:pt-0">
          <StatItem icon={BarChart} label="Total Posts" value={student.totalPosts} />
          <StatItem icon={BookOpenCheck} label="Certifications" value={student.certificationsCompleted} />
          <StatItem
            icon={ShieldAlert}
            label="Strikes"
            value={student.strikes}
            iconColor={student.strikes > 0 ? 'text-destructive' : undefined}
           />
        </div>
      </CardContent>
    </Card>
  );
}
