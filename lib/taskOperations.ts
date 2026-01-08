"use client";

import { supabase } from './supabase';
import { getUserIdentifier } from './userIdentifier';
import { Task, CreateTaskInput, UpdateTaskInput } from '@/types/task';

/**
 * Fetches all tasks for the current user
 */
export async function fetchTasks(): Promise<Task[]> {
  const userId = getUserIdentifier();
  
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_identifier', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching tasks:', error);
    throw new Error('Failed to fetch tasks');
  }

  return data || [];
}

/**
 * Creates a new task
 */
export async function createTask(input: CreateTaskInput): Promise<Task> {
  const userId = getUserIdentifier();
  
  const { data, error} = await supabase
    .from('tasks')
    .insert({
      user_identifier: userId,
      title: input.title,
      description: input.description || null,
      enhanced_title: null,
      is_completed: false,
      priority: input.priority || 'medium',
      due_date: input.due_date || null,
      sort_order: 0,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating task:', error);
    throw new Error('Failed to create task');
  }

  return data;
}

/**
 * Updates an existing task
 */
export async function updateTask(input: UpdateTaskInput): Promise<Task> {
  const userId = getUserIdentifier();
  
  const updateData: Partial<Task> = {
    updated_at: new Date().toISOString(),
  };

  if (input.title !== undefined) updateData.title = input.title;
  if (input.description !== undefined) updateData.description = input.description;
  if (input.is_completed !== undefined) updateData.is_completed = input.is_completed;
  if (input.priority !== undefined) updateData.priority = input.priority;
  if (input.due_date !== undefined) updateData.due_date = input.due_date;
  if (input.sort_order !== undefined) updateData.sort_order = input.sort_order;

  const { data, error } = await supabase
    .from('tasks')
    .update(updateData)
    .eq('id', input.id)
    .eq('user_identifier', userId)
    .select()
    .single();

  if (error) {
    console.error('Error updating task:', error);
    throw new Error('Failed to update task');
  }

  return data;
}

/**
 * Toggles the completion status of a task
 */
export async function toggleTaskCompletion(taskId: string, currentStatus: boolean): Promise<Task> {
  return updateTask({
    id: taskId,
    is_completed: !currentStatus,
  });
}

/**
 * Deletes a task
 */
export async function deleteTask(taskId: string): Promise<void> {
  const userId = getUserIdentifier();
  
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', taskId)
    .eq('user_identifier', userId);

  if (error) {
    console.error('Error deleting task:', error);
    throw new Error('Failed to delete task');
  }
}

