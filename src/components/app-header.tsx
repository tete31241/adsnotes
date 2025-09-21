'use client';

import Link from 'next/link';
import { Plus, Mic, Search, BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';
import VoiceRecorder from '@/components/voice-recorder';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function AppHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchQuery) {
      params.set('q', searchQuery);
    } else {
      params.delete('q');
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
      <SidebarTrigger className="lg:hidden" />

      <Link href="/notes" className="hidden items-center gap-2 font-bold lg:flex">
        <BrainCircuit className="h-6 w-6 text-primary" />
        <span className="text-lg">AdNotes</span>
      </Link>

      <div className="relative ml-auto flex-1 md:grow-0">
        <form onSubmit={handleSearch}>
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search notes..."
              className="w-full rounded-lg bg-secondary pl-8 md:w-[200px] lg:w-[320px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
        </form>
      </div>
      <div className="flex items-center gap-2">
        <VoiceRecorder />
        <Button asChild>
          <Link href="/notes/new">
            <Plus className="mr-0 md:mr-2 h-4 w-4" />
            <span className="hidden md:inline">New Note</span>
          </Link>
        </Button>
      </div>
    </header>
  );
}
