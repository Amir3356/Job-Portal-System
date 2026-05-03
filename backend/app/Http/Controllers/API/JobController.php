<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Job;
use Illuminate\Support\Facades\Validator;

class JobController extends Controller
{
    public function index(Request $request)
    {
        $query = Job::query();

        if ($request->has('q')) {
            $q = $request->q;
            $query->where(function ($q2) use ($q) {
                $q2->where('title', 'like', "%{$q}%")
                    ->orWhere('description', 'like', "%{$q}%")
                    ->orWhere('company', 'like', "%{$q}%");
            });
        }

        $jobs = $query->with('user')->latest()->paginate(15);
        return response()->json($jobs);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'company' => 'required|string|max:255',
            'location' => 'nullable|string|max:255',
            'type' => 'nullable|string|max:50',
            'salary' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $job = Job::create(array_merge($validator->validated(), ['user_id' => $request->user()->id]));

        return response()->json($job, 201);
    }

    public function show($id)
    {
        $job = Job::with('user')->findOrFail($id);
        return response()->json($job);
    }

    public function update(Request $request, $id)
    {
        $job = Job::findOrFail($id);

        if ($request->user()->id !== $job->user_id && $request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $job->update($request->only(['title','description','company','location','type','salary']));
        return response()->json($job);
    }

    public function destroy(Request $request, $id)
    {
        $job = Job::findOrFail($id);

        if ($request->user()->id !== $job->user_id && $request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $job->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
