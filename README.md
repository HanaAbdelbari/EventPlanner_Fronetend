# EventPlanner Frontend

Modern React frontend for the **EventPlanner** application — a platform for creating, discovering, and managing events.

Built with **Vite + React + Tailwind CSS**.

## ✨ Features

- Browse and search events
- View event details
- Create and edit events (authenticated users)
- User authentication (login / register / logout)
- Responsive design (mobile-first)
- Clean UI powered by Tailwind CSS + custom components

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS + PostCSS
- **Routing**: React Router
- **API Client**: Axios (located in `/src/services`)
- **Forms/State**: React hooks + custom hooks
- **Build Tool**: Vite
- **Production Server**: Nginx (inside Docker)
- **Containerization**: Docker

## Project Structure

```
EventPlanner_Frontend/
├── public/                 # static files (favicon, images, robots.txt, etc.)
├── src/
│   ├── components/         # reusable UI components
│   │   ├── auth/           # login, register, protected route, etc.
│   │   ├── common/         # buttons, cards, modal, navbar, layout pieces...
│   │   ├── events/         # event card, event list, event form, etc.
│   │   └── ...             # other feature-based component folders
│   ├── hooks/              # custom React hooks
│   │   └── (useAuth, useEvents, useForm, etc.)
│   ├── pages/              # page-level components / views
│   ├── services/           # API logic, axios instance, endpoints
│   ├── styles/             # global styles (if not fully using Tailwind)
│   ├── App.jsx             # root component + routing
│   ├── main.jsx            # entry point
│   └── index.css           # global base styles
├── .env.development        # local dev environment variables
├── .env.production         # production/build environment variables
├── Dockerfile              # Docker instructions for frontend
├── nginx.conf              # Nginx configuration to serve the built app
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```
## 🚀 Quick Start (Local Development)

1. Clone the repo & enter folder

```bash
 git clone https://github.com/HanaAbdelbari/EventPlannerFronetend
cd EventPlanner_Frontend
```
2. Install dependencies
```bash
  npm install
```

3. Start development server
```bash
 npm run dev
```

→ Open http://localhost:5173 

4. 🐳 Docker Usage
```bash
  docker build -t eventplanner-frontend:latest .
```
## 📄 License
MIT

Happy event planning! 🎉
