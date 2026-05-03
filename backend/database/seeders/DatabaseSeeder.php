<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Job;
use App\Models\Profile;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create Admin User
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@jobportal.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);
        Profile::create(['user_id' => $admin->id]);

        // Create Employer Users
        $employer1 = User::create([
            'name' => 'Tech Corp',
            'email' => 'employer@techcorp.com',
            'password' => Hash::make('password'),
            'role' => 'employer',
        ]);
        Profile::create(['user_id' => $employer1->id]);

        $employer2 = User::create([
            'name' => 'Design Studio',
            'email' => 'employer@designstudio.com',
            'password' => Hash::make('password'),
            'role' => 'employer',
        ]);
        Profile::create(['user_id' => $employer2->id]);

        // Create Job Seeker Users
        $jobSeeker1 = User::create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => Hash::make('password'),
            'role' => 'job_seeker',
        ]);
        Profile::create([
            'user_id' => $jobSeeker1->id,
            'phone' => '+1234567890',
            'location' => 'New York, NY',
            'bio' => 'Experienced software developer with 5 years of experience.',
            'skills' => 'JavaScript, React, Node.js, Python',
            'experience' => 'Senior Developer at ABC Company (2020-2025)',
        ]);

        $jobSeeker2 = User::create([
            'name' => 'Jane Smith',
            'email' => 'jane@example.com',
            'password' => Hash::make('password'),
            'role' => 'job_seeker',
        ]);
        Profile::create([
            'user_id' => $jobSeeker2->id,
            'phone' => '+1234567891',
            'location' => 'San Francisco, CA',
            'bio' => 'Creative UI/UX designer passionate about user experience.',
            'skills' => 'Figma, Adobe XD, Sketch, HTML, CSS',
            'experience' => 'UI/UX Designer at XYZ Studio (2019-2025)',
        ]);

        // Create Sample Jobs
        Job::create([
            'user_id' => $employer1->id,
            'title' => 'Senior Full Stack Developer',
            'company' => 'Tech Corp',
            'description' => 'We are looking for an experienced Full Stack Developer to join our growing team. You will be responsible for developing and maintaining web applications using modern technologies.',
            'requirements' => "- 5+ years of experience in web development\n- Strong knowledge of React and Node.js\n- Experience with MySQL/PostgreSQL\n- Excellent problem-solving skills\n- Bachelor's degree in Computer Science or related field",
            'location' => 'New York, NY',
            'type' => 'Full-time',
            'salary' => '$120,000 - $150,000',
            'skills' => ['JavaScript', 'React', 'Node.js', 'MySQL', 'Git'],
            'status' => 'active',
        ]);

        Job::create([
            'user_id' => $employer1->id,
            'title' => 'Frontend Developer',
            'company' => 'Tech Corp',
            'description' => 'Join our frontend team to build beautiful and responsive user interfaces. You will work closely with designers and backend developers to create amazing user experiences.',
            'requirements' => "- 3+ years of frontend development experience\n- Expert knowledge of React and modern JavaScript\n- Experience with Tailwind CSS or similar frameworks\n- Strong understanding of responsive design\n- Portfolio of previous work required",
            'location' => 'Remote',
            'type' => 'Remote',
            'salary' => '$90,000 - $120,000',
            'skills' => ['React', 'JavaScript', 'Tailwind CSS', 'HTML', 'CSS'],
            'status' => 'active',
        ]);

        Job::create([
            'user_id' => $employer2->id,
            'title' => 'UI/UX Designer',
            'company' => 'Design Studio',
            'description' => 'We are seeking a talented UI/UX Designer to create intuitive and visually appealing designs for our clients. You will be involved in all stages of the design process.',
            'requirements' => "- 4+ years of UI/UX design experience\n- Proficiency in Figma and Adobe Creative Suite\n- Strong portfolio demonstrating design skills\n- Understanding of user-centered design principles\n- Excellent communication skills",
            'location' => 'San Francisco, CA',
            'type' => 'Full-time',
            'salary' => '$85,000 - $110,000',
            'skills' => ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research'],
            'status' => 'active',
        ]);

        Job::create([
            'user_id' => $employer2->id,
            'title' => 'Graphic Designer',
            'company' => 'Design Studio',
            'description' => 'Looking for a creative Graphic Designer to produce high-quality visual content for various media. You will work on branding, marketing materials, and digital assets.',
            'requirements' => "- 2+ years of graphic design experience\n- Expert in Adobe Photoshop, Illustrator, and InDesign\n- Strong understanding of typography and color theory\n- Ability to work on multiple projects simultaneously\n- Bachelor's degree in Graphic Design or related field",
            'location' => 'Los Angeles, CA',
            'type' => 'Part-time',
            'salary' => '$50,000 - $70,000',
            'skills' => ['Photoshop', 'Illustrator', 'InDesign', 'Typography', 'Branding'],
            'status' => 'active',
        ]);

        Job::create([
            'user_id' => $employer1->id,
            'title' => 'DevOps Engineer',
            'company' => 'Tech Corp',
            'description' => 'We need a skilled DevOps Engineer to manage our infrastructure and deployment pipelines. You will work on automation, monitoring, and ensuring system reliability.',
            'requirements' => "- 4+ years of DevOps experience\n- Strong knowledge of AWS/Azure/GCP\n- Experience with Docker and Kubernetes\n- Proficiency in CI/CD tools (Jenkins, GitLab CI, etc.)\n- Scripting skills (Python, Bash)",
            'location' => 'Austin, TX',
            'type' => 'Full-time',
            'salary' => '$110,000 - $140,000',
            'skills' => ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Python'],
            'status' => 'active',
        ]);

        $this->command->info('Database seeded successfully!');
        $this->command->info('');
        $this->command->info('Test Accounts:');
        $this->command->info('Admin: admin@jobportal.com / password');
        $this->command->info('Employer: employer@techcorp.com / password');
        $this->command->info('Job Seeker: john@example.com / password');
    }
}
