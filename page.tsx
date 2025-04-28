'use client'; // Required for useRouter

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';


export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the dashboard page immediately
    router.replace('/dashboard');
  }, [router]);

  // Optional: Show a loading indicator while redirecting
  return (
    <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-2 text-muted-foreground">Loading LinkUp Leaderboard...</p>
    </div>
    );
}
