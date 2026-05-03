# 🛠 Development Guide

Guide for developers working on the Job Portal System.

## 🏃‍♂️ Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
php artisan serve
# Runs on http://localhost:8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# Runs on http://localhost:5173
```

## 📝 Making Changes

### Adding a New Frontend Page

1. **Create the page component:**
```bash
# Create file: frontend/src/pages/NewPage.jsx
```

2. **Add the route:**
```javascript
// In frontend/src/routes/AppRoutes.jsx
import NewPage from '../pages/NewPage';

// Add route
<Route path="/new-page" element={<NewPage />} />
```

3. **Add navigation link:**
```javascript
// In frontend/src/components/Navbar.jsx
<Link to="/new-page">New Page</Link>
```

### Adding a New API Endpoint

1. **Add route:**
```php
// In backend/routes/api.php
Route::get('/new-endpoint', [YourController::class, 'method']);
```

2. **Create controller method:**
```php
// In backend/app/Http/Controllers/YourController.php
public function method(Request $request)
{
    // Your logic here
    return response()->json(['data' => $data]);
}
```

3. **Add API call in frontend:**
```javascript
// In frontend/src/services/api.js
export const yourAPI = {
  getData: () => api.get('/new-endpoint'),
};
```

### Adding a New Database Table

1. **Create migration:**
```bash
cd backend
php artisan make:migration create_table_name_table
```

2. **Define schema:**
```php
// In database/migrations/xxxx_create_table_name_table.php
public function up()
{
    Schema::create('table_name', function (Blueprint $table) {
        $table->id();
        $table->string('column_name');
        $table->timestamps();
    });
}
```

3. **Run migration:**
```bash
php artisan migrate
```

4. **Create model:**
```bash
php artisan make:model TableName
```

## 🎨 Styling Guidelines

### Using Tailwind CSS

**Custom classes are defined in `frontend/src/index.css`:**
- `.btn-primary` - Primary button
- `.btn-secondary` - Secondary button
- `.input-field` - Form input
- `.card` - Card container

**Example usage:**
```jsx
<button className="btn-primary">Click Me</button>
<input className="input-field" />
<div className="card">Content</div>
```

### Adding Custom Styles

```css
/* In frontend/src/index.css */
@layer components {
  .your-custom-class {
    @apply bg-blue-500 text-white px-4 py-2 rounded;
  }
}
```

## 🔐 Authentication

### Protecting Routes (Frontend)

```jsx
import ProtectedRoute from '../components/UI/ProtectedRoute';

<Route
  path="/protected"
  element={
    <ProtectedRoute>
      <YourComponent />
    </ProtectedRoute>
  }
/>
```

### Protecting Routes (Backend)

```php
// In routes/api.php
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/protected', [Controller::class, 'method']);
});
```

### Checking User Role

**Frontend:**
```jsx
const { isEmployer, isJobSeeker, isAdmin } = useAuth();

{isEmployer && <EmployerContent />}
{isJobSeeker && <JobSeekerContent />}
```

**Backend:**
```php
if ($request->user()->isEmployer()) {
    // Employer logic
}
```

## 🗄 Database Operations

### Querying Data

```php
// Get all
$jobs = Job::all();

// With relationships
$jobs = Job::with('user')->get();

// Filtering
$jobs = Job::where('status', 'active')->get();

