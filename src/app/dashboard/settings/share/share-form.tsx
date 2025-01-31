'use client';

import { FormMessage, Message } from '@/components/form-message';
import { SubmitButton } from '@/components/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { sharedBoardLink } from '@prisma/client';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { updateSharedBoardAction } from '../actions';

export function ShareForm({ kanbanBoardId, sharedBoard, searchParams }: { kanbanBoardId: string; sharedBoard: sharedBoardLink | null; searchParams: Message }) {
  const [uniquePath, setUniquePath] = useState(sharedBoard?.linkToken ?? '');
  const [isSharedEnabled, setIsSharingEnabled] = useState(sharedBoard?.enabled ?? false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const fullUrl = `https://rise2role.xyz/board/${uniquePath}`;
    try {
      navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <form className="grid w-full max-w-lg gap-6">
      <input type="hidden" name="kanbanBoardId" value={kanbanBoardId} readOnly />
      <div className="flex flex-row items-center gap-2">
        <Switch id="sharingEnabled" checked={isSharedEnabled} onCheckedChange={setIsSharingEnabled} />
        <input type="hidden" name="sharingEnabled" value={isSharedEnabled + ''} readOnly />
        <Label htmlFor="sharingEnabled">Public sharing</Label>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="urlToken">Public URL</Label>
        <div className="relative flex flex-row shadow-sm">
          <span className={cn('flex h-9 items-center rounded-l-md border border-r-0 py-1 pl-3 pr-2 text-muted-foreground md:text-sm', isSharedEnabled ? '' : 'opacity-50')}>rise2role.xyz/board/</span>
          <Input
            className="rounded-l-none pl-2 shadow-none"
            name="urlToken"
            placeholder="2ed0b87e"
            value={uniquePath}
            onChange={(e) => setUniquePath(e.target.value)}
            required={isSharedEnabled}
            disabled={!isSharedEnabled}
          />
          {isSharedEnabled && (
            <button type="button" onClick={handleCopy} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary focus:outline-none" aria-label="Copy URL">
              {copied ? <Check className="h-4 w-4 text-green-500 transition-all" /> : <Copy className="h-4 w-4 transition-all active:scale-110" />}
            </button>
          )}
        </div>
      </div>
      <div className="flex justify-between gap-6">
        <FormMessage message={searchParams} />
        <SubmitButton className="w-fit" formAction={updateSharedBoardAction}>
          Update share settings
        </SubmitButton>
      </div>
    </form>
  );
}
