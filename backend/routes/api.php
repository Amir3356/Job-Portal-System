<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdminController;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Public job routes
Route::get('/jobs', [JobController::class, 'index']);
Route::get('/jobs/{id}', [JobController::class, 'show']);
Route::get('/jobs/search', [JobController::class, 'search']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth routes
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // Profile routes
    Route::get('/profile', [ProfileController::class, 'show']);
    Route::put('/profile', [ProfileController::class, 'update']);
    Route::post('/profile/resume', [ProfileController::class, 'uploadResume']);

    // Job routes (for employers)
    Route::post('/jobs', [JobController::class, 'store']);
    Route::put('/jobs/{id}', [JobController::class, 'update']);
    Route::delete('/jobs/{id}', [JobController::class, 'destroy']);

    // Application routes
    Route::post('/jobs/{jobId}/apply', [ApplicationController::class, 'apply']);
    Route::get('/applications/my', [ApplicationController::class, 'myApplications']);
    Route::get('/applications/{id}', [ApplicationController::class, 'show']);
    Route::post('/applications/{id}', [ApplicationController::class, 'update']);
    Route::delete('/applications/{id}', [ApplicationController::class, 'destroy']);
    Route::get('/jobs/{jobId}/applications', [ApplicationController::class, 'jobApplications']);
    Route::patch('/applications/{id}/status', [ApplicationController::class, 'updateStatus']);

    // Admin routes
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard']);
    Route::get('/admin/users', [AdminController::class, 'getUsers']);
    Route::get('/admin/jobs', [AdminController::class, 'getJobs']);
    Route::get('/admin/applications', [AdminController::class, 'getApplications']);
    Route::delete('/admin/users/{id}', [AdminController::class, 'deleteUser']);
    Route::delete('/admin/jobs/{id}', [AdminController::class, 'deleteJob']);
    Route::delete('/admin/applications/{id}', [AdminController::class, 'deleteApplication']);
});
