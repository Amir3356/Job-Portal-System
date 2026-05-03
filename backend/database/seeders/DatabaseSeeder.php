<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create Admin only
        $admin = User::create([
            'name'     => 'Amir',
            'email'    => 'amirsiraj1995@gmail.com',
            'password' => 'AEHJSS36',
            'role'     => 'admin',
        ]);
    }
}

