# Alex Career Knowledge Base (Frontend)

Modern React (Next.js) frontend for the local Agentic Career Knowledge Base.

Connects to the FastAPI backend (`llm-learning`) running on port 8000.

---

## Features

- Clean, responsive UI
- Shows when the agent uses tools
- Real-time question answering
- Built with Next.js + TypeScript + Tailwind CSS

---

## Prerequisites

- Node.js 18+
- The backend (`llm-learning`) must be running on http://localhost:8000

---

## Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd llm-frontend

# Install dependencies
npm install

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## How it works

- User types a question
- Frontend sends a POST request to http://localhost:8000/ask (llm-learning repo by Alex Mochu)
- Backend (Agentic RAG) processes the question, possibly calling tools
- Frontend displays the answer and which tools were used

## Configuration

- If your backend runs on a different host/port, update the fetch URL in src/app/page.tsx:

const res = await fetch("http://localhost:8000/ask", { ... })

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
