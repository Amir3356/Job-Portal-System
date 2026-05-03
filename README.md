# Job Portal System

This repository contains a Laravel backend and a React (Vite) frontend for a Job Portal System.

Quick start (backend)

1. From `backend/` install PHP deps:

```bash
cd backend
composer install
```

2. Add `.env` from `.env.example` and set DB credentials.

3. Install Sanctum and publish (run these in the backend folder):

```bash
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
```

4. Run migrations and seeders:

```bash
php artisan migrate
php artisan db:seed
php artisan storage:link
```

5. Start the backend:

```bash
php artisan serve
```

Quick start (frontend)

1. From `frontend/` install JS deps:

```bash
cd frontend
npm install
npm run dev
```

2. Set Vite env: create `.env` with `VITE_API_URL=http://localhost:8000/api`

Notes

- The backend includes API routes in `backend/routes/api.php` and controllers under `backend/app/Http/Controllers/API`.
- The frontend has basic pages under `frontend/src/pages` and a central `frontend/src/services/api.js` Axios instance.
- After running migrations, sample users exist: `admin@example.com`, `employer@example.com`, and `seeker@example.com` with password `password`.
