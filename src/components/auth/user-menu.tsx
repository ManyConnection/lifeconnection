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
      <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-pink-50 transition-colors cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center overflow-hidden shadow-sm">
            {avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={avatarUrl} alt="" className="w-full h-full object-cover" />
            ) : (
              <User size={16} className="text-white" />
            )}
          </div>
          <span className="text-sm text-gray-600 hidden sm:block max-w-[120px] truncate">
            {displayName}
          </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-white border-pink-100 text-gray-800"
      >
        <DropdownMenuItem
          onClick={() => logout()}
          className="text-gray-600 focus:bg-pink-50 focus:text-pink-600 cursor-pointer"
        >
          <LogOut size={16} className="mr-2" />
          ログアウト
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
