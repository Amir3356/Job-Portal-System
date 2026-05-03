<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Job;

class JobSeeder extends Seeder
{
    public function run()
    {
        Job::create([
            'user_id' => 2,
            'title' => 'Frontend Developer',
            'description' => 'Build beautiful UIs with React and Tailwind.',
            'company' => 'Acme Co',
            'location' => 'Remote',
            'type' => 'Full-time',
            'salary' => '50k-70k',
        ]);

        Job::create([
            'user_id' => 2,
            'title' => 'Backend Engineer',
            'description' => 'Work on APIs and databases with Laravel.',
            'company' => 'Acme Co',
            'location' => 'Remote',
            'type' => 'Full-time',
            'salary' => '60k-90k',
        ]);
    }
}
