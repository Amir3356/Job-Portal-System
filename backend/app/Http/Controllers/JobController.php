<?php

namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Http\Request;
use App\Traits\ApiResponse;

class JobController extends Controller
{
    use ApiResponse;

    public function index(Request $request)
    {
        $jobs = Job::with('employer')->paginate(15);
        return $this->success($jobs);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'company' => 'required|string',
            'location' => 'nullable|string',
            'salary' => 'nullable|string',
        ]);

        $data['user_id'] = $request->user()->id;
        $job = Job::create($data);

        return $this->success($job, 'Job created', 201);
    }

    public function show(Job $job)
    {
        return $this->success($job->load('employer'));
    }

    public function update(Request $request, Job $job)
    {
        if ($request->user()->id !== $job->user_id) {
            return $this->error('Forbidden', 403);
        }

        $data = $request->validate([
            'title' => 'string',
            'description' => 'string',
            'company' => 'string',
            'location' => 'nullable|string',
            'salary' => 'nullable|string',
        ]);

        $job->update($data);
        return $this->success($job, 'Job updated');
    }

    public function destroy(Request $request, Job $job)
    {
        if ($request->user()->id !== $job->user_id) {
            return $this->error('Forbidden', 403);
        }

        $job->delete();
        return $this->success(null, 'Job deleted');
    }
}
