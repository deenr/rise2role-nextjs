import { AppSidebar } from '@/components/app-sidebar';
import { NavHeader } from '@/components/nav-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export default function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="overflow-y-hidden md:overflow-y-auto">
        <NavHeader />
        <div className="mt-16 flex flex-1 flex-col gap-4 pt-8">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
