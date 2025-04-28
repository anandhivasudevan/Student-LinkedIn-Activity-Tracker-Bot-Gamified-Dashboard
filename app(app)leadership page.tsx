import { LeaderboardTable } from '@/components/leaderboard/LeaderboardTable';
import { getRankedStudents, getMotivationalMessage } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Assume we get the current student's ID (e.g., from auth)
const CURRENT_STUDENT_ID = '123'; // Example: Alice

export default async function LeaderboardPage() {
  const students = await getRankedStudents();
  const currentUser = students.find(s => s.studentId === CURRENT_STUDENT_ID);
  const motivationalMessage = currentUser ? getMotivationalMessage(currentUser.currentRank, students) : null;


  if (!students || students.length === 0) {
     return (
       <div className="container mx-auto p-4 md:p-8">
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                 Could not load leaderboard data. Please try again later.
                </AlertDescription>
            </Alert>
       </div>
     )
  }


  return (
    <div className="container mx-auto p-4 md:p-8 space-y-6">
      <h1 className="text-3xl font-bold">LinkUp Leaderboard</h1>

        {motivationalMessage && currentUser && (
             <Alert className="border-accent bg-accent/5 text-accent-foreground">
                <AlertTitle>Hey {currentUser.name}!</AlertTitle>
                <AlertDescription>
                    {motivationalMessage}
                </AlertDescription>
             </Alert>
        )}

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Student Rankings</CardTitle>
          <CardDescription>Top students based on LinkedIn activity score.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
           <LeaderboardTable students={students} currentStudentId={CURRENT_STUDENT_ID} />
        </CardContent>
      </Card>
    </div>
  );
}

export const revalidate = 60; // Revalidate data every 60 seconds
