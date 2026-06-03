# Orbitra AI – Travel Itinerary Generator

A full-stack MERN application that transforms travel booking documents into AI-generated travel itineraries.

Users can upload flight tickets, hotel bookings, train tickets, and other travel documents. The system extracts relevant information using AI and automatically generates a structured travel itinerary that can be viewed, managed, and shared.

---

## Live Demo

### Website
https://orbitra-assignment-seven.vercel.app
---
## Features

### Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes

### Document Upload

- Upload PDFs
- Upload Images (JPG, JPEG, PNG)
- Cloudinary File Storage
- Document Preview Support

### AI Processing

- Extract text from uploaded documents
- Analyze travel information using Open AI
- Generate structured travel itineraries automatically

### Itinerary Management

- View all itineraries
- View itinerary details
- Delete itineraries
- View original uploaded documents

### Sharing

- Generate public share links
- View shared itineraries without authentication
- Copy share links instantly

### User Experience

- Responsive Design
- Markdown Rendering
- Clean Dashboard UI

---


## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Zustand
- React Router
- React Markdown
- Lucide Icons

### Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication
- Multer
- Cloudinary
- Open AI

---

## Installation

### Clone Repository

```bash
https://github.com/Abhi005shek/orbitra-assignment.git
```

---

### Backend Setup

```bash
cd backend

npm install

npm tsc

node dist/index.js
```

Backend runs on:

```text
http://localhost:5000
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---
