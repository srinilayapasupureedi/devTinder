# devTinder

Lightweight demo backend for a Tinder-like app built with Node.js, Express and MongoDB.

This repository contains a small REST API that supports user signup/login (JWT cookie-based auth), fetching a user profile, and basic profile routes.

## Features

- User signup with validation and bcrypt password hashing
- Login that issues a JWT stored in a cookie (7 day expiry)
- Protected `GET /profile` route that requires auth
- Simple `GET /user?email=` route to fetch user data by email

## Prerequisites

- Node.js (v16+ recommended)
- npm (comes with Node)
- MongoDB (local or Atlas)

## Quick start (Windows PowerShell)

1. Clone the repository and install dependencies:

```powershell
git clone <repo-url> devTinder
cd devTinder
npm install
```

2. Create a `.env` file in the project root with the following variables (example):

```text
MONGO_URI=mongodb://localhost:27017/devtinder
JWT_SECRET=your_jwt_secret_here
PORT=7000
```

3. Start the app:

```powershell
npm run start
```

The server listens by default on port 7000 (configurable via `PORT`).

## Environment variables

- `MONGO_URI` - MongoDB connection string (required)
- `JWT_SECRET` - Secret used to sign JWTs (optional; defaults to `'mysecretkey'` in code if not set)
- `PORT` - Port to run the server (defaults to 7000)

## Available routes

Authentication
- `POST /signup`  — Register a new user. Expects JSON body with `firstName`, `lastName`, `email`, `password`.
- `POST /login`   — Log in. Expects JSON body with `email`, `password`. On success, sets a `token` cookie.

User / Profile
- `GET /profile`  — Returns the authenticated user's profile. Requires a valid `token` cookie (set by `/login`).
- `GET /user?email=<email>` — Returns public user data for the given email.

Notes
- Password strength is validated at signup time. Passwords are stored as bcrypt hashes.
- Cookies are parsed globally by the application.

## Troubleshooting

- "argument handler must be a function" when starting: make sure each route file exports an Express router and `app.js` uses routers (this repo already wires routers in `src/app.js`).
- "Cannot find module" errors: ensure file paths are correct and that you ran `npm install`.
- JWT/auth errors: verify `JWT_SECRET` is the same across the app and that the `token` cookie is sent by the client.

## Next steps / improvements

- Add tests (unit + integration) and a CI pipeline
- Add request validation and better error formatting
- Add pagination and search filters for listing users
- Add API documentation (OpenAPI / Swagger)

## Contact

If you need help running the project or want me to wire additional features (tests, CI, Dockerfile), tell me which piece to do next.
