# Architecture & Implementation Notes

## Folder Structure Rationale

### Backend (`backend/src/`)
- **controllers/**: Separates business logic from routes (User, auth, admin, OAuth, email verification)
- **models/**: MongoDB schemas (User, RefreshToken, Token, ActivityLog)
- **routes/**: Express route handlers (auth, users, admin)
- **middleware/**: Cross-cutting concerns (auth, RBAC, error handling, rate limiting)
- **utils/**: Helper functions (JWT creation/verify, email, logging)
- **config/**: Environment-specific config (DB connection)
- **seed/**: Database seeding for initial data
- **__tests__/**: Jest unit tests

### Frontend (`frontend/src/`)
- **pages/**: Full-page routes (Login, Register, Profile, Admin, Reset, Verify)
- **auth/**: Auth context and provider (single source of truth for user state)
- **services/**: Axios instance with credentials config
- **components/**: Reusable UI components (future expansion)

## Key Security Decisions

### JWT Strategy (Access + Refresh)
- **Access Token**: Short-lived (15 min), stored in httpOnly cookie OR Authorization header
- **Refresh Token**: Long-lived (7 days), stored in httpOnly cookie, rotated on each refresh request
- **Token Rotation**: Old refresh token revoked when new one issued (detect token reuse)
- **Blacklist**: Revoked tokens marked in DB (prevents replay attacks)

### Password Reset Flow
1. User requests reset → Token created with 1-hour TTL
2. Email sent with verified link (includes token + user ID)
3. User submits new password → Token validated, password hashed, token marked as used
4. Old refresh tokens NOT revoked (user can stay logged in during reset)

### Email Verification
1. Registration creates email verification token (24-hour TTL)
2. Email sent with link back to backend `/auth/verify-email`
3. Backend validates and redirects to frontend success page
4. User marked as verified in DB

### OAuth Account Linking
1. Frontend calls `/auth/oauth/:provider` with provider data (providerId, email, name, avatar)
2. Backend checks if user exists by provider ID (OAuth user) or email (account linking)
3. If linking by email: add provider to existing user's oauthProviders array
4. If new user: create account with provider
5. Return JWT tokens and user data

### RBAC Implementation
- User roles stored as array in User model (allows multiple roles)
- `permit()` middleware checks if any of user's roles match allowed roles
- Admin routes require 'Super Admin' or 'Admin' role
- Checked at route level, not in controller

## Middleware Execution Order (Express)
1. helmet() - Security headers
2. morgan() - Request logging
3. express.json() - Parse JSON body
4. cookieParser() - Parse cookies
5. cors() - Cross-origin requests
6. rateLimiter() - Rate limit all requests
7. Route handlers → authenticate() on protected routes → permit() for admin routes
8. errorHandler() - Catch all errors

## Database Models

### User
- Core identity model
- Stores hashed password + OAuth providers
- Tracks verification status, login attempts, last login
- Has roles array for RBAC

### RefreshToken
- Stores issued tokens for rotation/revocation
- Marks revoked tokens
- References replaced token (enable detecting token reuse)
- Expires after 7 days (TTL index in MongoDB)

### Token
- Generic token storage for time-limited operations
- Used for email verification (type: 'emailVerify')
- Used for password resets (type: 'passwordReset')
- Marked as used after consumption

### ActivityLog
- Future expansion for audit logging
- Tracks user actions (login, logout, password change, etc.)
- Includes IP address and metadata

## Frontend Auth Flow

### AuthProvider Context
1. Mounted in App root
2. On mount: attempts GET /users/me (checks if user is already logged in)
3. Fails silently if no valid accessToken (new session)
4. Updates browser cookies automatically via axios withCredentials

### Login/Register Pages
1. POST to auth endpoints
2. Backend sets httpOnly cookies automatically
3. Frontend stores JWT in context state (optional, mainly for display)
4. Redirect to protected route (context updates automatically on next page load via /users/me)

### Protected Routes
- Check if `user` exists in AuthContext
- If null, redirect to /login
- If user has admin role, show admin link

## API Error Handling

- Centralized errorHandler middleware catches all errors
- Returns 401 for auth failures
- Returns 403 for authorization failures
- Returns 400 for validation/business logic errors
- Returns 500 for unexpected errors

## Deployment Considerations

### Environment-Specific
- `LOG_LEVEL`: debug (dev), warn (prod)
- `NODE_ENV`: development, production, staging
- `COOKIE_DOMAIN`: localhost (dev), yourdomain.com (prod)
- `CLIENT_URL`: for email link generation and CORS

### Scaling
- Stateless backend design (JWT, no sessions in memory)
- Can scale horizontally behind load balancer
- MongoDB connection pooling for DB
- Rate limiter uses in-memory store (replace with Redis for distributed scaling)

### Monitoring
- Winston logs to file and console
- Morgan HTTP request logging
- Activity logs in MongoDB for audit trail

## Future Enhancements

- [ ] 2FA/MFA support
- [ ] Session management (list active sessions, log out other devices)
- [ ] Password strength meter
- [ ] Account recovery via security questions
- [ ] Device fingerprinting
- [ ] Redis-based rate limiting for scale
- [ ] GraphQL API alongside REST
- [ ] API key generation for third-party integrations
- [ ] Email verification resend
- [ ] Social login profile sync
- [ ] Dark/light mode toggle in UI
- [ ] Multi-language support (i18n)
