# JobShield AI 🛡️

JobShield AI is a comprehensive full-stack platform designed to protect job seekers from employment scams by utilizing advanced AI to analyze and detect fake job postings. It also includes a powerful Resume Analyzer to help candidates optimize their applications for legitimate opportunities.

## 🚀 Features

- **Fake Job Detection**: Analyzes job descriptions using AI (Hugging Face Inference API) to identify potential red flags and determine the legitimacy of a job posting.
- **Resume Analyzer**: Upload your resume (PDF/DOCX) for AI-driven analysis to get actionable feedback, keyword optimization suggestions, and a customized improvement plan.
- **Secure Authentication**: Robust user authentication system using JWT and bcrypt, ensuring that user data and analysis history are securely protected behind authentication guards.
- **Interactive Dashboard**: A modern, responsive dashboard to view your recent job checks, resume analysis scores, and overall application health.
- **Beautiful UI/UX**: Built with React, Tailwind CSS, and Framer Motion for a sleek, premium, and highly interactive user experience.

## 🛠️ Tech Stack

**Frontend:**
- React 19
- Vite
- Tailwind CSS v4
- Framer Motion (Animations)
- React Router v7
- Lucide React (Icons)
- Axios

**Backend:**
- Node.js & Express
- MongoDB with Mongoose
- JSON Web Tokens (JWT) & Bcrypt (Auth)
- Hugging Face Inference API (AI Integration)
- Multer (File Uploads)
- PDF-Parse & Mammoth (Document Processing)

## ⚙️ Installation & Setup

### Prerequisites
- Node.js installed
- MongoDB URI
- Hugging Face API Key

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/JobShield-AI.git
cd JobShield-AI
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
HUGGINGFACE_API_KEY=your_huggingface_api_key
```
Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal window:
```bash
cd frontend
npm install
```
Start the frontend development server:
```bash
npm run dev
```

## 🛡️ Security
All primary features are secured behind authentication mechanisms. The platform ensures that file uploads are handled safely, and user credentials are encrypted before storage.

## 📄 License
This project is licensed under the ISC License.
