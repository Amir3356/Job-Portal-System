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

        $application = Application::create([
            'user_id' => $request->user()->id,
            'job_id' => $jobId,
            'cover_letter' => $request->cover_letter,
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