// Pagination
$jobs = Job::paginate(15);
```

### Creating Records

```php
$job = Job::create([
    'title' => 'Job Title',
    'company' => 'Company Name',
    // ... other fields
]);
```

### Updating Records

```php
$job = Job::findOrFail($id);
$job->update($request->all());
```

### Deleting Records

```php
$job = Job::findOrFail($id);
$job->delete();
```

## 🧪 Testing

### Manual Testing Checklist

**Authentication:**
- [ ] Register as job seeker
- [ ] Register as employer
- [ ] Login with valid credentials
- [ ] Login with invalid credentials
- [ ] Logout
- [ ] Access protected routes without token

**Job Seeker Flow:**
- [ ] Browse jobs
- [ ] Search jobs
- [ ] Filter jobs by type/location
- [ ] View job details
- [ ] Apply to job
- [ ] View applications in dashboard
- [ ] Update profile
- [ ] Upload resume

**Employer Flow:**
- [ ] Post new job
- [ ] Edit job
- [ ] Delete job
- [ ] View job applications
- [ ] Accept application
- [ ] Reject application

## 🐛 Debugging

### Frontend Debugging

**Check browser console:**
```javascript
console.log('Debug:', data);
```

**Check API calls:**
- Open DevTools → Network tab
- Filter by XHR/Fetch
- Check request/response

**Check state:**
```javascript
const { user } = useAuth();
console.log('Current user:', user);
```

### Backend Debugging

**Check logs:**
```bash
tail -f backend/storage/logs/laravel.log
```

**Debug in code:**
```php
\Log::info('Debug:', ['data' => $data]);
dd($variable); // Dump and die
```

**Check database queries:**
```php
\DB::enableQueryLog();
// Your code
dd(\DB::getQueryLog());
```

## 📦 Adding Dependencies

### Frontend

```bash
cd frontend
npm install package-name
```

### Backend

```bash
cd backend
composer require vendor/package
```

## 🔄 Database Reset

**Reset with fresh data:**
```bash
cd backend
php artisan migrate:fresh --seed
```

**Reset without seed:**
```bash
php artisan migrate:fresh
```

## 🚀 Building for Production

### Frontend

```bash
cd frontend
npm run build
# Creates optimized build in dist/
```

### Backend

```bash
cd backend
composer install --optimize-autoloader --no-dev
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## 📊 Common Tasks

### Add New User Role

1. Update migration:
```php
$table->enum('role', ['admin', 'employer', 'job_seeker', 'new_role']);
```

2. Add helper method in User model:
```php
public function isNewRole()
{
    return $this->role === 'new_role';
}
```

3. Update frontend AuthContext:
```javascript
isNewRole: user?.role === 'new_role',
```

### Add File Upload

**Backend:**
```php
$request->validate([
    'file' => 'required|file|mimes:pdf,jpg|max:5120',
]);

$path = $request->file('file')->store('uploads', 'public');
```

**Frontend:**
```javascript
const formData = new FormData();
formData.append('file', file);

await api.post('/upload', formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
});
```

### Add Email Notifications

1. Configure mail in `.env`:
```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your_username
MAIL_PASSWORD=your_password
```

2. Create notification:
```bash
php artisan make:notification JobApplicationNotification
```

3. Send notification:
```php
$user->notify(new JobApplicationNotification($application));
```

## 🔍 Code Quality

### Laravel Best Practices

- Use Eloquent ORM for database operations
- Validate all input data
- Use resource controllers
- Follow PSR-12 coding standards
- Use type hints
- Handle exceptions properly

### React Best Practices

- Use functional components with hooks
- Keep components small and focused
- Use meaningful variable names
- Handle loading and error states
- Avoid prop drilling (use Context)
- Clean up effects properly

## 📝 Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "Add new feature"

# Push to remote
git push origin feature/new-feature

# Create pull request on GitHub/GitLab
```

## 🆘 Common Issues

### Port already in use

**Backend:**
```bash
php artisan serve --port=8001
# Update frontend/.env: VITE_API_URL=http://localhost:8001/api
```

**Frontend:**
```bash
npm run dev -- --port=3000
```

### CORS errors

Check `backend/config/cors.php`:
```php
'allowed_origins' => ['http://localhost:5173'],
```

### Token not working

1. Check token is stored: `localStorage.getItem('token')`
2. Check token is sent in headers
3. Check token is valid in database
4. Clear localStorage and login again

---

Happy developing! 🎉
