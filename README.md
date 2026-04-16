# 🤖 merge-review-bot

An intelligent assistant that automatically analyzes pull requests before merging, identifying risks, summarizing changes, and suggesting improvements to help Tech Leads make faster and safer decisions about the code.

---

## 🚀 Overview

`merge-review-bot` is designed to improve the code review process by providing automated insights directly inside pull requests.

Instead of manually reviewing every detail, Tech Leads and developers receive:

- Clear summaries of changes
- Risk detection
- Suggested improvements
- Testing recommendations

All powered by AI and integrated into your development workflow.

---

## 🧠 Features

- 📌 **Pull Request Summary**  
  Automatically explains what changed in the PR.

- ⚠️ **Risk Detection**  
  Highlights potential issues such as:
  - Missing validations
  - Increased complexity
  - Changes in critical areas

- 🧪 **Test Suggestions**  
  Recommends test cases based on code changes.

- 💬 **Automated PR Comments**  
  Posts analysis directly on the pull request.

- 🔍 **Code Context Awareness**  
  Understands the purpose of the changes, not just syntax.

---

## 🏗️ Architecture

Developer → GitHub PR  
        ↓  
GitHub Actions / Webhook  
        ↓  
Backend API  
        ↓  
AI Analysis  
        ↓  
Comment on PR  

---

## ⚙️ Tech Stack

- Backend: Python (FastAPI) or Node.js
- Automation: GitHub Actions
- AI Integration: OpenAI API (or similar)
- Tunneling (dev): ngrok
- Version Control: GitHub

---

## 🔌 How It Works

1. A developer opens or updates a Pull Request
2. GitHub triggers a webhook
3. The backend receives the event
4. The PR diff is extracted
5. The AI analyzes the changes
6. A structured response is generated
7. The bot posts a comment on the PR

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/merge-review-bot.git
cd merge-review-bot
```

---

### 2. Create a virtual environment (Python)

```bash
python -m venv venv
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate     # Windows
```

---

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

---

### 4. Configure environment variables

Create a `.env` file:

```
OPENAI_API_KEY=your_api_key
GITHUB_APP_ID=your_app_id
GITHUB_PRIVATE_KEY=your_private_key
WEBHOOK_SECRET=your_webhook_secret
```

---

## ▶️ Running the Project

Start the backend:

```bash
uvicorn main:app --reload
```

---

## 🌐 Expose Local Server (Development)

Run ngrok:

```bash
ngrok http 8000
```

Copy the generated URL and set it as your webhook:

```
https://your-ngrok-url/webhook
```

---

## 🔗 GitHub App Setup

Configure a GitHub App with:

### Permissions:
- Pull Requests: Read
- Contents: Read
- Issues: Write

### Events:
- Pull Request

---

## 🧪 Example Output

```
Summary:
This PR introduces JWT authentication for user login.

Risks:
- No validation for expired tokens
- Missing error handling for invalid credentials

Suggestions:
- Add tests for invalid token scenarios
- Validate token expiration
```

---

## 📊 Future Improvements

- Dashboard with PR metrics
- Historical analysis
- Team insights (non-invasive)
- Codebase-aware analysis
- Multi-language support

---

## ⚠️ Limitations

- Large PRs may require chunking (token limits)
- AI suggestions are not always perfect
- Requires proper prompt tuning for best results

---

## 🎯 Goal

To assist — not replace — human code review by:

> Helping teams focus attention where it matters most.

---

## 📄 License

MIT License

---

## 👨‍💻 Author

Your Name  
GitHub: https://github.com/your-username

---

## 💡 Final Note

This project is a practical exploration of how AI can enhance developer workflows, focusing on real-world problems faced by engineering teams.
