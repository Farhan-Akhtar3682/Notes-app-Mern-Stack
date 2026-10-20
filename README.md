# MERN Notes App

Full-stack notes app: MongoDB + Express + React (Vite) + Node.

## Setup

### 1. Server
```
cd server
npm install
cp .env.example .env     # apni MongoDB URI likho
npm run dev              # http://localhost:5000
```

### 2. Client (dusra terminal)
```
cd client
npm install
npm run dev              # http://localhost:5173
```

## Features
- Note banao, edit karo, delete karo
- Pin karo (pinned notes upar aate hain)
- Search (title/content)
- Color labels

## API
| Method | Route | Kaam |
|---|---|---|
| GET | /api/notes?q=text | Saare notes / search |
| POST | /api/notes | Naya note |
| PUT | /api/notes/:id | Update |
| DELETE | /api/notes/:id | Delete |
