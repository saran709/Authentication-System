# Deployment Guide

Frontend (Vercel):
- Set `VITE_API_URL` to your backend URL.
- Build command: `npm run build`.

Backend (Render / Railway):
- Set environment variables from `backend/.env.example`.
- Use `npm start` as start command.

MongoDB Atlas:
- Create cluster and set `MONGO_URI` accordingly.

Docker:
- Run `docker-compose up --build` for local environment.
