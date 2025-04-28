import type { Activity, ActivityType } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { BarChart, BookOpenCheck, ThumbsUp, ShieldAlert } from 'lucide-react';
import { cn, formatDistanceToNow } from '@/lib/utils';

interface ActivityFeedProps {
  activities: Activity[];
}

const activityIcons: Record<ActivityType, React.ElementType> = {
  Post: BarChart,
  Certification: BookOpenCheck,
  Engagement: ThumbsUp,
  Strike: ShieldAlert,
};

const activityColors: Record<ActivityType, string> = {
    Post: 'text-positive',
    Certification: 'text-positive',
    Engagement: 'text-positive',
    Strike: 'text-destructive',
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-64 pr-4">
          {activities.length > 0 ? (
            <ul className="space-y-4">
              {activities.map((activity, index) => {
                 const Icon = activityIcons[activity.type];
                 const pointColor = activityColors[activity.type];
                 const pointSign = activity.points > 0 ? '+' : ''; // Add '+' for positive points

                 return (
                    <li key={activity.id} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        <Icon className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                         <div className="flex justify-between items-center">
                            <p className="text-sm font-medium text-foreground truncate">{activity.description}</p>
                            <span className={cn("text-sm font-semibold whitespace-nowrap", pointColor)}>
                                {pointSign}{activity.points} pts
                            </span>
                         </div>
                        <p className="text-xs text-muted-foreground">
                          {formatDistanceToNow(activity.timestamp)}
                        </p>
                      </div>
                    </li>
                  );
              })}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">No recent activity found.</p>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
