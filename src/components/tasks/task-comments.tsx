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
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-[10px] text-white shrink-0 mt-0.5">
              {(comment.user?.display_name ?? "?").charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">
                  {comment.user?.display_name}
                </span>
                <span className="text-xs text-gray-400">
                  {format(new Date(comment.created_at), "MM/dd HH:mm")}
                </span>
                <button
                  onClick={() => handleDelete(comment.id)}
                  className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-rose-500 transition-all ml-auto cursor-pointer"
                >
                  <Trash2 size={12} />
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">
                {comment.content}
              </p>
            </div>
          </div>
        </div>
      ))}

      <form onSubmit={handleSubmit} className="flex gap-2 pt-2 border-t border-pink-100">
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="コメントを入力..."
          className="flex-1 px-4 py-2 rounded-xl bg-white border border-pink-200 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-pink-400"
        />
        <button
          type="submit"
          disabled={loading || !content.trim()}
          className="px-3 py-2 rounded-xl bg-pink-50 text-pink-500 hover:bg-pink-100 transition-colors disabled:opacity-50 cursor-pointer"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
