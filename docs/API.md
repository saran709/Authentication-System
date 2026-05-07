# API Documentation

Full REST API specification for the Authentication System.

## Base URL
```
http://localhost:4000/api
```

## Authentication
All protected endpoints require one of:
- `Authorization: Bearer <access_token>` header
- `accessToken` httpOnly cookie

## Endpoints

### POST /auth/register
Register a new user account.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "P@ssw0rd123",
  "name": "John Doe"
}
```

**Response (201):**
```json
{
  "message": "Registered",
  "user": {
    "id": "user_id",
    "email": "user@example.com"
  }
}
```

### POST /auth/login
Login to existing account.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "P@ssw0rd123",
  "remember": false
}
```

**Response (200):**
```json
{
  "accessToken": "jwt_token",
  "refreshToken": "jwt_token",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "roles": ["User"]
  }
}
```

### POST /auth/refresh
Refresh access token using refresh token.

**Request:**
```json
{
  "refreshToken": "jwt_refresh_token"
}
```

**Response (200):**
```json
{
  "accessToken": "new_jwt_token",
  "refreshToken": "new_jwt_refresh_token"
}
```

### POST /auth/logout
Logout and revoke refresh token.

**Request:** (Protected)
```json
{
  "refreshToken": "jwt_refresh_token"
}
```

**Response (200):**
```json
{
  "message": "Logged out"
}
```

### POST /auth/forgot-password
Request password reset.

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response (200):**
```json
{
  "message": "If the email exists you will receive reset instructions"
}
```

### POST /auth/reset-password
Reset password with token.

**Request:**
```json
{
  "token": "verification_token",
  "id": "user_id",
  "password": "NewPassword123"
}
```

**Response (200):**
```json
{
  "message": "Password reset successfully"
}
```

### GET /auth/verify-email
Verify email address (called from email link).

**Query Params:**
- `token` (string, required) - Email verification token
- `id` (string, required) - User ID

**Response:** Redirects to `/verify-email-success` on frontend

### POST /auth/oauth/:provider
OAuth login/linking handler.

**Parameters:**
- `provider` (string) - 'google' or 'github'

**Request:**
```json
{
  "providerId": "oauth_provider_id",
  "email": "user@example.com",
  "name": "John Doe",
  "avatar": "https://..."
}
```

**Response (200):**
```json
{
  "accessToken": "jwt_token",
  "refreshToken": "jwt_token",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "roles": ["User"]
  }
}
```

---

### GET /users/me
Get current user profile. (Protected)

**Response (200):**
```json
{
  "user": {
    "_id": "user_id",
    "email": "user@example.com",
    "name": "John Doe",
    "avatar": "https://...",
    "roles": ["User"],
    "isVerified": true,
    "lastLogin": "2024-01-01T00:00:00Z"
  }
}
```

### PUT /users/me
Update user profile. (Protected)

**Request:**
```json
{
  "name": "Jane Doe",
  "avatar": "https://..."
}
```

**Response (200):**
```json
{
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "Jane Doe"
  }
}
```

---

### GET /admin/stats
Get dashboard statistics. (Protected, Admin only)

**Response (200):**
```json
{
  "totalUsers": 42,
  "activeSessions": 15,
  "recentLogins": [
    {
      "_id": "user_id",
      "email": "user@example.com",
      "lastLogin": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### GET /admin/users
List all users with pagination. (Protected, Admin only)

**Query Params:**
- `page` (number, default: 1)
- `limit` (number, default: 20)
- `q` (string, optional) - Search by email or name

**Response (200):**
```json
{
  "users": [
    {
      "_id": "user_id",
      "email": "user@example.com",
      "name": "John Doe",
      "roles": ["User"],
      "isVerified": true,
      "lastLogin": "2024-01-01T00:00:00Z"
    }
  ],
  "total": 42
}
```

### PUT /admin/users/:id/roles
Update user roles. (Protected, Admin only)

**Parameters:**
- `id` (string) - User ID

**Request:**
```json
{
  "roles": ["Moderator", "Admin"]
}
```

**Response (200):**
```json
{
  "user": {
    "_id": "user_id",
    "email": "user@example.com",
    "roles": ["Moderator", "Admin"]
  }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Email and password required"
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized"
}
```

### 403 Forbidden
```json
{
  "error": "Forbidden"
}
```

### 500 Server Error
```json
{
  "error": "Server Error"
}
```

---

## Status Codes

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

---

## Rate Limiting

Global rate limit: 200 requests per 15 minutes per IP address.

Response headers:
- `RateLimit-Limit`: 200
- `RateLimit-Remaining`: remaining requests
- `RateLimit-Reset`: reset time (Unix timestamp)

---

## Cookies

The backend sets secure httpOnly cookies:
- `accessToken` - JWT access token (15 min expiry)
- `refreshToken` - JWT refresh token (7 day expiry)

Frontend can access via axios with `withCredentials: true`.
