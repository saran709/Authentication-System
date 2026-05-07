# Full-Stack Authentication & User Management System

Comprehensive, production-ready authentication platform with JWT, OAuth linking, RBAC, email verification, and admin dashboards.

## Quick Start (Docker)

```bash
docker-compose up --build
```

- Backend: http://localhost:4000
- Frontend: http://localhost:5173
- MongoDB: http://localhost:27017

## Manual Setup

### Backend
```bash
cd backend
cp .env.example .env
npm install
npm run seed
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Project Structure

```
Authentication-System/
├── backend/
│   ├── src/
│   │   ├── controllers/    # Business logic
│   │   ├── models/         # MongoDB schemas
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Auth, RBAC, error
│   │   ├── utils/          # JWT, email, logging
│   │   ├── config/         # DB connection
│   │   ├── seed/           # Seed data
│   │   ├── __tests__/      # Jest tests
│   │   └── index.js        # Entry point
│   ├── emails/             # Email templates
│   ├── Dockerfile
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── pages/          # Routes
│   │   ├── auth/           # Auth context
│   │   ├── services/       # API client
│   │   └── App.jsx         # Routes
│   ├── Dockerfile
│   ├── vite.config.js
│   └── package.json
├── docs/
│   ├── deployment.md       # Deployment guides
│   ├── swagger.yaml        # API docs
│   └── postman_collection.json
├── docker-compose.yml
└── README.md
```

## Core Features

### Authentication
- ✅ User registration with email verification
- ✅ Login/logout with JWT access + refresh tokens
- ✅ Refresh token rotation with blacklist
- ✅ Password reset via email
- ✅ OAuth linking (Google, GitHub providers)
- ✅ Session persistence via httpOnly cookies

### User Management
- ✅ Profile GET/PUT endpoints
- ✅ Activity logs
- ✅ Last login tracking

### Role-Based Access Control (RBAC)
- ✅ Roles: Super Admin, Admin, Moderator, User
- ✅ Role-based middleware
- ✅ Admin dashboard with role management

### Admin Dashboard
- ✅ Stats: total users, active sessions
- ✅ User management table
- ✅ Role updates UI

### Security
- ✅ Bcrypt password hashing
- ✅ Helmet security headers
- ✅ Rate limiting (200 req/15min)
- ✅ CORS protection
- ✅ JWT expiration & rotation
- ✅ Refresh token blacklist
- ✅ Secure cookies

## API Endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `POST /api/auth/logout`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`
- `GET /api/auth/verify-email`
- `POST /api/auth/oauth/:provider`

### Users
- `GET /api/users/me`
- `PUT /api/users/me`

### Admin
- `GET /api/admin/stats`
- `GET /api/admin/users`
- `PUT /api/admin/users/:id/roles`

## Environment Variables

### Backend
```
PORT=4000
MONGO_URI=mongodb://mongo:27017/auth_db
JWT_ACCESS_SECRET=your_secret_key
JWT_REFRESH_SECRET=your_secret_key
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
SMTP_HOST=smtp.ethereal.email
SMTP_PORT=587
SMTP_USER=your_email@example.com
SMTP_PASS=your_password
CLIENT_URL=http://localhost:3000
```

## Seed Data

```bash
cd backend
npm run seed
# Creates super admin: admin@example.com / P@ssw0rd123
```

## Deployment

**Frontend (Vercel)**: `npm run build`, set `VITE_API_URL` env
**Backend (Render/Railway)**: Set env vars, use `npm start`
**MongoDB**: Use MongoDB Atlas

See `docs/deployment.md` for details.

## Tech Stack

- Frontend: React 18 + Vite + Tailwind + Axios
- Backend: Node.js + Express + Mongoose
- Auth: JWT + Bcrypt
- Email: Nodemailer
- Logging: Winston
- Tests: Jest
- DevOps: Docker + Docker Compose

## Production Checklist

- [ ] Update JWT secrets
- [ ] Configure production SMTP
- [ ] Set NODE_ENV=production
- [ ] Enable HTTPS
- [ ] Configure production CORS
- [ ] Use MongoDB Atlas
- [ ] Monitor logs

# Authentication-System