# 🤖 AI Code Reviewer

An AI-powered full-stack web application that reviews your code like a senior developer. Paste any JavaScript code, click **Review**, and get instant detailed feedback — including bugs, best practices, performance tips, and suggested fixes.

---

## 📸 Project Overview

```
┌──────────────────────┐        ┌──────────────────────────┐
│    LEFT PANEL        │        │     RIGHT PANEL          │
│  (Code Editor)       │        │   (AI Review Output)     │
│                      │        │                          │
│  function sum() {    │        │  ✅ Clean structure       │
│    return 1 + 1      │  ───►  │  ❌ Missing error check   │
│  }                   │        │  💡 Use const not var     │
│                      │        │                          │
│         [Review]     │        │                          │
└──────────────────────┘        └──────────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| Vite | Fast development server & build tool |
| react-simple-code-editor | In-browser code editor |
| PrismJS | Syntax highlighting inside the editor |
| Axios | Sends HTTP requests to the backend |
| react-markdown | Renders AI response as formatted text |
| rehype-highlight | Syntax highlights code inside AI response |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express | Web framework / REST API |
| Google Gemini AI (gemini-2.0-flash) | AI model that reviews the code |
| dotenv | Loads secret API keys from .env file |
| cors | Allows frontend to communicate with backend |

---

## 📁 Project Structure

```
code-review/
├── BackEnd/
│   ├── server.js                  # Entry point — starts server on port 3000
│   ├── package.json
│   └── src/
│       ├── app.js                 # Express setup, middleware, routes
│       ├── controllers/
│       │   └── ai.controller.js   # Handles request & response logic
│       ├── routes/
│       │   └── ai.routes.js       # Defines API endpoints
│       └── services/
│           └── ai.service.js      # Calls Google Gemini AI
│
└── Frontend/
    ├── index.html                 # Single HTML entry point
    ├── vite.config.js             # Vite configuration
    ├── package.json
    └── src/
        ├── main.jsx               # Mounts React app into the DOM
        ├── App.jsx                # Main component — editor + review UI
        ├── App.css                # Styles for the app layout
        └── index.css              # Global styles
```

---

## ⚙️ How It Works

```
1. User types code in the editor (left panel)
2. User clicks the "Review" button
3. Frontend sends a POST request to http://localhost:3000/ai/get-review
   with the code in the request body
4. Express backend receives it → routes → controller → service
5. Service sends the code to Google Gemini AI with a system prompt
6. Gemini returns a detailed Markdown review
7. Backend sends review back to frontend
8. React renders the review using react-markdown (right panel)
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js installed (v18 or above)
- A Google Gemini API key → get it free at https://makersuite.google.com/app/apikey

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/code-review.git
cd code-review
```

---

### 2. Setup the Backend

```bash
cd BackEnd
npm install
```

Create a `.env` file inside the `BackEnd` folder:

```
GOOGLE_GEMINI_KEY=your_google_gemini_api_key_here
```

Start the backend server:

```bash
node server.js
```

> Server runs on: http://localhost:3000

---

### 3. Setup the Frontend

Open a new terminal:

```bash
cd Frontend
npm install
npm run dev
```

> Frontend runs on: http://localhost:5173

---

### 4. Use the App

1. Open http://localhost:5173 in your browser
2. Type or paste your JavaScript code in the left panel
3. Click the **Review** button
4. Read the AI review on the right panel ✅

---

## 🔌 API Endpoints

| Method | URL | Description |
|---|---|---|
| GET | `/` | Health check — returns "Hello World" |
| POST | `/ai/get-review` | Accepts `{ code }` in body, returns AI review |

### Example Request

```json
POST http://localhost:3000/ai/get-review

{
  "code": "function sum() { return 1 + 1 }"
}
```

### Example Response

```
## Code Review

✅ The function works correctly for the given purpose.

❌ Issues:
- Function name is too generic
- No parameters — hardcoded values reduce reusability

💡 Suggested Fix:
function add(a, b) {
  return a + b;
}
```

---

## 🧠 AI Reviewer Behaviour

The AI is given a **system prompt** that instructs it to behave like a senior developer with 7+ years of experience. It reviews code for:

- ✅ Code quality & clean code principles
- ✅ Bugs and logical errors
- ✅ Performance & efficiency
- ✅ Security vulnerabilities
- ✅ Best practices & naming conventions
- ✅ Readability & maintainability
- ✅ DRY (Don't Repeat Yourself) principles
- ✅ Suggestions with corrected code examples

---

## 🔐 Environment Variables

| Variable | Where | Description |
|---|---|---|
| `GOOGLE_GEMINI_KEY` | BackEnd/.env | Your Google Gemini API key |

> ⚠️ Never commit your `.env` file to GitHub. It is already listed in `.gitignore`.

---

## 📦 Dependencies

### Backend
```json
"@google/generative-ai": "^0.21.0",
"cors": "^2.8.5",
"dotenv": "^16.4.7",
"express": "^4.21.2"
```

### Frontend
```json
"axios": "^1.7.9",
"prismjs": "^1.29.0",
"react": "^19.0.0",
"react-dom": "^19.0.0",
"react-markdown": "^9.0.3",
"react-simple-code-editor": "^0.14.1",
"rehype-highlight": "^7.0.2",
"highlight.js": "^11.11.1"
```

---

## 🙌 Author

Built with ❤️ using React, Node.js, and Google Gemini AI.
