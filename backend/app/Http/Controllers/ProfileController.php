<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    public function show(Request $request)
    {
        $profile = $request->user()->profile;

        return response()->json([
            'profile' => array_merge(
                $profile->toArray(),
                [
                    'name' => $request->user()->name,
                    'email' => $request->user()->email,
                ]
            ),
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'location' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
            'skills' => 'nullable|string',
            'experience' => 'nullable|string',
        ]);

        $user = $request->user();
        $profile = $user->profile;

        // Update user name if provided
        if ($request->has('name')) {
            $user->update(['name' => $request->name]);
        }

        // Update profile
        $profile->update($request->only([
            'phone',
            'location',
            'bio',
            'skills',
            'experience',
        ]));

        return response()->json([
            'message' => 'Profile updated successfully',
            'profile' => $profile,
        ]);
    }

    public function uploadResume(Request $request)
    {
        $request->validate([
            'resume' => 'required|file|mimes:pdf|max:5120', // 5MB max
        ]);

        $profile = $request->user()->profile;

        // Delete old resume if exists
        if ($profile->resume_path) {
            Storage::disk('public')->delete($profile->resume_path);
        }

        // Store new resume
        $path = $request->file('resume')->store('resumes', 'public');

        $profile->update([
            'resume_path' => $path,
        ]);

        return response()->json([
            'message' => 'Resume uploaded successfully',
            'resume_path' => $path,
        ]);
    }
}
