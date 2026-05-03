<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\Job;
use Illuminate\Http\Request;

class ApplicationController extends Controller
{
    public function apply(Request $request, $jobId)
    {
        $request->validate([
            'cover_letter' => 'nullable|string',
            'phone' => 'required|string|max:20',
            'years_of_experience' => 'nullable|integer|min:0|max:50',
            'portfolio_url' => 'nullable|url|max:255',
            'cv' => 'nullable|file|mimes:pdf,doc,docx|max:5120', // 5MB max
        ]);

        $job = Job::findOrFail($jobId);

        // Check if user already applied
        $existingApplication = Application::where('user_id', $request->user()->id)
            ->where('job_id', $jobId)
            ->first();

        if ($existingApplication) {
            return response()->json([
                'message' => 'You have already applied to this job',
            ], 400);
        }

        // Handle CV upload
        $resumePath = null;
        if ($request->hasFile('cv')) {
            $file = $request->file('cv');
            $fileName = time() . '_' . $request->user()->id . '_' . $file->getClientOriginalName();
            $resumePath = $file->storeAs('resumes', $fileName, 'public');
        }

        $application = Application::create([
            'user_id' => $request->user()->id,
            'job_id' => $jobId,
            'cover_letter' => $request->cover_letter,
            'phone' => $request->phone,
            'years_of_experience' => $request->years_of_experience,
            'portfolio_url' => $request->portfolio_url,
            'resume_path' => $resumePath,
        ]);

        return response()->json([
            'message' => 'Application submitted successfully',
            'application' => $application,
        ], 201);
    }

    public function myApplications(Request $request)
    {
        $applications = Application::with('job')
            ->where('user_id', $request->user()->id)
            ->latest()
            ->get();

        return response()->json([
            'applications' => $applications,
        ]);
    }

    public function jobApplications(Request $request, $jobId)
    {
        $job = Job::findOrFail($jobId);

        // Check if user owns the job
        if ($job->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 403);
        }

        $applications = Application::with('user')
            ->where('job_id', $jobId)
            ->latest()
            ->get();

        return response()->json([
            'applications' => $applications,
        ]);
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,accepted,rejected',
        ]);

        $application = Application::with('job')->findOrFail($id);

        // Check if user owns the job
        if ($application->job->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 403);
        }

        $application->update([
            'status' => $request->status,
        ]);

        return response()->json([
            'message' => 'Application status updated successfully',
            'application' => $application,
        ]);
    }
}
