<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        $employer = User::create([
            'name' => 'Employer One',
            'email' => 'employer@example.com',
            'password' => Hash::make('password'),
            'role' => 'employer',
        ]);

        User::create([
            'name' => 'Job Seeker',
            'email' => 'seeker@example.com',
            'password' => Hash::make('password'),
            'role' => 'job_seeker',
        ]);
    }
}
