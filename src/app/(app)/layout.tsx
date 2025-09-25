import AppHeader from '@/components/app-header';
import AppSidebar from '@/components/app-sidebar';
import AdBanner from '@/components/ad-banner';
import Chatbot from '@/components/chatbot';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Suspense } from 'react';

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
          <Suspense fallback={<div>Loading header...</div>}>
            <AppHeader />
          </Suspense>
          <div className="flex flex-1">
            <div className="flex-1 p-4 md:p-6 lg:p-8">{children}</div>
            <div className="hidden lg:block w-[400px] p-4">
              <Chatbot />
            </div>
          </div>
        </main>
      </div>
       <div className="lg:hidden">
        <Chatbot />
       </div>
      <AdBanner />
    </SidebarProvider>
  );
}
