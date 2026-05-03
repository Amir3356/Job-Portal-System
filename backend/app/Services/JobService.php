<?php

namespace App\Services;

use App\Models\Job;
use App\Models\User;

class JobService
{
    public function list(array $filters = [])
    {
        return Job::query()
            ->when($filters['query'] ?? null, function ($query, $search) {
                $query->where(function ($nested) use ($search) {
                    $nested->where('title', 'like', "%{$search}%")
                        ->orWhere('company_name', 'like', "%{$search}%")
                        ->orWhere('location', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate(12);
    }

    public function create(User $user, array $data): Job
    {
        return Job::create([
            'employer_id' => $user->id,
            'title' => $data['title'],
            'company_name' => $data['company_name'],
            'location' => $data['location'],
            'employment_type' => $data['employment_type'],
            'salary_range' => $data['salary_range'] ?? null,
            'description' => $data['description'],
            'requirements' => $data['requirements'] ?? [],
            'skills' => $data['skills'] ?? [],
            'status' => $data['status'] ?? 'active',
        ]);
    }

    public function update(Job $job, array $data): Job
    {
        $job->update($data);

        return $job->refresh();
    }

    public function delete(Job $job): void
    {
        $job->delete();
    }
}