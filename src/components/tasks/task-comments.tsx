"use client";

import { useState } from "react";
import { createComment, deleteComment } from "@/lib/actions/comments";
import { format } from "date-fns";
import { Send, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user: { id: string; display_name: string; avatar_url: string | null } | null;
}

export function TaskComments({
  comments,
  taskId,
  projectId,
}: {
  comments: Comment[];
  taskId: string;
  projectId: string;
}) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);
    const result = await createComment(taskId, projectId, content.trim());
    if (result?.error) {
      toast.error(result.error);
    } else {
      setContent("");
    }
    setLoading(false);
  };

  const handleDelete = async (commentId: string) => {
    await deleteComment(commentId, taskId, projectId);
    toast.success("コメントを削除しました");
  };

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="group">
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-[10px] text-white shrink-0 mt-0.5">
              {(comment.user?.display_name ?? "?").charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-white">
                  {comment.user?.display_name}
                </span>
                <span className="text-xs text-slate-500">
                  {format(new Date(comment.created_at), "MM/dd HH:mm")}
                </span>
                <button
                  onClick={() => handleDelete(comment.id)}
                  className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-rose-400 transition-all ml-auto"
                >
                  <Trash2 size={12} />
                </button>
              </div>
              <p className="text-sm text-slate-300 mt-1 whitespace-pre-wrap">
                {comment.content}
              </p>
            </div>
          </div>
        </div>
      ))}

      <form onSubmit={handleSubmit} className="flex gap-2 pt-2 border-t border-white/5">
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="コメントを入力..."
          className="flex-1 px-4 py-2 rounded-xl bg-slate-800/50 border border-white/10 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-500/50"
        />
        <button
          type="submit"
          disabled={loading || !content.trim()}
          className="px-3 py-2 rounded-xl bg-violet-500/20 text-violet-400 hover:bg-violet-500/30 transition-colors disabled:opacity-50"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
