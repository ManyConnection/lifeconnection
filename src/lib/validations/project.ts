import { z } from "zod";

export const projectSchema = z.object({
  name: z.string().min(1, "プロジェクト名を入力してください"),
  key: z
    .string()
    .min(2, "キーは2文字以上必要です")
    .max(8, "キーは8文字以下にしてください")
    .regex(/^[A-Z0-9]+$/, "大文字英数字のみ使用できます"),
  description: z.string().optional(),
  color: z.string().optional(),
});

export type ProjectInput = z.infer<typeof projectSchema>;
