# Quick Start Guide

## Running the Project

### With Docker (Recommended)

```bash
cd /workspaces/Authentication-System
docker-compose up --build
```

Services will be available at:
- **Backend API**: http://localhost:4000
- **Frontend**: http://localhost:5173
- **MongoDB**: mongodb://localhost:27017

### Manual Setup

#### Backend
```bash
cd backend
npm install
# Create .env from .env.example and set variables
npm run seed        # Create super admin user
npm run dev         # Start dev server on :4000
```

#### Frontend
```bash
cd frontend
npm install
npm run dev         # Start dev server on :3000
```

#### MongoDB
Install locally or use MongoDB Atlas and set `MONGO_URI` in backend `.env`

---

## Testing Authentication Flow

### 1. Register a new user
```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "P@ssw0rd123",
    "name": "Test User"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "email": "user@example.com",
    "password": "P@ssw0rd123"
  }'
```

### 3. Access protected endpoint
```bash
curl -X GET http://localhost:4000/api/users/me \
  -H "Authorization: Bearer <accessToken>" \
  -b cookies.txt
```

### 4. Admin login
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -c admin_cookies.txt \
  -d '{
    "email": "admin@example.com",
    "password": "P@ssw0rd123"
  }'
```

### 5. View admin dashboard stats
```bash
curl -X GET http://localhost:4000/api/admin/stats \
  -H "Authorization: Bearer <admin-accessToken>" \
  -b admin_cookies.txt
```

---

## Pre-Created Users

After running `npm run seed`:

| Email | Password | Role |
|-------|----------|------|
| admin@example.com | P@ssw0rd123 | Super Admin |

---

## Project Features

✅ **Authentication**: Register, login, logout, refresh tokens, remember me
✅ **Email**: Email verification, password reset (Nodemailer)
✅ **OAuth**: Google & GitHub account linking
✅ **RBAC**: Super Admin, Admin, Moderator, User roles
✅ **Security**: JWT, bcrypt, helmet, CORS, rate limiting, secure cookies
✅ **APIs**: RESTful endpoints with proper status codes and validation
✅ **Admin**: Dashboard with stats, user management, role assignment
✅ **Frontend**: React + Vite + Tailwind, protected routes, auth context
✅ **Docker**: Complete docker-compose setup for dev/prod
✅ **Documentation**: API docs, architecture guide, deployment guides

---

## API Endpoints

### Auth Routes
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login (returns JWT)
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout (revoke refresh token)
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token
- `GET /api/auth/verify-email` - Verify email (via link)
- `POST /api/auth/oauth/:provider` - OAuth login/linking

### User Routes
- `GET /api/users/me` - Get profile (protected)
- `PUT /api/users/me` - Update profile (protected)

### Admin Routes (require Admin role)
- `GET /api/admin/stats` - Dashboard stats
- `GET /api/admin/users` - List users with pagination
- `PUT /api/admin/users/:id/roles` - Update user roles

---

## Frontend Pages

### Public
- `/` - Landing
- `/login` - Login
- `/register` - Register
- `/forgot-password` - Forgot password
- `/reset-password` - Reset password
- `/verify-email-success` - Email verified

### Protected
- `/dashboard` - User dashboard
- `/profile` - User profile
- `/admin` - Admin panel (Admin+ only)

---

## Deployment

See `docs/deployment.md` for:
- Vercel frontend deployment
- Render/Railway backend deployment
- MongoDB Atlas setup
- Environment variables

---

## Documentation

- [API Documentation](docs/API.md) - Complete API reference
- [Architecture Guide](ARCHITECTURE.md) - System design & rationale
- [Deployment Guide](docs/deployment.md) - Production deployment
- [Swagger API Spec](docs/swagger.yaml) - OpenAPI specification
- [Postman Collection](docs/postman_collection.json) - Ready-to-import

---

## Stopping Services

```bash
docker-compose down        # Stop containers
docker-compose down -v     # Stop and remove volumes
```

---

## Troubleshooting

**Frontend not loading?**
- Check `VITE_API_URL` environment variable
- Frontend runs on http://localhost:5173
- Backend must be running on :4000

**MongoDB connection error?**
- Verify MongoDB is running: `docker ps | grep mongo`
- Check `MONGO_URI` in backend `.env`
- Default: `mongodb://mongo:27017/auth_db` (in Docker)

**Port already in use?**
- Backend: Change `PORT` in `.env` (default 4000)
- Frontend: Change port in `frontend/vite.config.js`
- MongoDB: Change `27017` in `docker-compose.yml`

**Email not sending?**
- Configure SMTP in `.env`: `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`
- For testing, use Ethereal: https://ethereal.email (free)

---

## Next Steps

1. ✅ Clone/run the project
2. ✅ Test auth flows
3. ✅ Customize branding/styling
4. ✅ Configure SMTP for production
5. ✅ Set up OAuth client IDs (Google/GitHub)
6. ✅ Deploy to production

---

**Questions?** See ARCHITECTURE.md and docs/ for detailed guides.
