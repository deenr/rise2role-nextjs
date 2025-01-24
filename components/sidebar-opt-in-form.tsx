import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function SidebarCta() {
  return (
    <Card className="shadow-none">
      <form>
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-sm">Ready to streamline your job search?</CardTitle>
          <CardDescription>Share your job search in seconds</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2.5 p-4">
          <Button className="bg-sidebar-primary text-sidebar-primary-foreground w-full shadow-none" size="sm">
            Get started
          </Button>
        </CardContent>
      </form>
    </Card>
  );
}
