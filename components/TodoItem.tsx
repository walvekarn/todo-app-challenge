"use client";

import { useState } from 'react';
import { Task, Priority } from '@/types/task';
import { updateTask, deleteTask, toggleTaskCompletion } from '@/lib/taskOperations';

interface TodoItemProps {
  task: Task;
  onTaskUpdated: (task: Task) => void;
  onTaskDeleted: (taskId: string) => void;
}

const getPriorityColor = (priority: Priority) => {
  switch (priority) {
    case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
    case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
    case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
  }
};

const getPriorityIcon = (priority: Priority) => {
  switch (priority) {
    case 'high': return '🔴';
    case 'medium': return '🟡';
    case 'low': return '🟢';
  }
};

const getDueDateStatus = (dueDate: string | null) => {
  if (!dueDate) return null;
  const due = new Date(dueDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);
  
  const diffDays = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) return { text: 'Overdue', color: 'text-red-600 dark:text-red-400' };
  if (diffDays === 0) return { text: 'Due today', color: 'text-orange-600 dark:text-orange-400' };
  if (diffDays <= 3) return { text: `Due in ${diffDays} days`, color: 'text-blue-600 dark:text-blue-400' };
  return { text: `Due ${due.toLocaleDateString()}`, color: 'text-gray-600 dark:text-gray-400' };
};

export default function TodoItem({ task, onTaskUpdated, onTaskDeleted }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');
  const [editPriority, setEditPriority] = useState<Priority>(task.priority);
  const [editDueDate, setEditDueDate] = useState(task.due_date ? task.due_date.split('T')[0] : '');
  const [isLoading, setIsLoading] = useState(false);
  
  const dueDateStatus = getDueDateStatus(task.due_date);

  const handleToggleComplete = async () => {
    setIsLoading(true);
    try {
      const updatedTask = await toggleTaskCompletion(task.id, task.is_completed);
      onTaskUpdated(updatedTask);
    } catch (err) {
      console.error('Failed to toggle task:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveEdit = async () => {
    if (!editTitle.trim()) return;

    setIsLoading(true);
    try {
      const updatedTask = await updateTask({
        id: task.id,
        title: editTitle.trim(),
        description: editDescription.trim() || undefined,
        priority: editPriority,
        due_date: editDueDate || undefined,
      });
      onTaskUpdated(updatedTask);
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update task:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setEditPriority(task.priority);
    setEditDueDate(task.due_date ? task.due_date.split('T')[0] : '');
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this task?')) return;

    setIsLoading(true);
    try {
      await deleteTask(task.id);
      onTaskDeleted(task.id);
    } catch (err) {
      console.error('Failed to delete task:', err);
      setIsLoading(false);
    }
  };

  const getBorderColor = (priority: Priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
    }
  };

  return (
    <div
      className={`group bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md border border-l-4 ${
        task.is_completed ? 'border-green-200 dark:border-green-900' : 'border-gray-200 dark:border-gray-700'
      } ${getBorderColor(task.priority)} p-4 transition-all duration-200 hover:-translate-y-0.5`}
    >
      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
            disabled={isLoading}
            maxLength={200}
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 resize-none"
            rows={2}
            disabled={isLoading}
            maxLength={500}
          />
          <div className="grid grid-cols-2 gap-2">
            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value as Priority)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
              disabled={isLoading}
            >
              <option value="low">🟢 Low</option>
              <option value="medium">🟡 Medium</option>
              <option value="high">🔴 High</option>
            </select>
            <input
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
              disabled={isLoading}
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSaveEdit}
              disabled={isLoading || !editTitle.trim()}
              className="px-4 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm disabled:bg-gray-400 dark:disabled:bg-gray-600 transition-colors"
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              disabled={isLoading}
              className="px-4 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded text-sm transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={task.is_completed}
            onChange={handleToggleComplete}
            disabled={isLoading}
            className="mt-1 w-6 h-6 text-blue-600 border-gray-300 rounded-md focus:ring-blue-500 cursor-pointer disabled:cursor-not-allowed"
          />
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className={`font-medium ${
                task.is_completed 
                  ? 'line-through text-gray-500 dark:text-gray-400' 
                  : 'text-gray-800 dark:text-gray-100'
              }`}>
                {task.title}
              </h3>
              <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(task.priority)}`}>
                {getPriorityIcon(task.priority)} {task.priority}
              </span>
            </div>
            {task.description && (
              <p className={`text-sm mt-1 ${
                task.is_completed 
                  ? 'line-through text-gray-400 dark:text-gray-500' 
                  : 'text-gray-600 dark:text-gray-400'
              }`}>
                {task.description}
              </p>
            )}
            <div className="flex items-center gap-3 mt-2 text-xs">
              <span className="text-gray-400 dark:text-gray-500">
                Created: {new Date(task.created_at).toLocaleDateString()}
              </span>
              {dueDateStatus && (
                <span className={`font-medium ${dueDateStatus.color}`}>
                  📅 {dueDateStatus.text}
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setIsEditing(true)}
              disabled={isLoading}
              className="px-2 py-1 text-xs text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded transition-colors disabled:opacity-50"
              title="Edit task"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={isLoading}
              className="px-2 py-1 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors disabled:opacity-50"
              title="Delete task"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

