import { AppSidebar } from "@/components/layout/app-sidebar";
import { AppHeader } from "@/components/layout/app-header";
import { BackgroundEffects } from "@/components/layout/background-effects";
import { Toaster } from "@/components/ui/sonner";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen text-gray-800">
      <BackgroundEffects />
      <AppSidebar />
      <div className="lg:pl-64">
        <AppHeader />
        <main className="p-6 lg:p-8">{children}</main>
      </div>
      <Toaster
        theme="light"
        toastOptions={{
          className: "bg-white border-pink-100 text-gray-800",
        }}
      />
    </div>
  );
}
