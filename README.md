# MyLinkly

MyLinkly is a learning-focused URL shortener built with a React frontend and an Express/MongoDB backend. Authenticated users can create short links, view only their own links, copy them, and inspect click analytics.

## Features

- User signup and login
- Cookie-based authentication
- Protected dashboard
- Create short URLs
- User-specific URL listing
- Redirect short URLs to their original destinations
- Track visit history and total clicks
- Per-link analytics
- Logout support
- Inline form validation
- Tailwind CSS styling
- Lucide React icons

## Tech stack

### Frontend

- React
- Vite
- Axios
- Tailwind CSS
- Lucide React

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- Cookie Parser
- CORS
- UUID
- Shortid

## Project structure

```text
V21-URLShortner/
├── backend/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── .env.example
│   ├── index.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   └── services/
│   ├── .env.example
│   ├── vite.config.js
│   └── package.json
├── .gitignore
└── README.md
```

## Prerequisites

Install the following before running the project:

- Node.js 18 or newer
- npm
- MongoDB running locally on the default port

The backend currently connects to:

```text
mongodb://127.0.0.1:27017/urlShortner
```

## Installation

Clone the repository and open it:

```bash
git clone <your-repository-url>
cd V21-URLShortner
```

Install backend dependencies:

```bash
cd backend
npm install
```

Install frontend dependencies:

```bash
cd ../frontend
npm install
```

## Environment variables

Create `frontend/.env` from `frontend/.env.example`:

```env
VITE_API_URL=http://localhost:8001
```

Create `backend/.env` from `backend/.env.example`:

```env
FRONTEND_URL=http://localhost:5173
```

Do not commit `.env` files. They are ignored by `.gitignore`.

## Running the project

Start the backend in one terminal:

```bash
cd backend
npm run dev
```

The backend runs on:

```text
http://localhost:8001
```

Start the frontend in another terminal:

```bash
cd frontend
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

Open the frontend URL in your browser.

## Available frontend scripts

Run these commands from the `frontend` directory:

```bash
npm run dev
npm run build
npm run preview
```

## Available backend scripts

Run these commands from the `backend` directory:

```bash
npm run dev
```

## API endpoints

### User endpoints

| Method | Endpoint | Description | Authentication |
| --- | --- | --- | --- |
| `POST` | `/user/signup` | Create a user account | Public |
| `POST` | `/user/login` | Log in and create a session cookie | Public |
| `GET` | `/user/me` | Check the current session | Required |
| `POST` | `/user/logout` | Remove the current session | Public |

### URL endpoints

| Method | Endpoint | Description | Authentication |
| --- | --- | --- | --- |
| `POST` | `/url` | Create a short URL for the logged-in user | Required |
| `GET` | `/url` | Get the logged-in user's URLs | Required |
| `GET` | `/url/analytics/:shortId` | Get analytics for an owned URL | Required |
| `GET` | `/url/:shortId` | Redirect to the original URL | Public |

## Authentication flow

1. A user logs in from the React frontend.
2. The backend verifies the credentials.
3. The backend creates a session ID.
4. The session ID is sent to the browser in a cookie.
5. Axios sends that cookie with future requests using `withCredentials`.
6. Authentication middleware resolves the user and stores the ID in `req.userId`.
7. URL queries use `req.userId` so users can access only their own links.

## Learning concepts

This project demonstrates:

- React components and state
- Controlled forms and validation
- Axios service modules
- REST API design
- Express routing and middleware
- Cookie-based sessions
- Authentication versus authorization
- MongoDB schemas and Mongoose queries
- User-owned resources
- CORS configuration
- Environment-based frontend configuration
- Separating frontend and backend applications

## Current learning-project limitations

This project is intended for learning and is not production-ready. Some improvements that can be made later:

- Hash passwords with `bcrypt`
- Store sessions in MongoDB or Redis instead of an in-memory `Map`
- Move the MongoDB connection string into an environment variable
- Add secure cookie options such as `httpOnly`, `sameSite`, and `secure`
- Add stronger backend input validation
- Add automated tests
- Add rate limiting and URL safety checks

## License

This project is available for learning and personal use.
