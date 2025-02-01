import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { getKanbanBoard } from '@/data-access/kanban-board';
import { getSharedBoard } from '@/data-access/shared-board';
import { getCurrentUser } from '@/lib/session';
import Link from 'next/link';
import { ShareForm } from './share-form';

export async function ShareSection() {
  const user = await getCurrentUser();

  const kanbanBoard = await getKanbanBoard(user);

  if (!kanbanBoard) {
    return (
      <section className="mt-8 flex max-w-lg flex-col gap-6">
        <header>
          <h3 className="text-lg font-semibold text-foreground">Share settings</h3>
          <p className="text-base text-muted-foreground">Change here what you want and don't want to share.</p>
        </header>
        <Card className="overflow-hidden">
          <CardContent className="relative pt-6">
            <form className="pointer-events-none grid w-full max-w-lg gap-6">
              <div className="flex flex-row items-center gap-2">
                <Switch id="sharingEnabled" />
                <Label htmlFor="sharingEnabled">Public sharing</Label>
              </div>
              <div className="grid gap-2">
                <Label>Public URL</Label>
                <div className="relative flex flex-row shadow-sm">
                  <span className="flex h-9 items-center rounded-l-md border border-r-0 py-1 pl-3 pr-2 text-muted-foreground md:text-sm">r2r.deanreymen.be/board/</span>
                  <Input className="rounded-l-none pl-2 shadow-none" placeholder="2ed0b87e" />
                </div>
              </div>
              <Button className="ml-auto w-fit">Update share settings</Button>
            </form>
            <div className="absolute inset-0 flex h-full w-full flex-col items-center justify-center bg-background/60 backdrop-blur-sm">
              <h4 className="font-semibold text-foreground">No Board Found</h4>
              <p className="text-center text-sm text-muted-foreground">
                Create a new board to start sharing
                <br /> your content with others.
              </p>
              <Link href={'kanban'}>
                <Button className="mt-3" variant="outline">
                  Get started
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }

  const sharedBoard = await getSharedBoard(kanbanBoard.id);

  return (
    <section className="mt-8 flex max-w-lg flex-col gap-6">
      <header>
        <h3 className="text-lg font-semibold text-foreground">Share settings</h3>
        <p className="text-base text-muted-foreground">Change here what you want and don't want to share.</p>
      </header>
      <Card>
        <CardContent className="pt-6">
          <ShareForm kanbanBoardId={kanbanBoard.id} sharedBoard={sharedBoard ?? null} />
        </CardContent>
      </Card>
    </section>
  );
}
