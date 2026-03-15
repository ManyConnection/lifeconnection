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
      <DropdownMenuTrigger className="flex items-center gap-2.5 px-3 py-2 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-400 to-teal-400 flex items-center justify-center overflow-hidden ring-2 ring-sky-100">
            {avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={avatarUrl} alt="" className="w-full h-full object-cover" />
            ) : (
              <User size={16} className="text-white" />
            )}
          </div>
          <span className="text-sm font-medium text-gray-600 hidden sm:block max-w-[120px] truncate">
            {displayName}
          </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-white border-gray-100 text-gray-800 rounded-2xl shadow-lg"
      >
        <DropdownMenuItem
          onClick={() => logout()}
          className="text-gray-600 focus:bg-gray-50 focus:text-gray-800 cursor-pointer rounded-xl"
        >
          <LogOut size={16} className="mr-2" />
          ログアウト
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
