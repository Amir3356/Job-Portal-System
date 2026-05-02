<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Models\Application;
use Illuminate\Http\Request;
use App\Traits\ApiResponse;
use Illuminate\Support\Facades\Storage;

class ApplicationController extends Controller
{
    use ApiResponse;

    public function index(Job $job)
    {
        $applications = $job->applications()->with('user')->get();
        return $this->success($applications);
    }

    public function store(Request $request, Job $job)
    {
        $data = $request->validate([
            'cv' => 'nullable|file|mimes:pdf,doc,docx|max:2048',
        ]);

        $cvPath = null;
        if ($request->hasFile('cv')) {
            $cvPath = $request->file('cv')->store('cvs', 'public');
        }

        $application = Application::create([
            'user_id' => $request->user()->id,
            'job_id' => $job->id,
            'status' => 'applied',
            'cv_path' => $cvPath,
        ]);

        return $this->success($application, 'Applied', 201);
    }
}
