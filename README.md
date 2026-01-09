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
- 🤖 **AI-Powered Chatbot** - Create tasks using natural language with N8N + OpenAI integration

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
NEXT_PUBLIC_N8N_CHAT_WEBHOOK=your_n8n_webhook_url_here
EOF

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 💡 Technical Highlights

### What This Project Demonstrates
- ✅ **Full-stack development** with Next.js 14 (App Router) + TypeScript
- ✅ **Database design and integration** with Supabase/PostgreSQL
- ✅ **Modern React patterns** - hooks, client components, state management
- ✅ **UI/UX design** with Tailwind CSS and responsive layouts
- ✅ **Workflow automation** with N8N for AI task processing
- ✅ **AI integration** with OpenAI GPT-3.5 for natural language understanding
- ✅ **Professional code organization** and comprehensive documentation
- ✅ **Production-ready** deployment configuration

### Key Features Implemented
1. **Priority System** - Visual task prioritization with color-coded badges (High/Medium/Low)
2. **Due Date Tracking** - Smart deadline management with overdue detection and status indicators
3. **Real-time Search** - Instant task filtering across title and description fields
4. **AI Chatbot** - Natural language task creation powered by N8N workflows and OpenAI GPT-3.5

### Code Quality Highlights
- TypeScript for complete type safety
- Clean component architecture with separation of concerns
- Comprehensive error handling and loading states
- Responsive design (mobile-first approach)
- Well-documented code with clear setup instructions
- Optimistic UI updates for better user experience

### Development Stats
- **Development Time**: ~12-14 hours (including AI chatbot)
- **Documentation**: ~3 hours
- **Testing & Refinement**: ~2 hours
- **Total Components**: 5 main components (including AIChat)
- **Total Lines**: ~2,500 lines of TypeScript/TSX
- **N8N Workflows**: 1 active workflow with 5 nodes

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
│   ├── AIChat.tsx              # AI chatbot interface
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
| [N8N](https://n8n.io/) | Workflow automation | Cloud |
| [OpenAI](https://openai.com/) | AI language model | GPT-3.5 Turbo |

## 📦 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repo
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_N8N_CHAT_WEBHOOK`
4. Deploy!

### Other Platforms

Works with: Netlify, AWS Amplify, Railway, Render

## 🤖 AI Chatbot Feature

### How It Works

The app includes an AI-powered chatbot that creates tasks from natural language. Just describe what you need to do, and the AI will:

1. **Parse your message** - Understand the task, urgency, and timing
2. **Enhance the title** - Make it clear and actionable
3. **Extract details** - Detect priority (high/medium/low) and due dates
4. **Create the task** - Automatically add it to your list

### Usage Examples

**Simple Task:**
```
You: "buy groceries"
AI: ✅ Task added: Purchase groceries at store
```

**Task with Date:**
```
You: "buy groceries tomorrow"
AI: ✅ Created task: Purchase groceries (Due tomorrow)
```

**Urgent Task:**
```
You: "urgent client meeting Friday at 2pm"
AI: ✅ High priority: Client meeting Friday at 2 PM
```

### Architecture

```
User types message → Next.js Frontend → N8N Workflow → OpenAI GPT-3.5 → Supabase Database
```

The workflow uses:
- **N8N** for workflow orchestration
- **OpenAI GPT-3.5 Turbo** for natural language understanding
- **Supabase** for data storage

### Setup

See `Challenge_info/QUICK_START.md` for complete setup instructions including:
1. N8N workflow configuration
2. Environment variable setup
3. Testing procedures

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

### AI Chatbot
1. Look for the floating purple button (bottom-right corner)
2. Click to open the chat window
3. Type: "buy groceries tomorrow" or "urgent meeting Friday"
4. Press Enter to send
5. AI responds with confirmation
6. Page refreshes automatically to show the new task

## 🔒 Privacy & Data

- **Browser Isolation**: Each browser gets a unique ID stored in `localStorage`
- **No Authentication**: No login required for basic use
- **Data Ownership**: All your data stays in your Supabase instance
- **Open Source**: Full transparency - inspect the code

## 👤 Author

Built by Nikita Waivekarn as part of the AI Automation Developer Challenge

---

**⭐ If you found this helpful, please star the repository!**
