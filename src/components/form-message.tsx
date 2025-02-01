import { cn } from '@/lib/utils';

export type Message = { success: string } | { error: string } | { message: string };

export function FormMessage({ message, className, ...props }: { message: Message } & React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={cn('text-sm', className)} {...props}>
      {'success' in message && <div className="border-foreground text-foreground">{message.success}</div>}
      {'error' in message && <div className="border-destructive text-destructive">{message.error}</div>}
      {'message' in message && <div className="text-foreground">{message.message}</div>}
    </div>
  );
}
