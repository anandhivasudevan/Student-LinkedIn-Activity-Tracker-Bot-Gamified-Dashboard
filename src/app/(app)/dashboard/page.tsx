import { Scorecard } from '@/components/dashboard/Scorecard';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { AchievementsSection } from '@/components/dashboard/AchievementsSection';
import { getStudentProfile, getStudentActivities, getStudentAchievements } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Assume we have a way to get the current logged-in student's ID
// For this example, we'll hardcode it to Alice's ID.
const CURRENT_STUDENT_ID = '123';

export default async function DashboardPage() {
  const student = await getStudentProfile(CURRENT_STUDENT_ID);
  const activities = await getStudentActivities(CURRENT_STUDENT_ID);


  if (!student) {
    return (
       <div className="container mx-auto p-4 md:p-8">
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                 Could not load student profile. Please try again later.
                </AlertDescription>
            </Alert>
       </div>
    );
  }

 const achievements = await getStudentAchievements(student);


  return (
    <div className="container mx-auto p-4 md:p-8 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Your LinkedIn Activity Dashboard</h1>

      {/* Scorecard Section */}
      <Scorecard student={student} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Feed Section */}
        <ActivityFeed activities={activities} />

        {/* Achievements Section */}
        <AchievementsSection achievements={achievements} />
      </div>
    </div>
  );
}

export const revalidate = 60; // Revalidate data every 60 seconds
