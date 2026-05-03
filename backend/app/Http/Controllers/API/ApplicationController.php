<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Application;
use App\Models\Job;
use Illuminate\Support\Facades\Validator;

class ApplicationController extends Controller
{
    public function apply(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'job_id' => 'required|exists:jobs,id',
            'cover_letter' => 'nullable|string',
            'cv' => 'nullable|file|max:5120',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();
        $cvPath = null;

        if ($request->hasFile('cv')) {
            $cvPath = $request->file('cv')->store('cvs', 'public');
        }

        $application = Application::create([
            'user_id' => $request->user()->id,
            'job_id' => $data['job_id'],
            'cover_letter' => $data['cover_letter'] ?? null,
            'cv_path' => $cvPath,
            'status' => 'submitted',
        ]);

        return response()->json($application, 201);
    }

    public function index(Request $request)
    {
        $user = $request->user();

        if ($user->role === 'employer') {
            $jobs = Job::where('user_id', $user->id)->pluck('id')->toArray();
            $applications = Application::whereIn('job_id', $jobs)->with('user','job')->latest()->paginate(20);
            return response()->json($applications);
        }

        if ($user->role === 'admin') {
            return response()->json(Application::with('user','job')->latest()->paginate(20));
        }

        // job seeker
        return response()->json(Application::where('user_id', $user->id)->with('job')->latest()->paginate(20));
    }
}
