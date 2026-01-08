"use client";

const USER_ID_KEY = 'todo_app_user_id';

/**
 * Generates a unique user identifier based on browser fingerprint
 */
function generateUserId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

/**
 * Gets or creates a user identifier for the current browser
 * This ID is stored in localStorage and persists across sessions
 */
export function getUserIdentifier(): string {
  if (typeof window === 'undefined') {
    return 'server_user';
  }

  let userId = localStorage.getItem(USER_ID_KEY);
  
  if (!userId) {
    userId = generateUserId();
    localStorage.setItem(USER_ID_KEY, userId);
  }
  
  return userId;
}

/**
 * Clears the user identifier (useful for testing)
 */
export function clearUserIdentifier(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(USER_ID_KEY);
  }
}

