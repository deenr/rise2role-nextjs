import { AppSidebar } from '@/components/app-sidebar';
import { UserNavigation } from '@/components/nav-user';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@radix-ui/react-separator';
import { signOutAction } from './actions';

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="fixed flex h-16 w-full shrink-0 items-center gap-2 border-b bg-sidebar px-8">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb className="mr-auto">
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Building Your Application</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <UserNavigation
            user={{
              name: 'Dean Reymen',
              email: 'dean@reymen.be'
            }}
            logout={signOutAction}
          />
        </header>
        <div className="mt-16 flex flex-1 flex-col gap-4 p-8 pb-12">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
