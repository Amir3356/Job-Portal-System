<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Profile;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create Admin User only
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@jobportal.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);
        Profile::create(['user_id' => $admin->id]);

        $this->command->info('Database seeded successfully!');
        $this->command->info('Admin: admin@jobportal.com / password');
    }
}
