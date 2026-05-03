<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Profile;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create Admin only
        $admin = User::create([
            'name'     => 'Admin',
            'email'    => 'admin@jobportal.com',
            'password' => 'admin123',
            'role'     => 'admin',
        ]);

        Profile::create(['user_id' => $admin->id]);
    }
}

