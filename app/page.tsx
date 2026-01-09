"use client";

import { useState, useEffect, useRef } from 'react';
import { Task } from '@/types/task';
import { fetchTasks } from '@/lib/taskOperations';
import { getUserIdentifier } from '@/lib/userIdentifier';
import AddTaskForm from '@/components/AddTaskForm';
import TodoItem from '@/components/TodoItem';
import SearchBar from '@/components/SearchBar';
import AIChat from '@/components/AIChat';

type FilterType = 'all' | 'active' | 'completed';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [userId, setUserId] = useState<string>('');
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      // Initialize user identifier
      const id = getUserIdentifier();
      setUserId(id);
      // Load tasks
      loadTasks();
    }
  }, []);

  const loadTasks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      setError('Failed to load tasks. Please refresh the page.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTaskAdded = (newTask: Task) => {
    setTasks([newTask, ...tasks]);
  };

  const handleTaskUpdated = (updatedTask: Task) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  };

  const handleTaskDeleted = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const filteredTasks = tasks.filter(task => {
    // Apply status filter
    if (filter === 'active' && task.is_completed) return false;
    if (filter === 'completed' && !task.is_completed) return false;
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const titleMatch = task.title.toLowerCase().includes(query);
      const descMatch = task.description?.toLowerCase().includes(query);
      return titleMatch || descMatch;
    }
    
    return true;
  });

  const stats = {
    total: tasks.length,
    active: tasks.filter(t => !t.is_completed).length,
    completed: tasks.filter(t => t.is_completed).length,
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-gray-800 dark:text-white mb-2">
            My Todo App
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Organize your tasks efficiently
          </p>
        </header>

        {/* Add Task Form */}
        <AddTaskForm onTaskAdded={handleTaskAdded} />

        {/* Search Bar */}
        <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-700 dark:text-red-400 mb-6">
            {error}
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {/* Stats and Filter */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div className="flex gap-3 text-sm">
                  <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
                    Total: <span className="font-semibold text-gray-800 dark:text-gray-200">{stats.total}</span>
                  </span>
                  <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
                    Active: <span className="font-semibold text-blue-600 dark:text-blue-400">{stats.active}</span>
                  </span>
                  <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
                    Completed: <span className="font-semibold text-green-600 dark:text-green-400">{stats.completed}</span>
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setFilter('all')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      filter === 'all'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilter('active')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      filter === 'active'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    Active
                  </button>
                  <button
                    onClick={() => setFilter('completed')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      filter === 'completed'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    Completed
                  </button>
                </div>
              </div>
            </div>

            {/* Task List */}
            {filteredTasks.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <div className="text-6xl mb-4">
                  {filter === 'all' && '📋'}
                  {filter === 'active' && '✨'}
                  {filter === 'completed' && '🎉'}
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  {filter === 'all' && 'No tasks yet. Add your first task above!'}
                  {filter === 'active' && 'No active tasks. Great job!'}
                  {filter === 'completed' && 'No completed tasks yet.'}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredTasks.map(task => (
                  <TodoItem
                    key={task.id}
                    task={task}
                    onTaskUpdated={handleTaskUpdated}
                    onTaskDeleted={handleTaskDeleted}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* Footer */}
        <footer className="text-center mt-12 text-gray-500 dark:text-gray-400 text-sm">
          <p>Refresh to Sync</p>
        </footer>
      </div>

      {/* AI Chatbot */}
      <AIChat />
    </main>
  );
}

