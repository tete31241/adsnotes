import AppHeader from '@/components/app-header';
import AppSidebar from '@/components/app-sidebar';
import AdBanner from '@/components/ad-banner';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col">
        <AppSidebar />
        <main className="flex flex-1 flex-col pl-0 lg:pl-[--sidebar-width-icon]">
          <AppHeader />
          <div className="flex-1 p-4 md:p-6 lg:p-8">{children}</div>
        </main>
      </div>
      <AdBanner />
    </SidebarProvider>
  );
}
