import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function SidebarCta({ className, ...props }: React.ComponentPropsWithoutRef<typeof Card>) {
  return (
    <Card className={cn('shadow-none', className)} {...props}>
      <form>
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-sm">Ready to streamline your job search?</CardTitle>
          <CardDescription>Share your job search in seconds</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2.5 p-4">
          <Button className="w-full bg-sidebar-primary text-sidebar-primary-foreground shadow-none" size="sm">
            Get started
          </Button>
        </CardContent>
      </form>
    </Card>
  );
}
