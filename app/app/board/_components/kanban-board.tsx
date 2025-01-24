'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function KanbanBoard() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [kanbanBoardSections, setKanbanBoardSections] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const fetchKanbanData = async () => {
      try {
        const data = await fetch('/api/job-categories', {
          method: 'GET'
        });
        const sections = await data.json();

        setKanbanBoardSections(sections);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching job categories:', error);
      }
    };

    fetchKanbanData();
  }, []);

  return (
    <div className={`grid h-full grid-cols-4 gap-4`}>
      {isLoading
        ? Array(4)
            .fill(null)
            .map((_, index) => (
              <div key={index} className="flex h-full w-full min-w-64 flex-col gap-4">
                <header className="relative flex min-h-10 flex-row items-center rounded-lg border bg-card px-3">
                  <Skeleton className="h-6 w-1/3" />
                  <Skeleton className="ml-2 size-6" />
                  <Skeleton className="absolute right-2.5 top-1/2 size-5 -translate-y-1/2" />
                </header>

                <section className="flex h-full flex-col gap-2 rounded-lg border bg-muted p-2">
                  {Array(index % 2 === 0 ? 1 : 2)
                    .fill(null)
                    .map((_, index) => (
                      <Card key={index} className="rounded-md">
                        <CardHeader className="p-3">
                          <Skeleton className="h-6 w-1/3" />
                        </CardHeader>
                        <CardContent className="p-3 pt-0">
                          <Skeleton className="h-6 w-1/3" />
                        </CardContent>
                      </Card>
                    ))}
                </section>
              </div>
            ))
        : kanbanBoardSections.map(({ id, name }) => (
            <div key={id} className="flex flex-col gap-4">
              <header className="relative flex min-h-10 flex-row items-center rounded-lg border bg-card px-3">
                <span className="text-card-foreground">{name}</span>
                <Badge className="ml-2 bg-indigo-500 px-1.5 hover:bg-indigo-500">2</Badge>
                <Link href="board/new">
                  <Plus className="absolute right-0 top-1/2 aspect-square size-10 -translate-y-1/2 cursor-pointer p-2.5 text-muted-foreground hover:text-card-foreground" />
                </Link>
              </header>
              <section className="flex h-full flex-col gap-2 rounded-lg border bg-muted p-2">
                <Card className="rounded-md">
                  <CardHeader className="p-3">Header</CardHeader>
                  <CardContent className="p-3 pt-0">Content</CardContent>
                </Card>
              </section>
            </div>
          ))}
    </div>
  );
}
