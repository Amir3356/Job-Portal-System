<?php

namespace Database\Seeders;

use App\Models\Job;
use App\Models\JobApplication;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::create([
            'name' => 'System Admin',
            'email' => 'admin@jobportal.test',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'is_active' => true,
        ]);

        $employer = User::create([
            'name' => 'Atlas Hiring',
            'email' => 'employer@jobportal.test',
            'password' => Hash::make('password'),
            'role' => 'employer',
            'is_active' => true,
        ]);

        $seeker = User::create([
            'name' => 'Amina Candidate',
            'email' => 'seeker@jobportal.test',
            'password' => Hash::make('password'),
            'role' => 'job_seeker',
            'is_active' => true,
        ]);

        $job = Job::create([
            'employer_id' => $employer->id,
            'title' => 'Senior Laravel Developer',
            'company_name' => 'Atlas Digital',
            'location' => 'Remote',
            'employment_type' => 'Full-time',
            'salary_range' => '$90k - $120k',
            'description' => 'Build secure and scalable hiring workflows.',
            'requirements' => ['Laravel', 'API design', 'MySQL'],
            'skills' => ['Sanctum', 'Queues', 'Testing'],
            'status' => 'active',
        ]);

        JobApplication::create([
            'job_id' => $job->id,
            'user_id' => $seeker->id,
            'cover_letter' => 'I have shipped secure API products and role-based dashboards.',
            'status' => 'submitted',
        ]);
    }
}