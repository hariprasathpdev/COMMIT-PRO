# Commit Pro — Personalized Career Roadmap & Placement Preparation Platform

> **“Your Career. Your Roadmap. Your Next Commit.”**

Commit Pro is a production-grade full-stack web application engineered for college students preparing for software engineering careers, summer internships, and campus placements. It bridges the gap between scattered study materials and placement readiness through structured 10-stage learning milestones, daily focus tracking, DSA practice logs, portfolio project trackers, ATS resume evaluation, and AI-powered career mentoring.

---

## 🌟 Key Capabilities

1. **10-Stage Placement Roadmap:**
   - Stage 1: Programming Fundamentals (Memory models, collections, clean code)
   - Stage 2: Data Structures and Algorithms (Patterns: Two Pointers, Sliding Window, Trees, Graphs, DP)
   - Stage 3: OOP and Low-Level System Design (SOLID principles, GoF patterns)
   - Stage 4: SQL & Database Fundamentals (Transactions, ACID, B-Tree indexing)
   - Stage 5: Operating Systems & Computer Networks (Paging, concurrency, TCP/IP handshakes)
   - Stage 6: Role Specialization (Full-Stack, Backend, Frontend, or AI/ML architecture)
   - Stage 7: Projects & GitHub Portfolio (Flagship deployed apps with live URLs)
   - Stage 8: Resume, Aptitude & Communication (Google XYZ formula & speed drills)
   - Stage 9: Technical & Mock Interviews (Live simulation & flashcard recall)
   - Stage 10: Placement Applications & Offer Pipeline (Kanban tracking)

2. **Daily Planner & Pomodoro Focus Timer:**
   - 25-minute Pomodoro sprints and open stopwatch study timer.
   - Task checklists with one-click postponement and manual study logging.
   - Real streak tracking and activity heatmaps.

3. **DSA & Coding Practice Vault:**
   - 30+ curated placement problems categorized by pattern with verified LeetCode links.
   - Built-in safe in-browser code scratchpad with multi-language syntax & test case runner.
   - Revision bookmarking and personal algorithmic intuition notes.

4. **Gemini AI Career Mentor:**
   - Integrated Google Gemini 3.8 Flash API through secure server-side routes (`/api/gemini/chat`).
   - Context-aware coaching using student's academic profile and active milestones.

5. **ATS Resume Engineering:**
   - Automated parser scoring (0–100%) against target engineering roles.
   - Google XYZ bullet point rewrites (*"Accomplished [X] as measured by [Y] by doing [Z]"*).
   - Missing keyword detection.

6. **Placement Pipeline Kanban Board:**
   - Track applications across 6 stages: Interested, Applied, OA, Interview, Offer, Rejected.
   - Salary/stipend tags, referral contacts, and round deadlines.

---

## 🏗️ Technical Architecture

- **Frontend:** React 19, TypeScript, Tailwind CSS v4, Lucide React, Recharts, Canvas-Confetti.
- **Backend:** Node.js, Express, TypeScript (`server.ts`).
- **AI Integration:** Google GenAI TypeScript SDK (`@google/genai`) using `gemini-3.8-flash` exclusively on the server.
- **State & Storage:** Persistent client-side session store with JSON export/import and fallback simulation.
- **Security:** Zero client-side API key exposure. Secrets are injected at runtime via environment variables (`GEMINI_API_KEY`).

---

## 🚀 Quickstart & Local Development

### 1. Prerequisites
- Node.js >= 20.x
- npm >= 9.x

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/your-username/commit-pro.git
cd commit-pro

# Install dependencies
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory (based on `.env.example`):
```env
# Gemini API Key (injected automatically in Google AI Studio)
GEMINI_API_KEY="your-gemini-api-key"

# Port (default: 3000)
PORT=3000

# App hosting URL
APP_URL="http://localhost:3000"
```

### 4. Running the Application
```bash
# Start full-stack development server with tsx & Vite middleware
npm run dev

# Open in your browser
http://localhost:3000
```

### 5. Building & Type Checking
```bash
# Run TypeScript validation
npm run lint

# Compile production bundle
npm run build

# Start production server
npm start
```

---

## 🚢 Deployment Guide (Development to Production)

### Step 1: Initialize Git and Commit
```bash
git init
git add .
git commit -m "feat: initial Commit Pro placement platform launch"
git branch -M main
git remote add origin https://github.com/your-username/commit-pro.git
git push -u origin main
```

### Step 2: Deploy to Google Cloud Run / Firebase App Hosting
1. Build the production image:
   ```bash
   npm run build
   ```
2. Containerize with Docker or deploy directly via Cloud Run:
   ```bash
   gcloud run deploy commit-pro \
     --source . \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated \
     --set-env-vars GEMINI_API_KEY="your-production-key"
   ```
3. Set your production domain and map SSL certificates.

### Step 3: Updating the Website
Whenever you push code changes to `main`:
1. Automated CI/CD (GitHub Actions or Cloud Build) triggers a fresh `npm run build`.
2. Cloud Run spins up the updated container with zero downtime.

---

## 📄 License
Apache-2.0 License. Built for university students and campus placement preparation.
