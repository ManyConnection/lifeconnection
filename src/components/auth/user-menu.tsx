"use client";

import { LogOut, User } from "lucide-react";
import { logout } from "@/lib/actions/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserMenu({
  displayName,
  avatarUrl,
}: {
  displayName: string;
  avatarUrl?: string | null;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-white/5 transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center overflow-hidden">
            {avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={avatarUrl} alt="" className="w-full h-full object-cover" />
            ) : (
              <User size={16} className="text-white" />
            )}
          </div>
          <span className="text-sm text-slate-300 hidden sm:block max-w-[120px] truncate">
            {displayName}
          </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-slate-900 border-white/10 text-white"
      >
        <DropdownMenuItem
          onClick={() => logout()}
          className="text-slate-300 focus:bg-white/5 focus:text-white cursor-pointer"
        >
          <LogOut size={16} className="mr-2" />
          ログアウト
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
