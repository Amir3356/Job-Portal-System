<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Job;
use App\Services\JobService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class JobController extends Controller
{
    public function __construct(private readonly JobService $jobService)
    {
    }

    public function index(Request $request): JsonResponse
    {
        return response()->json($this->jobService->list($request->only('query')));
    }

    public function show(Job $job): JsonResponse
    {
        return response()->json(['job' => $job->load('employer')]);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'company_name' => ['required', 'string', 'max:255'],
            'location' => ['required', 'string', 'max:255'],
            'employment_type' => ['required', 'string', 'max:100'],
            'salary_range' => ['nullable', 'string', 'max:100'],
            'description' => ['required', 'string'],
            'requirements' => ['nullable', 'array'],
            'skills' => ['nullable', 'array'],
            'status' => ['nullable', 'in:active,draft,paused'],
        ]);

        $job = $this->jobService->create($request->user(), $data);

        return response()->json(['message' => 'Job created successfully.', 'job' => $job], 201);
    }

    public function update(Request $request, Job $job): JsonResponse
    {
        $data = $request->validate([
            'title' => ['sometimes', 'string', 'max:255'],
            'company_name' => ['sometimes', 'string', 'max:255'],
            'location' => ['sometimes', 'string', 'max:255'],
            'employment_type' => ['sometimes', 'string', 'max:100'],
            'salary_range' => ['nullable', 'string', 'max:100'],
            'description' => ['sometimes', 'string'],
            'requirements' => ['nullable', 'array'],
            'skills' => ['nullable', 'array'],
            'status' => ['sometimes', 'in:active,draft,paused'],
        ]);

        return response()->json(['message' => 'Job updated successfully.', 'job' => $this->jobService->update($job, $data)]);
    }

    public function destroy(Job $job): JsonResponse
    {
        $this->jobService->delete($job);

        return response()->json(['message' => 'Job deleted successfully.']);
    }
}