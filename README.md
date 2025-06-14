# AI Notes Taker — Summarize Anything Instantly

> Use pdfs or upload notes — let AI do the rest.

Live : https://ainotestaker.netlify.app/

## Overview
AI Notes Taker is a productivity web app that uses AI to create clean, concise summaries from lectures, meetings, documents, or voice notes. Built using LangChain and Google GenAI, it helps users stay focused and organized.

## Features
- File Upload Support PDFs
- AI Summarization with LangChain + Google GenAI
- Export to PDF or Clipboard
- Authentication with Clerk
- Integrated Payments (Cashfree)
- Fully Responsive Interface

## Tech Stack

| Layer        | Technologies                                                                 |
|--------------|-------------------------------------------------------------------------------|
| Frontend     | Next.js, React.js, TailwindCSS, Radix UI, Lucide Icons                       |
| Backend/API  | Next.js API Routes, Convex, dotenv                                           |
| AI Layer     | LangChain, Google Generative AI, OpenAI API (via LangChain modules)         |
| Auth         | Clerk.dev                                                                    |
| Database     | Convex                                                                      |
| File Parsing | pdf-parse, html2pdf.js                                                       |
| Payments     | Razorpay, PayPal JS SDK, Cashfree                                            |
| Export       | html2pdf.js, Clipboard API                                                   |
| Editor       | Tiptap (with extensions: bold, italic, underline, highlight, etc.)           |
| Dev Tools    | ESLint, TailwindCSS, PostCSS                                                 |

## Screenshots
![Screenshot 2025-04-14 170725](https://github.com/user-attachments/assets/458f15a9-074a-4baf-9b3f-c2f93c5ff636)
![Screenshot 2025-06-11 205055](https://github.com/user-attachments/assets/2abd57fa-71e7-4583-8b94-afb0ede1ea2c)
![Screenshot 2025-06-11 205030](https://github.com/user-attachments/assets/a5483955-c0e9-4e50-bdab-3d8b6e00d0eb)


## Installation

```bash
git clone https://github.com/yourusername/ai-notes-taker.git
cd ai-notes-taker
npm install
npm run dev
