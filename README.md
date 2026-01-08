# 📝 Advanced Todo App

A modern, feature-rich todo application built with Next.js 14, TypeScript, Tailwind CSS, and Supabase. This project showcases professional-grade task management with 3 advanced features beyond basic CRUD operations.

![Status](https://img.shields.io/badge/status-active-success.svg)
![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![Features](https://img.shields.io/badge/features-3%20advanced%20features-success.svg)

## ✨ Features

### Core Features
- ✅ **Full CRUD Operations** - Create, read, update, and delete tasks
- ✅ **Task Completion** - Mark tasks as complete/incomplete with visual feedback
- ✅ **Browser Isolation** - Each browser has its own task list (no login required)
- ✅ **Data Persistence** - All data stored in Supabase PostgreSQL
- ✅ **Status Filtering** - Filter by All, Active, or Completed tasks

### Advanced Features (Implemented)
- 🎯 **Priority Levels** - Assign High (🔴), Medium (🟡), or Low (🟢) priority with color-coded badges
- 📅 **Due Dates** - Set deadlines with visual indicators for overdue, today, and upcoming tasks
- 🔍 **Real-time Search** - Instantly search tasks by title or description

### UI/UX Highlights
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🎭 Smooth animations and transitions
- 📊 Real-time task statistics
- ⚡ Optimistic UI updates
- 🔄 Loading states and error handling
- 🎨 Modern, clean interface

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+** - [Download here](https://nodejs.org/)
- **Supabase Account** - [Sign up free](https://supabase.com/)

### Installation

```bash
# Clone the repository
git clone https://github.com/walvekarn/todo-app-challenge.git
cd todo-app-challenge

# Install dependencies
npm install

# Create environment file
cat > .env.local << 'EOF'
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
EOF

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 For Recruiters/Reviewers

### What This Project Demonstrates
- ✅ **Full-stack development** with Next.js 14 (App Router) + TypeScript
- ✅ **Database design and integration** with Supabase/PostgreSQL
- ✅ **Modern React patterns** - hooks, client components, state management
- ✅ **UI/UX design** with Tailwind CSS and responsive layouts
- ✅ **Professional code organization** and comprehensive documentation
- ✅ **Production-ready** deployment configuration

### Key Features Implemented
1. **Priority System** - Visual task prioritization with color-coded badges (High/Medium/Low)
2. **Due Date Tracking** - Smart deadline management with overdue detection and status indicators
3. **Real-time Search** - Instant task filtering across title and description fields

### Code Quality Highlights
- TypeScript for complete type safety
- Clean component architecture with separation of concerns
- Comprehensive error handling and loading states
- Responsive design (mobile-first approach)
- Well-documented code with clear setup instructions
- Optimistic UI updates for better user experience

### Development Stats
- **Development Time**: ~8-10 hours
- **Documentation**: ~2 hours
- **Testing & Refinement**: ~1 hour
- **Total Components**: 4 main components
- **Total Lines**: ~2,000 lines of TypeScript/TSX

## 🗄️ Database Setup

### Run the Migration

Open your Supabase SQL Editor and run the `supabase_migrations.sql` file included in the project. This creates:

- `tasks` table with priority and due_date columns
- `task_completions` table for analytics
- Trigger for logging completed tasks
- Row Level Security policies

### Manual Setup (Alternative)

If you prefer, here's the basic schema:

```sql
CREATE TABLE tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_identifier TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  priority TEXT DEFAULT 'medium',
  due_date TIMESTAMP WITH TIME ZONE,
  is_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations" ON tasks FOR ALL USING (true);
```

## 🏗️ Project Structure

```
to_do_list_test/
├── app/
│   ├── layout.tsx              # Root layout with theme provider
│   ├── page.tsx                # Main todo page
│   └── globals.css             # Tailwind CSS styles
├── components/
│   ├── AddTaskForm.tsx         # Create tasks with priority & due date
│   ├── TodoItem.tsx            # Task display with edit/delete
│   ├── SearchBar.tsx           # Real-time search component
│   └── ThemeProvider.tsx       # Theme context provider
├── lib/
│   ├── supabase.ts             # Supabase client
│   ├── taskOperations.ts       # Task CRUD functions
│   └── userIdentifier.ts       # Browser ID management
├── types/
│   └── task.ts                 # Task type definitions
├── supabase_migrations.sql     # Database schema
└── README.md                   # This file
```

## 🎨 Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| [Next.js](https://nextjs.org/) | React framework | 14.1.0 |
| [TypeScript](https://www.typescriptlang.org/) | Type safety | 5.x |
| [Tailwind CSS](https://tailwindcss.com/) | Styling | 3.3.0 |
| [Supabase](https://supabase.com/) | Backend & Database | Latest |

## 📦 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repo
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

### Other Platforms

Works with: Netlify, AWS Amplify, Railway, Render

## 🧪 Testing Features

### Priority Levels
1. Create a task and select High/Medium/Low priority
2. Notice the color-coded badge (🔴/🟡/🟢)
3. Edit a task to change its priority

### Due Dates
1. Add a due date when creating a task
2. See indicator: Overdue (red), Today (orange), Upcoming (blue)
3. Tasks without dates show no indicator

### Search
1. Type in the search bar
2. Results filter in real-time
3. Search works on both title and description
4. Click X to clear search

## 🔒 Privacy & Data

- **Browser Isolation**: Each browser gets a unique ID stored in `localStorage`
- **No Authentication**: No login required for basic use
- **Data Ownership**: All your data stays in your Supabase instance
- **Open Source**: Full transparency - inspect the code

## 👤 Author

Built by Nikita Waivekarn as part of the AI Automation Developer Challenge

---

**⭐ If you found this helpful, please star the repository!**
