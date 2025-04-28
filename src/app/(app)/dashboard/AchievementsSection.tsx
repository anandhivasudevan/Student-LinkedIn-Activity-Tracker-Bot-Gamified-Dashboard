import type { Achievement } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { CheckCircle2 } from 'lucide-react';


interface AchievementsSectionProps {
  achievements: Achievement[];
}

export function AchievementsSection({ achievements }: AchievementsSectionProps) {
  const earnedAchievements = achievements.filter(a => a.earned);
  const inProgressAchievements = achievements.filter(a => !a.earned && a.progress !== undefined && a.progress > 0);

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Achievements & Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Earned Achievements Badges */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Earned Badges</h3>
          {earnedAchievements.length > 0 ? (
              <TooltipProvider>
                <div className="flex flex-wrap gap-3">
                  {earnedAchievements.map((achievement) => (
                    <Tooltip key={achievement.id}>
                      <TooltipTrigger asChild>
                         <div className="relative flex flex-col items-center p-3 border rounded-lg bg-accent/20 border-accent/50 w-24 text-center cursor-default">
                          <achievement.icon className="h-8 w-8 text-accent mb-1" />
                          <span className="text-xs font-medium text-accent-foreground truncate w-full" title={achievement.name}>{achievement.name}</span>
                           <CheckCircle2 className="absolute top-1 right-1 h-4 w-4 text-green-600 bg-background rounded-full" />
                         </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{achievement.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </TooltipProvider>
          ) : (
              <p className="text-sm text-muted-foreground">Keep engaging to earn badges!</p>
          )}
        </div>

        {/* Progress Bars for In-Progress Achievements */}
        {inProgressAchievements.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">In Progress</h3>
            <div className="space-y-4">
              {inProgressAchievements.map((achievement) => (
                <div key={achievement.id}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium flex items-center gap-2">
                      <achievement.icon className="h-4 w-4 text-muted-foreground" />
                      {achievement.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {achievement.progress?.toFixed(0)}%
                      {achievement.goal && ` (${(achievement.progress ?? 0) / 100 * achievement.goal}/${achievement.goal})`}
                    </span>
                  </div>
                  <Progress value={achievement.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">{achievement.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
