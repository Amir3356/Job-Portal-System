<?php

namespace App\Services;

use App\Models\Job;
use App\Models\JobApplication;
use App\Models\User;
use Illuminate\Http\UploadedFile;

class ApplicationService
{
    public function apply(User $user, Job $job, array $data, ?UploadedFile $cv = null): JobApplication
    {
        $cvPath = $cv?->store('cvs', 'public');

        return JobApplication::create([
            'job_id' => $job->id,
            'user_id' => $user->id,
            'cover_letter' => $data['cover_letter'] ?? null,
            'cv_path' => $cvPath,
            'status' => 'submitted',
        ]);
    }

    public function listFor(User $user)
    {
        return JobApplication::query()
            ->with(['job', 'seeker'])
            ->when($user->role === 'job_seeker', fn ($query) => $query->where('user_id', $user->id))
            ->when($user->role === 'employer', function ($query) use ($user) {
                $query->whereHas('job', fn ($jobs) => $jobs->where('employer_id', $user->id));
            })
            ->latest()
            ->paginate(12);
    }
}