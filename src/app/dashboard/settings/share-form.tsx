'use client';

import { FormMessage, Message } from '@/components/form-message';
import { SubmitButton } from '@/components/submit-button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { resetPasswordAction } from './actions';

export function ShareForm({ searchParams }: { searchParams: Message }) {
  const [uniquePath, setUniquePath] = useState('');
  const [isSharedEnabled, setIsSharingEnabled] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const fullUrl = `https://rise2role.xyz/${uniquePath}`;
    try {
      navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <section className="mt-8 flex max-w-lg flex-col gap-6">
      <header>
        <h3 className="text-lg font-semibold text-foreground">Share settings</h3>
        <p className="text-base text-muted-foreground">Change here what you want and don't want to share.</p>
      </header>
      <Card>
        <form>
          <CardContent className="grid w-full max-w-lg gap-6 pt-6">
            <div className="flex flex-row items-center gap-2">
              <Switch id="enableSharing" checked={isSharedEnabled} onCheckedChange={setIsSharingEnabled} />
              <Label htmlFor="enableSharing">Public sharing </Label>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Public URL</Label>
              <div className="relative flex flex-row shadow-sm">
                <span className={cn('flex h-9 items-center rounded-l-md border border-r-0 py-1 pl-3 pr-2 text-muted-foreground md:text-sm', isSharedEnabled ? '' : 'opacity-50')}>rise2role.xyz/</span>
                <Input
                  className="rounded-l-none pl-2 shadow-none"
                  name="confirmPassword"
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
          </CardContent>
          <CardFooter className="flex justify-between gap-6">
            <FormMessage message={searchParams} />
            <SubmitButton className="w-fit" formAction={resetPasswordAction}>
              Update share settings
            </SubmitButton>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
}
