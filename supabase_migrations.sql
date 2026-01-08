-- Clean Migration: Only implemented features

-- Phase 1: Priority and Due Dates (IMPLEMENTED)
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS priority TEXT DEFAULT 'medium';
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS due_date TIMESTAMP WITH TIME ZONE;

-- Analytics: Task Completions (IMPLEMENTED)
CREATE TABLE IF NOT EXISTS task_completions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_identifier TEXT NOT NULL,
  task_id UUID REFERENCES tasks(id) ON DELETE SET NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  task_title TEXT,
  task_category TEXT
);

-- Trigger for logging completions (IMPLEMENTED)
CREATE OR REPLACE FUNCTION log_task_completion()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_completed = true AND OLD.is_completed = false THEN
    INSERT INTO task_completions (user_identifier, task_id, task_title)
    VALUES (NEW.user_identifier, NEW.id, NEW.title);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS task_completion_trigger ON tasks;
CREATE TRIGGER task_completion_trigger
AFTER UPDATE ON tasks
FOR EACH ROW
EXECUTE FUNCTION log_task_completion();
