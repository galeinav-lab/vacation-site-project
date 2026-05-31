# Vacation Site

A full-stack vacation site I built while learning full stack development. Users can sign up, browse vacations, and follow the ones they like. Admins can add, edit, and delete vacations, and see some stats about which ones are most popular.

## Stack

- React + TypeScript on the frontend
- Node.js, Express and TypeScript on the backend
- MySQL for the database
- Docker Compose to tie it all together

A few libraries worth mentioning: React Hook Form for the forms, Redux for shared state, Axios for HTTP, Recharts for the admin chart, react-csv for exporting the follower data, JWT + bcrypt for auth, Multer for image uploads, and Joi for validating requests on the backend.

## Running it

You'll need Docker installed. Create a `.env` file in the project root with:

```
DB_PASSWORD=your_password
SECRET_KEY=some_long_random_string
```

Then:

```
docker compose up --build
```

That spins up the database (with the seed data from `seed.sql`), the backend on port 5000, and the frontend on port 3000. Open http://localhost:3000 and you're in.

## Logging in

The seed file already has a few users. The admin account is:

- email: `gal@gmail.com`
- password: whatever you set when you registered originally (the hash in the seed is from my local setup, so easier to just register a new user and bump their `roleId` to 1 in the DB)

Regular users can register from the signup page.

## Project layout

```
nodejs-backend/    Express API, controllers/services/models split
react-frontend/    React app, components + redux state + services
seed.sql           Initial DB dump (roles, users, vacations)
docker-compose.yml
```

The backend follows a pretty standard controller -> service -> model layout. Uploaded vacation images get written to `nodejs-backend/uploads`, which is mounted as a volume so they stick around between restarts.

## Things that aren't done

- No password reset flow
- No tests yet
- The admin role bootstrap is manual (edit the DB)
- Image uploads aren't size-limited on the frontend, only the backend

Might get to these later, might not.
