import { AppSidebar } from "@/components/layout/app-sidebar";
import { AppHeader } from "@/components/layout/app-header";
import { BackgroundEffects } from "@/components/layout/background-effects";
import { Toaster } from "@/components/ui/sonner";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen text-white">
      <BackgroundEffects />
      <AppSidebar />
      <div className="lg:pl-64">
        <AppHeader />
        <main className="p-6 lg:p-8">{children}</main>
      </div>
      <Toaster
        theme="dark"
        toastOptions={{
          className: "bg-slate-900 border-white/10 text-white",
        }}
      />
    </div>
  );
}
