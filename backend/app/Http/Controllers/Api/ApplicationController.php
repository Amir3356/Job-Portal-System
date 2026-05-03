<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Job;
use App\Services\ApplicationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ApplicationController extends Controller
{
    public function __construct(private readonly ApplicationService $applicationService)
    {
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'job_id' => ['required', 'exists:jobs,id'],
            'cover_letter' => ['nullable', 'string'],
            'cv' => ['nullable', 'file', 'mimes:pdf,doc,docx', 'max:5120'],
        ]);

        $application = $this->applicationService->apply(
            $request->user(),
            Job::findOrFail($data['job_id']),
            $data,
            $request->file('cv'),
        );

        return response()->json(['message' => 'Application submitted successfully.', 'application' => $application], 201);
    }

    public function index(Request $request): JsonResponse
    {
        return response()->json($this->applicationService->listFor($request->user()));
    }
}