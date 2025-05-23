mport Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Linkedin } from 'lucide-react';
import { Toaster } from '@/components/ui/toaster'; // Import Toaster

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-secondary">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
            prefetch={false}
          >
            <Linkedin className="h-6 w-6 text-primary" />
            <span className="sr-only">LinkUp Leaderboard</span>
            <span className="font-bold">LinkUp Leaderboard</span>
          </Link>
          <Link
            href="/dashboard"
            className="text-foreground transition-colors hover:text-foreground"
            prefetch={false}
          >
            Dashboard
          </Link>
          <Link
            href="/leaderboard"
            className="text-muted-foreground transition-colors hover:text-foreground"
            prefetch={false}
          >
            Leaderboard
          </Link>
        </nav>
         <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-lg font-semibold"
                prefetch={false}
              >
                <Linkedin className="h-6 w-6 text-primary" />
                 <span className="font-bold">LinkUp Leaderboard</span>
              </Link>
              <Link href="/dashboard" className="hover:text-foreground" prefetch={false}>
                Dashboard
              </Link>
              <Link
                href="/leaderboard"
                className="text-muted-foreground hover:text-foreground"
                prefetch={false}
              >
                Leaderboard
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        {/* Optional: Add User Profile/Logout button here */}
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {children}
      </main>
       <Toaster /> {/* Add Toaster here */}
    </div>
  );
}
