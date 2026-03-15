"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { TASK_STATUSES, TASK_PRIORITIES } from "@/lib/constants";
import { Search } from "lucide-react";
import { useState } from "react";

interface Props {
  members: {
    id: string;
    user_id: string;
    profiles: { id: string; display_name: string } | null;
  }[];
}

export function TaskFilters({ members }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") ?? "");

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilter("q", search);
  };

  const selectClass =
    "px-3 py-2 rounded-xl bg-white border border-gray-200 text-sm text-gray-600 focus:outline-none focus:border-sky-400 appearance-none cursor-pointer font-medium";

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <form onSubmit={handleSearch} className="relative">
        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="pl-9 pr-3 py-2 rounded-xl bg-white border border-gray-200 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:border-sky-400 w-48 font-medium"
        />
      </form>

      <select
        value={searchParams.get("status") ?? ""}
        onChange={(e) => updateFilter("status", e.target.value)}
        className={selectClass}
      >
        <option value="">All Status</option>
        {TASK_STATUSES.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>

      <select
        value={searchParams.get("priority") ?? ""}
        onChange={(e) => updateFilter("priority", e.target.value)}
        className={selectClass}
      >
        <option value="">All Priority</option>
        {TASK_PRIORITIES.map((p) => (
          <option key={p.value} value={p.value}>
            {p.label}
          </option>
        ))}
      </select>

      <select
        value={searchParams.get("assignee") ?? ""}
        onChange={(e) => updateFilter("assignee", e.target.value)}
        className={selectClass}
      >
        <option value="">All Assignees</option>
        {members.map((m) => (
          <option key={m.user_id} value={m.user_id}>
            {m.profiles?.display_name}
          </option>
        ))}
      </select>
    </div>
  );
}
