import { createClient } from "@/lib/supabase/server";
import { UserMenu } from "@/components/auth/user-menu";

export async function AppHeader() {
  let displayName = "";
  let avatarUrl: string | null = null;

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      displayName = profile?.display_name ?? user.email ?? "";
      avatarUrl = profile?.avatar_url ?? null;
    }
  } catch {
    // Silently handle auth/profile errors
  }

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-pink-100 bg-white/60 backdrop-blur-xl">
      <div className="flex items-center justify-between h-full px-6 lg:px-8">
        <div className="lg:hidden w-10" />
        <div className="flex-1" />
        <UserMenu displayName={displayName} avatarUrl={avatarUrl} />
      </div>
    </header>
  );
}
