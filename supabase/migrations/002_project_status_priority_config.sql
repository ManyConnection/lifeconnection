-- ============================================================
-- プロジェクトごとのステータス・優先度カスタマイズ
-- ============================================================

-- status_config / priority_config: JSONB
-- 例: { "open": { "label": "TODO", "enabled": true }, "in_progress": { "label": "作業中", "enabled": true } }
-- null の場合はデフォルト設定を使用

ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS status_config jsonb DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS priority_config jsonb DEFAULT NULL;
