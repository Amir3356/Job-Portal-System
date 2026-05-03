<?php

namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Http\Request;

class JobController extends Controller
{
    public function index(Request $request)
    {
        $query = Job::with('user')->active();

        // Search
        if ($request->has('search') && $request->search) {
            $query->search($request->search);
        }

        // Filter by type
        if ($request->has('type') && $request->type) {
            $query->where('type', $request->type);
        }

        // Filter by location
        if ($request->has('location') && $request->location) {
            $query->where('location', 'like', "%{$request->location}%");
        }

        // Filter by employer
        if ($request->has('employer_id') && $request->employer_id) {
            $query->where('user_id', $request->employer_id);
        }

        $jobs = $query->latest()->paginate(15);

        return response()->json([
            'jobs' => $jobs->items(),
            'pagination' => [
                'total' => $jobs->total(),
                'per_page' => $jobs->perPage(),
                'current_page' => $jobs->currentPage(),
                'last_page' => $jobs->lastPage(),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'description' => 'required|string',
            'requirements' => 'nullable|string',
            'location' => 'required|string|max:255',
            'type' => 'required|string|in:Full-time,Part-time,Contract,Remote',
            'salary' => 'required|string|max:255',
            'skills' => 'nullable|array',
        ]);

        $job = $request->user()->jobs()->create($request->all());

        return response()->json([
            'message' => 'Job created successfully',
            'job' => $job,
        ], 201);
    }

    public function show($id)
    {
        $job = Job::with('user')->findOrFail($id);

        return response()->json([
            'job' => $job,
        ]);
    }

    public function update(Request $request, $id)
    {
        $job = Job::findOrFail($id);

        // Check if user owns the job
        if ($job->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 403);
        }

        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'company' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'requirements' => 'nullable|string',
            'location' => 'sometimes|required|string|max:255',
            'type' => 'sometimes|required|string|in:Full-time,Part-time,Contract,Remote',
            'salary' => 'sometimes|required|string|max:255',
            'skills' => 'nullable|array',
            'status' => 'sometimes|in:active,closed',
        ]);

        $job->update($request->all());

        return response()->json([
            'message' => 'Job updated successfully',
            'job' => $job,
        ]);
    }

    public function destroy(Request $request, $id)
    {
        $job = Job::findOrFail($id);

        // Check if user owns the job
        if ($job->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 403);
        }

        $job->delete();

        return response()->json([
            'message' => 'Job deleted successfully',
        ]);
    }

    public function search(Request $request)
    {
        $query = Job::active();

        if ($request->has('q')) {
            $query->search($request->q);
        }

        $jobs = $query->latest()->take(10)->get();

        return response()->json([
            'jobs' => $jobs,
        ]);
    }
}
